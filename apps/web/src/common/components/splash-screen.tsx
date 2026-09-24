"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";

const sessionKey = "dreli:splash-seen";
const exitDelay = 2200;
const developmentPreviewDelay = 4200;

const strokeVariants = [
  { className: "splash-reveal-mask-top", delay: 0.2 },
  { className: "splash-reveal-mask-middle", delay: 0.31 },
  { className: "splash-reveal-mask-bottom", delay: 0.42 },
];

export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const reduceMotion = useReducedMotion();
  const isDevelopmentPreview = process.env.NODE_ENV === "development";

  useLayoutEffect(() => {
    if (isDevelopmentPreview) return;

    if (sessionStorage.getItem(sessionKey)) setVisible(false);
    else sessionStorage.setItem(sessionKey, "true");
  }, [isDevelopmentPreview]);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(
      () => setLeaving(true),
      reduceMotion
        ? 120
        : isDevelopmentPreview
          ? developmentPreviewDelay
          : exitDelay,
    );
    return () => window.clearTimeout(timer);
  }, [isDevelopmentPreview, reduceMotion, visible]);

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
        animate={leaving ? { opacity: 0, y: -5 } : { opacity: 1, y: 0 }}
        className="splash-brand"
        initial={false}
        transition={{
          duration: reduceMotion ? 0.01 : leaving ? 0.28 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div aria-hidden="true" className="splash-symbol">
          <Image alt="" fill priority sizes="132px" src="/icon.png" />
          {!reduceMotion &&
            strokeVariants.map(({ className, delay }) => (
              <motion.div
                animate={{ clipPath: "inset(0 0 0 100%)", opacity: 0 }}
                className={`splash-reveal-mask ${className}`}
                initial={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
                key={className}
                transition={{ duration: 0.42, delay, ease: [0.22, 1, 0.36, 1] }}
              />
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
