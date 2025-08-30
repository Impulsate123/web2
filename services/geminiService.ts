
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { Course } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Using a mock service.");
}

const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;

const MOCK_AI_RESPONSE_DELAY = 1500;

export const getAiChatResponse = async (history: string): Promise<string> => {
    if (!ai) {
        return new Promise(resolve => setTimeout(() => resolve("Esta es una respuesta simulada ya que la clave de API no está configurada. Con una clave, podría decirte que nuestro curso más popular es el 'Plan para la Libertad Financiera'."), MOCK_AI_RESPONSE_DELAY));
    }

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: history,
            config: {
                systemInstruction: "Eres un asistente amigable y servicial para 'EduVerse', una plataforma de aprendizaje en línea. Tu objetivo es responder las preguntas de los usuarios sobre nuestros cursos, precios y características de la plataforma. Mantén tus respuestas concisas y alentadoras. Nuestros cursos cubren: Creación de Riqueza, Reentrenamiento Laboral, Salud Mental y Sostenibilidad.",
                temperature: 0.7
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching AI chat response:", error);
        return "Lo siento, estoy teniendo problemas para conectarme a mi cerebro en este momento. Por favor, inténtalo de nuevo más tarde.";
    }
};

export const getCourseRecommendations = async (currentCourse: Course, allCourses: Course[]): Promise<Course[]> => {
    if (!ai) {
        const otherCourses = allCourses.filter(c => c.id !== currentCourse.id);
        return new Promise(resolve => setTimeout(() => resolve(otherCourses.slice(0, 2)), MOCK_AI_RESPONSE_DELAY));
    }

    const otherCoursesList = allCourses
        .filter(c => c.id !== currentCourse.id)
        .map(c => ({ id: c.id, title: c.title, category: c.category, description: c.description }));

    const prompt = `
        Based on the current course a user is viewing, recommend up to 3 other relevant courses from the provided list.
        The user is currently viewing:
        - Title: ${currentCourse.title}
        - Category: ${currentCourse.category}
        - Description: ${currentCourse.description}

        Here is a list of other available courses in JSON format:
        ${JSON.stringify(otherCoursesList)}

        Return a JSON array containing only the IDs of the recommended courses. For example: [3, 4].
    `;

    try {
         const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            id: { type: Type.NUMBER },
                        },
                    },
                },
            },
        });

        const jsonStr = response.text.trim();
        const recommendedIds: {id: number}[] = JSON.parse(jsonStr);
        const recommendedCourses = recommendedIds.map(rec => allCourses.find(c => c.id === rec.id)).filter((c): c is Course => c !== undefined);

        return recommendedCourses;

    } catch (error) {
        console.error("Error fetching course recommendations:", error);
        // Fallback to simple logic
        return allCourses.filter(c => c.category === currentCourse.category && c.id !== currentCourse.id).slice(0, 2);
    }
};
