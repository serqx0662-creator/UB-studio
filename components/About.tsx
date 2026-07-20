"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[0.7fr_1.3fr] md:gap-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="relative mx-auto w-full max-w-[260px] md:mx-0"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div
              className="absolute -inset-5 rounded-[1.75rem] opacity-60 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(178,213,229,0.4) 0%, transparent 75%)",
              }}
            />
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10">
              <Image
                src="/profile.jpg"
                alt="Улукбек Турдукулов"
                width={480}
                height={480}
                className="aspect-square w-full object-cover grayscale-[15%]"
              />
            </div>
          </motion.div>
        </motion.div>

        <div className="flex flex-col gap-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <p className="font-mono text-[13px] uppercase tracking-[0.3em] text-candy/80">
              Подход
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-fog md:text-4xl">
              Один разработчик.
              <br />
              Полная ответственность.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            className="flex flex-col gap-6 font-body text-fog/70"
          >
            <p className="text-lg leading-relaxed">
              UB Studio — это практика фронтенд-разработки Улукбека Турдукулова.
              Собираю интерфейсы на React и Next.js: от компонентной архитектуры
              и адаптивной вёрстки до интеграции с базами данных и деплоя.
            </p>
            <p className="text-lg leading-relaxed">
              Работаю с TypeScript, Tailwind CSS и shadcn/ui для быстрой сборки
              качественного UI, использую Prisma для работы с данными, Docker
              для контейнеризации и Railway для деплоя бэкенда. Каждый проект
              довожу до продакшена сам — от макета до рабочей ссылки.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-6">
              <div>
                <p className="font-mono text-[12px] uppercase tracking-wide text-fog/40">
                  Локация
                </p>
                <p className="mt-1 text-fog">Бишкек, Кыргызстан</p>
              </div>
              <div>
                <p className="font-mono text-[12px] uppercase tracking-wide text-fog/40">
                  Формат
                </p>
                <p className="mt-1 text-fog">Удалённо / гибрид</p>
              </div>
              <div>
                <p className="font-mono text-[12px] uppercase tracking-wide text-fog/40">
                  Языки
                </p>
                <p className="mt-1 text-fog">Русский, английский (тех.)</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
