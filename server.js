import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid"; 
const API_FLOWER = "https://6804fc41ca467c15be67df54.mockapi.io/flowers";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const sessions = {}; 

app.post("/chat", async (req, res) => {
  let { message, sessionId } = req.body;

  if (!sessionId) {
    sessionId = uuidv4(); 
  }

  
  if (!sessions[sessionId]) {
    sessions[sessionId] = {
      step: "target",
      target: null,
      occasion: null,
      budget: null,
    };
  }

  const session = sessions[sessionId];

  
  if (session.step === "target") {
    session.target = message;
    session.step = "occasion";
    return res.json({
      sessionId,
      reply: "Чудово! А з якого приводу даруєте букет? 🎉 (наприклад, день народження, вибачення...)",
    });
  }

  if (session.step === "occasion") {
    session.occasion = message;
    session.step = "budget";
    return res.json({
      sessionId,
      reply: "А який бюджет ви розраховуєте на букет? 💸",
    });
  }

  if (session.step === "budget") {
    session.budget = message;
    session.step = "done";
  }

  try {
    const flowersResponse = await axios.get(API_FLOWER);
    const flowers = flowersResponse.data;

    const flowerList = flowers
      .map(f => `- ${f.name}: ${f.description || "без опису"}, ціна — ${f.price} грн`)
      .slice(0, 10)
      .join("\n");

    const systemPrompt = `
Ти — досвідчений флорист-консультант. Спілкуйся виключно українською мовою.
Клієнт шукає букет для: ${session.target}
Подія: ${session.occasion}
Бюджет: ${session.budget} грн

Ось квіти, які є в наявності:
${flowerList}

Запропонуй декілька варіантів букета. Відповідай коротко, тепло і приємно.
`;

    const aiResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: "Що ти можеш порадити?" },
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

    return res.json({
      sessionId,
      reply: aiResponse.data.choices[0].message.content,
    });
  } catch (error) {
    console.error("❌ Chat error:", error.message);
    return res.status(500).json({ error: "Помилка чату" });
  }
});

app.listen(3001, () =>
  console.log("🟢 Server running at http://localhost:3001")
);
