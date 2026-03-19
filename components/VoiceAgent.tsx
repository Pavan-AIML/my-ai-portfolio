"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type RealtimeSessionResponse = {
  client_secret?: { value: string; expires_at: number };
};

type ConnectionState = "idle" | "connecting" | "connected" | "error";

export function VoiceAgent({
  autoOpen = true,
  autoWelcome = false,
}: {
  autoOpen?: boolean;
  autoWelcome?: boolean;
}) {
  const [state, setState] = useState<ConnectionState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(autoOpen);
  const [isAssistantSpeaking, setIsAssistantSpeaking] = useState(false);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);

  const canUseWebRtc = useMemo(
    () => typeof window !== "undefined" && "RTCPeerConnection" in window,
    [],
  );

  useEffect(() => {
    const audio = new Audio();
    audio.autoplay = true;
    remoteAudioRef.current = audio;

    const onPlaying = () => setIsAssistantSpeaking(true);
    const onPauseLike = () => setIsAssistantSpeaking(false);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPauseLike);
    audio.addEventListener("ended", onPauseLike);
    audio.addEventListener("waiting", onPauseLike);

    return () => {
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPauseLike);
      audio.removeEventListener("ended", onPauseLike);
      audio.removeEventListener("waiting", onPauseLike);
      audio.pause();
      remoteAudioRef.current = null;
    };
  }, []);

  useEffect(() => {
    // Keep prop for compatibility; no local browser TTS.
    // Greeting should come from the realtime voice after Start.
    void autoWelcome;
  }, [autoWelcome]);

  const disconnect = async () => {
    dcRef.current?.close();
    dcRef.current = null;

    pcRef.current?.close();
    pcRef.current = null;

    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    localStreamRef.current = null;

    if (remoteAudioRef.current) remoteAudioRef.current.srcObject = null;

    setIsAssistantSpeaking(false);
    setState("idle");
    setError(null);
  };

  const connect = async () => {
    try {
      setState("connecting");
      setError(null);

      if (!canUseWebRtc) {
        throw new Error("WebRTC is not available in this browser.");
      }

      const tokenRes = await fetch("/api/session", { method: "POST" });
      if (!tokenRes.ok) {
        const raw = await tokenRes.text();
        throw new Error(`Session API failed (${tokenRes.status}): ${raw}`);
      }
      const session = (await tokenRes.json()) as RealtimeSessionResponse;
      const ephemeralKey = session.client_secret?.value;
      if (!ephemeralKey) {
        throw new Error("No ephemeral key returned from /api/session.");
      }

      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      pc.ontrack = (e) => {
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = e.streams[0] ?? null;
        }
      };

      const mediaDevices = navigator.mediaDevices;
      if (!mediaDevices?.getUserMedia) {
        throw new Error("VOICE_NEEDS_BROWSER");
      }
      const localStream = await mediaDevices.getUserMedia({ audio: true }).catch((e: unknown) => {
        const err = e as { name?: string };
        if (err?.name === "NotAllowedError") {
          throw new Error("Microphone permission denied. Please allow mic and try again.");
        }
        throw new Error("VOICE_NEEDS_BROWSER");
      });
      localStreamRef.current = localStream;
      const track = localStream.getTracks()[0];
      if (!track) throw new Error("No microphone track available.");
      pc.addTrack(track);

      const dc = pc.createDataChannel("oai-events");
      dcRef.current = dc;
      dc.addEventListener("message", (ev) => {
        try {
          const parsed = JSON.parse(ev.data) as { type?: string };
          if (parsed.type === "response.audio.delta") setIsAssistantSpeaking(true);
          if (
            parsed.type === "response.audio.done" ||
            parsed.type === "response.done" ||
            parsed.type === "output_audio_buffer.stopped"
          ) {
            setIsAssistantSpeaking(false);
          }
        } catch {
          // Ignore non-JSON messages for UI state.
        }
      });

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const sdpRes = await fetch("https://api.openai.com/v1/realtime/calls", {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${ephemeralKey}`,
          "Content-Type": "application/sdp",
        },
      });

      if (!sdpRes.ok) {
        const body = await sdpRes.text();
        throw new Error(`Realtime SDP exchange failed: ${sdpRes.status} ${body}`);
      }

      const answer = { type: "answer", sdp: await sdpRes.text() } as RTCSessionDescriptionInit;
      await pc.setRemoteDescription(answer);

      setState("connected");

      // Wait for data channel to open before sending (readyState must be 'open')
      const sendGreeting = () => {
        if (dc.readyState !== "open") return;
        dc.send(
          JSON.stringify({
            type: "conversation.item.create",
            item: {
              type: "message",
              role: "user",
              content: [
                {
                  type: "input_text",
                  text: "Say a short greeting as Pavan: e.g. Hey there, I'm Pavan—welcome to my portfolio, how can I help you?",
                },
              ],
            },
          }),
        );
        dc.send(JSON.stringify({ type: "response.create" }));
      };

      if (dc.readyState === "open") {
        sendGreeting();
      } else {
        dc.addEventListener("open", sendGreeting, { once: true });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      setState("error");
      await disconnect();
    }
  };

  const voiceVisualState =
    state === "connecting"
      ? "connecting"
      : state === "connected"
        ? isAssistantSpeaking
          ? "speaking"
          : "listening"
        : "idle";

  return (
    <>
      {/* Floating launcher */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="rounded-full bg-gradient-to-r from-fuchsia-600 via-violet-600 to-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-violet-500/20 hover:opacity-95"
        >
          {isOpen ? "Hide voice" : "Voice agent"}
        </button>
      </div>

      {/* Panel */}
      {isOpen ? (
        <section className="fixed bottom-20 right-5 z-50 w-[min(92vw,420px)] overflow-hidden rounded-3xl border border-white/15 bg-zinc-950/80 p-4 text-white shadow-2xl shadow-black/40 backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">Voice agent</p>
            <div className="flex items-center gap-2">
              {state !== "connected" ? (
                <button
                  onClick={connect}
                  disabled={state === "connecting"}
                  className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black disabled:opacity-60"
                >
                  {state === "connecting" ? "Connecting…" : "Start"}
                </button>
              ) : (
                <button
                  onClick={disconnect}
                  className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white"
                >
                  Stop
                </button>
              )}
            </div>
          </div>

          <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div
                  className={`h-9 w-9 rounded-full bg-gradient-to-br from-fuchsia-500 via-violet-500 to-sky-500 ${
                    voiceVisualState === "speaking"
                      ? "animate-pulse shadow-md shadow-violet-500/50"
                      : voiceVisualState === "listening"
                        ? "shadow-sm shadow-sky-500/40"
                        : "opacity-80"
                  }`}
                />
                {(voiceVisualState === "speaking" || voiceVisualState === "listening") && (
                  <div className="absolute inset-0 animate-ping rounded-full border border-violet-300/40" />
                )}
              </div>

              <div className="flex h-5 items-end gap-1.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    style={{ animationDelay: `${i * 120}ms` }}
                    className={`w-1.5 rounded-full bg-white/90 ${
                      voiceVisualState === "speaking"
                        ? "h-5 animate-pulse"
                        : voiceVisualState === "listening"
                          ? "h-3.5 animate-pulse"
                          : voiceVisualState === "connecting"
                            ? "h-2.5 animate-pulse"
                            : "h-2 opacity-50"
                    }`}
                  />
                ))}
              </div>

              <p className="ml-auto text-[11px] font-medium text-white/70">
                {voiceVisualState === "speaking"
                  ? "Speaking"
                  : voiceVisualState === "listening"
                    ? "Listening"
                    : voiceVisualState === "connecting"
                      ? "Connecting..."
                      : "Idle"}
              </p>
            </div>
          </div>

          {error ? (
            <div className="mt-3 space-y-2 border-t border-white/10 pt-3">
              <p className="text-xs text-red-200">
                {error === "VOICE_NEEDS_BROWSER"
                  ? "Microphone not available in this window."
                  : error}
              </p>
              {error.includes("VOICE_NEEDS_BROWSER") || error.includes("secure") || error.includes("localhost") || error.includes("Microphone not available") ? (
                <div className="rounded-xl border border-amber-500/40 bg-amber-950/40 p-3 text-xs text-amber-100">
                  <p className="font-semibold">Use Chrome or Safari</p>
                  <p className="mt-1 text-amber-200/90">
                    Voice needs a real browser. Open <strong>http://localhost:3000</strong> in Chrome or Safari, then click Start there.
                  </p>
                  <button
                    type="button"
                    onClick={() => window.open("http://localhost:3000", "_blank", "noopener,noreferrer")}
                    className="mt-3 w-full rounded-lg bg-amber-500/30 py-2 text-xs font-semibold text-amber-100 hover:bg-amber-500/50"
                  >
                    Open in browser →
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}
        </section>
      ) : null}
    </>
  );
}

