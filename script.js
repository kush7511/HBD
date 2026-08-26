/* =======================
   Birthday site settings
   Replace photos in assets/photos with real images using the same filenames.
   Change name/messages/captions here only.
======================= */
const birthdayConfig = {
  name: "Anugya varshney",
  messages: {
    heroSubtitle: "A little surprise has been prepared especially for you...",
    final: "May this year be your most beautiful chapter yet.",
    typed: `Some people make ordinary days feel special.

You are one of those people.

May your smile always stay bright,
your dreams grow bigger,
and every new chapter of your life
bring something beautiful.

Today is your day.

So laugh a little louder,
dream a little bigger,
and celebrate yourself.

Happy Birthday! ❤🎂✨`
  },
  photos: [
    { image: "assets/photos/birthday-girl-1.jpg", title: "Anugya's Smile", caption: "That smile deserves its own universe ❤" },
    { image: "assets/photos/birthday-girl-2.jpg", title: "A Special Moment", caption: "One of those unforgettable moments ✨" },
    { image: "assets/photos/birthday-girl-3.jpg", title: "Soft Little Joy", caption: "A tiny frame for a big happy feeling." },
    { image: "assets/photos/birthday-girl-4.jpg", title: "Golden Chapter", caption: "Some memories glow long after the day ends." },
    { image: "assets/photos/birthday-girl-5.jpg", title: "Bright Heart", caption: "Proof that joy can look beautifully effortless." },
    { image: "assets/photos/birthday-girl-6.jpg", title: "More To Come", caption: "The best chapters are still waiting to happen." }
  ],
  timeline: [
    { chapter: "✨ Chapter 1", title: "A beautiful beginning", text: "The kind of beginning that quietly becomes unforgettable.", photo: "assets/photos/birthday-girl-1.jpg" },
    { chapter: "✨ Chapter 2", title: "The unforgettable moments", text: "Little scenes, shared laughs, and stories that keep their sparkle.", photo: "assets/photos/birthday-girl-2.jpg" },
    { chapter: "✨ Chapter 3", title: "The smiles", text: "The easiest proof that this world has very pretty details.", photo: "assets/photos/birthday-girl-3.jpg" },
    { chapter: "✨ Chapter 4", title: "The memories", text: "Kept gently, like pressed flowers between pages.", photo: "assets/photos/birthday-girl-4.jpg" },
    { chapter: "✨ Chapter 5", title: "Everything still waiting to happen...", text: "New wishes, new places, new reasons to celebrate you.", photo: "assets/photos/birthday-girl-5.jpg" }
  ]
};

const state = {
  reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
  isMobile: matchMedia("(max-width: 768px)").matches,
  particles: [],
  photoIndex: 0,
  touchX: 0
};

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  hideLoader();
  setupNavigation();
  setupReveal();
  window.setupBirthdayMusic?.();
  setupCanvasParticles();
  setupCursor();
  setupPhotoPreview();
  setupTiltCards();
  setupGift();
  setupHeroThree();
  setupTimeline();
  setupGallery();
  setupFinalSurprise();
  setupEasterEggs();
});

function applyConfig() {
  document.querySelectorAll("[data-config-name]").forEach(el => { el.textContent = birthdayConfig.name; });
  document.querySelectorAll("[data-config-hero-subtitle]").forEach(el => { el.textContent = birthdayConfig.messages.heroSubtitle; });
  document.querySelectorAll("[data-config-final]").forEach(el => { el.textContent = birthdayConfig.messages.final; });
}

function hideLoader() {
  setTimeout(() => document.querySelector(".loader")?.classList.add("is-hidden"), 650);
}

function setupNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  document.querySelectorAll("a.page-link").forEach(link => {
    const url = new URL(link.href, location.href);
    if (url.pathname === location.pathname && url.hash) return;
    link.addEventListener("click", event => {
      if (event.metaKey || event.ctrlKey || link.target) return;
      event.preventDefault();
      pageTransition(() => { location.href = link.href; });
    });
  });
}

function pageTransition(callback) {
  const layer = document.querySelector(".transition-layer");
  if (!layer || state.reducedMotion || !window.gsap) return callback();
  gsap.timeline({ onComplete: callback })
    .set(layer, { opacity: 1, scaleY: 0, transformOrigin: "bottom" })
    .to(layer, { scaleY: 1, duration: 0.34, ease: "power3.inOut" });
}

function setupReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || state.reducedMotion) {
    els.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
        if (entry.target.querySelector?.("[data-typed-message]")) typeMessage();
      }
    });
  }, { threshold: 0.16 });
  els.forEach(el => observer.observe(el));
}

