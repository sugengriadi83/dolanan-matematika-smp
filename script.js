// ============================================================================
// MATH LEGENDS: BATTLE ARENA — ENGINE UTAMA (script.js)
// EDISI MUSIK PERANG BUTO HOREG & KARAKTER CHIBI 2.5D HALUS
// ============================================================================

const STORAGE_KEY = "MATH_LEGENDS_SAVE_V1";

// Daftar Misi Harian & Prestasi
const DAILY_MISSIONS_TEMPLATE = [
  { id: "m_ans10", title: "Jawab 10 soal dengan benar hari ini", target: 10, rewardCoins: 80, rewardGems: 2, type: "correct" },
  { id: "m_win3", title: "Menangkan 3 pertandingan di Pelataran Candi", target: 3, rewardCoins: 100, rewardGems: 3, type: "win" },
  { id: "m_combo5", title: "Capai minimal Combo 5 berturut-turut", target: 5, rewardCoins: 90, rewardGems: 2, type: "combo" },
  { id: "m_boss1", title: "Taklukkan 1 Boss Battle Raksasa", target: 1, rewardCoins: 120, rewardGems: 5, type: "boss" },
  { id: "m_hots5", title: "Jawab benar 5 soal penalaran tingkat Sulit", target: 5, rewardCoins: 110, rewardGems: 4, type: "sulit" }
];

const ACHIEVEMENTS_LIST = [
  { id: "ach_first_win", title: "First Victory", desc: "Memenangkan pertarungan pertamamu di Arena Keraton.", icon: "🏆" },
  { id: "ach_explorer", title: "Math Explorer", desc: "Menjawab total 25 soal matematika.", icon: "🧭" },
  { id: "ach_combo", title: "Combo Master", desc: "Mencapai 5 jawaban benar beruntun (Combo x5).", icon: "🔥" },
  { id: "ach_algebra", title: "Algebra Champion", desc: "Menjawab benar soal materi Aljabar/Persamaan.", icon: "🔮" },
  { id: "ach_geometry", title: "Geometry Legend", desc: "Menjawab benar soal materi Geometri/Bangun.", icon: "📐" },
  { id: "ach_perfect", title: "Perfect Round", desc: "Menyelesaikan pertandingan dengan akurasi 100%.", icon: "🌟" },
  { id: "ach_scholar", title: "Daily Scholar", desc: "Menyelesaikan sebuah Misi Harian.", icon: "📚" }
];

const COSMETIC_SHOP_ITEMS = [
  { id: "frame_gold", name: "Bingkai Suryo Majapahit", type: "frame", cssClass: "frame-gold", priceCoins: 120, desc: "Bingkai ukiran emas keraton berkilau untuk profilmu." },
  { id: "frame_cyan", name: "Bingkai Tirta Amerta", type: "frame", cssClass: "frame-cyan", priceCoins: 150, desc: "Aura pusaka air suci biru elektrik." },
  { id: "frame_fire", name: "Bingkai Geni Brahmana", type: "frame", cssClass: "frame-fire", priceCoins: 220, desc: "Kobaran api semangat juara numerasi Nusantara." }
];

// ============================================================================
// SISTEM WEB AUDIO API — ARANSEMEN "PERANG BUTO HOREG" (KENDANG & GAMELAN)
// ============================================================================
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.sfxEnabled = true;
    this.bgmEnabled = false;
    this.bgmInterval = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playTone(freq, duration = 0.22, type = "sawtooth", vol = 0.18) {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  click() { 
    this.playTone(340.0, 0.08, "triangle", 0.15); 
  }
  
  correct() {
    this.playTone(440.0, 0.15, "sawtooth", 0.22);
    setTimeout(() => this.playTone(587.33, 0.15, "sawtooth", 0.22), 90);
    setTimeout(() => this.playTone(880.0, 0.35, "triangle", 0.28), 180);
  }
  
  wrong() {
    this.playTone(110.0, 0.35, "sawtooth", 0.25);
    setTimeout(() => this.playTone(82.4, 0.45, "square", 0.25), 150);
  }
  
  attack() {
    this.playTone(523.25, 0.12, "square", 0.22);
    setTimeout(() => this.playTone(698.46, 0.22, "sawtooth", 0.26), 70);
  }
  
  win() {
    const horegWin = [220.0, 329.63, 440.0, 554.37, 659.25, 880.0];
    horegWin.forEach((f, idx) => {
      setTimeout(() => this.playTone(f, idx === horegWin.length - 1 ? 1.5 : 0.25, "triangle", 0.3), idx * 140);
    });
  }

  toggleBgm(forceState) {
    this.bgmEnabled = typeof forceState === "boolean" ? forceState : !this.bgmEnabled;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    if (this.bgmEnabled) {
      this.init();
      
      // Pola Ketukan Ritmik "Perang Buto Horeg" (Dentuman Bass Kendang + Saron)
      const horegBeatPattern = [
        { f: 98.0, t: "sawtooth", d: 0.28 },  // Dentuman Kendang Horeg Dalam (Gedug)
        { f: 440.0, t: "triangle", d: 0.15 }, // Saron Cepat
        { f: 587.33, t: "triangle", d: 0.15},// Saron Cepat
        { f: 98.0, t: "sawtooth", d: 0.28 },  // Dentuman Kendang Horeg Kedua
        { f: 659.25, t: "triangle", d: 0.2 }, // Melodi Perang Tinggi
        { f: 440.0, t: "triangle", d: 0.15 }, // Saron
        { f: 196.0, t: "square", d: 0.35 },   // Kempul Menggelegar
        { f: 330.0, t: "triangle", d: 0.2 }   // Transisi Pelog
      ];
      
      let step = 0;
      this.bgmInterval = setInterval(() => {
        if (!this.bgmEnabled || !this.ctx) return;
        const beat = horegBeatPattern[step % horegBeatPattern.length];
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = beat.t;
        osc.frequency.setValueAtTime(beat.f, this.ctx.currentTime);
        
        gain.gain.setValueAtTime(beat.t === "sawtooth" ? 0.15 : 0.09, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + beat.d);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + beat.d);
        
        step++;
      }, 240); // Tempo cepat bertenaga khas cek sound buto horeg
    }
    return this.bgmEnabled;
  }
}

const sound = new SoundEngine();

