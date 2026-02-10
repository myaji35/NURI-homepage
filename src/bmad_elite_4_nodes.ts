import { DynamicStructuredTool } from "@langchain/core/tools";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StateGraph } from "@langchain/langgraph";
import { Client } from "langsmith";
import { z } from "zod";

// ============================================================================
// 👁️ LangSmith Client Initialization (The Watcher)
// ============================================================================
const langsmithClient = new Client({
    apiUrl: "https://api.smith.langchain.com", // Ensure API Key is in env vars: LANGCHAIN_API_KEY
});

const projectName = "BMAD_ELITE_4_MONITOR"; // Central project for monitoring

// Helper to trace specific agent runs
async function traceAgentRun(agentName: string, input: any, output: any) {
    try {
        if (process.env.LANGCHAIN_TRACING_V2 === "true" && process.env.LANGCHAIN_API_KEY) {
            // console.log(`[LangSmith] 👁️ Watching ${agentName}...`);
        }
    } catch (error) {
        console.warn("[LangSmith] ⚠️ Trace failed:", error);
    }
}

// ============================================================================
// 🦅 BMAD Elite 4 Tool Definitions (Mockups representing previous Agents)
// ============================================================================
// Using DynamicStructuredTool with Zod schema for better OpenAI Function Calling compatibility.

// --- 🔨 Tools for Builder (Senior Developer) ---
const refactor_code = new DynamicStructuredTool({
    name: "refactor_code",
    description: "Identify spaghetti code and perform refactoring. (Ex-5106 Refactor Monk)",
    schema: z.object({ input: z.string().describe("Code segment or file path to refactor") }),
    func: async ({ input }) => `Simulated Refactoring for: ${input}`,
});

const generate_assets = new DynamicStructuredTool({
    name: "generate_assets",
    description: "Generate UI images and icons. (Ex-5500 Asset Painter)",
    schema: z.object({ input: z.string().describe("Description of asset to generate") }),
    func: async ({ input }) => `Simulated Asset Generation for: ${input}`,
});

const minify_files = new DynamicStructuredTool({
    name: "minify_files",
    description: "Compress images/JS/CSS. (Ex-5111 Asset Minifier)",
    schema: z.object({ input: z.string().describe("Files to minify") }),
    func: async ({ input }) => `Simulated Minification for: ${input}`,
});

const i18n_generate = new DynamicStructuredTool({
    name: "i18n_generate",
    description: "Translate UI strings. (Ex-5110 I18n Master)",
    schema: z.object({ input: z.string().describe("Text or key to translate") }),
    func: async ({ input }) => `Simulated I18n Generation for: ${input}`,
});

const video_clipper = new DynamicStructuredTool({
    name: "video_clipper",
    description: "Create video clips for social media. (Ex-5208 Video Clipper)",
    schema: z.object({ input: z.string().describe("Video source and clip parameters") }),
    func: async ({ input }) => `Simulated Video Clipping for: ${input}`,
});

// --- ⚖️ Tools for Critic (QA & Security) ---
const run_linter = new DynamicStructuredTool({
    name: "run_linter",
    description: "Enforce coding standards. (Ex-5100 Code Sentinel)",
    schema: z.object({ input: z.string().describe("Codebase path to lint") }),
    func: async ({ input }) => `Simulated Lint Check for: ${input}`,
});

const run_security_scan = new DynamicStructuredTool({
    name: "run_security_scan",
    description: "Run comprehensive security toolchain (WAF, Leak, Phishing). (Ex-5400 Series)",
    schema: z.object({ input: z.string().describe("Target to scan") }),
    func: async ({ input }) => `Simulated Security Scan for: ${input}`,
});

const run_accessibility_check = new DynamicStructuredTool({
    name: "run_accessibility_check",
    description: "Check WCAG compliance. (Ex-5109 Accessibility Bot)",
    schema: z.object({ input: z.string().describe("uRL or component to check") }),
    func: async ({ input }) => `Simulated A11y Check for: ${input}`,
});

const check_licenses = new DynamicStructuredTool({
    name: "check_licenses",
    description: "Verify open source licenses. (Ex-5407 License Check)",
    schema: z.object({ input: z.string().describe("Package list or file to check") }),
    func: async ({ input }) => `Simulated License Check for: ${input}`,
});

const parse_logs = new DynamicStructuredTool({
    name: "parse_logs",
    description: "Analyze error logs. (Ex-5113 Log Parser)",
    schema: z.object({ input: z.string().describe("Log content or path") }),
    func: async ({ input }) => `Simulated Log Parsing for: ${input}`,
});

// --- 📐 Tools for Architect (Tech Lead) ---
const generate_api_spec = new DynamicStructuredTool({
    name: "generate_api_spec",
    description: "Generate OpenAPI/Swagger specs. (Ex-5107 API Spec Gen)",
    schema: z.object({ input: z.string().describe("Endpoint details") }),
    func: async ({ input }) => `Simulated API Spec for: ${input}`,
});

