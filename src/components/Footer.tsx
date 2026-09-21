import React from 'react';

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenHelp?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenHelp }) => {
  return (
    <footer className="w-full bg-surface-container-low mt-auto py-space-lg border-t border-surface-container">
      <div className="max-w-[1200px] mx-auto px-margin flex flex-col md:flex-row items-center justify-between gap-space-md text-center md:text-left">
        
        {/* Safe Space Branding */}
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center justify-center md:justify-start gap-space-xs">
            <span className="font-headline-sm text-headline-sm text-primary font-extrabold">Moodify</span>
            <span className="text-label-sm font-label-sm bg-primary-fixed text-on-primary-fixed-variant px-space-sm py-0.5 rounded-full font-bold">
              SMP Safe Space
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
            Ruang tenang buat berbagi rasa, mendengarkan melodi yang ngertiin kamu, dan menemukan ketenangan setiap hari.
          </p>
        </div>

        {/* Reminder Hari Ini Card */}
        <div className="bg-surface-container px-space-md py-space-sm rounded-lg shadow-[0_4px_16px_rgba(255,107,139,0.06)] flex items-center gap-space-sm max-w-sm text-left border border-surface-container-high">
          <span className="material-symbols-outlined text-tertiary-container text-2xl shrink-0">favorite</span>
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-tertiary uppercase font-bold tracking-wide">
              Reminder Hari Ini
            </span>
            <span className="font-body-sm text-body-sm text-on-surface font-medium">
              "Semua perasaanmu itu valid. Tarik napas, putar lagu favoritmu, kamu hebat!"
            </span>
          </div>
        </div>

        {/* Copyright & Quick Links */}
        <div className="flex flex-col md:items-end gap-space-xs">
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            &copy; 2024 Moodify Indonesia. Sahabat Terbaikmu.
          </span>
          <div className="flex items-center gap-space-md justify-center md:justify-end">
            <button
              onClick={onOpenPrivacy}
              className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
            >
              Privasi Pelajar
            </button>
            <span className="text-outline-variant font-label-sm">•</span>
            <button
              onClick={onOpenHelp}
              className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
            >
              Bantuan Curhat
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
