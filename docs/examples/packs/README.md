# 🧩 BlackRoad OS Examples Packs

Reusable templates and patterns for common workflows across BlackRoad OS.

---

## 📦 Available Packs

### v132: Emoji BD Pipeline 🤝

**Status**: 🟢 Active  
**Type**: Business Development Pipeline  
**Format**: 7 stages × 7 deals matrix

Emoji-based business development pipeline visualization with status tracking for deals across 7 stages (Intake → Win).

**Files**:
- [`v132-emoji-bd-pipeline.md`](v132-emoji-bd-pipeline.md) - Complete documentation and usage guide
- [`v132-emoji-bd-pipeline.json`](v132-emoji-bd-pipeline.json) - JSON data structure

**Use Cases**:
- Business development pipeline tracking
- Sales funnel visualization
- Deal progression monitoring
- IAR/BD setup integration

**Quick Preview**:
```
Legend: 🟢 moving 🟡 waiting 🔴 stuck ⚪️ empty  ⭕ gate  🏁 win

🧭        D1      D2      D3      D4      D5      D6      D7
1️⃣ 📥     ⚪️      ⚪️      ⚪️      ⚪️      ⚪️      ⚪️      ⚪️
2️⃣ 🧑‍🤝‍🧑  ⚪️      ⚪️      ⚪️      ⚪️      ⚪️      ⚪️      ⚪️
3️⃣ ✍️     ⚪️      ⚪️      ⚪️      ⚪️      ⚪️      ⚪️      ⚪️
4️⃣ 👀     ⚪️      ⚪️      ⚪️      ⚪️      ⚪️      ⚪️      ⚪️
5️⃣ ⭕     ⚪️      ⚪️      ⚪️      ⚪️      ⚪️      ⚪️      ⚪️
6️⃣ 📎🗂   ⚪️      ⚪️      ⚪️      ⚪️      ⚪️      ⚪️      ⚪️
7️⃣ 🏁     ⚪️      ⚪️      ⚪️      ⚪️      ⚪️      ⚪️      ⚪️
```

---

## 🔜 Coming Soon

### v133: Emoji Finance Controls 💰

**Status**: 🟡 Planned  
**Type**: Finance & Budget Control  
**Format**: 7 controls × 7 cycles matrix

Finance and budget tracking with emoji-based control visualization for IAR/BD setup.

---

## 📋 Pack Categories

### Business & Operations
- ✅ v132: Emoji BD Pipeline - Business development tracking

### Finance & Budget
- 🟡 v133: Emoji Finance Controls - Coming soon

### Infrastructure & DevOps
- Future packs TBD

### Analytics & Reporting
- Future packs TBD

---

## 🎯 Design Principles

All Examples Packs follow these principles:

### 1. **Emoji-First Visualization** 🎨
- Status and meaning communicated through emojis
- No external images or custom icons required
- Works across all platforms (GitHub, Notion, Slack, etc.)

### 2. **Structured Data** 📊
- JSON data models for programmatic access
- Markdown documentation for human reading
- Clear schema definitions

### 3. **Reusable Templates** 🔁
- Copy-paste ready
- Minimal customization needed
- Documented usage examples

### 4. **Integration Ready** 🔌
- Works with Trinity system (GreenLight/YellowLight/RedLight)
- Compatible with IAR tracking
- Supports automation and dashboards

---

## 💡 How to Use

### 1. Choose a Pack
Browse available packs above and select one that fits your needs.

### 2. Review Documentation
Read the pack's `.md` file for complete usage instructions.

### 3. Copy Template
Use the JSON data structure or copy the markdown visualization.

### 4. Customize
Update status emojis and labels to match your workflow.

### 5. Integrate
Embed in your documentation, dashboards, or automation tools.

---

## 🛠️ Creating New Packs

Want to contribute a new examples pack?

### Template Structure
```
docs/examples/packs/
├── vXXX-pack-name.md          # Documentation and usage
├── vXXX-pack-name.json        # Data structure
└── README.md                   # This index file
```

### Requirements
1. **Version Number**: Sequential (v132, v133, etc.)
2. **Emoji Theme**: Use emoji for status/visualization
3. **JSON Schema**: Provide structured data model
4. **Documentation**: Complete usage guide in markdown
5. **Examples**: Include at least one usage scenario

### Submit
Open a PR with your pack following the template above.

---

## 📚 Related Systems

- **[Trinity System](../../trinity/)** - GreenLight/YellowLight/RedLight framework
- **[SIG Beacon](../sig.beacon.sample.json)** - Service health signaling
- **[Service Registry](../../registry/services.yaml)** - All services mapping

---

## 🔗 Quick Links

- [Main Documentation](../../README.md)
- [Repository Charter](../../REPO_CHARTER.md)
- [Trinity README](../../trinity/README.md)
- [Examples Directory](../)

---

**Maintained By**: BlackRoad OS Infrastructure Team  
**Last Updated**: 2025-12-25  
**Pack Count**: 1 active, 1 planned
