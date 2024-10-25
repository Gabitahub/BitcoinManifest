import { NextRequest, NextResponse } from "next/server";
import { verifyEvent, nip19, SimplePool } from "nostr-tools";
import { getOrCreateUser, UserCreateData } from "@/backend/services/auth";
import { apiUserRepository } from "@/backend/entities/users/infra/ApiUserRepository";
import { kv } from "@/backend/services/kv";

async function fetchProfileImage(publicKey: string): Promise<string> {
  try {
    const pool = new SimplePool();
    let relays = [process.env.NOSTR_RELAY || "wss://relay.damus.io"];
    const filter = {
      authors: [publicKey],
      kinds: [0],
      limit: 1,
    };
    let event = await pool.get(relays, filter);
    if (event) {
      const metadata = JSON.parse(event.content);
      return metadata.picture || "/assets/nostr-profile.png";
    }
  } catch (error) {
    console.error("Error fetching profile image:", error);
  }
  return "/assets/nostr-profile.png";
}

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
      await kv.del(`nostr_challenge:${publicKey}`);

      const userRepository = apiUserRepository();
      const profileImage = await fetchProfileImage(publicKey);
      // FIXME: ideally this should require a schema change but
      const user: UserCreateData = {
        sid: `nostr:${publicKey}`,
        sub: `nostr:${publicKey}`,
        name: `Nostr user`,
        image: profileImage,
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
