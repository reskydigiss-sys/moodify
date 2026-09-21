import React, { useState, useEffect } from 'react';
import { Song } from '../types';
import { soundEngine } from '../services/soundEngine';

interface MusicPlayerDockProps {
  currentSong: Song;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextSong?: () => void;
  onPrevSong?: () => void;
  queueCount?: number;
  onOpenQueue?: () => void;
}

export const MusicPlayerDock: React.FC<MusicPlayerDockProps> = ({
  currentSong,
  isPlaying,
  onTogglePlay,
  onNextSong,
  onPrevSong,
  queueCount = 8,
  onOpenQueue,
}) => {
  const [isFav, setIsFav] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(84); // 01:24
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  // Parse duration string e.g. "03:42" -> total seconds
  const parseDuration = (dur: string) => {
    const parts = dur.split(':');
    if (parts.length === 2) {
      return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    }
    return 222;
  };
  const totalSec = parseDuration(currentSong.duration);

  // Format seconds to mm:ss
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval: number | null = null;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setCurrentTimeSec((prev) => {
          if (prev >= totalSec) {
            return isRepeat ? 0 : prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, totalSec, isRepeat]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setVolume(val);
    setIsMuted(val === 0);
    soundEngine.setVolume(val / 100);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    setCurrentTimeSec(Math.floor(ratio * totalSec));
  };

  return (
    <aside className="fixed bottom-3 left-1/2 transform -translate-x-1/2 w-[95%] max-w-[1100px] z-40 bg-secondary/90 backdrop-blur-xl rounded-xl shadow-2xl p-space-sm md:px-space-lg md:py-space-sm text-on-secondary border border-white/10 transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-xs md:gap-space-md">
        
        {/* Track Metadata (Left) */}
        <div className="flex items-center gap-space-sm min-w-0 flex-1">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-on-secondary-container shadow-md group">
            <img
              alt={currentSong.title}
              className={`w-full h-full object-cover transition-transform duration-500 ${isPlaying ? 'scale-105' : ''}`}
              src={currentSong.coverUrl}
            />
            <span className={`absolute -top-1 -right-1 w-3 h-3 bg-secondary-container rounded-full ring-2 ring-secondary ${isPlaying ? 'animate-pulse' : ''}`} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-space-xs">
              <h5 className="font-label-lg text-label-lg text-on-secondary truncate font-bold">
                {currentSong.title}
              </h5>
              <span className="hidden sm:inline-block bg-secondary-container/40 text-secondary-fixed text-label-sm font-label-sm px-1.5 py-0.2 rounded font-semibold">
                {currentSong.genre.split(' ')[0]}
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-secondary-fixed truncate">
              {currentSong.artist} • {isPlaying ? 'Sedang Dimainkan' : 'Dijeda'}
            </p>
          </div>
        </div>

        {/* Center Controls & Interactive Waveform Scrubber */}
        <div className="flex flex-col items-center gap-1 flex-1 max-w-md w-full">
          {/* Controls row */}
          <div className="flex items-center gap-space-md">
            <button
              onClick={() => setIsShuffle(!isShuffle)}
              className={`transition-colors focus:outline-none ${isShuffle ? 'text-secondary-container' : 'text-secondary-fixed hover:text-on-secondary'}`}
              title="Acak Lagu"
            >
              <span className="material-symbols-outlined text-[20px]">shuffle</span>
            </button>

            <button
              onClick={onPrevSong}
              className="text-secondary-fixed hover:text-on-secondary transition-colors focus:outline-none"
              title="Sebelumnya"
            >
              <span className="material-symbols-outlined text-[24px]">skip_previous</span>
            </button>

            <button
              onClick={onTogglePlay}
              className="w-10 h-10 rounded-full bg-secondary-container hover:bg-secondary-fixed-dim text-on-secondary shadow-md flex items-center justify-center transition-transform active:scale-90 focus:outline-none"
              title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
            >
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>

            <button
              onClick={onNextSong}
              className="text-secondary-fixed hover:text-on-secondary transition-colors focus:outline-none"
              title="Berikutnya"
            >
              <span className="material-symbols-outlined text-[24px]">skip_next</span>
            </button>

            <button
              onClick={() => setIsRepeat(!isRepeat)}
              className={`transition-colors focus:outline-none ${isRepeat ? 'text-secondary-container' : 'text-secondary-fixed hover:text-on-secondary'}`}
              title="Ulangi Lagu"
            >
              <span className="material-symbols-outlined text-[20px]">repeat</span>
            </button>
          </div>

          {/* Scrubber & Waveform visualizer */}
          <div className="w-full flex items-center gap-space-xs">
            <span className="text-label-sm font-label-sm text-secondary-fixed min-w-[34px] text-right font-mono">
              {formatTime(currentTimeSec)}
            </span>

            {/* Simulated Animated Waveform Bars */}
            <div
              onClick={handleSeek}
              className="flex-1 h-6 flex items-center justify-center gap-[2px] cursor-pointer group"
              title="Klik untuk melompati durasi"
            >
              {[
                { h: 3, pulse: true },
                { h: 5, pulse: false },
                { h: 2, pulse: false },
                { h: 6, pulse: true },
                { h: 4, pulse: false },
                { h: 5, pulse: true },
                { h: 2, pulse: false },
                { h: 6, pulse: false },
                { h: 3, pulse: true },
                { h: 5, pulse: true },
                { h: 6, pulse: false },
                { h: 4, pulse: false },
                { h: 2, pulse: true },
                { h: 4, pulse: false },
                { h: 5, pulse: true },
                { h: 2, pulse: false },
                { h: 6, pulse: false },
                { h: 3, pulse: true },
                { h: 2, pulse: false },
                { h: 4, pulse: false },
              ].map((bar, i) => {
                const progressRatio = (i / 20);
                const currentRatio = currentTimeSec / totalSec;
                const isPassed = progressRatio <= currentRatio;
                return (
                  <span
                    key={i}
                    style={{ height: `${bar.h * 3.5}px` }}
                    className={`w-1 rounded-full transition-all duration-200 ${
                      isPassed
                        ? 'bg-secondary-container'
                        : 'bg-secondary-fixed/50'
                    } ${isPlaying && bar.pulse ? 'animate-pulse' : ''}`}
                  />
                );
              })}
            </div>

            <span className="text-label-sm font-label-sm text-secondary-fixed min-w-[34px] font-mono">
              {currentSong.duration}
            </span>
          </div>
        </div>

        {/* Right Utility Actions */}
        <div className="hidden sm:flex items-center gap-space-sm justify-end flex-1">
          {/* Favorite heart */}
          <button
            onClick={() => setIsFav(!isFav)}
            className="p-1.5 rounded-full hover:bg-on-secondary-container/40 text-secondary-fixed hover:text-on-secondary transition-colors focus:outline-none"
            title="Sukai Lagu Ini"
          >
            <span
              className={`material-symbols-outlined text-[20px] transition-transform active:scale-125 ${
                isFav ? 'text-primary-container' : ''
              }`}
              style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
            >
              favorite
            </span>
          </button>

          {/* Volume slider */}
          <div className="flex items-center gap-1 group relative">
            <button
              onClick={() => {
                const nextMute = !isMuted;
                setIsMuted(nextMute);
                soundEngine.setVolume(nextMute ? 0 : volume / 100);
              }}
              className="p-1.5 rounded-full hover:bg-on-secondary-container/40 text-secondary-fixed hover:text-on-secondary transition-colors focus:outline-none"
              title="Pengaturan Audio & Suara Hujan"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isMuted || volume === 0 ? 'volume_off' : volume < 50 ? 'volume_down' : 'volume_up'}
              </span>
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-secondary-fixed-dim/40 rounded-full appearance-none accent-secondary-container cursor-pointer"
              title={`Volume: ${isMuted ? 0 : volume}%`}
            />
          </div>

          {/* Queue button */}
          <button
            onClick={onOpenQueue}
            className="bg-secondary-container/30 hover:bg-secondary-container text-on-secondary text-label-sm font-label-sm px-space-sm py-1 rounded-full flex items-center gap-1 transition-all focus:outline-none"
          >
            <span className="material-symbols-outlined text-[16px]">queue_music</span>
            <span>Antrean ({queueCount})</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
