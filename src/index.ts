import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { HumanMessage } from "@langchain/core/messages";
import { app as bmadWorkflow } from "./bmad_elite_4_orchestrator.js";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

// ============================================================================
// 🚀 Express Server Setup
// ============================================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3100;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// ============================================================================
// 📡 API Endpoints
// ============================================================================

/**
 * Admin Dashboard - BMAD Elite 4 Management for NURI SmartFarm
 */
app.get("/admin", (req: Request, res: Response) => {
    res.send(`
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BMAD Elite 4 - NURI SmartFarm Management</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background: #F3F2F2;
            color: #16325C;
            line-height: 1.6;
        }
        .header {
            background: linear-gradient(135deg, #00A1E0 0%, #0070D2 100%);
            color: white;
            padding: 2rem 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }
        .header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }
        .header p {
            font-size: 1.1rem;
            opacity: 0.95;
        }
        .main {
            padding: 2rem 0;
        }
        .card {
            background: white;
            border-radius: 0.25rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 1.5rem;
            overflow: hidden;
        }
        .card-header {
            background: #FAFAF9;
            border-bottom: 1px solid #E5E5E5;
            padding: 1rem 1.5rem;
            font-weight: 700;
            font-size: 1.1rem;
        }
        .card-body {
            padding: 1.5rem;
        }
        .agents-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }
        .agent-card {
            background: white;
            border: 2px solid #E5E5E5;
            border-radius: 0.25rem;
            padding: 1.5rem;
            transition: all 0.3s ease;
        }
        .agent-card:hover {
            border-color: #00A1E0;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,161,224,0.2);
        }
        .agent-icon {
            font-size: 3rem;
            margin-bottom: 0.5rem;
        }
        .agent-name {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: #16325C;
        }
        .agent-role {
            font-size: 0.9rem;
            color: #706E6B;
            margin-bottom: 0.5rem;
        }
        .agent-model {
            display: inline-block;
            background: #00A1E0;
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.75rem;
            font-weight: 600;
        }
        .test-form {
            margin-top: 1rem;
        }
        .form-group {
            margin-bottom: 1rem;
        }
        .form-label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #3E3E3C;
        }
        .form-input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #DDDBDA;
            border-radius: 0.25rem;
            font-size: 1rem;
            transition: border-color 0.2s;
        }
        .form-input:focus {
            outline: none;
            border-color: #00A1E0;
            box-shadow: 0 0 0 3px rgba(0,161,224,0.1);
        }
        .btn {
            background: #00A1E0;
            color: white;
            border: none;
            padding: 0.75rem 2rem;
            border-radius: 0.25rem;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
        }
        .btn:hover {
            background: #0070D2;
        }
        .btn:disabled {
            background: #DDDBDA;
            cursor: not-allowed;
        }
        .result-box {
            margin-top: 1.5rem;
            padding: 1rem;
            background: #F3F2F2;
            border-left: 4px solid #00A1E0;
            border-radius: 0.25rem;
            display: none;
        }
        .result-box.show {
            display: block;
        }
        .result-section {
            margin-bottom: 1rem;
        }
        .result-section h4 {
            color: #00A1E0;
            margin-bottom: 0.5rem;
            font-size: 1rem;
        }
        .result-section pre {
            background: white;
            padding: 1rem;
            border-radius: 0.25rem;
            overflow-x: auto;
            font-size: 0.9rem;
            line-height: 1.4;
        }
        .endpoint {
            background: #F3F2F2;
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            margin-bottom: 0.5rem;
            font-family: 'Courier New', monospace;
        }
        .method {
            display: inline-block;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            font-weight: 700;
            font-size: 0.8rem;
            margin-right: 0.5rem;
        }
        .method.get { background: #4CAF50; color: white; }
        .method.post { background: #FF9800; color: white; }
        .spinner {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #00A1E0;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
            display: inline-block;
            margin-left: 0.5rem;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="container">
            <h1>🦅 BMAD Elite 4 Orchestrator</h1>
            <p>Multi-Agent System for NuriFarm Platform Development</p>
        </div>
    </div>

    <div class="main">
        <div class="container">
            <!-- Agents Info Card -->
            <div class="card">
                <div class="card-header">Elite 4 Agents</div>
                <div class="card-body">
                    <div class="agents-grid">
                        <div class="agent-card">
                            <div class="agent-icon">🧠</div>
                            <div class="agent-name">Planner</div>
                            <div class="agent-role">Strategic planning and requirements analysis</div>
                            <span class="agent-model">GPT-4-turbo</span>
                        </div>
                        <div class="agent-card">
                            <div class="agent-icon">📐</div>
                            <div class="agent-name">Architect</div>
                            <div class="agent-role">System architecture design and technical decisions</div>
                            <span class="agent-model">GPT-4-turbo</span>
                        </div>
                        <div class="agent-card">
                            <div class="agent-icon">🔨</div>
                            <div class="agent-name">Builder</div>
                            <div class="agent-role">Code implementation and asset generation</div>
                            <span class="agent-model">GPT-4-turbo</span>
                        </div>
                        <div class="agent-card">
                            <div class="agent-icon">⚖️</div>
                            <div class="agent-name">Critic</div>
                            <div class="agent-role">Quality assurance and security validation</div>
                            <span class="agent-model">GPT-3.5-turbo</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Test Workflow Card -->
            <div class="card">
                <div class="card-header">Test BMAD Workflow</div>
                <div class="card-body">
                    <form class="test-form" id="testForm">
                        <div class="form-group">
                            <label class="form-label" for="requestInput">Enter your development task:</label>
                            <input
                                type="text"
                                class="form-input"
                                id="requestInput"
                                placeholder="예: NURI 플랫폼의 학생-기업 매칭 알고리즘 설계"
                                required
                            />
                        </div>
                        <button type="submit" class="btn" id="submitBtn">
                            Execute Workflow
                        </button>
                    </form>

                    <div class="result-box" id="resultBox">
                        <h3 style="margin-bottom: 1rem;">Workflow Results</h3>
                        <div class="result-section" id="plannerResult"></div>
                        <div class="result-section" id="architectResult"></div>
                        <div class="result-section" id="builderResult"></div>
                        <div class="result-section" id="criticResult"></div>
                    </div>
                </div>
            </div>

            <!-- API Documentation Card -->
            <div class="card">
                <div class="card-header">API Endpoints</div>
                <div class="card-body">
                    <div class="endpoint">
                        <span class="method get">GET</span>
                        <code>/health</code> - Server health check
                    </div>
                    <div class="endpoint">
                        <span class="method get">GET</span>
                        <code>/api/agents</code> - Get agent information
                    </div>
                    <div class="endpoint">
                        <span class="method post">POST</span>
                        <code>/api/bmad</code> - Execute BMAD workflow
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        const form = document.getElementById('testForm');
        const submitBtn = document.getElementById('submitBtn');
        const resultBox = document.getElementById('resultBox');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const request = document.getElementById('requestInput').value;

            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Processing<span class="spinner"></span>';
            resultBox.classList.remove('show');

            try {
                const response = await fetch('/api/bmad', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ request })
                });

                const data = await response.json();

                if (data.success) {
                    document.getElementById('plannerResult').innerHTML =
                        '<h4>🧠 Planner</h4><pre>' + (data.results.planner || 'No output') + '</pre>';
                    document.getElementById('architectResult').innerHTML =
                        '<h4>📐 Architect</h4><pre>' + (data.results.architect || 'No output') + '</pre>';
                    document.getElementById('builderResult').innerHTML =
                        '<h4>🔨 Builder</h4><pre>' + (data.results.builder || 'No output') + '</pre>';
                    document.getElementById('criticResult').innerHTML =
                        '<h4>⚖️ Critic</h4><pre>' + (data.results.critic || 'No output') + '</pre>';

                    resultBox.classList.add('show');
                } else {
                    alert('Error: ' + data.message);
                }
            } catch (error) {
                alert('Request failed: ' + error.message);
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Execute Workflow';
            }
        });
    </script>
</body>
</html>
    `);
});