// ============================================================================
// GENERATOR ILUSTRASI CHIBI RPG 2.5D (PEMISAHAN LAKI-LAKI & PEREMPUAN JELAS)
// ============================================================================
function renderHeroSVG(hero) {
  const uid = hero.id + "_" + Math.floor(Math.random() * 99999);
  const isFemale = hero.id === "jainem";

  const palettes = {
    paiman:  { hairHi: "#a16207", hairMid: "#713f12", hairDark: "#3f200a", eyeTop: "#1e40af", eyeBot: "#60a5fa", plume: "#38bdf8" },
    paitun:  { hairHi: "#4ade80", hairMid: "#15803d", hairDark: "#052e16", eyeTop: "#065f46", eyeBot: "#34d399", plume: "#facc15" },
    jainem:  { hairHi: "#fb923c", hairMid: "#c2410c", hairDark: "#431407", eyeTop: "#9d174d", eyeBot: "#f472b6", plume: "#f472b6" },
    cikrak:  { hairHi: "#854d0e", hairMid: "#522c06", hairDark: "#291502", eyeTop: "#115e59", eyeBot: "#2dd4bf", plume: "#a3e635" },
    bejo:    { hairHi: "#475569", hairMid: "#1e293b", hairDark: "#090d16", eyeTop: "#b45309", eyeBot: "#fde047", plume: "#fde047" },
    semprul: { hairHi: "#dc2626", hairMid: "#991b1b", hairDark: "#450a0a", eyeTop: "#9a3412", eyeBot: "#fb923c", plume: "#fb923c" },
    parman:  { hairHi: "#a855f7", hairMid: "#6b21a8", hairDark: "#2e1065", eyeTop: "#831843", eyeBot: "#f472b6", plume: "#e879f9" },
    partono: { hairHi: "#e2e8f0", hairMid: "#94a3b8", hairDark: "#334155", eyeTop: "#0f766e", eyeBot: "#5eead4", plume: "#fbbf24" }
  };
  const pal = palettes[hero.id] || palettes.paiman;

  let headgearBack = "";
  let headgearFront = "";
  let bodyOutfitSVG = "";

  if (isFemale) {
    headgearBack = `
      <circle cx="64" cy="38" r="16" fill="url(#hair_${uid})" stroke="#2d1810" stroke-width="2.2"/>
      <path d="M48 48 Q34 68 44 92 Q60 84 56 60 Z" fill="url(#hair_${uid})" stroke="#2d1810" stroke-width="2"/>
    `;
    headgearFront = `
      <path d="M58 42 Q85 24 112 42 L106 24 L94 31 L85 14 L76 31 L64 24 Z" fill="url(#gold_${uid})" stroke="#2d1810" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="85" cy="29" r="4.5" fill="#ec4899" stroke="#fff" stroke-width="1.2"/>
      <circle cx="62" cy="56" r="3.2" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
      <circle cx="59" cy="65" r="2.8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
      <circle cx="57" cy="74" r="2.2" fill="#fde047"/>
    `;
    bodyOutfitSVG = `
      <path d="M54 84 Q82 78 110 84 L106 142 Q82 148 58 142 Z" fill="${hero.color}" stroke="#2d1810" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M48 88 Q82 110 102 138 Q96 142 88 132 Q70 106 52 94 Z" fill="#ec4899" opacity="0.85" stroke="#2d1810" stroke-width="1.8"/>
      <rect x="58" y="112" width="48" height="7" rx="3" fill="url(#gold_${uid})" stroke="#2d1810" stroke-width="1.8"/>
      <circle cx="82" cy="115.5" r="3.5" fill="#db2777" stroke="#fff" stroke-width="1"/>
    `;
  } else {
    headgearBack = `
      <path d="M68 24 Q42 10 34 36 Q28 52 44 62 Q48 45 64 38 Z" fill="${pal.plume}" stroke="#2d1810" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M62 24 Q44 18 39 36" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
    `;
    headgearFront = `
      <path d="M55 44 Q84 30 113 43 L110 30 Q84 18 58 31 Z" fill="url(#armor_${uid})" stroke="#2d1810" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M62 42 Q85 32 108 41 L104 26 L92 33 L85 18 L77 33 L66 26 Z" fill="url(#gold_${uid})" stroke="#2d1810" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="85" cy="33" r="4.5" fill="#ef4444" stroke="#fef08a" stroke-width="1.2"/>
    `;
    bodyOutfitSVG = `
      <path d="M58 86 Q82 82 106 86 L102 140 Q82 148 62 140 Z" fill="url(#armor_${uid})" stroke="#2d1810" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M66 88 Q82 102 98 88" fill="none" stroke="url(#gold_${uid})" stroke-width="5" stroke-linecap="round"/>
      <line x1="82" y1="94" x2="82" y2="114" stroke="url(#gold_${uid})" stroke-width="3.5" stroke-linecap="round"/>
      <rect x="58" y="112" width="48" height="8" rx="3.5" fill="#78350f" stroke="#2d1810" stroke-width="2"/>
      <rect x="76" y="110" width="12" height="11" rx="2.5" fill="url(#gold_${uid})" stroke="#2d1810" stroke-width="1.8"/>
    `;
  }

  const rightHandWeapons = {
    sword: `
      <g transform="translate(0, 0)">
        <path d="M52 128 L14 140 L22 122 L54 116 Z" fill="url(#blade_${uid})" stroke="#2d1810" stroke-width="2.2" stroke-linejoin="round"/>
        <line x1="20" y1="133" x2="50" y2="122" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
        <path d="M48 110 L58 132" stroke="url(#gold_${uid})" stroke-width="6" stroke-linecap="round"/>
        <path d="M48 110 L58 132" stroke="#2d1810" stroke-width="2" stroke-linecap="round"/>
      </g>`,
    shield: `
      <g>
        <line x1="48" y1="126" x2="22" y2="86" stroke="#78350f" stroke-width="7" stroke-linecap="round"/>
        <circle cx="18" cy="80" r="14" fill="url(#gold_${uid})" stroke="#2d1810" stroke-width="2.4"/>
        <circle cx="14" cy="76" r="4" fill="#fef08a" opacity="0.8"/>
      </g>`,
    staff: `
      <g>
        <circle cx="38" cy="108" r="14" fill="#f472b6" opacity="0.35"/>
        <circle cx="38" cy="108" r="9" fill="#fdf4ff" stroke="#ec4899" stroke-width="2.5"/>
        <path d="M34 104 L42 112 M42 104 L34 112" stroke="#9d174d" stroke-width="2.2" stroke-linecap="round"/>
      </g>`,
    bow: `
      <g>
        <line x1="36" y1="118" x2="72" y2="106" stroke="url(#gold_${uid})" stroke-width="4" stroke-linecap="round"/>
        <polygon points="28,120 40,112 42,123" fill="#38bdf8" stroke="#2d1810" stroke-width="1.5"/>
      </g>`,
    lightning: `
      <g>
        <path d="M48 118 L34 106 L40 94 L24 82 L32 68" fill="none" stroke="#fde047" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M48 118 L34 106 L40 94 L24 82 L32 68" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>
      </g>`,
    hammer: `
      <g>
        <line x1="48" y1="126" x2="24" y2="78" stroke="#5c2d16" stroke-width="7" stroke-linecap="round"/>
        <rect x="8" y="62" width="34" height="22" rx="6" transform="rotate(-24 25 73)" fill="url(#gold_${uid})" stroke="#2d1810" stroke-width="2.4"/>
      </g>`,
    tome: `
      <g>
        <rect x="18" y="92" width="28" height="34" rx="5" transform="rotate(-12 32 109)" fill="#fef3c7" stroke="#78350f" stroke-width="2.5"/>
        <text x="25" y="115" fill="#991b1b" font-size="16" font-weight="900">∑</text>
      </g>`,
    chrono: `
      <g>
        <path d="M52 126 L16 134 L24 118 L54 114 Z" fill="#5eead4" stroke="#2d1810" stroke-width="2.2"/>
      </g>`
  };

  const leftHandGear = {
    sword: `
      <g>
        <ellipse cx="118" cy="114" rx="22" ry="27" transform="rotate(8 118 114)" fill="#2d1810"/>
        <ellipse cx="116" cy="113" rx="20" ry="25" transform="rotate(8 116 113)" fill="url(#gold_${uid})" stroke="#2d1810" stroke-width="2.2"/>
        <ellipse cx="117" cy="113" rx="15" ry="20" transform="rotate(8 117 113)" fill="url(#armor_${uid})" stroke="#fef08a" stroke-width="1.5"/>
        <polygon points="117,98 121,108 130,108 122,114 125,124 117,118 109,124 112,114 104,108 113,108" fill="url(#gold_${uid})"/>
        <circle cx="117" cy="113" r="4.5" fill="#ef4444" stroke="#fff" stroke-width="1"/>
        <path d="M107 98 Q116 95 123 102" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.65"/>
      </g>`,
    shield: `
      <g>
        <path d="M98 86 Q120 80 138 90 L134 128 Q116 144 96 128 Z" fill="url(#gold_${uid})" stroke="#2d1810" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M104 93 Q118 89 131 96 L128 123 Q116 135 102 123 Z" fill="url(#059669)" stroke="#fef08a" stroke-width="1.5"/>
        <circle cx="117" cy="110" r="7" fill="url(#gold_${uid})" stroke="#2d1810" stroke-width="1.5"/>
      </g>`,
    staff: `
      <g>
        <line x1="118" y1="54" x2="112" y2="152" stroke="#78350f" stroke-width="6" stroke-linecap="round"/>
        <line x1="118" y1="54" x2="112" y2="152" stroke="#fde047" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
        <circle cx="119" cy="48" r="14" fill="url(#gold_${uid})" stroke="#2d1810" stroke-width="2.2"/>
        <circle cx="119" cy="48" r="8" fill="#ec4899"/>
        <circle cx="116" cy="45" r="3" fill="#ffffff"/>
      </g>`,
    bow: `
      <g>
        <path d="M108 66 Q142 108 106 146" fill="none" stroke="url(#gold_${uid})" stroke-width="6" stroke-linecap="round"/>
        <path d="M108 66 Q142 108 106 146" fill="none" stroke="#2d1810" stroke-width="2" stroke-linecap="round"/>
        <line x1="108" y1="68" x2="106" y2="144" stroke="#fef3c7" stroke-width="2"/>
      </g>`,
    lightning: `
      <g>
        <ellipse cx="116" cy="113" rx="18" ry="23" transform="rotate(8 116 113)" fill="url(#gold_${uid})" stroke="#2d1810" stroke-width="2.4"/>
        <polygon points="118,98 108,114 117,114 112,128 126,110 117,110" fill="#38bdf8" stroke="#2d1810" stroke-width="1.2"/>
      </g>`,
    hammer: `
      <g>
        <ellipse cx="116" cy="113" rx="20" ry="25" transform="rotate(8 116 113)" fill="#ea580c" stroke="#2d1810" stroke-width="2.5"/>
        <ellipse cx="116" cy="113" rx="13" ry="17" transform="rotate(8 116 113)" fill="url(#gold_${uid})"/>
      </g>`,
    tome: `
      <g>
        <line x1="118" y1="62" x2="112" y2="150" stroke="#78350f" stroke-width="5.5" stroke-linecap="round"/>
        <polygon points="119,44 131,58 119,72 107,58" fill="#a855f7" stroke="url(#gold_${uid})" stroke-width="2.5"/>
      </g>`,
    chrono: `
      <g>
        <circle cx="118" cy="112" r="22" fill="url(#gold_${uid})" stroke="#2d1810" stroke-width="2.4"/>
        <circle cx="118" cy="112" r="15" fill="#0d9488" stroke="#fef08a" stroke-width="1.5"/>
        <line x1="118" y1="112" x2="118" y2="101" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="118" y1="112" x2="127" y2="112" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
      </g>`
  };

  return `
  <svg viewBox="0 0 165 180" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skin_${uid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ffe4c4"/>
        <stop offset="55%" stop-color="#f7c69c"/>
        <stop offset="100%" stop-color="#e09f6d"/>
      </linearGradient>
      <linearGradient id="hair_${uid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${pal.hairHi}"/>
        <stop offset="50%" stop-color="${pal.hairMid}"/>
        <stop offset="100%" stop-color="${pal.hairDark}"/>
      </linearGradient>
      <linearGradient id="armor_${uid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${hero.color}"/>
        <stop offset="100%" stop-color="#1e293b"/>
      </linearGradient>
      <linearGradient id="silver_${uid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="45%" stop-color="#cbd5e1"/>
        <stop offset="100%" stop-color="#64748b"/>
      </linearGradient>
      <linearGradient id="gold_${uid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#fef9c3"/>
        <stop offset="45%" stop-color="#facc15"/>
        <stop offset="100%" stop-color="#b45309"/>
      </linearGradient>
      <linearGradient id="eye_${uid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${pal.eyeTop}"/>
        <stop offset="100%" stop-color="${pal.eyeBot}"/>
      </linearGradient>
      <linearGradient id="blade_${uid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="60%" stop-color="#bae6fd"/>
        <stop offset="100%" stop-color="#0284c7"/>
      </linearGradient>
    </defs>

    <ellipse cx="84" cy="164" rx="38" ry="8" fill="rgba(0, 0, 0, 0.35)"/>
    <ellipse cx="84" cy="164" rx="26" ry="5" fill="rgba(0, 0, 0, 0.3)"/>

    <path d="M58 92 Q40 120 44 148 Q68 154 96 146 Z" fill="url(#armor_${uid})" stroke="#2d1810" stroke-width="2.4" stroke-linejoin="round"/>
    ${headgearBack}

    <path d="M86 136 L90 156 Q98 160 105 155 L100 136 Z" fill="#5c2d16" stroke="#2d1810" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M88 145 L102 145" stroke="url(#gold_${uid})" stroke-width="3" stroke-linecap="round"/>
    <path d="M64 136 L60 156 Q68 161 76 156 L78 136 Z" fill="#78350f" stroke="#2d1810" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M61 146 L76 146" stroke="url(#gold_${uid})" stroke-width="3" stroke-linecap="round"/>

    ${bodyOutfitSVG}

    <path d="M48 98 L44 114 L56 116 L58 100 Z" fill="#78350f" stroke="#2d1810" stroke-width="2.2" stroke-linejoin="round"/>
    <circle cx="50" cy="118" r="7" fill="url(#skin_${uid})" stroke="#2d1810" stroke-width="2.2"/>
    ${rightHandWeapons[hero.weapon] || rightHandWeapons.sword}

    <path d="M52 54 Q48 74 58 84 L104 82 Q114 70 110 52 Z" fill="url(#hair_${uid})" stroke="#2d1810" stroke-width="2.4" stroke-linejoin="round"/>
    <ellipse cx="56" cy="66" rx="5.5" ry="7" fill="url(#skin_${uid})" stroke="#2d1810" stroke-width="2.2"/>

    <path d="M58 46 Q58 30 85 30 Q112 30 112 52 Q113 68 104 78 Q92 86 78 85 Q60 84 58 66 Z" fill="url(#skin_${uid})" stroke="#2d1810" stroke-width="2.4" stroke-linejoin="round"/>
    <ellipse cx="70" cy="70" rx="5.5" ry="3" fill="#fb7185" opacity="0.45"/>
    <ellipse cx="104" cy="69" rx="4.5" ry="2.8" fill="#fb7185" opacity="0.45"/>

    <ellipse cx="76" cy="61" rx="6.2" ry="7.2" fill="#ffffff" stroke="#2d1810" stroke-width="2"/>
    <ellipse cx="77.5" cy="61.5" rx="4.6" ry="5.6" fill="url(#eye_${uid})"/>
    <circle cx="77.8" cy="62" r="2.6" fill="#1e1b4b"/>
    <circle cx="75.5" cy="58.5" r="2.1" fill="#ffffff"/>
    <circle cx="79.5" cy="64.5" r="1.1" fill="#ffffff"/>

    <ellipse cx="99" cy="60.5" rx="5.4" ry="6.8" fill="#ffffff" stroke="#2d1810" stroke-width="2"/>
    <ellipse cx="99.8" cy="61" rx="4" ry="5.2" fill="url(#eye_${uid})"/>
    <circle cx="100" cy="61.5" r="2.3" fill="#1e1b4b"/>
    <circle cx="98" cy="58.2" r="1.9" fill="#ffffff"/>
    <circle cx="101.2" cy="64" r="1" fill="#ffffff"/>

    <path d="M68 51 Q76 47 82 51" fill="none" stroke="${pal.hairDark}" stroke-width="2.8" stroke-linecap="round"/>
    <path d="M93 50.5 Q100 47 105 51" fill="none" stroke="${pal.hairDark}" stroke-width="2.8" stroke-linecap="round"/>
    <path d="M89 64 Q91 66 89 67.5" fill="none" stroke="#c27849" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M81 73 Q88 78 94 72.5" fill="none" stroke="#2d1810" stroke-width="2.3" stroke-linecap="round"/>

    <path d="M55 54 Q62 34 86 34 Q110 34 114 53 Q106 44 98 51 Q92 40 82 52 Q74 41 66 51 Q60 46 55 54 Z" fill="url(#hair_${uid})" stroke="#2d1810" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M68 42 Q78 38 86 43 M92 41 Q100 39 105 44" fill="none" stroke="#fef08a" stroke-width="2" stroke-linecap="round" opacity="0.45"/>

    ${headgearFront}
    ${leftHandGear[hero.weapon] || leftHandGear.sword}
  </svg>`;
}

