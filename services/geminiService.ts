import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { TIMELINE_DATA, KEY_MESSAGES } from "../constants";

let ai: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

const initializeAI = () => {
  if (!ai && process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

const getSystemInstruction = (): string => {
  const journeyContext = TIMELINE_DATA.map(t => `- ${t.date}: ${t.title} (${t.description})`).join('\n');
  const messageContext = KEY_MESSAGES.map(m => `- ${m.title}: ${m.desc}`).join('\n');

  return `
    You are IKARUS, the specialized AI assistant for Samhwa Paint's Generative AI Hub.
    
    Your Persona:
    - Professional, helpful, and knowledgeable about AI technology and chemistry R&D trends.
    - You represent the "IKARUS" project, which aims to boost research efficiency.
    - Tone: Encouraging, polite, and precise (Korean language).

    Knowledge Base:
    - Current Project Status (Journey):
    ${journeyContext}
    
    - Key Goals:
    ${messageContext}

    - Target Audience: Researchers and employees of Samhwa Paint.
    
    Your Tasks:
    1. Answer questions about the IKARUS project timeline and goals.
    2. Provide general tips on "Prompt Engineering" for research (e.g., summarizing papers, analyzing data).
    3. Encourage users to participate in workshops.
    4. If asked about contact info, tell them to use the contact form on this page.

    Constraints:
    - Keep answers concise (under 300 characters usually, unless a detailed explanation is asked).
    - Always respond in Korean.
  `;
};

export const startChatSession = async (): Promise<Chat | null> => {
  const aiInstance = initializeAI();
  if (!aiInstance) return null;

  try {
    chatSession = aiInstance.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: getSystemInstruction(),
      },
    });
    return chatSession;
  } catch (error) {
    console.error("Failed to start chat session", error);
    return null;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    await startChatSession();
  }
  
  if (!chatSession) {
    return "API 키가 설정되지 않았거나 연결에 실패했습니다. (Error: No active session)";
  }

  try {
    const result: GenerateContentResponse = await chatSession.sendMessage({ message });
    return result.text || "죄송합니다. 응답을 생성할 수 없습니다.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }
};

// Specialized function for Smart Work tools (One-off requests)
export const generateSmartWorkContent = async (userPrompt: string, systemRole: string): Promise<string> => {
  const aiInstance = initializeAI();
  if (!aiInstance) return "API 키 오류: 시스템을 초기화할 수 없습니다.";

  try {
    const response = await aiInstance.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemRole,
        temperature: 0.7,
      }
    });
    return response.text || "생성된 내용이 없습니다.";
  } catch (error) {
    console.error("Smart Work Gen Error:", error);
    return "작업을 처리하는 중 오류가 발생했습니다.";
  }
};