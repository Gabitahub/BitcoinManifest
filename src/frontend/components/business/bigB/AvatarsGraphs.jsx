"use client";
import BubbleUI from "react-bubble-ui";
import "react-bubble-ui/dist/index.css";
import Image from "next/image";
import "./styles.css";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { PopoverTrigger, Popover, PopoverContent } from "../../ui/popover";
import PopOverCard from "./PopOverCard";

const w = 50;
const optionsDesktop = {
  size: 81,
  minSize: 50,
  gutter: 0,
  provideProps: true,
  numCols: 10,
  fringeWidth: 100,
  yRadius: 350,
  xRadius: 220,
  cornerRadius: 50,
  showGuides: false,
  compact: true,
  gravitation: 5,
};

const optionsMobile = {
  size: 70,
  minSize: 45,
  gutter: 0,
  provideProps: true,
  numCols: 10,
  fringeWidth: 100,
  yRadius: 200,
  xRadius: 100,
  cornerRadius: 20,
  showGuides: false,
  compact: true,
  gravitation: 5,
};
const ChildComponentEmpty = React.memo(() => {
  return <div className={`bubble childComponent rounded-full bg-orange_primary`} />;
});
ChildComponentEmpty.displayName = "ChildComponentEmpty";

const isValidSibling = (element) => {
  return element?.tagName?.toLowerCase() === "img";
};

const getElements = (targetElement) => {
  const prevSiblings = [];
  const nextSiblings = [];
  const parentElement = targetElement?.parentElement;
  if (!parentElement) return { prevSiblings, nextSiblings };

  let currentPrevSibling = parentElement;
  let currentNextSibling = parentElement;
  for (let i = 0; i < 5; i++) {
    if (currentPrevSibling?.previousElementSibling)
      prevSiblings.push(
        Array.from(currentPrevSibling?.previousElementSibling.children)[0]
      );
    if (currentNextSibling?.nextElementSibling)
      nextSiblings.push(
        Array.from(currentNextSibling?.nextElementSibling.children)[0]
      );
    currentPrevSibling = currentPrevSibling?.previousElementSibling;
    currentNextSibling = currentNextSibling?.nextElementSibling;
  }
  return { prevSiblings, nextSiblings };
};
const AvatarBubble = React.memo(({ data, me, open, setOpen }) => {
  
  const bubleRef = useRef();

  useEffect(() => {
    let isHovered = false;
    const handleHover = () => {
      // Do something when the element is hovered
      isHovered = true;
      const targetElement = bubleRef.current;
      const { prevSiblings, nextSiblings } = getElements(targetElement);

      prevSiblings.forEach((prev) => {
        if (prev && isValidSibling(prev)) {
          prev.classList.remove(...prev.classList);
          prev.classList.add(
            "childComponent",
            "rounded-full",
            "previous-avatar",
            "cursor-pointer"
          );
        }
      });

      nextSiblings.forEach((next) => {
        if (next && isValidSibling(next)) {
          next.classList.remove(...next.classList);
          next.classList.add(
            "childComponent",
            "rounded-full",
            "previous-avatar",
            "cursor-pointer"
          );
        }
      });
    };

    const handleOverLeave = () => {
      // Do something when the element is hovered
      if (!isHovered) {
        const targetElement = bubleRef.current;
        const { prevSiblings, nextSiblings } = getElements(targetElement);
        prevSiblings.forEach((prevChildren) => {
          if (prevChildren && isValidSibling(prevChildren)) {
            prevChildren.classList?.remove("previus-avatar");
            prevChildren.classList?.add(
              "border-[5px]",
              // "border-white",
              "hover:border-orange_secondary",
              "hover:border-[2px]"
            );
          }
        });
        nextSiblings.forEach((nextChildren) => {
          if (nextChildren && isValidSibling(nextChildren)) {
            nextChildren.classList?.remove("previus-avatar");
            nextChildren.classList?.add(
              "border-[5px]",
              //"border-white",
              "hover:border-orange_secondary",
              "hover:border-[2px]"
            );
          }
        });
      }
    };

    const element = bubleRef.current;

    if (element) {
      element.parentElement.addEventListener("mouseenter", handleHover);
      element.parentElement.addEventListener("mouseleave", () => {
        isHovered = false;
        handleOverLeave();
      });

      return () => {
        // Cleanup: remove event listeners when the component is unmounted
        element.parentElement?.removeEventListener("mouseenter", handleHover);
        element.parentElement?.removeEventListener(
          "mouseleave",
          handleOverLeave
        );
      };
    }
  }, []);

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };
  const handleToogleOpen = () => {
    const val = open === data?.sub ? null : data?.sub;
    setOpen(val);
  };
  const avatarClasses = `${
    data?.sub === me?.sub ? "me-avatar" : ""
  } bubble childComponent rounded-full border-[5px] hover:border-orange_secondary hover:border-[2px] cursor-pointer`;
  return (
    <Popover open={open === data?.sub} on>
      <PopoverContent
        className="w-80 bg-white"
        // onMouseEnter={handleMouseEnter}
      >
        <PopOverCard
          name={data.name}
          displayName={data?.displayName}
          sub={data?.sub}
          image={data.image}
        />
      </PopoverContent>
      <PopoverTrigger
        asChild
        // onMouseEnter={handleMouseEnter}
        //  onMouseLeave={handleMouseLeave}
        onClick={(e) => {
          e.preventDefault();
          handleToogleOpen();
        }}
        className={avatarClasses}
      >
        <Image
          ref={bubleRef}
          alt={data?.name}
          width={w}
          height={w}
          src={data.image}
          quality={100}
          className="cursor-pointer"
        />
      </PopoverTrigger>
    </Popover>
  );
});
AvatarBubble.displayName = "AvatarBubble";

