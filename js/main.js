const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const MAIN_PROJECTS = [
  {
    icon: "file",
    wide: true,
    title: "Healthcare Document Management System",
    desc: "A multi-portal healthcare platform (CRM, Doctor, Nurse & Client) that digitizes and centralizes prescription management across stakeholders.",
    points: [
      "Scalable REST APIs with role-based access control and real-time document tracking",
      "Modernized a monolith into microservices for scalable cloud deployments",
      "Optimized PostgreSQL queries boosting performance and reliability"
    ],
    tags: ["React.js", "Node.js", "PostgreSQL", "AWS", "Microservices"]
  },
  {
    icon: "call",
    wide: true,
    title: "IVR & Healthcare Communication Platform",
    desc: "Automated patient engagement through voice calls, WhatsApp messaging and IVR-driven workflows, unified into one communication hub.",
    points: [
      "Integrations across Exotel, Fonada, Gupshup and Sparc",
      "Configurable bot flows, WhatsApp Business templates and campaign automation",
      "Intelligent Auto Dialer with real-time Socket.IO call allocation to doctors"
    ],
    tags: ["Socket.IO", "Exotel", "Fonada", "Gupshup", "Sparc"]
  },
  {
    icon: "cloud",
    title: "AWS Infrastructure Modernization",
    desc: "Modernization initiative upgrading legacy Node.js runtimes and migrating monolithic services to a serverless AWS Lambda architecture.",
    points: [
      "PostgreSQL tuning and indexing cut API response times by ~40%",
      "AWS SQS asynchronous processing for scalability and workload distribution",
      "Automated CI/CD pipelines for Node.js and Python services"
    ],
    tags: ["AWS Lambda", "SQS", "EBS", "RDS", "Node.js", "Python"]
  },
  {
    icon: "chat",
    title: "Real-Time Web Chat Application",
    desc: "Low-latency one-to-one messaging platform built for bi-directional realtime communication with an efficient microservice backbone.",
    points: [
      "Socket.IO powered messaging with low-latency delivery",
      "gRPC-based internal services for messaging and user operations",
      "MongoDB schemas designed for fast retrieval and consistency"
    ],
    tags: ["React.js", "Node.js", "Socket.IO", "gRPC", "MongoDB"]
  },
  {
    icon: "puzzle",
    title: "Healthcare Chrome Extension",
    desc: "Offline-capable browser extension for prescription capture with real-time video processing and custom filters for better OCR accuracy.",
    points: [
      "Service Workers + IndexedDB enable true offline persistence",
      "WebRTC camera access with real-time image enhancement filters",
      "Background sync workers resilient to network interruptions"
    ],
    tags: ["JavaScript", "Chrome APIs", "WebRTC", "Service Workers", "IndexedDB"]
  },
  {
    icon: "package",
    title: "Reusable NPM Package Development",
    desc: "Private React component libraries and versioned NPM packages that standardized UI development across enterprise applications.",
    points: [
      "Semantic versioning with comprehensive documentation",
      "Reusable architecture cut duplicate development effort",
      "Cross-team integration improving speed and maintainability"
    ],
    tags: ["React.js", "TypeScript", "NPM", "Component Library"]
  }
];

const MINI_PROJECTS = [
  {
    icon: "drive",
    title: "Google Drive Automation & GCP Integration",
    desc: "OAuth 2.0 secured Drive integrations with Apps Script triggers detecting duplicate files and invoking backend APIs for real-time sync.",
    tags: ["Drive API", "OAuth 2.0", "Apps Script", "GCP"]
  },
  {
    icon: "db",
    title: "Medicine Record Management System",
    desc: "Centralized medication data on Redis (AWS) with automated sync services keeping caches consistent and slashing database load.",
    tags: ["Redis", "Valkey", "AWS"]
  },
  {
    icon: "shield",
    title: "PGP Secure File Exchange Platform",
    desc: "FastAPI REST services performing PGP encryption and decryption for secure, compliant enterprise file exchange with Amazon-integrated systems.",
    tags: ["Python", "FastAPI", "PGP Encryption"]
  },
  {
    icon: "scan",
    title: "Intelligent Prescription Image Processing",
    desc: "OpenCV modules auto-detect and crop prescription images, bridged into Node.js via Python Shell for OCR-ready documents.",
    tags: ["Python", "OpenCV", "Python Shell", "AWS EBS"]
  },
  {
    icon: "bot",
    title: "AI Agent Development",
    desc: "MCP-powered agents connecting LLMs to enterprise tools and PostgreSQL, plus an ElevenLabs voice assistant for real-time conversations.",
    tags: ["MCP", "Claude AI", "ElevenLabs", "PostgreSQL"]
  },
  {
    icon: "code",
    title: "Portfolio Website",
    desc: "This hand-crafted portfolio - pure HTML, CSS and JavaScript with zero frameworks, fully responsive and animation-rich.",
    tags: ["HTML5", "CSS3", "JavaScript"]
  }
];

