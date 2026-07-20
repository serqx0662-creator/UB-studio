export type Project = {
  id: string;
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  fullDescription: string;
  tasks: string[];
  stack: string[];
  url: string;
  logo: string;
  gallery: string[];
  accent: string;
};

export const projects: Project[] = [
  {
    id: "new-zealand",
    slug: "new-zealand",
    title: "New Zealand",
    eyebrow: "Образовательная платформа",
    description:
      "Веб-ресурс для иностранных студентов, которые ищут учебные заведения, программы и гранты на обучение в Новой Зеландии.",
    fullDescription:
      "Платформа помогает абитуриентам из других стран разобраться в системе образования Новой Зеландии: найти подходящий университет, программу обучения и грант, не разбираясь в десятках разрозненных сайтов вручную. Сделал упор на понятную навигацию и быстрые фильтры, чтобы студент мог сузить выбор за пару кликов.",
    tasks: [
      "Адаптивный UI/UX для десктопа и мобильных устройств",
      "Оптимизация производительности загрузки",
      "Удобные фильтры подбора учебных программ",
    ],
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    url: "https://new-zealand-project.vercel.app",
    logo: "/projects/new-zealand-logo.jpg",
    gallery: [
      "/projects/new-zealand-1.png",
      "/projects/new-zealand-2.png",
      "/projects/new-zealand-3.png",
    ],
    accent: "#5c92b8",
  },
  {
    id: "streamvibe",
    slug: "streamvibe",
    title: "StreamVibe",
    eyebrow: "Медиаплатформа",
    description:
      "Веб-приложение для просмотра и подбора видео- и стрим-контента с гибкой системой навигации по каталогу.",
    fullDescription:
      "StreamVibe — каталог видео- и стрим-контента с акцентом на скорость навигации: карточки, быстрые превью и понятная структура разделов. Отдельное внимание уделил сборке UI-кита на shadcn/ui, чтобы интерфейс оставался консистентным на любом экране.",
    tasks: [
      "Вёрстка интерфейса и системы компонентов",
      "Сборка UI на базе shadcn/ui",
      "Полная адаптивность под все размеры экрана",
    ],
    stack: ["React", "Next.js", "shadcn/ui", "Tailwind CSS"],
    url: "https://stream-vibe-hazel-one.vercel.app",
    logo: "/projects/streamvibe-logo.jpg",
    gallery: [
      "/projects/streamvibe-1.png",
      "/projects/streamvibe-2.png",
      "/projects/streamvibe-3.png",
      "/projects/streamvibe-4.png",
    ],
    accent: "#b2d5e5",
  },
  {
    id: "getgrant",
    slug: "getgrant",
    title: "GetGrant",
    eyebrow: "Агрегатор грантов",
    description:
      "Платформа, объединяющая гранты, стипендии и образовательные программы для обучения за границей. Разработана в команде из трёх человек.",
    fullDescription:
      "GetGrant собирает гранты, стипендии и образовательные программы в одном месте. Работал в команде из трёх человек: отвечал за проектирование интерфейсов и интеграцию базы данных грантов через Prisma, а также участвовал в планировании общей архитектуры приложения. Деплой и база — на Railway, фронтенд — на Vercel.",
    tasks: [
      "Проектирование пользовательских интерфейсов",
      "Интеграция базы данных грантов через Prisma",
      "Совместное планирование архитектуры приложения",
    ],
    stack: ["React", "Next.js", "Prisma", "Docker", "Railway"],
    url: "https://getgrant-project.vercel.app",
    logo: "/projects/getgrant-logo.png",
    gallery: [
      "/projects/getgrant-1.png",
      "/projects/getgrant-2.png",
      "/projects/getgrant-3.png",
    ],
    accent: "#1c2836",
  },
];

export const skillGroups = [
  {
    label: "Язык и логика",
    items: ["JavaScript (ES6+)", "TypeScript"],
  },
  {
    label: "Интерфейс",
    items: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "HTML5", "CSS3"],
  },
  {
    label: "Данные и инфраструктура",
    items: ["Prisma", "Docker", "Railway", "Git", "GitHub"],
  },
  {
    label: "Инструменты",
    items: ["Figma", "Vercel"],
  },
];

export type PricingTier = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  includes: string[];
  priceFrom: number;
  priceTo: number;
  timeline: string;
  featured?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    id: "landing",
    number: "01",
    title: "Сайт-визитка / Лендинг",
    subtitle: "Одностраничный сайт",
    includes: [
      "Дизайн",
      "Адаптивная вёрстка",
      "Формы обратной связи",
      "Запуск на хостинге",
    ],
    priceFrom: 80,
    priceTo: 150,
    timeline: "3–5 дней",
  },
  {
    id: "corporate",
    number: "02",
    title: "Многостраничный сайт",
    subtitle: "Для компании / услуг",
    includes: [
      "Несколько страниц: Главная, О нас, Услуги, Контакты",
      "Удобная админка — сами меняете тексты и картинки",
      "Подключение домена",
    ],
    priceFrom: 200,
    priceTo: 300,
    timeline: "7–10 дней",
    featured: true,
  },
  {
    id: "platform",
    number: "03",
    title: "Сложный проект / Платформа",
    subtitle: "С каталогами и фильтрами",
    includes: [
      "Динамические каталоги с карточками",
      "Поиск и фильтрация контента",
      "Мультиязычность (переключение языков)",
      "База данных и облачное хранилище для медиафайлов",
    ],
    priceFrom: 400,
    priceTo: 600,
    timeline: "10–14 дней",
  },
];

export const contact = {
  name: "Турдукулов Улукбек",
  role: "Frontend Developer",
  location: "Бишкек, Кыргызстан",
  phone: "+996 709 882 696",
  email: "serqx0662@gmail.com",
  github: "https://github.com/serqx0662-creator",
};
