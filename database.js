// === PUSAT DATA SAI ROOTS ===
// File ini akan di-update otomatis oleh admin_post.html

const sairootsDB = {
    // 1. DATA ARTIKEL
    articles: [
        {
            id: "reborn-riddim-launch",
            title: "Reborn Riddim Album Launch",
            category: "New Release",
            color: "green", // Opsi: green, yellow, red
            image: "/asset_gambar/reborn-riddim.jpg",
            excerpt: "Menyelami akar musik Jamaica yang dipadukan dengan realitas lokal Jombang.",
            date: "28 April 2026"
        },
        {
            id: "critical-fire-release",
            title: "Debut Album 'Critical Fire' Rilis Rapat",
            category: "Update",
            color: "yellow",
            image: "/asset_gambar/critical-fire.jpg",
            excerpt: "Album penuh pertama telah mendarat. Dengarkan pesan damai dan perlawanan dari akar rumput.",
            date: "31 Maret 2026"
        }
    ],

    // 2. DATA LIRIK
    lyrics: [
        {
            id: "propaganda",
            title: "Propaganda",
            category: "Roots",
            image: "/asset_gambar/propaganda.jpg",
            excerpt: "Potongan lirik asli dari lagu Propaganda..."
        },
        {
            id: "babylon-burn",
            title: "Babylon Burn",
            category: "Ska",
            image: "/asset_gambar/babylon-burn.jpg",
            excerpt: "Potongan lirik asli dari lagu Babylon Burn..."
        }
    ],

    // 3. DATA DISKOGRAFI
    discography: [
        {
            id: "reborn-riddim",
            title: "Reborn Riddim",
            category: "Single",
            image: "/asset_gambar/reborn-riddim.jpg",
            audio: "/discography/reborn-riddim.mp3",
            excerpt: "Single terbaru dengan sentuhan Roots Reggae yang khas."
        },
        {
            id: "critical-fire",
            title: "Critical Fire",
            category: "Album",
            image: "/asset_gambar/critical-fire.jpg",
            audio: "/discography/critical-fire.mp3",
            excerpt: "Album perdana yang menjadi titik awal pergerakan."
        }
    ]
};

// === DATA PENCARIAN GLOBAL (FUSE.JS) ===
// Mesin yang menggabungkan seluruh data di atas agar bisa dicari dari menu Hamburger
const searchData = [
    ...sairootsDB.articles.map(a => ({ type: "Article", title: a.title, url: `/article/${a.id}`, excerpt: a.excerpt, category: a.category })),
    ...sairootsDB.lyrics.map(l => ({ type: "Lyric", title: `${l.title} (Lyrics)`, url: `/lyric/${l.id}`, excerpt: l.excerpt, category: l.category })),
    ...sairootsDB.discography.map(d => ({ type: "Discography", title: d.title, url: `/discography/${d.id}`, excerpt: d.excerpt, category: d.category }))
];
