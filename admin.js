const owner = "pembri"; 
const repo = "sairootsmusic.com";
const dbPath = "data.json";

let currentData = null;
let currentSha = null;

document.addEventListener('DOMContentLoaded', () => {
    console.log("Admin JS Terhubung ke Repo pembri");
    loadData();

    const btn = document.getElementById('publish-btn');
    if (btn) { btn.addEventListener('click', handlePublish); }
});

async function loadData() {
    const listDiv = document.getElementById('manage-list');
    try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${dbPath}?t=${Date.now()}`);
        if (!res.ok) throw new Error("File data.json tidak ditemukan!");
        
        const file = await res.json();
        currentSha = file.sha;
        currentData = JSON.parse(atob(file.content));
        renderList();
    } catch (e) {
        listDiv.innerHTML = `<p style="color:red">Gagal Load: ${e.message}</p>`;
    }
}

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
                        <button onclick="editItem('${type}', '${item.id}')" style="color:#00ff00"><i class="fas fa-edit"></i></button>
                        <button onclick="deleteItem('${type}', '${item.id}')" style="color:#ff0000"><i class="fas fa-trash"></i></button>
                    </div>
                `;
                listDiv.appendChild(row);
            });
        }
    });
}

async function handlePublish() {
    const token = document.getElementById('gh-token').value;
    const id = document.getElementById('edit-id').value;
    const type = document.getElementById('post-type').value;
    const title = document.getElementById('post-title').value;

    if (!token || !title) return alert("Token & Judul Wajib Isi!");

    showStatus("Sedang mengirim data...", "success");

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
    } else if (type === 'lyrics') {
        newItem.song_title = title;
        newItem.text = quill.root.innerHTML;
    }

    if (id) {
        const idx = currentData[type].findIndex(i => i.id === id);
        if (idx !== -1) currentData[type][idx] = newItem;
    } else {
        currentData[type].unshift(newItem);
    }

    await sendUpdate(id ? "Update Post" : "Add Post", token);
}

async function sendUpdate(msg, token) {
    try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${dbPath}`, {
            method: "PUT",
            headers: { "Authorization": `token ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                message: msg,
                content: btoa(unescape(encodeURIComponent(JSON.stringify(currentData, null, 2)))),
                sha: currentSha
            })
        });

        if (res.ok) {
            alert("SUKSES!");
            location.reload();
        } else {
            const err = await res.json();
            alert("GAGAL: " + err.message);
        }
    } catch (e) {
        alert("ERROR: " + e.message);
    }
}

// Fungsi Window agar bisa diakses HTML
window.editItem = function(type, id) {
    const item = currentData[type].find(i => i.id === id);
    document.getElementById('edit-id').value = id;
    document.getElementById('post-type').value = type;
    document.getElementById('post-title').value = item.title || item.song_title;
    document.getElementById('post-image').value = item.image || item.cover || "";
    document.getElementById('post-audio').value = item.file || "";
    quill.root.innerHTML = item.content || item.description || item.text || "";
    document.getElementById('audio-group').style.display = (type === 'music') ? 'block' : 'none';
    window.scrollTo(0,0);
};

window.deleteItem = async function(type, id) {
    if (!confirm("Hapus ini?")) return;
    const token = document.getElementById('gh-token').value;
    if (!token) return alert("Butuh Token!");
    currentData[type] = currentData[type].filter(i => i.id !== id);
    await sendUpdate("Delete Post", token);
};

function showStatus(msg, cls) {
    const s = document.getElementById('status-msg');
    s.style.display = "block"; s.innerText = msg; s.className = "status-msg " + cls;
}
