import React, { useState } from 'react';
import { Song, CommunityPost } from '../types';
import { INITIAL_COMMUNITY_POSTS, INITIAL_SONGS } from '../data/mockData';

interface KomunitasTemanViewProps {
  currentSong: Song;
  isPlaying: boolean;
  onSelectSong: (song: Song) => void;
  onTogglePlay: () => void;
  onOpenNewCurhatModal: () => void;
  onOpenHotline: () => void;
  posts: CommunityPost[];
  setPosts: React.Dispatch<React.SetStateAction<CommunityPost[]>>;
}

export const KomunitasTemanView: React.FC<KomunitasTemanViewProps> = ({
  currentSong,
  isPlaying,
  onSelectSong,
  onTogglePlay,
  onOpenNewCurhatModal,
  onOpenHotline,
  posts,
  setPosts,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'pink' | 'blue'>('all');
  const [recommendingForPostId, setRecommendingForPostId] = useState<string | null>(null);
  const [recSongInput, setRecSongInput] = useState('');
  const [commentingPostId, setCommentingPostId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState('');

  // Filtered posts
  const filteredPosts = posts.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.room === activeFilter;
  });

  const handleToggleHug = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isHugged = p.hasUserHugged;
          return {
            ...p,
            hugsCount: isHugged ? p.hugsCount - 1 : p.hugsCount + 1,
            hasUserHugged: !isHugged,
          };
        }
        return p;
      })
    );
  };

  const handleSendSongRec = (postId: string) => {
    if (!recSongInput.trim()) return;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [
              ...p.comments,
              {
                id: `c-${Date.now()}`,
                author: 'Kamu (Teman Sebaya)',
                timeAgo: 'Baru saja',
                text: `🎵 Rekomendasi lagu buat kamu: "${recSongInput.trim()}"! Semoga bikin harimu lebih adem dan kuat ya ✨`,
                icon: '🎧',
              },
            ],
          };
        }
        return p;
      })
    );

    setRecSongInput('');
    setRecommendingForPostId(null);
  };

  const handleAddComment = (postId: string) => {
    if (!newCommentText.trim()) return;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [
              ...p.comments,
              {
                id: `c-${Date.now()}`,
                author: 'Kamu (Teman Sebaya)',
                timeAgo: 'Baru saja',
                text: newCommentText.trim(),
                icon: '💬',
              },
            ],
          };
        }
        return p;
      })
    );

    setNewCommentText('');
    setCommentingPostId(null);
  };

  // Top chart songs
  const topChartSongs = [
    INITIAL_SONGS[12], // Sorai
    INITIAL_SONGS[13], // Stand Out Fit In
    INITIAL_SONGS[14], // Tenang
  ];

  return (
    <div className="w-full space-y-space-lg mb-28">
      
      {/* Top Header Banner */}
      <section className="relative rounded-2xl bg-gradient-to-r from-primary-fixed/40 via-surface-container-low to-secondary-fixed/40 p-space-lg md:p-space-xl border border-surface-container-high shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
          <div className="space-y-space-xs max-w-2xl">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-bold">
              <span className="material-symbols-outlined text-[16px]">diversity_3</span>
              <span>Ruang Cerita Anonim &amp; Berbagi Energi Positif</span>
            </div>

            <h1 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
              Kamu Nggak Sendirian!
            </h1>

            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Baca cerita &amp; tukar rekomendasi lagu bareng teman SMP se-Indonesia 💌. Saling kuatkan, beri pelukan virtual, dan temukan teman yang merasakan hal yang sama.
            </p>

            <div className="flex items-center gap-space-sm pt-1">
              <div className="flex items-center gap-1 text-xs text-secondary font-bold bg-surface-container-lowest px-2.5 py-1 rounded-full border border-surface-container shadow-sm">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span>142 teman sedang online membaca curhat</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenNewCurhatModal}
            className="px-space-lg py-3 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-md hover:bg-primary-container transition-all shrink-0 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">edit_note</span>
            <span>Tulis Cerita Anonim Kamu</span>
          </button>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="flex flex-wrap items-center justify-between gap-space-sm border-b border-surface-container pb-space-sm">
        <div className="flex items-center gap-space-xs overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-space-md py-2 rounded-full font-label-md text-xs font-bold transition-all ${
              activeFilter === 'all'
                ? 'bg-on-surface text-surface shadow-sm'
                : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
            }`}
          >
            Semua Cerita ({posts.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('pink')}
            className={`px-space-md py-2 rounded-full font-label-md text-xs font-bold transition-all flex items-center gap-1 ${
              activeFilter === 'pink'
                ? 'bg-primary-container text-on-primary shadow-sm'
                : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
            }`}
          >
            <span>🌸 Pink Pastel Room</span>
            <span className="text-[10px] opacity-75">(Sahabat &amp; Baper)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('blue')}
            className={`px-space-md py-2 rounded-full font-label-md text-xs font-bold transition-all flex items-center gap-1 ${
              activeFilter === 'blue'
                ? 'bg-secondary text-on-secondary shadow-sm'
                : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
            }`}
          >
            <span>🌊 Cool Ocean Room</span>
            <span className="text-[10px] opacity-75">(Hobi, Game &amp; Sport)</span>
          </button>
        </div>

        <span className="text-xs text-on-surface-variant font-medium">
          Menampilkan {filteredPosts.length} cerita terbaru
        </span>
      </section>

      {/* Main Grid: Stories (7 cols) + Community Sidebar (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        
        {/* Left: Community Stories Stream */}
        <div className="lg:col-span-7 space-y-space-md">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-surface-container-lowest p-space-md md:p-space-lg rounded-2xl border border-surface-container shadow-sm space-y-space-sm hover:shadow-md transition-shadow"
            >
              {/* Author & Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <div className={`w-10 h-10 rounded-full ${post.avatarBg} flex items-center justify-center text-lg shadow-sm shrink-0`}>
                    {post.avatarIcon}
                  </div>
                  <div>
                    <h3 className="font-label-md text-sm text-on-surface font-extrabold flex items-center gap-1.5">
                      {post.author}
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${post.room === 'pink' ? 'bg-primary-fixed text-on-primary-fixed-variant' : 'bg-secondary-fixed text-on-secondary-fixed-variant'}`}>
                        {post.room === 'pink' ? '🌸 Pink Room' : '🌊 Ocean Room'}
                      </span>
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant">
                      {post.grade} • {post.city} • {post.timeAgo}
                    </p>
                  </div>
                </div>

                <span className="material-symbols-outlined text-on-surface-variant/50 text-[18px]">
                  more_horiz
                </span>
              </div>

              {/* Story Content */}
              <p className="font-body-md text-sm text-on-surface leading-relaxed whitespace-pre-line">
                {post.content}
              </p>

              {/* Attached Song (if present) */}
              {post.attachedSong && (
                <div className="p-space-sm rounded-xl bg-surface-container-low border border-surface-container flex items-center justify-between gap-space-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-secondary text-[22px] shrink-0">
                      music_note
                    </span>
                    <div className="min-w-0">
                      <p className="font-label-md text-xs text-on-surface font-bold truncate">
                        {post.attachedSong.title}
                      </p>
                      <p className="text-[11px] text-on-surface-variant truncate">
                        {post.attachedSong.subtext}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      // find or play matching song
                      const match = INITIAL_SONGS.find(s => s.title.toLowerCase().includes('nadin') || s.title.toLowerCase().includes('one ok')) || INITIAL_SONGS[0];
                      onSelectSong(match);
                      if (!isPlaying) onTogglePlay();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-primary font-bold text-xs shadow-sm flex items-center gap-1 shrink-0 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">play_circle</span>
                    <span>Dengar</span>
                  </button>
                </div>
              )}

              {/* Actions: Hugs button & Recommend Song */}
              <div className="flex items-center justify-between pt-space-xs border-t border-surface-container flex-wrap gap-2">
                <div className="flex items-center gap-space-xs">
                  {/* Hug Button */}
                  <button
                    type="button"
                    onClick={() => handleToggleHug(post.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                      post.hasUserHugged
                        ? 'bg-primary-container text-on-primary scale-105 shadow-sm'
                        : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: post.hasUserHugged ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                    <span>{post.hugsCount} Pelukan Virtual</span>
                  </button>

                  {/* Recommend Song Button */}
                  <button
                    type="button"
                    onClick={() => setRecommendingForPostId(recommendingForPostId === post.id ? null : post.id)}
                    className="px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px] text-secondary">music_note</span>
                    <span>Rekomendasikan Lagu Buat Dia</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setCommentingPostId(commentingPostId === post.id ? null : post.id)}
                  className="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">chat_bubble_outline</span>
                  <span>{post.comments.length} Dukungan</span>
                </button>
              </div>

              {/* Inline Recommend Song Drawer */}
              {recommendingForPostId === post.id && (
                <div className="p-3 bg-secondary-fixed/30 rounded-xl border border-secondary-fixed flex items-center gap-2 animate-in fade-in duration-200">
                  <input
                    type="text"
                    placeholder="Judul Lagu & Penyanyi... (Misal: Tulus - Monokrom)"
                    value={recSongInput}
                    onChange={(e) => setRecSongInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-surface-container-lowest border border-surface-container focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleSendSongRec(post.id)}
                    className="px-3 py-1.5 bg-secondary text-on-secondary rounded-lg font-bold text-xs shadow hover:bg-secondary/90 transition-colors"
                  >
                    Kirim 🎵
                  </button>
                </div>
              )}

              {/* Comments Section */}
              {post.comments.length > 0 && (
                <div className="pt-space-xs space-y-2">
                  <div className="space-y-1.5">
                    {post.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className={`p-2.5 rounded-xl text-xs space-y-0.5 ${
                          comment.isPeerHelper
                            ? 'bg-tertiary-fixed/30 border border-tertiary-fixed'
                            : 'bg-surface-container-low'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-on-surface">
                          <span className="flex items-center gap-1">
                            <span>{comment.icon || '💬'}</span>
                            <span>{comment.author}</span>
                            {comment.isPeerHelper && (
                              <span className="text-[10px] bg-tertiary text-on-tertiary px-1.5 py-0.2 rounded-full">
                                Relawan Konseling
                              </span>
                            )}
                          </span>
                          <span className="text-[10px] text-on-surface-variant font-normal">
                            {comment.timeAgo}
                          </span>
                        </div>
                        <p className="text-on-surface-variant leading-relaxed pl-4">
                          {comment.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comment Input */}
              {commentingPostId === post.id && (
                <div className="flex items-center gap-2 pt-2 animate-in fade-in duration-200">
                  <input
                    type="text"
                    placeholder="Beri kata-kata penyemangat tanpa menghakimi..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-surface-container-low border border-surface-container focus:outline-none text-on-surface"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddComment(post.id)}
                    className="px-3 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-bold shadow hover:bg-primary-container"
                  >
                    Kirim
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Right Sidebar: Safe Space Rules, Top Chart, Mood Radar Donut */}
        <div className="lg:col-span-5 space-y-space-md">
          
          {/* Card 1: Safe Space Rules */}
          <div className="bg-surface-container-lowest p-space-md rounded-2xl border border-surface-container shadow-sm space-y-space-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">shield</span>
              <h3 className="font-headline-sm text-sm text-on-surface font-extrabold">
                Aturan Ruang Aman Moodify
              </h3>
            </div>

            <div className="space-y-2 text-xs text-on-surface-variant">
              <div className="flex items-start gap-2">
                <span className="font-bold text-primary">1.</span>
                <span><strong>Anonim Terjaga:</strong> Jangan sebut nama asli, nama sekolah, atau informasi kontak pribadi.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-primary">2.</span>
                <span><strong>Zero Bullying:</strong> Komentar negatif atau merendahkan akan langsung disaring sistem.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-primary">3.</span>
                <span><strong>Saling Kuatkan:</strong> Kita semua punya beban masing-masing; jadilah teman yang merangkul.</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenHotline}
              className="w-full py-2 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-xl font-bold text-xs transition-colors border border-surface-container flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px] text-secondary">support_agent</span>
              <span>Butuh Bantuan Lebih Lanjut? Buka Hotline</span>
            </button>
          </div>

          {/* Card 2: Tangga Lagu Curhat (Top 3 Chart) */}
          <div className="bg-surface-container-lowest p-space-md rounded-2xl border border-surface-container shadow-sm space-y-space-sm">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-secondary uppercase tracking-wider block">
                  Paling Banyak Diputar
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
                  Tangga Lagu Curhat
                </h3>
              </div>
              <span className="text-xs font-bold text-primary bg-primary-fixed px-2 py-0.5 rounded-full">
                Minggu Ini
              </span>
            </div>

            <div className="space-y-2">
              {topChartSongs.map((song, idx) => {
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
                      <span className="font-mono font-extrabold text-sm w-4 text-center text-primary">
                        {idx + 1}
                      </span>
                      <img
                        src={song.coverUrl}
                        alt={song.title}
                        className="w-10 h-10 rounded-lg object-cover shadow-sm shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-label-md text-xs text-on-surface font-bold truncate">
                          {song.title}
                        </p>
                        <p className="font-body-sm text-[11px] text-on-surface-variant truncate">
                          {song.artist} • {song.hugs} Pelukan
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

          {/* Card 3: Radar Suasana Hati SMP (SVG Donut Chart) */}
          <div className="bg-surface-container-lowest p-space-md rounded-2xl border border-surface-container shadow-sm space-y-space-sm">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-tertiary uppercase tracking-wider block">
                  Distribusi Emosi Teman SMP
                </span>
                <h3 className="font-headline-sm text-sm text-on-surface font-extrabold">
                  Radar Suasana Hati SMP
                </h3>
              </div>
              <span className="text-[10px] text-on-surface-variant">Hari Ini</span>
            </div>

            <div className="flex items-center justify-center gap-4 py-2">
              {/* SVG Donut */}
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  {/* Segment 1: 45% Baper */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="none"
                    stroke="#ff6b8b"
                    strokeWidth="4"
                    strokeDasharray="45, 100"
                    strokeDashoffset="0"
                  />
                  {/* Segment 2: 35% Hobi */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="none"
                    stroke="#36b5fd"
                    strokeWidth="4"
                    strokeDasharray="35, 100"
                    strokeDashoffset="-45"
                  />
                  {/* Segment 3: 20% Ujian */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="none"
                    stroke="#c09732"
                    strokeWidth="4"
                    strokeDasharray="20, 100"
                    strokeDashoffset="-80"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-mono font-bold text-on-surface">1.4k</span>
                  <span className="text-[9px] text-on-surface-variant uppercase">Curhat</span>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-container shrink-0" />
                  <span className="text-on-surface font-medium">45% Baper &amp; Rindu</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary-container shrink-0" />
                  <span className="text-on-surface font-medium">35% Gas Hobi &amp; Ekskul</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container shrink-0" />
                  <span className="text-on-surface font-medium">20% Urusan Ujian &amp; Ortu</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