function renderEnemySVG(enemy) {
  const uid = "enemy_" + Math.floor(Math.random() * 99999);
  return `
  <svg viewBox="0 0 165 180" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ebody_${uid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${enemy.color}"/>
        <stop offset="100%" stop-color="#450a0a"/>
      </linearGradient>
      <linearGradient id="egold_${uid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#fef08a"/>
        <stop offset="50%" stop-color="#f59e0b"/>
        <stop offset="100%" stop-color="#9a3412"/>
      </linearGradient>
    </defs>

    <ellipse cx="82" cy="164" rx="44" ry="9" fill="rgba(0,0,0,0.45)"/>

    <rect x="58" y="136" width="18" height="22" rx="7" fill="url(#ebody_${uid})" stroke="#2d1810" stroke-width="2.4"/>
    <rect x="90" y="136" width="18" height="22" rx="7" fill="url(#ebody_${uid})" stroke="#2d1810" stroke-width="2.4"/>

    <path d="M46 84 Q82 74 118 84 L114 140 Q82 148 50 140 Z" fill="url(#ebody_${uid})" stroke="#2d1810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M56 88 Q82 108 108 88" fill="none" stroke="url(#egold_${uid})" stroke-width="6" stroke-linecap="round"/>
    <rect x="50" y="124" width="64" height="11" rx="4" fill="url(#egold_${uid})" stroke="#2d1810" stroke-width="2.2"/>

    <line x1="36" y1="126" x2="18" y2="56" stroke="#5c2d16" stroke-width="8" stroke-linecap="round"/>
    <circle cx="16" cy="48" r="18" fill="#475569" stroke="#2d1810" stroke-width="2.5"/>
    <circle cx="12" cy="42" r="4" fill="url(#egold_${uid})"/>
    <circle cx="24" cy="46" r="4" fill="url(#egold_${uid})"/>
    <circle cx="15" cy="56" r="4" fill="url(#egold_${uid})"/>

    <path d="M48 46 Q48 26 82 26 Q116 26 116 48 Q118 76 102 86 Q82 92 60 86 Q46 78 48 46 Z" fill="url(#ebody_${uid})" stroke="#2d1810" stroke-width="2.5" stroke-linejoin="round"/>

    <path d="M52 40 L38 18 L62 30 Z" fill="url(#egold_${uid})" stroke="#2d1810" stroke-width="2" stroke-linejoin="round"/>
    <path d="M112 40 L126 18 L102 30 Z" fill="url(#egold_${uid})" stroke="#2d1810" stroke-width="2" stroke-linejoin="round"/>
    <path d="M60 36 L70 18 L82 28 L94 18 L104 36 Z" fill="url(#egold_${uid})" stroke="#2d1810" stroke-width="2" stroke-linejoin="round"/>

    <circle cx="66" cy="58" r="8" fill="#fef08a" stroke="#2d1810" stroke-width="2.2"/>
    <circle cx="94" cy="58" r="8.5" fill="#fef08a" stroke="#2d1810" stroke-width="2.2"/>
    <circle cx="64" cy="58" r="3.5" fill="#dc2626"/>
    <circle cx="92" cy="58" r="3.5" fill="#dc2626"/>
    <circle cx="62.5" cy="56" r="1.5" fill="#ffffff"/>
    <circle cx="90.5" cy="56" r="1.5" fill="#ffffff"/>
    <path d="M56 46 L75 52" stroke="#2d1810" stroke-width="4" stroke-linecap="round"/>
    <path d="M106 46 L85 52" stroke="#2d1810" stroke-width="4" stroke-linecap="round"/>

    <path d="M62 74 Q80 82 98 74" fill="none" stroke="#2d1810" stroke-width="3" stroke-linecap="round"/>
    <polygon points="65,75 69,66 74,76" fill="#ffffff" stroke="#2d1810" stroke-width="1.5"/>
    <polygon points="86,76 91,66 95,75" fill="#ffffff" stroke="#2d1810" stroke-width="1.5"/>
  </svg>`;
}

