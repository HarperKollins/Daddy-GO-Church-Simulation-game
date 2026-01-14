# Daddy G.O. Simulator 🇳🇬⛪

> "If you are not winning souls, you are losing money." — *Daddy G.O.*

**From Bus Stop to City State: The Ultimate Nigerian Mega-Church Tycoon Simulation.**

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Proprietary-red)]()

---

## 📖 Overview

Daddy G.O. Simulator is a **text-based, decision-driven life simulation RPG** that explores a provocative question: **What does it take to build a religious empire in Lagos, Nigeria?**

You start as a broke 200-level university student with nothing but a Bible and a dream. Through strategic decisions, relationship management, and navigating the complex socio-economic landscape of Nigeria, you aim to become the General Overseer of a private city-state.

But beware—the path to glory is paved with scandals, "arranged" miracles, political deals, EFCC investigations, and the occasional baby mama drama.

**Will you remain a faithful shepherd, or become a wolf in designer Agbada?**

---

## 🎮 Core Gameplay Features

### Life Simulation Systems

| System | Description |
|--------|-------------|
| **University Life** | Start as a 200L student, progress through 300L-500L, graduate or dropout |
| **Career Progression** | Student → Graduate → Full-Time Pastor → General Overseer |
| **Relationship System** | Date, get engaged, marry, or have secret affairs with consequences |
| **Baby Mama Mechanic** | Hidden children with escalating weekly support costs and scandal threats |
| **Skills Development** | Train Preaching, Healing, Charisma, Business, and Politics (1-10 scale) |
| **Social Media Presence** | Build YouTube subscribers and Spotify listeners for passive income |

### The Two-Wallet Economy 💰

A core satirical mechanic reflecting real-world financial temptations:

- **Church Account 🏦** — Tax-free offerings used for ministry growth
- **Personal Account 💳** — Your private wealth (siphoning increases Scandal)

### Ministry Progression

```
BUS_STOP → CLASSROOM → TENT → WAREHOUSE → DOME → STADIUM → CITY_STATE
```

Each venue tier unlocks new abilities, increases offerings, and attracts more members.

### Location Paths

Choose your ministry location after graduation:

| Path | Difficulty | Offering Modifier | Description |
|------|------------|------------------|-------------|
| **Campus** | Easy | 0.8x | Student congregation, limited growth |
| **Village** | Hard | 0.3x | Poor community, massive challenge |
| **City** | Medium | 2.0x | Wealthy urban givers, high competition |

---

## ⚔️ Advanced Game Engines

The game features **15+ interconnected simulation engines**:

### 🕊️ Spiritual Warfare Engine
RPG-style battles against demonic entities with tiered difficulty:
- Minor demons → Major demons → Principalities → Territorial spirits
- Prayer power, fasting bonuses, and deliverance sessions

### 📜 Testimony System
- Collect real testimonies from congregants
- Fabricate fake testimonies (high scandal risk)
- Share testimonies for fame/anointing boosts
- Risk of exposure if fabricated testimonies are investigated

### 🔮 Prophecy Engine
- Generate safe (vague) or risky (specific) prophecies
- Track fulfillment rates and prophetic reputation
- Cover up failed prophecies or face public embarrassment

### 🏛️ Church Politics Engine
- Manage factions within your congregation
- Handle power struggles, coups, and church splits
- Reconcile or suppress dissent

### 👶 Dynasty & Succession
- Raise pastor children with unique personalities
- Choose successors (biological, spiritual sons, outsiders)
- Plan orderly transitions or face contested succession

### 💹 Economy Engine (2026)
- Realistic Nigerian economic simulation
- Crypto trading (including scam coins with rug pull risk)
- Black market dollar exchange
- Inflation affects all prices weekly

### 🎭 Nigerian Realism Engine
- **Owambe Invitations** — Mandatory party attendance affecting reputation
- **Infrastructure Failures** — NEPA cuts, fuel scarcity, network issues
- **Construction Projects** — Build auditoriums with contractor drama
- **Church Mothers** — Powerful women with demands and gossip networks

### 🧠 Advanced ML-Lite Engine
- Player behavior pattern detection
- Dynamic difficulty adjustment
- Frustration and engagement tracking
- Predicted endings based on choices

### ⚖️ Causality System
- Every action has delayed consequences
- Karma tracking (positive/negative ledger)
- Actions in Year 1 create scandals in Year 10

