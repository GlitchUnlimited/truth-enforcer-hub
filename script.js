// js/script.js — FULL FIRE VERSION
const canvas = document.getElementById('war-canvas');
const ctx = canvas.getContext('2d');
let enemies = [];

function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Enemy {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.7;
        this.size = Math.random() * 14 + 8;
        this.speed = Math.random() * 2.5 + 1;
        this.type = Math.random() > 0.5 ? 'bug' : 'bot';
    }
    update() { this.y += this.speed; if (this.y > canvas.height) this.y = -100; }
    draw() {
        ctx.fillStyle = this.type === 'bug' ? '#c8102e' : '#666';
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill();
    }
}

function initWarCanvas() { enemies = Array.from({length: 140}, () => new Enemy()); }
function animateWar() {
    ctx.fillStyle = 'rgba(10,10,10,0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    enemies.forEach((e,i) => {
        e.update(); e.draw();
        if (Math.random() < 0.015) {
            ctx.fillStyle = '#f8c400';
            ctx.shadowBlur = 40; ctx.shadowColor = '#f8c400';
            ctx.fillRect(e.x-20, e.y-20, 40, 40);
            ctx.shadowBlur = 0;
            enemies[i] = new Enemy();
        }
    });
    requestAnimationFrame(animateWar);
}

// LIVE API KILL COUNTS
async function fetchLiveStats() {
    try {
        const res = await fetch('https://helldiverstrainingmanual.com/api/v1/war/stats');
        const data = await res.json();
        animateCounter('terminid-kills', data.bugKills || 0);
        animateCounter('automaton-kills', data.automatonKills || 0);
        animateCounter('illuminate-kills', data.illuminateKills || 0);
    } catch(e) {
        animateCounter('terminid-kills', 198742891234);
        animateCounter('automaton-kills', 107892345678);
        animateCounter('illuminate-kills', 65432109876);
    }
}

function animateCounter(id, target) {
    const el = document.getElementById(id);
    let count = 0;
    const inc = Math.ceil(target / 90);
    const timer = setInterval(() => {
        count += inc;
        if (count >= target) { count = target; clearInterval(timer); }
        el.textContent = count.toLocaleString('en-US');
    }, 18);
}

// SLIDER
const slidesData = [
    { img: "https://picsum.photos/id/1015/2000/800", title: "EAGLE STRIKE", desc: "PRECISION ORBITAL BOMBARDMENT" },
    { img: "https://picsum.photos/id/1016/2000/800", title: "RAILGUN", desc: "ANTI-ARMOR HELLFIRE" },
    { img: "https://picsum.photos/id/1005/2000/800", title: "SHIELD GENERATOR", desc: "DEFENSIVE PERIMETER" },
    { img: "https://picsum.photos/id/133/2000/800", title: "HELLBOMB", desc: "TOTAL PLANETARY RESET" }
];

let currentSlide = 0, sliderInterval = null;

function createSlider() {
    const wrapper = document.getElementById('slides-wrapper');
    wrapper.innerHTML = slidesData.map((s,i) => `
        <div class="slide min-w-full h-full bg-cover bg-center flex items-end p-10 relative" 
             style="background-image: linear-gradient(to top, rgba(10,10,10,0.9), transparent 40%), url('${s.img}')">
            <div class="max-w-md"><div class="text-[#f8c400] text-sm">${s.title}</div><h3 class="text-6xl leading-none">${s.desc}</h3></div>
            <div class="absolute top-8 right-8 bg-[#c8102e] px-6 py-2 text-xs rounded-3xl">0${i+1}/04</div>
        </div>
    `).join('');

    document.getElementById('dots').innerHTML = slidesData.map((_,i) => 
        `<div onclick="goToSlide(${i})" class="w-5 h-5 rounded-full border-2 border-[#f8c400] ${i===0?'bg-[#f8c400]':''} cursor-pointer"></div>`
    ).join('');
}

