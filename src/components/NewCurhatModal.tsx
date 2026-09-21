import React, { useState } from 'react';
import { CommunityPost } from '../types';

interface NewCurhatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPost: (post: CommunityPost) => void;
}

export const NewCurhatModal: React.FC<NewCurhatModalProps> = ({
  isOpen,
  onClose,
  onAddPost,
}) => {
  const [alias, setAlias] = useState('');
  const [grade, setGrade] = useState('SMP Kelas 8');
  const [city, setCity] = useState('Jakarta');
  const [room, setRoom] = useState<'pink' | 'blue'>('pink');
  const [content, setContent] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🌸');

  if (!isOpen) return null;

  const emojiOptions = ['🌸', '✨', '🎧', '⚽', '🌧️', '🧸', '🚀', '🎨'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      room,
      author: alias.trim() ? alias.trim() : `Anonim_${Math.floor(Math.random() * 900 + 100)}`,
      grade,
      city,
      timeAgo: 'Baru saja',
      avatarIcon: selectedEmoji,
      avatarBg: room === 'pink' ? 'bg-primary-fixed' : 'bg-secondary-fixed',
      content: `"${content.trim()}"`,
      attachedSong: songTitle.trim()
        ? {
            title: songTitle.trim(),
            artist: 'Lagu Pilihan Penulis',
            subtext: 'Lagu penenang yang direkomendasikan',
          }
        : undefined,
      hugsCount: 1,
      hasUserHugged: false,
      comments: [],
    };

    onAddPost(newPost);
    setContent('');
    setSongTitle('');
    setAlias('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-surface rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-surface-container relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">💌</span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
            Tulis Cerita Anonim Kamu
          </h3>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
          Identitasmu aman. Cerita ini akan dibaca oleh ribuan teman SMP yang siap saling mendukung!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Room Selector */}
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
              Pilih Ruang Cerita
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRoom('pink')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  room === 'pink'
                    ? 'bg-primary-fixed border-primary text-on-primary-fixed-variant shadow-sm'
                    : 'bg-surface-container-low border-surface-container text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <span>🌸 Pink Room</span>
                <span className="text-[10px] opacity-75 font-normal">(Sahabat &amp; Baper)</span>
              </button>

              <button
                type="button"
                onClick={() => setRoom('blue')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  room === 'blue'
                    ? 'bg-secondary-fixed border-secondary text-on-secondary-fixed-variant shadow-sm'
                    : 'bg-surface-container-low border-surface-container text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <span>🌊 Ocean Room</span>
                <span className="text-[10px] opacity-75 font-normal">(Hobi &amp; Ekskul)</span>
              </button>
            </div>
          </div>

          {/* Alias & Emoji */}
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <label className="block text-xs font-bold text-on-surface-variant mb-1">
                Nama Samaran (Alias)
              </label>
              <input
                type="text"
                placeholder="Contoh: BintangSenja_8B"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-surface-container-low border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary text-on-surface"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">
                Ikon Avatar
              </label>
              <div className="flex gap-1 overflow-x-auto py-1 scrollbar-none">
                {emojiOptions.slice(0, 4).map((em) => (
                  <button
                    key={em}
                    type="button"
                    onClick={() => setSelectedEmoji(em)}
                    className={`w-8 h-8 rounded-lg text-sm flex items-center justify-center border transition-all ${
                      selectedEmoji === em ? 'border-primary bg-primary-fixed scale-110' : 'border-surface-container'
                    }`}
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grade & City */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">
                Tingkat Kelas
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-surface-container-low border border-surface-container focus:outline-none text-on-surface"
              >
                <option value="SMP Kelas 7">SMP Kelas 7</option>
                <option value="SMP Kelas 8">SMP Kelas 8</option>
                <option value="SMP Kelas 9">SMP Kelas 9</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">
                Kota / Asal
              </label>
              <input
                type="text"
                placeholder="Misal: Bandung"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-surface-container-low border border-surface-container focus:outline-none text-on-surface"
              />
            </div>
          </div>

          {/* Story Textarea */}
          <div>
            <label className="block text-xs font-bold text-on-surface-variant mb-1">
              Isi Curhatan Kamu
            </label>
            <textarea
              rows={3}
              required
              placeholder="Ceritakan unek-unekmu di sini... Tentang tugas, pertemanan, atau hari yang berat..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-surface-container-low border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary text-on-surface resize-none"
            />
          </div>

          {/* Attached song */}
          <div>
            <label className="block text-xs font-bold text-on-surface-variant mb-1">
              Lagu yang Lagi Mewakili Perasaanmu (Opsional)
            </label>
            <input
              type="text"
              placeholder="Contoh: Nadin Amizah - Rayuan Perempuan Gila"
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-surface-container-low border border-surface-container focus:outline-none text-on-surface"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-sm text-tertiary">lock</span>
              <span>100% Bebas Bullying</span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs rounded-xl hover:bg-surface-container text-on-surface-variant font-semibold"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs rounded-xl bg-primary text-on-primary font-bold shadow hover:bg-primary-container transition-all"
              >
                Posting Cerita ✨
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
