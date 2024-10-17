import { NextRequest, NextResponse } from "next/server";
import { verifyEvent } from "nostr-tools";
import { kv } from "../challenge/route";
import { getOrCreateUser, UserCreateData } from "@/backend/services/auth";
import { apiUserRepository } from "@/backend/entities/users/infra/ApiUserRepository";

export async function POST(request: NextRequest) {
  const { publicKey, signature } = await request.json();

  if (!publicKey || !signature) {
    return NextResponse.json(
      { error: "Public key, signature, and event are required" },
      { status: 400 }
    );
  }

  try {
    // Retrieve the challenge from KV store
    const challenge = await kv.get(`nostr_challenge:${publicKey}`);

    if (!challenge) {
      return NextResponse.json(
        { error: "Challenge not found or expired" },
        { status: 400 }
      );
    }

    const isValid = verifyEvent(signature);

    if (isValid) {
      // Remove the challenge from KV store
      await kv.delete(`nostr_challenge:${publicKey}`);

      const userRepository = apiUserRepository();
      // FIXME: ideally this should require a schema change but
      const user: UserCreateData = {
        sid: `nostr:${publicKey}`,
        sub: `nostr:${publicKey}`,
        name: `Nostr user`,
        image:
          "/assets/nostr-profile.png",
        displayName: publicKey,
      };
      await getOrCreateUser(userRepository, user);

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error verifying signature:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
