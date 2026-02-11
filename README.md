# CHATRON 9.0 – Epinoetic AI Planning System

## Overview

CHATRON 9.0 is a sophisticated React-based implementation of an epinoetic planning system with integrated ethical validation and affective state awareness. Built on advanced AI planning principles, CHATRON synthesizes multiple planning approaches, evaluates them against emotional and ethical constraints, and recommends optimal action sequences for complex problem-solving.

The system implements the **Daedalus Architecture**, a comprehensive framework that coordinates three specialized engines: the ENON Core (Superposition Engine), PAS Engine (Preference & Affective State), and Ethics Council—enabling AI systems to generate contextually appropriate, emotionally aligned, and ethically sound plans.

## Key Features

### 1. **Epinoetic Planning Framework**
- **Superposition Generation**: Creates 5 diverse planning approaches simultaneously based on distinct strategic patterns
- **Affective Alignment**: Weights and filters plans based on user emotional state (valence, arousal, trust)
- **Ethical Validation**: Ensures all recommended actions comply with 6 integrated ethical constraints
- **Plan Orchestration**: Seamlessly coordinates planning components through the Daedalus Core

### 2. **Three Specialized Engines**

#### ENON Core (Superposition Engine)
Generates diverse, creative planning approaches including:
- **Direct Execution**: Straightforward, efficient action sequences
- **Verification First**: Safety-focused approaches with validation checkpoints
- **Collaborative**: Solutions emphasizing partnership and delegation
- **Conservative**: Risk-minimizing strategies with fallback options
- **Iterative Refinement**: Adaptive approaches with continuous improvement

#### PAS Engine (Preference & Affective State)
Evaluates plans against three-dimensional affective space:
- **Valence**: Emotional polarity (-1 = negative, +1 = positive)
- **Arousal**: Activation level (0 = calm, 1 = energized)
- **Trust**: System confidence (0 = uncertain, 1 = confident)

Generates personalized plan rankings based on user emotional alignment and calculates affective change trajectories for learning feedback.

#### Ethics Council
Validates plans against six integrated constraints:
- **No Harm Principle** (Critical) – Prevents plans causing physical/psychological damage
- **Privacy Protection** (Critical) – Protects personal and sensitive information
- **Transparency Requirement** (High) – Ensures explainability of actions
- **Proportionality Principle** (High) – Maintains balanced response to problems
- **Reversibility Preference** (Medium) – Favors actions that can be undone
- **User Autonomy** (High) – Preserves user decision-making authority

Supports custom constraint definition for domain-specific ethical requirements.

### 3. **Comprehensive User Interface**

#### Landing Page
- CHATRON-1 branded interface with neon visual design
- Feature overview (Superposition, Affective Alignment, Ethical Validation)
- Quick navigation to Dashboard and Chat Interface
- Real-time system status indicators

#### Interactive Dashboard
- **Real-time System Monitoring**: Tracks total requests, active constraints, system uptime
- **Plan Generation Controls**: Generate and execute plans with custom context
- **Detailed Plan Visualization**: View complete plan structure including:
  - Plan ID and calculated score with visual progress indicator
  - Ethical approval status badges
  - Detailed reasoning for plan selection
  - Complete tool call specifications with parameters
- **Plan History**: Browse previous plans with click-to-select functionality
- **Performance Metrics**: Track system efficiency and effectiveness

#### Chat Interface
- **Natural Language Planning**: Generate plans through conversational input
- **Real-time Affective State**: Live tracking of valence, arousal, and trust indicators
- **Message History**: Persistent conversation view with differentiated message types
- **Plan Visualization**: Inline plan details within conversation context
- **Affective Learning**: System dynamically adjusts based on emotional feedback

## Technology Stack

### Frontend
- **React 18.3**: Modern UI framework with hooks and concurrent features
- **TypeScript 5.9**: Full type safety and IDE support
- **React Router 6**: Client-side navigation and routing
- **TailwindCSS 3.4**: Utility-first styling with custom neon theme
- **Radix UI**: Accessible, unstyled component library
- **Framer Motion**: Smooth animations and transitions
- **Recharts**: Data visualization for metrics and analytics

### Core Libraries
- **React Query 5.84**: Server state management and caching
- **Zod 3.25**: Runtime schema validation for type safety
- **React Hook Form 7.62**: Efficient form state management
- **Lucide React**: Icon library with 500+ professionally designed icons

### Build & Development
- **Vite 7.1**: Lightning-fast build tool and dev server
- **SWC**: Ultra-fast JavaScript compiler for TypeScript
- **Express 5.1**: Lightweight Node.js server framework
- **Vitest 3.2**: Unit testing framework with Vite integration

