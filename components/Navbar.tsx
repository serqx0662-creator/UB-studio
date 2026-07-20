"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const links = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "Обо мне" },
  { href: "/services", label: "Услуги" },
  { href: "/portfolio", label: "Портфолио" },
  { href: "/contacts", label: "Контакты" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-onyx/60 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link
          href="/"
          data-cursor-hover
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5 font-display text-sm tracking-[0.2em] text-fog"
        >
          <Logo size={30} />
          UB<span className="text-candy"> STUDIO</span>
        </Link>

        <ul className="hidden gap-8 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  data-cursor-hover
                  className={`font-mono text-[13px] uppercase tracking-wide transition-colors ${
                    active ? "text-candy" : "text-fog/60 hover:text-candy"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/contacts"
          data-cursor-hover
          className="hidden rounded-full border border-candy/30 px-4 py-2 font-mono text-[12px] uppercase tracking-wide text-candy transition-colors hover:border-candy hover:bg-candy/10 md:inline-block"
        >
          Связаться
        </Link>

        <button
          type="button"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          data-cursor-hover
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={`h-px w-5 bg-fog transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-5 bg-fog transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-white/5 bg-onyx/95 md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block py-3 font-mono text-[13px] uppercase tracking-wide ${
                        active ? "text-candy" : "text-fog/70"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2">
                <Link
                  href="/contacts"
                  onClick={() => setOpen(false)}
                  className="inline-block rounded-full border border-candy/30 px-4 py-2 font-mono text-[12px] uppercase tracking-wide text-candy"
                >
                  Связаться
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
