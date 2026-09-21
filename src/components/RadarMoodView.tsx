import React, { useState } from 'react';
import { Song, HopeNote, MoodDayData } from '../types';
import { INITIAL_SONGS, WEEKLY_MOOD_DATA, INITIAL_HOPE_NOTES } from '../data/mockData';

interface RadarMoodViewProps {
  currentSong: Song;
  isPlaying: boolean;
  onSelectSong: (song: Song) => void;
  onTogglePlay: () => void;
  onNavigateToCurhat: (prefillNote?: string) => void;
  onOpenBreathing: () => void;
}

export const RadarMoodView: React.FC<RadarMoodViewProps> = ({
  currentSong,
  isPlaying,
  onSelectSong,
  onTogglePlay,
  onNavigateToCurhat,
  onOpenBreathing,
}) => {
  const [selectedMood, setSelectedMood] = useState('🌧️ Galau Berat');
  const [moodIntensity, setMoodIntensity] = useState(75);
  const [diaryNote, setDiaryNote] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [chartPeriod, setChartPeriod] = useState<'week' | 'month'>('week');
  
  // Hope notes state
  const [hopeNotes, setHopeNotes] = useState<HopeNote[]>(INITIAL_HOPE_NOTES);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [selectedSticker, setSelectedSticker] = useState('⭐');

  const moodPills = [
    { label: '🥳 Ceria Pol', sub: 'Lagi Happy' },
    { label: '🥺 Baper', sub: 'Kangen/Melow' },
    { label: '🌧️ Galau Berat', sub: 'Overthinking' },
    { label: '🎧 Chill Santai', sub: 'Tenang Aja' },
    { label: '😤 Kesel Banget', sub: 'Tugas Numpuk' },
  ];

  const therapySongs = [
    INITIAL_SONGS[8],  // Runtuh
    INITIAL_SONGS[9],  // Diri
    INITIAL_SONGS[10], // Evaluasi
    INITIAL_SONGS[11], // Secukupnya
  ];

  const stickers = ['🐱', '⭐', '🎧', '🍉', '🫂', '🎀', '🧸'];

  const handleSaveDiary = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddHopeNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const newNote: HopeNote = {
      id: `hope-${Date.now()}`,
      text: `“${newNoteText.trim()}”`,
      source: 'Catatan Harapanku',
      time: 'Baru saja',
      tag: '✨ Harapan Baru',
      tagColor: 'bg-surface-container-lowest',
      emoji: selectedSticker,
      rotation: `${(Math.random() * 2 - 1).toFixed(1)}deg`,
      bgColor: 'bg-primary-fixed/40',
      textColor: 'text-on-primary-container',
      stickers: [selectedSticker],
    };

    setHopeNotes((prev) => [newNote, ...prev]);
    setNewNoteText('');
    setIsAddingNote(false);
  };

  const handleAttachSticker = (noteId: string, sticker: string) => {
    setHopeNotes((prev) =>
      prev.map((n) => {
        if (n.id === noteId) {
          const current = n.stickers || [];
          return { ...n, stickers: [...current, sticker] };
        }
        return n;
      })
    );
  };

  return (
    <div className="w-full space-y-space-lg mb-28">
      
      {/* Top Header */}
      <section className="relative rounded-2xl bg-gradient-to-r from-primary-fixed/30 via-surface-container-low to-secondary-fixed/30 p-space-lg md:p-space-xl border border-surface-container-high shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
          <div>
            <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-bold mb-space-xs">
              <span className="material-symbols-outlined text-[16px]">insights</span>
              <span>Pelacak Emosi &amp; Diary Suara Remaja</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
              Radar Mood &amp; Diary Melodi
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1 leading-relaxed">
              Ruang aman buat catat jujur apa yang kamu rasain hari ini. Tanpa nilai, tanpa ekspektasi, cuma kamu dan hatimu. Moodify akan mencocokkan frekuensi musik agar harimu terasa lebih ringan.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigateToCurhat(`Aku mau curhat dengan mood "${selectedMood}" (${moodIntensity}%): ${diaryNote}`)}
            className="px-space-lg py-3 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-md hover:bg-primary-container transition-all shrink-0 flex items-center gap-1.5"
          >
            <span>Curhat dengan Mood Ini</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* Main Content Grid: Mood Logging & Graph (Left 7 cols) + Songs & Hope Notes (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-space-md">
          
          {/* Step 1: Mood Logging Card */}
          <div className="bg-surface-container-lowest p-space-md md:p-space-lg rounded-2xl border border-surface-container shadow-sm space-y-space-md">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Langkah 1: Catat Perasaan
              </span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
                Gimana Rasa Hatimu Hari Ini?
              </h2>
            </div>

            {/* 5 Mood Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-xs">
              {moodPills.map((m) => {
                const isSel = selectedMood === m.label;
                return (
                  <button
                    key={m.label}
                    type="button"
                    onClick={() => setSelectedMood(m.label)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSel
                        ? 'bg-primary text-on-primary border-primary shadow-md scale-[1.02]'
                        : 'bg-surface-container-low hover:bg-surface-container border-surface-container text-on-surface'
                    }`}
                  >
                    <span className="text-base font-bold block">{m.label}</span>
                    <span className={`text-xs block ${isSel ? 'text-white/80' : 'text-on-surface-variant'}`}>
                      {m.sub}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Emotion Intensity Slider */}
            <div className="space-y-1.5 pt-space-xs">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-on-surface">Intensitas Emosi Hari Ini:</span>
                <span className="text-primary bg-primary-fixed px-2.5 py-0.5 rounded-full font-mono">
                  {moodIntensity}% - {moodIntensity < 30 ? 'Ringan' : moodIntensity < 60 ? 'Sedang' : 'Dalam Banget 🌊'}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={moodIntensity}
                onChange={(e) => setMoodIntensity(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-surface-container rounded-full appearance-none accent-primary cursor-pointer"
              />
            </div>

            {/* Mini Diary Note Input */}
            <form onSubmit={handleSaveDiary} className="space-y-space-sm pt-space-xs border-t border-surface-container">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">
                  Catatan Harian Singkat (Hanya Bisa Dibaca Olehmu):
                </label>
                <textarea
                  rows={2}
                  value={diaryNote}
                  onChange={(e) => setDiaryNote(e.target.value)}
                  placeholder="Ada kejadian apa di sekolah hari ini? (Opsional)... Contoh: Tadi pas istirahat ngobrol seru bareng teman sebangku!"
                  className="w-full p-space-sm rounded-xl bg-surface-container-low border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary text-xs text-on-surface resize-none"
                />
              </div>

              <div className="flex items-center justify-between">
                {savedSuccess ? (
                  <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Diary berhasil disimpan ke radar pribadimu!
                  </span>
                ) : (
                  <span className="text-xs text-on-surface-variant">
                    Otomatis diperbarui ke grafik mingguan
                  </span>
                )}

                <button
                  type="submit"
                  className="px-space-md py-1.5 rounded-xl bg-secondary text-on-secondary text-xs font-bold shadow hover:bg-secondary/90 transition-all flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">bookmark_added</span>
                  <span>Simpan ke Diary</span>
                </button>
              </div>
            </form>
          </div>

          {/* Weekly Mood Chart Card */}
          <div className="bg-surface-container-lowest p-space-md md:p-space-lg rounded-2xl border border-surface-container shadow-sm space-y-space-md">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-secondary uppercase tracking-wider block mb-1">
                  Analisis Emosi
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
                  Grafik Fluktuasi Mood Mingguan
                </h3>
              </div>

              <div className="flex bg-surface-container p-1 rounded-full text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setChartPeriod('week')}
                  className={`px-3 py-1 rounded-full transition-all ${
                    chartPeriod === 'week' ? 'bg-secondary text-on-secondary shadow-sm' : 'text-on-surface-variant'
                  }`}
                >
                  7 Hari Terakhir
                </button>
                <button
                  type="button"
                  onClick={() => setChartPeriod('month')}
                  className={`px-3 py-1 rounded-full transition-all ${
                    chartPeriod === 'month' ? 'bg-secondary text-on-secondary shadow-sm' : 'text-on-surface-variant'
                  }`}
                >
                  Bulan Ini
                </button>
              </div>
            </div>

            {/* Visual SVG Wave Chart */}
            <div className="relative pt-4 pb-2 px-2 bg-surface-container-low rounded-xl border border-surface-container">
              <div className="h-44 w-full flex items-end justify-between gap-2 px-3">
                {WEEKLY_MOOD_DATA.map((item) => {
                  return (
                    <div key={item.dayShort} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                      {/* Tooltip / value */}
                      <span className="text-[10px] font-mono font-bold text-primary opacity-80 group-hover:opacity-100 transition-opacity">
                        {item.val}%
                      </span>

                      {/* Bar */}
                      <div className="w-full max-w-[36px] bg-surface-container rounded-t-lg relative flex items-end overflow-hidden h-28">
                        <div
                          style={{ height: `${item.val}%` }}
                          className={`w-full rounded-t-lg transition-all duration-700 ${
                            item.isToday
                              ? 'bg-primary-container ring-2 ring-primary'
                              : item.isPeak
                              ? 'bg-secondary-container'
                              : 'bg-primary/40'
                          }`}
                        />
                      </div>

                      {/* Day Label & Emoji */}
                      <div className="text-center pt-1">
                        <span className="text-base block leading-none">{item.emoji}</span>
                        <span className={`text-xs font-bold block ${item.isToday ? 'text-primary' : 'text-on-surface-variant'}`}>
                          {item.dayShort}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pattern Insights Box */}
            <div className="bg-surface-container-low p-3.5 rounded-xl border border-surface-container flex items-start gap-3">
              <span className="material-symbols-outlined text-tertiary-container text-2xl shrink-0">psychology</span>
              <div className="flex-1">
                <p className="font-label-md text-xs font-bold text-on-surface">
                  Catatan Moodify: Pola Emosi Kamu Cenderung Turun di Hari Kamis Sore
                </p>
                <p className="font-body-sm text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                  Kemungkinan karena kelelahan tugas tengah minggu. Yuk luangkan waktu 15 menit buat dengar musik instrumental santai sebelum belajar malam.
                </p>
                <button
                  type="button"
                  onClick={onOpenBreathing}
                  className="mt-2 text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>Buka Tips Rileks 4-7-8</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Therapy Songs & Hope Notes */}
        <div className="lg:col-span-5 space-y-space-md">
          
          {/* Dominant Mood & 4 Therapy Songs Card */}
          <div className="bg-surface-container-lowest p-space-md md:p-space-lg rounded-2xl border border-surface-container shadow-sm space-y-space-sm">
            <div className="p-3 bg-gradient-to-r from-primary-fixed to-secondary-fixed/50 rounded-xl">
              <span className="text-[11px] font-bold text-on-primary-fixed uppercase tracking-wider block">
                Ringkasan Emosimu
              </span>
              <h3 className="font-label-lg text-sm text-on-surface font-extrabold mt-0.5">
                Mood dominan minggu ini: Lagi Butuh Validasi &amp; Semangat! 🧸
              </h3>
            </div>

            <div className="flex items-center justify-between pt-1">
              <h4 className="font-headline-sm text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                4 Lagu Terapi Jiwa SMP Kamu
              </h4>
              <span className="text-[11px] text-primary font-bold">Putar Sekarang 🎧</span>
            </div>

            <div className="space-y-2">
              {therapySongs.map((song) => {
                const isCurrent = currentSong.id === song.id;
                return (
                  <div
                    key={song.id}
                    onClick={() => {
                      onSelectSong(song);
                      if (!isPlaying) onTogglePlay();
                    }}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isCurrent
                        ? 'bg-secondary-fixed/50 border-secondary shadow-sm'
                        : 'bg-surface-container-low hover:bg-surface-container border-surface-container'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={song.coverUrl}
                        alt={song.title}
                        className="w-11 h-11 rounded-lg object-cover shadow-sm shrink-0"
                      />
                      <div className="min-w-0">
                        {song.badge && (
                          <span className="text-[10px] font-bold text-secondary bg-secondary-fixed px-1.5 py-0.2 rounded inline-block">
                            {song.badge}
                          </span>
                        )}
                        <p className="font-label-md text-xs text-on-surface font-bold truncate">
                          {song.title}
                        </p>
                        <p className="font-body-sm text-[11px] text-on-surface-variant truncate">
                          {song.artist}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm hover:scale-105 transition-transform shrink-0 ml-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {isCurrent && isPlaying ? 'pause' : 'play_arrow'}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pojok Harapan Kamu (Sticky Notes) */}
          <div className="bg-surface-container-lowest p-space-md md:p-space-lg rounded-2xl border border-surface-container shadow-sm space-y-space-sm">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-tertiary uppercase tracking-wider block">
                  Penyemangat Diri
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
                  Pojok Harapan Kamu
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsAddingNote(!isAddingNote)}
                className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-xs font-bold hover:bg-tertiary-fixed-dim transition-all flex items-center gap-1 shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Tambah Note</span>
              </button>
            </div>

            {/* Sticker Tray */}
            <div className="flex items-center gap-1.5 p-2 bg-surface-container-low rounded-xl border border-surface-container overflow-x-auto scrollbar-none">
              <span className="text-[10px] font-bold text-on-surface-variant shrink-0">Stiker Lucu:</span>
              {stickers.map((stk) => (
                <button
                  key={stk}
                  type="button"
                  onClick={() => setSelectedSticker(stk)}
                  className={`text-sm p-1 rounded-lg hover:scale-125 transition-transform ${
                    selectedSticker === stk ? 'bg-primary-fixed ring-1 ring-primary' : ''
                  }`}
                  title={`Pilih stiker ${stk}`}
                >
                  {stk}
                </button>
              ))}
            </div>

            {/* Add note inline form */}
            {isAddingNote && (
              <form onSubmit={handleAddHopeNote} className="p-3 bg-surface-container-low rounded-xl border border-surface-container space-y-2 animate-in fade-in duration-200">
                <label className="block text-xs font-bold text-on-surface">Tulis Harapan / Apresiasi Diri:</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Misal: Aku bangga udah berani coba hal baru hari ini!"
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  className="w-full p-2 text-xs rounded-lg bg-surface-container-lowest border border-surface-container focus:outline-none text-on-surface resize-none"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingNote(false)}
                    className="px-3 py-1 text-xs text-on-surface-variant hover:underline"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1 text-xs bg-primary text-on-primary font-bold rounded-lg shadow hover:bg-primary-container"
                  >
                    Tempelkan ✨
                  </button>
                </div>
              </form>
            )}

            {/* Notes list */}
            <div className="space-y-space-sm pt-1">
              {hopeNotes.map((note) => (
                <div
                  key={note.id}
                  style={{ transform: `rotate(${note.rotation})` }}
                  className={`p-space-sm rounded-xl ${note.bgColor} ${note.textColor} border border-black/5 shadow-sm transition-all hover:scale-[1.01] hover:shadow-md space-y-2`}
                >
                  <div className="flex items-center justify-between text-[11px] font-semibold opacity-85">
                    <span>{note.emoji} {note.source}</span>
                    <span>{note.time}</span>
                  </div>

                  <p className="font-body-md text-xs font-semibold leading-relaxed">
                    {note.text}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-black/5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${note.tagColor}`}>
                      {note.tag}
                    </span>

                    {/* Interactive Stickers attached */}
                    <div className="flex items-center gap-1">
                      {note.stickers?.map((stk, sIdx) => (
                        <span key={sIdx} className="text-xs animate-bounce" style={{ animationDelay: `${sIdx * 200}ms` }}>
                          {stk}
                        </span>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleAttachSticker(note.id, selectedSticker)}
                        className="text-[10px] bg-white/70 hover:bg-white text-on-surface px-1.5 py-0.5 rounded font-bold transition-all ml-1"
                        title="Tempel stiker terpilih ke note ini"
                      >
                        + {selectedSticker}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Banner to Curhat */}
      <section className="bg-gradient-to-r from-primary-fixed/40 via-surface-container to-secondary-fixed/40 p-space-md rounded-2xl border border-surface-container flex flex-col sm:flex-row items-center justify-between gap-space-md">
        <div className="space-y-0.5 text-center sm:text-left">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
            Hati Masih Terasa Mengganjal?
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Bawa mood <strong>"{selectedMood}"</strong> ini langsung ke Curhat Room. Sahabat Moodify siap mendengarkan cerita lengkapmu!
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigateToCurhat(`Aku bawa mood "${selectedMood}" (${moodIntensity}%) dari Radar Mood. Aku mau cerita lebih lanjut...`)}
          className="px-space-lg py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold shadow hover:bg-primary-container transition-all shrink-0 flex items-center gap-1.5"
        >
          <span>Buka Curhat Room Sekarang</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </section>

    </div>
  );
};