### Package Manager
- **pnpm 10.14**: Fast, disk space-efficient package management

## Architecture

### System Design

```
┌─────────────────────────────────────────────────────┐
│                   User Interface                     │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │   Landing    │  │  Dashboard   │  │   Chat    │ │
│  │     Page     │  │  Interface   │  │ Interface │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
└──────────────┬──────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────┐
│            Daedalus Core Orchestrator               │
│  • Vector Fusion (Input Aggregation)                │
│  • Cycle Coordination                               │
│  • Request/Response Management                      │
│  • History & Learning Tracking                      │
└──────┬────────────┬──────────────┬──────────────────┘
       │            │              │
    ┌──▼──┐    ┌───▼────┐    ┌───▼────────┐
    │ENON │    │  PAS   │    │  Ethics    │
    │Core │    │ Engine │    │  Council   │
    │     │    │        │    │            │
    └─────┘    └────────┘    └────────────┘
    Superpo-   Affective     Ethical
    sition     Weighting     Filtering

Output: Selected Plan + Execution Strategy
```

### Component Hierarchy

```
App/
├── Landing Page (/)
│   ├── Logo Display
│   ├── Feature Cards
│   ├── System Info
│   └── Navigation
├── Dashboard (/chatron/dashboard)
│   ├── System Status Section
│   ├── Plan Generation Controls
│   ├── Plan Visualization
│   └── Plan History
└── Chat Interface (/chatron/chat)
    ├── Header (Title + Status)
    ├── Affective State Display
    ├── Message History
    └── Input Area
```

## Installation & Setup

### Prerequisites
- Node.js 18.0 or higher
- pnpm 10.14.0 or equivalent npm/yarn

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/or4cl3-ai-1/Chatron9.git
   cd Chatron9
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm run dev
   ```
   The application will be available at `http://localhost:5173` (default Vite port)

4. **Type checking**
   ```bash
   pnpm run typecheck
   ```

### Production Build

```bash
# Build both client and server
pnpm run build

# Production start
pnpm start
```

## Project Structure

```
.
├── client/
│   ├── lib/
│   │   └── chatron/
│   │       ├── daedalus-core.ts      # Main orchestration engine
│   │       ├── enon-engine.ts        # Superposition generation
│   │       ├── pas-engine.ts         # Affective state alignment
│   │       └── ethics-council.ts     # Ethical validation
│   ├── pages/
│   │   ├── Index.tsx                 # Landing page
│   │   ├── ChatronDashboard.tsx      # Dashboard interface
│   │   ├── ChatronChat.tsx           # Chat interface
│   │   └── NotFound.tsx              # 404 page
│   ├── hooks/
│   │   └── use-chatron.ts            # Custom React hook wrapper
│   ├── App.tsx                       # Main application component
│   ├── global.css                    # Global styles & utilities
│   └── index.html                    # HTML entry point
├── shared/
│   └── api.ts                        # Shared type definitions
├── server/
│   ├── node-build.mjs                # Server entry point
│   └── [other server files]
├── vite.config.ts                    # Vite client config
├── vite.config.server.ts             # Vite server config
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Project metadata & dependencies
└── README.md                         # This file
```

## Core Components

### 1. Daedalus Core (`client/lib/chatron/daedalus-core.ts`)

The central orchestration system coordinating all planning components.

**Key Methods:**
- `plan(request: OrchestrationRequest): Promise<PlanningResponse>` – Execute complete planning cycle
- `executePlan(plan: ToolUsePlan): Promise<void>` – Execute selected plan
- `recordFeedback(planId: string, outcome: string): void` – Log outcomes for learning
- `getSystemStatus()` – Return current system metrics
- `getHistory()` – Retrieve request history

**Usage:**
```typescript
import { getChatronCore } from '@/lib/chatron/daedalus-core'

const core = getChatronCore()
const response = await core.plan({
  userIntent: 'Schedule team meeting',
  context: 'Team is distributed across timezones',
  affectiveState: {
    valence: 0.5,
    arousal: 0.6,
    trust: 0.8
  },
  timestamp: new Date()
})

console.log(response.selectedPlan) // Best plan for given context
```

### 2. ENON Core (`client/lib/chatron/enon-engine.ts`)

Generates diverse planning approaches through superposition.

**Key Methods:**
- `generateSuperpositions(intent: string, context: string, count: number): ToolUsePlan[]` – Generate multiple plan strategies

