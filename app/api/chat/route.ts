import { GoogleGenAI, type Content } from "@google/genai";
import { GEMINI_MODEL, systemInstruction, type ChatMessage } from "@/lib/chatbot";

// Chỉ gửi các tin nhắn gần nhất lên Gemini để giữ mạch hội thoại mà không tốn quá nhiều token.
const MAX_HISTORY = 20;
const MAX_MESSAGE_LENGTH = 1000;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null) return false;
  const m = value as Record<string, unknown>;
  return (m.from === "bot" || m.from === "user") && typeof m.text === "string";
}

export async function POST(request: Request) {
  if (!process.env.GEMINI_API_KEY) {
    return Response.json({ error: "Thiếu GEMINI_API_KEY trong file .env" }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const messages: unknown = body?.messages;
  if (!Array.isArray(messages) || !messages.every(isChatMessage)) {
    return Response.json({ error: "Dữ liệu gửi lên không hợp lệ" }, { status: 400 });
  }

  // Gemini yêu cầu hội thoại bắt đầu bằng lượt của người dùng, nên bỏ lời chào mở đầu của bot.
  const recent = messages.slice(-MAX_HISTORY);
  const firstUser = recent.findIndex((m) => m.from === "user");
  const history = firstUser === -1 ? [] : recent.slice(firstUser);
  if (history.length === 0 || history[history.length - 1].from !== "user") {
    return Response.json({ error: "Thiếu câu hỏi của người dùng" }, { status: 400 });
  }

  const contents: Content[] = history.map((m) => ({
    role: m.from === "user" ? "user" : "model",
    parts: [{ text: m.text.trim().slice(0, MAX_MESSAGE_LENGTH) }],
  }));

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents,
      config: { systemInstruction, temperature: 0.2 },
    });
    const reply = response.text?.trim();
    if (!reply) throw new Error("Gemini trả về câu trả lời rỗng");
    return Response.json({ reply });
  } catch (error) {
    console.error("[api/chat]", error);
    return Response.json(
      { error: "Trợ lý đang bận, bạn thử lại sau ít phút nhé." },
      { status: 502 },
    );
  }
}
