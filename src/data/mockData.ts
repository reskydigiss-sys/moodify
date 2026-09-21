import { Song, CommunityPost, HopeNote, MoodDayData, CurhatMessage } from '../types';

export const INITIAL_SONGS: Song[] = [
  {
    id: 'track-1',
    title: 'Sudut Kamar & Hujan Rintik',
    artist: 'Naufal & The Blue Sofa',
    genre: 'Lo-Fi Ambient',
    duration: '03:42',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiAt2PRZR7EjBCz6pOqgSrGpMYpNMs7_Or-G7K-olPpnLZLlKDBKzsyf-WmCa4OvHmRqZKPX_6ZIAnHUPd2RXmJC6k04OOFjkJJVs0tEPt6FG8Zef0vfb9LNKB5MiQ4bYNtl-jm3q0WkzTgSNXdKVoiWW4jgLY_VsJMvtUbyudUrKBe-bqst_4u7eH8K_V-UI9UUl8Slksaf3rZ3LRVXUr9fxCQ2SIBbFy3cpjQgDtvDFR4Rl8P_LtiA',
    badge: '🌙 Overthinking Jam 11',
    reason: 'Chord pianonya berat tapi menenangkan. Pas banget didengerin sambil rebahan natap langit-langit kamar waktu ngerasa sendirian.',
  },
  {
    id: 'track-2',
    title: 'Minuman Dingin di Warung Mang Ujang',
    artist: 'Echoes of Friday',
    genre: 'Chill R&B Guitar',
    duration: '02:58',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjan_tzkT39a92BCzSm1pikuFNHYPGgkvTD5ElScDQOY18vZQXDYquYkGXruYqXw3NfjPkslNG4gN9XNx2xEzyIIufyej-vdZRgB8SxBZfBuhk9-vcnHZ147Es2vA0axJmnhhQtodit23TtUcsi3vsLN7hNM1LNFMUGIlq9xB06KP9rD6KdW4bRv2uiGINdL98WfO26K1DY5_IEzYFH6Cs2zYHTC2TzvnkeZCYdF46Fmgkf-0-SmJ3Jw',
    badge: '🏀 Capek Ekskul',
    reason: 'Ritme bass santai yang bikin otot bahu yang tegang langsung lemas rileks. Cocok pas lagi jalan kaki pulang sore.',
  },
  {
    id: 'track-3',
    title: 'Limit Break! Babak Final',
    artist: 'Tokyo Blue Shift',
    genre: 'J-Rock Hype Beat',
    duration: '03:15',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBp1fY3P2Qx-YE0VXZAsi59KJsrFukKYl7dt5WkWQmRQKqqCuuBiqLu960EgV7funJnfcztxQC_YNCZELQ1NUBrU6esekSOi03XWB7CBEJ4AxheS70kCi0_XuFqfd9gy5eW8FYoPJD5d3MYR1K8tajJpnSnxsoZyu_wUcBMaDmb4w4qAqmJsBunpbTyXbNKQlnzXSjRV3BLWGI0cnUhKiCALhliGyMRBHYdjngiKOMYHmP9-NKfNMqq-w',
    badge: '⚡ Anti Remedial',
    reason: 'Distorsi gitarnya langsung bikin rasa kantuk hilang! Cocok pas ngerjain 20 soal latihan matematika jam 9 malem.',
  },
  {
    id: 'track-4',
    title: 'Tak Lagi Naik Sepeda Berdua',
    artist: 'Arka Senandika',
    genre: 'Akustik Sendu',
    duration: '04:10',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0rz3ql10go6TFJICKp1EarPEEhL7Ozz0i1tDVin3O-sgebqCfTHU9jE8XIWDsqDClSuMeK_IXIsUmYxDOcA_7K0KByRlliQdfpouD3LvkUvzfk9eiQwigVCHKXnqPKntOD6tt9tiWh6TaBkKowo0YeYNBu3c-gaXuFBdk8bhNZQZn51w1_8IqBITNqeim_cydHCyLk7maN7SY5LKNqihP18qElE96IndLBCXJ14byNOn6x4ADz2FqHg',
    badge: '🌧️ Kecewa Sahabat',
    reason: 'Liriknya nggak menyalahkan siapa-siapa. Cuma memvalidasi kalau pertemanan cowok juga kadang ada fase canggungnya.',
  },
  {
    id: 'track-5',
    title: 'Here Comes The Sun',
    artist: 'The Beatles',
    genre: 'Pop Acoustic',
    duration: '03:05',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB441tQl9TW9Dyrq-jjrLqCbbJXXSZt4aOlO19oHH2V0_phN1X67Ttrj7JOFBHg0lRL4EPUWm3igT1QnDBzLOxIM13ACaS79JCEK4C99lMcSl1BLMELRbZS8XF5Fj5GSQ0iygOAUfR3dn8HzD5GWqaLjf9FtBYLAruus8nHVt0U7rjUaUSDm5pksFuaJe_yS6hLrit-ckFYD-GkqSnK_x-i-NloKxqezMB0LS2gMRQBKSaDII-oedksKw',
    reason: 'Biar kamu inget kalau mendung hari ini bakal lewat dan besok ada harapan baru yang hangat!',
  },
  {
    id: 'track-6',
    title: 'Drown',
    artist: 'Baekhyun',
    genre: 'Lo-fi Chill R&B',
    duration: '03:40',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgF8Bt2qtUP7KTZ_IpyVCF7vyFrpuMPXCRhIeAFoK2nw5H9HC-CEjv0KV7HqhSyzdv-6F3RKtoNRfkwEymHQx1zejvip9DSNiYyiHJ8HcPN76dLiP-O93pBpTc4hBRdRRYAZdST2Rn6-fwP8Xh7i9AInoTyc6lDuaRZV_LsOkoI72bSYhe2K2mwvRn1JN8GvL-ZZJfpXPbIMVVRZDY-acGnKmQ67xxxoF3FZP_Ze2asCQY4cM0XG2wpg',
    reason: 'Melodi lembutnya bantu nenangin detak jantung kamu yang lagi overthinking dan deg-degan.',
  },
  {
    id: 'track-7',
    title: 'Gajah',
    artist: 'Tulus',
    genre: 'Pop Indie Indonesia',
    duration: '04:00',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1_PLR05-QPX_KiB2-Jgra3eE6LD2NbFBrYAGkvDzBjIdDTiZNOABtdSJ7fUHXxkMxWa7jqNEdDhBpTOz8e4DlltJ1R1CRS78hfQjCpr4WrqvVXRN21EwHYmyEUdoO5-cCkzF-G8feIz3h7ebEzWVYLOP-J4rb-kZrzF9S9ys5raBJC6KO2T_F1-FEVR5riFMu2Xhxa_WkGvQGiOLwdxov0bBSFvvv7OJFGGCkhQeeS-j-dvenOAiqAQ',
    reason: 'Liriknya ingetin kamu seberapa tangguh dan berharganya dirimu walau lagi diremehin teman.',
  },
  {
    id: 'track-8',
    title: 'Spillways',
    artist: 'Ghost',
    genre: 'Rock Pop Energetic',
    duration: '03:16',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeSyTl-wikJ_8MXFjZJOUUcZrhXsaWSZeRtJymEZo2srrRamg1gchHHBFhCarGHpVLYxqRDtL3fiZCyKEPKYWBxCZf-jxl9bY0h7K-AcgZm5-4ysbeU4kGPQo8D0qTTQLFJ16e2eRFROeDb_lIZ3o9RQ0HeNbbbCeHQfN4XhhsJ14dK522npd8ZOsnj6Yt-yxBfrL4KJ-zUZGVo-m92qJDFGJMTnMUlZDB_3DYQJ8cvIBGAS_7xbn9Zg',
    reason: 'Beat drumnya asyik buat numpahin rasa unek-unek biar plong dan semangat bangkit lagi!',
  },
  {
    id: 'track-9',
    title: 'Runtuh (Lo-Fi Healing Ver.)',
    artist: 'Feby Putri, Fiersa Besari',
    genre: 'Acoustic Healing',
    duration: '03:50',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3M0zP_PiFiwynKJyRHIwkOVAqURMY87K-N5BEDTtR9IZEOuW9T1bYBPzCHI2e7K-asJZQ_-YlJ1Ct-qmkVDse6zSqwNdVlQUTBc8JhG9ArRL1WZQzFpgIOz20RH-oOPaMLWQPEP5M5HA6OLXI7KnFf9ElDVuIsTQJv6inOgeo0FYVUXnPOiaFB3V-Zff1NaiLz85AfcCpEyixsp9xegd4RnqWM5PpWcAXwKHZniPkbtm3ayGsfJiTIQ',
    badge: 'Validasi Tangis 🌧️',
    reason: 'Memberi ruang buat nangis sejenak tanpa takut dibilang cengeng.',
  },
  {
    id: 'track-10',
    title: 'Diri (Untuk Hari Beratmu)',
    artist: 'Tulus',
    genre: 'Pop Indonesia',
    duration: '03:32',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB8FSDGPdrk0L7ij76Uzkg-LQSb3bzS707idyovo-UE0FW5XYUpPQ20Td2nm98rRAA4EUqp_16RcI_-vNQrztB90mi_19-AjiDoCo6qyZg3u7Nj-nkBUWmM9GMM6sf3vTdCYtb0X392dIENDq_ldQyE2BMvT4IJaemZduZPG0qlNxI90OlhdaZqLl2YlaUJw9MyrT_Oyj-DoNV4aHWAz0r1YXOebVx1GlWBBr9-6aEx268l6IcYeyRjQ',
    badge: 'Peluk Diri Sendiri 🧸',
    reason: 'Mengingatkan bahwa kamu sudah berusaha sejauh ini dan kamu pantas berterima kasih pada dirimu.',
  },
  {
    id: 'track-11',
    title: 'Evaluasi (Tenang Jiwa)',
    artist: 'Hindia',
    genre: 'Indie Pop',
    duration: '03:25',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPJuZd5VI3KRa8SoWuRleftogFNqFCEBkv-EG9X5y1ubmWqKm4lwMri5FH-Nv8gtMKEL2xmW4SQwS4fw0Vsw1x-mGzfHMNVGfCsFvttW4BbQX6QlyF29ZGk8PyXC8RqIG0fUKMViLCEOIRZhW5YN9PC0EDoc4pwGeV4UYXBOTQ6_EipDUTxIzrnblHCJnHpJLqajpViRsbkWxULtlmlquDEdPsXYQEY079TeLt7b2uwrf8JxgVexuJxw',
    badge: 'Anti Overthinking 🎧',
    reason: 'Menemani jeda ketika semuanya terasa terlalu berisik dan menekan.',
  },
  {
    id: 'track-12',
    title: 'Secukupnya (Lo-fi Acoustic)',
    artist: 'Baskara Putra',
    genre: 'Lo-fi Acoustic',
    duration: '03:10',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL7pasRRCfNBMSL5G8qBmJBoFF0C4sMeBMow20sC5lXnESk8P7DdGjSOvEydGaoQTuA3KQlT3hmh2cVzKhWIqzkbQmKANyPZwyrBBzW-Nwba8RDH1wUBCdZdAmf_CO_Yf7wd2Y1lFJ_nC0R5Twnk9wmbnLhn1nXDWPxEyIwOoHcdWTuBrgFtyMcd2CSkD8xJsG0QgQJn9Wft_wOvBRORbWqekaP4IW4N9X5DmE1_ir26l9TXbsJiq9nQ',
    badge: 'Pelepas Beban ✨',
    reason: 'Kapan harus istirahat dan tidak memaksakan kesempurnaan.',
  },
  {
    id: 'track-13',
    title: 'Sorai',
    artist: 'Nadin Amizah',
    genre: 'Indie Folk',
    duration: '04:15',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcWKsk_akU7TzV8Xa6IyRByCvqUhgjWZLGXXtQtutO8A5J6z-JqrcfQWFbLhzp0jeepMAPRWF7jiiZrh8Xc6_BH3kA4Y8x7t9ndducLdXkNVeRN4W3ADMlZKnhsUqi73qeTBEZF3FUzhl24pyTdKCDtkG9hofe4a7xCfdH6LYPc5T-1E44bcvQAnTTJCzRZPW9zp1oiVpJp9GOekPNaJ6wXDqWD7ZrasJLJbU3YDjdgLYGVFkFBvyDrg',
    hugs: 1200,
  },
  {
    id: 'track-14',
    title: 'Stand Out Fit In',
    artist: 'ONE OK ROCK',
    genre: 'Rock Alternative',
    duration: '03:34',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4kdY7SbugDrFdVcHhlRerSJDEG82ewNxIN_CSAui-Y3yG4-7yqszUl2bzQCAXnzmiukyPaZxhc-HeSJqVFHi5S2feGwRvfA8pJZRJsqo24Haly-xUol8ESXeywbwoIHOVv0f_0lEMggvE7fXkP_qg_XAID5sOpR7qRILshATREbEt9TCc_NZbkKxMPkwk98FE-qA6N22KoiylGt-HAgPYX1ZOZvWiwcU7OJOl7wW6OmUnK_HaUnCL_g',
    hugs: 940,
  },
  {
    id: 'track-15',
    title: 'Tenang',
    artist: 'Yura Yunita',
    genre: 'Pop Ballad',
    duration: '04:02',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQcPcCu92jBxdiyTRyg19E9FMepxzjgOI5_Stk1kuv4dEtVGOEYG9rZTLzr9UJ_2Jr_XJq33AlwewqviQCwSz7at-cXFoyBT7f95JjsNevPMFk_hDgFVzPJ5Egi8EQ8_bCkmOyFMja2JgCGP-SheBcpiHQeEmOuckYDjNAxFy24FxcXj8b4BkjW0lFQaYytHwqH5KHDU8e0_yfqDT-9zlSv_Cu9DhYrKd0tc-3e2MRDQis844qUH8JSQ',
    hugs: 820,
  }
];