function setupPhotoPreview() {
  const target = document.querySelector("[data-photo-preview]");
  if (!target) return;
  target.innerHTML = birthdayConfig.photos.slice(0, 3).map(photoCardMarkup).join("");
  hydrateFallbackImages(target);
  setupReveal();
}

function photoCardMarkup(photo, index) {
  return `<article class="photo-card reveal" tabindex="0" data-tilt data-index="${index}">
    <img src="${photo.image}" alt="${photo.title} photo placeholder" loading="lazy" data-fallback>
    <h3>${photo.title}</h3>
    <p>${photo.caption}</p>
  </article>`;
}

function hydrateFallbackImages(root = document) {
  root.querySelectorAll("img[data-fallback]").forEach(img => {
    img.addEventListener("error", () => {
      const fallback = document.createElement("div");
      fallback.className = "fallback-art";
      fallback.textContent = "Replace this frame with her photo";
      img.replaceWith(fallback);
    }, { once: true });
  });
}

function setupTiltCards() {
  if (state.reducedMotion) return;
  document.addEventListener("pointermove", event => {
    const card = event.target.closest?.("[data-tilt]");
    if (!card || state.isMobile) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    card.style.setProperty("--mx", `${x * 100}%`);
    card.style.setProperty("--my", `${y * 100}%`);
    card.style.transform = `rotateX(${(0.5 - y) * 9}deg) rotateY(${(x - 0.5) * 11}deg) translateY(-5px)`;
  });
  document.addEventListener("pointerout", event => {
    const card = event.target.closest?.("[data-tilt]");
    if (card) card.style.transform = "";
  });
  document.addEventListener("touchstart", event => {
    const card = event.target.closest?.("[data-tilt]");
    if (!card) return;
    card.classList.add("is-touched");
    setTimeout(() => card.classList.remove("is-touched"), 900);
  }, { passive: true });
}

function setupGift() {
  const gift = document.querySelector("[data-gift]");
  const reveal = document.querySelector("[data-gift-reveal]");
  gift?.addEventListener("click", () => {
    window.birthdayMusicEngine?.requestTrack("gift", { force: true });
    gift.classList.add("is-shaking");
    setTimeout(() => {
      gift.classList.remove("is-shaking");
      gift.classList.add("is-open");
      reveal.hidden = false;
      reveal.classList.add("is-visible");
      const rect = gift.getBoundingClientRect();
      confettiBurst(rect.left + rect.width / 2, rect.top + 40, 80);
    }, 520);
  });
}

function typeMessage() {
  const target = document.querySelector("[data-typed-message]");
  if (!target || target.dataset.done) return;
  target.dataset.done = "true";
  window.birthdayMusicEngine?.requestTrack("emotional");
  if (state.reducedMotion) {
    target.textContent = birthdayConfig.messages.typed;
    return;
  }
  let i = 0;
  const speed = 24;
  const write = () => {
    target.textContent = birthdayConfig.messages.typed.slice(0, i++);
    if (i <= birthdayConfig.messages.typed.length) setTimeout(write, speed);
  };
  write();
}

function setupTimeline() {
  const target = document.querySelector("[data-timeline]");
  if (!target) return;
  target.innerHTML = birthdayConfig.timeline.map((item, index) => `
    <article class="timeline-item reveal">
      <span class="timeline-dot" aria-hidden="true"></span>
      <div class="timeline-card"><span class="eyebrow">${item.chapter}</span><h2>${item.title}</h2><p>${item.text}</p></div>
      <div class="timeline-photo"><img src="${item.photo}" alt="${item.title} photo placeholder" loading="lazy" data-fallback></div>
    </article>`).join("");
  hydrateFallbackImages(target);
  setupReveal();
}

function setupGallery() {
  const gallery = document.querySelector("[data-gallery]");
  if (!gallery) return;
  gallery.innerHTML = birthdayConfig.photos.map((photo, index) => `
    <figure class="gallery-item reveal" data-gallery-item="${index}" tabindex="0">
      <img src="${photo.image}" alt="${photo.title} photo placeholder" loading="lazy" data-fallback>
      <figcaption>${photo.caption}</figcaption>
    </figure>`).join("");
  hydrateFallbackImages(gallery);
  setupReveal();
  gallery.addEventListener("click", event => {
    const item = event.target.closest("[data-gallery-item]");
    if (item) openLightbox(Number(item.dataset.galleryItem));
  });
  gallery.addEventListener("keydown", event => {
    if (event.key === "Enter") openLightbox(Number(event.target.closest("[data-gallery-item]")?.dataset.galleryItem || 0));
  });
}

function openLightbox(index) {
  state.photoIndex = index;
  updateLightbox();
  const box = document.querySelector("[data-lightbox]");
  box.hidden = false;
  document.body.style.overflow = "hidden";
}

