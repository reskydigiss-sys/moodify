import React from 'react';
import { ThemeType } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  theme,
  setTheme,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-surface rounded-2xl max-w-md w-full p-6 shadow-2xl border border-surface-container relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Profile Card Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-3">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-white shadow-lg text-3xl">
              🌸
            </div>
            <span className="absolute bottom-0 right-1 w-4 h-4 bg-secondary-container rounded-full ring-2 ring-surface" />
          </div>

          <h3 className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
            BintangSenja_8B
          </h3>
          <span className="text-xs bg-primary-fixed text-on-primary-fixed-variant px-3 py-0.5 rounded-full font-bold mt-1">
            Siswa SMP Kelas 8 • Bandung
          </span>
          <p className="text-xs text-on-surface-variant mt-2 max-w-xs">
            "Sedang belajar berani bicara dan tidak overthinking tugas kelompok."
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 p-3 bg-surface-container-low rounded-xl border border-surface-container text-center mb-5">
          <div>
            <span className="text-lg font-extrabold text-primary block">12</span>
            <span className="text-[10px] text-on-surface-variant font-semibold">Curhat Dibuat</span>
          </div>
          <div className="border-x border-surface-container">
            <span className="text-lg font-extrabold text-secondary block">34</span>
            <span className="text-[10px] text-on-surface-variant font-semibold">Lagu Disimpan</span>
          </div>
          <div>
            <span className="text-lg font-extrabold text-tertiary block">89</span>
            <span className="text-[10px] text-on-surface-variant font-semibold">Pelukan Diterima</span>
          </div>
        </div>

        {/* Settings & Privacy Preferences */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between p-2.5 bg-surface-container-lowest rounded-xl border border-surface-container">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px]">palette</span>
              <span className="text-xs font-bold text-on-surface">Pilihan Warna Tema</span>
            </div>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setTheme('pink')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  theme === 'pink' ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container text-on-surface-variant'
                }`}
              >
                🌸 Pink
              </button>
              <button
                type="button"
                onClick={() => setTheme('blue')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  theme === 'blue' ? 'bg-secondary text-on-secondary shadow-sm' : 'bg-surface-container text-on-surface-variant'
                }`}
              >
                🌊 Blue
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-surface-container-lowest rounded-xl border border-surface-container">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">lock</span>
              <span className="text-xs font-bold text-on-surface">Mode Anonim Maksimal</span>
            </div>
            <span className="text-[11px] text-primary font-bold bg-primary-fixed px-2 py-0.5 rounded-full">
              Aktif (Aman)
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-primary text-on-primary rounded-xl font-bold font-label-md shadow hover:bg-primary-container transition-colors"
        >
          Tutup Profil
        </button>
      </div>
    </div>
  );
};
