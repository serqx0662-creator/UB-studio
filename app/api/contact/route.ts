import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, budget, message } = body as {
      name?: string;
      email?: string;
      phone?: string;
      budget?: string;
      message?: string;
    };

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Заполните имя, email и сообщение." },
        { status: 400 }
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error(
        "TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы в переменных окружения"
      );
      return NextResponse.json(
        { error: "Форма временно недоступна. Напишите напрямую на почту." },
        { status: 500 }
      );
    }

    const text = [
      "🆕 Новая заявка с сайта UB Studio",
      "",
      `Имя: ${name}`,
      `Email: ${email}`,
      phone ? `Телефон: ${phone}` : null,
      budget ? `Бюджет: ${budget}` : null,
      "",
      "Сообщение:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const tgResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
        }),
      }
    );

    if (!tgResponse.ok) {
      const errText = await tgResponse.text();
      console.error("Telegram API error:", errText);
      return NextResponse.json(
        { error: "Не удалось отправить сообщение. Попробуйте позже." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Что-то пошло не так. Попробуйте позже." },
      { status: 500 }
    );
  }
}
