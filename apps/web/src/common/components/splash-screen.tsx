"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useState } from "react";
import { BRAND_TAGLINE } from "@/common/brand";

const sessionKey = "dreli:splash-seen";
const exitDelay = 2000;
const developmentPreviewDelay = 2500;
const ease = [0.22, 1, 0.36, 1] as const;

// Três faixas da logo como paths separados (traçadas a partir da PNG).
// Para precisão total, troque os "d" pelo SVG exportado do Figma.
const stripes = [
  {
    id: "top",
    delay: 0.15,
    d: "M110 222H640C850 222 1000 390 1000 580C1000 650 985 715 958 745Q948 756 935 752C890 745 850 710 834 672Q832 668 835 662C842 640 846 620 846 598C846 480 750 380 640 380H180C135 380 98 345 98 300V235Q98 222 110 222Z",
  },
  {
    id: "middle",
    delay: 0.3,
    d: "M110 460H470C570 460 640 510 700 580C760 650 800 730 850 760C880 780 910 786 930 786Q940 788 934 796C915 818 890 826 860 826C790 826 720 740 660 690C590 630 520 608 430 608H290C180 608 98 560 98 480Q98 460 110 460Z",
  },
  {
    id: "bottom",
    delay: 0.45,
    d: "M112 665H340C460 665 550 730 622 838H290C190 838 110 770 100 680Q100 665 112 665Z",
  },
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
      transition={{ duration: reduceMotion ? 0.12 : 0.4, ease }}
    >
      <motion.div
        animate={
          leaving ? { opacity: 0, y: -6, scale: 0.98 } : { opacity: 1, y: 0 }
        }
        className="splash-brand"
        initial={false}
        transition={{ duration: leaving ? 0.3 : 0, ease }}
      >
        <div aria-hidden="true" className="splash-symbol">
          <svg
            aria-hidden="true"
            style={{ width: "100%", height: "100%", overflow: "visible" }}
            viewBox="90 215 920 640"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.g
              animate={{ scale: 1 }}
              initial={reduceMotion ? false : { scale: 0.94 }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              transition={{ duration: 1.1, delay: 0.1, ease }}
            >
              {stripes.map(({ id, d, delay }) => (
                <motion.path
                  animate={{ clipPath: "inset(0 0% 0 0)", x: 0, opacity: 1 }}
                  d={d}
                  fill="currentColor"
                  initial={
                    reduceMotion
                      ? false
                      : { clipPath: "inset(0 100% 0 0)", x: -60, opacity: 0 }
                  }
                  key={id}
                  transition={{ duration: 0.7, delay, ease }}
                />
              ))}
            </motion.g>
          </svg>
        </div>

        <motion.span
          animate={{ opacity: 1, x: 0 }}
          className="splash-wordmark"
          initial={reduceMotion ? false : { opacity: 0, x: -18 }}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 1.05, ease }}
        >
          Dreli
        </motion.span>

        <motion.span
          animate={{ opacity: 0.65, y: 0 }}
          className="splash-tagline"
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          transition={{ duration: 0.4, delay: reduceMotion ? 0 : 1.45, ease }}
        >
          {BRAND_TAGLINE}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