/**
 * Chrome DevTools Well-Known Endpoint (prevents CSP warnings)
 */
app.get("/.well-known/appspecific/com.chrome.devtools.json", (req: Request, res: Response) => {
    res.status(404).json({ error: "Not found" });
});

/**
 * Health Check Endpoint
 */
app.get("/health", (req: Request, res: Response) => {
    res.json({
        status: "healthy",
        service: "BMAD Elite 4 Orchestrator",
        version: "1.0.0",
        timestamp: new Date().toISOString()
    });
});

/**
 * BMAD Elite 4 Workflow Endpoint
 * POST /api/bmad
 * Body: { "request": "Your task description" }
 */
app.post("/api/bmad", async (req: Request, res: Response) => {
    try {
        const { request } = req.body;

        if (!request || typeof request !== "string") {
            return res.status(400).json({
                error: "Invalid request",
                message: "Please provide a 'request' field with a string value"
            });
        }

        console.log(chalk.cyan(`\n📨 New Request Received: "${request}"\n`));

        // Initialize workflow state
        const initialState = {
            messages: [new HumanMessage(request)]
        };

        // Execute BMAD Elite 4 workflow
        const results = [];
        for await (const step of await bmadWorkflow.stream(initialState)) {
            console.log(chalk.gray(`🔄 Step: ${JSON.stringify(Object.keys(step))}`));
            results.push(step);
        }

        // Extract final results from each agent
        const finalState = results[results.length - 1];
        const agentResults = {
            planner: null,
            architect: null,
            builder: null,
            critic: null
        };

        // Parse results from each step
        for (const step of results) {
            if (step.planner) {
                const messages = step.planner.messages;
                agentResults.planner = messages[messages.length - 1].content;
            }
            if (step.architect) {
                const messages = step.architect.messages;
                agentResults.architect = messages[messages.length - 1].content;
            }
            if (step.builder) {
                const messages = step.builder.messages;
                agentResults.builder = messages[messages.length - 1].content;
            }
            if (step.critic) {
                const messages = step.critic.messages;
                agentResults.critic = messages[messages.length - 1].content;
            }
        }

        console.log(chalk.green("\n✅ Workflow Completed Successfully\n"));

        // Return structured response
        res.json({
            success: true,
            request: request,
            timestamp: new Date().toISOString(),
            results: agentResults
        });

    } catch (error) {
        console.error(chalk.red("\n❌ Error in workflow:"), error);
        res.status(500).json({
            success: false,
            error: "Workflow execution failed",
            message: error instanceof Error ? error.message : String(error)
        });
    }
});