// ============================================================================
// STATE PEMAIN & LOCALSTORAGE
// ============================================================================
function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function getDefaultSaveData() {
  return {
    playerName: "Ksatria Numerasi",
    selectedHero: "paiman",
    unlockedHeroes: ["paiman", "paitun"],
    ownedCosmetics: ["default"],
    selectedFrame: "default",
    xp: 0,
    level: 1,
    coins: 100,
    gems: 5,
    rankPoints: 0,
    stats: {
      wins: 0,
      matches: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      maxCombo: 0
    },
    achievements: [],
    dailyDate: getTodayString(),
    dailyProgress: {
      correct: 0,
      win: 0,
      combo: 0,
      boss: 0,
      sulit: 0
    },
    claimedMissions: [],
    history: [],
    leaderboard: [
      { name: "Ksatria Numerasi", rank: "BRONZE", level: 1, xp: 0, wins: 0, acc: 0 }
    ],
    settings: {
      timerSec: 45,
      projectorFont: false
    }
  };
}

let playerData = loadPlayerData();

function loadPlayerData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultSaveData();
    const parsed = JSON.parse(raw);
    const def = getDefaultSaveData();
    const merged = { ...def, ...parsed, stats: { ...def.stats, ...(parsed.stats || {}) } };

    if (merged.dailyDate !== getTodayString()) {
      merged.dailyDate = getTodayString();
      merged.dailyProgress = { correct: 0, win: 0, combo: 0, boss: 0, sulit: 0 };
      merged.claimedMissions = [];
    }
    return merged;
  } catch (e) {
    return getDefaultSaveData();
  }
}

function savePlayerData() {
  const acc = playerData.stats.totalQuestions > 0
    ? Math.round((playerData.stats.correctAnswers / playerData.stats.totalQuestions) * 100)
    : 0;

  const existingIdx = playerData.leaderboard.findIndex(p => p.name === playerData.playerName);
  const entry = {
    name: playerData.playerName,
    rank: getRankName(playerData.rankPoints),
    level: playerData.level,
    xp: playerData.xp,
    wins: playerData.stats.wins,
    acc: acc
  };

  if (existingIdx >= 0) {
    playerData.leaderboard[existingIdx] = entry;
  } else {
    playerData.leaderboard.push(entry);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(playerData));
}

function getRankName(pts) {
  if (pts >= 1000) return "LEGEND";
  if (pts >= 700) return "DIAMOND";
  if (pts >= 450) return "PLATINUM";
  if (pts >= 250) return "GOLD";
  if (pts >= 100) return "SILVER";
  return "BRONZE";
}

function showToast(msg) {
  const el = document.getElementById("toast-msg");
  el.textContent = msg;
  el.classList.remove("hidden");
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => el.classList.add("hidden"), 3000);
}

// ============================================================================
// NAVIGASI LAYAR & UPDATE DASHBOARD
// ============================================================================
function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const target = document.getElementById(screenId);
  if (target) target.classList.add("active");

  const topbar = document.getElementById("global-topbar");
  if (screenId === "screen-splash") {
    topbar.classList.add("hidden");
  } else {
    topbar.classList.remove("hidden");
  }

  updateDashboardUI();
}

function getHeroById(id) {
  return HEROES_DATA.find(h => h.id === id) || HEROES_DATA[0];
}

function updateDashboardUI() {
  const hero = getHeroById(playerData.selectedHero);
  document.getElementById("top-coins").textContent = playerData.coins;
  document.getElementById("top-gems").textContent = playerData.gems;

  document.getElementById("dash-player-name").textContent = playerData.playerName;
  document.getElementById("dash-hero-title").textContent = `${hero.name} — ${hero.title}`;
  document.getElementById("dash-hero-svg").innerHTML = renderHeroSVG(hero);
  document.getElementById("dash-rank").textContent = getRankName(playerData.rankPoints);

  const frameEl = document.getElementById("dash-avatar-frame");
  frameEl.className = "avatar-frame " + (playerData.selectedFrame !== "default" ? playerData.selectedFrame : "");

  const xpNeeded = playerData.level * 100;
  const currentLevelXp = playerData.xp % 100;
  document.getElementById("dash-level").textContent = playerData.level;
  document.getElementById("dash-xp").textContent = playerData.xp;
  document.getElementById("dash-xp-next").textContent = xpNeeded;
  document.getElementById("dash-xp-bar").style.width = `${Math.min(100, (currentLevelXp / 100) * 100)}%`;

  document.getElementById("dash-stat-hp").textContent = hero.hp + (playerData.level - 1) * 5;
  document.getElementById("dash-stat-atk").textContent = hero.atk + (playerData.level - 1) * 2;
  document.getElementById("dash-stat-def").textContent = hero.def + (playerData.level - 1) * 1;

  document.getElementById("stat-wins").textContent = playerData.stats.wins;
  document.getElementById("stat-total-q").textContent = playerData.stats.totalQuestions;
  const acc = playerData.stats.totalQuestions > 0
    ? Math.round((playerData.stats.correctAnswers / playerData.stats.totalQuestions) * 100)
    : 0;
  document.getElementById("stat-accuracy").textContent = `${acc}%`;
  document.getElementById("stat-max-combo").textContent = playerData.stats.maxCombo;
}

// ============================================================================
// SISTEM BATTLE ARENA & PEMBELAJARAN ADAPTIF
// ============================================================================
let battleState = null;
let battleTimerInterval = null;

function populateTopicsDropdown(grade) {
  const selectTopic = document.getElementById("select-topic");
  selectTopic.innerHTML = `<option value="all">Semua Materi</option>`;

  const topics = new Set();
  QUESTION_BANK.forEach(q => {
    if (grade === "all" || q.kelas === grade) {
      topics.add(q.materi);
    }
  });

  Array.from(topics).forEach(t => {
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    selectTopic.appendChild(opt);
  });
}

