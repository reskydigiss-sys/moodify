import React from 'react';
import { Song } from '../types';

interface QueueModalProps {
  isOpen: boolean;
  onClose: () => void;
  songs: Song[];
  currentSong: Song;
  onSelectSong: (song: Song) => void;
}

export const QueueModal: React.FC<QueueModalProps> = ({
  isOpen,
  onClose,
  songs,
  currentSong,
  onSelectSong,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-surface rounded-2xl max-w-md w-full p-5 shadow-2xl border border-surface-container relative animate-in fade-in zoom-in-95 duration-200 max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">queue_music</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Daftar Putar &amp; Antrean
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="overflow-y-auto my-3 space-y-2 pr-1 scrollbar-none">
          {songs.map((song, idx) => {
            const isCurrent = song.id === currentSong.id;
            return (
              <div
                key={song.id}
                onClick={() => onSelectSong(song)}
                className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                  isCurrent
                    ? 'bg-secondary-fixed text-on-secondary-fixed font-semibold'
                    : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-mono w-4 text-center opacity-60">
                    {idx + 1}
                  </span>
                  <img
                    src={song.coverUrl}
                    alt={song.title}
                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0 shadow-sm"
                  />
                  <div className="min-w-0">
                    <p className="font-label-md text-label-md truncate">{song.title}</p>
                    <p className="font-body-sm text-body-sm opacity-75 truncate">{song.artist}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <span className="text-xs opacity-75">{song.duration}</span>
                  {isCurrent && (
                    <span className="material-symbols-outlined text-secondary text-[18px] animate-pulse">
                      equalizer
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-secondary text-on-secondary rounded-xl font-bold font-label-md shadow hover:bg-secondary/90 transition-colors mt-auto"
        >
          Tutup Antrean
        </button>
      </div>
    </div>
  );
};
