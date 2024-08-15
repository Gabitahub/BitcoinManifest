"use client";
import React, { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const TypingAnimation = ({ text, className, once, el }: any) => {
  const [visibleText, setVisibleText] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once });

  useEffect(() => {
    let timeoutId: any;
    const textArray = text.split("");
    //if (isInView) {
      const addNextLetter = (index: any) => {
        if (index < textArray.length) {
          setVisibleText((prevText) => prevText + textArray[index]);
          timeoutId = setTimeout(() => addNextLetter(index + 1), 100); // Adjust the duration between letters
        }
      };

      // Clear visibleText when text changes
      setVisibleText("");
      addNextLetter(0);
   // }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text, isInView]);

  //const MotionEl: any = useMemo(() => { return motion[el as keyof typeof motion]}, [el]) ;
  const Element = el
  return (
      <Element
        ref={ref}
        key={text} // Ensure that motion updates when the text changes
     //   animate={isInView ? { opacity: 1 } : { opacity: 0 }}
       // exit={{ opacity: 0 }}
        className={className}
     //   initial={{ opacity: 0 }}
      //  whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      //  transition={{ duration: 1, ease: "easeIn" }}
      >
        {visibleText}
      </Element>
  );
};

export default TypingAnimation;
