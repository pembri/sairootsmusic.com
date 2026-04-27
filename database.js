// === PUSAT DATA SAI ROOTS ===
// File ini akan di-update otomatis oleh admin_post.html

const sairootsDB = {
    "articles": [
        {
            "id": "critical-fire-release",
            "title": "Debut Album 'Critical Fire' Rilis Rapat",
            "category": "Update",
            "color": "yellow",
            "image": "/asset_gambar/critical-fire.jpg",
            "excerpt": "Album penuh pertama telah mendarat. Dengarkan pesan damai dan perlawanan dari akar rumput.",
            "date": "31 Maret 2026"
        }
    ],
    "lyrics": [
        {
            "id": "babylon-burn",
            "title": "Babylon Burn",
            "category": "Ska",
            "image": "/asset_gambar/babylon-burn.jpg",
            "excerpt": "Potongan lirik asli dari lagu Babylon Burn..."
        }
    ],
    "discography": []
};

// === DATA PENCARIAN GLOBAL (FUSE.JS) ===
const searchData = [
    ...sairootsDB.articles.map(a => ({ type: "Article", title: a.title, url: `/article/${a.id}`, excerpt: a.excerpt, category: a.category })),
    ...sairootsDB.lyrics.map(l => ({ type: "Lyric", title: `${l.title} (Lyrics)`, url: `/lyric/${l.id}`, excerpt: l.excerpt, category: l.category })),
    ...sairootsDB.discography.map(d => ({ type: "Discography", title: d.title, url: `/discography/${d.id}`, excerpt: d.excerpt, category: d.category }))
];