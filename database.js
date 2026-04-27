const sairootsDB = {
    "articles": [
        {
            "id": "sai-roots",
            "title": "Sai Roots ",
            "category": "orofil",
            "color": "green",
            "image": "/asset_gambar/sai-roots-1774957383-picsay.jpg",
            "excerpt": "",
            "date": "April 2026"
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

// === DATA PENCARIAN GLOBAL ===
const searchData = [
    ...sairootsDB.articles.map(function(a) { return { type: 'Article', title: a.title, url: '/article/' + a.id, excerpt: a.excerpt }; }),
    ...sairootsDB.lyrics.map(function(l) { return { type: 'Lyric', title: l.title + ' (Lyrics)', url: '/lyric/' + l.id, excerpt: l.excerpt }; }),
    ...sairootsDB.discography.map(function(d) { return { type: 'Discography', title: d.title, url: '/discography/' + d.id, excerpt: d.excerpt }; })
];
// === END DATA ===