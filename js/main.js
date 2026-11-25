// Rushelle Clement — Portfolio interactions (no dependencies)
(() => {
  const root = document.documentElement;
  root.classList.add("js");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer: fine)").matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- Theme toggle ---------- */
  const themeBtn = $(".theme-toggle");
  const themeMeta = $('meta[name="theme-color"]');
  const applyTheme = (t) => {
    root.setAttribute("data-theme", t);
    themeBtn.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
    themeMeta.setAttribute("content", t === "dark" ? "#14161F" : "#F4F4F7");
  };
  applyTheme(root.getAttribute("data-theme") || "dark");
  themeBtn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("rc-theme", next); } catch (e) {}
  });

  /* ---------- Mobile menu ---------- */
  const toggle = $(".nav-toggle");
  const mobileMenu = $("#mobile-menu");
  const setMenu = (open) => {
    mobileMenu.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  toggle.addEventListener("click", () => setMenu(mobileMenu.hidden));
  $$("a", mobileMenu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* ---------- Scroll: progress bar, back-to-top, timeline fill ---------- */
  const bar = $(".scroll-progress span");
  const toTop = $(".to-top");
  const tlWrap = $(".timeline-wrap");
  const tlFill = $(".timeline-fill");
  let ticking = false;
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    toTop.classList.toggle("show", scrollY > innerHeight * 0.8);
    if (tlWrap) {
      const r = tlWrap.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.65 - r.top) / r.height));
      tlFill.style.setProperty("--fill", p.toFixed(3));
    }
    ticking = false;
  };
  addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  addEventListener("resize", onScroll);
  onScroll();

  /* ---------- Active nav + sliding indicator ---------- */
  const pill = $(".nav-pill");
  const indicator = $(".nav-indicator");
  const navLinks = $$(".nav-pill a");
  const allLinks = [...navLinks, ...$$("#mobile-menu a")];
  const moveIndicator = (link) => {
    if (!link || !pill.offsetParent) { indicator.style.opacity = 0; return; }
    const pr = pill.getBoundingClientRect(), lr = link.getBoundingClientRect();
    indicator.style.width = `${lr.width}px`;
    indicator.style.transform = `translateX(${lr.left - pr.left}px)`;
    indicator.style.opacity = 1;
  };
  const setActive = (id) => {
    allLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
    moveIndicator(navLinks.find((a) => a.getAttribute("href") === `#${id}`));
  };
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach((s) => spy.observe(s));
  }
  addEventListener("resize", () => moveIndicator($(".nav-pill a.active")));
  setActive("home");

  /* ---------- Reveal on scroll (with stagger) ---------- */
  const reveals = $$(".reveal");
  $$(".bento, .projects-grid, .timeline, .hero-copy").forEach((group) => {
    $$(":scope > .reveal", group).forEach((el, i) => el.style.setProperty("--d", `${Math.min(i, 6) * 70}ms`));
  });
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---------- Count-up numbers ---------- */
  $$(".count").forEach((el) => {
    const to = Number(el.dataset.to || 0);
    if (reduceMotion || !("IntersectionObserver" in window)) { el.textContent = to; return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      el.textContent = 0;
      const start = performance.now(), dur = 1200;
      const step = (t) => {
        const k = Math.min(1, (t - start) / dur);
        el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(el);
  });

  /* ---------- Pointer effects (desktop only) ---------- */
  if (finePointer && !reduceMotion) {
    // Spotlight follows cursor on cards
    $$(".spotlight").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    });

    // Subtle 3D tilt on hero code window
    $$(".tilt").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });

    // Magnetic buttons
    $$(".magnetic").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
      });
      btn.addEventListener("pointerleave", () => { btn.style.transform = ""; });
    });
  }

  /* ---------- Project filters ---------- */
  const filters = $$(".filter");
  const projects = $$(".project");
  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      const f = btn.dataset.filter;
      filters.forEach((b) => {
        const on = b === btn;
        b.classList.toggle("active", on);
        b.setAttribute("aria-selected", String(on));
      });
      projects.forEach((p) => {
        const show = f === "all" || p.dataset.cat === f;
        p.classList.toggle("is-hidden", !show);
        p.classList.remove("is-entering");
        if (show) { void p.offsetWidth; p.classList.add("is-entering", "in"); }
      });
    });
  });

  /* ---------- Copy email + toast ---------- */
  const toast = $(".toast");
  let toastTimer;
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  };
  $$("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
      } catch (e) {
        const ta = Object.assign(document.createElement("textarea"), { value: text });
        document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch (_) {}
        ta.remove();
      }
      const label = $("span", btn);
      label.textContent = "Copied";
      showToast("Email copied to clipboard ✓");
      setTimeout(() => (label.textContent = "Copy"), 2000);
    });
  });

  /* ---------- Footer year ---------- */
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
