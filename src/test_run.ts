import { app } from "./bmad_elite_4_orchestrator.js";
import { HumanMessage } from "@langchain/core/messages";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

async function main() {
    console.log(chalk.bold.cyan("🦅 BMAD Elite 4 System Initialization..."));

    if (!process.env.OPENAI_API_KEY) {
        console.warn(chalk.yellow("⚠️  Warning: OPENAI_API_KEY is not set in .env file."));
        console.warn(chalk.yellow("   The system may fail when trying to call the LLMs."));
    }

    if (!process.env.LANGCHAIN_API_KEY) {
        console.log(chalk.gray("ℹ️  Info: LANGCHAIN_API_KEY is not set. LangSmith tracing is disabled."));
    }

    const initialInput = "Plan a new feature for NuriFarm: AI-based Crop Disease Diagnosis.";

    console.log(chalk.bold.white(`\n📝 User Request: "${initialInput}"\n`));
    console.log(chalk.dim("---------------------------------------------------"));

    const inputs = {
        messages: [new HumanMessage(initialInput)],
    };

    try {
        const stream = await app.stream(inputs);

        for await (const output of stream) {
            for (const [key, value] of Object.entries(output)) {
                console.log(chalk.bold.magenta(`\n🔄 Node Completed: [${key}]`));
                console.log(chalk.dim("---------------------------------------------------"));
                // In a real run, we would print the message content here
                // But since we are mock-testing or real-testing, let's just show structure
                const lastMsg = value.messages[value.messages.length - 1];
                console.log(chalk.green(`Result: ${lastMsg.content.toString().substring(0, 100)}...`));
            }
        }

        console.log(chalk.bold.cyan("\n✅ Workflow Finished Successfully."));

    } catch (error: any) {
        console.error(chalk.red("\n❌ Workflow Execution Failed:"));
        console.error(error.message);
        if (error.message.includes("API key")) {
            console.log(chalk.yellow("\n💡 Tip: Create a .env file in 0001_NURI with OPENAI_API_KEY=sk-..."));
        }
    }
}

main();
