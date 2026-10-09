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

## 🌐 Deploying to GitHub Pages (Fixing Blank White Page)

### ⚠️ Aapki live link (`rakshittips.github.io/Rakshittips-Support`) par Blank White Page aane ki wajah:
Aapke GitHub repo me GitHub Pages ka source **"Deploy from a branch (main / root)"** set hai. Iski wajah se GitHub Pages aapki uncompiled `index.html` file serve kar raha hai jisme:
```html
<script type="module" src="/src/main.tsx"></script> <!-- Browser cannot run raw .tsx! -->
```
Browsers direct `.tsx` file nahi chala sakte, isliye screen blank ho jaati hai!

---

### ✅ Sirf 1 Setting change karke Live chalaane ka tareeka (Recommended):

1. Apne GitHub repository (`Rakshittips-Support`) me **Settings** par jayein.
2. Left sidebar me **Pages** par click karein.
3. **Build and deployment** section ke andar:
   - **Source**: Dropdown me **"Deploy from a branch"** ko badal kar **"GitHub Actions"** select karein!
4. Repository me updated `.github/workflows/deploy.yml` push karein (ya **Actions** tab me ja kar **"Deploy to GitHub Pages"** par **Run workflow** click karein).
5. GitHub Actions automatic `npm install --legacy-peer-deps` aur `npm run build` run karega aur `./dist` folder deploy kar dega!
6. Ab aapka URL `https://rakshittips.github.io/Rakshittips-Support` **100% perfect, fast aur working load hoga!**

---

### 🚀 Alternate Option (1-Command Deploy via gh-pages):
Agar aap GitHub Actions use nahi karna chahte, to aap terminal se direct deploy kar sakte hain:
```bash
npm run deploy
```
Ye script automatically project ko build karega aur compiled files ko `gh-pages` branch par push kar dega. Fir GitHub Settings > Pages me branch `gh-pages` select kar lijiye.

---

## 📄 License & Attribution

Crafted solo by **Rakshit Dhakariya** ([@Rakshittips](https://github.com/Rakshittips)).  
Released free and ad-free for the open-source and Android modding community.
