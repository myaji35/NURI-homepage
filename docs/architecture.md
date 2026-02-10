# NURI 시스템 아키텍처

> BMAD Elite 4 Orchestrator 기반 학생-기업 매칭 및 산학 협력 플랫폼 아키텍처

## 목차
1. [전체 시스템 아키텍처](#1-전체-시스템-아키텍처)
2. [BMAD Elite 4 에이전트 시스템](#2-bmad-elite-4-에이전트-시스템)
3. [데이터 모델](#3-데이터-모델)
4. [주요 컴포넌트](#4-주요-컴포넌트)
5. [워크플로우](#5-워크플로우)
6. [외부 의존성](#6-외부-의존성)
7. [배포 아키텍처](#7-배포-아키텍처)

---

## 1. 전체 시스템 아키텍처

```mermaid
graph TB
    subgraph "Frontend Layer"
        WEB[Web Dashboard<br/>Next.js + SLDS]
        MOBILE[Mobile App<br/>React Native]
    end

    subgraph "API Gateway"
        API[API Server<br/>Express/Fastify]
    end

    subgraph "BMAD Elite 4 Orchestrator"
        PLANNER[🧠 Planner<br/>Strategy & Planning]
        ARCHITECT[📐 Architect<br/>System Design]
        BUILDER[🔨 Builder<br/>Implementation]
        CRITIC[⚖️ Critic<br/>Quality Assurance]
    end

    subgraph "Data Layer"
        PG[(PostgreSQL<br/>User & Job Data)]
        REDIS[(Redis<br/>Cache & Queue)]
        S3[(S3<br/>File Storage)]
    end

    subgraph "External Services"
        OPENAI[OpenAI API<br/>GPT-4/3.5]
        LANGSMITH[LangSmith<br/>Monitoring]
        EMAIL[Email Service<br/>SendGrid]
    end

    WEB --> API
    MOBILE --> API
    API --> PLANNER
    PLANNER --> ARCHITECT
    ARCHITECT --> BUILDER
    BUILDER --> CRITIC
    CRITIC -->|Approved| API
    CRITIC -->|Rejected| BUILDER

    API --> PG
    API --> REDIS
    API --> S3

    PLANNER --> OPENAI
    ARCHITECT --> OPENAI
    BUILDER --> OPENAI
    CRITIC --> OPENAI

    PLANNER -.-> LANGSMITH
    ARCHITECT -.-> LANGSMITH
    BUILDER -.-> LANGSMITH
    CRITIC -.-> LANGSMITH

    API --> EMAIL

    style PLANNER fill:#4A90E2,stroke:#333,color:#fff
    style ARCHITECT fill:#7B68EE,stroke:#333,color:#fff
    style BUILDER fill:#50C878,stroke:#333,color:#fff
    style CRITIC fill:#FF6B6B,stroke:#333,color:#fff
```

## 2. BMAD Elite 4 에이전트 시스템

### 2.1 에이전트 워크플로우

```mermaid
stateDiagram-v2
    [*] --> Planner: User Request

    Planner --> Architect: Plan Created
    note right of Planner
        - Analyze Requirements
        - Market Research
        - Strategy Planning
    end note

    Architect --> Builder: Architecture Designed
    note right of Architect
        - System Design
        - API Specification
        - DB Schema
    end note

    Builder --> Critic: Implementation Done
    note right of Builder
        - Code Generation
        - Asset Creation
        - Integration
    end note

    Critic --> [*]: Approved ✅
    Critic --> Builder: Rejected ❌
    note right of Critic
        - Code Review
        - Security Scan
        - Quality Check
    end note
```

### 2.2 에이전트별 도구 매핑

```mermaid
graph LR
    subgraph "Planner Tools"
        P1[search_trends]
        P2[analyze_finance]
        P3[write_blog_post]
        P4[generate_ad_copy]
    end

    subgraph "Architect Tools"
        A1[generate_api_spec]
        A2[optimize_db_schema]
        A3[check_dependencies]
        A4[manage_secrets]
        A5[deploy_service]
    end

    subgraph "Builder Tools"
        B1[refactor_code]
        B2[generate_assets]
        B3[minify_files]
        B4[i18n_generate]
        B5[video_clipper]
    end

    subgraph "Critic Tools"
        C1[run_linter]
        C2[run_security_scan]
        C3[run_accessibility_check]
        C4[check_licenses]
        C5[parse_logs]
    end

    PLANNER[🧠 Planner] --> P1 & P2 & P3 & P4
    ARCHITECT[📐 Architect] --> A1 & A2 & A3 & A4 & A5
    BUILDER[🔨 Builder] --> B1 & B2 & B3 & B4 & B5
    CRITIC[⚖️ Critic] --> C1 & C2 & C3 & C4 & C5

    style PLANNER fill:#4A90E2,stroke:#333,color:#fff
    style ARCHITECT fill:#7B68EE,stroke:#333,color:#fff
    style BUILDER fill:#50C878,stroke:#333,color:#fff
    style CRITIC fill:#FF6B6B,stroke:#333,color:#fff
```

### 2.3 LangGraph 상태 관리

```mermaid
graph TD
    subgraph "EliteState (Shared Memory)"
        MESSAGES[messages: BaseMessage[]]
        NEXT[next?: string]
        META[metadata?: Record<string, any>]
    end

    USER[User Input] -->|HumanMessage| MESSAGES
    MESSAGES --> GRAPH[StateGraph Workflow]
    GRAPH --> PLANNER_OUT[Planner Output]
    PLANNER_OUT -->|AIMessage| MESSAGES
    MESSAGES --> ARCH_OUT[Architect Output]
    ARCH_OUT -->|AIMessage| MESSAGES
    MESSAGES --> BUILD_OUT[Builder Output]
    BUILD_OUT -->|AIMessage| MESSAGES
    MESSAGES --> CRITIC_OUT[Critic Output]
    CRITIC_OUT -->|AIMessage| MESSAGES

    style MESSAGES fill:#FFD700,stroke:#333
```

## 3. 데이터 모델

### 3.1 핵심 엔티티

```mermaid
erDiagram
    USER ||--o{ STUDENT_PROFILE : has
    USER ||--o{ COMPANY_PROFILE : has
    USER ||--o{ JOB_APPLICATION : creates

    STUDENT_PROFILE ||--o{ JOB_APPLICATION : submits
    STUDENT_PROFILE ||--o{ PROJECT_PARTICIPATION : joins
    STUDENT_PROFILE ||--o{ PORTFOLIO_ITEM : owns

    COMPANY_PROFILE ||--o{ JOB_POSTING : posts
    COMPANY_PROFILE ||--o{ COLLABORATION_PROJECT : initiates

    JOB_POSTING ||--o{ JOB_APPLICATION : receives
    COLLABORATION_PROJECT ||--o{ PROJECT_PARTICIPATION : has

    UNIVERSITY ||--o{ STUDENT_PROFILE : enrolls
    UNIVERSITY ||--o{ COLLABORATION_PROJECT : partners

    USER {
        uuid id PK
        string email UK
        string password_hash
        enum role "student, company, admin"
        timestamp created_at
        timestamp updated_at
    }

    STUDENT_PROFILE {
        uuid id PK
        uuid user_id FK
        string name
        string major
        int graduation_year
        text skills_json
        text interests_json
        timestamp created_at
    }

    COMPANY_PROFILE {
        uuid id PK
        uuid user_id FK
        string company_name
        string industry
        int employee_count
        text description
        timestamp created_at
    }

    JOB_POSTING {
        uuid id PK
        uuid company_id FK
        string title
        text description
        text requirements_json
        string location
        int salary_min
        int salary_max
        enum status "active, closed"
        timestamp created_at
        timestamp expires_at
    }

    JOB_APPLICATION {
        uuid id PK
        uuid student_id FK
        uuid job_posting_id FK
        enum status "pending, reviewed, accepted, rejected"
        text cover_letter
        timestamp applied_at
        timestamp updated_at
    }

    COLLABORATION_PROJECT {
        uuid id PK
        uuid company_id FK
        uuid university_id FK
        string title
        text description
        text goals_json
        enum status "planning, active, completed"
        timestamp start_date
        timestamp end_date
    }

    PROJECT_PARTICIPATION {
        uuid id PK
        uuid project_id FK
        uuid student_id FK
        enum role "member, lead"
        timestamp joined_at
    }

    PORTFOLIO_ITEM {
        uuid id PK
        uuid student_id FK
        string title
        text description
        string url
        string file_url
        timestamp created_at
    }

    UNIVERSITY {
        uuid id PK
        string name
        string location
        string website
        timestamp created_at
    }
```

### 3.2 AI 에이전트 실행 이력

```mermaid
erDiagram
    AGENT_RUN ||--o{ AGENT_STEP : contains
    AGENT_STEP ||--o{ TOOL_CALL : executes

    AGENT_RUN {
        uuid id PK
        string run_type "matching, planning, analysis"
        uuid user_id FK
        text input_prompt
        text final_output
        enum status "running, completed, failed"
        timestamp started_at
        timestamp completed_at
    }

    AGENT_STEP {
        uuid id PK
        uuid run_id FK
        enum agent_name "planner, architect, builder, critic"
        text input_message
        text output_message
        int step_order
        timestamp executed_at
    }

    TOOL_CALL {
        uuid id PK
        uuid step_id FK
        string tool_name
        text tool_input
        text tool_output
        int execution_time_ms
        timestamp called_at
    }
```

## 4. 주요 컴포넌트

### 4.1 백엔드 컴포넌트 구조

```mermaid
graph TB
    subgraph "API Layer"
        ROUTES[Express Routes]
        MIDDLEWARE[Middleware<br/>Auth, CORS, Rate Limit]
    end

    subgraph "Service Layer"
        AUTH_SVC[Auth Service]
        MATCH_SVC[Matching Service]
        JOB_SVC[Job Service]
        PROJECT_SVC[Project Service]
        AGENT_SVC[Agent Orchestrator Service]
    end

    subgraph "Repository Layer"
        USER_REPO[User Repository]
        JOB_REPO[Job Repository]
        PROJECT_REPO[Project Repository]
    end

    subgraph "External Integrations"
        ELITE4[BMAD Elite 4]
        OPENAI_INT[OpenAI Integration]
        LANGSMITH_INT[LangSmith Integration]
    end

    ROUTES --> MIDDLEWARE
    MIDDLEWARE --> AUTH_SVC
    MIDDLEWARE --> MATCH_SVC
    MIDDLEWARE --> JOB_SVC
    MIDDLEWARE --> PROJECT_SVC

    AUTH_SVC --> USER_REPO
    MATCH_SVC --> JOB_REPO
    MATCH_SVC --> AGENT_SVC
    JOB_SVC --> JOB_REPO
    PROJECT_SVC --> PROJECT_REPO

    AGENT_SVC --> ELITE4
    ELITE4 --> OPENAI_INT
    ELITE4 -.-> LANGSMITH_INT
```

### 4.2 프론트엔드 컴포넌트 구조 (향후)

```mermaid
graph TB
    subgraph "Pages"
        HOME[Home Page]
        DASHBOARD[Dashboard]
        JOBS[Job Listings]
        PROFILE[Profile]
        PROJECTS[Projects]
    end

    subgraph "Components"
        HEADER[Header/Nav]
        CARD[Card Components]
        FORM[Form Components]
        TABLE[Data Tables]
        CHART[Charts/Analytics]
    end

    subgraph "State Management"
        ZUSTAND[Zustand Store]
        REACT_QUERY[React Query]
    end

    subgraph "Services"
        API_CLIENT[API Client<br/>Axios/Fetch]
        WS_CLIENT[WebSocket Client]
    end

    HOME --> HEADER & CARD
    DASHBOARD --> HEADER & CARD & CHART
    JOBS --> HEADER & CARD & TABLE
    PROFILE --> HEADER & FORM
    PROJECTS --> HEADER & TABLE

    DASHBOARD --> ZUSTAND
    JOBS --> REACT_QUERY
    PROFILE --> REACT_QUERY

    ZUSTAND --> API_CLIENT
    REACT_QUERY --> API_CLIENT
    DASHBOARD --> WS_CLIENT
```

## 5. 워크플로우

### 5.1 학생-기업 매칭 워크플로우

```mermaid
sequenceDiagram
    participant S as Student
    participant API as API Server
    participant P as Planner Agent
    participant A as Architect Agent
    participant B as Builder Agent
    participant C as Critic Agent
    participant DB as Database

    S->>API: Request Job Recommendations
    API->>DB: Fetch Student Profile
    DB-->>API: Profile Data
    API->>P: Analyze Student + Market
    P->>P: search_trends("job market")
    P-->>A: Strategy & Criteria
    A->>A: generate_api_spec("matching")
    A-->>B: Matching Algorithm Design
    B->>B: Execute Matching Logic
    B->>DB: Query Job Postings
    DB-->>B: Matching Jobs
    B-->>C: Results for Review
    C->>C: run_linter(results)
    C->>C: check_accessibility(results)
    alt Approved
        C-->>API: ✅ Approved Results
        API->>DB: Log Agent Run
        API-->>S: Recommended Jobs
    else Rejected
        C-->>B: ❌ Rejected - Revise
        B->>B: Refine Matching
        B-->>C: Updated Results
    end
```

### 5.2 R&D 프로젝트 자동 기획 워크플로우

```mermaid
sequenceDiagram
    participant U as University Admin
    participant API as API Server
    participant P as Planner Agent
    participant A as Architect Agent
    participant B as Builder Agent
    participant C as Critic Agent
    participant DB as Database

    U->>API: Request Project Planning
    API->>P: "Plan AI-based Medical Diagnosis System"
    P->>P: search_trends("medical AI")
    P->>P: analyze_finance("budget 5M")
    P-->>A: Project Plan & Budget
    A->>A: generate_api_spec("system design")
    A->>A: optimize_db_schema("patient data")
    A-->>B: Architecture Blueprint
    B->>B: refactor_code("existing modules")
    B->>B: generate_assets("UI mockups")
    B-->>C: Implementation Docs
    C->>C: run_security_scan("HIPAA compliance")
    C->>C: check_licenses("open source libs")
    alt Approved
        C-->>API: ✅ Complete Project Plan
        API->>DB: Save Project
        API-->>U: Detailed Roadmap
    else Rejected
        C-->>B: ❌ Security Issues Found
        B->>B: Fix Security Gaps
        B-->>C: Revised Docs
    end
```

### 5.3 산학 협력 매칭 워크플로우

```mermaid
sequenceDiagram
    participant C as Company
    participant API as API Server
    participant P as Planner Agent
    participant DB as Database

    C->>API: Submit Collaboration Proposal
    API->>DB: Store Proposal
    API->>P: Find Matching Universities
    P->>P: search_trends("university research")
    P->>DB: Query Universities & Departments
    DB-->>P: Matching Universities
    P->>P: analyze_finance("funding capacity")
    P-->>API: Ranked University Partners
    API->>DB: Create Matching Records
    API-->>C: Recommended University Partners
```

## 6. 외부 의존성

### 6.1 핵심 의존성

```mermaid
graph TB
    NURI[NURI Platform]

    subgraph "AI & ML"
        OPENAI[OpenAI API<br/>GPT-4, GPT-3.5]
        LANGCHAIN[LangChain<br/>v0.1.x]
        LANGGRAPH[LangGraph<br/>v0.0.1]
        LANGSMITH[LangSmith<br/>Monitoring & Tracing]
    end

    subgraph "Data & Storage"
        PG[PostgreSQL 15+]
        REDIS_EXT[Redis 7+]
        S3_EXT[AWS S3]
    end

    subgraph "Communication"
        SENDGRID[SendGrid<br/>Email Service]
        TWILIO[Twilio<br/>SMS (Optional)]
    end

    subgraph "DevOps & Monitoring"
        SENTRY[Sentry<br/>Error Tracking]
        DATADOG[Datadog<br/>APM (Optional)]
    end

    NURI --> OPENAI
    NURI --> LANGCHAIN
    NURI --> LANGGRAPH
    NURI -.-> LANGSMITH

    NURI --> PG
    NURI --> REDIS_EXT
    NURI --> S3_EXT

    NURI --> SENDGRID
    NURI -.-> TWILIO

    NURI -.-> SENTRY
    NURI -.-> DATADOG
```

### 6.2 기술 스택 버전

| 카테고리 | 기술 | 버전 | 용도 |
|---------|------|------|------|
| **런타임** | Node.js | 20.x+ | 서버 실행 환경 |
| | TypeScript | 5.3+ | 타입 안전성 |
| **프레임워크** | LangChain | 0.1.x | LLM 애플리케이션 프레임워크 |
| | LangGraph | 0.0.1 | 멀티 에이전트 오케스트레이션 |
| | Express | 4.18+ (향후) | API 서버 |
| | Next.js | 14+ (향후) | 프론트엔드 |
| **AI 모델** | OpenAI GPT-4-turbo | - | Planner, Architect, Builder |
| | OpenAI GPT-3.5-turbo | - | Critic |
| **데이터베이스** | PostgreSQL | 15+ (향후) | 메인 DB |
| | Redis | 7+ (향후) | 캐시 & 세션 |
| **모니터링** | LangSmith | - | AI 에이전트 추적 |
| | Sentry | 7+ (향후) | 에러 추적 |
| **검증** | Zod | 3.25+ | 런타임 타입 검증 |
| **배포** | Docker | 24+ (향후) | 컨테이너화 |
| | Kubernetes | 1.28+ (향후) | 오케스트레이션 |

## 7. 배포 아키텍처

### 7.1 개발/스테이징/프로덕션 환경

```mermaid
graph TB
    subgraph "Development"
        DEV_LOCAL[로컬 개발 환경<br/>tsx + dotenv]
        DEV_DB[(로컬 PostgreSQL)]
    end

    subgraph "Staging"
        STAGE_EC2[AWS EC2<br/>t3.medium]
        STAGE_RDS[(AWS RDS PostgreSQL)]
        STAGE_REDIS[(AWS ElastiCache)]
    end

    subgraph "Production"
        PROD_ALB[AWS ALB<br/>Load Balancer]
        PROD_ECS1[ECS Task 1<br/>API Server]
        PROD_ECS2[ECS Task 2<br/>API Server]
        PROD_RDS[(AWS RDS<br/>Multi-AZ)]
        PROD_REDIS[(AWS ElastiCache<br/>Cluster Mode)]
        PROD_S3[(AWS S3<br/>Static Assets)]
    end

    DEV_LOCAL --> DEV_DB

    STAGE_EC2 --> STAGE_RDS
    STAGE_EC2 --> STAGE_REDIS

    PROD_ALB --> PROD_ECS1
    PROD_ALB --> PROD_ECS2
    PROD_ECS1 --> PROD_RDS
    PROD_ECS2 --> PROD_RDS
    PROD_ECS1 --> PROD_REDIS
    PROD_ECS2 --> PROD_REDIS
    PROD_ECS1 --> PROD_S3
    PROD_ECS2 --> PROD_S3

    style DEV_LOCAL fill:#A8E6CF
    style STAGE_EC2 fill:#FFD3B6
    style PROD_ALB fill:#FF8B94
```

### 7.2 CI/CD 파이프라인 (향후)

```mermaid
graph LR
    GIT[Git Push] --> GH_ACTIONS[GitHub Actions]
    GH_ACTIONS --> LINT[Lint & Type Check]
    LINT --> TEST[Run Tests]
    TEST --> BUILD[Build Docker Image]
    BUILD --> ECR[Push to AWS ECR]
    ECR --> DEPLOY_STAGE[Deploy to Staging]
    DEPLOY_STAGE --> SMOKE_TEST[Smoke Tests]
    SMOKE_TEST -->|Pass| APPROVE[Manual Approval]
    APPROVE --> DEPLOY_PROD[Deploy to Production]
    DEPLOY_PROD --> MONITOR[Monitor with Sentry]

    style GIT fill:#A8E6CF
    style DEPLOY_PROD fill:#FF8B94
```

### 7.3 보안 아키텍처

```mermaid
graph TB
    subgraph "Network Layer"
        WAF[AWS WAF<br/>Web Application Firewall]
        VPC[AWS VPC]
    end

    subgraph "Application Layer"
        API_AUTH[JWT Authentication]
        RATE_LIMIT[Rate Limiting]
        CORS[CORS Policy]
    end

    subgraph "Data Layer"
        ENCRYPT[Database Encryption at Rest]
        SECRETS[AWS Secrets Manager]
    end

    subgraph "Monitoring"
        CLOUDWATCH[AWS CloudWatch]
        SENTRY_SEC[Sentry Security Alerts]
    end

    INTERNET[Internet] --> WAF
    WAF --> VPC
    VPC --> API_AUTH
    API_AUTH --> RATE_LIMIT
    RATE_LIMIT --> CORS
    CORS --> ENCRYPT
    ENCRYPT --> SECRETS

    VPC -.-> CLOUDWATCH
    API_AUTH -.-> SENTRY_SEC

    style WAF fill:#FF6B6B
    style ENCRYPT fill:#4ECDC4
```

## 8. 성능 및 확장성

### 8.1 예상 부하 및 대응

| 지표 | 목표 | 대응 방안 |
|------|------|-----------|
| **동시 접속자** | 1,000+ | 수평 확장 (ECS 오토스케일링) |
| **API 응답 시간** | < 500ms (P95) | Redis 캐싱, DB 인덱싱 |
| **AI 에이전트 처리** | < 30초 | 비동기 처리, 결과 큐잉 |
| **데이터베이스 처리량** | 10,000 TPS | RDS Read Replica, Connection Pooling |
| **파일 업로드** | 100 MB | S3 Direct Upload, Presigned URL |

### 8.2 캐싱 전략

```mermaid
graph LR
    API[API Request] --> REDIS_CHECK{Redis Cache?}
    REDIS_CHECK -->|Hit| RETURN_CACHE[Return Cached Data]
    REDIS_CHECK -->|Miss| DB_QUERY[Query Database]
    DB_QUERY --> CACHE_SET[Set Redis Cache<br/>TTL: 300s]
    CACHE_SET --> RETURN_DB[Return DB Data]

    style REDIS_CHECK fill:#FFD700
    style RETURN_CACHE fill:#50C878
```

---

## 참고 자료

- [CLAUDE.md](../CLAUDE.md) - AI 개발 가이드
- [Epic 문서](./epic.md) - 프로젝트 비전 및 목표
- [LangGraph 공식 문서](https://langchain-ai.github.io/langgraph/)
- [PostgreSQL 공식 문서](https://www.postgresql.org/docs/)

---

**작성자**: Gagahoho, Inc.
**최종 업데이트**: 2026-02-10
**버전**: 1.0
