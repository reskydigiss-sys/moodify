import React, { useState, useEffect } from 'react';
import { TabType, ThemeType, Song, CommunityPost } from './types';
import { INITIAL_SONGS, INITIAL_COMMUNITY_POSTS } from './data/mockData';
import { soundEngine } from './services/soundEngine';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MusicPlayerDock } from './components/MusicPlayerDock';
import { CurhatRoomView } from './components/CurhatRoomView';
import { PlaylistSayaView } from './components/PlaylistSayaView';
import { RadarMoodView } from './components/RadarMoodView';
import { KomunitasTemanView } from './components/KomunitasTemanView';
import { BreathingGuideModal } from './components/BreathingGuideModal';
import { HotlineModal } from './components/HotlineModal';
import { QueueModal } from './components/QueueModal';
import { NewCurhatModal } from './components/NewCurhatModal';
import { UserProfileModal } from './components/UserProfileModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('curhat-room');
  const [theme, setTheme] = useState<ThemeType>('pink');
  const [currentSong, setCurrentSong] = useState<Song>(INITIAL_SONGS[4]); // Here Comes The Sun default
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);

  // Modals
  const [isBreathingOpen, setIsBreathingOpen] = useState(false);
  const [isHotlineOpen, setIsHotlineOpen] = useState(false);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isNewCurhatOpen, setIsNewCurhatOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Sync with audio engine
  useEffect(() => {
    const unsubscribe = soundEngine.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsubscribe();
  }, []);

  const handleTogglePlay = () => {
    soundEngine.toggle();
  };

  const handleSelectSong = (song: Song) => {
    setCurrentSong(song);
    soundEngine.play();
  };

  const handleNextSong = () => {
    const currentIndex = INITIAL_SONGS.findIndex((s) => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % INITIAL_SONGS.length;
    setCurrentSong(INITIAL_SONGS[nextIndex]);
    if (!isPlaying) soundEngine.play();
  };

  const handlePrevSong = () => {
    const currentIndex = INITIAL_SONGS.findIndex((s) => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + INITIAL_SONGS.length) % INITIAL_SONGS.length;
    setCurrentSong(INITIAL_SONGS[prevIndex]);
    if (!isPlaying) soundEngine.play();
  };

  const handleNavigateToCurhat = () => {
    setActiveTab('curhat-room');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Theme wrapper styling class
  const themeClass = theme === 'pink' ? 'theme-pink' : 'theme-blue';

  return (
    <div className={`min-h-screen flex flex-col bg-surface text-on-surface antialiased selection:bg-primary-container selection:text-on-primary ${themeClass}`}>
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        setTheme={setTheme}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-margin pt-24 md:pt-28 pb-10">
        {activeTab === 'curhat-room' && (
          <CurhatRoomView
            theme={theme}
            setTheme={setTheme}
            currentSong={currentSong}
            isPlaying={isPlaying}
            onSelectSong={handleSelectSong}
            onTogglePlay={handleTogglePlay}
            onOpenBreathing={() => setIsBreathingOpen(true)}
            onOpenHotline={() => setIsHotlineOpen(true)}
          />
        )}

        {activeTab === 'playlist-saya' && (
          <PlaylistSayaView
            currentSong={currentSong}
            isPlaying={isPlaying}
            onSelectSong={handleSelectSong}
            onTogglePlay={handleTogglePlay}
            onNavigateToCurhat={handleNavigateToCurhat}
          />
        )}

        {activeTab === 'radar-mood' && (
          <RadarMoodView
            currentSong={currentSong}
            isPlaying={isPlaying}
            onSelectSong={handleSelectSong}
            onTogglePlay={handleTogglePlay}
            onNavigateToCurhat={handleNavigateToCurhat}
            onOpenBreathing={() => setIsBreathingOpen(true)}
          />
        )}

        {activeTab === 'komunitas-teman' && (
          <KomunitasTemanView
            currentSong={currentSong}
            isPlaying={isPlaying}
            onSelectSong={handleSelectSong}
            onTogglePlay={handleTogglePlay}
            onOpenNewCurhatModal={() => setIsNewCurhatOpen(true)}
            onOpenHotline={() => setIsHotlineOpen(true)}
            posts={communityPosts}
            setPosts={setCommunityPosts}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setIsHotlineOpen(true)}
        onOpenHelp={() => setIsHotlineOpen(true)}
      />

      {/* Sticky Bottom Safe Vibes Music Player Dock */}
      <MusicPlayerDock
        currentSong={currentSong}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onNextSong={handleNextSong}
        onPrevSong={handlePrevSong}
        queueCount={INITIAL_SONGS.length}
        onOpenQueue={() => setIsQueueOpen(true)}
      />

      {/* Modals */}
      <BreathingGuideModal
        isOpen={isBreathingOpen}
        onClose={() => setIsBreathingOpen(false)}
      />

      <HotlineModal
        isOpen={isHotlineOpen}
        onClose={() => setIsHotlineOpen(false)}
      />

      <QueueModal
        isOpen={isQueueOpen}
        onClose={() => setIsQueueOpen(false)}
        songs={INITIAL_SONGS}
        currentSong={currentSong}
        onSelectSong={handleSelectSong}
      />

      <NewCurhatModal
        isOpen={isNewCurhatOpen}
        onClose={() => setIsNewCurhatOpen(false)}
        onAddPost={(newPost) => setCommunityPosts((prev) => [newPost, ...prev])}
      />

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        theme={theme}
        setTheme={setTheme}
      />

    </div>
  );
}
