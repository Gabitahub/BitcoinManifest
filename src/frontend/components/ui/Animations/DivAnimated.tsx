"use client"
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const DivAnimated = ({ children, variants, ...props }: any) => {
  const [ref, inView] = useInView({
    threshold: 0.5, // adjust as needed
  });

  const defaultVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
    hidden: {
      opacity: 0,
      y: 200,
    },
  };

  return (
    <motion.div
      ref={ref}
      {...props}
      variants={variants || defaultVariants}
      initial="hidden"
      animate={inView && "visible"}
    >
      {children}
    </motion.div>
  );
};

export default DivAnimated;
