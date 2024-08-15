"use client";
import React from "react";
import AvatarsGraph from "./AvatarsGraphs.jsx";
import { isMobile, isSafari } from "@/frontend/utils";
import PresenceAnimation from "../../ui/Animations/PresenceAnimation";

const BigBMobile = ({ users }: { users: any[]; }) => {
  const mobile = isMobile();
  const showComponent = isSafari() || mobile;

  return (
    <PresenceAnimation el="div">
      {showComponent && (
        <div className="h-[70vh] w-[100%] lg:h-[90vh]">
          <div
            className="h-full"
            style={{
              mask: "url(/assets/b2.svg)",
              WebkitMaskImage: "url(/assets/b2.svg)",
              maskImage: "url(/assets/b2.svg)",
              WebkitMaskBoxImageRepeat: "unset",
              maskRepeat: "no-repeat", // Added to prevent mask repeat
              maskSize: "100%",
            }}
          >
            <AvatarsGraph me={null} users={users} isMobile={mobile} />
          </div>
        </div>
      )}
    </PresenceAnimation>
  );
};

export default BigBMobile;
