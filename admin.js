document.addEventListener('DOMContentLoaded', () => {
    const publishBtn = document.getElementById('publish-btn');
    const statusMsg = document.getElementById('status-msg');

    publishBtn.addEventListener('click', async () => {
        const type = document.getElementById('post-type').value;
        const title = document.getElementById('post-title').value;
        const token = document.getElementById('gh-token').value;
        const content = quill.root.innerHTML;
        const fileCover = document.getElementById('file-cover').files[0];
        const fileAudio = document.getElementById('file-audio').files[0];

        if (!title || !token) return alert("Isi judul dan token!");

        publishBtn.disabled = true;
        showStatus("Memproses... Jangan tutup halaman ini.", "success");

        try {
            const owner = "sairootsmusic";
            const repo = "sairootsmusic.com";
            let coverPath = "img/default-thumb.jpg";
            let audioPath = "";

            // 1. Upload Gambar
            if (fileCover) {
                coverPath = `img/${Date.now()}-${fileCover.name.replace(/\s/g, '-')}`;
                await uploadToGithub(owner, repo, coverPath, fileCover, token);
            }

            // 2. Upload Audio (Jika Musik)
            if (type === 'music' && fileAudio) {
                audioPath = `mp3/${Date.now()}-${fileAudio.name.replace(/\s/g, '-')}`;
                await uploadToGithub(owner, repo, audioPath, fileAudio, token);
            }

            // 3. Update data.json
            const getFile = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/data.json`, {
                headers: { "Authorization": `token ${token}` }
            });
            const fileData = await getFile.json();
            const db = JSON.parse(atob(fileData.content));

            const newItem = {
                id: Date.now().toString(),
                title: title,
                date: new Date().toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})
            };

            if (type === 'articles') {
                newItem.image = coverPath;
                newItem.content = content;
                newItem.excerpt = quill.getText().substring(0, 100) + "...";
            } else if (type === 'music') {
                newItem.cover = coverPath;
                newItem.file = audioPath;
                newItem.description = content;
                newItem.year = new Date().getFullYear().toString();
            } else if (type === 'lyrics') {
                newItem.song_title = title;
                newItem.text = content;
            }

            db[type].unshift(newItem);

            const updateRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/data.json`, {
                method: "PUT",
                headers: { "Authorization": `token ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: `New post: ${title}`,
                    content: btoa(unescape(encodeURIComponent(JSON.stringify(db, null, 2)))),
                    sha: fileData.sha
                })
            });

            if (updateRes.ok) {
                showStatus("MANTAP! Konten & File Berhasil Terbit.", "success");
                document.getElementById('post-title').value = "";
                quill.setContents([]);
            }

        } catch (err) {
            showStatus("Gagal: " + err.message, "error");
        } finally {
            publishBtn.disabled = false;
        }
    });

    async function uploadToGithub(owner, repo, path, file, token) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const base64 = reader.result.split(',')[1];
                const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
                    method: "PUT",
                    headers: { "Authorization": `token ${token}`, "Content-Type": "application/json" },
                    body: JSON.stringify({ message: `Upload file: ${path}`, content: base64 })
                });
                if (res.ok) resolve(); else reject(new Error("Gagal upload file"));
            };
        });
    }

    function showStatus(msg, cls) {
        statusMsg.innerText = msg;
        statusMsg.className = "status-msg " + cls;
        statusMsg.style.display = "block";
    }
});
