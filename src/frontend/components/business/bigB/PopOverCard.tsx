import Image from "next/image";
import React from "react";
import XLogo from "../../../../../public/assets/X-logo.svg";
interface ITCardProps {
  name: string;
  description: string;
  image: string;
  displayName: string;
  sub: string;
}
const PopOverCard = React.memo(
  ({ name, image, displayName, sub }: ITCardProps) => {
    // FIXME: dirty hack to make this work without touching the db schema
    const isNostr = sub.startsWith("nostr:");

    const subName = sub.split("|")[1];

    return (
      <div className="bg-white grid grid-cols-3 gap-4 relative max-h-[106px]">
        <div className="col-span-1 space-y-2 relative h-[106px]">
          <Image src={image} alt="" fill objectFit="cover" />
        </div>
        <a
          className="col-span-2 space-y-2 p-4"
          target="_blank"
          rel="noopener noreferrer"
          href={
            !isNostr ? `https://twitter.com/intent/user?user_id=${subName}` : "https://nostr.com/"
          }
        >
          <h4 className="font-medium font-poppins text-lg leading-normal text-orange_primary truncate">
            {name}
          </h4>
          <p className="text-xs text-gray-600 truncate" title={displayName}>{displayName}</p>
          {!isNostr &&
          <Image
            alt="X"
            width={16}
            height={16}
            color="orange"
            src={XLogo}
            className="text-orange_primary absolute bottom-2 right-2"
          />
        }
        </a>
      </div>
    );
  }
);
PopOverCard.displayName = "PopOverCard";
export default PopOverCard;
