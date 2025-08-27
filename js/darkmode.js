(function () {
    const root = document.documentElement;
    const toggle = () => {
        document.body.classList.toggle('dark');
        const mode = document.body.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', mode);
        paintStars(mode === 'dark');
    };

    function paintStars(on) {

        document.querySelectorAll('.star').forEach(s => s.remove());
        if (!on) return;

        const count = Math.min(120, Math.floor(window.innerWidth / 10));
        for (let i = 0; i < count; i++) {
            const s = document.createElement('span');
            s.className = 'star';
            s.style.left = Math.random() * 100 + 'vw';
            s.style.top = Math.random() * 100 + 'vh';
            s.style.opacity = (0.5 + Math.random() * 0.5).toFixed(2);
            document.body.appendChild(s);
        }
    }

    window.addEventListener('DOMContentLoaded', () => {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark') document.body.classList.add('dark');
        paintStars(document.body.classList.contains('dark'));

        const btn = document.getElementById('themeToggle');
        if (btn) btn.addEventListener('click', toggle);
    });
})();
