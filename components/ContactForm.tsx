"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { countries, budgetOptions, type Country } from "@/lib/countries";

type Status = "idle" | "sending" | "error";

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const PAGE_SIZE = 6;

function formatPhoneNumber(value: string, maxLength: number) {
  const digits = value.replace(/\D/g, "").slice(0, maxLength);

  if (maxLength === 9) {
    const part1 = digits.slice(0, 3);
    const part2 = digits.slice(3, 6);
    const part3 = digits.slice(6, 9);
    return [part1, part2, part3].filter(Boolean).join(" ");
  }

  if (maxLength === 10) {
    const part1 = digits.slice(0, 3);
    const part2 = digits.slice(3, 6);
    const part3 = digits.slice(6, 8);
    const part4 = digits.slice(8, 10);
    return [part1, part2, part3, part4].filter(Boolean).join(" ");
  }

  return digits.match(/.{1,3}/g)?.join(" ") ?? digits;
}

export default function ContactForm() {
  const [country, setCountry] = useState<Country>(countries[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [countryPage, setCountryPage] = useState(0);
  const [search, setSearch] = useState("");

  const [budgetOpen, setBudgetOpen] = useState(false);
  const [budget, setBudget] = useState(budgetOptions[0].value);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [errorText, setErrorText] = useState("");
  const [showModal, setShowModal] = useState(false);

  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const budgetDropdownRef = useRef<HTMLDivElement>(null);

  const selectedBudgetObj = useMemo(
      () => budgetOptions.find((b) => b.value === budget) ?? budgetOptions[0],
      [budget]
  );

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

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
          countryDropdownRef.current &&
          !countryDropdownRef.current.contains(e.target as Node)
      ) {
        setCountryOpen(false);
      }
      if (
          budgetDropdownRef.current &&
          !budgetDropdownRef.current.contains(e.target as Node)
      ) {
        setBudgetOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value, country.length);
    setPhone(formatted);
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const selectCountry = (c: Country) => {
    setCountry(c);
    setPhone(formatPhoneNumber(phone, c.length));
    setCountryOpen(false);
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = "Укажите имя (минимум 2 символа)";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = "Введите корректный email адрес";
    }

    const rawPhoneDigits = phone.replace(/\D/g, "");
    if (!rawPhoneDigits) {
      newErrors.phone = "Укажите номер телефона";
    } else if (rawPhoneDigits.length < country.length) {
      newErrors.phone = `Номер должен содержать ${country.length} цифр`;
    }

    if (!message.trim() || message.trim().length < 10) {
      newErrors.message = "Опишите проект чуть подробнее (минимум 10 символов)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus("sending");
    setErrorText("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: `${country.dial} ${phone}`,
          budget: selectedBudgetObj.label,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorText(data.error ?? "Не удалось отправить сообщение.");
        return;
      }

      setStatus("idle");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setBudget(budgetOptions[0].value);
      setErrors({});
      setShowModal(true);
    } catch {
      setStatus("error");
      setErrorText("Проверьте соединение и попробуйте снова.");
    }
  };

  return (
      <>
        <motion.form
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            onSubmit={handleSubmit}
            noValidate
            className="w-full max-w-full min-w-0 rounded-2xl border border-white/8 bg-abyss/60 p-4 sm:p-8 md:p-10 overflow-hidden box-border"
        >
          <h3 className="font-display text-xl sm:text-2xl text-fog">Написать о проекте</h3>
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-fog/50">
            Заполните форму — сообщение придёт мне напрямую, отвечаю обычно в течение дня.
          </p>

          <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 sm:grid-cols-2 w-full min-w-0">
            <div className="w-full min-w-0">
              <label
                  htmlFor="name"
                  className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wide text-fog/40"
              >
                Имя *
              </label>
              <input
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholder="Как к вам обращаться"
                  className={`mt-1.5 sm:mt-2 w-full min-w-0 box-border rounded-lg border bg-onyx/40 px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-base text-fog placeholder:text-fog/30 outline-none transition-colors ${
                      errors.name
                          ? "border-red-500/80 focus:border-red-500"
                          : "border-white/10 focus:border-candy/50"
                  }`}
              />
              {errors.name && (
                  <p className="mt-1 text-[11px] text-red-400 font-mono">{errors.name}</p>
              )}
            </div>

            <div className="w-full min-w-0">
              <label
                  htmlFor="email"
                  className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wide text-fog/40"
              >
                Email *
              </label>
              <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="name@company.com"
                  className={`mt-1.5 sm:mt-2 w-full min-w-0 box-border rounded-lg border bg-onyx/40 px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-base text-fog placeholder:text-fog/30 outline-none transition-colors ${
                      errors.email
                          ? "border-red-500/80 focus:border-red-500"
                          : "border-white/10 focus:border-candy/50"
                  }`}
              />
              {errors.email && (
                  <p className="mt-1 text-[11px] text-red-400 font-mono">{errors.email}</p>
              )}
            </div>

            <div className="relative sm:col-span-2 w-full min-w-0">
              <label className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wide text-fog/40">
                Телефон *
              </label>
              <div className="mt-1.5 sm:mt-2 flex gap-2 w-full min-w-0">
                <button
                    type="button"
                    data-cursor-hover
                    onClick={() => {
                      setCountryOpen((v) => !v);
                      setCountryPage(0);
                      setSearch("");
                    }}
                    className="flex shrink-0 items-center gap-1 sm:gap-2 rounded-lg border border-white/10 bg-onyx/40 px-2 sm:px-3 py-2.5 sm:py-3 text-fog transition-colors hover:border-candy/40"
                >
                  <span className="text-sm sm:text-lg leading-none">{country.flag}</span>
                  <span className="font-mono text-xs sm:text-sm">{country.dial}</span>
                  <span className="text-fog/40 text-[10px] sm:text-xs">▾</span>
                </button>
                <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder={country.placeholder || "709 882 696"}
                    className={`w-full min-w-0 box-border rounded-lg border bg-onyx/40 px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-base text-fog placeholder:text-fog/30 outline-none transition-colors ${
                        errors.phone
                            ? "border-red-500/80 focus:border-red-500"
                            : "border-white/10 focus:border-candy/50"
                    }`}
                />
              </div>
              {errors.phone && (
                  <p className="mt-1 text-[11px] text-red-400 font-mono">{errors.phone}</p>
              )}

              {countryOpen && (
                  <div
                      ref={countryDropdownRef}
                      className="absolute z-30 mt-2 w-full max-w-xs sm:max-w-sm rounded-xl border border-white/10 bg-onyx/95 p-3 backdrop-blur-lg shadow-2xl left-0"
                  >
                    <input
                        autoFocus
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                          setCountryPage(0);
                        }}
                        placeholder="Поиск страны или кода"
                        className="w-full rounded-lg border border-white/10 bg-abyss/60 px-3 py-2 text-xs sm:text-sm text-fog placeholder:text-fog/30 outline-none focus:border-candy/50"
                    />
                    <ul className="mt-2.5 flex flex-col gap-1 max-h-52 overflow-y-auto">
                      {pageItems.map((c) => (
                          <li key={c.code}>
                            <button
                                type="button"
                                data-cursor-hover
                                onClick={() => selectCountry(c)}
                                className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-xs sm:text-sm text-fog/80 transition-colors hover:bg-white/5 hover:text-fog"
                            >
                              <span className="text-base leading-none">{c.flag}</span>
                              <span className="flex-1 truncate">{c.name}</span>
                              <span className="font-mono text-fog/40 text-xs">{c.dial}</span>
                            </button>
                          </li>
                      ))}
                    </ul>

                    {totalPages > 1 && (
                        <div className="mt-2.5 flex items-center justify-between border-t border-white/10 pt-2.5">
                          <button
                              type="button"
                              data-cursor-hover
                              disabled={countryPage === 0}
                              onClick={() => setCountryPage((p) => Math.max(0, p - 1))}
                              className="font-mono text-[10px] uppercase tracking-wide text-fog/50 transition-colors hover:text-candy disabled:opacity-25"
                          >
                            ← Назад
                          </button>
                          <span className="font-mono text-[10px] text-fog/40">
                      {countryPage + 1} / {totalPages}
                    </span>
                          <button
                              type="button"
                              data-cursor-hover
                              disabled={countryPage >= totalPages - 1}
                              onClick={() =>
                                  setCountryPage((p) => Math.min(totalPages - 1, p + 1))
                              }
                              className="font-mono text-[10px] uppercase tracking-wide text-fog/50 transition-colors hover:text-candy disabled:opacity-25"
                          >
                            Далее →
                          </button>
                        </div>
                    )}
                  </div>
              )}
            </div>

            <div className="relative sm:col-span-2 w-full min-w-0">
              <label className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wide text-fog/40">
                Бюджет
              </label>
              <button
                  type="button"
                  data-cursor-hover
                  onClick={() => setBudgetOpen((v) => !v)}
                  className="mt-1.5 sm:mt-2 flex w-full min-w-0 box-border items-center justify-between rounded-lg border border-white/10 bg-onyx/40 px-3.5 py-2.5 sm:px-4 sm:py-3 text-left transition-colors hover:border-candy/40"
              >
              <span className="truncate min-w-0 text-xs sm:text-base text-fog pr-2">
                {selectedBudgetObj.label}
              </span>
                <span className="text-fog/40 text-xs shrink-0">▾</span>
              </button>

              {budgetOpen && (
                  <div
                      ref={budgetDropdownRef}
                      className="absolute z-20 mt-2 w-full rounded-xl border border-white/10 bg-onyx/95 p-1.5 backdrop-blur-lg shadow-2xl left-0 right-0"
                  >
                    {budgetOptions.map((opt) => (
                        <button
                            key={opt.value}
                            type="button"
                            data-cursor-hover
                            onClick={() => {
                              setBudget(opt.value);
                              setBudgetOpen(false);
                            }}
                            className={`flex w-full items-center rounded-lg px-3 py-2.5 text-left text-xs sm:text-sm transition-colors whitespace-normal break-words ${
                                opt.value === budget
                                    ? "bg-candy/15 text-candy font-medium"
                                    : "text-fog/80 hover:bg-white/5 hover:text-fog"
                            }`}
                        >
                          <span>{opt.label}</span>
                        </button>
                    ))}
                  </div>
              )}
            </div>

            <div className="sm:col-span-2 w-full min-w-0">
              <label
                  htmlFor="message"
                  className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wide text-fog/40"
              >
                О проекте *
              </label>
              <textarea
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                  }}
                  placeholder="Расскажите, что нужно сделать: тип сайта, сроки, есть ли макет"
                  className={`mt-1.5 sm:mt-2 w-full min-w-0 box-border resize-none rounded-lg border bg-onyx/40 px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-base text-fog placeholder:text-fog/30 outline-none transition-colors ${
                      errors.message
                          ? "border-red-500/80 focus:border-red-500"
                          : "border-white/10 focus:border-candy/50"
                  }`}
              />
              {errors.message && (
                  <p className="mt-1 text-[11px] text-red-400 font-mono">{errors.message}</p>
              )}
            </div>
          </div>

          <button
              type="submit"
              disabled={status === "sending"}
              data-cursor-hover
              className="mt-6 sm:mt-8 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-candy px-7 py-3 font-mono text-[12px] sm:text-[13px] uppercase tracking-wide text-onyx transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {status === "sending" ? "Отправляю…" : "Отправить заявку →"}
          </button>

          {status === "error" && (
              <p className="mt-4 text-xs sm:text-sm text-red-400 font-mono">{errorText}</p>
          )}
        </motion.form>

        <AnimatePresence>
          {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowModal(false)}
                    className="absolute inset-0 bg-abyss/80 backdrop-blur-md"
                />

                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 15 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 15 }}
                    transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
                    className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-onyx/90 p-6 sm:p-8 text-center shadow-2xl backdrop-blur-xl overflow-hidden"
                >
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-candy/20 rounded-full blur-2xl pointer-events-none" />

                  <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-candy/10 text-candy border border-candy/30 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                    <svg
                        className="w-7 h-7"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                    >
                      <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  <h4 className="mt-5 font-display text-xl sm:text-2xl text-fog">
                    Сообщение отправлено
                  </h4>

                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-fog/70">
                    Отвечу в ближайшее время <br className="hidden sm:inline" />
                    <span className="text-fog/50">(обычно в течение 2–3 часов)</span>.
                  </p>

                  <button
                      type="button"
                      data-cursor-hover
                      onClick={() => setShowModal(false)}
                      className="mt-6 w-full rounded-full bg-candy py-3 font-mono text-xs uppercase tracking-wide text-onyx font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Понятно
                  </button>
                </motion.div>
              </div>
          )}
        </AnimatePresence>
      </>
  );
}