function openBattleSetup(mode) {
  sound.click();
  const modal = document.getElementById("modal-setup");
  modal.dataset.mode = mode;

  const titles = {
    quick: "⚔️ Quick Battle (Pelataran Candi)",
    practice: "📖 Mode Latihan Pendopo",
    ranked: "🏆 Ranked Battle (Kejar Rank Legend!)",
    boss: "🐉 Boss Battle: Naga Kuadrat Bhuta",
    daily: "📅 Tantangan Harian Keraton",
    twoplayer: "👥 Duel 2 Ksatria (Satu Layar)",
    classroom: "👨‍🏫 Mode Kelas & Guru (Layar Proyektor)"
  };

  document.getElementById("setup-title").textContent = titles[mode] || "Persiapan Arena";
  document.getElementById("twoplayer-names").classList.toggle("hidden", mode !== "twoplayer");
  document.getElementById("chk-use-timer").checked = mode !== "practice";
  document.getElementById("timer-sec-label").textContent = playerData.settings.timerSec;

  if (mode === "classroom") {
    document.body.classList.add("projector-mode");
  }

  populateTopicsDropdown(document.getElementById("select-grade").value);
  modal.classList.remove("hidden");
}

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function startBattle() {
  sound.click();
  const modal = document.getElementById("modal-setup");
  const mode = modal.dataset.mode || "quick";
  const grade = document.getElementById("select-grade").value;
  const topic = document.getElementById("select-topic").value;
  const initDiff = document.getElementById("select-diff").value;
  const useTimer = document.getElementById("chk-use-timer").checked;

  modal.classList.add("hidden");

  const hero = getHeroById(playerData.selectedHero);
  const playerMaxHp = hero.hp + (playerData.level - 1) * 5;

  let enemyTemplate = ENEMIES_DATA[Math.floor(Math.random() * (ENEMIES_DATA.length - 1))];
  if (mode === "boss") {
    enemyTemplate = ENEMIES_DATA[ENEMIES_DATA.length - 1];
  }

  let pool = QUESTION_BANK.filter(q => {
    const matchGrade = grade === "all" || q.kelas === grade;
    const matchTopic = topic === "all" || q.materi === topic;
    return matchGrade && matchTopic;
  });

  if (pool.length < 5) pool = [...QUESTION_BANK];

  const totalQuestions = mode === "boss" ? 8 : mode === "twoplayer" ? 6 : mode === "classroom" ? 10 : 5;

  battleState = {
    mode,
    grade,
    topic,
    adaptiveMode: initDiff === "adaptive",
    currentDiff: initDiff === "adaptive" ? "mudah" : initDiff,
    useTimer,
    timerSec: playerData.settings.timerSec,
    timeLeft: playerData.settings.timerSec,
    paused: false,
    hero,
    playerHp: playerMaxHp,
    playerMaxHp,
    enemy: { ...enemyTemplate },
    enemyHp: enemyTemplate.hp,
    enemyMaxHp: enemyTemplate.hp,
    energy: 20,
    selectedSkill: 1,
    shieldActive: false,
    combo: 0,
    maxComboSession: 0,
    hintsLeft: 2,
    qIndex: 0,
    qTotal: totalQuestions,
    correctCount: 0,
    wrongStreak: 0,
    score: 0,
    pool: shuffleArray(pool),
    usedIds: new Set(),
    currentQuestion: null,
    currentShuffledOptions: [],
    rewardClaimed: false,
    p1Name: document.getElementById("p1-name-input").value || "Pemain 1",
    p2Name: document.getElementById("p2-name-input").value || "Pemain 2",
    p1Score: 0,
    p2Score: 0
  };

  document.getElementById("arena-mode-badge").textContent = mode.toUpperCase();
  document.getElementById("battle-p-name").textContent = hero.name;
  document.getElementById("battle-p-lvl").textContent = `Lv.${playerData.level}`;
  document.getElementById("battle-player-svg").innerHTML = renderHeroSVG(hero);

  document.getElementById("battle-e-name").textContent = battleState.enemy.name;
  document.getElementById("battle-e-lvl").textContent = battleState.enemy.title;
  document.getElementById("battle-enemy-svg").innerHTML = renderEnemySVG(battleState.enemy);

  document.getElementById("arena-timer-box").classList.toggle("hidden", !useTimer);
  document.getElementById("arena-turn-indicator").classList.toggle("hidden", mode !== "twoplayer");

  showScreen("screen-arena");
  updateArenaHUD();
  loadNextQuestion();
}

function updateArenaHUD() {
  if (!battleState) return;
  const pPct = Math.max(0, (battleState.playerHp / battleState.playerMaxHp) * 100);
  const ePct = Math.max(0, (battleState.enemyHp / battleState.enemyMaxHp) * 100);

  document.getElementById("battle-p-hp-bar").style.width = `${pPct}%`;
  document.getElementById("battle-p-hp-text").textContent = `${Math.max(0, battleState.playerHp)} / ${battleState.playerMaxHp}`;

  document.getElementById("battle-e-hp-bar").style.width = `${ePct}%`;
  document.getElementById("battle-e-hp-text").textContent = `${Math.max(0, battleState.enemyHp)} / ${battleState.enemyMaxHp}`;

  document.getElementById("battle-energy").textContent = battleState.energy;
  document.getElementById("hint-count").textContent = battleState.hintsLeft;

  const comboBadge = document.getElementById("battle-combo-badge");
  if (battleState.combo >= 2) {
    comboBadge.textContent = `🔥 COMBO x${battleState.combo}`;
    comboBadge.classList.remove("hidden");
  } else {
    comboBadge.classList.add("hidden");
  }

  document.getElementById("skill-btn-2").disabled = battleState.energy < 30;
  document.getElementById("skill-btn-3").disabled = battleState.energy < 60;
  document.querySelectorAll(".skill-btn[data-skill]").forEach(btn => {
    btn.classList.toggle("active", Number(btn.dataset.skill) === battleState.selectedSkill);
  });
}

function pickAdaptiveQuestion() {
  let targetDiff = battleState.currentDiff;
  if (battleState.selectedSkill === 2) targetDiff = "sedang";
  if (battleState.selectedSkill === 3) targetDiff = "sulit";

  let candidates = battleState.pool.filter(q => !battleState.usedIds.has(q.id) && q.kesulitan === targetDiff);
  if (candidates.length === 0) {
    candidates = battleState.pool.filter(q => !battleState.usedIds.has(q.id));
  }
  if (candidates.length === 0) {
    battleState.usedIds.clear();
    candidates = battleState.pool;
  }

  const chosen = candidates[Math.floor(Math.random() * candidates.length)];
  battleState.usedIds.add(chosen.id);
  return chosen;
}

function loadNextQuestion() {
  if (!battleState) return;

  if (battleState.enemyHp <= 0 || battleState.playerHp <= 0 || battleState.qIndex >= battleState.qTotal) {
    finishBattle();
    return;
  }

  battleState.qIndex++;
  document.getElementById("arena-q-index").textContent = battleState.qIndex;
  document.getElementById("arena-q-total").textContent = battleState.qTotal;

  if (battleState.mode === "twoplayer") {
    const isP1 = battleState.qIndex % 2 === 1;
    document.getElementById("arena-turn-indicator").textContent = `Giliran: ${isP1 ? battleState.p1Name : battleState.p2Name}`;
  }

  document.getElementById("feedback-panel").classList.add("hidden");
  document.getElementById("hint-box").classList.add("hidden");

  const q = pickAdaptiveQuestion();
  battleState.currentQuestion = q;
  battleState.currentShuffledOptions = shuffleArray(q.pilihan);

  document.getElementById("q-badge-grade").textContent = `Kelas ${q.kelas}`;
  document.getElementById("q-badge-topic").textContent = q.materi;
  const diffEl = document.getElementById("q-badge-diff");
  diffEl.textContent = q.kesulitan.toUpperCase();
  diffEl.className = `q-tag diff-${q.kesulitan}`;

  document.getElementById("question-text").textContent = q.soal;

  const optButtons = document.querySelectorAll("#options-grid .option-btn");
  optButtons.forEach((btn, idx) => {
    btn.disabled = false;
    btn.classList.remove("correct", "wrong");
    btn.querySelector(".opt-text").textContent = battleState.currentShuffledOptions[idx];
  });

  startQuestionTimer();
}

function startQuestionTimer() {
  clearInterval(battleTimerInterval);
  if (!battleState || !battleState.useTimer) return;

  battleState.timeLeft = battleState.timerSec;
  document.getElementById("arena-timer").textContent = battleState.timeLeft;

  battleTimerInterval = setInterval(() => {
    if (!battleState || battleState.paused) return;
    battleState.timeLeft--;
    document.getElementById("arena-timer").textContent = battleState.timeLeft;

    if (battleState.timeLeft <= 0) {
      clearInterval(battleTimerInterval);
      handleAnswerSelection(-1);
    }
  }, 1000);
}