/**
 * Get BMAD Elite 4 Agent Information
 */
app.get("/api/agents", (req: Request, res: Response) => {
    res.json({
        agents: [
            {
                name: "Planner",
                emoji: "🧠",
                role: "Strategic planning and requirements analysis",
                model: "GPT-4-turbo",
                tools: ["search_trends", "analyze_finance", "write_blog_post", "generate_ad_copy"]
            },
            {
                name: "Architect",
                emoji: "📐",
                role: "System architecture design and technical stack decisions",
                model: "GPT-4-turbo",
                tools: ["generate_api_spec", "optimize_db_schema", "check_dependencies", "manage_secrets", "deploy_service"]
            },
            {
                name: "Builder",
                emoji: "🔨",
                role: "Code implementation and asset generation",
                model: "GPT-4-turbo",
                tools: ["refactor_code", "generate_assets", "minify_files", "i18n_generate", "video_clipper"]
            },
            {
                name: "Critic",
                emoji: "⚖️",
                role: "Quality assurance and security validation",
                model: "GPT-3.5-turbo",
                tools: ["run_linter", "run_security_scan", "run_accessibility_check", "check_licenses", "parse_logs"]
            }
        ]
    });
});

// ============================================================================
// 🎯 Start Server
// ============================================================================

app.listen(PORT, () => {
    console.log(chalk.bold.cyan("\n" + "=".repeat(60)));
    console.log(chalk.bold.cyan("🦅 BMAD Elite 4 Orchestrator Server"));
    console.log(chalk.bold.cyan("=".repeat(60)));
    console.log(chalk.green(`✅ Server running on http://localhost:${PORT}`));
    console.log(chalk.yellow(`\n📡 Endpoints:`));
    console.log(chalk.white(`   GET  /health          - Health check`));
    console.log(chalk.white(`   GET  /api/agents      - Get agent information`));
    console.log(chalk.white(`   POST /api/bmad        - Execute BMAD workflow`));
    console.log(chalk.cyan("\n" + "=".repeat(60) + "\n"));
});
