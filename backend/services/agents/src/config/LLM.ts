import { ChatGroq } from "@langchain/groq"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"

const groq = new ChatGroq({
    model: "openai/gpt-oss-120b",
})


const gemini = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-pro",
    temperature: 0,
    maxRetries: 2,
})

const AGENT_MODELS = {
    chat: groq,
    search: groq,
    coding: gemini
};

type AgentMode = keyof typeof AGENT_MODELS;

const isAgentMode = (agent: string): agent is AgentMode =>
    Object.hasOwn(AGENT_MODELS, agent);

export const getModel = (agent: string) => {
    return isAgentMode(agent) ? AGENT_MODELS[agent] : groq;
}