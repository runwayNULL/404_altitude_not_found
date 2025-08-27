async function getJSON(path) { const r = await fetch(path); return r.json(); }

function enableSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href');
            if (id.length > 1) {
                const el = document.querySelector(id);
                if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
            }
        });
    });
}

function initHamburger() {
    const btn = document.getElementById('hamburger');
    const menu = document.getElementById('navMenu');
    if (!btn || !menu) return;
    btn.addEventListener('click', () => {
        const open = menu.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
}


function initExpanders() {
    document.querySelectorAll('[data-target]').forEach(btn => {
        btn.addEventListener('click', () => {
            const panel = document.querySelector(btn.dataset.target);
            if (!panel) return;
            const isCollapsed = panel.classList.contains('collapsed');
            panel.classList.toggle('collapsed');
            btn.setAttribute('aria-expanded', isCollapsed ? 'true' : 'false');
        });
    });
}

function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        const show = window.scrollY > 600;
        btn.classList.toggle('show', show);
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}


function initRevealOnScroll() {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                io.unobserve(e.target);
            }
        });
    }, { threshold: .2 });

    document.querySelectorAll('.post-card').forEach(card => io.observe(card));
}


function postCard(p) {
    const a = document.createElement('a');
    a.href = `post.html?id=${encodeURIComponent(p.id)}`;
    a.className = 'post-card';
    a.innerHTML = `
    <img class="post-thumb" src="${p.image}" alt="${p.title}">
    <div class="post-body">
      <h3 class="post-title">${p.title}</h3>
      <div class="post-meta">${p.author} • ${p.date}</div>
      <p class="post-excerpt">${p.excerpt}</p>
      <span class="link-arrow">Read →</span>
    </div>
  `;
    return a;
}


async function loadLatest() {
    const grid = document.getElementById('postGrid');
    if (!grid) return;
    const posts = await getJSON('data/posts.json');
    posts.slice(0, 6).forEach(p => grid.appendChild(postCard(p)));
    requestAnimationFrame(() => document.querySelectorAll('.post-card').forEach(c => c.classList.add('visible')));
}


async function loadAll() {
    const grid = document.getElementById('allPosts');
    if (!grid) return;
    const posts = await getJSON('data/posts.json');
    posts.forEach(p => grid.appendChild(postCard(p)));
    requestAnimationFrame(() => document.querySelectorAll('.post-card').forEach(c => c.classList.add('visible')));
}


async function loadPost() {
    const wrap = document.getElementById('post');
    if (!wrap) return;
    const url = new URL(location.href);
    const id = url.searchParams.get('id');
    const posts = await getJSON('data/posts.json');
    const p = posts.find(x => String(x.id) === String(id)) || posts[0];

    document.getElementById('postTitle').textContent = p.title;
    document.getElementById('postAuthor').textContent = p.author;
    document.getElementById('postDate').textContent = p.date;
    const hero = document.getElementById('postImage');
    hero.src = p.image; hero.alt = p.title;

    const content = document.getElementById('postContent');
    content.innerHTML = p.content;


    const related = posts.filter(x => x.id !== p.id).slice(0, 3);
    const rgrid = document.getElementById('relatedGrid');
    related.forEach(x => rgrid.appendChild(postCard(x)));
    requestAnimationFrame(() => document.querySelectorAll('.post-card').forEach(c => c.classList.add('visible')));


    if (window.initQuiz) window.initQuiz(String(p.id));
}


async function initFunFacts() {
    const area = document.getElementById('funPlanes');
    if (!area) return;
    const facts = await getJSON('data/funfacts.json');


    const count = 7;
    for (let i = 0; i < count; i++) {
        const btn = document.createElement('button');
        btn.className = 'fun-plane';
        btn.setAttribute('aria-label', 'Tap for a random fun fact');
        btn.style.left = Math.random() * 90 + '%';
        btn.style.top = Math.random() * 65 + '%';
        btn.innerHTML = `<img src="images/plane.svg" alt="">`;
        btn.addEventListener('click', () => {
            const fact = facts[Math.floor(Math.random() * facts.length)];
            showFactToast(fact);
        });
        area.appendChild(btn);
    }
}

