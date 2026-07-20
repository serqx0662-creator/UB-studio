import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import { pricingTiers, projects } from "@/lib/data";

export default function Home() {
  const featuredProjects = projects.slice(0, 2);

  return (
    <>
      <Hero />

      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[13px] uppercase tracking-[0.3em] text-candy/80">
                Услуги
              </p>
              <h2 className="mt-4 max-w-xl font-display text-3xl leading-tight text-fog md:text-4xl">
                Чем могу быть полезен
              </h2>
            </div>
            <Link
              href="/services"
              data-cursor-hover
              className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-wide text-fog/60 transition-colors hover:text-candy"
            >
              Все тарифы →
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {pricingTiers.map((tier) => (
              <Link
                key={tier.id}
                href="/services"
                data-cursor-hover
                className="rounded-2xl border border-white/8 bg-abyss/60 p-6 transition-colors hover:border-candy/30"
              >
                <span className="font-mono text-[12px] uppercase tracking-wide text-candy/60">
                  {tier.number}
                </span>
                <h3 className="mt-3 font-display text-xl text-fog">
                  {tier.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fog/60">
                  {tier.subtitle}
                </p>
                <p className="mt-4 font-display text-lg text-fog">
                  ${tier.priceFrom}–{tier.priceTo}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[13px] uppercase tracking-[0.3em] text-candy/80">
                Портфолио
              </p>
              <h2 className="mt-4 max-w-xl font-display text-3xl leading-tight text-fog md:text-4xl">
                Избранные проекты
              </h2>
            </div>
            <Link
              href="/portfolio"
              data-cursor-hover
              className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-wide text-fog/60 transition-colors hover:text-candy"
            >
              Всё портфолио →
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/portfolio/${project.slug}`}
                data-cursor-hover
                className="group rounded-2xl border border-white/8 bg-abyss/60 p-8 transition-colors hover:border-candy/30"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-white/10">
                    <Image src={project.logo} alt="" width={36} height={36} />
                  </div>
                  <span className="font-mono text-[12px] uppercase tracking-wide text-candy/60">
                    {project.eyebrow}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-2xl text-fog">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fog/60">
                  {project.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-wide text-fog/50 group-hover:text-candy">
                  Смотреть проект
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 rounded-2xl border border-white/8 bg-abyss/60 p-10 md:flex-row md:items-center md:justify-between md:p-14">
          <h2 className="max-w-lg font-display text-3xl leading-tight text-fog md:text-4xl">
            Есть задача? Обсудим, как её решить.
          </h2>
          <Link
            href="/contacts"
            data-cursor-hover
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-candy/40 px-6 py-3 font-mono text-[13px] uppercase tracking-wide text-candy transition-colors hover:bg-candy/10"
          >
            Связаться →
          </Link>
        </div>
      </section>
    </>
  );
}
