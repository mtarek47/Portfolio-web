/**
 * BYTE — Interactive AI Companion & DevOps Mascot Bot
 * Inspired by jihadjp.com's interactive PetBuddy
 * Handcrafted for Tarek Parvez (M Tarek Rahman) Portfolio
 * 
 * Features:
 * - 60 FPS Physics engine with Drag, Toss, Gravity & Boundary Bouncing
 * - Real-time Mouse Gaze / Eye Tracking via Trigonometry
 * - Mood State Machine (normal, happy, laugh, think, sleep, drag)
 * - Autonomous Inactivity Sleep ("Z z z") & Waking
 * - Client-Side Instant Knowledge Engine (0ms latency, zero API costs)
 * - Deep-link Action Buttons that scroll directly to portfolio sections
 * - Web Audio API synthesized retro sci-fi sound effects
 */

(function () {
  'use strict';

  // --- Web Audio Synthesizer (Zero asset dependencies) ---
  class SoundFX {
    constructor() {
      this.ctx = null;
    }
    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      }
    }
    playPop() {
      try {
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(420, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(780, this.ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
      } catch (e) {}
    }
    playChirp() {
      try {
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, this.ctx.currentTime);
        osc.frequency.setValueAtTime(880, this.ctx.currentTime + 0.06);
        gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.14);
      } catch (e) {}
    }
  }
  const sfx = new SoundFX();

  // --- Comprehensive Knowledge Base for Tarek Parvez ---
  const KNOWLEDGE_BASE = [
    {
      intents: ['who', 'about', 'intro', 'identity', 'tarek', 'k', 'parvez', 'developer', 'engineer', 'kemon'],
      reply: "Hi there! I'm <strong>Byte</strong>, Tarek's personal DevOps companion. <strong>Tarek Parvez (M Tarek Rahman)</strong> is a DevOps & Software Engineer based in Dhaka, BD. He specializes in CI/CD automation, Docker, Linux, and Java Spring Boot architectures!",
      mood: 'laugh',
      actions: [
        { label: '🧑‍💻 Read Full Bio', selector: '#about, .about-section, main' },
        { label: '📄 View Résumé', link: 'resume.html' }
      ]
    },
    {
      intents: ['project', 'work', 'build', 'portfolio', 'case study', 'featured', 'kaj'],
      reply: "Tarek has engineered robust DevOps pipelines, microservices, and full-stack platforms. His featured work includes automated Docker deployments, cloud monitoring stacks, and high-performance backend systems.",
      mood: 'happy',
      actions: [
        { label: '🚀 Explore Projects', selector: '#projects, .projects-section, .featured-projects' },
        { label: '📂 All Case Studies', link: 'projects.html' }
      ]
    },
    {
      intents: ['skill', 'stack', 'tech', 'devops', 'docker', 'ci/cd', 'kubernetes', 'linux', 'spring', 'java', 'dokhota'],
      reply: "Tarek's core tech arsenal spans:<br>• <strong>DevOps & Infra:</strong> Docker, CI/CD (GitHub Actions), Linux (Ubuntu/Debian), Nginx, Git.<br>• <strong>Backend:</strong> Java, Spring Boot, REST APIs, PostgreSQL, MySQL.<br>• <strong>Frontend:</strong> Modern HTML5, CSS3, JavaScript (ES6+), D3.js visualization.",
      mood: 'happy',
      actions: [
        { label: '🛠️ Interactive Skills Graph', link: 'skills.html' },
        { label: '📜 DevOps Pipeline Specs', selector: '#pipeline, .devops-lifecycle' }
      ]
    },
    {
      intents: ['resume', 'cv', 'hire', 'experience', 'background', 'download'],
      reply: "Looking to hire or review Tarek's engineering track record? You can inspect his comprehensive credentials or download his official resume.",
      mood: 'happy',
      actions: [
        { label: '📄 Open Resume Page', link: 'resume.html' },
        { label: '💼 Work Experience', link: 'experience.html' }
      ]
    },
    {
      intents: ['contact', 'email', 'hire', 'reach', 'talk', 'linkedin', 'github', 'jogajog', 'message'],
      reply: "Tarek is always eager to collaborate on challenging engineering problems, cloud infrastructure, or backend development!<br>📧 Email: <strong>tarekparvez47@gmail.com</strong><br>📍 Location: Dhaka, Bangladesh.",
      mood: 'laugh',
      actions: [
        { label: '📬 Contact Page', link: 'contact.html' },
        { label: '💼 LinkedIn', link: 'https://www.linkedin.com/in/m-tarek-rahman-06068a349/', external: true },
        { label: '🐙 GitHub', link: 'https://github.com/mtarek47', external: true }
      ]
    },
    {
      intents: ['docker', 'container', 'pipeline', 'cicd', 'automation', 'kubernetes'],
      reply: "DevOps is Tarek's true passion! He designs zero-downtime CI/CD deployment pipelines, multi-stage Docker container builds, automated unit/integration testing, and hardened Linux environments.",
      mood: 'laugh',
      actions: [
        { label: '⚙️ View DevOps Lifecycle', selector: '.devops-lifecycle, #pipeline' },
        { label: '🐙 Check GitHub Configs', link: 'https://github.com/mtarek47', external: true }
      ]
    },
    {
      intents: ['hi', 'hello', 'hey', 'salam', 'assalamu', 'halo', 'yo'],
      reply: "Hey! Glad you stopped by! I'm <strong>Byte</strong>. Feel free to drag me around the screen or ask me anything about Tarek's work, tech stack, and background!",
      mood: 'laugh',
      actions: [
        { label: '🚀 What can you do?', pill: 'Featured Projects' },
        { label: '🛠️ DevOps Tech Stack', pill: 'DevOps & Tech Stack' }
      ]
    }
  ];

  // --- SVG Avatar Template for Byte (Apple Ceramic & Frosted Aesthetic) ---
  function getByteSVG() {
    return `
      <svg class="byte-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="byteBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="55%" stop-color="#f8fafc"/>
            <stop offset="100%" stop-color="#e2e8f0"/>
          </linearGradient>
          <linearGradient id="byteScreenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0f172a"/>
            <stop offset="100%" stop-color="#020617"/>
          </linearGradient>
          <linearGradient id="byteAntennaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2563eb"/>
            <stop offset="100%" stop-color="#06b6d4"/>
          </linearGradient>
          <filter id="byteGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Antenna & Pulsing Light -->
        <line x1="50" y1="20" x2="50" y2="8" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
        <circle cx="50" cy="7" r="4.5" fill="url(#byteAntennaGrad)" filter="url(#byteGlow)"/>

        <!-- Ears / Side Sensor Nodes -->
        <rect x="12" y="42" width="7" height="16" rx="3.5" fill="#cbd5e1"/>
        <rect x="14" y="45" width="3" height="10" rx="1.5" fill="#2563eb"/>
        
        <rect x="81" y="42" width="7" height="16" rx="3.5" fill="#cbd5e1"/>
        <rect x="83" y="45" width="3" height="10" rx="1.5" fill="#2563eb"/>

        <!-- Robot Head Shell (Apple Ceramic White) -->
        <rect x="18" y="20" width="64" height="60" rx="22" fill="url(#byteBodyGrad)" stroke="#cbd5e1" stroke-width="1.8"/>
        
        <!-- Glass Screen Face -->
        <rect x="23" y="26" width="54" height="48" rx="16" fill="url(#byteScreenGrad)" stroke="#38bdf8" stroke-width="1.2" stroke-opacity="0.8"/>

        <!-- Blushing Cheeks -->
        <ellipse cx="28" cy="56" rx="4" ry="2" fill="#38bdf8" opacity="0.45"/>
        <ellipse cx="72" cy="56" rx="4" ry="2" fill="#38bdf8" opacity="0.45"/>

        <!-- Eyes Group -->
        <g id="byte-eyes-container">
          <!-- Left Eye Normal -->
          <g class="byte-eye-normal">
            <ellipse cx="38" cy="46" rx="7.5" ry="9" fill="#022c22"/>
            <ellipse cx="38" cy="46" rx="6.5" ry="8" fill="#10b981" opacity="0.25"/>
            <!-- Pupil -->
            <circle id="byte-left-pupil" class="byte-pupil" cx="38" cy="46" r="4" fill="#34d399" filter="url(#byteGlow)"/>
            <circle cx="39.5" cy="44.5" r="1.3" fill="#ffffff"/>
            <!-- Eyelid for Blinking -->
            <rect class="byte-eyelid" x="29" y="36" width="18" height="20" fill="#042f2e"/>
          </g>

          <!-- Right Eye Normal -->
          <g class="byte-eye-normal">
            <ellipse cx="62" cy="46" rx="7.5" ry="9" fill="#022c22"/>
            <ellipse cx="62" cy="46" rx="6.5" ry="8" fill="#10b981" opacity="0.25"/>
            <!-- Pupil -->
            <circle id="byte-right-pupil" class="byte-pupil" cx="62" cy="46" r="4" fill="#34d399" filter="url(#byteGlow)"/>
            <circle cx="63.5" cy="44.5" r="1.3" fill="#ffffff"/>
            <!-- Eyelid for Blinking -->
            <rect class="byte-eyelid" x="53" y="36" width="18" height="20" fill="#042f2e"/>
          </g>

          <!-- Sleep Eyes (Curves) -->
          <g class="byte-eye-sleep" style="display: none;">
            <path d="M 32 48 Q 38 42 44 48" stroke="#10b981" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <path d="M 56 48 Q 62 42 68 48" stroke="#10b981" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          </g>

          <!-- Laugh Eyes (Squinting ^ ^) -->
          <g class="byte-eye-laugh" style="display: none;">
            <path d="M 32 48 Q 38 40 44 48" stroke="#34d399" stroke-width="2.8" fill="none" stroke-linecap="round" filter="url(#byteGlow)"/>
            <path d="M 56 48 Q 62 40 68 48" stroke="#34d399" stroke-width="2.8" fill="none" stroke-linecap="round" filter="url(#byteGlow)"/>
          </g>
        </g>

        <!-- Mouth Expressions -->
        <g id="byte-mouth-container">
          <!-- Normal Mouth -->
          <path class="byte-mouth-normal" d="M 45 61 Q 50 65 55 61" stroke="#34d399" stroke-width="2" fill="none" stroke-linecap="round"/>
          <!-- Happy Mouth -->
          <path class="byte-mouth-happy" style="display: none;" d="M 44 60 Q 50 67 56 60 Z" fill="#34d399"/>
          <!-- Laugh Mouth -->
          <path class="byte-mouth-laugh" style="display: none;" d="M 42 59 Q 50 70 58 59 Z" fill="#34d399"/>
          <!-- Think Mouth -->
          <ellipse class="byte-mouth-think" style="display: none;" cx="50" cy="62" rx="2.5" ry="2.5" fill="#34d399"/>
          <!-- Sleep Mouth -->
          <path class="byte-mouth-sleep" style="display: none;" d="M 47 62 Q 50 63 53 62" stroke="#10b981" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        </g>
      </svg>
    `;
  }

  // --- Initialize Bot Component in DOM ---
  function initByte() {
    // Prevent double injection
    if (document.getElementById('byte-companion')) return;

    // 1. Create Mascot Element
    const companion = document.createElement('div');
    companion.id = 'byte-companion';
    companion.className = 'is-floating';
    companion.setAttribute('data-mood', 'normal');

    companion.innerHTML = `
      <div class="byte-shadow"></div>
      <div class="byte-body-wrap">
        ${getByteSVG()}
      </div>
      <div class="byte-bubble" id="byte-bubble">Z z z</div>
      <div class="byte-tooltip">
        <span>👋 Hi! I'm Byte. Drag or click me!</span>
      </div>
    `;

    // 2. Create Chat Modal
    const modal = document.createElement('div');
    modal.id = 'byte-chat-modal';
    modal.innerHTML = `
      <div class="byte-chat-header">
        <div class="byte-header-info">
          <div class="byte-avatar-mini" title="Byte - DevOps Companion">
            <svg viewBox="0 0 100 100" width="32" height="32" style="overflow: visible;">
              <defs>
                <linearGradient id="miniByteHead" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#ffffff"/>
                  <stop offset="55%" stop-color="#f8fafc"/>
                  <stop offset="100%" stop-color="#e2e8f0"/>
                </linearGradient>
                <linearGradient id="miniByteScreen" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#0f172a"/>
                  <stop offset="100%" stop-color="#020617"/>
                </linearGradient>
                <linearGradient id="miniByteAntenna" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#2563eb"/>
                  <stop offset="100%" stop-color="#06b6d4"/>
                </linearGradient>
              </defs>
              <!-- Antenna -->
              <line x1="50" y1="20" x2="50" y2="7" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
              <circle cx="50" cy="6" r="4.5" fill="url(#miniByteAntenna)"/>
              <!-- Ears -->
              <rect x="12" y="42" width="7" height="16" rx="3.5" fill="#cbd5e1"/>
              <rect x="14" y="45" width="3" height="10" rx="1.5" fill="#2563eb"/>
              <rect x="81" y="42" width="7" height="16" rx="3.5" fill="#cbd5e1"/>
              <rect x="83" y="45" width="3" height="10" rx="1.5" fill="#2563eb"/>
              <!-- Head Shell -->
              <rect x="18" y="20" width="64" height="60" rx="22" fill="url(#miniByteHead)" stroke="#cbd5e1" stroke-width="2"/>
              <!-- Screen Face -->
              <rect x="23" y="26" width="54" height="48" rx="16" fill="url(#miniByteScreen)" stroke="#38bdf8" stroke-width="1.2" stroke-opacity="0.8"/>
              <!-- Cheeks -->
              <ellipse cx="28" cy="56" rx="4" ry="2" fill="#38bdf8" opacity="0.5"/>
              <ellipse cx="72" cy="56" rx="4" ry="2" fill="#38bdf8" opacity="0.5"/>
              <!-- Eyes & Pupils -->
              <ellipse cx="38" cy="46" rx="7.5" ry="9" fill="#022c22"/>
              <circle cx="38" cy="46" r="4" fill="#34d399"/>
              <circle cx="39.5" cy="44.5" r="1.3" fill="#ffffff"/>
              <ellipse cx="62" cy="46" rx="7.5" ry="9" fill="#022c22"/>
              <circle cx="62" cy="46" r="4" fill="#34d399"/>
              <circle cx="63.5" cy="44.5" r="1.3" fill="#ffffff"/>
              <!-- Smile -->
              <path d="M 45 61 Q 50 66 55 61" stroke="#34d399" stroke-width="2.2" fill="none" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="byte-header-text">
            <span class="byte-header-title">
              BYTE // AI COMPANION <span class="byte-status-indicator"></span>
            </span>
            <span class="byte-header-sub">Ask me anything about Tarek Parvez</span>
          </div>
        </div>
        <button class="byte-close-btn" id="byte-close-btn" title="Close Chat">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="byte-chat-messages" id="byte-chat-messages">
        <div class="byte-msg bot">
          <div class="byte-msg-bubble">
            👋 Hello! I am <strong>Byte</strong>, an interactive DevOps companion created for Tarek Parvez's portfolio.<br><br>
            What would you like to explore today?
            <div class="byte-action-group">
              <button class="byte-action-btn" data-query="Who is Tarek?">🧑‍💻 Who is Tarek?</button>
              <button class="byte-action-btn" data-query="DevOps & Tech Stack">🛠️ Tech Stack</button>
              <button class="byte-action-btn" data-query="Featured Projects">🚀 Projects</button>
              <button class="byte-action-btn" data-query="Contact">📬 Contact Info</button>
            </div>
          </div>
        </div>
      </div>

      <div class="byte-typing-indicator" id="byte-typing-indicator">
        <span class="byte-typing-dot"></span>
        <span class="byte-typing-dot"></span>
        <span class="byte-typing-dot"></span>
      </div>

      <div class="byte-quick-pills">
        <button class="byte-pill-btn" data-query="Who is Tarek?">🧑‍💻 Bio</button>
        <button class="byte-pill-btn" data-query="DevOps & Tech Stack">🛠️ DevOps Stack</button>
        <button class="byte-pill-btn" data-query="Featured Projects">🚀 Featured Work</button>
        <button class="byte-pill-btn" data-query="Resume">📄 Résumé</button>
        <button class="byte-pill-btn" data-query="Docker">🐳 Docker & CI/CD</button>
        <button class="byte-pill-btn" data-query="Contact">📬 Contact</button>
      </div>

      <form class="byte-chat-input-bar" id="byte-chat-form">
        <input type="text" class="byte-chat-input" id="byte-chat-input" placeholder="Ask about Tarek's skills, projects, contact..." autocomplete="off"/>
        <button type="submit" class="byte-send-btn" title="Send message">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </form>
    `;

    document.body.appendChild(companion);
    document.body.appendChild(modal);

    // Bind all behaviors
    setupMouseGaze(companion);
    setupPhysicsAndDrag(companion, modal);
    setupChatSystem(companion, modal);
  }

  // --- Real-time Mouse Gaze Tracking ---
  function setupMouseGaze(companion) {
    const leftPupil = document.getElementById('byte-left-pupil');
    const rightPupil = document.getElementById('byte-right-pupil');
    const bubble = document.getElementById('byte-bubble');
    let idleTimer = null;

    function resetIdle() {
      if (companion.getAttribute('data-mood') === 'sleep') {
        companion.setAttribute('data-mood', 'normal');
        bubble.classList.remove('is-visible');
      }
      clearTimeout(idleTimer);
      // Inactivity sleep after 20 seconds
      idleTimer = setTimeout(() => {
        if (!companion.classList.contains('is-dragging')) {
          companion.setAttribute('data-mood', 'sleep');
          bubble.textContent = 'Z z z';
          bubble.classList.add('is-visible');
        }
      }, 20000);
    }

    // Pointer Move Event for Eyes
    window.addEventListener('pointermove', (e) => {
      resetIdle();
      if (companion.getAttribute('data-mood') === 'sleep') return;

      const compRect = companion.getBoundingClientRect();
      const mascotCenterX = compRect.left + compRect.width / 2;
      const mascotCenterY = compRect.top + compRect.height / 2;

      // Track cursor angle and clamp radius
      const angle = Math.atan2(e.clientY - mascotCenterY, e.clientX - mascotCenterX);
      const dist = Math.min(3.8, Math.hypot(e.clientX - mascotCenterX, e.clientY - mascotCenterY) / 35);

      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;

      if (leftPupil) leftPupil.style.transform = `translate(${dx}px, ${dy}px)`;
      if (rightPupil) rightPupil.style.transform = `translate(${dx}px, ${dy}px)`;
    }, { passive: true });

    // Natural Eye Blinking Loop
    function blinkLoop() {
      if (companion.getAttribute('data-mood') !== 'sleep') {
        companion.classList.add('byte-blinking');
        setTimeout(() => {
          companion.classList.remove('byte-blinking');
        }, 120);
      }
      setTimeout(blinkLoop, 2800 + Math.random() * 3200);
    }
    blinkLoop();
    resetIdle();
  }

  // --- 60 FPS Physics, Momentum Toss & Drag Engine ---
  function setupPhysicsAndDrag(companion, modal) {
    let isDragging = false;
    let startX = 0, startY = 0;
    let currentX = 0, currentY = 0;
    let initialLeft = 0, initialTop = 0;
    let velocityX = 0, velocityY = 0;
    let lastX = 0, lastY = 0;
    let lastTime = 0;
    let animFrame = null;
    let hasMoved = false;

    // Get current computed fixed position
    function getMascotPosition() {
      const rect = companion.getBoundingClientRect();
      return { x: rect.left, y: rect.top };
    }

    companion.addEventListener('pointerdown', (e) => {
      // Don't trigger if clicked directly on a tooltip or interactive child
      if (e.target.closest('.byte-tooltip')) return;

      isDragging = true;
      hasMoved = false;
      companion.classList.add('is-dragging');
      companion.classList.remove('is-floating');
      companion.setAttribute('data-mood', 'drag');

      cancelAnimationFrame(animFrame);

      const pos = getMascotPosition();
      initialLeft = pos.x;
      initialTop = pos.y;
      startX = e.clientX;
      startY = e.clientY;
      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = performance.now();

      // Reset inline styles for absolute screen coordinates
      companion.style.bottom = 'auto';
      companion.style.right = 'auto';
      companion.style.left = `${initialLeft}px`;
      companion.style.top = `${initialTop}px`;

      companion.setPointerCapture(e.pointerId);
      sfx.playPop();
    });

    companion.addEventListener('pointermove', (e) => {
      if (!isDragging) return;

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      if (Math.hypot(deltaX, deltaY) > 5) {
        hasMoved = true;
      }

      currentX = initialLeft + deltaX;
      currentY = initialTop + deltaY;

      // Keep within viewport boundaries
      const maxW = window.innerWidth - companion.offsetWidth;
      const maxH = window.innerHeight - companion.offsetHeight;
      currentX = Math.max(8, Math.min(maxW - 8, currentX));
      currentY = Math.max(8, Math.min(maxH - 8, currentY));

      // Calculate instantaneous drag velocity
      const now = performance.now();
      const dt = Math.max(10, now - lastTime);
      velocityX = (e.clientX - lastX) / (dt / 16.6);
      velocityY = (e.clientY - lastY) / (dt / 16.6);

      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;

      // Dynamic tilt and slight stretch along velocity
      const tilt = Math.max(-25, Math.min(25, velocityX * 1.8));
      companion.style.left = `${currentX}px`;
      companion.style.top = `${currentY}px`;
      companion.style.transform = `rotate(${tilt}deg) scale(1.05)`;
    });

    function endDrag(e) {
      if (!isDragging) return;
      isDragging = false;
      companion.classList.remove('is-dragging');
      companion.style.transform = 'none';

      try {
        companion.releasePointerCapture(e.pointerId);
      } catch (err) {}

      // If user merely tapped/clicked without significant drag, open chat!
      if (!hasMoved) {
        companion.setAttribute('data-mood', 'happy');
        companion.classList.add('is-floating');
        toggleChat(modal, companion);
        return;
      }

      // Physics Momentum Toss loop with Strict Window Boundaries
      let posX = currentX;
      let posY = currentY;
      const gravity = 0.58;
      const bounceDamping = 0.52;
      const wallDamping = 0.65;
      const airFriction = 0.97;

      // Cap release velocity so it never shoots off in a single frame
      const MAX_V = 22;
      velocityX = Math.max(-MAX_V, Math.min(MAX_V, velocityX));
      velocityY = Math.max(-MAX_V, Math.min(MAX_V, velocityY));

      function physicsTick() {
        velocityY += gravity;
        velocityX *= airFriction;

        posX += velocityX;
        posY += velocityY;

        const minX = 12;
        const minY = 12;
        const maxW = window.innerWidth - companion.offsetWidth - 12;
        const groundY = window.innerHeight - companion.offsetHeight - 24;

        // 1. Ceiling Collision (Top boundary)
        if (posY <= minY) {
          posY = minY;
          velocityY = Math.abs(velocityY) * wallDamping; // bounce down
          sfx.playPop();
        }

        // 2. Wall Collisions (Left & Right boundaries)
        if (posX <= minX) {
          posX = minX;
          velocityX = Math.abs(velocityX) * wallDamping; // bounce right
          sfx.playPop();
        } else if (posX >= maxW) {
          posX = maxW;
          velocityX = -Math.abs(velocityX) * wallDamping; // bounce left
          sfx.playPop();
        }

        // 3. Floor Collision & Settle (Bottom boundary)
        if (posY >= groundY) {
          posY = groundY;
          velocityY = -Math.abs(velocityY) * bounceDamping; // bounce up
          velocityX *= 0.88; // ground friction

          // Settle condition
          if (Math.abs(velocityY) < 1.1 && Math.abs(velocityX) < 0.6) {
            posX = Math.max(minX, Math.min(maxW, posX));
            posY = groundY;
            companion.style.left = `${posX}px`;
            companion.style.top = `${groundY}px`;
            companion.style.transform = 'none';
            companion.classList.add('is-floating');
            companion.setAttribute('data-mood', 'laugh');
            sfx.playChirp();
            setTimeout(() => {
              companion.setAttribute('data-mood', 'normal');
            }, 1200);
            return;
          }
        }

        // Hard clamp to guarantee it stays strictly 100% inside window
        posX = Math.max(minX, Math.min(maxW, posX));
        posY = Math.max(minY, Math.min(groundY, posY));

        companion.style.left = `${posX}px`;
        companion.style.top = `${posY}px`;
        const spin = Math.max(-16, Math.min(16, velocityX * 1.4));
        companion.style.transform = `rotate(${spin}deg)`;

        animFrame = requestAnimationFrame(physicsTick);
      }

      animFrame = requestAnimationFrame(physicsTick);
    }

    // Keep mascot inside window if browser is resized
    window.addEventListener('resize', () => {
      const rect = companion.getBoundingClientRect();
      const maxW = window.innerWidth - companion.offsetWidth - 12;
      const groundY = window.innerHeight - companion.offsetHeight - 24;
      if (rect.left > maxW) companion.style.left = `${Math.max(12, maxW)}px`;
      if (rect.top > groundY) companion.style.top = `${Math.max(12, groundY)}px`;
    }, { passive: true });

    companion.addEventListener('pointerup', endDrag);
    companion.addEventListener('pointercancel', endDrag);
  }

  // --- Toggle Chat Modal ---
  function toggleChat(modal, companion) {
    const isOpen = modal.classList.toggle('is-open');
    sfx.playChirp();

    if (isOpen) {
      companion.setAttribute('data-mood', 'laugh');
      const input = document.getElementById('byte-chat-input');
      if (input) setTimeout(() => input.focus(), 250);
      setTimeout(() => companion.setAttribute('data-mood', 'normal'), 1400);
    } else {
      companion.setAttribute('data-mood', 'normal');
    }
  }

  // --- Conversational Intelligence & Chat System ---
  function setupChatSystem(companion, modal) {
    const closeBtn = document.getElementById('byte-close-btn');
    const chatForm = document.getElementById('byte-chat-form');
    const chatInput = document.getElementById('byte-chat-input');
    const messagesContainer = document.getElementById('byte-chat-messages');
    const typingIndicator = document.getElementById('byte-typing-indicator');

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('is-open');
      sfx.playPop();
    });

    // Handle Quick Action & Pill Clicks
    document.addEventListener('click', (e) => {
      const pill = e.target.closest('.byte-pill-btn, .byte-action-btn');
      if (pill) {
        const query = pill.getAttribute('data-query');
        if (query) {
          handleUserQuery(query);
          return;
        }

        // Deep-link action button inside message
        const selector = pill.getAttribute('data-selector');
        const link = pill.getAttribute('data-link');

        if (selector) {
          const target = document.querySelector(selector);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Add temporary spotlight highlight
            target.style.transition = 'box-shadow 0.4s ease';
            target.style.boxShadow = '0 0 0 3px #10b981';
            setTimeout(() => target.style.boxShadow = '', 1600);
            sfx.playChirp();
          }
        } else if (link) {
          if (pill.getAttribute('data-external') === 'true') {
            window.open(link, '_blank');
          } else {
            window.location.href = link;
          }
        }
      }
    });

    // Form submit
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = chatInput.value.trim();
      if (!val) return;
      chatInput.value = '';
      handleUserQuery(val);
    });

    function appendMessage(sender, text, actions = []) {
      const msg = document.createElement('div');
      msg.className = `byte-msg ${sender}`;

      let actionsHTML = '';
      if (actions.length > 0) {
        actionsHTML = '<div class="byte-action-group">' + actions.map(act => {
          if (act.pill) {
            return `<button type="button" class="byte-action-btn" data-query="${act.pill}">${act.label}</button>`;
          }
          if (act.selector) {
            return `<button type="button" class="byte-action-btn" data-selector="${act.selector}">${act.label}</button>`;
          }
          if (act.link) {
            return `<a href="${act.link}" ${act.external ? 'target="_blank"' : ''} class="byte-action-btn" ${act.external ? 'data-external="true"' : ''}>${act.label}</a>`;
          }
          return '';
        }).join('') + '</div>';
      }

      msg.innerHTML = `
        <div class="byte-msg-bubble">
          ${text}
          ${actionsHTML}
        </div>
      `;

      messagesContainer.appendChild(msg);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function handleUserQuery(text) {
      // 1. Append User Bubble
      appendMessage('user', text);
      sfx.playPop();

      // 2. Set Bot into Thinking State
      companion.setAttribute('data-mood', 'think');
      typingIndicator.classList.add('is-typing');
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      // 3. Match against Knowledge Base (NLP Intent Matching)
      const clean = text.toLowerCase();
      let bestMatch = null;
      let highestScore = 0;

      for (const item of KNOWLEDGE_BASE) {
        let score = 0;
        for (const intent of item.intents) {
          if (clean.includes(intent)) {
            score += intent.length; // weight longer specific keywords higher
          }
        }
        if (score > highestScore) {
          highestScore = score;
          bestMatch = item;
        }
      }

      // Simulate human-like brief response latency (280-450ms)
      setTimeout(() => {
        typingIndicator.classList.remove('is-typing');
        sfx.playChirp();

        if (bestMatch && highestScore > 0) {
          companion.setAttribute('data-mood', bestMatch.mood || 'happy');
          appendMessage('bot', bestMatch.reply, bestMatch.actions || []);
        } else {
          // Polite and helpful fallback
          companion.setAttribute('data-mood', 'normal');
          appendMessage(
            'bot',
            "I'm specialized in answering questions about Tarek's DevOps pipelines, software projects, skills, and contact info! What would you like to know?",
            [
              { label: '🚀 View Projects', selector: '#projects, .projects-section' },
              { label: '🛠️ DevOps Stack', link: 'skills.html' },
              { label: '📬 Contact Tarek', link: 'contact.html' }
            ]
          );
        }

        setTimeout(() => {
          if (companion.getAttribute('data-mood') !== 'sleep') {
            companion.setAttribute('data-mood', 'normal');
          }
        }, 1800);
      }, 350);
    }
  }

  // Auto-boot on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initByte);
  } else {
    initByte();
  }
})();
