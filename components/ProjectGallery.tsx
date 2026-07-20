"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const go = (next: number) => {
    if (images.length < 2) return;
    const wrapped = (next + images.length) % images.length;
    setDirection(next > index ? 1 : -1);
    setIndex(wrapped);
  };

  return (
    <div className="relative">
      <div className="relative aspect-[3/2] w- overflow-hidden rounded-2xl border border-white/10 bg-abyss/60">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            initial={{ x: direction >= 0 ? "100%" : "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction >= 0 ? "-100%" : "100%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) go(index + 1);
              else if (info.offset.x > 80) go(index - 1);
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <Image
              src={images[index]}
              alt={`${alt} — фото ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
              priority={index === 0}
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Предыдущее фото"
              data-cursor-hover
              onClick={() => go(index - 1)}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-onyx/60 text-fog backdrop-blur-md transition-colors hover:border-candy/50 hover:text-candy"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Следующее фото"
              data-cursor-hover
              onClick={() => go(index + 1)}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-onyx/60 text-fog backdrop-blur-md transition-colors hover:border-candy/50 hover:text-candy"
            >
              →
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Фото ${i + 1}`}
              data-cursor-hover
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-candy" : "w-1.5 bg-fog/25"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
