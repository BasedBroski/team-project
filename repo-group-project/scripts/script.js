let shortcuts = [];

// Fetch JSON data
fetch('data/shortcuts.json')
    .then(response => response.json())
    .then(data => {
        shortcuts = data;
        displayShortcuts(shortcuts);
    });

function createAsciiCard(item) {
    const lineWidth = 32;
    const borderLine = '+' + '-'.repeat(lineWidth) + '+';

    const rows = [
        `| Shortcut: ${item.shortcut}`,
        `| ${item.description}`,
        `| Category: ${item.category}`,
        `| Contributor: ${item.Contributor}`,
        `| Origin: ${item.Origin}`
    ].map(line => {
        if (line.length > lineWidth + 2) {
            return line.slice(0, lineWidth - 3) + '...';
        }
        return line.padEnd(lineWidth + 2, ' ');
    });

    return [borderLine, ...rows, borderLine].join('\n');
}

// Display function
function displayShortcuts(data) {
    const results = document.getElementById('results');
    results.innerHTML = '';

    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
      <pre class="ascii-card">${createAsciiCard(item)}</pre>
    `;

        results.appendChild(card);
    });
}

// Search + Filter
document.getElementById('searchInput').addEventListener('input', filterData);
document.getElementById('categoryFilter').addEventListener('change', filterData);

function filterData() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const categoryValue = document.getElementById('categoryFilter').value;

    const filtered = shortcuts.filter(item => {
        const matchesSearch =
            item.description.toLowerCase().includes(searchValue) ||
            item.shortcut.toLowerCase().includes(searchValue);

        const matchesCategory =
            categoryValue === 'all' || item.category === categoryValue;

        return matchesSearch && matchesCategory;
    });

    displayShortcuts(filtered);
}