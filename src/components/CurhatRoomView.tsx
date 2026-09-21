import React, { useState } from 'react';
import { Song, CurhatMessage, ThemeType } from '../types';
import { INITIAL_SONGS } from '../data/mockData';

interface CurhatRoomViewProps {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  currentSong: Song;
  isPlaying: boolean;
  onSelectSong: (song: Song) => void;
  onTogglePlay: () => void;
  onOpenBreathing: () => void;
  onOpenHotline: () => void;
}

export const CurhatRoomView: React.FC<CurhatRoomViewProps> = ({
  theme,
  setTheme,
  currentSong,
  isPlaying,
  onSelectSong,
  onTogglePlay,
  onOpenBreathing,
  onOpenHotline,
}) => {
  const [messages, setMessages] = useState<CurhatMessage[]>([
    {
      id: 'msg-1',
      sender: 'user',
      senderName: 'Kamu (Siswa Kelas 8)',
      time: '15:43',
      text: 'Kak Moodify, aku lagi pusing banget sama tugas IPA kelompokan, pada gak ada yang mau bantu... 😭 Semua dilempar ke aku, padahal besok pagi harus dipresentasiin! Mau marah tapi bingung harus ngomong gimana.',
    },
    {
      id: 'msg-2',
      sender: 'bot',
      senderName: 'Sahabat Curhat Moodify',
      time: '15:43 • Dihasilkan dengan empati penuh',
      text: 'Peluk jauh buat kamu! 🤗 Wajar banget ngerasa kesel dan capek kalau ngerjain sendirian. Tarik napas dulu yuk, kamu udah berusaha keren banget dan bertanggung jawab!\n\nNanti kita susun bareng chat sopan tapi tegas buat teman sekelompokmu. Tapi sebelum overthinking makin parah, yuk istirahatin otakmu sebentar. Aku racik 4 lagu penyemangat khusus buat nemenin kamu sekarang ya! 🎧💖',
      tags: ['✨ Validasi Rasa', '🌱 Anti-Burnout', '🎵 4 Lagu Kurasi'],
      songs: [
        INITIAL_SONGS[4], // Here Comes The Sun
        INITIAL_SONGS[5], // Drown
        INITIAL_SONGS[6], // Gajah
        INITIAL_SONGS[7], // Spillways
      ],
    },
  ]);

  const [inputCurhat, setInputCurhat] = useState('');
  const [selectedMood, setSelectedMood] = useState('😡 Kesel/Marah');
  const [isRecordingVN, setIsRecordingVN] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  const moodPills = [
    { label: '😊 Senang', val: 'senang' },
    { label: '🥺 Sedih/Terharu', val: 'sedih' },
    { label: '😡 Kesel/Marah', val: 'kesel' },
    { label: '😴 Capek/Ngantuk', val: 'capek' },
    { label: '🥳 Party/Ceria', val: 'ceria' },
  ];

  const handleToggleVN = () => {
    if (isRecordingVN) {
      setIsRecordingVN(false);
      setRecordingSeconds(0);
      setInputCurhat((prev) => (prev ? `${prev} [VN Curhat Suara 0:${recordingSeconds < 10 ? '0' : ''}${recordingSeconds}]` : `[VN Curhat Suara 0:${recordingSeconds < 10 ? '0' : ''}${recordingSeconds}]`));
    } else {
      setIsRecordingVN(true);
      setRecordingSeconds(1);
      const iv = setInterval(() => {
        setRecordingSeconds((s) => {
          if (s >= 59) {
            clearInterval(iv);
            setIsRecordingVN(false);
            return 60;
          }
          return s + 1;
        });
      }, 1000);
    }
  };

  const handleSubmitCurhat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCurhat.trim()) return;

    const userText = inputCurhat.trim();
    const newMsgId = `msg-${Date.now()}`;
    const userMsg: CurhatMessage = {
      id: newMsgId,
      sender: 'user',
      senderName: 'Kamu (Siswa Kelas 8)',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: userText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputCurhat('');

    // Generate empathetic companion reply
    setTimeout(() => {
      const botMsg: CurhatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        senderName: 'Sahabat Curhat Moodify',
        time: `${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Dihasilkan dengan empati penuh`,
        text: `Terima kasih sudah berani curhat dan cerita jujur tentang perasaanmu! 🧸✨\nIngat, kamu nggak harus memikul segalanya sendirian. Hal-hal yang bikin kamu tertekan ini bakal bisa kita lewatin pelan-pelan.\n\nSambil kamu tenangkan pikiran, dengarkan 4 lagu yang sudah aku pilihkan khusus buat mood "${selectedMood}" kamu hari ini:`,
        tags: ['💖 Empati Mendalam', '🎧 Terapi Nada', '🛡️ Ruang Nyaman'],
        songs: [
          INITIAL_SONGS[0], // Sudut Kamar
          INITIAL_SONGS[9], // Diri
          INITIAL_SONGS[1], // Minuman Dingin
          INITIAL_SONGS[10], // Evaluasi
        ],
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  return (
    <div className="w-full">
      {/* Ambient background glow */}
      <div className="relative overflow-hidden mb-6">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-secondary-container/15 rounded-full blur-3xl pointer-events-none" />

        {/* Hero Safe Space Banner */}
        <section className="relative rounded-2xl bg-gradient-to-r from-surface-container via-surface-container-low to-surface-container p-space-lg md:p-space-xl border border-surface-container-high shadow-[0_8px_30px_rgba(255,107,139,0.06)]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm mb-space-sm">
                <span className="material-symbols-outlined text-[16px]">lock_heart</span>
                <span className="font-bold">Ruang Curhat Anonim SMP • 100% Rahasia</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight mb-space-xs">
                Hai Bestie! Lagi ngerasa apa hari ini?
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Moodify siap dengerin curhatanmu tanpa nge-judge ✨ Cerita apa aja, dari urusan sekolah, gebetan, sampai capek tugas kelompok. Setiap curhatanmu bakal ditemani <strong>rekomendasi 4 lagu kurasi</strong> yang ngertiin perasaanmu.
              </p>
            </div>

            {/* Theme selector pills within banner */}
            <div className="flex flex-wrap md:flex-col gap-space-xs bg-surface-container-lowest/80 backdrop-blur-md p-space-sm rounded-xl border border-surface-container shrink-0 shadow-sm">
              <span className="text-label-sm font-label-sm text-on-surface-variant font-bold px-1">
                Suasana Ruang Curhat:
              </span>
              <div className="flex gap-space-xs">
                <button
                  type="button"
                  onClick={() => setTheme('pink')}
                  className={`px-space-sm py-1 rounded-full text-label-sm font-label-sm transition-all ${
                    theme === 'pink'
                      ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  🌸 Pink Berry (Girly Vibe)
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('blue')}
                  className={`px-space-sm py-1 rounded-full text-label-sm font-label-sm transition-all ${
                    theme === 'blue'
                      ? 'bg-secondary-container text-on-secondary font-bold shadow-sm'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  🌊 Cool Blue (Boyish Chill)
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Main Grid: Chat Stream (Left) + Music & Wellness Widget (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-28">
        
        {/* Left Column: Chat Conversation Stream & Interactive Curhat Box (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          
          {/* Curhat Conversation Container */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-md md:p-space-lg border border-surface-container shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-space-md">
            
            {/* Header of Chat Stream */}
            <div className="flex items-center justify-between pb-space-sm border-b border-surface-container">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold shadow-sm">
                  <span className="material-symbols-outlined text-[22px]">smart_toy</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-extrabold flex items-center gap-1.5">
                    Moodify Bestie AI
                    <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
                  </h2>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Sahabat Curhat • Selalu Ada &amp; Empatik
                  </p>
                </div>
              </div>

              <span className="text-label-sm font-label-sm bg-surface-container px-space-sm py-1 rounded-full text-on-surface-variant">
                Privasi Terenkripsi 🔒
              </span>
            </div>

            {/* Message Stream */}
            <div className="space-y-space-md max-h-[560px] overflow-y-auto pr-1 scrollbar-none">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-space-xs animate-in fade-in duration-300`}
                  >
                    <div className="flex items-center gap-space-xs text-label-sm font-label-sm text-on-surface-variant px-1">
                      <span>{msg.senderName}</span>
                      <span>•</span>
                      <span>{msg.time}</span>
                    </div>

                    <div
                      className={`max-w-[90%] rounded-2xl p-space-md ${
                        isUser
                          ? 'bg-secondary-fixed text-on-secondary-fixed font-medium rounded-tr-none shadow-sm'
                          : 'bg-surface-container-low text-on-surface rounded-tl-none border border-surface-container shadow-sm'
                      }`}
                    >
                      <p className="font-body-md text-body-md whitespace-pre-line leading-relaxed">
                        {msg.text}
                      </p>

                      {/* Bot Tags */}
                      {msg.tags && (
                        <div className="flex flex-wrap gap-1.5 mt-space-sm pt-space-xs border-t border-surface-container/60">
                          {msg.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-label-sm font-label-sm px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-semibold"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Handcrafted Song Recommendation Grid */}
                    {msg.songs && msg.songs.length > 0 && (
                      <div className="w-full mt-space-sm space-y-space-xs">
                        <div className="flex items-center justify-between px-1">
                          <span className="font-label-md text-label-md text-primary font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[18px]">graphic_eq</span>
                            4 Rekomendasi Lagu Penenang Buat Kamu:
                          </span>
                          <span className="text-xs text-on-surface-variant">
                            Klik lagu untuk memutar 🎧
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                          {msg.songs.map((song, sIdx) => {
                            const isCurrent = currentSong.id === song.id;
                            return (
                              <div
                                key={song.id}
                                onClick={() => {
                                  onSelectSong(song);
                                  if (!isPlaying) onTogglePlay();
                                }}
                                className={`group relative p-space-sm rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                                  isCurrent
                                    ? 'bg-secondary-fixed/50 border-secondary shadow-md scale-[1.01]'
                                    : 'bg-surface-container-lowest hover:bg-surface-container-low border-surface-container hover:shadow-md'
                                }`}
                              >
                                <div className="flex items-center gap-space-sm mb-space-xs">
                                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container">
                                    <img
                                      src={song.coverUrl}
                                      alt={song.title}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 flex items-center justify-center transition-colors">
                                      <span
                                        className="material-symbols-outlined text-white text-[20px]"
                                        style={{ fontVariationSettings: isCurrent && isPlaying ? "'FILL' 1" : "'FILL' 0" }}
                                      >
                                        {isCurrent && isPlaying ? 'pause_circle' : 'play_circle'}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-1">
                                      <span className="text-label-sm font-label-sm bg-primary-fixed text-on-primary-fixed-variant px-1 rounded font-mono">
                                        #{sIdx + 1}
                                      </span>
                                      <h4 className="font-label-md text-label-md text-on-surface font-bold truncate">
                                        {song.title}
                                      </h4>
                                    </div>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                                      {song.artist}
                                    </p>
                                    <span className="text-[10px] text-secondary font-semibold">
                                      {song.genre}
                                    </span>
                                  </div>
                                </div>

                                {song.reason && (
                                  <p className="font-body-sm text-[11px] text-on-surface-variant/90 italic bg-surface-container/40 p-1.5 rounded-lg border border-surface-container/50">
                                    💡 <strong>Alasan Buat Kamu:</strong> {song.reason}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Interactive Curhat Composer Form */}
            <form onSubmit={handleSubmitCurhat} className="pt-space-sm border-t border-surface-container space-y-space-sm">
              
              {/* Mood pills selector */}
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface-variant font-bold mb-1.5">
                  Lagi Merasakan Mood Apa?
                </label>
                <div className="flex flex-wrap gap-space-xs">
                  {moodPills.map((m) => {
                    const isSel = selectedMood === m.label;
                    return (
                      <button
                        key={m.val}
                        type="button"
                        onClick={() => setSelectedMood(m.label)}
                        className={`px-space-sm py-1 rounded-full text-label-sm font-label-sm transition-all ${
                          isSel
                            ? 'bg-primary text-on-primary font-bold shadow-sm scale-105'
                            : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                        }`}
                      >
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Textarea */}
              <div className="relative">
                <textarea
                  rows={3}
                  value={inputCurhat}
                  onChange={(e) => setInputCurhat(e.target.value)}
                  placeholder="Tulis keluh kesahmu di sini, Bestie... Gak ada yang bakal bocorin kok! Mau curhat tentang ulangan, ekskul, atau teman kelas?"
                  className="w-full p-space-sm rounded-xl bg-surface-container-low border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary text-on-surface font-body-md text-body-md resize-none"
                />
              </div>

              {/* Action Toolbar: Voice Note, Privacy status & Submit */}
              <div className="flex items-center justify-between gap-space-xs flex-wrap">
                <div className="flex items-center gap-space-xs">
                  {/* Voice Note Simulation Button */}
                  <button
                    type="button"
                    onClick={handleToggleVN}
                    className={`flex items-center gap-1 px-space-sm py-1.5 rounded-full text-label-sm font-label-sm border transition-all ${
                      isRecordingVN
                        ? 'bg-red-500 text-white border-red-600 animate-pulse'
                        : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant border-surface-container-high'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isRecordingVN ? 'mic' : 'mic_none'}
                    </span>
                    <span>
                      {isRecordingVN ? `Merekam... (0:${recordingSeconds < 10 ? '0' : ''}${recordingSeconds})` : 'VN Curhat (60d)'}
                    </span>
                  </button>

                  <div className="hidden sm:flex items-center gap-1 text-[11px] text-on-surface-variant font-medium">
                    <span className="material-symbols-outlined text-[14px] text-secondary">verified_user</span>
                    <span>Privasi Terjaga</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!inputCurhat.trim() && !isRecordingVN}
                  className="flex items-center gap-1.5 px-space-md py-2 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-md hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <span>Kirim Curhat &amp; Minta Lagu</span>
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Safe Vibes Player & Mental Wellness Tools (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-space-md">
          
          {/* Now Playing Safe Vibes Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-md md:p-space-lg border border-surface-container shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-space-md">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary-container animate-pulse" />
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
                  Now Playing • Safe Vibes
                </h3>
              </div>
              <span className="text-label-sm font-label-sm bg-secondary-fixed text-on-secondary-fixed-variant px-2 py-0.5 rounded-full font-bold">
                {currentSong.genre.split(' ')[0]}
              </span>
            </div>

            {/* Album Cover */}
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-surface-container shadow-md group">
              <img
                src={currentSong.coverUrl}
                alt={currentSong.title}
                className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : ''}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-space-md">
                <div className="text-white">
                  <span className="text-label-sm font-label-sm bg-primary-container text-on-primary px-2 py-0.5 rounded-full font-bold">
                    Terkurasi Buat Menenangkan
                  </span>
                  <h4 className="font-headline-sm text-headline-sm text-white font-bold mt-1 drop-shadow-sm">
                    {currentSong.title}
                  </h4>
                  <p className="font-body-sm text-body-sm text-white/85">
                    {currentSong.artist}
                  </p>
                </div>
              </div>
            </div>

            {/* Audio waveform and play button */}
            <div className="p-space-sm bg-surface-container-low rounded-xl border border-surface-container space-y-space-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <button
                    onClick={onTogglePlay}
                    className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md hover:bg-primary-container transition-transform active:scale-95"
                    title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
                  >
                    <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                  </button>
                  <div>
                    <span className="font-label-md text-label-md text-on-surface font-bold block">
                      {isPlaying ? 'Sedang Diputar' : 'Siap Diputar'}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {currentSong.duration} • Lo-Fi Beats
                    </span>
                  </div>
                </div>

                <span className="material-symbols-outlined text-primary text-2xl animate-pulse">
                  graphic_eq
                </span>
              </div>

              {currentSong.reason && (
                <p className="font-body-sm text-[12px] text-on-surface-variant bg-surface-container p-2 rounded-lg leading-relaxed">
                  💬 <em>"{currentSong.reason}"</em>
                </p>
              )}
            </div>
          </div>

          {/* Latihan Napas 4-7-8 Interactive Card */}
          <div className="bg-gradient-to-br from-primary-fixed/40 via-surface-container-low to-surface-container rounded-2xl p-space-md border border-primary-fixed shadow-sm">
            <div className="flex items-start gap-space-sm">
              <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-md">
                <span className="material-symbols-outlined text-[26px]">self_improvement</span>
              </div>
              <div className="flex-1">
                <span className="text-label-sm font-label-sm text-primary font-bold uppercase tracking-wider">
                  Relaksasi Cepat SMP
                </span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
                  Latihan Napas 4-7-8
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                  Detak jantung lagi kencang atau pusing sama tugas? Tarik napas 4 detik, tahan 7 detik, lalu hembuskan perlahan 8 detik.
                </p>
                <button
                  type="button"
                  onClick={onOpenBreathing}
                  className="mt-space-sm inline-flex items-center gap-1.5 px-space-md py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold shadow-sm hover:bg-primary-container transition-colors"
                >
                  <span>Mulai Latihan (2 Menit)</span>
                  <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                </button>
              </div>
            </div>
          </div>

          {/* Moodify Hotline Teman Sebaya Card */}
          <div className="bg-surface-container-low rounded-2xl p-space-md border border-surface-container shadow-sm">
            <div className="flex items-start gap-space-sm">
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[26px]">favorite</span>
              </div>
              <div className="flex-1">
                <span className="text-label-sm font-label-sm text-secondary font-bold uppercase tracking-wider">
                  Bantuan Khusus
                </span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
                  Moodify Hotline Teman Sebaya
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                  Jika kamu merasa masalahmu terlalu berat atau butuh ngobrol langsung dengan kakak relawan konseling psikologi terlatih.
                </p>
                <button
                  type="button"
                  onClick={onOpenHotline}
                  className="mt-space-sm inline-flex items-center gap-1 px-space-md py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-bold transition-colors border border-surface-container-high"
                >
                  <span>Hubungi Konselor Gratis</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
