let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];

// Show all entries
function showEntries() {
    const entriesDiv = document.getElementById('entries');
    entriesDiv.innerHTML = '';
    entries.forEach((entry, index) => {
        const div = document.createElement('div');
        div.classList.add('entry');
        div.innerHTML = `
            <h3>${entry.title}</h3>
            <small>${entry.dateTime}</small>
            <p>${entry.content}</p>
            <button onclick="editEntry(${index})">Edit</button>
            <button onclick="deleteEntry(${index})">Delete</button>
        `;
        entriesDiv.appendChild(div);
    });
}

// Add new entry
function addEntry() {
    const title = document.getElementById('titleInput').value;
    const content = document.getElementById('contentInput').value;

    if (title && content) {
        const now = new Date();
        const dateTime = now.toLocaleString();
        entries.push({ title, content, dateTime });
        localStorage.setItem('diaryEntries', JSON.stringify(entries));
        document.getElementById('titleInput').value = '';
        document.getElementById('contentInput').value = '';
        showEntries();
    } else {
        alert('Please enter both title and content!');
    }
}

// Delete entry
function deleteEntry(index) {
    if(confirm('Are you sure you want to delete this entry?')) {
        entries.splice(index, 1);
        localStorage.setItem('diaryEntries', JSON.stringify(entries));
        showEntries();
    }
}

// Edit entry
function editEntry(index) {
    const entry = entries[index];
    const newTitle = prompt('Edit title:', entry.title);
    const newContent = prompt('Edit content:', entry.content);
    if(newTitle !== null && newContent !== null) {
        const now = new Date();
        const dateTime = now.toLocaleString();
        entries[index] = { title: newTitle, content: newContent, dateTime };
        localStorage.setItem('diaryEntries', JSON.stringify(entries));
        showEntries();
    }
}

// Search entries
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    const entriesDiv = document.getElementById('entries');
    entriesDiv.innerHTML = '';
    entries.forEach((entry, index) => {
        if (entry.title.toLowerCase().includes(searchText) || entry.content.toLowerCase().includes(searchText)) {
            const div = document.createElement('div');
            div.classList.add('entry');
            div.innerHTML = `
                <h3>${entry.title}</h3>
                <small>${entry.dateTime}</small>
                <p>${entry.content}</p>
                <button onclick="editEntry(${index})">Edit</button>
                <button onclick="deleteEntry(${index})">Delete</button>
            `;
            entriesDiv.appendChild(div);
        }
    });
});

// Cute hearts animation
function createHearts() {
    for(let i=0; i<5; i++){
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        document.body.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 2000);
    }
}

// Add entry button
document.getElementById('addBtn').addEventListener('click', () => {
    addEntry();
    createHearts();
});

// Initial load
showEntries();
