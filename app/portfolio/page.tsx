import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Projects from "@/components/Projects";

export const metadata: Metadata = {
  title: "Портфолио — UB Studio",
  description: "Проекты на React и Next.js, задеплоенные в продакшен.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Портфолио"
        title="Проекты, доведённые до продакшена"
        intro="Каждый проект — от макета и архитектуры до рабочей ссылки."
      />
      <Projects />
    </>
  );
}
