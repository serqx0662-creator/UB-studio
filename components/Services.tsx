"use client";

import { motion } from "framer-motion";
import { pricingTiers } from "@/lib/data";

const fadeUp = {
    hidden: { y: 28, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Services() {
    return (
        <section className="px-4 pb-20 sm:px-6 sm:pb-28 md:px-10 md:pb-36">
            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
                {pricingTiers.map((tier) => (
                    <motion.div
                        key={tier.id}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeUp}
                        className={`relative flex flex-col rounded-2xl border p-5 sm:p-8 ${
                            tier.featured
                                ? "border-candy/50 bg-abyss/80"
                                : "border-white/8 bg-abyss/60"
                        }`}
                    >
                        {tier.featured && (
                            <span className="absolute -top-3 left-6 sm:left-8 rounded-full bg-candy px-3 py-1 font-mono text-[10px] sm:text-[11px] uppercase tracking-wide text-onyx shadow-md">
                Популярный выбор
              </span>
                        )}

                        <span className="font-mono text-xs sm:text-sm text-candy/60">
              {tier.number}
            </span>
                        <h3 className="mt-2 sm:mt-3 font-display text-xl sm:text-2xl text-fog break-words">
                            {tier.title}
                        </h3>
                        <p className="mt-1 font-mono text-[11px] sm:text-[12px] uppercase tracking-wide text-fog/40">
                            {tier.subtitle}
                        </p>

                        <ul className="mt-6 flex flex-1 flex-col gap-3">
                            {tier.includes.map((item) => (
                                <li
                                    key={item}
                                    className="flex gap-2.5 sm:gap-3 text-xs sm:text-sm leading-relaxed text-fog/70"
                                >
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-candy/60" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 flex flex-wrap items-end justify-between gap-3 border-t border-white/10 pt-6">
                            <div>
                                <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wide text-fog/40">
                                    Цена
                                </p>
                                <p className="mt-1 font-display text-xl sm:text-2xl text-fog">
                                    ${tier.priceFrom}–{tier.priceTo}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wide text-fog/40">
                                    Сроки
                                </p>
                                <p className="mt-1 text-xs sm:text-sm text-fog/80">{tier.timeline}</p>
                            </div>
                        </div>

                        <a
                            href="/contacts"
                            data-cursor-hover
                            className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 sm:px-6 sm:py-3 font-mono text-[12px] sm:text-[13px] uppercase tracking-wide transition-all ${
                                tier.featured
                                    ? "bg-candy text-onyx hover:scale-[1.02]"
                                    : "border border-candy/30 text-candy hover:bg-candy/10"
                            }`}
                        >
                            Обсудить проект
                        </a>
                    </motion.div>
                ))}
            </div>

            <motion.p
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
                variants={fadeUp}
                className="mx-auto mt-8 sm:mt-10 max-w-6xl text-xs sm:text-sm text-fog/40 leading-relaxed"
            >
                Итоговая цена зависит от объёма контента и функциональности. Точную
                оценку и сроки присылаю после короткого обсуждения задачи.
            </motion.p>
        </section>
    );
}