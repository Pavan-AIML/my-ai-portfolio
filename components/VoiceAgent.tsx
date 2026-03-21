"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number>(0);
  const mediaGraphAttachedRef = useRef(false);

  const jawRef = useRef<HTMLDivElement | null>(null);
  const haloRef = useRef<HTMLDivElement | null>(null);

  const canUseWebRtc = useMemo(
    () => typeof window !== "undefined" && "RTCPeerConnection" in window,
    [],
  );

  const stopAudioAnalysis = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    analyserRef.current = null;
    mediaGraphAttachedRef.current = false;
    if (jawRef.current) jawRef.current.style.transform = "scale(1, 1)";
    if (haloRef.current) {
      haloRef.current.style.opacity = "0.35";
      haloRef.current.style.transform = "scale(1)";
    }
  }, []);

  const startAudioAnalysisLoop = useCallback(() => {
    const analyser = analyserRef.current;
    if (!analyser) return;
    const bins = new Uint8Array(analyser.frequencyBinCount);
    const tick = () => {
      analyser.getByteFrequencyData(bins);
      let sum = 0;
      for (let i = 0; i < bins.length; i++) sum += bins[i];
      const avg = sum / bins.length / 255;

      if (jawRef.current) {
        const talk = 1 + avg * 0.55;
        jawRef.current.style.transform = `scale(1, ${Math.min(talk, 1.5)})`;
      }
      if (haloRef.current) {
        haloRef.current.style.opacity = String(0.25 + avg * 0.65);
        const s = 1 + avg * 0.12;
        haloRef.current.style.transform = `scale(${s})`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const attachAudioGraph = useCallback(async () => {
    const audio = remoteAudioRef.current;
    if (!audio || mediaGraphAttachedRef.current) return;
    try {
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;
      await ctx.resume();
      const source = ctx.createMediaElementSource(audio);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.72;
      analyserRef.current = analyser;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      mediaGraphAttachedRef.current = true;
      startAudioAnalysisLoop();
    } catch {
      mediaGraphAttachedRef.current = false;
    }
  }, [startAudioAnalysisLoop]);

  /** Fresh <audio> each session — Web Audio allows only one MediaElementSource per element. */
  const createRemoteAudio = useCallback(() => {
    const audio = new Audio();
    audio.autoplay = true;
    audio.setAttribute("playsInline", "true");
    const onPlaying = () => setIsAssistantSpeaking(true);
    const onPauseLike = () => setIsAssistantSpeaking(false);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPauseLike);
    audio.addEventListener("ended", onPauseLike);
    audio.addEventListener("waiting", onPauseLike);
    remoteAudioRef.current = audio;
  }, []);

  useEffect(
    () => () => {
      stopAudioAnalysis();
      const a = remoteAudioRef.current;
      if (a) {
        a.pause();
        a.srcObject = null;
      }
      remoteAudioRef.current = null;
    },
    [stopAudioAnalysis],
  );

  const disconnect = async () => {
    stopAudioAnalysis();
    dcRef.current?.close();
    dcRef.current = null;

    pcRef.current?.close();
    pcRef.current = null;

    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    localStreamRef.current = null;

    const a = remoteAudioRef.current;
    if (a) {
      a.pause();
      a.srcObject = null;
    }
    remoteAudioRef.current = null;

    setIsAssistantSpeaking(false);
    setState("idle");
    setError(null);
  };

  const connect = async () => {
    try {
      setState("connecting");
      setError(null);
      stopAudioAnalysis();
      const prev = remoteAudioRef.current;
      if (prev) {
        prev.pause();
        prev.srcObject = null;
      }
      createRemoteAudio();

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
        const audio = remoteAudioRef.current;
        const stream = e.streams[0] ?? null;
        if (audio && stream) {
          audio.srcObject = stream;
          void audio.play().catch(() => {});
          queueMicrotask(() => void attachAudioGraph());
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

      const sendSessionStartTrigger = () => {
        if (dc.readyState !== "open" || !autoWelcome) return;
        dc.send(
          JSON.stringify({
            type: "conversation.item.create",
            item: {
              type: "message",
              role: "user",
              content: [{ type: "input_text", text: "__PORTFOLIO_SESSION_START__" }],
            },
          }),
        );
        dc.send(JSON.stringify({ type: "response.create" }));
      };

      if (dc.readyState === "open") {
        sendSessionStartTrigger();
      } else {
        dc.addEventListener("open", sendSessionStartTrigger, { once: true });
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

  const statusHeadline =
    voiceVisualState === "speaking"
      ? "Speaking live"
      : voiceVisualState === "listening"
        ? "Your turn"
        : voiceVisualState === "connecting"
          ? "Connecting…"
          : "Tap Start";

  return (
    <>
      <div className="fixed bottom-5 right-5 z-[95]">
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/25 shadow-lg shadow-violet-500/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-fuchsia-500/40"
          aria-label={isOpen ? "Close voice" : "Open live voice"}
        >
          <div className="h-full w-full overflow-hidden rounded-full">
            <Image src="/profile.jpg" alt="" width={56} height={56} className="h-full w-full object-cover" />
          </div>
          <span className="absolute inset-0 rounded-full ring-2 ring-emerald-400/35" />
          <span className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white/35 bg-emerald-500 text-[10px] text-white shadow-lg shadow-emerald-500/55">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
              <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.24c1.12.37 2.33.57 3.59.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.3 21 3 13.7 3 4a1 1 0 0 1 1-1h3.49a1 1 0 0 1 1 1c0 1.26.2 2.47.57 3.59a1 1 0 0 1-.24 1l-2.2 2.2z" />
            </svg>
          </span>
          <span className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border-2 border-zinc-950 bg-emerald-500">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
          </span>
        </button>
      </div>

      {isOpen ? (
        <section className="pointer-events-auto fixed bottom-[5.25rem] right-5 z-[95] flex w-[min(88vw,300px)] flex-col items-center">
          {/* Circular live orb — not a rectangle */}
          <div className="relative flex aspect-square w-full max-w-[300px] flex-col items-center justify-between rounded-full border border-white/25 bg-zinc-950/95 px-6 pb-7 pt-8 shadow-2xl shadow-black/60 backdrop-blur-xl">
            {/* Slow rotating gradient ring */}
            <div
              className={`pointer-events-none absolute -inset-[3px] rounded-full opacity-70 blur-[1px] voice-agent-orbit-slow ${state === "connected" ? "opacity-80" : "opacity-45"}`}
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(192,38,211,0.5), rgba(139,92,246,0.4), rgba(14,165,233,0.5), rgba(192,38,211,0.5))",
              }}
            />

            {/* Audio-reactive outer halo */}
            <div
              ref={haloRef}
              className={`pointer-events-none absolute inset-[10px] rounded-full bg-gradient-to-br from-fuchsia-500/20 via-violet-500/15 to-sky-500/20 transition-opacity duration-150 ${
                voiceVisualState === "speaking" ? "animate-pulse opacity-55" : "opacity-35"
              }`}
            />

            <div className="relative z-10 flex w-full flex-col items-center">
              <div className="flex items-center gap-2">
                <h2 className="text-center text-sm font-semibold tracking-tight">Pavan</h2>
                {state === "connected" ? (
                  <span className="rounded-full bg-emerald-500/25 px-2 py-px text-[9px] font-bold uppercase tracking-wider text-emerald-200">
                    Live
                  </span>
                ) : null}
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    state === "connected" ? "animate-pulse bg-emerald-400" : "bg-zinc-500"
                  }`}
                />
                <p className="text-[10px] font-medium text-zinc-400">
                  {state === "connected" ? "Live call active" : "Live call ready"}
                </p>
              </div>
              <p className="mt-1 max-w-[200px] text-center text-[10px] leading-snug text-zinc-500">
                Live assistant — mouth motion follows real playback audio from your session.
              </p>

              {/* Real photo “avatar” — mouth opens with playback volume (approximates speech) */}
              <div className="relative mt-4">
                {(voiceVisualState === "speaking" || voiceVisualState === "listening") &&
                state === "connected" ? (
                  <>
                    <span
                      className="pointer-events-none absolute inset-[-6px] rounded-full border border-fuchsia-400/25"
                      style={{ animation: "voice-agent-ripple 1.5s ease-out infinite" }}
                    />
                    <span
                      className="pointer-events-none absolute inset-[-6px] rounded-full border border-sky-400/20"
                      style={{ animation: "voice-agent-ripple 1.5s ease-out infinite 0.4s" }}
                    />
                  </>
                ) : null}

                <div
                  className={`relative mx-auto h-[128px] w-[128px] overflow-hidden rounded-full ring-2 ring-white/30 ring-offset-4 ring-offset-zinc-950 ${
                    state === "connected" ? "voice-agent-avatar-breathe" : ""
                  }`}
                >
                  <Image
                    src="/profile.jpg"
                    alt="Pavan Kumar"
                    width={256}
                    height={256}
                    className="h-full w-full object-cover"
                    priority={false}
                  />
                  {/* Lip zone: upper lip static, lower lip scales with audio (Web Audio analyser) */}
                  <div className="pointer-events-none absolute bottom-[10%] left-0 right-0 flex flex-col items-center gap-0">
                    <div className="h-[2px] w-[28%] rounded-full bg-black/25" aria-hidden />
                    <div
                      ref={jawRef}
                      className="mt-0.5 h-[8px] w-[32%] rounded-b-full bg-rose-500/35 mix-blend-multiply shadow-inner"
                      style={{
                        transformOrigin: "center top",
                        transform: "scale(1, 1)",
                      }}
                    />
                  </div>
                </div>
              </div>

              <p className="mt-4 text-center text-xs font-medium text-zinc-200">{statusHeadline}</p>

              <div className="mt-5 flex w-full items-center justify-center gap-3">
                {state !== "connected" ? (
                  <button
                    type="button"
                    onClick={connect}
                    disabled={state === "connecting"}
                    className="rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-zinc-900 shadow-md transition hover:bg-zinc-100 disabled:opacity-55"
                  >
                    {state === "connecting" ? "…" : "Start live"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={disconnect}
                    className="rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-white/15"
                  >
                    End
                  </button>
                )}
              </div>
            </div>
          </div>

          <p className="mt-3 max-w-[260px] text-center text-[9px] text-zinc-600">
            OpenAI Realtime · Mic required · Chrome / Safari
          </p>

          {error ? (
            <div className="mt-2 w-full max-w-[300px] space-y-2 rounded-2xl border border-red-500/35 bg-red-950/40 p-3 text-xs text-red-100">
              <p>{error === "VOICE_NEEDS_BROWSER" ? "Microphone not available here." : error}</p>
              {error.includes("VOICE_NEEDS_BROWSER") ||
              error.includes("secure") ||
              error.includes("localhost") ||
              error.includes("Microphone not available") ? (
                <button
                  type="button"
                  onClick={() => window.open("http://localhost:3000", "_blank", "noopener,noreferrer")}
                  className="w-full rounded-lg bg-amber-500/25 py-2 text-[11px] font-semibold text-amber-100"
                >
                  Open in browser →
                </button>
              ) : null}
            </div>
          ) : null}
        </section>
      ) : null}
    </>
  );
}