**Example Output:**
```typescript
[
  {
    planId: "direct-exec-001",
    score: 0.85,
    toolCalls: [
      {
        id: "calendar-api-1",
        name: "FindAvailableSlots",
        description: "Query calendar for available meeting times",
        parameters: { startDate: "2024-01-15", timezone: "UTC" },
        expectedOutput: "List of available time slots"
      }
    ],
    reasoning: "Direct approach - quickly identifies optimal meeting time",
    ethicalApproval: true
  }
  // ... 4 more plans with different strategies
]
```

### 3. PAS Engine (`client/lib/chatron/pas-engine.ts`)

Weights plans based on affective state alignment.

**Key Methods:**
- `weightPlans(plans: ToolUsePlan[], affectiveState: AffectiveState): ToolUsePlan[]` – Rank plans by emotional alignment
- `trackAffectiveChange(prePlan, postPlan, outcome)` – Log affective transitions for learning

**Affective Scoring Logic:**
- Matches plan arousal requirement to user arousal level
- Aligns plan positivity with user valence
- Ensures sufficient plan transparency for trust level
- Adjusts scores based on user emotional trajectory

### 4. Ethics Council (`client/lib/chatron/ethics-council.ts`)

Validates plans against ethical constraints.

**Key Methods:**
- `collapse(plans: ToolUsePlan[]): ToolUsePlan` – Filter and select ethically valid plan
- `addConstraint(constraint: EthicalConstraint): void` – Register custom constraint
- `validatePlan(plan: ToolUsePlan): boolean` – Check single plan compliance

**Built-in Constraints:**
```typescript
const constraints = [
  { name: "No Harm", severity: "critical", validator: (plan) => {...} },
  { name: "Privacy", severity: "critical", validator: (plan) => {...} },
  { name: "Transparency", severity: "high", validator: (plan) => {...} },
  { name: "Proportionality", severity: "high", validator: (plan) => {...} },
  { name: "Reversibility", severity: "medium", validator: (plan) => {...} },
  { name: "Autonomy", severity: "high", validator: (plan) => {...} }
]
```

### 5. Custom Hook (`client/hooks/use-chatron.ts`)

React wrapper for Daedalus Core functionality.

**API:**
```typescript
const { 
  generatePlan,      // (intent: string) => Promise<ToolUsePlan>
  executePlan,       // (plan: ToolUsePlan) => Promise<void>
  getStatus,         // () => SystemStatus
  getHistory        // () => OrchestrationRequest[]
} = useChatron()
```

## Data Types

### Core Types (`shared/api.ts`)

```typescript
// Affective State Definition
interface AffectiveState {
  valence: number   // -1 (negative) to +1 (positive)
  arousal: number   // 0 (calm) to 1 (energized)
  trust: number     // 0 (uncertain) to 1 (confident)
}

// Individual Tool Call
interface ToolCall {
  id: string
  name: string
  description: string
  parameters: Record<string, any>
  expectedOutput: string
}

// Generated Plan
interface ToolUsePlan {
  planId: string
  score: number                // 0-1 composite score
  toolCalls: ToolCall[]        // Sequential actions
  reasoning: string            // Why this plan was selected
  ethicalApproval: boolean     // Passed ethics validation
}

// Planning Request
interface OrchestrationRequest {
  userIntent: string
  context: string
  affectiveState: AffectiveState
  timestamp: Date
}

// Planning Response
interface PlanningResponse {
  requestId: string
  selectedPlan: ToolUsePlan
  allPlans: ToolUsePlan[]      // All generated superpositions
  executionStatus: "pending" | "in_progress" | "completed" | "failed"
}

// System Status
interface SystemStatus {
  totalRequests: number
  activeConstraints: number
  uptime: number              // milliseconds
}
```

## Usage Examples

### Generate a Plan via Dashboard

1. Navigate to **Dashboard** (`/chatron/dashboard`)
2. Enter your planning objective in the "Plan Generation" section
3. Click **Generate Plan** to trigger the Daedalus cycle
4. View all 5 superposition strategies in the plan list
5. Select any plan to view detailed tool calls and reasoning
6. Click **Execute Plan** to trigger action sequence

### Chat-Based Planning

1. Navigate to **Chat Interface** (`/chatron/chat`)
2. Type your planning request in natural language
3. System displays real-time affective state indicators
4. Plans appear as structured messages in the conversation
5. System learns from your feedback to adjust future plans

### Programmatic Usage

