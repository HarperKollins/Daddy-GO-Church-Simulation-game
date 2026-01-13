# 🦅 daddy-go-simulator
> *Where Faith Meets Finance: The Ultimate Nigerian Megachurch Simulation*

![Version](https://img.shields.io/badge/version-2.0.0-blue?style=for-the-badge&logo=none)
![Build Status](https://img.shields.io/badge/build-passing-success?style=for-the-badge&logo=github-actions)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/stack-Next.js_16_%7C_TypeScript_%7C_Zustand-black?style=for-the-badge&logo=next.js)

---

## 📖 The Vision
**Daddy G.O. Simulator** is a satirical, text-based life simulation game that thrusts players into the chaotic, vibrant, and morally complex world of building a megachurch empire in Lagos, Nigeria. 

Inspired by *BitLife*, this is not just a clicker game—it's a **strategic management RPG**. You start as a broke 200L university student with nothing but a Bible and a dream. Your goal? To build a ministry that rivals the giants of faith, all while balancing your spirituality, public image, and bank account.

Will you remain a humble servant of the truth, or will the allure of private jets and "seed sowing" turn you into a controversial figure? The choice is yours.

---

## 🚀 Key Features (v2.0 Overhaul)

### ⚡ The Energy System
Gone are the days of infinite spam-clicking. Every action now has a cost, forcing strategic decision-making.
- **Weekly Cap**: You have **100 Energy** per week. Spending it wisely is the key to growth.
- **Action Costs**:
  - `Preaching`: 20 Energy
  - `Hold Service`: 50 Energy
  - `Train Skill`: 30-50 Energy
- **Strategic Depth**: Do you preach for quick cash, or study to improve your long-term stats?

### 📚 RPG Skill Progression
Your pastor is defined by 5 core stats, each scaling from Level 1 to 10.
- **🎤 Preaching**: Determines offering efficiency and sermon impact.
- **✨ Healing**: Increases miracle success rates and fame accumulation.
- **💫 Charisma**: Crucial for member retention and viral social media moments.
- **💼 Business**: Boosts returns on investments and reduces venue maintenance costs.
- **🏛️ Politics**: Provides resistance against scandals and negative press.
> *Note: Training higher levels requires significantly more energy (Diminishing Returns).*

### 🎓 Education & Career Paths
Your journey begins on campus.
1.  **University Phase (Weeks 1-208)**:
    - Juggle academic pressure with ministry growth.
    - Unlock "Campus Fellowship" venues.
    - **Risk**: Dropping out unlocks venues early but permanently caps your stats.
2.  **Graduation Day (Week 208)**:
    - **🌾 The Village Path (Hard Mode)**: Low cost, slow growth, high spiritual authenticity.
    - **🏙️ The City Path (Empire Mode)**: High stakes, massive costs, viral potential.

### 💰 Complex Economy
- **Dual-Wallet System**: Manage **Personal Cash** (Lifestyle) vs. **Church Funds** (Ministry).
- **Siphon Mechanic**: Tempted to "borrow" from the offering basket? You can, but it spikes your **Scandal** meter.
- **Asset Market**: Buy cars, houses, and investments (Stocks, Crypto, Real Estate) to boost your Fame and passive income.
- **Inflationary Venues**: From a humble **Bus Stop** (Free) to the **City State** (₦50 Billion).

### 📱 Social Media & Fame
- **YouTube Ministry**: Upload sermons to gain global subscribers and ad revenue.
- **Spotify Podcast**: Passive income stream from worship hits.
- **Content Creation**: Going viral requires a mix of high **Charisma** and **Fame**.

---

## 🛠️ Technical Architecture

This project is built with a modern, type-safe stack designed for performance and scalability.

| Technology | Purpose |
|------------|---------|
| **Next.js 16** (App Router) | High-performance React framework for the UI and routing. |
| **TypeScript 5** | Strict type safety for complex game logic and state objects. |
| **Zustand** | Lightweight, transient global state management for game data. |
| **Tailwind CSS v4** | Utility-first styling for a responsive, "Dark Mode" aesthetic. |
| **Local Storage** | Robust persistence layer to save game progress automatically. |

### Directory Structure
```bash
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components (Modals, Toasts, Cards)
├── store/               # Zustand specific game state logic (useGameStore.ts)
├── engine/              # Core game loop, event triggers, and probability logic
├── data/                # Static data (Events, Assets, Guest Ministers)
└── types/               # TypeScript interfaces (GameStore, PlayerState, Partner)
```

---

## 💿 Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/HarperKollins/Daddy-GO-Church-Simulation-game.git
    cd daddy-go-simulator
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open `http://localhost:3000` to start your ministry.

4.  **Build for Production**
    ```bash
    npm run build
    npm start
    ```

---

## 🤝 Contributing

We welcome contributions from the community! Whether it's adding new "Nigerian-coded" random events, fixing bugs, or balancing the economy.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 🔮 Roadmap

- [ ] **Phase 3: The Miracle Service Update** - Interactive mini-games for healing sessions.
- [ ] **Phase 4: Crusade Mode** - Regional expansion and stadium events.
- [ ] **Phase 5: The "Papa" System** - Mentorship mechanics and succession planning.
- [ ] **Mobile App Port** - React Native implementation.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<center>
  <p>Crafted with ❤️ and 😂 by <b>Harper Kollins AI</b></p>
  <p><i>"Touching lives, one offering at a time."</i></p>
</center>
