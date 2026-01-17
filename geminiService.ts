
import { GoogleGenAI, Type } from "@google/genai";
import { TrafficAnalysis } from "../types";

export const analyzeTrafficFrame = async (base64Image: string): Promise<TrafficAnalysis> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image,
            },
          },
          {
            text: "Analyze this traffic signal frame. Count the number of cars, bikes, buses, and trucks. Provide bounding boxes for each. Return the result strictly in JSON.",
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          counts: {
            type: Type.OBJECT,
            properties: {
              car: { type: Type.INTEGER },
              bike: { type: Type.INTEGER },
              bus: { type: Type.INTEGER },
              truck: { type: Type.INTEGER },
            },
            required: ["car", "bike", "bus", "truck"],
          },
          detections: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                box_2d: {
                  type: Type.ARRAY,
                  items: { type: Type.NUMBER },
                },
                label: { type: Type.STRING },
              },
              required: ["box_2d", "label"],
            },
          },
        },
        required: ["counts", "detections"],
      },
    },
  });

  const resultText = response.text;
  if (!resultText) throw new Error("Empty response from AI");
  
  const parsed: TrafficAnalysis = JSON.parse(resultText);
  return parsed;
};
