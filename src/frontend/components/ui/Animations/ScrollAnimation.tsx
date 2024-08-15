"use client";
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ScrollingAnimation = ({ children, className, el }: any) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false
  });
  const control = useAnimation();

  useEffect(() => {
    control.start(inView ? "visible" : "hidden");
  }, [control, inView]);

  const boxVariant = {
    visible: {
      opacity: 1, scale: 1, y: 0,
      //transition: { ease: "easeIn", duration: 0.5 },
    },
    hidden: {
      opacity: 0,
      scale: 0.65,
      y: 50,
      //transition: { ease: "easeOut", duration: 0.5 },
    },
  };
  const MotionEl: any = motion[el as keyof typeof motion];
  return (
    <MotionEl
      ref={ref}
      className={className}
      initial="hidden"
      exit="hidden"
      variants={boxVariant}
      transition={{ duration: 1, ease: "easeOut" }}
      //animate={control}
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </MotionEl>
  );
};

export default ScrollingAnimation;
