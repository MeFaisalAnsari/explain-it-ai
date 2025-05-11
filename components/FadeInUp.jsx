import React from "react";
import { motion } from "framer-motion";

const FadeInUp = ({ children, delay = 0, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FadeInUp;