const ChildComponent = ({ data, me, open, setOpen }) => {
  return data?.image ? (
    <AvatarBubble data={data} me={me} open={open} setOpen={setOpen} />
  ) : (
    <ChildComponentEmpty />
  );
};

export default function AvatarBubbles({ users, isMobile, me }) {
  const [open, setOpen] = useState(null);
  const options = isMobile ? optionsMobile : optionsDesktop;

  useEffect(() => {
    const bubbles = document.querySelector("._2MD0k");
    const img = document.querySelectorAll(".childComponent");
    img.forEach(
      (i) =>
        (i.ondragstart = () => {
          return false;
        })
    );
    const dragspeed = 2;
    let isDown = false;
    let startX;
    let startY;
    let scrollLeft;
    let scrollTop;

    bubbles.addEventListener("mousedown", (e) => {
      isDown = true;
      bubbles.classList.add("active");
      startX = e.pageX - bubbles.offsetLeft;
      startY = e.pageY - bubbles.offsetTop;
      scrollLeft = bubbles.scrollLeft;
      scrollTop = bubbles.scrollTop;
    });
    bubbles.addEventListener("mouseleave", () => {
      isDown = false;
      bubbles.classList.remove("active");
    });
    bubbles.addEventListener("mouseup", () => {
      isDown = false;
      bubbles.classList.remove("active");
    });
    bubbles.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - bubbles.offsetLeft;
      const y = e.pageY - bubbles.offsetTop;
      const walk = (x - startX) * dragspeed;
      const topwalk = (y - startY) * dragspeed;
      bubbles.scrollLeft = scrollLeft - walk;
      bubbles.scrollTop = scrollTop - topwalk;
    });
  });

  const usersFilled = useMemo(() => {
    const filledArray = Array.from({ length: 700 - users.length }, () => null);

    const middleIndex = Math.floor(filledArray.length / 2);
    let insertIndex = middleIndex;

    // Buscar la posición más cercana al medio donde la posición % 10 es 0
    while (insertIndex % 10 !== 2) {
      insertIndex--;
    }
    if(users.length < 10) insertIndex = insertIndex + (Math.min(Math.round(10 / users.length), 5) - 1);
    const firstHalf = filledArray.slice(0, insertIndex);
    const secondHalf = filledArray.slice(insertIndex);

    return [...firstHalf, ...users, ...secondHalf];
  }, [users]);
  const children = usersFilled?.map((user, i) => {
    return (
      <ChildComponent
        open={open}
        me={me}
        data={user}
        className="child"
        key={user?.sub || i}
        setOpen={setOpen}
      />
    );
  });
  return (
    <BubbleUI
      options={options}
      className="myBubbleUI w-full h-full rotate-3 xl:mt-6"
    >
      {children}
    </BubbleUI>
  );
}
