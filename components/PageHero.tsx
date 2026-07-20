"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function PageHero({
                                   eyebrow,
                                   title,
                                   intro,
                                 }: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
      <section className="pb-12 pt-28 px-6 sm:pb-16 sm:pt-36 md:px-10 md:pb-20 md:pt-48 overflow-hidden">
        <div className="mx-auto max-w-6xl">
          <motion.p
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="font-mono text-[11px] sm:text-[13px] uppercase tracking-[0.3em] text-candy/80"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
              initial="hidden"
              animate="show"
              variants={fadeUp}
              transition={{ delay: 0.1 }}
              className="mt-3 sm:mt-4 max-w-3xl font-display text-3xl sm:text-5xl md:text-6xl leading-[1.08] sm:leading-[1.05] text-fog break-words"
          >
            {title}
          </motion.h1>
          {intro && (
              <motion.p
                  initial="hidden"
                  animate="show"
                  variants={fadeUp}
                  transition={{ delay: 0.2 }}
                  className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-fog/70"
              >
                {intro}
              </motion.p>
          )}
        </div>
      </section>
  );
}