function showFactToast(text) {
    const t = document.getElementById('factToast');
    if (!t) return;
    t.textContent = '✈ ' + text;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3400);
}


function entryPlane() {
    const el = document.getElementById('entry-plane');
    if (!el) return;
    el.style.opacity = '1';
    el.style.animation = 'planeAcrossAndLoop 4.6s ease-in-out forwards';

    el.addEventListener('animationend', () => el.remove());
}


function initLearnMore() {
    const btn = document.getElementById('learnMore');
    if (!btn) return;
    btn.addEventListener('click', () => {
        const target = document.querySelector(btn.dataset.target);
        if (target) target.classList.toggle('collapsed');
    });
}


function initSlideshow() {
    const box = document.getElementById('slideshow');
    if (!box) return;
    const slides = [...box.querySelectorAll('.slide')];
    let i = 0;
    const show = idx => slides.forEach((s, k) => s.classList.toggle('active', k === idx));
    const next = () => { i = (i + 1) % slides.length; show(i); };
    const prev = () => { i = (i - 1 + slides.length) % slides.length; show(i); };
    box.querySelector('.slide-next').addEventListener('click', next);
    box.querySelector('.slide-prev').addEventListener('click', prev);
    setInterval(next, 4000);
}


function initPlaneCursorFollow() {
    const grids = document.querySelectorAll('.post-grid');
    if (!grids.length) return;
    grids.forEach(grid => {
        const ghost = document.createElement('div');
        ghost.style.position = 'fixed';
        ghost.style.pointerEvents = 'none';
        ghost.style.zIndex = '1500';
        ghost.style.transition = 'transform .06s linear';
        ghost.innerHTML = `<img src="images/plane.svg" alt="" style="width:18px;height:18px;opacity:.75">`;
        let active = false;

        grid.addEventListener('mouseenter', () => { document.body.appendChild(ghost); active = true; });
        grid.addEventListener('mouseleave', () => { ghost.remove(); active = false; });
        grid.addEventListener('mousemove', (e) => {
            if (!active) return;
            ghost.style.left = (e.clientX + 10) + 'px';
            ghost.style.top = (e.clientY + 10) + 'px';
        });
    });
}

window.addEventListener('DOMContentLoaded', () => {
    initHamburger();
    enableSmoothScroll();
    initExpanders();
    initBackToTop();
    initLearnMore();
    initSlideshow();
    initPlaneCursorFollow();


    loadLatest();
    loadAll();
    loadPost();
    initFunFacts();


    entryPlane();


    setTimeout(initRevealOnScroll, 50);
});

const funPlanesArea = document.getElementById('funPlanes');
const facts = [
    "The shortest commercial flight is around 2 minutes between Westray and Papa Westray in Scotland.",
    "Contrails form when hot, humid exhaust meets cold, low‑vapor‑pressure air at altitude.",
    "Runway lights are blue on edges for taxiways, white for runways, and amber near the end.",
    "Birds inspired winglet shapes that reduce induced drag and save fuel.",
    "Pressurized cabins typically simulate 6,000–8,000 feet to keep passengers comfy.",
    "The black boxes are actually bright orange for visibility after an accident.",
    "A Boeing 747 has about 240–280 km of wiring inside."
];


for (let i = 0; i < 5; i++) {
    const plane = document.createElement('img');
    plane.src = 'images/plane-icon.png';
    plane.alt = 'Fun fact plane';
    plane.classList.add('fun-plane');
    plane.style.top = `${Math.random() * 80}%`;
    plane.style.left = `${Math.random() * 80}%`;

    plane.addEventListener('click', () => {
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        document.getElementById('factToast').textContent = randomFact;
        document.getElementById('factToast').classList.add('show');
        setTimeout(() => document.getElementById('factToast').classList.remove('show'), 3000);
    });

    funPlanesArea.appendChild(plane);
}