const optimize_db_schema = new DynamicStructuredTool({
    name: "optimize_db_schema",
    description: "Analyze and optimize DB schema. (Ex-5108 DB Optimizer)",
    schema: z.object({ input: z.string().describe("Schema definition or query") }),
    func: async ({ input }) => `Simulated DB Optimization for: ${input}`,
});

const check_dependencies = new DynamicStructuredTool({
    name: "check_dependencies",
    description: "Manage and upgrade dependencies. (Ex-5105 Dep Upgrader)",
    schema: z.object({ input: z.string().describe("Project path") }),
    func: async ({ input }) => `Simulated Dep Check for: ${input}`,
});

const manage_secrets = new DynamicStructuredTool({
    name: "manage_secrets",
    description: "Rotate and manage API keys/secrets via Vault. (Ex-5308 Secret Rotation)",
    schema: z.object({ input: z.string().describe("Secret ID or Action") }),
    func: async ({ input }) => `Simulated Secret Management for: ${input}`,
});

const deploy_service = new DynamicStructuredTool({
    name: "deploy_service",
    description: "Execute deployment scripts. (Ex-5300 Deploy Commander)",
    schema: z.object({ input: z.string().describe("Service name and version") }),
    func: async ({ input }) => `Simulated Deployment for: ${input}`,
});

// --- 🧠 Tools for Planner (PM & Strategy) ---
const search_trends = new DynamicStructuredTool({
    name: "search_trends",
    description: "Analyze market trends. (Ex-5010 Trend Scouter)",
    schema: z.object({ input: z.string().describe("Keywords to search") }),
    func: async ({ input }) => `Simulated Trend Search for: ${input}`,
});

const analyze_finance = new DynamicStructuredTool({
    name: "analyze_finance",
    description: "Analyze financial health & runway. (Ex-9930 AI CFO)",
    schema: z.object({ input: z.string().describe("Financial data points") }),
    func: async ({ input }) => `Simulated Finance Analysis for: ${input}`,
});

const write_blog_post = new DynamicStructuredTool({
    name: "write_blog_post",
    description: "Write SEO blog posts. (Ex-5203 Blog Writer)",
    schema: z.object({ input: z.string().describe("Topic and keywords") }),
    func: async ({ input }) => `Simulated Blog Writing for: ${input}`,
});

const generate_ad_copy = new DynamicStructuredTool({
    name: "generate_ad_copy",
    description: "Generate ad copies. (Ex-5206 Ad Copy Gen)",
    schema: z.object({ input: z.string().describe("Product details") }),
    func: async ({ input }) => `Simulated Ad Copy for: ${input}`,
});

// ============================================================================
// 🧬 Tool Bindings
// ============================================================================

const tools_for_builder = [
    refactor_code, generate_assets, minify_files, i18n_generate, video_clipper
];

const tools_for_critic = [
    run_linter, run_security_scan, run_accessibility_check, check_licenses, parse_logs
];

const tools_for_architect = [
    generate_api_spec, optimize_db_schema, check_dependencies, manage_secrets, deploy_service
];

const tools_for_planner = [
    search_trends, analyze_finance, write_blog_post, generate_ad_copy
];

// ============================================================================
// 🤖 Node Definitions (The Elite 4 + LangSmith Watcher)
// ============================================================================

// Enable automated tracing for all LangChain chains by default
// (Requires LANGCHAIN_TRACING_V2=true environment variable)

// Models
const llm_high = new ChatOpenAI({ modelName: "gpt-4-turbo", tags: ["planner", "architect"] });
const llm_coder = new ChatOpenAI({ modelName: "gpt-4-turbo", tags: ["builder"] });
const llm_fast = new ChatOpenAI({ modelName: "gpt-3.5-turbo", tags: ["critic"] });

// 🧠 Planner Node
async function planner_node(state: any) {
    console.log("--- Planner Working ---");
    const result = await llm_high.bind({ tools: tools_for_planner }).invoke(state.messages);
    await traceAgentRun("Planner", state.messages, result);
    return { messages: [result] };
}

// 📐 Architect Node
async function architect_node(state: any) {
    console.log("--- Architect Working ---");
    const result = await llm_high.bind({ tools: tools_for_architect }).invoke(state.messages);
    await traceAgentRun("Architect", state.messages, result);
    return { messages: [result] };
}

// 🔨 Builder Node
async function builder_node(state: any) {
    console.log("--- Builder Working ---");
    const result = await llm_coder.bind({ tools: tools_for_builder }).invoke(state.messages);
    await traceAgentRun("Builder", state.messages, result);
    return { messages: [result] };
}

// ⚖️ Critic Node
async function critic_node(state: any) {
    console.log("--- Critic Working ---");
    const result = await llm_fast.bind({ tools: tools_for_critic }).invoke(state.messages);
    await traceAgentRun("Critic", state.messages, result);
    return { messages: [result] };
}

// ============================================================================
// 🕸️ Graph Construction
// ============================================================================

/* 
 * LangSmith integration is now natively embedded in the nodes.
 * Set specific environment variables to activate 'The Watcher'.
 * export LANGCHAIN_TRACING_V2="true"
 * export LANGCHAIN_PROJECT="BMAD_ELITE_4_MONITOR"
 */

export { planner_node, architect_node, builder_node, critic_node };
