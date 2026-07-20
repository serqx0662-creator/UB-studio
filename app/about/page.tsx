import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import About from "@/components/About";
import Skills from "@/components/Skills";

export const metadata: Metadata = {
  title: "Обо мне — UB Studio",
  description: "Улукбек Турдукулов — frontend-разработчик на React и Next.js.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Обо мне"
        title="Разработчик, который доводит проект до продакшена"
        intro="Коротко о том, как я работаю и с чем имею дело каждый день."
      />
      <About />
      <Skills />
    </>
  );
}
