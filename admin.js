// VARIABEL REPOSITORY (WAJIB BENER)
const owner = "pembri"; 
const repo = "sairootsmusic.com";
const dbPath = "data.json";

let currentData = null;
let currentSha = null;

document.addEventListener('DOMContentLoaded', () => {
    console.log("Admin JS Ready for owner: " + owner);
    loadData();

    const publishBtn = document.getElementById('publish-btn');
    if (publishBtn) {
        publishBtn.addEventListener('click', handlePublish);
    }
});

// 1. Ambil data dari GitHub saat halaman dibuka
async function loadData() {
    const listDiv = document.getElementById('manage-list');
    try {
        // Tambahkan timestamp biar nggak kena cache browser
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${dbPath}?t=${Date.now()}`);
        
        if (!res.ok) throw new Error("File data.json tidak ditemukan di repo pembri/sairootsmusic.com");
        
        const file = await res.json();
        currentSha = file.sha;
        currentData = JSON.parse(atob(file.content));
        renderList();
    } catch (e) {
        console.error(e);
        listDiv.innerHTML = `<p style="color:var(--reggae-red)">Error: ${e.message}. <br>Pastikan file data.json sudah ada di root repository lo.</p>`;
    }
}

// 2. Tampilkan daftar konten untuk Edit/Hapus
function renderList() {
    const listDiv = document.getElementById('manage-list');
    listDiv.innerHTML = "";
    if (!currentData) return;

    ["articles", "music", "lyrics"].forEach(type => {
        if (currentData[type]) {
            currentData[type].forEach(item => {
                const row = document.createElement('div');
                row.className = "post-list-item";
                row.innerHTML = `
                    <div><strong>[${type.toUpperCase()}]</strong> ${item.title || item.song_title}</div>
                    <div class="post-actions">
                        <button onclick="editItem('${type}', '${item.id}')" class="btn-edit-icon" title="Edit"><i class="fas fa-edit"></i></button>
                        <button onclick="deleteItem('${type}', '${item.id}')" class="btn-del-icon" title="Hapus"><i class="fas fa-trash"></i></button>
                    </div>
                `;
                listDiv.appendChild(row);
            });
        }
    });
}

// 3. Fungsi Utama Publish/Update
async function handlePublish() {
    const token = document.getElementById('gh-token').value;
    const id = document.getElementById('edit-id').value;
    const type = document.getElementById('post-type').value;
    const title = document.getElementById('post-title').value;

    if (!token) return alert("TOKEN GITHUB WAJIB DIISI!");
    if (!title) return alert("JUDUL WAJIB DIISI!");

    showStatus("Sedang menyambungkan ke repository pembri...", "success");

    const newItem = {
        id: id || Date.now().toString(),
        date: new Date().toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})
    };

    if (type === 'articles') {
        newItem.title = title;
        newItem.image = document.getElementById('post-image').value || "img/default.jpg";
        newItem.content = quill.root.innerHTML;
        newItem.excerpt = quill.getText().substring(0, 100) + "...";
    } else if (type === 'music') {
        newItem.title = title;
        newItem.cover = document.getElementById('post-image').value || "img/default.jpg";
        newItem.file = document.getElementById('post-audio').value;
        newItem.description = quill.root.innerHTML;
        newItem.year = new Date().getFullYear().toString();
        newItem.type = "Single"; // Default
    } else if (type === 'lyrics') {
        newItem.song_title = title;
        newItem.text = quill.root.innerHTML;
    }

    if (id) {
        const index = currentData[type].findIndex(i => i.id === id);
        if (index !== -1) currentData[type][index] = newItem;
    } else {
        currentData[type].unshift(newItem);
    }

    await sendToGithub(id ? `Update ${type}: ${title}` : `Add ${type}: ${title}`, token);
}

// 4. Fungsi Kirim Data ke API GitHub
async function sendToGithub(commitMsg, token) {
    try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${dbPath}`, {
            method: "PUT",
            headers: { 
                "Authorization": `token ${token}`,
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                message: commitMsg,
                content: btoa(unescape(encodeURIComponent(JSON.stringify(currentData, null, 2)))),
                sha: currentSha
            })
        });

        if (res.ok) {
            alert("MANTAP! Data berhasil diupdate di repo pembri.");
            location.reload(); 
        } else {
            const errData = await res.json();
            throw new Error(errData.message);
        }
    } catch (e) {
        alert("GAGAL: " + e.message);
        showStatus("Gagal: " + e.message, "error");
    }
}

// Ekspos fungsi ke Window agar bisa dipanggil dari onclick HTML
window.editItem = function(type, id) {
    const item = currentData[type].find(i => i.id === id);
    if (!item) return;

    document.getElementById('form-title').innerText = "Mode Edit: " + (item.title || item.song_title);
    document.getElementById('edit-id').value = id;
    document.getElementById('post-type').value = type;
    document.getElementById('post-title').value = item.title || item.song_title;
    document.getElementById('post-image').value = item.image || item.cover || "";
    document.getElementById('post-audio').value = item.file || "";
    quill.root.innerHTML = item.content || item.description || item.text || "";
    
    document.getElementById('audio-group').style.display = (type === 'music') ? 'block' : 'none';
    window.scrollTo({top: 0, behavior: 'smooth'});
};

window.deleteItem = async function(type, id) {
    if (!confirm("Yakin mau hapus konten ini dari repo pembri?")) return;
    const token = document.getElementById('gh-token').value;
    if (!token) return alert("Isi Token GitHub dulu buat hapus!");

    currentData[type] = currentData[type].filter(i => i.id !== id);
    await sendToGithub("Delete Post", token);
};

function showStatus(msg, cls) {
    const status = document.getElementById('status-msg');
    status.style.display = "block";
    status.innerText = msg;
    status.className = "status-msg " + cls;
}