function showFloatingDamage(side, text, color = "#fde047") {
  const el = document.getElementById(side === "enemy" ? "enemy-dmg-float" : "player-dmg-float");
  el.textContent = text;
  el.style.color = color;
  el.classList.remove("hidden");
  setTimeout(() => el.classList.add("hidden"), 900);
}

function handleAnswerSelection(selectedIndex) {
  if (!battleState) return;
  clearInterval(battleTimerInterval);

  const q = battleState.currentQuestion;
  const selectedText = selectedIndex >= 0 ? battleState.currentShuffledOptions[selectedIndex] : null;
  const isCorrect = selectedText === q.jawaban;

  const optButtons = document.querySelectorAll("#options-grid .option-btn");
  optButtons.forEach((btn, idx) => {
    btn.disabled = true;
    const txt = battleState.currentShuffledOptions[idx];
    if (txt === q.jawaban) btn.classList.add("correct");
    if (idx === selectedIndex && !isCorrect) btn.classList.add("wrong");
  });

  playerData.stats.totalQuestions++;

  const feedbackPanel = document.getElementById("feedback-panel");
  const feedbackHeader = document.getElementById("feedback-header");
  const feedbackExp = document.getElementById("feedback-explanation");

  if (isCorrect) {
    sound.correct();
    setTimeout(() => sound.attack(), 250);

    battleState.correctCount++;
    battleState.combo++;
    battleState.wrongStreak = 0;
    if (battleState.combo > battleState.maxComboSession) {
      battleState.maxComboSession = battleState.combo;
    }
    if (battleState.combo > playerData.stats.maxCombo) {
      playerData.stats.maxCombo = battleState.combo;
    }

    playerData.stats.correctAnswers++;
    playerData.dailyProgress.correct++;
    if (battleState.combo >= playerData.dailyProgress.combo) {
      playerData.dailyProgress.combo = battleState.combo;
    }
    if (q.kesulitan === "sulit") {
      playerData.dailyProgress.sulit++;
    }

    if (q.materi.toLowerCase().includes("aljabar") || q.materi.toLowerCase().includes("persamaan")) {
      unlockAchievement("ach_algebra");
    }
    if (q.materi.toLowerCase().includes("bangun") || q.materi.toLowerCase().includes("lingkaran") || q.materi.toLowerCase().includes("geometri")) {
      unlockAchievement("ach_geometry");
    }
    if (battleState.combo >= 5) unlockAchievement("ach_combo");
    if (playerData.stats.totalQuestions >= 25) unlockAchievement("ach_explorer");

    const baseAtk = battleState.hero.atk + (playerData.level - 1) * 2;
    let skillMult = 1.0;
    let fxIcon = "⚔️";

    if (battleState.selectedSkill === 2 && battleState.energy >= 30) {
      skillMult = 1.6;
      battleState.energy -= 30;
      battleState.shieldActive = true;
      document.getElementById("player-shield-fx").classList.remove("hidden");
      fxIcon = "🔮";
    } else if (battleState.selectedSkill === 3 && battleState.energy >= 60) {
      skillMult = 2.5;
      battleState.energy -= 60;
      fxIcon = "🌩️";
    } else {
      battleState.energy = Math.min(100, battleState.energy + 25);
    }

    const comboBonus = 1 + Math.min(0.5, (battleState.combo - 1) * 0.1);
    const totalDamage = Math.round(baseAtk * skillMult * comboBonus);
    battleState.enemyHp = Math.max(0, battleState.enemyHp - totalDamage);

    const pointsEarned = Math.round(q.poin * skillMult * comboBonus);
    battleState.score += pointsEarned;

    if (battleState.mode === "twoplayer") {
      if (battleState.qIndex % 2 === 1) battleState.p1Score += pointsEarned;
      else battleState.p2Score += pointsEarned;
    }

    const pWrap = document.getElementById("player-sprite-wrap");
    const eWrap = document.getElementById("enemy-sprite-wrap");
    const proj = document.getElementById("fx-projectile");
    proj.textContent = fxIcon;
    proj.classList.remove("hidden");

    pWrap.classList.add("anim-attack-right");
    setTimeout(() => {
      eWrap.classList.add("anim-hit");
      showFloatingDamage("enemy", `-${totalDamage} HP!`, "#fde047");
      proj.classList.add("hidden");
      updateArenaHUD();
    }, 300);
    setTimeout(() => {
      pWrap.classList.remove("anim-attack-right");
      eWrap.classList.remove("anim-hit");
    }, 650);

    if (battleState.adaptiveMode && battleState.combo >= 2) {
      if (battleState.currentDiff === "mudah") battleState.currentDiff = "sedang";
      else if (battleState.currentDiff === "sedang") battleState.currentDiff = "sulit";
    }

    battleState.selectedSkill = 1;

    feedbackHeader.textContent = `✅ JAWABAN BENAR! (Jurus Ksatria -${totalDamage} HP | +${pointsEarned} Poin)`;
    feedbackHeader.style.color = "#34d399";
  } else {
    sound.wrong();
    battleState.combo = 0;
    battleState.wrongStreak++;

    let enemyDmg = Math.max(8, battleState.enemy.atk - Math.floor(battleState.hero.def / 3));
    if (battleState.shieldActive) {
      enemyDmg = Math.round(enemyDmg * 0.35);
      battleState.shieldActive = false;
      document.getElementById("player-shield-fx").classList.add("hidden");
    }

    battleState.playerHp = Math.max(0, battleState.playerHp - enemyDmg);

    const pWrap = document.getElementById("player-sprite-wrap");
    const eWrap = document.getElementById("enemy-sprite-wrap");
    eWrap.classList.add("anim-attack-left");
    setTimeout(() => {
      pWrap.classList.add("anim-hit");
      showFloatingDamage("player", `-${enemyDmg} HP`, "#f87171");
      updateArenaHUD();
    }, 300);
    setTimeout(() => {
      eWrap.classList.remove("anim-attack-left");
      pWrap.classList.remove("anim-hit");
    }, 650);

    if (battleState.adaptiveMode && battleState.wrongStreak >= 2) {
      if (battleState.currentDiff === "sulit") battleState.currentDiff = "sedang";
      else if (battleState.currentDiff === "sedang") battleState.currentDiff = "mudah";
    }

    const reasonText = selectedIndex === -1 ? "⏰ Waktu Habis!" : "🛡️ Belum Tepat, Tetap Semangat Ksatria!";
    feedbackHeader.textContent = `${reasonText} (Lawan menyerang -${enemyDmg} HP)`;
    feedbackHeader.style.color = "#f87171";
  }

  feedbackExp.innerHTML = `
    <strong>Kunci Jawaban:</strong> ${q.jawaban}<br>
    <strong>Konsep Matematika:</strong> <em>${q.konsep}</em><br>
    <strong>Pembahasan:</strong> ${q.pembahasan}
  `;
  feedbackPanel.classList.remove("hidden");
  savePlayerData();
}

