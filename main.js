document.addEventListener('DOMContentLoaded', () => {
    /* --- 1. KONSISTENSI NAVIGASI & HAMBURGER --- */
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('global-search');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Ganti icon bars jadi X pas menu buka
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Tutup menu kalau klik di luar area menu
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });

    /* --- 2. FITUR SEARCH GLOBAL --- */
    const performSearch = () => {
        const query = searchInput.value.trim().toLowerCase();
        if (query) {
            // Arahkan ke halaman search atau filter (nanti bisa dikembangkan lebih dalam)
            window.location.href = `article.html?search=${encodeURIComponent(query)}`;
        }
    };

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }

    /* --- 3. AUTO-FETCH DATA (ANTI-EROR) --- */
    // Fungsi untuk memuat konten ke halaman Index/Article/Discography
    const loadContent = async () => {
        try {
            const response = await fetch('data.json');
            if (!response.ok) throw new Error("Gagal mengambil data.json");
            const data = await response.json();

            // A. Tampilkan Musik di Discography atau Index Preview
            const musicPreview = document.getElementById('music-preview');
            const discoContainer = document.getElementById('disco-container');
            const targetMusic = discoContainer || musicPreview;

            if (targetMusic && data.music) {
                targetMusic.innerHTML = ''; // Hapus loading
                const musicList = discoContainer ? data.music : data.music.slice(0, 3); // Di Index cuma tampil 3
                
                musicList.forEach(item => {
                    targetMusic.innerHTML += `
                        <div class="album-card">
                            <div class="album-cover" style="background-image: url('${item.cover}');">
                                <div class="play-btn-overlay" onclick="playMusic('${item.file}', '${item.title}')">
                                    <i class="fas fa-play-circle"></i>
                                </div>
                            </div>
                            <div class="album-info">
                                <h3>${item.title}</h3>
                                <p>${item.type} • ${item.year}</p>
                            </div>
                        </div>
                    `;
                });
            }

            // B. Tampilkan Artikel di Index atau Halaman Article
            const articlePreview = document.getElementById('article-preview');
            const featuredPost = document.getElementById('featured-post');
            
            if (featuredPost && data.articles && data.articles.length > 0) {
                const latest = data.articles[0];
                featuredPost.innerHTML = `
                    <div class="hero-card" style="background-image: linear-gradient(rgba(0,0,0,0.5), var(--bg-black)), url('${latest.image}');">
                        <div class="hero-content">
                            <span class="tag">LATEST POST</span>
                            <h1>${latest.title}</h1>
                            <p>${latest.excerpt}</p>
                            <a href="article.html?id=${latest.id}" class="btn-read">BACA SELENGKAPNYA</a>
                        </div>
                    </div>
                `;
            }

            if (articlePreview && data.articles) {
                articlePreview.innerHTML = '';
                const articlesToShow = articlePreview.id === 'article-preview' ? data.articles.slice(0, 3) : data.articles;
                
                articlesToShow.forEach(art => {
                    articlePreview.innerHTML += `
                        <div class="article-card">
                            <img src="${art.image}" alt="${art.title}">
                            <div class="article-info">
                                <h3>${art.title}</h3>
                                <p>${art.date}</p>
                                <a href="article.html?id=${art.id}">Baca Artikel...</a>
                            </div>
                        </div>
                    `;
                });
            }

        } catch (error) {
            console.error("System Error:", error);
        }
    };

    loadContent();
});

/* --- 4. GLOBAL MUSIC PLAYER --- */
function playMusic(src, title) {
    const player = document.getElementById('music-player');
    const audio = document.getElementById('main-audio');
    const titleDisplay = document.getElementById('now-playing-title');
    
    if(player && audio) {
        player.classList.add('active-player');
        audio.src = src;
        titleDisplay.innerText = "Playing: " + title;
        audio.play();
    }
}
