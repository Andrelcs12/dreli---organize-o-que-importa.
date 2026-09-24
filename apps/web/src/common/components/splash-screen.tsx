"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";

const sessionKey = "dreli:splash-seen";
const exitDelay = 2200;

const strokeVariants = [
  { clipPath: "inset(0 0 66.66% 0)", delay: 0.2 },
  { clipPath: "inset(33.33% 0 33.33% 0)", delay: 0.31 },
  { clipPath: "inset(66.66% 0 0 0)", delay: 0.42 },
];

export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (sessionStorage.getItem(sessionKey)) setVisible(false);
    else sessionStorage.setItem(sessionKey, "true");
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(
      () => setLeaving(true),
      reduceMotion ? 120 : exitDelay,
    );
    return () => window.clearTimeout(timer);
  }, [reduceMotion, visible]);

  if (!visible) return null;

  return (
    <motion.div
      animate={leaving ? { opacity: 0 } : { opacity: 1 }}
      aria-hidden="true"
      className="splash-screen"
      initial={{ opacity: 1 }}
      onAnimationComplete={() => {
        if (leaving) setVisible(false);
      }}
      transition={{
        duration: reduceMotion ? 0.12 : 0.38,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        animate={
          leaving
            ? { opacity: 0, y: -5 }
            : { opacity: 1, y: 0, scale: reduceMotion ? 1 : [0.98, 0.98, 1] }
        }
        className="splash-brand"
        initial={reduceMotion ? false : { scale: 0.98 }}
        transition={{
          duration: reduceMotion ? 0.01 : 1.2,
          ease: [0.22, 1, 0.36, 1],
          times: [0, 0.72, 1],
        }}
      >
        <div aria-hidden="true" className="splash-symbol">
          {strokeVariants.map(({ clipPath, delay }) => (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="splash-stroke"
              initial={reduceMotion ? false : { opacity: 0, x: -12 }}
              key={clipPath}
              style={{ clipPath }}
              transition={{ duration: 0.42, delay, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image alt="" fill priority sizes="132px" src="/icon.png" />
            </motion.div>
          ))}
        </div>

        <motion.span
          animate={{ opacity: 1, x: 0 }}
          className="splash-wordmark"
          initial={reduceMotion ? false : { opacity: 0, x: -8 }}
          transition={{
            duration: 0.35,
            delay: reduceMotion ? 0 : 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Dreli
        </motion.span>

        <motion.span
          animate={{ opacity: 0.65, y: 0 }}
          className="splash-tagline"
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          transition={{
            duration: 0.32,
            delay: reduceMotion ? 0 : 1.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Own your rhythm.
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
