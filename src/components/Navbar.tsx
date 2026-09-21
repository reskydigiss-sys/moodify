import React from 'react';
import { TabType, ThemeType } from '../types';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  onOpenProfile?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  theme,
  setTheme,
  onOpenProfile,
}) => {
  const logoUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuCKYPSz3PvHAeNq5dAdAYJHzp6eyXN5-PWIx__GPfThiyaScJIVyORXI6v6QUx5JYFjaUURfLCzlez_Jf1BINT2A10QCmUXlesHFPq4jjiZXx7bJbajgwKAvzCccoA9TodiYs0S0b6jl55zNkb66IEaD0Y-Xh6jkgkZrNDAFf0G1CsrcQpNeIncMuX0aAHCBNau00dLE_2oxtzM5HBP_33I5Qi6hjq1wrvPHzfMKUMWoGowYiuYhw39Jg";

  const navItems: { id: TabType; label: string }[] = [
    { id: 'curhat-room', label: 'Curhat Room' },
    { id: 'playlist-saya', label: 'Playlist Saya' },
    { id: 'radar-mood', label: 'Radar Mood' },
    { id: 'komunitas-teman', label: 'Komunitas Teman' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_4px_20px_rgba(43,45,66,0.04)] border-b border-surface-container/50">
      <div className="h-20 max-w-[1200px] mx-auto px-margin flex items-center justify-between gap-space-md">
        
        {/* Brand Logo & Tag */}
        <div className="flex items-center gap-space-md">
          <button 
            onClick={() => setActiveTab('curhat-room')}
            className="flex items-center gap-space-sm group text-left focus:outline-none"
          >
            <img
              alt="Moodify Logo"
              className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
              src={logoUrl}
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-extrabold leading-none">
                Moodify
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant hidden sm:inline font-medium">
                Teman Cerita &amp; Musik
              </span>
            </div>
          </button>

          {/* Live Online Badge */}
          <div className="hidden lg:flex items-center gap-space-xs bg-surface-container-low px-space-sm py-space-xs rounded-full shadow-[0_2px_8px_rgba(255,107,139,0.06)] border border-surface-container">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary-container animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-secondary font-semibold">
              Online &amp; Siap Mendengarkan
            </span>
          </div>
        </div>

        {/* Center Desktop Navigation Pill Tabs */}
        <nav className="hidden md:flex items-center gap-space-xs bg-surface-container-low/70 p-1.5 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-surface-container/80">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-space-md py-space-xs rounded-full font-label-lg text-label-lg transition-all ${
                  isActive
                    ? 'bg-primary-container text-on-primary font-bold shadow-sm rounded-full scale-[1.02]'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Side Theme Switcher & Profile Avatar */}
        <div className="flex items-center gap-space-sm">
          {/* Theme Switcher */}
          <div className="flex items-center bg-surface-container p-1 rounded-full shadow-inner border border-surface-container-high">
            <button
              onClick={() => setTheme('pink')}
              className={`px-space-sm py-space-xs rounded-full font-label-sm text-label-sm transition-all ${
                theme === 'pink'
                  ? 'bg-primary-container text-on-primary font-bold shadow-[0_2px_6px_rgba(255,107,139,0.25)]'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              title="Tema Pink Pastel"
              type="button"
            >
              🌸 Pink Pastel
            </button>
            <button
              onClick={() => setTheme('blue')}
              className={`px-space-sm py-space-xs rounded-full font-label-sm text-label-sm transition-all ${
                theme === 'blue'
                  ? 'bg-secondary-container text-on-secondary font-bold shadow-[0_2px_6px_rgba(54,181,253,0.25)]'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              title="Tema Cool Blue"
              type="button"
            >
              🌊 Cool Blue
            </button>
          </div>

          {/* Profile Button */}
          <button
            onClick={onOpenProfile}
            aria-label="Profil Siswa Remaja"
            className="group relative focus:outline-none hover:scale-105 transition-transform"
            type="button"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-secondary-container ring-2 ring-surface"></span>
          </button>
        </div>
      </div>

      {/* Mobile Quick Navigation Bar */}
      <div className="md:hidden flex items-center justify-around px-2 py-1.5 bg-surface-container-low border-t border-surface-container overflow-x-auto scrollbar-none">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-primary-container text-on-primary font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
