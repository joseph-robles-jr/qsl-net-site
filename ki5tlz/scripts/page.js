// This file fils out the header to reduce effort when updating headers.

const CONTACT = {
    email: 'KI5TLZ.TX@gmail.com',
    qrz: 'https://www.qrz.com/db/KI5TLZ'
};

const navLinks = [
    { text: 'Home', href: '/ki5tlz/index.html' },
    { text: 'Repeater', href: '/ki5tlz/articles/allstar-user-guide.html' },
    { text: 'Node History', href: '/ki5tlz/articles/history.html' },
    { text: 'Allstar Map', href: '/ki5tlz/apps/NodeMapApp/NodeMapApp.html' }
    //{ text: 'Test123', href: 'https://google.com'}
];

const footerLinks = [
    { text: 'Home', href: '/ki5tlz/index.html' },
    { text: 'Repeater', href: '/ki5tlz/articles/allstar-user-guide.html' },
    { text: 'Page Index', href: '/ki5tlz/articles/table-of-contents.html' }
];


function renderHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    const navHtml = navLinks
        .map(link => `<a href="${link.href}">${link.text}</a>`)
        .join('');

    header.innerHTML = `
        <div class="site-header">
            <a href="/ki5tlz/index.html" class="logo-link">
                <img id="logo" src="/ki5tlz/images/joseph_logo.jpg" alt="KI5TLZ Logo">
            </a>

            <button
                id="menu-toggle"
                type="button"
                aria-label="Toggle navigation menu"
            >
                ☰
            </button>

            <nav id="main-nav">
                ${navHtml}
            </nav>
        </div>
    `;

    document.getElementById('menu-toggle')?.addEventListener('click', () => {
        document.getElementById('main-nav')?.classList.toggle('open');
    });
}

function renderFooter() {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const footerLinksHtml = footerLinks
        .map(link => `<a href="${link.href}">${link.text}</a>`)
        .join('');

    footer.innerHTML = `
        <div id="contact_section">
            <h3>Contact Me</h3>

            <p>
                Email:
                <a href="mailto:${CONTACT.email}">${CONTACT.email}</a>
            </p>

            <p>
                My QRZ page:
                <a href="${CONTACT.qrz}" target="_blank" rel="noopener noreferrer">
                    ${CONTACT.qrz}
                </a>
            </p>
        </div>

        <div id="footer_links">
            ${footerLinksHtml}
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
});
