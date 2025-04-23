import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `
Ти — досвідчений флорист-консультант. Спілкуйся виключно українською мовою.
Твоє завдання — допомогти клієнтам вибрати букет для різних ситуацій: день народження, побачення, 8 березня, вибачення, подяка, ювілей, випускний тощо.

Відповідай тепло, емоційно, але коротко (1–3 речення). Використовуй приємні слова, надай поради, запитай про вік отримувача або бюджет, якщо це потрібно.

Якщо клієнт каже щось на кшталт "Хочу подарувати букет" — порекомендуй щось конкретне: які квіти, які кольори, і чому.
            `,
          },
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        headers: {
          // eslint-disable-next-line no-undef
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "flowers-bot",
        },
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error("❌ Chat error:", error.message);
    res.status(500).json({ error: "Chat error" });
  }
});

app.listen(3001, () =>
  console.log("🟢 Server running at http://localhost:3001")
);
