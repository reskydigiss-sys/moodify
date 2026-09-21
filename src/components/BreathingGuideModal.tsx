import React, { useState, useEffect } from 'react';

interface BreathingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Phase = 'inhale' | 'hold' | 'exhale';

export const BreathingGuideModal: React.FC<BreathingGuideModalProps> = ({ isOpen, onClose }) => {
  const [phase, setPhase] = useState<Phase>('inhale');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setPhase('inhale');
      setSecondsLeft(4);
      setCyclesCompleted(0);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (phase === 'inhale') {
            setPhase('hold');
            return 7;
          } else if (phase === 'hold') {
            setPhase('exhale');
            return 8;
          } else {
            setPhase('inhale');
            setCyclesCompleted((c) => c + 1);
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, phase]);

  if (!isOpen) return null;

  const phaseConfig = {
    inhale: {
      text: 'Tarik Napas Perlahan...',
      subtext: 'Rasakan udara sejuk mengisi rongga dadamu',
      color: 'bg-primary-container',
      textColor: 'text-on-primary',
      scaleClass: 'scale-125',
    },
    hold: {
      text: 'Tahan Napasmu...',
      subtext: 'Beri jeda sejenak, tubuhmu aman di sini',
      color: 'bg-secondary-container',
      textColor: 'text-on-secondary',
      scaleClass: 'scale-125 shadow-2xl',
    },
    exhale: {
      text: 'Hembuskan Perlahan...',
      subtext: 'Keluarkan semua beban dan kepenatan hari ini',
      color: 'bg-primary-fixed',
      textColor: 'text-on-primary-fixed-variant',
      scaleClass: 'scale-90',
    },
  }[phase];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-surface rounded-2xl max-w-md w-full p-6 shadow-2xl border border-surface-container relative flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Title */}
        <div className="inline-flex items-center gap-2 bg-primary-fixed px-3 py-1 rounded-full text-xs font-bold text-on-primary-fixed-variant mb-2">
          <span className="material-symbols-outlined text-[16px]">self_improvement</span>
          <span>Latihan Relaksasi 4-7-8</span>
        </div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">
          Ketenangan Dalam Satu Napas
        </h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-8 max-w-xs">
          Teknik ilmiah untuk menurunkan detak jantung dan meredakan overthinking tugas sekolah.
        </p>

        {/* Dynamic Breathing Bubble */}
        <div className="relative w-48 h-48 flex items-center justify-center mb-8">
          <div
            className={`w-40 h-40 rounded-full ${phaseConfig.color} flex flex-col items-center justify-center shadow-lg transition-all duration-1000 ${phaseConfig.scaleClass}`}
          >
            <span className="text-4xl font-extrabold tracking-tight mb-1">
              {secondsLeft}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider">
              {phase === 'inhale' ? 'Tarik (4s)' : phase === 'hold' ? 'Tahan (7s)' : 'Buang (8s)'}
            </span>
          </div>

          {/* Pulse wave ring */}
          <div className="absolute inset-0 rounded-full border-2 border-primary-container/30 animate-ping pointer-events-none" />
        </div>

        <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1 transition-all">
          {phaseConfig.text}
        </h4>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
          {phaseConfig.subtext}
        </p>

        <div className="flex items-center justify-between w-full pt-4 border-t border-surface-container text-xs text-on-surface-variant">
          <span>Siklus Selesai: <strong>{cyclesCompleted}x</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-on-primary rounded-full font-bold text-xs shadow hover:bg-primary-container transition-all"
          >
            Aku Sudah Lebih Tenang ✨
          </button>
        </div>
      </div>
    </div>
  );
};
