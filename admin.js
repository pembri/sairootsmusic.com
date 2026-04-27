document.addEventListener('DOMContentLoaded', () => {
    const publishBtn = document.getElementById('publish-btn');
    const statusMsg = document.getElementById('status-msg');

    if (publishBtn) {
        publishBtn.addEventListener('click', async () => {
            // 1. Ambil Data dari Form
            const type = document.getElementById('post-type').value; // articles, music, atau lyrics
            const title = document.getElementById('post-title').value;
            const token = document.getElementById('gh-token').value;
            const content = quill.root.innerHTML; // Ambil isi dari Rich Editor
            
            // Data tambahan khusus musik
            const cover = document.getElementById('post-cover').value;
            const audio = document.getElementById('post-audio').value;

            // 2. Validasi Dasar (Anti-Eror)
            if (!title || !token || (type === 'music' && (!cover || !audio))) {
                showStatus("Wajib isi Judul, Token, dan Path File!", "error");
                return;
            }

            showStatus("Sedang memproses ke GitHub...", "success");

            try {
                // Konfigurasi Repository Lo
                const owner = "sairootsmusic";
                const repo = "sairootsmusic.com";
                const path = "data.json";

                // 3. Ambil data.json yang lama dulu (Wajib buat dapetin SHA)
                const getFileResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
                    headers: { "Authorization": `token ${token}` }
                });

                if (!getFileResponse.ok) throw new Error("Gagal ambil data.json lama atau Token salah!");
                
                const fileData = await getFileResponse.json();
                const sha = fileData.sha;
                const oldContent = JSON.parse(atob(fileData.content)); // Decode dari Base64

                // 4. Buat Object Data Baru
                const newId = Date.now().toString(); // Generate ID unik pakai timestamp
                let newItem = {
                    id: newId,
                    title: title,
                    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
                };

                if (type === 'articles') {
                    newItem.image = "img/default-article.jpg"; // Nanti bisa lo sesuaikan path-nya
                    newItem.excerpt = quill.getText().substring(0, 100) + "..."; // Potongan teks buat preview
                    newItem.content = content;
                } else if (type === 'music') {
                    newItem.type = "Single";
                    newItem.year = new Date().getFullYear().toString();
                    newItem.cover = cover;
                    newItem.file = audio;
                    newItem.description = content;
                } else if (type === 'lyrics') {
                    newItem.song_title = title;
                    newItem.text = content;
                }

                // 5. Masukkan data baru ke urutan paling atas (Terbaru)
                oldContent[type].unshift(newItem);

                // 6. Push balik ke GitHub (Update data.json)
                const updateResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `token ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        message: `Add new ${type}: ${title}`,
                        content: btoa(unescape(encodeURIComponent(JSON.stringify(oldContent, null, 2)))), // Encode ke Base64
                        sha: sha
                    })
                });

                if (updateResponse.ok) {
                    showStatus(`BERHASIL! ${title} sudah terbit di website.`, "success");
                    // Reset Form
                    document.getElementById('post-title').value = '';
                    quill.setContents([]);
                } else {
                    throw new Error("Gagal update data ke GitHub!");
                }

            } catch (err) {
                showStatus("Eror: " + err.message, "error");
                console.error(err);
            }
        });
    }

    function showStatus(msg, type) {
        statusMsg.innerText = msg;
        statusMsg.style.display = "block";
        statusMsg.className = "status-msg " + type;
    }
});
