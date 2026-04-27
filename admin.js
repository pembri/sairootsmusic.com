const owner = "sairootsmusic";
const repo = "sairootsmusic.com";
const dbPath = "data.json";
let currentData = null;
let currentSha = null;

document.addEventListener('DOMContentLoaded', loadData);

async function loadData() {
    try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${dbPath}`);
        const file = await res.json();
        currentSha = file.sha;
        currentData = JSON.parse(atob(file.content));
        renderList();
    } catch (e) { console.error("Gagal load data", e); }
}

function renderList() {
    const listDiv = document.getElementById('manage-list');
    listDiv.innerHTML = "";
    ["articles", "music", "lyrics"].forEach(type => {
        currentData[type].forEach(item => {
            const row = document.createElement('div');
            row.className = "post-list-item";
            row.innerHTML = `
                <div><strong>[${type.toUpperCase()}]</strong> ${item.title || item.song_title}</div>
                <div class="post-actions">
                    <button onclick="editItem('${type}', '${item.id}')" class="btn-edit-icon"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteItem('${type}', '${item.id}')" class="btn-del-icon"><i class="fas fa-trash"></i></button>
                </div>
            `;
            listDiv.appendChild(row);
        });
    });
}

// FUNGSI EDIT
function editItem(type, id) {
    const item = currentData[type].find(i => i.id === id);
    document.getElementById('form-title').innerText = "Edit Mode";
    document.getElementById('edit-id').value = id;
    document.getElementById('post-type').value = type;
    document.getElementById('post-title').value = item.title || item.song_title;
    document.getElementById('post-image').value = item.image || item.cover || "";
    document.getElementById('post-audio').value = item.file || "";
    quill.root.innerHTML = item.content || item.description || item.text || "";
    window.scrollTo(0,0);
}

// FUNGSI HAPUS
async function deleteItem(type, id) {
    if (!confirm("Yakin mau hapus?")) return;
    const token = document.getElementById('gh-token').value;
    if (!token) return alert("Masukkan Token GitHub!");

    currentData[type] = currentData[type].filter(i => i.id !== id);
    await updateGithub("Hapus Konten", token);
}

// FUNGSI PUBLISH / UPDATE
document.getElementById('publish-btn').addEventListener('click', async () => {
    const token = document.getElementById('gh-token').value;
    const id = document.getElementById('edit-id').value;
    const type = document.getElementById('post-type').value;
    const title = document.getElementById('post-title').value;
    if (!token || !title) return alert("Isi Token & Judul!");

    const newItem = {
        id: id || Date.now().toString(),
        date: new Date().toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})
    };

    if (type === 'articles') {
        newItem.title = title; newItem.image = document.getElementById('post-image').value;
        newItem.content = quill.root.innerHTML;
    } else if (type === 'music') {
        newItem.title = title; newItem.cover = document.getElementById('post-image').value;
        newItem.file = document.getElementById('post-audio').value; newItem.description = quill.root.innerHTML;
    } else {
        newItem.song_title = title; newItem.text = quill.root.innerHTML;
    }

    if (id) { // Mode Edit
        const index = currentData[type].findIndex(i => i.id === id);
        currentData[type][index] = newItem;
    } else { // Mode Baru
        currentData[type].unshift(newItem);
    }

    await updateGithub(id ? "Update Konten" : "Add Baru", token);
});

async function updateGithub(msg, token) {
    const status = document.getElementById('status-msg');
    status.style.display = "block"; status.innerText = "Sedang sinkron ke GitHub...";
    status.className = "success";

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
        alert("Berhasil!");
        location.reload();
    } else {
        alert("Gagal update. Cek token!");
    }
}
