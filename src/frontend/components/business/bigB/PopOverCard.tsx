import Image from "next/image";
import React from "react";
import XLogo from '../../../../../public/assets/X-logo.svg'
interface ITCardProps {
    name: string;
    description: string;
    image: string;
    displayName: string;
    sub: string;
}
const PopOverCard = React.memo(({name, image, displayName, sub} : ITCardProps) => {
  const twitterId = sub.split('|')[1];

  return (
    <div className="bg-white grid grid-cols-3 gap-4 relative max-h-[106px]">
      <div className="col-span-1 space-y-2 relative h-[106px]">
        <Image src={image} alt="" fill style={{objectFit: "cover"}}/>
      </div>
      <a className="col-span-2 space-y-2 p-4" target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/user?user_id=${twitterId}`}>
        <h4 className="font-medium font-poppins text-lg leading-normal text-orange_primary">{name}</h4>
        <p className="text-xs text-gray-600">{displayName}</p>
        <Image alt="X" width={16} height={16} color="orange" src={XLogo} className="text-orange_primary absolute bottom-2 right-2"/>
      </a>
    </div>
  );
});
PopOverCard.displayName = 'PopOverCard'
export default PopOverCard;
