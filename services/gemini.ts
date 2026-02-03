
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { DomainSuggestion, DomainAppraisal, DomainAnalytics } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDomainSuggestions = async (keyword: string): Promise<DomainSuggestion[]> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Suggest 12 creative and brandable domain names related to "${keyword}". Include extensions like .com, .io, .ai, .net, and .xyz. 
      For each, provide:
      1. name (the domain part without extension)
      2. extension (starting with dot)
      3. price (string like "$12.99")
      4. numericPrice (number like 12.99)
      5. status ("available" or "premium")
      6. category ("Tech", "AI", "Business", "Creative", or "Web3")
      7. popularity (number 1-100)
      8. dateAdded (current ISO string)
      9. reason (short why it's good)`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              extension: { type: Type.STRING },
              price: { type: Type.STRING },
              numericPrice: { type: Type.NUMBER },
              status: { type: Type.STRING },
              category: { type: Type.STRING },
              popularity: { type: Type.NUMBER },
              dateAdded: { type: Type.STRING },
              reason: { type: Type.STRING }
            },
            required: ["name", "extension", "price", "numericPrice", "status", "category", "popularity", "dateAdded", "reason"]
          }
        }
      }
    });

    const text = response.text || "[]";
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Error fetching domain suggestions:", error);
    const now = new Date().toISOString();
    return [
      { name: keyword, extension: ".com", price: "$12.99", numericPrice: 12.99, status: "available", category: "Business", popularity: 95, dateAdded: now, reason: "The classic choice for any brand." },
      { name: keyword + "lab", extension: ".io", price: "$45.00", numericPrice: 45.0, status: "premium", category: "Tech", popularity: 88, dateAdded: now, reason: "Tech-focused and modern." },
      { name: "get" + keyword, extension: ".ai", price: "$79.00", numericPrice: 79.0, status: "available", category: "AI", popularity: 92, dateAdded: now, reason: "Perfect for AI-driven startups." },
      { name: keyword + "web", extension: ".xyz", price: "$1.99", numericPrice: 1.99, status: "available", category: "Web3", popularity: 75, dateAdded: now, reason: "Affordable Web3 entry." }
    ];
  }
};

export const appraiseDomain = async (domain: string): Promise<DomainAppraisal> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Perform an expert AI domain appraisal for the domain: "${domain}". 
      Evaluate its market value, brandability, and SEO potential.
      Return a JSON object with:
      1. domain (string)
      2. estimatedValue (string, e.g., "$1,500 - $3,000")
      3. brandabilityScore (number 1-100)
      4. seoPotential (number 1-100)
      5. marketDemand (string: "Low", "Moderate", "High", "Extreme")
      6. bestSuitedFor (array of 3 industry strings)
      7. verdict (string, professional expert summary)`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            domain: { type: Type.STRING },
            estimatedValue: { type: Type.STRING },
            brandabilityScore: { type: Type.NUMBER },
            seoPotential: { type: Type.NUMBER },
            marketDemand: { type: Type.STRING },
            bestSuitedFor: { type: Type.ARRAY, items: { type: Type.STRING } },
            verdict: { type: Type.STRING }
          },
          required: ["domain", "estimatedValue", "brandabilityScore", "seoPotential", "marketDemand", "bestSuitedFor", "verdict"]
        }
      }
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Error appraising domain:", error);
    throw error;
  }
};

export const getDomainAnalytics = async (domain: string): Promise<DomainAnalytics> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate realistic mock analytics for the domain "${domain}". Include:
      1. Visitors per month for the last 6 months (array of {month, count})
      2. Average CPA (Cost Per Acquisition) for this niche
      3. Average CPC (Cost Per Click) for this keyword
      4. Estimated monthly Search Volume
      5. Domain History (3 major events with year and description)
      6. Market Index (1-100)
      7. Estimated Social Mentions per month`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            domain: { type: Type.STRING },
            visitors: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  month: { type: Type.STRING },
                  count: { type: Type.NUMBER }
                }
              }
            },
            cpa: { type: Type.STRING },
            cpc: { type: Type.STRING },
            searchVolume: { type: Type.STRING },
            domainHistory: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  year: { type: Type.STRING },
                  event: { type: Type.STRING }
                }
              }
            },
            marketIndex: { type: Type.NUMBER },
            socialMentions: { type: Type.NUMBER }
          }
        }
      }
    });
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Error fetching analytics:", error);
    throw error;
  }
};
