"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "../../ui/use-toast";

const handleNostrSignIn = async (
  router: AppRouterInstance | string[],
  displayError: () => void
) => {
  try {
    const nostr = (window as any).nostr;
    const pubKey = await nostr.getPublicKey();
    const response = await fetch("/api/auth/nostr/challenge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicKey: pubKey }),
    });
    const data = await response.json();
    if (data.challenge) {
      // Asking the extension to sign the challenge
      const signature = await nostr.signEvent({
        pubkey: pubKey,
        kind: 1,
        tags: [],
        content: data.challenge,
        created_at: Math.floor(Date.now() / 1000),
      });

      // Verify the challenge
      const verifyResponse = await fetch("/api/auth/nostr/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicKey: pubKey, signature }),
      });
      const verifyData = await verifyResponse.json();

      if (verifyData.success) {
        // Redirect to /congrats page after successful sign-in
        router.push(`/congrats?nostr=${pubKey}`);
      } else {
        throw new Error("Nostr sign-in verification failed");
      }
    }
  } catch (error) {
    displayError();
    console.error("Error during Nostr sign-in:", error);
    
  }
};

export default function NostrSignButton({ label, errorMsg }: { label: string, errorMsg: string }) {
  const router = useRouter();
  const toast = useToast();
  // Check if window is defined and if window.nostr exists before accessing it
  if (typeof window === "undefined" || !("nostr" in window)) {
    return <></>;
  }

  const displayError = () => { 
    toast.toast({
      variant: "destructive",
      title: "Sign-in Error",
      description: "An error occurred during Nostr sign-in. Please try again.",
    });
  }

  return (
    <Button onClick={() => handleNostrSignIn(router, displayError)}>{label}</Button>
  );
}
