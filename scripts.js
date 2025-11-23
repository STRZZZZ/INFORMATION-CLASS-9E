// ========== TAHUN DINAMIS DI FOOTER ==========
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ========== SMOOTH SCROLL UNTUK LINK DALAM HALAMAN ==========
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (!href || href === "#") return;

    const targetId = href.substring(1);
    const targetEl = document.getElementById(targetId);

    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// ========== NAVBAR: DROPDOWN + RAHASIA 3x & 5x ==========
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

// GANTI LINK RAHASIA DI SINI
const secret3 = "https://www.mediafire.com/file/vcua2iqxa2eauvx/tempPPT+2+-+by+Renz.pptx/file"; // klik 3x
const secret5 = "https://www.mediafire.com/file/do0c1dlrx67z4n7/TEMPLATE_1.pptx/file"; // klik 5x

let clickCount = 0;
let comboTimer = null;
const TIME_LIMIT = 2500;

if (navToggle && navMenu) {
  // pastikan tombol ada icon
  navToggle.textContent = "☰";

  navToggle.addEventListener("click", (ev) => {
    // buka / tutup menu
    navMenu.classList.toggle("show");

    // hitung klik
    clickCount++;

    if (!comboTimer) {
      comboTimer = setTimeout(() => {
        if (clickCount === 3 && secret3) {
          navMenu.classList.remove("show");
          window.open(secret3, "_blank");
        } else if (clickCount === 5 && secret5) {
          navMenu.classList.remove("show");
          window.open(secret5, "_blank");
        }

        clickCount = 0;
        comboTimer = null;
      }, TIME_LIMIT);
    }

    ev.stopPropagation();
  });

  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && e.target !== navToggle) {
      navMenu.classList.remove("show");
    }
  });
}

// ========== ANIMASI BINTANG DI BACKGROUND ==========
const starCanvas = document.getElementById("starfield");
if (starCanvas) {
  const ctx = starCanvas.getContext("2d");

  function resizeCanvas() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const starCount = 80;
  const stars = [];

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * starCanvas.width,
      y: Math.random() * starCanvas.height,
      r: Math.random() * 1.4 + 0.4,
      speed: Math.random() * 0.3 + 0.1,
      alpha: Math.random() * 0.5 + 0.3,
      alphaDir: Math.random() > 0.5 ? 1 : -1
    });
  }

  function drawStars() {
    ctx.clearRect(0, 0, starCanvas.width, starCanvas.height);

    for (const s of stars) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
      ctx.fill();

      s.y += s.speed;
      if (s.y > starCanvas.height) s.y = 0;

      s.alpha += 0.007 * s.alphaDir;
      if (s.alpha > 0.9) s.alphaDir = -1;
      if (s.alpha < 0.3) s.alphaDir = 1;
    }

    requestAnimationFrame(drawStars);
  }

  drawStars();
}