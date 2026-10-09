# Support Rakshittips 💖

[![Developer: Rakshit Dhakariya](https://img.shields.io/badge/Developer-Rakshit%20Dhakariya-ec4899.svg?style=for-the-badge&logo=android)](https://github.com/Rakshittips)
[![Telegram](https://img.shields.io/badge/Telegram-@Rakshittips-2AABEE.svg?style=for-the-badge&logo=telegram)](https://t.me/Rakshittips)
[![Instagram](https://img.shields.io/badge/Instagram-@mr._rakshit_2.0-E1306C.svg?style=for-the-badge&logo=instagram)](https://www.instagram.com/mr._rakshit_2.0)
[![YouTube](https://img.shields.io/badge/YouTube-@mr._rakshit_2.0-FF0000.svg?style=for-the-badge&logo=youtube)](https://youtube.com/@mr._rakshit_2.0)
[![GitHub](https://img.shields.io/badge/GitHub-Rakshittips-181717.svg?style=for-the-badge&logo=github)](https://github.com/Rakshittips)

An ultra-refined, responsive, and seamless **Support & Donate** web application for **Rakshittips** — empowering community members to fuel independent, solo-built Android modifications, iOS UI ports, and open-source utilities with 0% platform fees.

---

## 🚀 About the Developer: Rakshittips

**Rakshit Dhakariya** is an independent tech creator, Android modder, reverse engineer, and open-source developer focused on:
- 📱 **iOS Fluidity & Blur Glass Aesthetics on Android**: Bringing system-level 120Hz physics, dynamic blur layers, and authentic iOS emojis to Android apps.
- 🛡️ **Zero Adware & Privacy First**: Clean modifications with zero corporate trackers, background bloat, or subscription paywalls.
- ⚡ **100% Solo Built**: Every patch, Smali bytecode edit, APK build, documentation site, and tool is developed solo.

### 🌟 Official Developer Socials & Contact
- **Telegram Channel**: [@Rakshittips](https://t.me/Rakshittips)
- **Telegram Developer DM**: [@RakshittipsDeveloper](https://t.me/RakshittipsDeveloper)
- **Instagram**: [@mr._rakshit_2.0](https://www.instagram.com/mr._rakshit_2.0)
- **YouTube**: [@mr._rakshit_2.0](https://youtube.com/@mr._rakshit_2.0)
- **GitHub**: [Rakshittips](https://github.com/Rakshittips)
- **Email**: [RakshitDhakariya6@gmail.com](mailto:RakshitDhakariya6@gmail.com)

---

## 🛠️ Flagship Projects Supported

1. **instaGram Pro**:
   - Refined Instagram experience on Android with native iOS emojis across stories, chats, and comments.
   - Ghost mode (anonymous story viewing, hidden seen receipts) and 4K media downloader.
2. **MRGram iPhone!**:
   - iOS-styled Telegram client mod for Android with authentic Apple system haptics, blur UI, and custom soundscapes.
3. **MRTune**:
   - Ad-free offline and online music engine with synchronized Apple Music-style lyrics and 320kbps lossless audio.
4. **MRiOS Launcher**:
   - Full iOS home screen experience with interactive Dynamic Island, iOS 18 Control Center, and smooth gestures.
5. **MRiMods Launcher**:
   - All-in-one verified hub for direct one-click mod updates and APK rollbacks.
6. **Open Source & Utilities**:
   - Public GitHub repositories, APK decompilation tools, shell scripts, and configuration presets.

---

## ✨ Features & Utilities Included

- **⚡ Instant Real-Time UPI Payments**:
  - Live UPI ID: `rakshitdhakariya6@oksbi`
  - Real-time dynamic QR code generation updated on amount and memo note changes.
  - One-tap app dispatchers for **PhonePe**, **Google Pay**, **Paytm**, **BHIM**, and **Generic UPI**.
  - Built-in clipboard copy with visual confirmation and sound/confetti feedback.
- **🎨 Glassmorphic iOS Aesthetics & High-Contrast Light Mode**:
  - 60fps GPU-composited ambient background glow.
  - Instant theme switcher toggling between dark glass and high-contrast light mode, persisted in `localStorage`.
- **🌍 15-Language Internationalization with RTL Support**:
  - Full translations for: English, Arabic (with native RTL layout), Azerbaijani, German, Greek, Spanish, French, Hindi, Hungarian, Indonesian, Italian, Polish, Brazilian Portuguese, Serbian, and Thai.
  - Interactive search-enabled language selector modal.
- **📜 Verified Backer Certificate & Digital Receipt Generator**:
  - Generates an official digital patron certificate with donor name, tier badge (Diamond / Gold / Core Backer), verified reference ID, and 1-click Print/PDF download.
- **🎯 Custom UPI QR & Intent Studio**:
  - Customize donation amount and memo message, preview real-time QR codes, test deep links, and download high-resolution PNGs.
- **💱 Global Currency Converter**:
  - Converts USD ($), EUR (€), GBP (£), AED (د.إ), SAR (﷼), and THB (฿) to Indian Rupees (INR ₹) with one-click application to the donation input.
- **💬 Community Wall of Love**:
  - Supporter shoutouts board with local storage persistence and celebratory confetti animations.

---

## 💻 Tech Stack

- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 + Custom iOS Glassmorphism Engine
- **Icons**: FontAwesome 6.5.1 + Lucide React
- **Animations & Effects**: Canvas Confetti + Motion
- **Fonts**: Syne, Plus Jakarta Sans, JetBrains Mono

---

## 🚀 Running Locally

1. Clone or open the repository:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```
   *The build automatically generates relative assets (`./assets/...`), a `DonateSupport.html` mirror, and a `404.html` SPA fallback in the `dist` folder to prevent blank screens on GitHub Pages.*

---

## 🌐 Deploying to GitHub Pages (No Blank Page Fix)

### Why GitHub Pages shows a blank white page by default:
By default, Vite builds assets pointing to the root domain (`/assets/...`). When deployed on GitHub Pages under a repository subfolder (e.g. `https://rakshittips.github.io/Rakshittips/`), the browser fails to find the assets at the domain root, resulting in 404 errors and a blank white screen.

### How this project fixes it:
1. **Relative Base Path (`base: './'`)**:
   `vite.config.ts` is configured with `base: './'`, ensuring all JavaScript and CSS files load relative to the repository folder on GitHub Pages.
2. **Automatic 404 & DonateSupport.html Fallbacks**:
   On `npm run build`, `dist/index.html` is automatically cloned to `dist/404.html` and `dist/DonateSupport.html` to guarantee direct links and SPA navigation work without 404s.
3. **Automated GitHub Actions Deployment**:
   A ready-to-use `.github/workflows/deploy.yml` workflow is included. Simply push your code to `main`, go to **Settings > Pages** on your GitHub repo, and set **Source: GitHub Actions**.

---

## 📄 License & Attribution

Crafted solo by **Rakshit Dhakariya** ([@Rakshittips](https://github.com/Rakshittips)).  
Released free and ad-free for the open-source and Android modding community.
