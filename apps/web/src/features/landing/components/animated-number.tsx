"use client";

import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function AnimatedNumber({
  suffix = "",
  value,
}: {
  suffix?: string;
  value: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.8, once: true });
  const reduceMotion = useReducedMotion();
  const [number, setNumber] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: reduceMotion ? 0 : 1.2,
      ease: "easeOut",
      onUpdate: (latest) => setNumber(Math.round(latest)),
    });
    return controls.stop;
  }, [inView, reduceMotion, value]);

  return (
    <motion.span ref={ref}>
      {number}
      {suffix}
    </motion.span>
  );
}
