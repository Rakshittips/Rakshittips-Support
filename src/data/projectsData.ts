export interface ProjectItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  color: string;
  icon: string;
  badge: string;
  features: string[];
}

export const RAKSHITTIPS_PROJECTS: ProjectItem[] = [
  {
    id: 'instagram-pro',
    name: 'instaGram Pro',
    tagline: 'iPhone Instagram Experience on Android with iOS Emojis & Blur UI',
    category: 'Social Mod',
    color: 'from-pink-500 to-purple-600',
    icon: 'fa-brands fa-instagram',
    badge: 'Popular',
    features: [
      'iOS Emoji rendering system across all stories and chats',
      'High-quality media saving (Reels, Stories, HD Posts)',
      'Ultra clean glassmorphism dark mode with true blacks',
      'Ghost mode & unread indicator toggles'
    ]
  },
  {
    id: 'mrgram',
    name: 'MRGram iPhone!',
    tagline: 'iOS Telegram Client Mod for Android with Native Apple Haptics',
    category: 'Messaging Mod',
    color: 'from-sky-400 to-blue-600',
    icon: 'fa-brands fa-telegram',
    badge: 'Featured',
    features: [
      'Authentic iOS Telegram interface with real time blurs',
      'iOS system sounds, fonts, and emoji keyboard integration',
      'No ads, sponsored post filtering, unlimited pinning',
      'Advanced chat privacy and custom icon themes'
    ]
  },
  {
    id: 'mrtune',
    name: 'MRTune',
    tagline: 'Ad-free offline and online music streaming with synced lyrics',
    category: 'Audio Engine',
    color: 'from-emerald-400 to-teal-600',
    icon: 'fa-solid fa-music',
    badge: 'Trending',
    features: [
      'High-resolution FLAC and 320kbps audio output',
      'Live synchronized Apple Music-style lyrics view',
      'Zero audio ads, seamless background player',
      'Local caching and offline playlist downloads'
    ]
  },
  {
    id: 'mrios-launcher',
    name: 'MRiOS Launcher',
    tagline: 'Full iOS experience on Android with Dynamic Island & Control Center',
    category: 'System Launcher',
    color: 'from-violet-500 to-indigo-600',
    icon: 'fa-solid fa-mobile-screen-button',
    badge: 'Smooth',
    features: [
      'Interactive Dynamic Island with live music and charging status',
      'iOS 18 Control Center gestures and widgets',
      'Ultra-smooth 120Hz physics animations',
      'Hidden apps, lockscreen blur, custom icon packs'
    ]
  },
  {
    id: 'mrimods-launcher',
    name: 'MRiMods Launcher',
    tagline: 'All-in-one verified launcher and direct updater for Rakshittips tools',
    category: 'Utility Hub',
    color: 'from-amber-400 to-orange-500',
    icon: 'fa-solid fa-cubes',
    badge: 'Essential',
    features: [
      'One-click direct updates for all installed mods',
      'Safety verified APK signatures and zero bloatware',
      'Dark glass aesthetic matching Rakshittips ecosystem',
      'Direct changelog viewer and instant rollback'
    ]
  },
  {
    id: 'open-source-utils',
    name: 'Open Source & Utilities',
    tagline: 'GitHub repositories, APK decoders, themes, and shell scripts',
    category: 'Developer Tools',
    color: 'from-cyan-400 to-blue-500',
    icon: 'fa-solid fa-code',
    badge: 'Open Source',
    features: [
      'Public GitHub tools, script automations and configs',
      'Transparent code with no trackers or background telemetry',
      'Community requested features and active maintenance',
      'Free for everyone, forever'
    ]
  }
];
