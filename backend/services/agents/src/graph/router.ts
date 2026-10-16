import { getModel } from "../config/LLM.js"
import type { AgentStateType } from "./state.js";

export const routerAgent = async (state: AgentStateType) => {

    const model = getModel("router");

    const prompt = `You are an agent router. Your sole task is to classify the user's request and determine the correct agent to handle it.

Available agents:
- chat
- search
- coding
- pdf
- ppt
- image

Rules for selection:
- chat: General conversation, explanations, learning, small talk, or open-ended questions.
- search: Current events, latest information, news, weather, or real-time data lookups.
- coding: Writing code, debugging, explaining programming concepts, or generating scripts.
- pdf: Processing, reading, summarizing, analyzing, or extracting text from PDF files.
- ppt: Creating, formatting, modifying, or analyzing PowerPoint presentations and slides.
- image: Generating graphics, editing images, describing photos, or visual design requests.

CRITICAL INSTRUCTION: You must respond with EXACTLY ONE WORD from the available agents list above (e.g., "chat", "search", "coding", "pdf", "ppt", or "image"). Do not include punctuation, spaces, introductions, explanations, or any other text.

User Query : ${state.prompt}
  
`;

const response = await model.invoke(prompt);


return {
    ...state,agent:response.content
}


}