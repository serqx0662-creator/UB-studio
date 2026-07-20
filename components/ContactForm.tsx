"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { countries, budgetOptions, type Country } from "@/lib/countries";

type Status = "idle" | "sending" | "success" | "error";

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const PAGE_SIZE = 6;

export default function ContactForm() {
  const [country, setCountry] = useState<Country>(countries[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [countryPage, setCountryPage] = useState(0);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState(budgetOptions[0].value);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice(
    countryPage * PAGE_SIZE,
    countryPage * PAGE_SIZE + PAGE_SIZE
  );

  const openDropdown = () => {
    setCountryOpen((v) => !v);
    setCountryPage(0);
    setSearch("");
  };

  useEffect(() => {
    if (!countryOpen) return;
    const onClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [countryOpen]);

  const selectCountry = (c: Country) => {
    setCountry(c);
    setCountryOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorText("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone ? `${country.dial} ${phone}` : "",
          budget: budgetOptions.find((b) => b.value === budget)?.label ?? budget,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorText(data.error ?? "Не удалось отправить сообщение.");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setBudget(budgetOptions[0].value);
    } catch {
      setStatus("error");
      setErrorText("Проверьте соединение и попробуйте снова.");
    }
  };

  return (
    <motion.form
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/8 bg-abyss/60 p-8 md:p-10"
    >
      <h3 className="font-display text-2xl text-fog">Написать о проекте</h3>
      <p className="mt-2 text-sm text-fog/50">
        Заполните форму — сообщение придёт мне напрямую, отвечаю обычно в
        течение дня.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="font-mono text-[11px] uppercase tracking-wide text-fog/40"
          >
            Имя
          </label>
          <input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Как к вам обращаться"
            className="mt-2 w-full rounded-lg border border-white/10 bg-onyx/40 px-4 py-3 text-fog placeholder:text-fog/30 outline-none transition-colors focus:border-candy/50"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="font-mono text-[11px] uppercase tracking-wide text-fog/40"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className="mt-2 w-full rounded-lg border border-white/10 bg-onyx/40 px-4 py-3 text-fog placeholder:text-fog/30 outline-none transition-colors focus:border-candy/50"
          />
        </div>

        <div className="relative sm:col-span-2">
          <label className="font-mono text-[11px] uppercase tracking-wide text-fog/40">
            Телефон
          </label>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              data-cursor-hover
              onClick={openDropdown}
              className="flex shrink-0 items-center gap-2 rounded-lg border border-white/10 bg-onyx/40 px-3 py-3 text-fog transition-colors hover:border-candy/40"
            >
              <span className="text-lg leading-none">{country.flag}</span>
              <span className="font-mono text-sm">{country.dial}</span>
              <span className="text-fog/40 text-xs">▾</span>
            </button>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^\d\s-]/g, ""))}
              placeholder="700 123 456"
              className="w-full rounded-lg border border-white/10 bg-onyx/40 px-4 py-3 text-fog placeholder:text-fog/30 outline-none transition-colors focus:border-candy/50"
            />
          </div>

          {countryOpen && (
            <div
              ref={dropdownRef}
              className="absolute z-20 mt-2 w-full max-w-sm rounded-xl border border-white/10 bg-onyx/95 p-3 backdrop-blur-lg"
            >
              <input
                autoFocus
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCountryPage(0);
                }}
                placeholder="Поиск страны или кода"
                className="w-full rounded-lg border border-white/10 bg-abyss/60 px-3 py-2 text-sm text-fog placeholder:text-fog/30 outline-none focus:border-candy/50"
              />
              <ul className="mt-3 flex flex-col gap-1">
                {pageItems.map((c) => (
                  <li key={c.code}>
                    <button
                      type="button"
                      data-cursor-hover
                      onClick={() => selectCountry(c)}
                      className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm text-fog/80 transition-colors hover:bg-white/5 hover:text-fog"
                    >
                      <span className="text-base leading-none">{c.flag}</span>
                      <span className="flex-1">{c.name}</span>
                      <span className="font-mono text-fog/40">{c.dial}</span>
                    </button>
                  </li>
                ))}
                {pageItems.length === 0 && (
                  <li className="px-2 py-3 text-sm text-fog/40">
                    Ничего не найдено
                  </li>
                )}
              </ul>

              {totalPages > 1 && (
                <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                  <button
                    type="button"
                    data-cursor-hover
                    disabled={countryPage === 0}
                    onClick={() => setCountryPage((p) => Math.max(0, p - 1))}
                    className="font-mono text-[11px] uppercase tracking-wide text-fog/50 transition-colors hover:text-candy disabled:opacity-25"
                  >
                    ← Назад
                  </button>
                  <span className="font-mono text-[11px] text-fog/40">
                    {countryPage + 1} / {totalPages}
                  </span>
                  <button
                    type="button"
                    data-cursor-hover
                    disabled={countryPage >= totalPages - 1}
                    onClick={() =>
                      setCountryPage((p) => Math.min(totalPages - 1, p + 1))
                    }
                    className="font-mono text-[11px] uppercase tracking-wide text-fog/50 transition-colors hover:text-candy disabled:opacity-25"
                  >
                    Далее →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="budget"
            className="font-mono text-[11px] uppercase tracking-wide text-fog/40"
          >
            Бюджет
          </label>
          <select
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="mt-2 w-full rounded-lg border border-white/10 bg-onyx/40 px-4 py-3 text-fog outline-none transition-colors focus:border-candy/50"
          >
            {budgetOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-onyx">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="font-mono text-[11px] uppercase tracking-wide text-fog/40"
          >
            О проекте
          </label>
          <textarea
            id="message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Расскажите, что нужно сделать: тип сайта, сроки, есть ли макет"
            className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-onyx/40 px-4 py-3 text-fog placeholder:text-fog/30 outline-none transition-colors focus:border-candy/50"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        data-cursor-hover
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-candy px-7 py-3 font-mono text-[13px] uppercase tracking-wide text-onyx transition-transform hover:scale-[1.02] disabled:opacity-50"
      >
        {status === "sending" ? "Отправляю…" : "Отправить заявку →"}
      </button>

      {status === "success" && (
        <p className="mt-4 text-sm text-candy">
          Сообщение отправлено. Отвечу в ближайшее время.
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 text-sm text-red-300">{errorText}</p>
      )}
    </motion.form>
  );
}
