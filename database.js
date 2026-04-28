// === PUSAT DATA SAI ROOTS ===
// File ini akan di-update otomatis oleh admin_post.html

const sairootsDB = {
    // 1. DATA ARTIKEL
    articles: [],

    // 2. DATA LIRIK
    lyrics: [],

    // 3. DATA DISKOGRAFI
    discography: []
};

// === DATA PENCARIAN GLOBAL (FUSE.JS) ===
// Mesin yang menggabungkan seluruh data di atas agar bisa dicari dari menu Hamburger
const searchData = [
    ...sairootsDB.articles.map(a => ({ type: "Article", title: a.title, url: `/article/${a.id}`, excerpt: a.excerpt, category: a.category })),
    ...sairootsDB.lyrics.map(l => ({ type: "Lyric", title: `${l.title} (Lyrics)`, url: `/lyric/${l.id}`, excerpt: l.excerpt, category: l.category })),
    ...sairootsDB.discography.map(d => ({ type: "Discography", title: d.title, url: `/discography/${d.id}`, excerpt: d.excerpt, category: d.category }))
];
