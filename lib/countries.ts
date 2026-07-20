export type Country = {
  code: string;
  name: string;
  dial: string;
  flag: string;
  length: number;
  placeholder: string;
};

export const countries: Country[] = [
  { code: "KG", name: "Кыргызстан", dial: "+996", flag: "🇰🇬", length: 9, placeholder: "709 882 696" },
  { code: "RU", name: "Россия", dial: "+7", flag: "🇷🇺", length: 10, placeholder: "900 450 50 10" },
  { code: "KZ", name: "Казахстан", dial: "+7", flag: "🇰🇿", length: 10, placeholder: "701 123 45 67" },
  { code: "UZ", name: "Узбекистан", dial: "+998", flag: "🇺🇿", length: 9, placeholder: "90 123 45 67" },
  { code: "TJ", name: "Таджикистан", dial: "+992", flag: "🇹🇯", length: 9, placeholder: "90 123 4567" },
  { code: "TM", name: "Туркменистан", dial: "+993", flag: "🇹🇲", length: 8, placeholder: "65 12 34 56" },
  { code: "US", name: "США", dial: "+1", flag: "🇺🇸", length: 10, placeholder: "202 555 0123" },
  { code: "GB", name: "Великобритания", dial: "+44", flag: "🇬🇧", length: 10, placeholder: "7911 123456" },
  { code: "DE", name: "Германия", dial: "+49", flag: "🇩🇪", length: 11, placeholder: "151 12345678" },
  { code: "FR", name: "Франция", dial: "+33", flag: "🇫🇷", length: 9, placeholder: "6 12 34 56 78" },
  { code: "TR", name: "Турция", dial: "+90", flag: "🇹🇷", length: 10, placeholder: "501 123 45 67" },
  { code: "AE", name: "ОАЭ", dial: "+971", flag: "🇦🇪", length: 9, placeholder: "50 123 4567" },
  { code: "CN", name: "Китай", dial: "+86", flag: "🇨🇳", length: 11, placeholder: "139 1234 5678" },
  { code: "IN", name: "Индия", dial: "+91", flag: "🇮🇳", length: 10, placeholder: "98765 43210" },
  { code: "UA", name: "Украина", dial: "+380", flag: "🇺🇦", length: 9, placeholder: "67 123 4567" },
  { code: "BY", name: "Беларусь", dial: "+375", flag: "🇧🇾", length: 9, placeholder: "29 123 45 67" },
  { code: "AZ", name: "Азербайджан", dial: "+994", flag: "🇦🇿", length: 9, placeholder: "50 123 45 67" },
  { code: "GE", name: "Грузия", dial: "+995", flag: "🇬🇪", length: 9, placeholder: "599 12 34 56" },
  { code: "AM", name: "Армения", dial: "+374", flag: "🇦🇲", length: 8, placeholder: "77 12 34 56" },
  { code: "PL", name: "Польша", dial: "+48", flag: "🇵🇱", length: 9, placeholder: "512 345 678" },
  { code: "CA", name: "Канада", dial: "+1", flag: "🇨🇦", length: 10, placeholder: "416 555 0123" },
  { code: "KR", name: "Южная Корея", dial: "+82", flag: "🇰🇷", length: 10, placeholder: "10 1234 5678" },
  { code: "JP", name: "Япония", dial: "+81", flag: "🇯🇵", length: 10, placeholder: "90 1234 5678" },
  { code: "SA", name: "Саудовская Аравия", dial: "+966", flag: "🇸🇦", length: 9, placeholder: "50 123 4567" },
];

export const budgetOptions = [
  { value: "80-150", label: "$80 – $150 (лендинг)" },
  { value: "200-300", label: "$200 – $300 (многостраничный сайт)" },
  { value: "400-600", label: "$400 – $600 (платформа)" },
  { value: "600+", label: "$600+ (крупный проект)" },
  { value: "not-sure", label: "Пока не знаю, нужна консультация" },
];