function showSlide(n) {
    currentSlide = (n + slidesData.length) % slidesData.length;
    document.getElementById('slides-wrapper').style.transform = `translateX(-${currentSlide*100}%)`;
    document.querySelectorAll('#dots > div').forEach((d,i) => d.classList.toggle('bg-[#f8c400]', i===currentSlide));
    resetProgressBar();
}

function nextSlide(){ showSlide(currentSlide+1); }
function prevSlide(){ showSlide(currentSlide-1); }
function goToSlide(n){ showSlide(n); }

function resetProgressBar() {
    const bar = document.getElementById('progress-bar');
    bar.style.transition = 'none'; bar.style.width = '0%';
    setTimeout(() => { bar.style.transition = 'width 10000ms linear'; bar.style.width = '100%'; }, 50);
}

function startSlider() {
    if (sliderInterval) clearInterval(sliderInterval);
    sliderInterval = setInterval(nextSlide, 10000);
    resetProgressBar();
}

function toggleSlider() {
    const btn = document.getElementById('play-pause');
    if (sliderInterval) {
        clearInterval(sliderInterval); sliderInterval = null;
        btn.innerHTML = '▶';
    } else {
        startSlider(); btn.innerHTML = '❚❚';
    }
}

// NODES
function createNodes() {
    document.getElementById('nodes-grid').innerHTML = `
        <div onclick="callReinforcements()" class="deployment-node bg-zinc-900 border-4 border-transparent hover:border-[#c8102e] p-8 rounded-3xl text-center cursor-pointer">📖<h3 class="text-3xl mt-6">COMBAT GUIDES</h3></div>
        <div onclick="callReinforcements()" class="deployment-node bg-zinc-900 border-4 border-transparent hover:border-[#c8102e] p-8 rounded-3xl text-center cursor-pointer">🎥<h3 class="text-3xl mt-6">LIVE FOOTAGE</h3></div>
        <div onclick="callReinforcements()" class="deployment-node bg-zinc-900 border-4 border-transparent hover:border-[#c8102e] p-8 rounded-3xl text-center cursor-pointer">🔒<h3 class="text-3xl mt-6">UNDOCUMENTED</h3></div>
        <div onclick="callReinforcements()" class="deployment-node bg-zinc-900 border-4 border-transparent hover:border-[#c8102e] p-8 rounded-3xl text-center cursor-pointer">⭐<h3 class="text-3xl mt-6">DIVER REVIEWS</h3></div>
    `;
}

function callReinforcements() {
    // massive explosion effect
    const flash = document.createElement('div');
    flash.style.cssText = 'position:fixed;inset:0;background:#f8c400;opacity:0.7;z-index:99999;pointer-events:none;animation:flash 700ms forwards';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 800);

    for (let i = 0; i < 70; i++) {
        setTimeout(() => {
            const e = document.createElement('div');
            e.textContent = ['💥','🦅','⭐','☠️'][Math.floor(Math.random()*4)];
            e.style.cssText = `position:fixed; left:${Math.random()*100}vw; top:-50px; font-size:3rem; z-index:99999; animation:explode 1.2s forwards`;
            document.body.appendChild(e);
            setTimeout(() => e.remove(), 2000);
        }, i*5);
    }
}

function fireStratagem() {
    const hero = document.getElementById('hero-stratagem');
    hero.style.transform = 'scale(1.6) rotate(720deg)';
    setTimeout(() => hero.style.transform = '', 900);
    callReinforcements();
}

// BOOT EVERYTHING
window.onload = () => {
    initWarCanvas();
    animateWar();
    createSlider();
    startSlider();
    createNodes();
    fetchLiveStats();
    setInterval(fetchLiveStats, 45000);

    console.log('%c🔥 SUPER EARTH STRATAGEM ARCHIVE v3.0 — FULLY DEPLOYED', 'color:#f8c400; font-size:22px; font-family:monospace');
};
