

import { getAIMessages } from '../translations';
import type { Language } from '../types';

const model = "gemini-2.5-flash";

export const getAIPoweredReflection = async (journalText: string, lang: Language): Promise<string> => {
  const translations = getAIMessages(lang);

  if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
    throw new Error("API key not configured");
  }
  
  if (!journalText.trim()) {
    return Promise.resolve(translations.journalPlaceholder);
  }

  const { GoogleGenAI } = await import("@google/genai");
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: model,
    contents: journalText,
    config: {
      systemInstruction: translations.journalSystemInstruction,
      temperature: 0.7,
    },
  });

  return response.text;
};


export const getAIPoweredSessionSummary = async (transcript: string, lang: Language): Promise<{ title: string; summary: string }> => {
  const translations = getAIMessages(lang);

  if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set for summary. Gemini API calls will fail.");
    throw new Error("API key not configured");
  }

  const { GoogleGenAI, Type } = await import("@google/genai");
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: model,
    contents: transcript,
    config: {
      systemInstruction: translations.psychoanalystSummaryInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { 
            type: Type.STRING,
            description: 'A concise, neutral title for the session, 3-5 words long.'
          },
          summary: { 
            type: Type.STRING,
            description: 'A brief summary of the key themes, insights, and emotional shifts discussed in the session. Should be 2-4 sentences.'
          }
        }
      }
    }
  });
  const jsonText = response.text.trim();
  return JSON.parse(jsonText);
};