"use client";

import { motion } from "framer-motion";
import { contact } from "@/lib/data";

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const channels = [
  { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  {
    label: "Телефон",
    value: contact.phone,
    href: `tel:${contact.phone.replace(/\s/g, "")}`,
  },
  {
    label: "WhatsApp",
    value: contact.phone,
    href: `https://wa.me/${contact.phone.replace(/\D/g, "")}`,
  },
  { label: "GitHub", value: "serqx0662-creator", href: contact.github },
];

export default function Contact() {
  return (
    <section className="relative px-6 pb-28 md:px-10 md:pb-40">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="flex flex-col gap-6 rounded-2xl border border-candy/20 bg-abyss/60 p-10 sm:flex-row sm:items-center sm:justify-between md:p-14"
        >
          <div>
            <p className="font-mono text-[12px] uppercase tracking-wide text-fog/40">
              Написать напрямую
            </p>
            <p className="mt-2 font-display text-2xl text-fog sm:text-3xl">
              {contact.email}
            </p>
          </div>
          <a
            href={`mailto:${contact.email}`}
            data-cursor-hover
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-candy px-7 py-3 font-mono text-[13px] uppercase tracking-wide text-onyx transition-transform hover:scale-[1.03]"
          >
            Связаться →
          </a>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mt-6 grid gap-4 sm:grid-cols-2"
        >
          {channels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
              data-cursor-hover
              className="group flex items-center justify-between rounded-2xl border border-white/8 bg-abyss/40 px-6 py-5 transition-colors hover:border-candy/30"
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wide text-fog/40">
                  {channel.label}
                </p>
                <p className="mt-1 text-fog/85">{channel.value}</p>
              </div>
              <span className="text-fog/40 transition-transform group-hover:translate-x-1 group-hover:text-candy">
                →
              </span>
            </a>
          ))}
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          className="mt-8 font-mono text-[13px] uppercase tracking-wide text-fog/40"
        >
          {contact.location}
        </motion.p>
      </div>
    </section>
  );
}