export const INITIAL_CURHAT_MESSAGES: CurhatMessage[] = [
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
    ]
  }
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    room: 'pink',
    author: 'KelinciPemalu_8A',
    grade: 'SMP Kelas 8',
    city: 'Bandung',
    timeAgo: '18 menit lalu',
    avatarIcon: '🌸',
    avatarBg: 'bg-primary-fixed',
    content: '"Susah banget adaptasi sama circle baru di kelas 8... Rasanya beda banget sama kawan-kawan kelas 7 kemarin yang seru bareng. Sekarang tiap jam istirahat suka bingung mau gabung ke mana. Rekomendasi lagunya Nadin Amizah ngebantu banget buat bikin hati lebih tenang dan gak overthinking!"',
    attachedSong: {
      title: 'Nadin Amizah - Semua Aku Dirayakan',
      artist: 'Nadin Amizah',
      subtext: 'Lagu penenang yang didengarkan saat menulis',
    },
    hugsCount: 48,
    hasUserHugged: false,
    comments: [
      {
        id: 'c1-1',
        author: 'BintangSabtu (Kelas 8, Jogja)',
        timeAgo: '10m lalu',
        text: 'Wajar banget kok ngerasa canggung di awal semester! Coba mulai ajak ngobrol satu teman sebangku pas tugas kelompok. Kamu gak aneh kok, pelan-pelan ya!',
        icon: '✨',
      },
      {
        id: 'c1-2',
        author: 'KakakSeniorBaik',
        timeAgo: '5m lalu',
        text: 'Rekomendasi lagu: Bernadya - Satu Bulan atau Kunto Aji - Rehat. Pas banget didengerin kalau lagi butuh pelukan suara. Semangat cantikk!',
        icon: '🎧',
      }
    ]
  },
  {
    id: 'post-2',
    room: 'blue',
    author: 'KiperGarisKeras',
    grade: 'SMP Kelas 9',
    city: 'Surabaya',
    timeAgo: '1 jam lalu',
    avatarIcon: '⚽',
    avatarBg: 'bg-secondary-fixed',
    content: '"Kemarin kalah tanding futsal antar kelas, padahal udah latihan keras sepulang sekolah tiap hari. Sempat nyesek dan nyalahin diri sendiri karena blunder di menit akhir... Tapi dengerin lagu ONE OK ROCK langsung dapet motivasi latihan lagi! Siap comeback semester depan 🔥 Ada rekomen lagu rock/j-rock lain yang beat-nya bertenaga gak guys?"',
    attachedSong: {
      title: 'ONE OK ROCK - We Are',
      artist: 'ONE OK ROCK',
      subtext: 'Mood booster kebangkitan & pantang menyerah',
    },
    hugsCount: 92,
    hasUserHugged: false,
    comments: [
      {
        id: 'c2-1',
        author: 'KaptenBasket_7',
        timeAgo: '42m lalu',
        text: 'Bro, kiper pro sekelas Neuer aja pernah blunder! Yang penting lu berani tanggung jawab di gawang. Putar lagu The Phoenix - Fall Out Boy pas pemanasan berikutnya!',
        icon: '🔥',
      }
    ]
  },
  {
    id: 'post-3',
    room: 'pink',
    author: 'AwanMendung7',
    grade: 'SMP Kelas 7',
    city: 'Semarang',
    timeAgo: '2 jam lalu',
    avatarIcon: '📚',
    avatarBg: 'bg-tertiary-fixed',
    content: '"Nilai matematika turun drastis, takut dimarahin ortu... Padahal minggu lalu udah belajar rumus aljabar sampai pusing. Kertas ulangan harus ditandatangani besok pagi, ada saran cara ngomongnya baik-baik tanpa bikin mama papa marah besar?"',
    hugsCount: 136,
    hasUserHugged: false,
    comments: [
      {
        id: 'c3-1',
        author: 'KakakKonselingMaya',
        timeAgo: '1j lalu',
        text: 'Halo! Coba ngomong pas suasana lagi santai (misal abis makan malam). Bilang gini: "Pa/Ma, nilai MTK kemarin belum maksimal, maaf ya. Aku udah coba belajar, boleh bantu cariin cara belajar yang lebih pas atau tanya guru?" Ortu biasanya lebih adem kalau kita tunjukin tekad mau perbaiki.',
        icon: '💡',
        isPeerHelper: true,
      }
    ]
  }
];

