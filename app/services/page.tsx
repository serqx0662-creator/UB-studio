import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";

export const metadata: Metadata = {
  title: "Услуги — UB Studio",
  description: "Разработка интерфейсов, подключение данных, деплой и сопровождение.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Услуги"
        title="С чем можно ко мне обратиться"
        intro="Беру задачи от вёрстки экрана до полностью рабочего приложения на React/Next.js."
      />
      <Services />
    </>
  );
}
