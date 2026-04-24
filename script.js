// js/script.js
// ──────────────────────────────────────────────────────────────
// FULL CYBERPUNK TERMINAL — MATRIX RAIN + ADVANCED SLIDER + CARTRIDGES
// ──────────────────────────────────────────────────────────────

const slidesData = [
    { img: "assets/images/slide-1.jpg", title: "NEON RUNNER", link: "https://your-link-1.com" },
    { img: "assets/images/slide-2.jpg", title: "GLITCH PROTOCOL", link: "https://your-link-2.com" },
    { img: "assets/images/slide-3.jpg", title: "VOID ARCHIVE", link: "https://your-link-3.com" },
    { img: "assets/images/slide-4.jpg", title: "HYPERDRIVE", link: "https://your-link-4.com" }
];

const cartridgesData = [
    { title: "NEON RUNNER", subtitle: "8-BIT EDITION", link: "https://your-link-1.com" },
    { title: "GLITCH PROTOCOL", subtitle: "ERROR 404 RELOADED", link: "https://your-link-2.com" },
    { title: "VOID ARCHIVE", subtitle: "DATA CORRUPTED 1999", link: "https://your-link-3.com" },
    { title: "HYPERDRIVE", subtitle: "WARP SPEED ENGAGED", link: "https://your-link-4.com" }
];

// Matrix Rain Background
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const chars = "01アイウエオ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&*".split("");
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.07)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00f7ff';
    ctx.font = `${fontSize}px VT323`;

    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(drawMatrix, 35);

// Slider Logic (10 second cycle, pause/play, progress bar, dots)
let currentSlide = 0;
let isPlaying = true;
let slideInterval = null;
let progressInterval = null;

const wrapper = document.getElementById('slides-wrapper');
const progressBar = document.getElementById('progress-bar');
const dotsContainer = document.getElementById('slide-dots');

function createSlides() {
    wrapper.innerHTML = '';
    slidesData.forEach((slide, i) => {
        const div = document.createElement('div');
        div.className = 'slide';
        div.innerHTML = `
            <a href="${slide.link}" target="_blank" class="block w-full h-full relative group">
                <img src="${slide.img}" alt="${slide.title}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end p-8">
                    <div>
                        <h2 class="text-6xl neon-text">${slide.title}</h2>
                        <p class="text-3xl text-pink-400">10s TRANSMISSION CYCLE</p>
                    </div>
                </div>
            </a>
        `;
        wrapper.appendChild(div);
    });
    createDots();
}

function createDots() {
    dotsContainer.innerHTML = '';
    slidesData.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = `w-4 h-4 rounded-full border-2 border-cyan-400 transition-all cursor-pointer ${i === 0 ? 'bg-cyan-400 scale-125' : 'bg-transparent'}`;
        dot.onclick = () => showSlide(i);
        dotsContainer.appendChild(dot);
    });
}

function showSlide(index) {
    currentSlide = (index + slidesData.length) % slidesData.length;
    wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    document.querySelectorAll('#slide-dots > div').forEach((dot, i) => {
        dot.classList.toggle('bg-cyan-400', i === currentSlide);
        dot.classList.toggle('scale-125', i === currentSlide);
    });
    
    resetProgressBar();
}

function nextSlide() { showSlide(currentSlide + 1); }
function prevSlide() { showSlide(currentSlide - 1); }

function resetProgressBar() {
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    setTimeout(() => {
        progressBar.style.transition = 'width 10000ms linear';
        progressBar.style.width = '100%';
    }, 10);
}

function startAutoPlay() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 10000);
    resetProgressBar();
}

function pauseAutoPlay() {
    clearInterval(slideInterval);
    progressBar.style.transition = 'none';
}

function togglePlay() {
    isPlaying = !isPlaying;
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    
    if (isPlaying) {
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
        startAutoPlay();
    } else {
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        pauseAutoPlay();
    }
}

// Cartridges
function createCartridges() {
    const grid = document.getElementById('cartridges-grid');
    grid.innerHTML = '';
    
    cartridgesData.forEach(cart => {
        const cardHTML = `
            <a href="${cart.link}" target="_blank" class="cartridge block">
                <div class="crt bg-gradient-to-b from-gray-900 to-black border-8 border-emerald-400 rounded-3xl p-6 h-full flex flex-col items-center justify-center text-center">
                    <div class="text-8xl mb-6">📼</div>
                    <h3 class="text-4xl text-emerald-400 mb-2">${cart.title}</h3>
                    <p class="text-xl opacity-75">${cart.subtitle}</p>
                    <div class="mt-8 text-emerald-400 text-2xl border border-emerald-400 px-8 py-2 rounded-2xl hover:bg-emerald-400 hover:text-black transition-colors">PRESS START</div>
                </div>
            </a>
        `;
        grid.innerHTML += cardHTML;
    });
}

// Live typing terminal log
const logs = [
    "CONNECTING TO THE GRID...",
    "ENCRYPTING NEURAL PATHWAYS...",
    "LOADING CARTRIDGE DATA...",
    "SCANNING FOR GLITCHES...",
    "10s CYCLE SYNCED",
    "YOU ARE THE VIRUS NOW"
];
let logIndex = 0;
function typeLog() {
    const logEl = document.getElementById('live-log');
    logEl.textContent = logs[logIndex];
    logIndex = (logIndex + 1) % logs.length;
}
setInterval(typeLog, 2800);

// Keyboard god-mode
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
    }
});

// INIT EVERYTHING
window.onload = () => {
    createSlides();
    createCartridges();
    startAutoPlay();
    typeLog();
    
    console.log('%c🚀 NEON TERMINAL FULLY BOOTED — MATRIX RAIN + 10s SLIDER + CARTRIDGES LOADED', 'color:#00f7ff; font-size:20px; font-family:monospace');
    console.log('%cPro tip: Open dev tools and watch the matrix rain while the slider cycles', 'color:#ff00ff');
};
