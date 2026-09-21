export type TabType = 'curhat-room' | 'playlist-saya' | 'radar-mood' | 'komunitas-teman';

export type ThemeType = 'pink' | 'blue';

export interface Song {
  id: string;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  coverUrl: string;
  reason?: string;
  badge?: string;
  hugs?: number;
}

export interface CurhatMessage {
  id: string;
  sender: 'user' | 'bot';
  senderName: string;
  time: string;
  text: string;
  isAudio?: boolean;
  tags?: string[];
  songs?: Song[];
}

export interface CommunityComment {
  id: string;
  author: string;
  timeAgo: string;
  text: string;
  icon?: string;
  isPeerHelper?: boolean;
}

export interface CommunityPost {
  id: string;
  room: 'pink' | 'blue';
  author: string;
  grade: string;
  city: string;
  timeAgo: string;
  avatarIcon: string;
  avatarBg: string;
  content: string;
  attachedSong?: {
    title: string;
    artist: string;
    subtext: string;
  };
  hugsCount: number;
  hasUserHugged?: boolean;
  comments: CommunityComment[];
}

export interface HopeNote {
  id: string;
  text: string;
  source: string;
  time: string;
  tag: string;
  tagColor: string;
  emoji: string;
  rotation: string;
  bgColor: string;
  textColor: string;
  stickers?: string[];
}

export interface MoodDayData {
  dayShort: string;
  dayFull: string;
  label: string;
  emoji: string;
  val: number; // 0 - 100
  isToday?: boolean;
  isPeak?: boolean;
}
