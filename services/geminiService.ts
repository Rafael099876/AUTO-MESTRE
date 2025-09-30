import { GoogleGenAI, Type } from "@google/genai";
import type { Guide, GuideStep } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const guideSchema = {
  type: Type.OBJECT,
  properties: {
    tools: {
      type: Type.ARRAY,
      description: "Lista de ferramentas necessárias.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Nome da ferramenta." },
          description: { type: Type.STRING, description: "Breve descrição ou tamanho da ferramenta." }
        },
        required: ["name", "description"]
      }
    },
    parts: {
      type: Type.ARRAY,
      description: "Lista de peças ou fluidos necessários com especificações.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Nome da peça ou fluido." },
          specification: { type: Type.STRING, description: "Tipo específico, modelo ou quantidade (ex: 'Óleo Sintético 5W-30', 'Fluido de Freio DOT 4')." }
        },
        required: ["name", "specification"]
      }
    },
    steps: {
      type: Type.ARRAY,
      description: "As instruções passo a passo.",
      items: {
        type: Type.OBJECT,
        properties: {
          step: { type: Type.INTEGER, description: "O número do passo." },
          title: { type: Type.STRING, description: "Um título conciso para o passo." },
          instruction: { type: Type.STRING, description: "Instrução detalhada para este passo." },
          imagePrompt: { type: Type.STRING, description: "Um prompt descritivo para uma IA de geração de imagem para ilustrar este passo." }
        },
        required: ["step", "title", "instruction", "imagePrompt"]
      }
    }
  },
  required: ["tools", "parts", "steps"]
};

const generateStepImage = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: `${prompt}, photorealistic, technical manual style, clean background, well-lit, high detail`,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '16:9',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
    return '';
  } catch (error) {
    console.error("Image generation failed for prompt:", prompt, error);
    return ''; // Return an empty string or a placeholder URL on failure
  }
};

export const generateMaintenanceGuide = async (vehicle: string, task: string): Promise<Guide> => {
  const prompt = `
    Você é uma IA assistente automotiva especialista chamada 'AutoMestre'.
    Seu objetivo é fornecer instruções de manutenção passo a passo claras, simples e seguras para proprietários de veículos que não são mecânicos profissionais.

    Gere um guia para a seguinte tarefa e veículo:
    Veículo: "${vehicle}"
    Tarefa: "${task}"

    Sua resposta DEVE ser um objeto JSON que siga estritamente o esquema fornecido.
    Para cada passo, forneça um título conciso, uma instrução detalhada e um prompt descritivo para uma IA de geração de imagem. O prompt da imagem deve descrever uma foto de ação em close-up, clara, bem iluminada, focando na parte específica que está sendo manipulada, adequada para um manual técnico. Não inclua pessoas nos prompts de imagem.
  `;

  const textResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: guideSchema,
    },
  });

  const parsedGuideData = JSON.parse(textResponse.text);

  const imagePromises = parsedGuideData.steps.map((step: GuideStep) => 
    generateStepImage(step.imagePrompt)
  );

  const imageUrls = await Promise.all(imagePromises);

  const completeSteps: GuideStep[] = parsedGuideData.steps.map((step: GuideStep, index: number) => ({
    ...step,
    imageUrl: imageUrls[index],
  }));

  return {
    vehicle,
    task,
    tools: parsedGuideData.tools,
    parts: parsedGuideData.parts,
    steps: completeSteps
  };
};