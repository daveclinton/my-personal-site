"use client";

import { useScroll, motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface ProgressBarProps {
  color?: string;
}

export default function ProgressBar({
  color = "bg-pink-500",
}: ProgressBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.001,
  });

  const delayedScaleX = useTransform(scaleX, [0, 1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 50;
      if (show !== isVisible) setIsVisible(show);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 ${color} origin-left z-50`}
      style={{ scaleX: delayedScaleX }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.5 }}
    />
  );
}
