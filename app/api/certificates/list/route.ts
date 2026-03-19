import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const dir = path.join(process.cwd(), "public", "certificates");

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const items = entries
      .filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".pdf"))
      .map((e) => {
        const filename = e.name;
        const slot = filename.includes("__") ? filename.split("__")[0] : "";
        return {
          slot,
          filename,
          url: `/certificates/${filename}`,
        };
      });

    return NextResponse.json({ items });
  } catch {
    // Folder doesn't exist yet.
    return NextResponse.json({ items: [] });
  }
}

