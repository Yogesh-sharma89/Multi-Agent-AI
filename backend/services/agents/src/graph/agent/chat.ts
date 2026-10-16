import { getModel } from "../../config/LLM.js";
import { chatPrompt } from "../../prompts/prompt.js";
import type { AgentStateType } from "../state.js";

export const chatAgent = async(state:AgentStateType)=>{

    const model = getModel("chat");

    const response = await model.invoke([
        {
            role:"system",
            content:chatPrompt
        },
        {
            role:"human",
            content:state.prompt
        }
    ]);

    return {
        ...state,aiResponse:response.content
    }


    
}