import { NextResponse } from "next/server";
import { buildVoiceAgentInstructions } from "@/content/voice-agent";

/** Built-in Realtime output voices (OpenAI). Docs recommend `marin` and `cedar` for quality. */
const REALTIME_VOICES = [
  "alloy",
  "ash",
  "ballad",
  "coral",
  "echo",
  "sage",
  "shimmer",
  "verse",
  "marin",
  "cedar",
] as const;

type RealtimeVoice = (typeof REALTIME_VOICES)[number];

function resolveRealtimeVoice(): RealtimeVoice {
  const raw = process.env.OPENAI_REALTIME_VOICE?.trim().toLowerCase();
  if (raw && (REALTIME_VOICES as readonly string[]).includes(raw)) {
    return raw as RealtimeVoice;
  }
  // Default: `cedar` — often natural for a young male-presenting tone; try `marin`, `ash`, or `echo` too.
  return "cedar";
}

export async function POST() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing OPENAI_API_KEY" },
      { status: 500 },
    );
  }

  const instructions = buildVoiceAgentInstructions();
  const voice = resolveRealtimeVoice();

  const response = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session: {
        type: "realtime",
        model: "gpt-realtime",
        audio: {
          input: {
            format: { type: "audio/pcm", rate: 24000 },
            noise_reduction: { type: "near_field" },
            turn_detection: {
              type: "server_vad",
              threshold: 0.5,
              prefix_padding_ms: 300,
              // Slightly longer silence so natural pauses are not cut off mid-thought
              silence_duration_ms: 700,
              create_response: true,
              interrupt_response: true,
            },
          },
          output: {
            voice,
            speed: 1,
          },
        },
        instructions,
      },
    }),
  });

  const text = await response.text();
  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to create realtime client secret", status: response.status, body: text },
      { status: 502 },
    );
  }

  const data = JSON.parse(text) as {
    value?: string;
    client_secret?: { value?: string };
  };
  // Realtime APIs can return either `value` or nested `client_secret.value`.
  const secret = data.value ?? data.client_secret?.value;
  if (!secret) {
    return NextResponse.json(
      { error: "No client secret in response", body: text },
      { status: 502 },
    );
  }

  return NextResponse.json({ client_secret: { value: secret } });
}