function finishBattle() {
  if (!battleState || battleState.rewardClaimed) return;
  battleState.rewardClaimed = true;
  clearInterval(battleTimerInterval);

  const isWin = battleState.enemyHp <= 0 || (battleState.playerHp > 0 && battleState.correctCount >= Math.ceil(battleState.qTotal / 2));
  if (isWin) sound.win();

  const xpEarned = battleState.correctCount * 20 + (isWin ? 35 : 10);
  const coinsEarned = battleState.correctCount * 15 + (isWin ? 40 : 10) + (battleState.mode === "daily" ? 50 : 0);
  const gemsEarned = isWin && (battleState.mode === "boss" || battleState.mode === "daily") ? 2 : isWin ? 1 : 0;

  playerData.xp += xpEarned;
  playerData.level = Math.floor(playerData.xp / 100) + 1;
  playerData.coins += coinsEarned;
  playerData.gems += gemsEarned;
  playerData.stats.matches++;

  if (isWin) {
    playerData.stats.wins++;
    playerData.rankPoints += battleState.mode === "ranked" ? 45 : 25;
    playerData.dailyProgress.win++;
    unlockAchievement("ach_first_win");
    if (battleState.mode === "boss") playerData.dailyProgress.boss++;
  } else if (battleState.mode === "ranked") {
    playerData.rankPoints = Math.max(0, playerData.rankPoints - 10);
  }

  if (battleState.correctCount === battleState.qIndex && battleState.qIndex > 0) {
    unlockAchievement("ach_perfect");
  }

  playerData.history.unshift({
    date: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    mode: battleState.mode.toUpperCase(),
    result: isWin ? "MENANG" : "SELESAI",
    correct: `${battleState.correctCount}/${battleState.qIndex}`,
    score: battleState.score
  });
  playerData.history = playerData.history.slice(0, 5);

  savePlayerData();
  updateDashboardUI();

  const banner = document.getElementById("result-banner");
  banner.textContent = isWin ? "🏆 KEJAYAAN NUSANTARA!" : "🛡️ PERTARUNGAN SELESAI";
  document.getElementById("result-title").textContent = isWin
    ? "Luar Biasa, Sang Ksatria Matematika!"
    : "Jangan Menyerah, Berlatih Membuat Kesaktianmu Makin Kuat!";

  document.getElementById("res-score").textContent = battleState.score;
  document.getElementById("res-correct").textContent = `${battleState.correctCount} / ${battleState.qIndex}`;
  document.getElementById("res-xp").textContent = `+${xpEarned} XP`;
  document.getElementById("res-coins").textContent = `+${coinsEarned} 🪙 ${gemsEarned > 0 ? `+${gemsEarned} 💎` : ""}`;

  const twoPBox = document.getElementById("res-2p-summary");
  if (battleState.mode === "twoplayer") {
    twoPBox.classList.remove("hidden");
    const winner2P = battleState.p1Score > battleState.p2Score
      ? `🎉 Pemenang Duel: ${battleState.p1Name}!`
      : battleState.p2Score > battleState.p1Score
      ? `🎉 Pemenang Duel: ${battleState.p2Name}!`
      : "🤝 Hasil Duel Seri!";
    twoPBox.innerHTML = `<div class="notice-box"><strong>${winner2P}</strong><br>${battleState.p1Name}: ${battleState.p1Score} poin | ${battleState.p2Name}: ${battleState.p2Score} poin</div>`;
  } else {
    twoPBox.classList.add("hidden");
  }

  document.getElementById("modal-result").classList.remove("hidden");
}

function renderHeroesScreen() {
  const container = document.getElementById("heroes-list-grid");
  container.innerHTML = "";

  HEROES_DATA.forEach(h => {
    const isUnlocked = playerData.unlockedHeroes.includes(h.id);
    const isSelected = playerData.selectedHero === h.id;

    const card = document.createElement("div");
    card.className = "item-card";
    card.innerHTML = `
      <div class="hero-svg-container">${renderHeroSVG(h)}</div>
      <h3>${h.name}</h3>
      <p class="hero-subtitle">${h.title}</p>
      <p style="font-size:0.86rem; color:#fde68a;">${h.desc}</p>
      <div class="hero-stats-mini">
        <span class="stat-pill">❤️ ${h.hp}</span>
        <span class="stat-pill">⚔️ ${h.atk}</span>
        <span class="stat-pill">🛡️ ${h.def}</span>
      </div>
      ${
        isSelected
          ? `<button class="btn-secondary" disabled>✅ Sedang Digunakan</button>`
          : isUnlocked
          ? `<button class="btn-primary" data-select-hero="${h.id}">Pilih Ksatria</button>`
          : `<button class="btn-primary" data-buy-hero="${h.id}">🔓 Buka (${h.price} 🪙)</button>`
      }
    `;
    container.appendChild(card);
  });

  container.querySelectorAll("[data-select-hero]").forEach(btn => {
    btn.addEventListener("click", () => {
      sound.click();
      playerData.selectedHero = btn.dataset.selectHero;
      savePlayerData();
      renderHeroesScreen();
      updateDashboardUI();
      showToast("Ksatria berhasil dipilih!");
    });
  });

  container.querySelectorAll("[data-buy-hero]").forEach(btn => {
    btn.addEventListener("click", () => {
      const hero = getHeroById(btn.dataset.buyHero);
      if (playerData.coins < hero.price) {
        sound.wrong();
        showToast("Koin Emas belum cukup! Ayo bertarung dan jawab soal lagi.");
        return;
      }
      sound.win();
      playerData.coins -= hero.price;
      playerData.unlockedHeroes.push(hero.id);
      playerData.selectedHero = hero.id;
      savePlayerData();
      renderHeroesScreen();
      updateDashboardUI();
      showToast(`Selamat! Ksatria ${hero.name} berhasil dibuka!`);
    });
  });
}

function renderMissionsScreen() {
  const list = document.getElementById("missions-list");
  list.innerHTML = "";

  DAILY_MISSIONS_TEMPLATE.forEach(m => {
    const current = playerData.dailyProgress[m.type] || 0;
    const isDone = current >= m.target;
    const isClaimed = playerData.claimedMissions.includes(m.id);

    const row = document.createElement("div");
    row.className = "mission-row";
    row.innerHTML = `
      <div>
        <h4>${m.title}</h4>
        <p style="color:#fde68a; font-size:0.9rem;">Progres: <strong>${Math.min(current, m.target)} / ${m.target}</strong> | Hadiah: 🪙 ${m.rewardCoins} + 💎 ${m.rewardGems}</p>
      </div>
      <div>
        ${
          isClaimed
            ? `<button class="btn-secondary" disabled>✅ Sudah Diklaim</button>`
            : isDone
            ? `<button class="btn-primary" data-claim="${m.id}">🎁 Klaim Hadiah</button>`
            : `<span class="q-tag">Belum Selesai</span>`
        }
      </div>
    `;
    list.appendChild(row);
  });

  list.querySelectorAll("[data-claim]").forEach(btn => {
    btn.addEventListener("click", () => {
      const m = DAILY_MISSIONS_TEMPLATE.find(x => x.id === btn.dataset.claim);
      if (!m || playerData.claimedMissions.includes(m.id)) return;
      sound.win();
      playerData.coins += m.rewardCoins;
      playerData.gems += m.rewardGems;
      playerData.claimedMissions.push(m.id);
      unlockAchievement("ach_scholar");
      savePlayerData();
      renderMissionsScreen();
      updateDashboardUI();
      showToast(`Hadiah Misi +${m.rewardCoins} Koin & +${m.rewardGems} Permata diterima!`);
    });
  });
}

function unlockAchievement(achId) {
  if (!playerData.achievements.includes(achId)) {
    playerData.achievements.push(achId);
    const ach = ACHIEVEMENTS_LIST.find(a => a.id === achId);
    if (ach) showToast(`🏅 Prestasi Terbuka: ${ach.title}!`);
  }
}

function renderAchievementsScreen() {
  const grid = document.getElementById("achievements-grid");
  grid.innerHTML = "";

  ACHIEVEMENTS_LIST.forEach(a => {
    const unlocked = playerData.achievements.includes(a.id);
    const card = document.createElement("div");
    card.className = "item-card";
    card.style.opacity = unlocked ? "1" : "0.45";
    card.innerHTML = `
      <div style="font-size:2.8rem;">${a.icon}</div>
      <h3>${a.title}</h3>
      <p style="font-size:0.9rem; color:#fde68a;">${a.desc}</p>
      <span class="q-tag">${unlocked ? "✅ TERCAPAI" : "🔒 TERKUNCI"}</span>
    `;
    grid.appendChild(card);
  });
}

