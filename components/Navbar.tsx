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

const menuVariants = {
  closed: {
    opacity: 0,
    y: "-100%",
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
      when: "afterChildren",
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  closed: { opacity: 0, y: 20 },
  open: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

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
        <nav className="relative z-50 mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
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
              className="relative z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-onyx/80 backdrop-blur-md transition-colors hover:border-candy/40 md:hidden"
          >
            <div className="flex h-4 w-5 flex-col justify-between">
              <motion.span
                  animate={open ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[1.5px] w-full rounded-full bg-fog origin-center"
              />
              <motion.span
                  animate={open ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-[1.5px] w-full rounded-full bg-candy"
              />
              <motion.span
                  animate={open ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[1.5px] w-full rounded-full bg-fog origin-center"
              />
            </div>
          </button>
        </nav>

        <AnimatePresence>
          {open && (
              <motion.div
                  variants={menuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="fixed inset-x-0 top-0 z-40 flex h-screen w-full flex-col justify-between bg-onyx/100 px-6 pt-28 pb-12 backdrop-blur-2xl md:hidden"
              >
                <div className="flex flex-col gap-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog/30">
                Навигация
              </span>

                  <ul className="flex flex-col gap-4">
                    {links.map((link) => {
                      const active = pathname === link.href;
                      return (
                          <motion.li key={link.href} variants={itemVariants}>
                            <Link
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className={`flex items-center justify-between font-display text-2xl tracking-wide transition-colors ${
                                    active ? "text-candy" : "text-fog/80 hover:text-fog"
                                }`}
                            >
                              <span>{link.label}</span>
                              {active && (
                                  <span className="font-mono text-xs text-candy">●</span>
                              )}
                            </Link>
                          </motion.li>
                      );
                    })}
                  </ul>
                </div>

                <motion.div variants={itemVariants} className="flex flex-col gap-4 border-t border-white/10 pt-6">
                  <Link
                      href="/contacts"
                      onClick={() => setOpen(false)}
                      className="flex w-full items-center justify-center rounded-full bg-candy py-3.5 font-mono text-xs uppercase tracking-wide text-onyx font-medium"
                  >
                    Обсудить проект →
                  </Link>
                  <p className="text-center font-mono text-[11px] text-fog/40">
                    UB Studio — Бишкек, Кыргызстан
                  </p>
                </motion.div>
              </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
  );
}