### 📊 Additional Systems
- **Title Progression** — Earn titles from "Brother" to "His Holiness"
- **Psychological Hooks** — Login streaks, FOMO events, sunk cost traps
- **Seed Faith Campaigns** — Run offering drives with manipulation tactics
- **Personal Development** — Read books, take courses, earn certifications
- **Emotional Events** — Guilt, grief, triumph, fear, shame, and doubt narratives

---

## 🖥️ User Interface

### Interactive Dashboards
- **Church Visualizer** — Watch your venue evolve from dusty street to mega-complex
- **Chirps Feed** — Satirical Nigerian Twitter reacting to your sermons
- **Notification Center** — Real-time invites, alerts, and family requests
- **Assets Manager** — Track properties, vehicles, and investments
- **Testimony Manager** — Curate and share your testimony inventory

### Dark Mode UI
Premium dark theme with:
- Glassmorphism effects
- Smooth animations
- Mobile-responsive design
- Energy-based action system

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1 | React framework (App Router) |
| **TypeScript** | 5.0+ | Type-safe development |
| **Tailwind CSS** | 4.0 | Utility-first styling |
| **Zustand** | Latest | State management |
| **Custom Engine** | - | Event triggers, probability logic, causality |

### Project Structure

```
daddy-go-simulator/
├── src/
│   ├── app/                    # Next.js App Router pages
│   ├── components/             # React components
│   │   ├── dashboards/         # Game dashboards (Testimony, Assets, etc.)
│   │   └── visualizers/        # Church and stat visualizers
│   ├── data/
│   │   ├── assets.ts           # Vehicles, properties, investments
│   │   ├── events/             # Event definitions by category
│   │   └── guestMinisters.ts   # 30+ parody Nigerian pastors
│   ├── engine/                 # 15+ game simulation engines
│   ├── store/                  # Zustand state stores
│   └── types/                  # TypeScript type definitions
├── public/                     # Static assets
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/CeZarCorp/daddy-go-simulator.git

# Navigate to project directory
cd daddy-go-simulator

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

### Type Checking

```bash
# Run TypeScript compiler
npx tsc --noEmit
```

---

## 🤝 Contributing

We welcome **"Laborers in the Vineyard"** (Contributors)!

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Ideas

| Category | Examples |
|----------|----------|
| **Events** | Write new event cards (scandals, miracles, family drama) |
| **Engines** | Improve simulation logic or add new mechanics |
| **UI/UX** | Design new dashboards or improve mobile experience |
| **Balancing** | Tune economic equations and difficulty curves |
| **Content** | Add more guest ministers, testimonies, prophecies |
| **Testing** | Write unit tests for game engines |

### Code Style

- Use TypeScript strict mode
- Follow existing naming conventions
- Document complex logic with comments
- Keep components focused and reusable

### Reporting Issues

- Use GitHub Issues for bug reports
- Include steps to reproduce
- Attach screenshots if applicable

---

## 📋 Roadmap

### ✅ Completed
- Full life cycle simulation (student to G.O.)
- 15+ interconnected game engines
- Venue progression system
- Relationship and family mechanics
- Crypto and investment systems
- Dark mode UI with animations
- Mobile-responsive design

### 🔨 In Progress
- Deep family trees with inheritable traits
- Full Act 2 & 3 narrative storylines
- Procedurally generated sermons

### 🔮 Planned
- Multi-branch expansion (London, Houston, Dubai)
- Rival pastor system with beef mechanics
- Judgement Day final evaluation
- Multiplayer pastor competitions
- Save/Load game functionality

---

## 🎭 Tone & Intent

**This is Satire.**

Created with love for Nigeria and deep respect for genuine faith, but with a sharp critical eye on the *business* of religion.

- We laugh at the absurdity of "buying special prayers"
- We critique systems that enable manipulation
- We celebrate the resilience of the Nigerian spirit

> *If you are offended, please pray for the developers. If you laugh, please star the repo.* ⭐

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 👨‍💻 Author

**Collins Somtochukwu (Harper Kollins)**

- Founder & Lead Developer
- [CeZar Corp](https://github.com/CeZarCorp)

---

## 🙏 Acknowledgments

- The Nigerian church experience (for inspiration)
- Every pastor who ever owned a private jet
- Everyone who has ever "sowed a seed"
- The resilience of Lagosians everywhere

---

<div align="center">

**Built with ❤️ in Nigeria 🇳🇬**

*© 2026 CeZar Corp. All rights reserved.*

*No tithes were collected in the making of this software.*

</div>
