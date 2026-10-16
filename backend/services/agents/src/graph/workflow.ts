import { END, START, StateGraph } from "@langchain/langgraph";
import { agentState } from "./state.js";
import { routerAgent } from "./router.js";
import { chatAgent } from "./agent/chat.js";
import { codeAgent } from "./agent/code.js";
import { imageAgent } from "./agent/image.js";
import { musicAgent } from "./agent/music.js";
import { pdfAgent } from "./agent/pdf.js";
import { pptAgent } from "./agent/ppt.js";
import { searchAgent } from "./agent/search.js";

export const graph  = new StateGraph(agentState).addNode("router", routerAgent)

    .addNode("chat", chatAgent)
    .addNode("code", codeAgent)
    .addNode("ppt", pptAgent)
    .addNode("pdf", pdfAgent)
    .addNode("image", imageAgent)
    .addNode("music", musicAgent)
    .addNode("search", searchAgent)

     //2. Main entry point
    .addEdge(START, "router")

    // 3. Connect EVERY worker node back to the router
    .addEdge("chat", "router")
    .addEdge("code", "router")
    .addEdge("ppt", "router")
    .addEdge("pdf", "router")
    .addEdge("image", "router")
    .addEdge("music", "router")
    .addEdge("search", "chat")


    .addConditionalEdges(
        "router",


        (state) => {

            switch (state.agent) {
                case "chat":
                    return "chat";
                case "code":
                    return "code";
                case "ppt":
                    return "ppt";
                case "pdf":
                    return "pdf";
                case "image":
                    return "image";
                case "music":
                    return "music";
                case "search":
                    return "search";
                case "finish":
                    return "finish";
                default:
                    return "chat"
            }

        },

        {
            chat: "chat",
            code: "code",
            ppt: "ppt",
            pdf: "pdf",
            image: "image",
            music: "music",
            search: "search",
            finish:END
        }


    )
    .compile();