export const INITIAL_HOPE_NOTES: HopeNote[] = [
  {
    id: 'hope-1',
    text: '“Proud of myself udah bisa presentasi di depan kelas Biologi tanpa gemetaran! Kamu hebat, Dek!”',
    source: 'Catatan Guru & Teman',
    time: 'Rabu, 14:15',
    tag: '💖 12 Love',
    tagColor: 'bg-surface-container-lowest',
    emoji: '🎀',
    rotation: '-0.5deg',
    bgColor: 'bg-tertiary-fixed/40',
    textColor: 'text-on-tertiary-container',
    stickers: ['⭐', '🎀'],
  },
  {
    id: 'hope-2',
    text: '“Nggak apa-apa nilai ulangan matematika kemarin 65. Minggu depan kita belajar bareng lagi sama tim Moodify!”',
    source: 'Surat Buat Diri Sendiri',
    time: 'Selasa, 19:30',
    tag: '✨ Peluk Hangat',
    tagColor: 'bg-surface-container-lowest',
    emoji: '🧸',
    rotation: '0.8deg',
    bgColor: 'bg-secondary-fixed/50',
    textColor: 'text-on-secondary-container',
    stickers: ['🧸', '🎧'],
  }
];

export const WEEKLY_MOOD_DATA: MoodDayData[] = [
  { dayShort: 'Sen', dayFull: 'Senin', label: 'Chill', emoji: '😌', val: 55 },
  { dayShort: 'Sel', dayFull: 'Selasa', label: 'High!', emoji: '🥳', val: 92, isPeak: true },
  { dayShort: 'Rab', dayFull: 'Rabu', label: 'Melow', emoji: '🥺', val: 48 },
  { dayShort: 'Kam', dayFull: 'Kamis', label: 'Hari Ini', emoji: '🌧️', val: 28, isToday: true },
  { dayShort: 'Jum', dayFull: 'Jumat', label: 'Esok', emoji: '✨', val: 78 },
  { dayShort: 'Sab', dayFull: 'Sabtu', label: 'Libur', emoji: '🎧', val: 68 },
];
