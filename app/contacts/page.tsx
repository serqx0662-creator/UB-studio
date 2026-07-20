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

            <section className="px-6 pb-28 md:px-10 md:pb-36">
                <div className="mx-auto max-w-6xl">
                    {/* Сетка: на мобилках 1 колонка, на десктопе (lg) 2 колонки */}
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 lg:items-start">

                        {/* Слева: Контакты (занимает 5 колонок) */}
                        <div className="lg:col-span-5">
                            <Contact />
                        </div>

                        {/* Справа: Форма (занимает 7 колонок) */}
                        <div className="lg:col-span-7">
                            <ContactForm />
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}