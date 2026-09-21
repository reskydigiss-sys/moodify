import React from 'react';

interface HotlineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HotlineModal: React.FC<HotlineModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-surface rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-surface-container relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-2xl">support_agent</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
              Hotline Teman Sebaya &amp; Konseling
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Ruang Aman &amp; Rahasia untuk Siswa SMP Indonesia
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="p-3.5 bg-surface-container-low rounded-xl border border-surface-container">
            <div className="flex items-center justify-between mb-1">
              <span className="font-label-md text-label-md text-primary font-bold">1. Konselor Sebaya Moodify</span>
              <span className="text-xs bg-secondary-container/30 text-secondary font-bold px-2 py-0.5 rounded-full">
                Tersedia 24 Jam
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Kakak mahasiswa psikologi &amp; relawan terlatih yang siap mendengar tanpa menghakimi atau menceritakan ke siapa pun.
            </p>
          </div>

          <div className="p-3.5 bg-surface-container-low rounded-xl border border-surface-container">
            <div className="flex items-center justify-between mb-1">
              <span className="font-label-md text-label-md text-secondary font-bold">2. Layanan Sejiwa (KemenPPPA)</span>
              <span className="text-xs bg-surface-container font-mono px-2 py-0.5 rounded-full">
                Hotline 119 ext 8
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Layanan konsultasi psikologi resmi pemerintah untuk anak dan remaja secara gratis.
            </p>
          </div>

          <div className="p-3.5 bg-surface-container-low rounded-xl border border-surface-container">
            <div className="flex items-center justify-between mb-1">
              <span className="font-label-md text-label-md text-tertiary font-bold">3. Janji Privasi 100% Anonim</span>
              <span className="material-symbols-outlined text-tertiary text-sm">lock</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Identitas nama asli, sekolah, dan isi curhatanmu tidak akan pernah dipublikasikan tanpa izinmu.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-primary text-on-primary rounded-xl font-bold font-label-lg shadow hover:bg-primary-container transition-colors"
        >
          Terima Kasih, Aku Mengerti
        </button>
      </div>
    </div>
  );
};
