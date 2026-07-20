"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { y: 28, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  return (
      <section
          id="top"
          className="relative flex min-h-[100svh] flex-col justify-center pt-24 pb-12 px-6 md:px-10 md:pt-28"
      >
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 sm:gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.p
                variants={item}
                className="mb-4 sm:mb-6 font-mono text-[11px] sm:text-[13px] uppercase tracking-[0.3em] text-candy/80"
            >
              Бишкек · Кыргызстан
            </motion.p>

            <motion.h1
                variants={item}
                className="font-display text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[4.5vw] font-medium leading-[1.05] sm:leading-[0.95] tracking-tight text-fog break-words"
            >
              Улукбек
              <br />
              <span className="text-gradient">Турдукулов</span>
            </motion.h1>

            <motion.div
                variants={item}
                className="mt-6 sm:mt-8 flex max-w-2xl flex-col gap-6 md:mt-10"
            >
              <p className="max-w-xl font-body text-sm sm:text-base text-fog/70 md:text-lg leading-relaxed">
                Разрабатываю быстрые, аккуратные интерфейсы на{" "}
                <span className="text-fog font-medium">React</span> и{" "}
                <span className="text-fog font-medium">Next.js</span> — от идеи и
                архитектуры до продакшена.
              </p>
              <div className="flex flex-wrap gap-6 sm:gap-8 font-mono text-[11px] sm:text-[12px] uppercase tracking-wide text-fog/50">
                <div>
                  <p className="text-xl sm:text-2xl font-display text-fog">3+</p>
                  <p>реализованных проекта</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-display text-fog">React</p>
                  <p>/ Next.js стек</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none mb-6 sm:mb-0"
          >
            <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[2rem]">
                <div
                    className="absolute -inset-4 sm:-inset-6 opacity-70 blur-2xl"
                    style={{
                      background:
                          "radial-gradient(circle, rgba(178,213,229,0.45) 0%, rgba(92,146,184,0.25) 45%, transparent 75%)",
                    }}
                />
              </div>

              <div className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[1.75rem] border border-white/10 bg-abyss/40">
                <Image
                    src="/profile.jpg"
                    alt="Улукбек Турдукулов"
                    width={640}
                    height={640}
                    priority
                    className="aspect-square w-full object-cover grayscale-[15%]"
                />
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                          "linear-gradient(200deg, rgba(2,2,2,0) 40%, rgba(2,2,2,0.55) 100%)",
                    }}
                />
              </div>

              <div className="absolute -bottom-3 left-3 sm:-bottom-4 sm:left-4 z-10 rounded-xl border border-candy/25 bg-onyx/90 px-3.5 py-1.5 sm:px-4 sm:py-2 backdrop-blur-md shadow-lg">
                <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wide text-candy/90">
                  Открыт для проектов
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="pointer-events-none hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
        >
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog/40">
          Scroll
        </span>
          <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="h-8 w-px bg-gradient-to-b from-candy/70 to-transparent"
          />
        </motion.div>
      </section>
  );
}