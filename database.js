// === PUSAT DATA SAI ROOTS ===
// File ini akan di-update otomatis oleh admin_post.html

const sairootsDB = {
    "articles": [
        {
            "id": "sai-roots",
            "title": "Sai Roots ",
            "category": "orofil",
            "image": "/asset_gambar/sai-roots-6ffa4b5b14104e7fbb3f823773e99ff4.png",
            "excerpt": "",
            "color": "green",
            "date": "28 April 2026"
        },
        {
            "id": "critical-fire-release",
            "title": "Debut Album 'Critical Fire' Rilis Rapat",
            "category": "Update",
            "image": "/asset_gambar/critical-fire-release-152733.jpg",
            "excerpt": "Album penuh pertama telah mendarat. Dengarkan pesan damai dan perlawanan dari akar rumput.",
            "color": "yellow",
            "date": "31 Maret 2026"
        }
    ],
    "lyrics": [],
    "discography": []
};

// === DATA PENCARIAN GLOBAL (FUSE.JS) ===
const searchData = [
    ...sairootsDB.articles.map(a => ({ type: "Article", title: a.title, url: `/article/${a.id}`, excerpt: a.excerpt, category: a.category })),
    ...sairootsDB.lyrics.map(l => ({ type: "Lyric", title: `${l.title} (Lyrics)`, url: `/lyric/${l.id}`, excerpt: l.excerpt, category: l.category })),
    ...sairootsDB.discography.map(d => ({ type: "Discography", title: d.title, url: `/discography/${d.id}`, excerpt: d.excerpt, category: d.category }))
];