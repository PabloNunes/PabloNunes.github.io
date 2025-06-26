// Load blocks from JSON and render them
function loadBlocks() {
    fetch('static/blocks.json')
        .then(response => response.json())
        .then(blocks => {
            const container = document.getElementById('blocks-container');
            blocks.forEach(block => {
                const div = document.createElement('div');
                div.className = 'block mb-4 p-4 bg-white rounded shadow-sm';
                div.setAttribute('tabindex', '0');
                div.setAttribute('aria-label', block.name);

                const h2 = document.createElement('h2');
                h2.className = 'h4';
                h2.textContent = block.name;
                const p = document.createElement('p');
                p.textContent = block.content;

                div.appendChild(h2);
                div.appendChild(p);
                container.appendChild(div);
            });
            addClickHighlights();
        })
        .catch(err => console.error('Failed to load blocks:', err));
}

function addClickHighlights() {
    const blocks = document.querySelectorAll('.block');
    blocks.forEach(block => {
        block.addEventListener('click', () => {
            block.classList.add('click-highlight');
            setTimeout(() => block.classList.remove('click-highlight'), 300);
        });
    });
}

function setupScrolling() {
    const sensitivity = 1.5; // medium sensitivity
    window.addEventListener('wheel', function(e) {
        if (!e.ctrlKey) {
            e.preventDefault();
            window.scrollBy({
                top: e.deltaY * sensitivity,
                behavior: 'smooth'
            });
        }
    }, {passive: false});
}

function setupHighContrastToggle() {
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'h') {
            document.body.classList.toggle('high-contrast');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadBlocks();
    setupScrolling();
    setupHighContrastToggle();
});
