import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import ProjectGallery from "@/components/ProjectGallery";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — UB Studio`,
    description: project.description,
  };
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const otherProjects = projects.filter((p) => p.slug !== project.slug);

  return (
    <>
      <section className="px-6 pb-16 pt-40 md:px-10 md:pb-20 md:pt-48">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/portfolio"
            data-cursor-hover
            className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-wide text-fog/50 transition-colors hover:text-candy"
          >
            ← Все проекты
          </Link>

          <div className="mt-8 flex items-center gap-4">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10">
              <Image src={project.logo} alt="" width={56} height={56} />
            </div>
            <div>
              <p className="font-mono text-[12px] uppercase tracking-wide text-candy/70">
                {project.eyebrow}
              </p>
              <h1 className="font-display text-3xl text-fog sm:text-4xl md:text-5xl">
                {project.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 md:px-10">
        <div className="mx-auto max-w-6xl">
          <ProjectGallery images={project.gallery} alt={project.title} />
        </div>
      </section>

      <section className="px-6 pb-28 md:px-10 md:pb-36">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.3fr_0.7fr]">
          <div>
            <h2 className="font-display text-2xl text-fog md:text-3xl">
              О проекте
            </h2>
            <p className="mt-4 text-base leading-relaxed text-fog/70 md:text-lg">
              {project.fullDescription}
            </p>

            <h3 className="mt-10 font-display text-xl text-fog">
              Что было сделано
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {project.tasks.map((task) => (
                <li
                  key={task}
                  className="flex gap-3 text-sm text-fog/70 md:text-base"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-candy/60" />
                  {task}
                </li>
              ))}
            </ul>

            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="mt-10 inline-flex items-center gap-2 rounded-full border border-candy/40 px-6 py-3 font-mono text-[13px] uppercase tracking-wide text-candy transition-colors hover:bg-candy/10"
            >
              Открыть живой сайт ↗
            </a>
          </div>

          <div>
            <h3 className="font-mono text-[12px] uppercase tracking-wide text-fog/40">
              Стек
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-fog/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-28 md:px-10 md:pb-36">
        <div className="mx-auto max-w-6xl border-t border-white/10 pt-12">
          <p className="font-mono text-[12px] uppercase tracking-wide text-fog/40">
            Другие проекты
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {otherProjects.map((p) => (
              <Link
                key={p.slug}
                href={`/portfolio/${p.slug}`}
                data-cursor-hover
                className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-abyss/50 p-5 transition-colors hover:border-candy/30"
              >
                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-white/10">
                  <Image src={p.logo} alt="" width={44} height={44} />
                </div>
                <div>
                  <p className="font-display text-lg text-fog">{p.title}</p>
                  <p className="font-mono text-[11px] uppercase tracking-wide text-fog/40">
                    {p.eyebrow}
                  </p>
                </div>
                <span className="ml-auto text-fog/30 transition-transform group-hover:translate-x-1 group-hover:text-candy">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
