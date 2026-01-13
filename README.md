# Daddy G.O. Simulator 🙏⛪

A satirical BitLife-style life simulation game exploring money, faith, power, and scandal in Nigerian megachurch culture.

> *"They said the Kingdom of God is not meat and drink, but right now, your stomach is singing a different song."*

![Status](https://img.shields.io/badge/Status-v2.0%20Complete-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

---

## 🎮 Play Now

```bash
npm install
npm run dev
# Visit http://localhost:3000
```

---

## 🆕 VERSION 2.0 - STRATEGIC OVERHAUL

**Major Update:** Transformed from quick casual game to deep strategic simulation!

### What's New in v2.0

#### ⚡ Energy System
- **All actions cost energy** (20-50 per action)
- Energy resets weekly
- Strategic choice: Train skills OR do ministry
- Forces long-term planning

#### 📚 Skill Development System
- **5 Pastor Skills**: Preaching, Healing, Charisma, Business, Politics
- Train skills with energy (30-50 energy/session)
- **Diminishing returns**: Harder to level high skills
- **Level 1-10 progression** with visual progress bars
- All actions now **skill-based** (low skills = poor results)

#### 🎓 University Graduation System
- **4-year progression**: 200L → 300L → 400L → 500L → Graduate
- **Graduation at week 208** (4 years)
- **Two paths after graduation**:
  - **🌾 Village Path** (Hard Mode): Cheap venues, slow growth, forgiving community
  - **🏙️ City Path** (Expensive Mode): Wealthy donors, fast growth, fierce competition
- **Age tracking** - Pastor ages annually

#### 💰 Economic Rebalancing
- **10x cost increase** on all venues
- **Realistic progression**:
  - Classroom: ₦50K (was ₦5K)
  - Tent: ₦500K (was ₦50K)
  - Stadium: ₦5B (was ₦500M)
- Takes **hours to progress**, not minutes
- Skill-based offering income

#### 🎮 Gameplay Duration
- **Before**: 30 minutes to reach success
- **After**: 3-5 hours of strategic grind
- More addictive, longer sessions
- Meaningful progression

---

## 🚀 Features

### Core Gameplay
- **Week-by-week progression** via `[End Week]` button
- **Energy management**: Strategic resource allocation
- **Skill training**: Develop your pastor's abilities
- **Five vital stats**: Health, Cash (Personal/Church), Anointing, Fame, Scandal, Energy
- **Moral choices** with permanent consequences
- **Auto-save** via localStorage

### Energy System
- **100 Energy per week**
- Actions consume energy:
  - Street Preach: 20 energy
  - Hold Service: 50 energy
  - Pray & Fast: 30 energy
  - Train Skills: 30-50 energy (depends on skill level)
- **No energy = Can't act** (must end week)

### Skill System
```typescript
PastorSkills {
  preaching: 1-10   // Affects cash from sermons
  healing: 1-10     // Miracle success rate
  charisma: 1-10    // Member recruitment multiplier
  business: 1-10    // Investment returns
  politics: 1-10    // Scandal resistance
}
```

**Training Costs:**
- Level 1-3: 30 energy, +0.3 skill
- Level 4-6: 40 energy, +0.2 skill  
- Level 7-9: 50 energy, +0.1 skill
- Level 10: MAX (can't train further)

**Skill Impact:**
- **Low skills (1-3)**: Minimal member gains, low income
- **Mid skills (4-6)**: Decent progress
- **High skills (7-10)**: Excellent results, viral potential

### Education & Life Paths

#### University Phase (Weeks 1-208)
- **Limited to campus venues** (Bus Stop, Classroom only)
- Must balance **academics + ministry**
- Graduate at week 208 (4 years)

#### Post-Graduation Paths

**🌾 Village Ministry**
- **Difficulty**: HARD
- 50% slower member growth
- Offerings worth 30% of city
- Venues cost 20% of city prices
- More forgiving scandal tolerance
- Harder to go viral

**🏙️ City Ministry**
- **Difficulty**: EXPENSIVE
- 20% faster member growth
- Offerings worth 200% of village
- Venues cost 300% of village prices
- Less forgiving scandal
- Easier to go viral

### Economy System
- **Two-wallet economy**: Church vs Personal funds
- **Siphon mechanics**: Transfer with scandal risk
- **Venue upgrades**: Bus Stop → Classroom → Tent → Warehouse → Dome → Stadium → City State

### Guest Ministers (10+ Parody Pastors)
| Name | Archetype | Effect | Cost |
|------|-----------|--------|------|
| Brother Tochi | Motivational | +10 members | ₦500 |
| Sister Blessing | Prosperity | +15 members, +₦5K | ₦2K |
| Prophet Liquid | Controversial | +500 members, 25% scandal | ₦50K |
| Daddy G.O. Humble | Fire Brand | +2000 members, +30 anointing | ₦500K |

### Assets & Investments
- **Vehicles**: Toyota Corolla → Mercedes G-Wagon → Rolls Royce
- **Property**: Flat → Duplex → Banana Island Mansion
- **Investments**: Stocks, Bitcoin, GloryCoin (30% rug pull risk!)

### Relationships & Romance
- **4 Archetypes**: Faithful Sister, Slay Queen, Pastor Daughter, Choir Mistress
- **Procedural generation** with stats (Looks, Spirituality, Craziness)
- **Hookup system** with scandal/pregnancy risks
- **Drama events** with consequences

### Social Media
- **YouTube**: Upload sermons, grow subscribers
- **Spotify**: Worship songs, passive income
- **Viral moments** require high skills

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx         # Main game (skill-based actions)
│   ├── layout.tsx       # Root layout
│   └── globals.css      # BitLife design system
├── components/
│   ├── StatsBar.tsx     # Stats display (with age)
│   ├── EventModal.tsx   # Story events
│   ├── Toast.tsx        # Notifications
│   ├── SkillsModal.tsx  # Skill training interface
│   ├── GraduationModal.tsx  # Path choice
│   ├── SiphonModal.tsx  # Wallet transfers
│   └── GuestMinistersModal.tsx
├── store/
│   └── useGameStore.ts  # Zustand state (with skills, education)
├── engine/
│   └── eventSystem.ts   # Event triggers
├── data/
│   ├── events/
│   │   ├── act1Events.ts
│   │   ├── specialEvents.ts
│   │   └── randomEvents.ts
│   ├── guestMinisters.ts
│   ├── assets.ts
│   └── relationships.ts
└── types/
    └── game.ts          # TypeScript definitions
```

---

## 🎯 Game Systems

### Stats Engine
```typescript
CoreStats {
  health: number;        // 0-100 (0 = death)
  personalCash: number;  // Personal wealth
  churchCash: number;    // Ministry funds
  anointing: number;     // Spiritual power
  fame: number;          // Public reputation
  scandal: number;       // Risk meter (100 = jail)
  energy: number;        // Weekly action points
}
```

### Venue Progression (Updated v2.0)
| Venue | Cost | Members Required | Education |
|-------|------|------------------|-----------|
| Bus Stop | Free | 0 | Any |
| Classroom | ₦50K | 10 | Student/Graduate |
| Crusade Tent | ₦500K | 50 | Graduate |
| Warehouse | ₦50M | 1,000 | Graduate |
| The Dome | ₦500M | 5,000 | Graduate |
| Stadium | ₦5B | 20,000 | Graduate |
| City State | ₦50B | 100,000 | Graduate |

---

## 📖 Story Events (Act 1)

| Event | Theme | Permanent? |
|-------|-------|------------|
| The Morning Cry | Bus stop preaching | No |
| The Roommate's Offer | Yahoo temptation | Yes |
| The Offering Basket | Eat vs Sow seed | Yes |
| The First Miracle | Real vs Fake | Yes |

---

## 🎮 Gameplay Tips

### Early Game (Weeks 1-50)
1. **Focus on health**: Eat regularly
2. **Train Preaching skill**: Better sermon income
3. **Street preach** to build base
4. **Save energy** for skill training

### Mid Game (Weeks 50-208)
1. **Balance skills**: Don't neglect any
2. **Prepare for graduation**: Save ₦100K+
3. **Choose path wisely**: Village = safe, City = ambitious
4. **Build church slow**: Can't rush venues anymore

### Late Game (Post-Graduation)
1. **Specialize skills**: Max out 2-3 skills
2. **Go viral**: Need Charisma 7+ and Fame 60+
3. **Manage scandal**: Politics skill helps
4. **Invest wisely**: Business skill matters

---

## 🛣️ Changelog

### v2.0 - Strategic Overhaul (Current)
- ✅ Energy system (100 per week)
- ✅ Skill training (5 skills, Level 1-10)
- ✅ Skill-based action outcomes
- ✅ University graduation (week 208)
- ✅ Village vs City path choice
- ✅ 10x cost increase on venues
- ✅ Age tracking (shown in stats bar)
- ✅ Education-based venue restrictions
- ✅ Diminishing returns on skill training

### v1.0 - MVP
- ✅ Phase 1: Engine Skeleton
- ✅ Phase 2: Act 1 Survival Mode
- ✅ Phase 3: Economy & Feedback
- ✅ Phase 4: Content Databases

### Roadmap
- [ ] Phase 5: Village/City-specific events
- [ ] Phase 6: Dropout path implementation
- [ ] Phase 7: Acts 2-4, Multiple endings
- [ ] Phase 8: Polish & balance tweaks

---

## 📜 Cultural Notes

This game satirizes Nigerian megachurch culture:
- **"Yahoo"** - Internet fraud
- **"Sowing seed"** - Prosperity gospel giving
- **"Arrangee"** - Staged miracles
- **"Daddy G.O."** - Respectful pastor title
- **"200L, 300L, 400L"** - Nigerian university year levels

---

## 🏗️ Technical Implementation

### Skill System Architecture
```typescript
// Store function
trainSkill(skill: keyof PastorSkills) => {
  energyCost: 30-50 (based on level)
  skillGain: 0.1-0.3 (diminishing returns)
  maxLevel: 10
}

// Action multipliers
memberGain = baseMemberGain * (1 + (skills.preaching + skills.charisma) / 20)
cashGain = baseCashGain * (1 + skills.preaching / 10)
```

### Graduation System
```typescript
// Triggered at week 208
if (week === 208 && occupation === 'Student') {
  showGraduationModal();
}

// Path modifiers
Village: {
  memberGrowthRate: 0.5x
  offeringMultiplier: 0.3x
  venueCostMultiplier: 0.2x
}

City: {
  memberGrowthRate: 1.2x
  offeringMultiplier: 2.0x
  venueCostMultiplier: 3.0x
}
```

---

## 📄 License

MIT License - Build your ministry.

---

*From bus stop preacher to megachurch mogul. Will you keep the faith?*

**Now with 10x more grind, strategy, and addiction!** ⚡
