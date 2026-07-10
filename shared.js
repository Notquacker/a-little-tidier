/* =====================================================================
   shared.js — helpers every game in the room uses:
   small utilities, the WebAudio sounds, sparkles, banner, and the pack.
   Load with <script src="shared.js"></script> before the game's own code.
   ===================================================================== */

/* ---------- tiny utilities ---------- */
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function shuffle(arr){
  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
let __uid = 0;
const uid = p => p + (++__uid);
function shade(hex, f){                       // darken (f<1) / lighten (f>1) "#rrggbb"
  const n = parseInt(hex.slice(1), 16);
  const ch = s => clamp(Math.round(((n >> s) & 255) * f), 0, 255);
  return `rgb(${ch(16)},${ch(8)},${ch(0)})`;
}
const PALETTE = ["#e8a9b0", "#f0c4a0", "#ecd28a", "#adcaa2", "#a9c3e8", "#cbb3e0"];

/* ---------- sound (WebAudio — generated, no files) ---------- */
let AC = null;
document.addEventListener('pointerdown', () => {
  if(!AC) AC = new (window.AudioContext || window.webkitAudioContext)();
  if(AC.state === 'suspended') AC.resume();
}, { capture:true });

function tone(freq, delay = 0, dur = .15, type = 'sine', vol = .12, slideTo = null){
  if(!AC) return;
  const t = AC.currentTime + delay;
  const o = AC.createOscillator(), g = AC.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if(slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(.001, t + dur);
  o.connect(g).connect(AC.destination);
  o.start(t); o.stop(t + dur + .05);
}
const ding    = () => { tone(880, 0, .12); tone(1318, .07, .18); };
const thud    = () => tone(150, 0, .25, 'sawtooth', .05);
const fanfare = () => [523, 659, 784, 1047].forEach((f, i) => tone(f, i * .09, .28, 'triangle'));
const awoo    = () => {
  tone(240, 0,   .10, 'triangle', .07, 420);
  tone(420, .08, .55, 'sine',     .09, 720);
  tone(720, .62, .50, 'sine',     .07, 330);
};

/* ---------- sparkles (screen coordinates) ---------- */
const SPARK_CHARS = ['✦','✧','✨','♥','⋆'];
function sparkRaw(cx, cy, n = 14){
  for(let i = 0; i < n; i++){
    const s = document.createElement('span');
    s.className = 'spark';
    s.textContent = SPARK_CHARS[Math.floor(Math.random() * SPARK_CHARS.length)];
    s.style.color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    const a = Math.random() * Math.PI * 2, d = 40 + Math.random() * 70;
    s.style.setProperty('--dx', Math.cos(a) * d + 'px');
    s.style.setProperty('--dy', Math.sin(a) * d + 'px');
    s.style.left = cx + 'px'; s.style.top = cy + 'px';
    document.body.appendChild(s);
    s.addEventListener('animationend', () => s.remove());
  }
}
function sparkEl(el, n = 12){                 // sparkle burst on an element
  const r = el.getBoundingClientRect();
  sparkRaw(r.left + r.width/2, r.top + r.height/2, n);
}

/* ---------- pop-up banner ---------- */
function showBanner(text, ms = 1800){
  let b = document.getElementById('banner');
  if(!b){ b = document.createElement('div'); b.id = 'banner'; document.body.appendChild(b); }
  b.textContent = text;
  requestAnimationFrame(() => b.classList.add('show'));
  if(ms) setTimeout(() => b.classList.remove('show'), ms);
}

/* ---------- the huskies ---------- */
const heartPath = (cx, cy, s, fill) =>
  `<path d="M ${cx} ${cy+0.35*s} C ${cx-0.55*s} ${cy-0.02*s} ${cx-0.32*s} ${cy-0.45*s} ${cx} ${cy-0.16*s}
            C ${cx+0.32*s} ${cy-0.45*s} ${cx+0.55*s} ${cy-0.02*s} ${cx} ${cy+0.35*s} Z" fill="${fill}"/>`;

const huskyGuts = (fur, collar) => {
  const g = uid('hk'), card = '#fffdf6', outline = 'rgba(92,74,61,.16)';
  return `
    <defs><linearGradient id="${g}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="122">
      <stop offset="0" stop-color="${shade(fur,1.12)}"/><stop offset="1" stop-color="${shade(fur,.87)}"/></linearGradient></defs>
    <g class="tail">
      <path d="M92 108 C108 104 112 88 102 78 C96 72 88 76 90 84" fill="none"
            stroke="url(#${g})" stroke-width="13" stroke-linecap="round"/>
      <circle cx="90" cy="84" r="6.5" fill="${card}"/>
    </g>
    <path d="M38 62 Q30 92 34 108 L86 108 Q90 92 82 62 Q60 70 38 62 Z" fill="url(#${g})"/>
    <ellipse cx="34" cy="100" rx="14" ry="16" fill="url(#${g})"/>
    <ellipse cx="86" cy="100" rx="14" ry="16" fill="url(#${g})"/>
    <ellipse cx="30" cy="116" rx="8" ry="4.5" fill="${card}" stroke="${outline}" stroke-width="1.2"/>
    <ellipse cx="90" cy="116" rx="8" ry="4.5" fill="${card}" stroke="${outline}" stroke-width="1.2"/>
    <ellipse cx="60" cy="88" rx="16" ry="24" fill="${card}"/>
    <rect x="49"   y="80" width="8.5" height="36" rx="4" fill="${card}" stroke="${outline}" stroke-width="1.2"/>
    <rect x="62.5" y="80" width="8.5" height="36" rx="4" fill="${card}" stroke="${outline}" stroke-width="1.2"/>
    <ellipse cx="53" cy="116" rx="7.5" ry="4.5" fill="${card}" stroke="${outline}" stroke-width="1.2"/>
    <ellipse cx="67" cy="116" rx="7.5" ry="4.5" fill="${card}" stroke="${outline}" stroke-width="1.2"/>
    <path d="M42 62 Q60 71 78 62" stroke="${collar}" stroke-width="6" fill="none"/>
    ${heartPath(60, 74, 9, '#e7c66a')}
    <polygon points="37,24 31,4 53,13" fill="url(#${g})" stroke="url(#${g})" stroke-width="5" stroke-linejoin="round"/>
    <polygon points="39,19 35,8 47,13" fill="#e8c4c8"/>
    <polygon points="83,24 89,4 67,13" fill="url(#${g})" stroke="url(#${g})" stroke-width="5" stroke-linejoin="round"/>
    <polygon points="81,19 85,8 73,13" fill="#e8c4c8"/>
    <ellipse cx="60" cy="40" rx="27" ry="24" fill="${card}" stroke="${outline}" stroke-width="1.2"/>
    <path d="M33 40 Q33 16 60 16 Q87 16 87 40 Q79 34 71 35 Q63 36 60 46 Q57 36 49 35 Q41 34 33 40 Z"
          fill="url(#${g})" stroke="rgba(92,74,61,.22)" stroke-width="1"/>
    <circle cx="46" cy="30" r="2.4" fill="${card}" opacity=".85"/>
    <circle cx="74" cy="30" r="2.4" fill="${card}" opacity=".85"/>
    <g class="eye">
      <ellipse cx="46" cy="42" rx="4.6" ry="5" fill="#7fb6d9" stroke="#3a3330" stroke-width="1"/>
      <circle cx="46" cy="42.5" r="2.2" fill="#3a3330"/><circle cx="47.5" cy="40.8" r="1.2" fill="#fff"/>
    </g>
    <g class="eye">
      <ellipse cx="74" cy="42" rx="4.6" ry="5" fill="#7fb6d9" stroke="#3a3330" stroke-width="1"/>
      <circle cx="74" cy="42.5" r="2.2" fill="#3a3330"/><circle cx="75.5" cy="40.8" r="1.2" fill="#fff"/>
    </g>
    <path d="M55 50 Q60 47.5 65 50 Q63.5 56 60 56.5 Q56.5 56 55 50 Z" fill="#4a3d33"/>
    <path d="M60 56.5 v3.5" stroke="#4a3d33" stroke-width="1.8"/>
    <path d="M52 60 Q60 66 68 60" stroke="#4a3d33" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M56 61.5 Q60 69 64 61.5 Z" fill="#e8848f"/>
    <ellipse cx="38" cy="50" rx="4" ry="2.4" fill="#eba3ad" opacity=".45"/>
    <ellipse cx="82" cy="50" rx="4" ry="2.4" fill="#eba3ad" opacity=".45"/>`;
};
const huskySVG = (fur, collar) => `
  <svg width="96" height="98" viewBox="0 0 120 122" xmlns="http://www.w3.org/2000/svg">${huskyGuts(fur, collar)}
  </svg>`;

/* ---------- pause overlay ----------
   Every game calls setupPause(onRestart) once at startup. It injects a
   ⏸ button + overlay (only once — safe to call after a restart too),
   and wires: resume, restart (game-specific, via the callback you pass),
   choose a game (the picker screen), and home (the welcome screen). */
function setupPause(onRestart){
  if(!document.getElementById('pauseBtn')){
    const btn = document.createElement('button');
    btn.id = 'pauseBtn'; btn.className = 'roundBtn'; btn.title = 'pause';
    btn.textContent = '⏸';
    document.body.appendChild(btn);
  }
  if(!document.getElementById('pauseOverlay')){
    const ov = document.createElement('div');
    ov.id = 'pauseOverlay'; ov.className = 'hidden';
    ov.innerHTML = `
      <div class="pausePanel">
        <div style="font-size:25px;">paused ♥</div>
        <button class="btn" id="resumeBtn">resume ▶</button>
        <button class="btn" id="restartBtn">restart ↺</button>
        <a class="btn" href="index.html#games">choose a game ♥</a>
        <a class="btn" href="index.html">home ⌂</a>
      </div>`;
    document.body.appendChild(ov);
  }
  const btn = document.getElementById('pauseBtn');
  const ov  = document.getElementById('pauseOverlay');
  btn.onclick = () => ov.classList.remove('hidden');
  ov.querySelector('#resumeBtn').onclick = () => ov.classList.add('hidden');
  ov.querySelector('#restartBtn').onclick = () => { ov.classList.add('hidden'); onRestart(); };
}

/* put Archy, Ice & Chip in the corner of any page */
function buildPack(){
  const names   = ['Archy', 'Ice', 'Chip'];
  const furs    = ['#6b7683', '#c3cfd9', '#b98a62'];
  const collars = [PALETTE[0], PALETTE[4], PALETTE[3]];
  let pack = document.getElementById('pack');
  if(!pack){ pack = document.createElement('div'); pack.id = 'pack'; document.body.appendChild(pack); }
  names.forEach((name, i) => {
    const d = document.createElement('div');
    d.className = 'dog';
    d.title = name;
    d.innerHTML = huskySVG(furs[i], collars[i]) + `<span class="tag">${name}</span>`;
    d.querySelector('.tail').style.animationDelay = (i * -1.1) + 's';
    d.addEventListener('click', e => { awoo(); sparkRaw(e.clientX, e.clientY - 25, 7); });
    pack.appendChild(d);
  });
}
