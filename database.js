// === PUSAT DATA SAI ROOTS ===
// File ini akan di-update otomatis oleh admin_post.html

const sairootsDB = {
    "articles": [],
    "lyrics": [],
    "discography": []
};

// === DATA PENCARIAN GLOBAL (FUSE.JS) ===
const searchData = [
    ...sairootsDB.articles.map(a => ({ type: "Article", title: a.title, url: `/article/${a.id}`, excerpt: a.excerpt, category: a.category })),
    ...sairootsDB.lyrics.map(l => ({ type: "Lyric", title: `${l.title} (Lyrics)`, url: `/lyric/${l.id}`, excerpt: l.excerpt, category: l.category })),
    ...sairootsDB.discography.map(d => ({ type: "Discography", title: d.title, url: `/discography/${d.id}`, excerpt: d.excerpt, category: d.category }))
];