function renderProjects() {
  const main = $("#main-projects");
  const mini = $("#mini-projects");

  if (main) {
    main.innerHTML = MAIN_PROJECTS.map(
      (p, i) => `
      <article class="p-card reveal${p.wide ? " p-wide" : ""}">
        <span class="p-index">${String(i + 1).padStart(2, "0")}</span>
        <div class="p-icon"><svg class="icon"><use href="#i-${p.icon}"/></svg></div>
        <h3>${p.wide ? '<span class="p-flag">Featured</span>' : ""}${p.title}</h3>
        <p>${p.desc}</p>
        <ul class="p-points">${p.points.map((pt) => `<li>${pt}</li>`).join("")}</ul>
        <div class="tags">${p.tags.map((t) => `<span class="chip">${t}</span>`).join("")}</div>
      </article>`
    ).join("");
  }

  if (mini) {
    mini.innerHTML = MINI_PROJECTS.map(
      (p) => `
      <article class="t-card reveal">
        <div class="t-head">
          <span class="t-icon"><svg class="icon"><use href="#i-${p.icon}"/></svg></span>
          <h3>${p.title}</h3>
        </div>
        <p>${p.desc}</p>
        <div class="tags">${p.tags.map((t) => `<span class="chip">${t}</span>`).join("")}</div>
      </article>`
    ).join("");
  }
}

function initTheme() {
  const btn = $("#theme-toggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const next =
      document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    window.dispatchEvent(new Event("theme-particles"));
  });
}

function initNav() {
  const header = $("#site-header");
  const nav = $("#primary-nav");
  const toggle = $("#nav-toggle");
  const scrim = $("#scrim");

  const setOpen = (open) => {
    nav.classList.toggle("open", open);
    toggle.classList.toggle("active", open);
    scrim.classList.toggle("show", open);
    scrim.hidden = false;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  };

  toggle.addEventListener("click", () => setOpen(!nav.classList.contains("open")));
  scrim.addEventListener("click", () => setOpen(false));
  $$("a", nav).forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) setOpen(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 920 && nav.classList.contains("open")) setOpen(false);
  });

  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 30);
    const bar = $("#progress");
    if (bar) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initActiveNav() {
  const links = $$('.nav-links > a[href^="#"]');
  if (!links.length) return;
  const map = new Map();
  links.forEach((l) => {
    const sec = $(l.getAttribute("href"));
    if (sec) map.set(sec, l);
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          links.forEach((l) => l.classList.remove("active"));
          const link = map.get(en.target);
          if (link) link.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  map.forEach((_, sec) => io.observe(sec));
}

function initTyped() {
  const el = $("#typed");
  if (!el || !el.dataset.words) return;
  const words = JSON.parse(el.dataset.words);
  if (!words.length) return;
  if (reducedMotion) {
    el.textContent = words[0];
    return;
  }
  let w = 0,
    c = 0,
    del = false;
  (function tick() {
    const word = words[w];
    el.textContent = word.slice(0, c);
    let delay = del ? 34 : 72;
    if (!del && c === word.length) {
      del = true;
      delay = 1700;
    } else if (del && c === 0) {
      del = false;
      w = (w + 1) % words.length;
      delay = 380;
    } else {
      c += del ? -1 : 1;
    }
    setTimeout(tick, delay);
  })();
}

function initReveal() {
  const els = $$(".reveal");
  if (!els.length) return;
  if (reducedMotion || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in-view"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        io.unobserve(el);
        const group = [...el.parentElement.querySelectorAll(".reveal")];
        const idx = Math.max(0, group.indexOf(el));
        setTimeout(() => el.classList.add("in-view"), Math.min(idx * 90, 450));
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
}

function initCounters() {
  const els = $$("[data-count]");
  if (!els.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        const el = en.target;
        const target = parseFloat(el.dataset.count);
        const dec = parseInt(el.dataset.decimals || "0", 10);
        if (reducedMotion) {
          el.textContent = target.toFixed(dec);
          return;
        }
        const dur = 1500;
        const t0 = performance.now();
        (function frame(t) {
          const k = Math.min((t - t0) / dur, 1);
          const ease = 1 - Math.pow(1 - k, 3);
          el.textContent = (target * ease).toFixed(dec);
          if (k < 1) requestAnimationFrame(frame);
        })(t0);
      });
    },
    { threshold: 0.5 }
  );
  els.forEach((el) => io.observe(el));
}

