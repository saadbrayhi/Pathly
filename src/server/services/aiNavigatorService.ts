import { GoogleGenAI } from "@google/genai";
import type { AINavigatorGuidance } from "@/interfaces/aiNavigator";
import {
  aiNavigatorGuidanceSchema,
  type AINavigatorRequestInput,
} from "@/server/validation/aiNavigator";
import { withRetry } from "@/server/validation/aiNavigator";

const ai = new GoogleGenAI({
  apiKey: process.env.PATHLY_GEMINI_APIKEY,
});

export async function generateAiGuidance(
  input: AINavigatorRequestInput,
): Promise<AINavigatorGuidance> {
  try {
    const response = await withRetry(() =>
      ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `
    You are Pathly AI Navigator, a study-abroad assistant.

    Student:
    - Prompt: ${input.prompt}
    - Current country: ${input.currentCountry ?? "Not provided"}
    - Education level: ${input.educationLevel ?? "Not provided"}
    - Desired degree: ${input.desiredDegree ?? "Not provided"}
    - Field of study: ${input.fieldOfStudy ?? "Not provided"}
    Return ONLY valid JSON with exactly this structure:

    {
      "path": "string",
      "levels": ["string"],
      "destinations": [
        {
          "name": "string",
          "flag": "string",
          "note": "string"
        }
      ],
      "admission": ["string"],
      "documents": ["string"],
      "scholarships": ["string"],
      "visa": "string",
      "language": "string",
      "nextSteps": [
        {
          "label": "string",
          "href": "string"
        }
      ]
    }

    For href values, only use valid Pathly routes such as:
    /study-abroad
    /scholarship
    /documents
    /student-visa
    /find-my-path

    Do not return markdown.
  `,
        config: {
          responseMimeType: "application/json",
        },
      }),
    );
    const text = response.text;

    if (!text) {
      throw new Error("Gemini returned an empty response");
    }

    const parsed = JSON.parse(text);

    const guidance = aiNavigatorGuidanceSchema.parse(parsed);

    return guidance;
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
}
