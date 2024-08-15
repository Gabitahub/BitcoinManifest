"use client";
import InputWithAction from "../../ui/inputWithAction";
//import { useEffect, useState } from "react";
import { TOKEN_STATUS, UrlToken } from "@prisma/client";
import { LANGS } from "@/constants";
import { usePathname } from "next/navigation";

export default function InvitesList({ invites, inputActionLabel }: { invites: UrlToken[], inputActionLabel : string }) {
  const pathname = usePathname();
  const currentLang = LANGS.find((l) =>
    pathname.toLowerCase().includes(l.toLowerCase())
  );

  const currentUrl = window.location.href;
  // Extract the domain from the URL
  const domain = new URL(currentUrl).origin;
  const copyContent = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  const validInvites = invites.filter(
    (invite) => invite?.status === TOKEN_STATUS.VALID
  );

  return (
    <div className="grid grid-cols-1 gap-5">
      {validInvites.map((invite: any) => (
        <div className="col-span-full" key={invite?.token}>
          <InputWithAction
            disabled
            initialValue={`${domain}/${currentLang?.toLowerCase()}/${
              invite?.token
            }`}
            handleAction={copyContent}
            actionLabel={inputActionLabel}
          />
        </div>
      ))}
    </div>
  );
}