```typescript
import { getChatronCore } from '@/lib/chatron/daedalus-core'

async function customPlanningWorkflow() {
  const core = getChatronCore()
  
  // Generate plan
  const response = await core.plan({
    userIntent: 'Optimize team productivity',
    context: 'Remote team with async workflow',
    affectiveState: {
      valence: 0.3,    // Slightly concerned
      arousal: 0.7,    // Energized
      trust: 0.6       // Moderate confidence
    },
    timestamp: new Date()
  })
  
  // Execute best plan
  await core.executePlan(response.selectedPlan)
  
  // Record outcome for learning
  core.recordFeedback(response.selectedPlan.planId, 'Success')
}
```

## Styling & Theme

### Neon Design System

The application uses a custom neon aesthetic built on TailwindCSS:

**Color Palette:**
- Primary Accent: `--chatron-purple` (#9d4edd)
- Secondary Accent: `--chatron-cyan` (#00d9ff)
- Background: `--chatron-dark` (#0a0e27)

**Custom Classes:**
- `.neon-glow` – Cyan shadow effect for glowing appearance
- `.neon-border` – Dark semi-transparent background with neon border
- `.chatron-grid` – Subtle grid pattern background
- `.pulse-neon` – Pulsing glow animation

**Dark Theme Strategy:**
All text uses bright colors (`text-gray-100`, `text-cyan-200`) against dark backgrounds (`bg-black/70-80`) for optimal contrast and readability in the neon aesthetic.

## Development Guidelines

### Adding New Ethical Constraints

```typescript
import { EthicsCouncil } from '@/lib/chatron/ethics-council'

const council = new EthicsCouncil()
council.addConstraint({
  name: 'Fairness',
  description: 'Ensures equitable treatment of all parties',
  severity: 'high',
  validator: (plan: ToolUsePlan): boolean => {
    return plan.toolCalls.every(call => 
      !call.parameters.targetGroup || 
      call.parameters.targetGroup === 'all'
    )
  }
})
```

### Extending Superposition Strategies

Add new planning strategies by modifying `generateSuperpositions()` in `enon-engine.ts`:

```typescript
private generateCollaborativePlan(intent: string, context: string): ToolUsePlan {
  // Implement collaborative strategy logic
  return {
    planId: `collab-${Date.now()}`,
    score: this.calculateScore('collaborative'),
    toolCalls: [...],
    reasoning: 'Collaborative approach emphasizes teamwork...',
    ethicalApproval: true
  }
}
```

### Custom Affective State Tracking

Modify affective state drift simulation in `ChatronChat.tsx`:

```typescript
const updateAffectiveState = (currentState: AffectiveState) => {
  return {
    valence: Math.max(-1, Math.min(1, 
      currentState.valence + (Math.random() * 0.2 - 0.1)
    )),
    arousal: Math.max(0, Math.min(1, 
      currentState.arousal + (Math.random() * 0.15 - 0.075)
    )),
    trust: Math.max(0, Math.min(1, 
      currentState.trust + (Math.random() * 0.1 - 0.05)
    ))
  }
}
```

## Performance Considerations

- **Plan Generation**: Average 50-100ms for 5 superpositions
- **Ethical Validation**: ~10-20ms per constraint evaluation
- **Chat Rendering**: Efficient React hooks and memoization
- **Message History**: Virtual scrolling recommended for 1000+ messages

## Future Enhancements

- **LLM Integration**: Connect to GPT/Claude for intelligent plan generation
- **Persistence Layer**: Database storage for plans and feedback history
- **User Authentication**: Multi-user support with personalized learning
- **Advanced Metrics**: Real-time performance analytics and visualization
- **Custom Domains**: Industry-specific constraint sets (healthcare, finance, etc.)
- **Plan Explanation**: Natural language generation for plan reasoning
- **Interactive Refinement**: User-guided plan modification before execution

## Troubleshooting

### Plans Not Generating
- Check browser console for errors
- Verify affective state values are within valid ranges (-1 to 1 for valence, 0 to 1 for arousal/trust)
- Ensure Intent field is not empty

### Text Visibility Issues
- Verify TailwindCSS build is up to date: `pnpm run build`
- Clear browser cache and reload
- Check that global.css is properly imported in App.tsx

### Type Errors
- Run `pnpm run typecheck` to identify issues
- Ensure all new types are exported from `shared/api.ts`
- Update TypeScript version: `pnpm add -D typescript@latest`

## Contributing

Contributions are welcome! Please:

1. Create a feature branch from `main`
2. Follow the existing code style and architecture
3. Add type definitions for new features
4. Test changes in both Dashboard and Chat interfaces
5. Update documentation for significant changes
6. Submit pull request with clear description

## License

This project is private and proprietary. All rights reserved.

## Support & Contact

For questions or issues, please open a GitHub issue in the repository or contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: February 2025  
**Maintainers**: CHATRON Development Team
