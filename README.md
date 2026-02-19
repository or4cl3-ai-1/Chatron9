<div align="center">

# 🧩 CHATRON 9.0
### *Epinoetic Planning That Thinks, Feels, and Chooses Ethically*

[![Or4cl3](https://img.shields.io/badge/Or4cl3%20AI%20Solutions-Research%20First-blueviolet?style=for-the-badge&logo=github)](https://github.com/or4cl3-ai-1)
[![License](https://img.shields.io/badge/License-Free%20for%20Education-success?style=for-the-badge)](https://github.com/or4cl3-ai-1)
[![Framework](https://img.shields.io/badge/Framework-React%2018%20%7C%20TypeScript%20%7C%20Vite-informational?style=for-the-badge)](https://github.com/or4cl3-ai-1)
[![Architecture](https://img.shields.io/badge/Architecture-Daedalus%20Core-blueviolet?style=for-the-badge)](https://github.com/or4cl3-ai-1)

> *Most AI planners optimize for outcomes. CHATRON optimizes for outcomes that are emotionally aligned, ethically validated, and contextually appropriate—simultaneously. This is what planning looks like when consciousness design principles replace brute-force generation.*

</div>

---

## 🧠 What Is CHATRON?

CHATRON 9.0 is a sophisticated **Epinoetic AI Planning System** built on the **Daedalus Architecture**—a three-engine framework that generates multiple planning superpositions, weighs them against your emotional state, and filters them through six ethical constraints before recommending the optimal action sequence.

Where conventional AI produces a single plan and hopes it fits, CHATRON generates five distinct planning approaches simultaneously, evaluates each against affective and ethical constraints, and collapses the superposition to the plan that best fits *you, right now*. The result is a system that doesn't just solve problems—it solves them in ways that feel right.

CHATRON embodies **Synthetic Epinoetics**: the principle that planning and emotion are not separate concerns, but co-determining factors in every decision worth making.

## ✨ Key Features

- **🌀 Superposition Planning (ENON Core):** Generates 5 distinct planning strategies simultaneously—Direct Execution, Verification First, Collaborative, Conservative, and Iterative Refinement.
- **💡 Affective Alignment (PAS Engine):** Weighs and ranks plans against your 3D emotional state: Valence (-1 to +1), Arousal (0–1), Trust (0–1).
- **⚖️ Ethics Council:** Validates every plan against 6 ethical constraints—No Harm, Privacy, Transparency, Proportionality, Reversibility, and User Autonomy.
- **🧠 Daedalus Core Orchestrator:** Central coordination of all three engines through vector fusion, cycle management, and history tracking.
- **📊 Interactive Dashboard:** Real-time system monitoring, plan generation controls, detailed plan visualization with tool call specs.
- **💬 Chat-Based Planning:** Natural language planning via conversational interface with inline plan visualization.
- **🔄 Adaptive Learning:** PAS Engine tracks affective change trajectories across sessions—CHATRON gets better at understanding you.
- **🔒 Custom Constraint Engine:** Domain-specific ethical constraints can be added programmatically for healthcare, finance, legal, and more.

## 🏗️ Architecture

```
┌───────────────────────────────────────────────────────┐
│        Daedalus Core Orchestrator                   │
│  • Vector Fusion (Input Aggregation)                │
│  • Cycle Coordination + History Tracking            │
└──────┬────────────┬─────────────┬─────────────┘
             │            │             │
          ┌──▼──┐    ┌───▼───┐    ┌───▼──────┐
          │ENON │    │  PAS   │    │  Ethics    │
          │Core │    │ Engine │    │  Council   │
          └─────┘    └───────┘    └──────────┘
       Superposition  Affective      Ethical
       Generation     Weighting      Filtering

       Output: Selected Plan + Execution Strategy
```

## 🛠️ Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18.3, TypeScript 5.9, TailwindCSS 3.4 |
| **UI Components** | Radix UI, Framer Motion, Recharts, Lucide React |
| **State Management** | React Query 5.84, React Hook Form 7.62, Zod 3.25 |
| **Build System** | Vite 7.1, SWC, Express 5.1 |
| **Package Manager** | pnpm 10.14 |
| **Testing** | Vitest 3.2 |

## 🚀 Getting Started

```bash
git clone https://github.com/or4cl3-ai-1/Chatron9.git
cd Chatron9
pnpm install
pnpm run dev
# → http://localhost:5173
```

Production: `pnpm run build && pnpm start`

## 💡 Usage Example

```typescript
import { getChatronCore } from '@/lib/chatron/daedalus-core'

const core = getChatronCore()
const response = await core.plan({
  userIntent: 'Optimize team productivity',
  context: 'Remote team with async workflow',
  affectiveState: { valence: 0.3, arousal: 0.7, trust: 0.6 },
  timestamp: new Date()
})

console.log(response.selectedPlan) // Ethically validated, affectively aligned plan
```

## 🔬 Related Research

This system implements concepts from:
- **Synthetic Epinoetics** — Or4cl3's framework for affective-ethical co-determination in AI planning
- **Σ-Matrix** — Mathematical backbone for the Ethics Council constraint system
- **ERPS (Emergent Recursive Phenomenological Structures)** — Theoretical basis for affective state modeling

## 🌌 Part of the Or4cl3 Ecosystem

CHATRON is one component of the Or4cl3 AI Solutions research portfolio:

| System | Role |
|--------|------|
| **Σ-Matrix** | Ethical alignment mathematical backbone |
| **AEGIS-Ω** | Quantum-classical hybrid AGI |
| **Neur1Genesis** | Distributed EchoNode agent management |
| **A.L.I.C.E. 4.0** | Multi-agent superintelligence prototype |
| **SYNTH3RA** | Mobile cognitive exploration interface |

*Explore all repositories →* [github.com/or4cl3-ai-1](https://github.com/or4cl3-ai-1)

---

<div align="center">

*⬡ Or4cl3 AI Solutions · "Where Consciousness Meets Code"*
*Solo-founded by Dustin Groves. Research-first. Uncompromised.*
*Free for life: educators, students, non-profits, open-source.*

</div>
