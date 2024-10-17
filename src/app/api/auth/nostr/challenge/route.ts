// import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const kv = new Map<string, string>();

async function storeChallenge(publicKey: string, challenge: string) {
  // await kv.set(`nostr_challenge:${publicKey}`, challenge, { ex: 300 }); // Expires in 5 minutes
  await kv.set(`nostr_challenge:${publicKey}`, challenge);
}

export async function POST(request: NextRequest) {
  const { publicKey } = await request.json();

  if (!publicKey) {
    return NextResponse.json(
      { error: "Public key is required" },
      { status: 400 }
    );
  }

  try {
    // Generate a random challenge string
    const challenge = crypto.randomBytes(32).toString("hex");

    // Store the challenge in Vercel KV, indexed by the public key
    await storeChallenge(publicKey, challenge);

		console.log("AAA")

    return NextResponse.json({ challenge });
  } catch (error) {
    console.error("Error generating or storing challenge:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