function updateLightbox() {
  const photo = birthdayConfig.photos[state.photoIndex];
  const img = document.querySelector("[data-lightbox-img]");
  const caption = document.querySelector("[data-lightbox-caption]");
  if (!img || !caption || !photo) return;
  img.src = photo.image;
  img.alt = photo.title;
  caption.textContent = `${photo.title} — ${photo.caption}`;
}

document.addEventListener("click", event => {
  if (event.target.matches("[data-lightbox-close]")) closeLightbox();
  if (event.target.matches("[data-lightbox-prev]")) moveLightbox(-1);
  if (event.target.matches("[data-lightbox-next]")) moveLightbox(1);
});
document.addEventListener("keydown", event => {
  const box = document.querySelector("[data-lightbox]");
  if (!box || box.hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") moveLightbox(-1);
  if (event.key === "ArrowRight") moveLightbox(1);
});
document.addEventListener("touchstart", event => {
  const box = document.querySelector("[data-lightbox]");
  if (box && !box.hidden) state.touchX = event.touches[0].clientX;
}, { passive: true });
document.addEventListener("touchend", event => {
  const box = document.querySelector("[data-lightbox]");
  if (!box || box.hidden || !state.touchX) return;
  const delta = event.changedTouches[0].clientX - state.touchX;
  if (Math.abs(delta) > 50) moveLightbox(delta > 0 ? -1 : 1);
  state.touchX = 0;
}, { passive: true });

function closeLightbox() {
  const box = document.querySelector("[data-lightbox]");
  if (box) box.hidden = true;
  document.body.style.overflow = "";
}

function moveLightbox(direction) {
  state.photoIndex = (state.photoIndex + direction + birthdayConfig.photos.length) % birthdayConfig.photos.length;
  updateLightbox();
}

function setupFinalSurprise() {
  if (document.body.dataset.page !== "surprise") return;
  window.birthdayMusicEngine?.requestTrack("emotional", { force: true });
  const intro = document.querySelector("[data-final-intro]");
  const reveal = document.querySelector("[data-final-reveal]");
  const counter = document.querySelector("[data-count-flash]");
  const steps = ["3...", "2...", "1..."];
  let i = 0;
  const tick = () => {
    if (i < steps.length) {
      if (i === 0) window.birthdayMusicEngine?.requestTrack("finale", { force: true });
      counter.textContent = steps[i++];
      setTimeout(tick, state.reducedMotion ? 120 : 850);
      return;
    }
    intro.hidden = true;
    reveal.hidden = false;
    reveal.classList.add("is-visible");
    confettiBurst(innerWidth / 2, innerHeight * 0.28, 150);
    setTimeout(() => confettiBurst(innerWidth * 0.2, innerHeight * 0.32, 70), 300);
    setTimeout(() => confettiBurst(innerWidth * 0.8, innerHeight * 0.35, 70), 650);
    setTimeout(() => window.birthdayMusicEngine?.requestTrack("ending", { force: true }), 12000);
  };
  setTimeout(tick, 900);
}

function setupEasterEggs() {
  let heartClicks = 0;
  document.querySelector(".hero-orbit-two")?.addEventListener("click", event => {
    heartClicks += 1;
    if (heartClicks === 5) {
      toast("You found the secret! 💖");
      confettiBurst(event.clientX, event.clientY, 60);
      heartClicks = 0;
    }
  });
  document.addEventListener("click", event => {
    if (Math.random() > 0.55) sparkleAt(event.clientX, event.clientY, "#ffd166");
  });
  let taps = 0;
  document.addEventListener("touchend", event => {
    const photo = event.target.closest?.(".photo-card, .gallery-item");
    if (!photo) return;
    taps += 1;
    setTimeout(() => { taps = 0; }, 280);
    if (taps >= 2) {
      const touch = event.changedTouches[0];
      confettiBurst(touch.clientX, touch.clientY, 22, true);
      taps = 0;
    }
  }, { passive: true });
}

function toast(message) {
  const node = document.createElement("div");
  node.textContent = message;
  node.style.cssText = "position:fixed;left:50%;top:90px;z-index:91;transform:translateX(-50%);padding:14px 18px;border-radius:999px;background:rgba(255,255,255,.9);box-shadow:0 18px 50px rgba(86,44,95,.22);font-weight:900;color:#a33a75";
  document.body.append(node);
  setTimeout(() => node.remove(), 2400);
}

function setupCanvasParticles() {
  const canvas = document.getElementById("sparkleCanvas");
  if (!canvas || state.reducedMotion) return;
  const ctx = canvas.getContext("2d");
  const resize = () => {
    canvas.width = innerWidth * devicePixelRatio;
    canvas.height = innerHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  };
  resize();
  addEventListener("resize", resize);
  document.addEventListener("pointermove", event => {
    if (state.isMobile || Math.random() > 0.35) return;
    sparkleAt(event.clientX, event.clientY);
  }, { passive: true });
  const loop = () => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    state.particles = state.particles.filter(p => p.life > 0);
    state.particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += p.gravity; p.life -= 1;
      ctx.globalAlpha = Math.max(p.life / p.maxLife, 0);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    if (!document.hidden) requestAnimationFrame(loop);
    else setTimeout(loop, 250);
  };
  loop();
}

