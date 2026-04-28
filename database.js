// === PUSAT DATA SAI ROOTS ===
// File ini akan di-update otomatis oleh admin_post.html

const sairootsDB = {
    "articles": [
        {
            "id": "profil-sai-roots",
            "title": "Profil SAI Roots",
            "category": "Article",
            "image": "/asset_gambar/sairoots.jpg",
            "excerpt": "Proyek Musik Independen",
            "color": "green",
            "date": "28 April 2026"
        }
    ],
    "lyrics": [
        {
            "id": "lirik-skank-patrol",
            "title": "Lirik Skank Patrol",
            "category": "Album - Critical Fire",
            "image": "/asset_gambar/art-critical-fire.jpg",
            "excerpt": ""
        },
        {
            "id": "lirik-roots-medication",
            "title": "Lirik Roots Medication",
            "category": "Album - Critical Fire",
            "image": "/asset_gambar/default.jpg",
            "excerpt": ""
        },
        {
            "id": "lirik-ormas-tipu-tipu",
            "title": "Lirik Ormas Tipu-tipu",
            "category": "Album - Critical Fire",
            "image": "/asset_gambar/default.jpg",
            "excerpt": ""
        },
        {
            "id": "lirik-jamaican-sound",
            "title": "Lirik Jamaican Sound",
            "category": "Album - Critical Fire",
            "image": "/asset_gambar/default.jpg",
            "excerpt": ""
        },
        {
            "id": "lirik-irama-hidup",
            "title": "Lirik Irama Hidup",
            "category": "Album - Critical Fire",
            "image": "/asset_gambar/default.jpg",
            "excerpt": ""
        },
        {
            "id": "lirik-evaluasi-lagi",
            "title": "Lirik Evaluasi Lagi",
            "category": "Album - Critical Fire",
            "image": "/asset_gambar/default.jpg",
            "excerpt": ""
        },
        {
            "id": "lirik-blaze-it-up",
            "title": "Lirik Blaze It Up",
            "category": "Album - Critical Fire",
            "image": "/asset_gambar/default.jpg",
            "excerpt": ""
        },
        {
            "id": "lirik-bayang-singgasana",
            "title": "Lirik Bayang Singgasana",
            "category": "Album - Critical Fire",
            "image": "/asset_gambar/default.jpg",
            "excerpt": ""
        },
        {
            "id": "lirik-propaganda",
            "title": "Lirik Propaganda",
            "category": "Album - Critical Fire",
            "image": "/asset_gambar/default.jpg",
            "excerpt": ""
        },
        {
            "id": "babylon-burn",
            "title": "Lirik Babylon Burn",
            "category": "Album - Critical Fire",
            "image": "/asset_gambar/default.jpg",
            "excerpt": ""
        },
        {
            "id": "lirik-timpang",
            "title": "Lirik Timpang",
            "category": "Single",
            "image": "/asset_gambar/default.jpg",
            "excerpt": ""
        },
        {
            "id": "lirik-genjer-hijau",
            "title": "Lirik Genjer Hijau",
            "category": "Single",
            "image": "/asset_gambar/default.jpg",
            "excerpt": ""
        },
        {
            "id": "lirik-kasih-mengalun",
            "title": "Lirik Kasih Mengalun",
            "category": "Single",
            "image": "/asset_gambar/default.jpg",
            "excerpt": ""
        },
        {
            "id": "lirik-dari-jauh",
            "title": "Lirik Dari Jauh",
            "category": "Single",
            "image": "/asset_gambar/default.jpg",
            "excerpt": ""
        },
        {
            "id": "lirik-jurus-liar",
            "title": "Lirik Jurus Liar",
            "category": "Single",
            "image": "/asset_gambar/default.jpg",
            "excerpt": ""
        },
        {
            "id": "lirik-eksploitasi",
            "title": "Lirik Eksploitasi",
            "category": "Single",
            "image": "/asset_gambar/default.jpg",
            "excerpt": ""
        },
        {
            "id": "lirik-senandung-manis",
            "title": "Lirik Senandung Manis",
            "category": "Single",
            "image": "/asset_gambar/default.jpg",
            "excerpt": ""
        },
        {
            "id": "lirik-drama-klenik",
            "title": "Lirik Drama Klenik",
            "category": "Single",
            "image": "/asset_gambar/default.jpg",
            "excerpt": ""
        }
    ],
    "discography": [
        {
            "id": "drama-klenik",
            "title": "Drama Klenik",
            "category": "Single",
            "image": "/asset_gambar/default.jpg",
            "excerpt": "",
            "audio": "/discography/drama-klenik.mp3"
        }
    ]
};

// === DATA PENCARIAN GLOBAL (FUSE.JS) ===
const searchData = [
    ...sairootsDB.articles.map(a => ({ type: "Article", title: a.title, url: `/article/${a.id}`, excerpt: a.excerpt, category: a.category })),
    ...sairootsDB.lyrics.map(l => ({ type: "Lyric", title: `${l.title} (Lyrics)`, url: `/lyric/${l.id}`, excerpt: l.excerpt, category: l.category })),
    ...sairootsDB.discography.map(d => ({ type: "Discography", title: d.title, url: `/discography/${d.id}`, excerpt: d.excerpt, category: d.category }))
];