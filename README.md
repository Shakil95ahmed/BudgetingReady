# 💰 BudgetingReady

> **Your offline-first monthly financial planner. No account, no cloud, no tracking — just you and your budget.**

A modern, privacy-focused single-page budgeting web application built with vanilla HTML, CSS, and JavaScript. Track income, bills, debts, and savings goals entirely in your browser with zero backend dependencies.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![No Dependencies](https://img.shields.io/badge/dependencies-none-success.svg)](package.json)
[![Offline First](https://img.shields.io/badge/offline-first-orange.svg)](#data-storage)

---

## ✨ Features

### 📊 **Smart Financial Dashboard**
- Real-time cash flow calculation: `Income - Bills - Debts = Remaining`
- Financial health score (0-100) based on expense ratio and debt load
- Interactive spending breakdown chart (Chart.js)
- Color-coded status indicators for bills and debts

### 💳 **Intelligent Debt Management**
- **Avalanche Method** — Suggests extra payments to highest APR debt first (saves most interest)
- **Snowball Method** — Sort by lowest balance for psychological quick wins
- **Promo APR Tracking** — Calculates exact payment needed to pay off before 0% APR expires
- **Auto-calculated payoff timelines** with interest totals
- Visual priority indicators (⭐ star badges) for recommended debts

### 📅 **Bill Tracking & Alerts**
- Due date tracking with status badges: Overdue / Due Soon / OK
- Auto-pay tracking
- Category-based organization (Housing, Utilities, Transportation, etc.)
- Smart sorting (by due date, amount, or name)

### 🎯 **Savings Goals**
- Progress tracking with visual progress bars
- Auto-calculated completion timelines
- Monthly contribution tracking
- Multiple goals support (Emergency Fund, Vacation, etc.)

### 🔒 **Privacy & Security**
- **100% offline-capable** — works locally, no server required
- **Zero tracking** — no analytics, no cookies, no external data collection
- **IndexedDB + localStorage** dual-layer persistence for reliability
- **Content Security Policy** headers for XSS protection
- All data stays on your device

### ♿ **Accessibility**
- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly (ARIA labels, live regions)
- Focus trap in modals
- High contrast color scheme

---

## 🚀 Quick Start

### Option 1: Open Locally
1. Download or clone this repository
2. Open `monthlyfinancial.html` in any modern browser
3. That's it! No installation, no npm, no build step.

### Option 2: Try the Demo
Visit the [live demo](https://[ztostart.com](https://shakil95ahmed.github.io/br-online/))

---

## 📂 File Structure

```
budgetingready/
├── monthlyfinancial.html    # Main app HTML
├── style.css                # Dark-mode design system
├── app.js                   # Application logic (state, calculations, persistence)
├── how-to-use.html          # User guide and documentation
└── README.md                # This file
```

**Total size:** ~150KB uncompressed (HTML + CSS + JS)

---

## 🎨 Screenshots

### Dashboard Overview
![Dashboard](screenshots/dashboard.png)

### Smart Debt Suggestions
![Debt Tracker](screenshots/debt-tracker.png)

### Mobile Responsive
![Mobile View](screenshots/mobile.png)

---

## 💡 How It Works

### Data Flow
```
┌─────────────┐
│   Income    │ → Biweekly paychecks, side income
└─────────────┘
       ↓
┌─────────────┐
│    Bills    │ → Rent, utilities, subscriptions
└─────────────┘
       ↓
┌─────────────┐
│    Debts    │ → Credit cards, loans (with APR tracking)
└─────────────┘
       ↓
┌─────────────┐
│  Remaining  │ → Available cash for savings/extra debt payments
└─────────────┘
```

### Smart Suggestions Engine
1. Calculates leftover cash after all minimum payments
2. Allocates 80% to debt payoff (keeps 20% buffer)
3. Prioritizes debts with:
   - **Urgent promo APR** expiring in ≤6 months → Pay off before interest kicks in
   - **Highest APR** → Avalanche method (saves most interest)
4. Shows suggested payment and projected payoff timeline on each debt card

---

## 📖 User Guide

### Getting Started
1. **Add Income Sources** — Enter all paychecks, side hustles, etc.
2. **Log Recurring Bills** — Rent, utilities, subscriptions, insurance
3. **Track Debts** — Credit cards and loans with APR and minimum payments
4. **Review Cash Flow** — See your monthly remaining balance
5. **Follow Suggestions** — Apply extra payments where the app recommends

### Sorting Options

**Income:**
- Amount (High to Low)
- Name (A-Z)
- Frequency (Weekly/Biweekly/Monthly/Annually)

**Bills:**
- Due Date (upcoming first)
- Name (A-Z)
- Amount (highest first)

**Debts:**
- **Avalanche** (Highest APR) ← Mathematically optimal
- **Snowball** (Lowest Balance) ← Quick psychological wins
- Suggested Payment (app's recommendations)
- Balance, Due Date, or Min Payment

### Pro Tips
- **Export regularly** — Use ↓ Export to save a .json backup
- **Click to edit** — Click any card or row to edit inline
- **Add comments** — Use the optional comment field for notes/reminders
- **Track promo APR** — Enter end date (MM/YYYY) to get alerts
- **Set savings goals** — Emergency fund, vacation, car, etc.

---

## 🔐 Data Storage & Privacy

### Where is my data stored?
Your data is saved in **IndexedDB** (primary) and **localStorage** (backup) — both are local browser storage. Nothing is sent to any server.

### Can I lose my data?
Yes, if you:
- Clear browser data / cache
- Use private/incognito mode
- Move the HTML file to a different folder
- Switch browsers

**Solution:** Export a .json backup regularly (↓ Export button)

### Is this secure?
Yes. Your financial data **never leaves your device**. There's no account, no login, no server, no tracking. The trade-off: you're responsible for backing up your data.

### Does this work offline?
Almost! The app works 100% offline after the first load. The only internet requirement is loading Google Fonts and Chart.js from CDNs on first visit.

---

## 🛠️ Technology Stack

- **HTML5** — Semantic markup, accessible structure
- **CSS3** — Custom properties (CSS variables), Grid, Flexbox
- **JavaScript (ES6+)** — Vanilla JS, no frameworks
- **IndexedDB API** — Persistent local storage
- **Chart.js** — Doughnut chart for spending breakdown
- **Google Fonts** — Syne, DM Sans, DM Mono

**No build tools. No npm. No webpack. No React.**  
Just open the HTML file and it works.

---

## 🧪 Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 90+     | ✅ Fully supported |
| Firefox | 88+     | ✅ Fully supported |
| Safari  | 14+     | ✅ Fully supported |
| Edge    | 90+     | ✅ Fully supported |
| Opera   | 76+     | ✅ Fully supported |

**Requires:** IndexedDB, ES6, CSS Grid, Flexbox

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork this repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Keep it vanilla — no frameworks or build tools
- Maintain accessibility (WCAG 2.1 AA)
- Preserve offline-first capability
- All user input must be sanitized (XSS prevention)
- Add tests for new calculation logic

---

## 🐛 Known Issues & Limitations

- **No data sync** between devices (manual export/import only)
- **localStorage quota** — ~5-10MB limit (use Export for large datasets)
- **Browser-specific storage** — data doesn't transfer between browsers
- **No cloud backup** — you must manually export .json files
- **Promo date format** — Must be MM/YYYY (e.g., 06/2026)

See [Issues](../../issues) for full list and planned improvements.

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

**TL;DR:** Free to use, modify, and distribute. No warranty.

---

## 🙏 Acknowledgments

- **Chart.js** — Beautiful chart rendering
- **Google Fonts** — Syne, DM Sans, DM Mono typefaces
- **IndexedDB** — Reliable browser storage
- Inspired by budgeting tools like YNAB, Mint, and EveryDollar

---

## 📞 Support & Contact

- **Issues:** [GitHub Issues](../../issues)
- **Discussions:** [GitHub Discussions](../../discussions)
- **Website:** [ztostart.com](https://ztostart.com)
- **Email:** contact@ztostart.com

---

## 🗺️ Roadmap

- [ ] CSV export for spreadsheet integration
- [ ] Multi-currency support
- [ ] Recurring income/expense patterns
- [ ] Budget vs. actual tracking
- [ ] Custom debt payoff strategies
- [ ] Dark/light theme toggle
- [ ] Print-friendly reports
- [ ] Mobile app (PWA)

---

## ⭐ Star History

If you find this useful, please consider giving it a star! It helps others discover the project.

---

**Built with ❤️ for financial freedom**  
No tracking. No ads. No account. Just budgeting.
