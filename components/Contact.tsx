"use client";

import { motion } from "framer-motion";
import { contact } from "@/lib/data";

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    contact.email
)}`;

const channels = [
  {
    label: "Email",
    value: contact.email,
    href: gmailUrl
  },
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
      <div className="flex flex-col gap-4 sm:gap-6">
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="flex flex-col gap-4 rounded-2xl border border-candy/20 bg-abyss/60 p-5 xs:p-6 sm:p-8"
        >
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wide text-fog/40">
              Написать напрямую
            </p>
            <p className="mt-1 font-display text-base xs:text-lg sm:text-xl md:text-2xl text-fog truncate">
              {contact.email}
            </p>
          </div>
          <div>
            <a
                href={gmailUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-candy px-5 py-2.5 font-mono text-[11px] sm:text-[12px] uppercase tracking-wide text-onyx transition-transform hover:scale-[1.03]"
            >
              Написать в Gmail →
            </a>
          </div>
        </motion.div>

        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="grid gap-3 sm:gap-4 sm:grid-cols-2"
        >
          {channels.map((channel) => (
              <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                  data-cursor-hover
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-abyss/40 px-4 py-3.5 sm:px-5 sm:py-4 transition-colors hover:border-candy/30 min-w-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wide text-fog/40">
                    {channel.label}
                  </p>
                  <p className="mt-0.5 text-xs sm:text-sm text-fog/85 truncate">
                    {channel.value}
                  </p>
                </div>
                <span className="shrink-0 text-fog/40 text-xs transition-transform group-hover:translate-x-1 group-hover:text-candy">
              →
            </span>
              </a>
          ))}
        </motion.div>

        <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="font-mono text-[11px] sm:text-[12px] uppercase tracking-wide text-fog/40 pt-1 px-1"
        >
          {contact.location}
        </motion.p>
      </div>
  );
}