"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFine, setIsFine] = useState(true);

  const cx = useMotionValue(-100);
  const cy = useMotionValue(-100);
  const springConfig = { damping: 26, stiffness: 260, mass: 0.5 };
  const x = useSpring(cx, springConfig);
  const y = useSpring(cy, springConfig);

  const dotX = useSpring(cx, { damping: 40, stiffness: 900, mass: 0.2 });
  const dotY = useSpring(cy, { damping: 40, stiffness: 900, mass: 0.2 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setIsFine(fine);
    if (!fine) return;

    const move = (e: MouseEvent) => {
      cx.set(e.clientX);
      cy.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [data-cursor-hover]"
      );
      setIsPointer(Boolean(interactive));
    };

    const hide = () => setIsVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", hide);
    };
  }, [cx, cy, isVisible]);

  if (!isFine) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: isPointer ? 56 : 32,
          height: isPointer ? 56 : 32,
          border: "1px solid rgba(178,213,229,0.55)",
          background: isPointer
            ? "radial-gradient(circle, rgba(178,213,229,0.18) 0%, rgba(178,213,229,0) 70%)"
            : "transparent",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ width: 0.25, height: 0.25, opacity: 0.2 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full bg-candy"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