function sparkleAt(x, y, color = "#ff5f9e") {
  state.particles.push({ x, y, vx: (Math.random() - 0.5) * 1.4, vy: -Math.random() * 1.2, gravity: -0.004, size: Math.random() * 2 + 1, life: 34, maxLife: 34, color });
}

function confettiBurst(x, y, count = 80, hearts = false) {
  if (state.reducedMotion) return;
  const colors = ["#ff5f9e", "#6fd6ff", "#ffd166", "#74e7c4", "#ad6dff"];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 5 + 1.5;
    state.particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      gravity: hearts ? -0.02 : 0.08,
      size: hearts ? Math.random() * 4 + 3 : Math.random() * 3 + 2,
      life: 70,
      maxLife: 70,
      color: colors[i % colors.length]
    });
  }
}

function setupCursor() {
  const cursor = document.querySelector(".cursor-dot");
  if (!cursor || state.isMobile || state.reducedMotion) return;
  document.addEventListener("pointermove", event => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    cursor.style.opacity = "0.65";
  });
  document.addEventListener("pointerover", event => {
    if (event.target.closest("a, button, [tabindex]")) cursor.classList.add("is-hovering");
  });
  document.addEventListener("pointerout", event => {
    if (event.target.closest("a, button, [tabindex]")) cursor.classList.remove("is-hovering");
  });
}

function setupHeroThree() {
  const host = document.getElementById("hero3d");
  if (!host || state.reducedMotion || state.isMobile || !window.THREE) return;
  try {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, host.clientWidth / host.clientHeight, 0.1, 100);
    camera.position.z = 7;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
    renderer.setSize(host.clientWidth, host.clientHeight);
    host.append(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);
    const light = new THREE.PointLight(0xffffff, 1.5);
    light.position.set(2, 3, 4);
    scene.add(light, new THREE.AmbientLight(0xffffff, 0.7));
    const pink = new THREE.MeshStandardMaterial({ color: 0xff6fac, roughness: 0.35, metalness: 0.08 });
    const blue = new THREE.MeshStandardMaterial({ color: 0x6fd6ff, roughness: 0.4, metalness: 0.04 });
    const gold = new THREE.MeshStandardMaterial({ color: 0xffd166, roughness: 0.28, metalness: 0.18 });

    const gift = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.25, 1.6), pink);
    const ribbonV = new THREE.Mesh(new THREE.BoxGeometry(0.26, 1.42, 1.72), gold);
    const ribbonH = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.22, 1.72), gold);
    const cake = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.9, 0.62, 48), blue);
    cake.position.set(-1.7, -0.55, -0.6);
    group.add(gift, ribbonV, ribbonH, cake);
    for (let i = 0; i < 30; i++) {
      const star = new THREE.Mesh(new THREE.SphereGeometry(Math.random() * 0.035 + 0.018, 12, 12), i % 2 ? gold : blue);
      star.position.set((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 3);
      group.add(star);
    }
    let mx = 0, my = 0;
    document.addEventListener("pointermove", e => {
      mx = (e.clientX / innerWidth - 0.5) * 0.5;
      my = (e.clientY / innerHeight - 0.5) * 0.35;
    }, { passive: true });
    const animate = () => {
      group.rotation.y += 0.006;
      group.rotation.x += (my - group.rotation.x) * 0.03;
      group.position.x += (mx - group.position.x) * 0.03;
      group.position.y = Math.sin(Date.now() * 0.001) * 0.12;
      renderer.render(scene, camera);
      if (!document.hidden) requestAnimationFrame(animate);
    };
    animate();
    addEventListener("resize", () => {
      if (!host.clientWidth) return;
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight);
    });
  } catch {
    host.remove();
  }
}

document.querySelector?.("[data-open-surprise]")?.addEventListener?.("click", () => {});
document.addEventListener("click", event => {
  const button = event.target.closest?.("[data-open-surprise]");
  if (!button) return;
  document.querySelector("[data-character]")?.classList.add("is-excited");
  window.birthdayMusicEngine?.requestTrack("cute", { force: true });
  const rect = button.getBoundingClientRect();
  confettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 110);
  setTimeout(() => pageTransition(() => { location.href = "surprise.html"; }), 850);
});
