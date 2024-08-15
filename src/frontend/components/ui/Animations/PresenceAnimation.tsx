import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const PresenceAnimation = ({ children, className, el }: any) => {
  const MotionEl: any = motion[el as keyof typeof motion];
  return (
    <AnimatePresence>
      <MotionEl
        className={className}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ ease: "easeOut", duration: 1 }}
      >
        {children}
      </MotionEl>
    </AnimatePresence>
  );
};

export default PresenceAnimation;
