import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Contact from "@/components/Contact";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Контакты — UB Studio",
  description: "Свяжитесь с Улукбеком Турдукуловым по проекту.",
};

export default function ContactsPage() {
  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title="Обсудим ваш проект"
        intro="Отвечаю быстро — напишите на почту, в WhatsApp или заполните форму ниже."
      />
      <Contact />
      <section className="px-6 pb-28 md:px-10 md:pb-36">
        <div className="mx-auto max-w-3xl">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