function renderShopScreen() {
  const grid = document.getElementById("shop-items-grid");
  grid.innerHTML = "";

  HEROES_DATA.forEach(h => {
    const unlocked = playerData.unlockedHeroes.includes(h.id);
    const card = document.createElement("div");
    card.className = "item-card";
    card.innerHTML = `
      <div class="hero-svg-container">${renderHeroSVG(h)}</div>
      <h3>Ksatria: ${h.name}</h3>
      <p style="font-size:0.85rem; color:#fde68a;">${h.title}</p>
      ${
        unlocked
          ? `<button class="btn-secondary" disabled>Sudah Dimiliki</button>`
          : `<button class="btn-primary" data-shop-hero="${h.id}">Beli (${h.price} 🪙)</button>`
      }
    `;
    grid.appendChild(card);
  });

  COSMETIC_SHOP_ITEMS.forEach(item => {
    const owned = playerData.ownedCosmetics.includes(item.cssClass);
    const card = document.createElement("div");
    card.className = "item-card";
    card.innerHTML = `
      <div style="font-size:2.6rem;">🖼️</div>
      <h3>${item.name}</h3>
      <p style="font-size:0.85rem; color:#fde68a;">${item.desc}</p>
      ${
        owned
          ? `<button class="btn-secondary" disabled>Sudah Dimiliki</button>`
          : `<button class="btn-primary" data-shop-cosmetic="${item.id}">Beli (${item.priceCoins} 🪙)</button>`
      }
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll("[data-shop-hero]").forEach(btn => {
    btn.addEventListener("click", () => {
      const h = getHeroById(btn.dataset.shopHero);
      if (playerData.coins < h.price) {
        sound.wrong();
        showToast("Saldo Koin belum mencukupi!");
        return;
      }
      sound.win();
      playerData.coins -= h.price;
      playerData.unlockedHeroes.push(h.id);
      savePlayerData();
      renderShopScreen();
      updateDashboardUI();
      showToast(`Ksatria ${h.name} berhasil dibeli!`);
    });
  });

  grid.querySelectorAll("[data-shop-cosmetic]").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = COSMETIC_SHOP_ITEMS.find(c => c.id === btn.dataset.shopCosmetic);
      if (!item || playerData.coins < item.priceCoins) {
        sound.wrong();
        showToast("Saldo Koin belum mencukupi!");
        return;
      }
      sound.win();
      playerData.coins -= item.priceCoins;
      playerData.ownedCosmetics.push(item.cssClass);
      playerData.selectedFrame = item.cssClass;
      savePlayerData();
      renderShopScreen();
      updateDashboardUI();
      showToast(`${item.name} berhasil dibeli & dipasang!`);
    });
  });
}

function renderLeaderboardScreen() {
  const tbody = document.getElementById("leaderboard-tbody");
  tbody.innerHTML = "";
  const sorted = [...playerData.leaderboard].sort((a, b) => b.xp - a.xp);

  sorted.forEach((row, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>#${i + 1}</td>
      <td><strong>${row.name}</strong></td>
      <td><span class="rank-badge">${row.rank}</span></td>
      <td>Lv.${row.level}</td>
      <td>${row.xp} XP</td>
      <td>${row.wins}</td>
      <td>${row.acc}%</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderProfileScreen() {
  document.getElementById("input-player-name").value = playerData.playerName;
  const sel = document.getElementById("select-frame-style");
  sel.innerHTML = `<option value="default">Bingkai Standar Ksatria</option>`;

  COSMETIC_SHOP_ITEMS.forEach(c => {
    if (playerData.ownedCosmetics.includes(c.cssClass)) {
      const opt = document.createElement("option");
      opt.value = c.cssClass;
      opt.textContent = c.name;
      if (playerData.selectedFrame === c.cssClass) opt.selected = true;
      sel.appendChild(opt);
    }
  });

  const histList = document.getElementById("match-history-list");
  histList.innerHTML = playerData.history.length === 0
    ? `<li>Belum ada riwayat pertandingan.</li>`
    : playerData.history.map(h => `<li>[${h.date}] <strong>${h.mode}</strong> — ${h.result} | Benar: ${h.correct} | Skor: ${h.score}</li>`).join("");
}

// ============================================================================
// INISIALISASI EVENT LISTENER
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  const splashShowcase = document.getElementById("splash-hero-preview");
  HEROES_DATA.slice(0, 5).forEach(h => {
    const d = document.createElement("div");
    d.className = "splash-hero-box";
    d.innerHTML = renderHeroSVG(h);
    splashShowcase.appendChild(d);
  });

  document.getElementById("btn-start-game").addEventListener("click", () => {
    sound.click();
    showScreen("screen-dashboard");
  });

  document.getElementById("btn-splash-audio").addEventListener("click", () => {
    sound.toggleBgm(true);
    document.getElementById("btn-toggle-bgm").textContent = "🎵 Musik: ON";
    sound.click();
    showScreen("screen-dashboard");
  });

  document.getElementById("btn-home-nav").addEventListener("click", () => {
    clearInterval(battleTimerInterval);
    sound.click();
    showScreen("screen-dashboard");
  });

  document.getElementById("btn-toggle-bgm").addEventListener("click", (e) => {
    const on = sound.toggleBgm();
    e.target.textContent = `🎵 Musik: ${on ? "ON" : "OFF"}`;
  });

  document.getElementById("btn-toggle-sfx").addEventListener("click", (e) => {
    sound.sfxEnabled = !sound.sfxEnabled;
    e.target.textContent = `🔊 Suara: ${sound.sfxEnabled ? "ON" : "OFF"}`;
  });

  document.getElementById("btn-fullscreen").addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  });

  document.getElementById("btn-play-now").addEventListener("click", () => openBattleSetup("quick"));
  document.getElementById("btn-change-hero").addEventListener("click", () => {
    sound.click();
    renderHeroesScreen();
    showScreen("screen-heroes");
  });

  document.querySelectorAll(".mode-card").forEach(card => {
    card.addEventListener("click", () => openBattleSetup(card.dataset.mode));
  });

  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      sound.click();
      const target = btn.dataset.target;
      if (target === "screen-missions") renderMissionsScreen();
      if (target === "screen-achievements") renderAchievementsScreen();
      if (target === "screen-shop") renderShopScreen();
      if (target === "screen-leaderboard") renderLeaderboardScreen();
      if (target === "screen-profile") renderProfileScreen();
      showScreen(target);
    });
  });

  document.getElementById("select-grade").addEventListener("change", (e) => {
    populateTopicsDropdown(e.target.value);
  });
  document.getElementById("btn-close-setup").addEventListener("click", () => {
    document.getElementById("modal-setup").classList.add("hidden");
  });
  document.getElementById("btn-Cancel-setup").addEventListener("click", () => {
    document.getElementById("modal-setup").classList.add("hidden");
  });
  document.getElementById("btn-launch-battle").addEventListener("click", startBattle);

  document.querySelectorAll(".skill-btn[data-skill]").forEach(btn => {
    btn.addEventListener("click", () => {
      if (!battleState) return;
      sound.click();
      battleState.selectedSkill = Number(btn.dataset.skill);
      updateArenaHUD();
    });
  });

  document.getElementById("btn-use-hint").addEventListener("click", () => {
    if (!battleState || battleState.hintsLeft <= 0) {
      showToast("Jatah petunjuk sudah habis!");
      return;
    }
    sound.click();
    battleState.hintsLeft--;
    const q = battleState.currentQuestion;
    const hintBox = document.getElementById("hint-box");
    hintBox.innerHTML = `💡 <strong>Wejangan Empu Guru:</strong> Gunakan konsep <em>${q.konsep}</em>. Perhatikan langkah awal: ${q.pembahasan.split(".")[0]}.`;
    hintBox.classList.remove("hidden");
    updateArenaHUD();
  });

  document.querySelectorAll("#options-grid .option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      handleAnswerSelection(Number(btn.dataset.idx));
    });
  });

  document.getElementById("btn-next-question").addEventListener("click", () => {
    sound.click();
    loadNextQuestion();
  });

  document.getElementById("btn-pause-game").addEventListener("click", (e) => {
    if (!battleState) return;
    battleState.paused = !battleState.paused;
    e.target.textContent = battleState.paused ? "▶️ Lanjut" : "⏸️ Jeda";
    showToast(battleState.paused ? "Permainan dijeda" : "Permainan dilanjutkan");
  });

  document.getElementById("btn-quit-battle").addEventListener("click", () => {
    clearInterval(battleTimerInterval);
    showScreen("screen-dashboard");
  });

  document.getElementById("btn-result-home").addEventListener("click", () => {
    document.getElementById("modal-result").classList.add("hidden");
    showScreen("screen-dashboard");
  });
  document.getElementById("btn-result-rematch").addEventListener("click", () => {
    document.getElementById("modal-result").classList.add("hidden");
    startBattle();
  });

  document.getElementById("btn-save-profile").addEventListener("click", () => {
    const newName = document.getElementById("input-player-name").value.trim();
    if (newName) playerData.playerName = newName;
    playerData.selectedFrame = document.getElementById("select-frame-style").value;
    savePlayerData();
    updateDashboardUI();
    showToast("Profil Ksatria berhasil disimpan!");
  });

  document.getElementById("btn-toggle-projector-font").addEventListener("click", (e) => {
    document.body.classList.toggle("projector-mode");
    const active = document.body.classList.contains("projector-mode");
    e.target.textContent = active ? "Matikan Font Besar" : "Aktifkan Font Besar";
  });

  document.getElementById("setting-timer-duration").addEventListener("change", (e) => {
    playerData.settings.timerSec = Number(e.target.value);
    savePlayerData();
    showToast(`Durasi timer diatur ke ${e.target.value} detik.`);
  });

  document.getElementById("btn-reset-data").addEventListener("click", () => {
    if (confirm("Yakin ingin mereset seluruh progres XP, Ksatria, dan Koin ke awal?")) {
      localStorage.removeItem(STORAGE_KEY);
      playerData = getDefaultSaveData();
      savePlayerData();
      updateDashboardUI();
      showToast("Data progres telah direset ke awal.");
    }
  });

  updateDashboardUI();
});