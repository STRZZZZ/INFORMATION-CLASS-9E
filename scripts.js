// ====== Script Website Kelas ======

// Tahun dinamis di footer
document.getElementById('year').textContent = new Date().getFullYear();

// Toggle menu mobile
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navLinks?.classList.remove('show');
    }
  });
});

// Starfield animasi (ringan)
(function starfield(){
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let w, h, stars;
  const STAR_COUNT = 120;
  const SHOOTING_CHANCE = 0.006;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    stars = Array.from({length: STAR_COUNT}, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 0.8 + 0.2,
      r: Math.random() * 1.2 + 0.3,
      tw: Math.random() * Math.PI * 2
    }));
  }
  window.addEventListener('resize', resize, {passive:true});
  resize();

  const trails = [];

  function loop(t){
    ctx.clearRect(0,0,w,h);

    for (const s of stars){
      s.tw += 0.03;
      const alpha = 0.5 + Math.sin(s.tw) * 0.25 * s.z;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }

    if (Math.random() < SHOOTING_CHANCE){
      trails.push({
        x: Math.random() * w,
        y: Math.random() * h * 0.4 + 20,
        vx: -(Math.random()*3 + 2),
        vy: Math.random()*1 - .5,
        life: 0,
      });
    }

    for (let i=trails.length-1; i>=0; i--){
      const s = trails[i];
      s.x += s.vx;
      s.y += s.vy;
      s.life += 1;

      ctx.globalAlpha = Math.max(1 - s.life/60, 0);
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - s.vx*8, s.y - s.vy*8);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      if (s.life > 60) trails.splice(i,1);
    }

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();

// Long-press download untuk gambar galeri (khusus mobile)
(function enableLongPressDownload(){
  const items = document.querySelectorAll('.gallery-item img');
  items.forEach(img => {
    let timer = null;
    let startX = 0, startY = 0;

    img.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      startX = touch.clientX; startY = touch.clientY;
      timer = setTimeout(() => {
        const link = document.createElement('a');
        link.href = img.currentSrc || img.src;
        const name = (img.alt || 'foto-kelas').toLowerCase().replace(/\s+/g,'-');
        link.download = name + '.jpg';
        document.body.appendChild(link);
        link.click();
        link.remove();
      }, 650);
    }, {passive:true});

    img.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      if (Math.hypot(touch.clientX - startX, touch.clientY - startY) > 10 && timer){
        clearTimeout(timer); timer = null;
      }
    }, {passive:true});

    ['touchend','touchcancel'].forEach(ev => {
      img.addEventListener(ev, () => { if (timer){ clearTimeout(timer); timer = null; } }, {passive:true});
    });
  });
})();

// Lazy-load fallback untuk browser lama
if ('loading' in HTMLImageElement.prototype === false){
  const imgs = document.querySelectorAll('img[loading="lazy"]');
  imgs.forEach(img => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          img.src = img.getAttribute('src');
          obs.disconnect();
        }
      });
    });
    obs.observe(img);
  });
}
// Smooth scroll dengan animasi custom
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Animasi smooth scroll (biar pas klik link scroll halus)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Animasi reveal saat discroll
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}

window.addEventListener("scroll", revealOnScroll);