import React, { useState } from 'react';
import { Song, TabType } from '../types';
import { INITIAL_SONGS } from '../data/mockData';

interface PlaylistSayaViewProps {
  currentSong: Song;
  isPlaying: boolean;
  onSelectSong: (song: Song) => void;
  onTogglePlay: () => void;
  onNavigateToCurhat: (prefillNote?: string) => void;
}

export const PlaylistSayaView: React.FC<PlaylistSayaViewProps> = ({
  currentSong,
  isPlaying,
  onSelectSong,
  onTogglePlay,
  onNavigateToCurhat,
}) => {
  const [activeGenre, setActiveGenre] = useState('Semua Genre');
  const [energyLevel, setEnergyLevel] = useState(50); // 0 to 100
  const [activeCollection, setActiveCollection] = useState<string | null>(null);

  const genres = [
    { name: 'Semua Genre', count: 128 },
    { name: 'Lo-Fi Beats Santai', count: 48 },
    { name: 'Japanese Rock / Anime Hype', count: 32 },
    { name: 'Indie Senja & Melamun', count: 29 },
    { name: 'K-Pop Energic Hype', count: 35 },
    { name: 'Pop Akustik Santai', count: 24 },
  ];

  const collections = [
    {
      id: 'col-1',
      title: 'Overthinking Jam 11 Malam',
      tag: 'Midnight Zone',
      genre: 'Lo-fi & Ambient Indie',
      trackCount: '24 Lagu Chill',
      duration: '1 jam 18 mnt',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAv4tqCZlBJNw2ZOEeHuRwSFSXCVyI9W8Jirz9kFyxSnV8LSp-DYVJjG9EVxgI2Q2uvtQJePKZ9oLy6lmmZKjw6-gwLYLZ-GEMP4QYBIZoJB7QCwXayCyyhpLpaa_rZ63idnIuCVS0D97sPfvGOnpVE2Bsqg645EbsUWK5D-RGjckg1jAxWlhb2MF8GYRsZnbkebCVrj5PiKRevd7prLasdBLGRzDWp2UNlr6A8AskkFLqQ9eLwwDNbkA',
      song: INITIAL_SONGS[0],
    },
    {
      id: 'col-2',
      title: 'Lagi Capek Abis Latihan Basket',
      tag: 'Ekskul Cooling',
      genre: 'Chill Pop & RnB Lembut',
      trackCount: '18 Lagu Rileks',
      duration: '54 mnt',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOOy5DV6HfaUpdxAP2EeqGr2rTMXygIxdfsGR83RG4t4o9JTQlpVmNbUd9ljA5Uvk7EU0chQldMtWZUOYX7_6luJ6SswlzzCjs7wqfFZfTTVwdxTiqQKXKag0ZNf8nyqzEV_qjyuX20BUcDfF4rnYgy1sVahMwct-AHAwPe9FoLhQst2ekJU09TXJP8bZwUgH1uq_E920Ovlf6L8nfk319opfcthY-cU-vMRPxWc03ywRX5cPCxz7fWQ',
      song: INITIAL_SONGS[1],
    },
    {
      id: 'col-3',
      title: 'Semangat Anti Remedial Ujian',
      tag: 'Fokus Mode',
      genre: 'High Beat Anime OST & J-Pop',
      trackCount: '30 Lagu Pemicu',
      duration: '1 jam 45 mnt',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNJsXDOttawMl1bTSFuXASxp782uRbibXVJl9z0JFHVbS_c_cJxJrM2b7vWSfbm5Z8euYmZ0rEYK2pP3c2RmLS8d_g4Slo5SnpcguyAQdrf7VT-687jmA4NGLjWRiIvoMGeXVRgRYICvIMujUy6yBTM9RWzHvnKXaEwNWSHiNctUiIfbsV9XV0dnQXyIat_rCU9BQ_N1yMfUyfn4A4SsYbVnOpPjfOM7hqji6ny_cEHPcpUCcWdY5G8w',
      song: INITIAL_SONGS[2],
    },
    {
      id: 'col-4',
      title: 'Kecewa Sama Sahabat Sendiri',
      tag: 'Relatable',
      genre: 'Empathy Acoustic & Soft Ballad',
      trackCount: '20 Lagu Peluk',
      duration: '1 jam 05 mnt',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJufNc5LHmJDrZ2noBz_aEkvYnylk7BHUPVLrxSL6PHc7eodNIkeyqK-djkc-NPZkIHgAHvMLqAaGNhXV2FmHweRv4GC7LI1f_xTYj_biX1rX7vBJAfowbP_Sf3cNxBhTsOeNckntiJgSgFkd20ogPhrvBQQIvR5mr4uxmL5bdKP7qZW2oOHFWICPhaOGXJT09DdMiUCuqO7K0Kxq9wBx89qWQSuDfDBHQFMNjIppFq3XfH9e9Q36foA',
      song: INITIAL_SONGS[3],
    },
  ];

  // Songs recommended specifically in this screen
  const mainTracks = [
    INITIAL_SONGS[0], // Sudut Kamar & Hujan Rintik
    INITIAL_SONGS[1], // Minuman Dingin di Warung Mang Ujang
    INITIAL_SONGS[2], // Limit Break! Babak Final
    INITIAL_SONGS[3], // Tak Lagi Naik Sepeda Berdua
  ];

  const handlePlayCollection = (col: typeof collections[0]) => {
    setActiveCollection(col.id);
    onSelectSong(col.song);
    if (!isPlaying) onTogglePlay();
  };

  const handleRandomPlay = () => {
    const randomIdx = Math.floor(Math.random() * mainTracks.length);
    onSelectSong(mainTracks[randomIdx]);
    if (!isPlaying) onTogglePlay();
  };

  return (
    <div className="w-full space-y-space-lg mb-28">
      
      {/* Top Bento Header */}
      <section className="relative rounded-2xl bg-gradient-to-r from-secondary-fixed/40 via-surface-container-low to-surface-container p-space-lg md:p-space-xl border border-secondary-fixed/60 shadow-[0_8px_30px_rgba(0,100,147,0.06)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
          
          <div className="lg:col-span-8 space-y-space-sm">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-secondary-container text-on-secondary font-label-sm text-label-sm font-bold">
              <span className="material-symbols-outlined text-[16px]">headphones</span>
              <span>Boyish &amp; Chill Edition • SMP Bro Safe Space</span>
            </div>

            <h1 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
              Jukebox Teman Curhat
            </h1>

            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl leading-relaxed">
              "Ngelamun Santai, Musik Mengerti Tanpa Banyak Tanya."
              <br />
              Koleksi lagu kurasi khusus anak SMP cowok &amp; cewek yang butuh pelarian sejenak dari tugas, ekskul, dan drama pertemanan.
            </p>

            <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
              <span className="font-label-md text-label-md text-secondary font-bold bg-surface-container-lowest px-3 py-1.5 rounded-full border border-secondary-fixed shadow-sm">
                🎵 128 Lagu Terkurasi Hari Ini
              </span>

              <button
                type="button"
                onClick={handleRandomPlay}
                className="px-space-md py-2 rounded-xl bg-secondary text-on-secondary font-label-md text-label-md font-bold shadow hover:bg-secondary/90 transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">shuffle</span>
                <span>Putar Rekomendasi Acak</span>
              </button>

              <button
                type="button"
                onClick={() => setEnergyLevel((prev) => (prev >= 80 ? 20 : prev + 30))}
                className="px-space-md py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-bold transition-all border border-surface-container-high flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
                <span>Set Frekuensi Hati</span>
              </button>
            </div>
          </div>

          {/* Right Snapshot Card: Bro Vibe Radar */}
          <div className="lg:col-span-4 bg-surface-container-lowest p-space-md rounded-2xl border border-secondary-fixed shadow-md space-y-space-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping" />
                <h3 className="font-label-lg text-label-lg text-on-surface font-extrabold">
                  Bro Vibe Radar
                </h3>
              </div>
              <span className="text-[11px] font-bold text-secondary bg-secondary-fixed px-2 py-0.5 rounded-full">
                Real-Time
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-on-surface-variant font-medium">
                <span>Energi Kamu Sekarang?</span>
                <span className="font-bold text-secondary">
                  {energyLevel < 35 ? '🧊 Lemas / Capek' : energyLevel < 70 ? '⚡ Santai Fokus' : '🔥 Gejolak Emosi'}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={energyLevel}
                onChange={(e) => setEnergyLevel(parseInt(e.target.value, 10))}
                className="w-full h-1.5 bg-surface-container rounded-full appearance-none accent-secondary cursor-pointer"
              />
            </div>

            <div className="bg-surface-container-low p-2.5 rounded-xl border border-surface-container text-xs space-y-1">
              <p className="font-bold text-on-surface">
                Resep Audio Hari Ini:
              </p>
              <p className="text-on-surface-variant leading-relaxed">
                {energyLevel < 35
                  ? 'Low-tempo beats + rain ambiance (Durasi: 42 menit tenang).'
                  : energyLevel < 70
                  ? 'Acoustic indie & chill vibes untuk nemenin belajar santai.'
                  : 'High energy rock riffs untuk lepas beban dan pumping energi!'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Genre Filter Pills */}
      <section className="space-y-space-xs">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
            Genre Favorit Lo
          </h2>
          <span className="text-xs text-on-surface-variant">Pilih mood genre</span>
        </div>

        <div className="flex items-center gap-space-xs overflow-x-auto pb-2 scrollbar-none">
          {genres.map((g) => {
            const isSel = activeGenre === g.name;
            return (
              <button
                key={g.name}
                type="button"
                onClick={() => setActiveGenre(g.name)}
                className={`px-space-md py-2 rounded-full text-label-md font-label-md whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSel
                    ? 'bg-secondary text-on-secondary font-bold shadow-sm scale-105'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                }`}
              >
                <span>{g.name}</span>
                <span className={`text-xs px-1.5 py-0.2 rounded-full ${isSel ? 'bg-secondary-container/50 text-white' : 'bg-surface-container-high text-on-surface-variant'}`}>
                  {g.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Bento Grid: Koleksi Rasa Remaja (4 Cards) */}
      <section className="space-y-space-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
              Koleksi Rasa Remaja
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Pilih playlist yang paling pas mewakili detak hatimu saat ini.
            </p>
          </div>
          <span className="text-xs font-bold text-secondary bg-secondary-fixed px-3 py-1 rounded-full">
            4 Playlist Utama
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {collections.map((col) => {
            const isActive = activeCollection === col.id || currentSong.id === col.song.id;
            return (
              <div
                key={col.id}
                onClick={() => handlePlayCollection(col)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer border transition-all flex flex-col justify-between ${
                  isActive
                    ? 'border-secondary shadow-xl ring-2 ring-secondary scale-[1.02]'
                    : 'border-surface-container hover:border-secondary-fixed bg-surface-container-lowest hover:shadow-lg'
                }`}
              >
                {/* Visual Cover */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container">
                  <img
                    src={col.imageUrl}
                    alt={col.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-between p-3">
                    <span className="self-start text-[11px] font-bold bg-black/50 backdrop-blur-md text-white px-2 py-0.5 rounded-full">
                      {col.tag}
                    </span>

                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-white/90 font-medium">
                        {col.trackCount}
                      </span>
                      <div className="w-9 h-9 rounded-full bg-secondary-container text-on-secondary flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          {isActive && isPlaying ? 'pause' : 'play_arrow'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-space-sm space-y-1">
                  <h3 className="font-label-lg text-label-lg text-on-surface font-extrabold group-hover:text-secondary transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant truncate">
                    {col.genre}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-1 border-t border-surface-container">
                    <span>Durasi: {col.duration}</span>
                    <span className="text-secondary font-semibold">Terkurasi</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Rekomendasi Lagu Khusus Cowok Santai (4 Track Cards) */}
      <section className="space-y-space-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
              Rekomendasi Lagu Khusus Cowok Santai
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Lagu-lagu yang ngerti capeknya jadi anak SMP cowok tanpa harus banyak cerita.
            </p>
          </div>
          <span className="text-xs font-bold text-primary bg-primary-fixed px-3 py-1 rounded-full">
            🔥 Paling Banyak Diputar
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          {mainTracks.map((song) => {
            const isCurrent = currentSong.id === song.id;
            return (
              <div
                key={song.id}
                className={`p-space-md rounded-2xl border transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-secondary-fixed/40 border-secondary shadow-md'
                    : 'bg-surface-container-lowest hover:bg-surface-container-low border-surface-container shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-start gap-space-sm mb-space-sm">
                    <img
                      src={song.coverUrl}
                      alt={song.title}
                      className="w-16 h-16 rounded-xl object-cover shadow-sm shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      {song.badge && (
                        <span className="inline-block text-[11px] font-bold text-secondary bg-secondary-container/20 px-2 py-0.5 rounded-full mb-1">
                          {song.badge}
                        </span>
                      )}
                      <h3 className="font-label-lg text-label-lg text-on-surface font-extrabold truncate">
                        {song.title}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                        {song.artist}
                      </p>
                      <span className="text-xs text-secondary font-semibold">
                        {song.genre} • {song.duration}
                      </span>
                    </div>
                  </div>

                  {song.reason && (
                    <p className="font-body-sm text-xs text-on-surface-variant bg-surface-container-low p-2.5 rounded-xl border border-surface-container italic mb-space-sm leading-relaxed">
                      💬 <em>"{song.reason}"</em>
                    </p>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center gap-space-xs pt-space-xs border-t border-surface-container flex-wrap">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectSong(song);
                      if (!isPlaying) onTogglePlay();
                    }}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-secondary text-on-secondary font-label-md text-xs font-bold shadow hover:bg-secondary/90 transition-all flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {isCurrent && isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                    <span>{isCurrent && isPlaying ? 'Jeda Lagu' : 'Dengar Cuplikan 30s'}</span>
                  </button>

                  <a
                    href={`https://open.spotify.com/search/${encodeURIComponent(song.title + ' ' + song.artist)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-1.5 px-3 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] text-white font-label-md text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
                  >
                    <span>Spotify</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => onNavigateToCurhat(`Aku mau cerita rasanya dengerin lagu "${song.title} - ${song.artist}"...`)}
                    className="py-1.5 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs font-bold transition-all flex items-center gap-1 border border-surface-container-high"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
                    <span>Curhat Tentang Lagu Ini</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Safe Space Bottom Prompt Banner */}
      <section className="bg-gradient-to-r from-primary-fixed/30 via-surface-container to-secondary-fixed/30 p-space-md md:p-space-lg rounded-2xl border border-surface-container flex flex-col sm:flex-row items-center justify-between gap-space-md">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
            Punya Lagu Rahasia yang Selalu Bikin Kamu Tenang?
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xl">
            Tulis judulnya atau ceritakan di Ruang Curhat. Moodify akan memasukkannya ke dalam kurasi lagu teman-teman se-Indonesia!
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigateToCurhat('Aku punya lagu rahasia yang selalu nemenin pas lagi sedih/capek...')}
          className="px-space-lg py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold shadow hover:bg-primary-container transition-all shrink-0 flex items-center gap-1.5"
        >
          <span>Kirim Cerita Laguku</span>
          <span className="material-symbols-outlined text-[18px]">favorite</span>
        </button>
      </section>

    </div>
  );
};
