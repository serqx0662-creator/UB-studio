"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import type { Project } from "@/lib/data";

const fadeUp = {
  hidden: { y: 32, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const reversed = index % 2 === 1;

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeUp}
      ref={cardRef}
      onMouseMove={handleMove}
      className="group relative overflow-hidden rounded-2xl border border-white/8 bg-abyss/60 p-8 transition-colors duration-300 hover:border-candy/30 md:p-12"
      style={
        {
          "--mx": "50%",
          "--my": "50%",
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--mx) var(--my), rgba(178,213,229,0.10), transparent 70%)",
        }}
      />

      <div
        className={`relative flex flex-col gap-8 md:flex-row md:items-start md:gap-16 ${
          reversed ? "md:flex-row-reverse" : ""
        }`}
      >
        <div className="md:w-2/5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-white/10">
              <Image src={project.logo} alt="" width={40} height={40} />
            </div>
            <p className="font-mono text-[12px] uppercase tracking-wide text-candy/70">
              {project.eyebrow}
            </p>
          </div>
          <h3 className="mt-3 font-display text-3xl text-fog md:text-4xl">
            {project.title}
          </h3>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href={`/portfolio/${project.slug}`}
              data-cursor-hover
              className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-wide text-fog/60 transition-colors hover:text-candy"
            >
              Подробнее о проекте
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-wide text-fog/40 transition-colors hover:text-candy"
            >
              Открыть сайт ↗
            </a>
          </div>
        </div>

        <div className="md:w-3/5">
          <p className="text-base leading-relaxed text-fog/70 md:text-lg">
            {project.description}
          </p>
          <ul className="mt-6 flex flex-col gap-2">
            {project.tasks.map((task) => (
              <li
                key={task}
                className="flex gap-3 text-sm text-fog/60 md:text-base"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-candy/60" />
                {task}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-fog/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
