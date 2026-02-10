import { StateGraph, END } from "@langchain/langgraph";
import { BaseMessage, HumanMessage, AIMessage } from "@langchain/core/messages";
import { planner_node, architect_node, builder_node, critic_node } from "./bmad_elite_4_nodes.js";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

// ============================================================================
// 🏗️ Define State
// ============================================================================
// The state acts as the shared memory (Context) for the Elite 4.
// In a real scenario, this would include schemas, code snapshots, and specific artifacts.
// For now, it's a list of messages (Conversation History).

interface EliteState {
    messages: BaseMessage[];
    next?: string;
}

// Define the StateGraph with the schema
const workflow = new StateGraph<EliteState>({
    channels: {
        messages: {
            value: (x: BaseMessage[], y: BaseMessage[]) => x.concat(y),
            default: () => [],
        },
        next: {
            value: (x: string | undefined, y: string | undefined) => y ?? x,
            default: () => "planner",
        }
    },
});

// ============================================================================
// 🕸️ Build the Graph
// ============================================================================

// 1. Add Nodes
workflow.addNode("planner", planner_node);
workflow.addNode("architect", architect_node);
workflow.addNode("builder", builder_node);
workflow.addNode("critic", critic_node);

// 2. Define Edges (The Chain of Command)
// Flow: User -> Planner -> Architect -> Builder -> Critic -> (Loop or End)

workflow.setEntryPoint("planner");

workflow.addEdge("planner", "architect");
workflow.addEdge("architect", "builder");
workflow.addEdge("builder", "critic");

// 3. Conditional Edge (The Quality Gate)
// If Critic approves, end. If rejects, go back to Builder.
function qualityGate(state: EliteState) {
    const lastMessage = state.messages[state.messages.length - 1];
    const content = lastMessage.content.toString().toLowerCase();

    if (content.includes("approve") || content.includes("pass")) {
        console.log(chalk.green("\n[Critic] ✅ Approved! Deployment sequence initiated."));
        return "end";
    } else {
        console.log(chalk.red("\n[Critic] ❌ Rejected! Sending back to Builder for revision."));
        return "builder";
    }
}

// For this MVP test, we will just end after Critic to avoid infinite loops if LLM isn't smart enough yet 
// or simply direct to END to prove the pipeline works. 
// Uncomment the conditional logic below when ready for loop testing.
// workflow.addConditionalEdges("critic", qualityGate, {
//   end: END,
//   builder: "builder"
// });
workflow.addEdge("critic", END);

// 4. Compile
const app = workflow.compile();

export { app };
