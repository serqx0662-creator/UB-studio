export type Country = {
  code: string;
  name: string;
  dial: string;
  flag: string;
};

export const countries: Country[] = [
  { code: "KG", name: "Кыргызстан", dial: "+996", flag: "🇰🇬" },
  { code: "RU", name: "Россия", dial: "+7", flag: "🇷🇺" },
  { code: "KZ", name: "Казахстан", dial: "+7", flag: "🇰🇿" },
  { code: "UZ", name: "Узбекистан", dial: "+998", flag: "🇺🇿" },
  { code: "TJ", name: "Таджикистан", dial: "+992", flag: "🇹🇯" },
  { code: "TM", name: "Туркменистан", dial: "+993", flag: "🇹🇲" },
  { code: "US", name: "США", dial: "+1", flag: "🇺🇸" },
  { code: "GB", name: "Великобритания", dial: "+44", flag: "🇬🇧" },
  { code: "DE", name: "Германия", dial: "+49", flag: "🇩🇪" },
  { code: "FR", name: "Франция", dial: "+33", flag: "🇫🇷" },
  { code: "TR", name: "Турция", dial: "+90", flag: "🇹🇷" },
  { code: "AE", name: "ОАЭ", dial: "+971", flag: "🇦🇪" },
  { code: "CN", name: "Китай", dial: "+86", flag: "🇨🇳" },
  { code: "IN", name: "Индия", dial: "+91", flag: "🇮🇳" },
  { code: "UA", name: "Украина", dial: "+380", flag: "🇺🇦" },
  { code: "BY", name: "Беларусь", dial: "+375", flag: "🇧🇾" },
  { code: "AZ", name: "Азербайджан", dial: "+994", flag: "🇦🇿" },
  { code: "GE", name: "Грузия", dial: "+995", flag: "🇬🇪" },
  { code: "AM", name: "Армения", dial: "+374", flag: "🇦🇲" },
  { code: "PL", name: "Польша", dial: "+48", flag: "🇵🇱" },
  { code: "CA", name: "Канада", dial: "+1", flag: "🇨🇦" },
  { code: "KR", name: "Южная Корея", dial: "+82", flag: "🇰🇷" },
  { code: "JP", name: "Япония", dial: "+81", flag: "🇯🇵" },
  { code: "SA", name: "Саудовская Аравия", dial: "+966", flag: "🇸🇦" },
];

export const budgetOptions = [
  { value: "80-150", label: "$80 – $150 (лендинг)" },
  { value: "200-300", label: "$200 – $300 (многостраничный сайт)" },
  { value: "400-600", label: "$400 – $600 (платформа)" },
  { value: "600+", label: "$600+ (крупный проект)" },
  { value: "not-sure", label: "Пока не знаю, нужна консультация" },
];
