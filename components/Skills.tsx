"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const allSkills = skillGroups.flatMap((g) => g.items);
const marqueeItems = [...allSkills, ...allSkills];

export default function Skills() {
  return (
    <section id="stack" className="relative overflow-hidden py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          className="font-mono text-[13px] uppercase tracking-[0.3em] text-candy/80"
        >
          Стек
        </motion.p>
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mt-4 max-w-2xl font-display text-3xl leading-tight text-fog md:text-4xl"
        >
          Инструменты, с которыми работаю каждый день.
        </motion.h2>
      </div>

      <div className="relative my-16 border-y border-white/5 py-6">
        <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-10">
          {marqueeItems.map((skill, i) => (
            <span
              key={`${skill}-${i}`}
              className="font-display text-3xl text-fog/15 md:text-4xl"
            >
              {skill}
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      <div className="mx-auto grid max-w-6xl gap-x-10 gap-y-10 px-6 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
        {skillGroups.map((group) => (
          <motion.div
            key={group.label}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <p className="font-mono text-[12px] uppercase tracking-wide text-fog/40">
              {group.label}
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="border-b border-white/5 pb-2 font-body text-fog/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
