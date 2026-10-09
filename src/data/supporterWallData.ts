export interface SupporterEntry {
  id: string;
  name: string;
  amount: number;
  project: string;
  message: string;
  date: string;
  badge: 'Diamond' | 'Gold' | 'Silver' | 'Bronze';
  verified: boolean;
}

export const INITIAL_SUPPORTERS: SupporterEntry[] = [
  {
    id: 'sup-1',
    name: 'Aman Sharma',
    amount: 799,
    project: 'instaGram Pro',
    message: 'Bro the iOS emojis on Android changed my entire Instagram experience! Keep up the brilliant work!',
    date: 'Today',
    badge: 'Diamond',
    verified: true
  },
  {
    id: 'sup-2',
    name: 'Rahul Verma',
    amount: 299,
    project: 'MRGram iPhone!',
    message: 'MRGram is super smooth and blurs look insane. Respect for doing all this solo with 0 ads!',
    date: 'Yesterday',
    badge: 'Gold',
    verified: true
  },
  {
    id: 'sup-3',
    name: 'Vikram Rajput',
    amount: 99,
    project: 'MRTune',
    message: 'No ads music and synced lyrics is all I ever wanted. Best developer!',
    date: '2 days ago',
    badge: 'Silver',
    verified: true
  },
  {
    id: 'sup-4',
    name: 'Sneha Patel',
    amount: 500,
    project: 'MRiOS Launcher',
    message: 'Dynamic island animations are so fluid on my OnePlus. Rakshit bhai OP!',
    date: '3 days ago',
    badge: 'Gold',
    verified: true
  },
  {
    id: 'sup-5',
    name: 'Devansh K.',
    amount: 299,
    project: 'MRiMods Launcher',
    message: 'One click updates make life so much easier. Always supporting you!',
    date: '4 days ago',
    badge: 'Gold',
    verified: true
  }
];