function initParticles() {
  const canvas = $("#hero-canvas");
  if (!canvas || reducedMotion) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let w = 0,
    h = 0,
    parts = [],
    raf = null;
  const mouse = { x: -9999, y: -9999 };
  const PALETTES = {
    dark: ["45,212,191", "129,140,248", "244,114,182"],
    light: ["13,148,136", "99,102,241", "219,39,119"]
  };

  function spawn() {
    const n = Math.min(70, Math.floor((w * h) / 20000));
    const pal = PALETTES[document.documentElement.getAttribute("data-theme")] || PALETTES.dark;
    parts = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.6 + 0.7,
      c: pal[Math.floor(Math.random() * pal.length)]
    }));
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.offsetWidth;
    h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    spawn();
  }

  function step() {
    ctx.clearRect(0, 0, w, h);
    for (const p of parts) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -20) p.x = w + 20;
      if (p.x > w + 20) p.x = -20;
      if (p.y < -20) p.y = h + 20;
      if (p.y > h + 20) p.y = -20;
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const d = Math.hypot(dx, dy) || 1;
      if (d < 130) {
        p.x += (dx / d) * 0.6;
        p.y += (dy / d) * 0.6;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 6.2832);
      ctx.fillStyle = `rgba(${p.c},0.75)`;
      ctx.fill();
    }
    for (let i = 0; i < parts.length; i++) {
      for (let j = i + 1; j < parts.length; j++) {
        const a = parts[i];
        const b = parts[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 115) {
          ctx.strokeStyle = `rgba(${a.c},${(1 - d / 115) * 0.16})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(step);
  }

  function start() {
    if (raf === null) raf = requestAnimationFrame(step);
  }

  function stop() {
    if (raf !== null) {
      cancelAnimationFrame(raf);
      raf = null;
    }
  }

  const debounce = (fn, ms) => {
    let id;
    return () => {
      clearTimeout(id);
      id = setTimeout(fn, ms);
    };
  };
  const onResize = debounce(resize, 150);

  window.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", () =>
    document.hidden ? stop() : start()
  );

  const hero = canvas.parentElement;
  hero.addEventListener("pointermove", (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  hero.addEventListener("pointerleave", () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });
  window.addEventListener("theme-particles", spawn);

  resize();
  start();
}

function initCardGlow() {
  $$(".featured-grid, .mini-grid").forEach((grid) => {
    grid.addEventListener("pointermove", (e) => {
      const card = e.target.closest(".p-card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });
}

function initToTop() {
  const btn = $("#to-top");
  if (!btn) return;
  window.addEventListener(
    "scroll",
    () => btn.classList.toggle("show", window.scrollY > 600),
    { passive: true }
  );
  btn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })
  );
}

renderProjects();
initTheme();
initNav();
initActiveNav();
initTyped();
initReveal();
initCounters();
initParticles();
initCardGlow();
initToTop();

const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
