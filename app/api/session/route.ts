import { NextResponse } from "next/server";
import { buildVoiceAgentInstructions } from "@/content/voice-agent";

export async function POST() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing OPENAI_API_KEY" },
      { status: 500 },
    );
  }

  const instructions = buildVoiceAgentInstructions();

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
          output: { voice: "verse" },
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

