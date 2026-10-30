/* ==========================================================================
   Núcleo compartido por todas las páginas:
   idioma, cabecera + menú, footer, animaciones de aparición y utilidades.
   ========================================================================== */
(function () {
  const LANGS = ["es", "en"];
  const STORAGE_KEY = "portfolio-lang";
  const P = window.PROFILE;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Idioma ---------- */
  function detectLang() {
    const fromUrl = new URLSearchParams(location.search).get("lang");
    if (LANGS.includes(fromUrl)) return fromUrl;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (LANGS.includes(saved)) return saved;
    } catch (e) {}
    return (navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en";
  }

  const App = {
    lang: detectLang(),
    reduceMotion,
    t(key, vars) {
      let str = (I18N[App.lang] && I18N[App.lang][key]) ?? I18N.es[key] ?? key;
      if (vars) for (const k in vars) str = str.replace(`{${k}}`, vars[k]);
      return str;
    },
    // Traduce un valor de los datos: string plano o { es, en }
    tr(value) {
      if (value == null) return "";
      if (typeof value === "string") return value;
      return value[App.lang] ?? value.es ?? Object.values(value)[0] ?? "";
    },
    setLang(lang) {
      if (!LANGS.includes(lang) || lang === App.lang) return;
      App.lang = lang;
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
      const url = new URL(location.href);
      if (url.searchParams.has("lang")) {
        url.searchParams.set("lang", lang);
        history.replaceState(null, "", url);
      }
      applyI18n();
      document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
    },
    // "2025-03" → Date
    parseYM(ym) {
      if (!ym) return new Date();
      const [y, m] = String(ym).split("-").map(Number);
      return new Date(y, (m || 1) - 1, 1);
    },
    formatYM(ym) {
      if (!ym) return App.t("exp.present");
      if (/^\d{4}$/.test(ym)) return ym; // solo el año (p. ej. año de titulación)
      const d = App.parseYM(ym);
      const locale = App.lang === "es" ? "es-ES" : "en-GB";
      return d.toLocaleDateString(locale, { month: "short", year: "numeric" }).replace(".", "");
    },
    // Duración entre dos fechas "AAAA-MM" (fin null = hoy), p. ej. "1 año 3 meses"
    duration(start, end) {
      const a = App.parseYM(start);
      const b = end ? App.parseYM(end) : new Date();
      let months = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth()) + 1;
      months = Math.max(1, months);
      const y = Math.floor(months / 12);
      const m = months % 12;
      const parts = [];
      if (y) parts.push(`${y} ${App.t(y === 1 ? "exp.year" : "exp.years")}`);
      if (m) parts.push(`${m} ${App.t(m === 1 ? "exp.month" : "exp.months")}`);
      return parts.join(" ");
    },
    yearsSince(ym) {
      const ms = Date.now() - App.parseYM(ym).getTime();
      return Math.max(1, Math.floor(ms / (365.25 * 24 * 3600 * 1000)));
    },
    sortedProjects() {
      return [...window.PROJECTS].sort((a, b) => String(b.date).localeCompare(String(a.date)));
    },
    esc(str) {
      return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    },
    scramble,
    observeReveal,
  };
  window.App = App;

  function applyI18n() {
    document.documentElement.lang = App.lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = App.t(el.dataset.i18n);
      if (el.classList.contains("glitch")) el.dataset.text = el.textContent;
    });
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      el.dataset.i18nAttr.split(",").forEach((pair) => {
        const [attr, key] = pair.split(":").map((s) => s.trim());
        el.setAttribute(attr, App.t(key));
      });
    });
    document.querySelectorAll("[data-lang-option]").forEach((el) => {
      el.classList.toggle("is-active", el.dataset.langOption === App.lang);
    });
    document.querySelectorAll("[data-cv]").forEach((el) => {
      el.href = App.tr(P.cv);
    });
    const desc = document.querySelector('meta[name="description"]');
    if (desc && document.body.dataset.page !== "project") desc.content = App.t("meta.description");
  }

  /* ---------- Cabecera y footer (compartidos entre páginas) ---------- */
  const page = document.body.dataset.page;
  const home = page === "home" ? "" : "index.html";
  // En "Sobre mí" los enlaces son anclas de la propia página; desde el resto llevan a about.html
  const aboutBase = page === "about" ? "" : "about.html";
  // current: enlace a la página en la que estamos (se marca como actual)
  const menuLink = (href, key, current) => `<li><a href="${href}" data-i18n="${key}"${current ? ' class="is-current" aria-current="page"' : ""}></a></li>`;

  function headerHTML() {
    return `
    <a class="skip-link" href="#main" data-i18n="nav.skip"></a>
    <header class="site-header" id="top">
      <a class="brand" href="${home || "#top"}" ${home ? "" : "data-to-top "}aria-label="${App.esc(P.name)}">
        <span class="brand__num">${App.esc(P.handle.split("/")[0])}</span><span class="brand__slash">/</span><span class="brand__name">${App.esc(P.handle.split("/")[1] || "")}</span>
      </a>
      <nav class="header-actions" aria-label="Principal">
        <button class="lang-toggle" type="button" data-lang-toggle data-i18n-attr="aria-label:nav.lang">
          <span data-lang-option="es">ES</span><span class="lang-toggle__sep">/</span><span data-lang-option="en">EN</span>
        </button>
        <button class="theme-toggle" type="button" data-theme-toggle data-i18n-attr="aria-label:nav.theme,title:nav.theme">
          <svg class="icon-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>
          <svg class="icon-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4"/></svg>
        </button>
        <a class="header-link hide-sm" href="#contact" data-i18n="nav.contact"></a>
        <a class="header-link header-link--cv" data-cv download>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14"/></svg><span data-i18n="nav.cv"></span>
        </a>
        <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-menu" data-menu-btn>
          <span class="menu-btn__lines" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="sr-only" data-i18n="nav.menu"></span>
        </button>
      </nav>
      <div class="site-menu" id="site-menu" hidden data-menu>
        <ul>
          ${menuLink(`${home}#projects`, "nav.projects")}
          ${menuLink(`${aboutBase}#about`, "nav.about")}
          ${menuLink(`${aboutBase}#process`, "nav.process")}
          ${menuLink(`${aboutBase}#skills`, "nav.skills")}
          ${menuLink(`${aboutBase}#experience`, "nav.experience")}
          ${menuLink(`${aboutBase}#hobbies`, "nav.hobbies")}
          ${menuLink("brand.html", "nav.brand", page === "brand")}
          ${menuLink("#contact", "nav.contact")}
        </ul>
      </div>
    </header>`;
  }

  function footerHTML() {
    const year = new Date().getFullYear();
    const range = P.copyrightStart && P.copyrightStart < year ? `${P.copyrightStart}–${year}` : year;
    return `
    <footer class="site-footer" id="contact">
      <div class="container">
        <p class="section-index mono" aria-hidden="true"><span data-i18n="nav.contact"></span></p>
        <h2 class="footer-title">
          <span class="footer-title__a" data-i18n="footer.like"></span>
          <span class="footer-title__b" data-i18n="footer.talk"></span>
        </h2>
        <div class="footer-actions">
          <a class="btn btn--primary" href="mailto:${App.esc(P.email)}">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v12H3z"/><path d="m3 7 9 6 9-6"/></svg>
            <span data-i18n="footer.email"></span>
          </a>
          <button class="btn btn--ghost btn--copy" type="button" data-copy-email>
            <span class="mono">${App.esc(P.email)}</span>
            <span class="btn__hint" data-i18n="footer.copy"></span>
          </button>
          <a class="btn btn--ghost" href="${App.esc(P.linkedin)}" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 9.5v8M6.5 6.5v.01M10.5 17.5v-8m0 3.5c0-2 1.5-3.5 3.5-3.5s3 1.3 3 3.5v4.5"/></svg>
            <span>LinkedIn</span>
          </a>
          ${P.github ? `<a class="btn btn--ghost" href="${App.esc(P.github)}" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4 1.5-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.8 2.8 5.8 3.1 5.8 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>
            <span>GitHub</span></a>` : ""}
        </div>
        <div class="footer-bottom">
          <p>© ${range} ${App.esc(P.name)}. <span data-i18n="footer.rights"></span></p>
          <a class="footer-top" href="#top" data-to-top><span data-i18n="footer.top"></span> ↑</a>
        </div>
      </div>
      <!-- Barra de estado: todos los datos son reales y se miden en el navegador -->
      <div class="statusbar mono" role="group" data-i18n-attr="aria-label:status.label">
        <span class="statusbar__item statusbar__item--ok"><span class="status-dot"></span><span data-i18n="status.static"></span></span>
        <span class="statusbar__item"><span data-i18n="status.build"></span> <a data-stat-commit href="${App.esc(P.github || "#")}" target="_blank" rel="noopener">······</a></span>
        <span class="statusbar__item"><span data-i18n="status.weight"></span> <b data-stat-weight>—</b></span>
        <span class="statusbar__item"><span data-i18n="status.load"></span> <b data-stat-load>—</b></span>
        <span class="statusbar__item statusbar__item--vp"><span data-i18n="status.viewport"></span> <b data-stat-vp>—</b></span>
      </div>
      <div class="toast" role="status" aria-live="polite" data-toast></div>
    </footer>`;
  }

  function mountChrome() {
    const h = document.querySelector("[data-include=header]");
    const f = document.querySelector("[data-include=footer]");
    if (h) h.outerHTML = headerHTML();
    if (f) f.outerHTML = footerHTML();
  }

  function initHeader() {
    const header = document.querySelector(".site-header");
    const btn = document.querySelector("[data-menu-btn]");
    const menu = document.querySelector("[data-menu]");

    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    document.querySelector("[data-lang-toggle]").addEventListener("click", () => {
      App.setLang(App.lang === "es" ? "en" : "es");
    });

    // Tema: claro por defecto, oscuro opcional (se recuerda la elección)
    const root = document.documentElement;
    const themeColor = document.querySelector('meta[name="theme-color"]');
    const applyTheme = (theme) => {
      if (theme === "light") root.dataset.theme = "light";
      else delete root.dataset.theme;
      if (themeColor) themeColor.content = theme === "light" ? "#f2f2f8" : "#0a0a0f";
    };
    applyTheme(root.dataset.theme === "light" ? "light" : "dark");
    document.querySelector("[data-theme-toggle]").addEventListener("click", () => {
      const next = root.dataset.theme === "light" ? "dark" : "light";
      applyTheme(next);
      try { localStorage.setItem("portfolio-theme", next); } catch (e) {}
    });

    const setOpen = (open) => {
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", App.t(open ? "nav.close" : "nav.menu"));
      header.classList.toggle("menu-open", open);
      if (open) {
        menu.hidden = false;
        requestAnimationFrame(() => menu.classList.add("is-open"));
      } else {
        menu.classList.remove("is-open");
        setTimeout(() => { if (!menu.classList.contains("is-open")) menu.hidden = true; }, 250);
      }
    };
    btn.addEventListener("click", () => setOpen(btn.getAttribute("aria-expanded") !== "true"));
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { setOpen(false); btn.focus(); }
    });
    document.addEventListener("click", (e) => {
      if (!header.contains(e.target) && btn.getAttribute("aria-expanded") === "true") setOpen(false);
    });

    // Resalta la sección visible en el menú
    const links = [...menu.querySelectorAll('a[href^="#"]')];
    const sections = links.map((a) => document.getElementById(a.hash.slice(1))).filter(Boolean);
    // Si el menú ya marca la página actual (p. ej. Marca), no se resalta además una sección
    if (sections.length && !menu.querySelector("[aria-current=page]")) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          links.forEach((a) => a.classList.toggle("is-current", a.hash === "#" + en.target.id));
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      sections.forEach((s) => io.observe(s));
    }
  }

  function initFooter() {
    document.querySelectorAll("[data-to-top]").forEach((a) => a.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      history.replaceState(null, "", location.pathname + location.search);
    }));
    const toast = document.querySelector("[data-toast]");
    document.querySelector("[data-copy-email]")?.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(P.email);
      } catch (e) {
        location.href = `mailto:${P.email}`;
        return;
      }
      toast.textContent = App.t("footer.copied");
      toast.classList.add("is-visible");
      clearTimeout(toast._t);
      toast._t = setTimeout(() => toast.classList.remove("is-visible"), 2200);
    });
  }

  /* ---------- Barra de estado (datos reales del navegador y del repo) ---------- */
  function initStatus() {
    const $s = (sel) => document.querySelector(sel);
    const vp = $s("[data-stat-vp]");
    const setVp = () => { if (vp) vp.textContent = `${innerWidth}×${innerHeight}`; };
    setVp();
    addEventListener("resize", setVp, { passive: true });

    // Peso transferido y tiempo de carga, medidos con la Performance API
    addEventListener("load", () => setTimeout(() => {
      const nav = performance.getEntriesByType("navigation")[0];
      const res = performance.getEntriesByType("resource");
      const bytes = [nav, ...res].reduce((sum, e) => sum + ((e && (e.transferSize || e.encodedBodySize)) || 0), 0);
      const w = $s("[data-stat-weight]");
      if (w && bytes) w.textContent = bytes > 1e6 ? `${(bytes / 1e6).toFixed(2)} MB` : `${Math.round(bytes / 1024)} KB`;
      const l = $s("[data-stat-load]");
      if (l && nav && nav.loadEventStart) l.textContent = `${(nav.loadEventStart / 1000).toFixed(2)} s`;
    }, 0));

    // Último commit publicado (API pública de GitHub; se guarda en la sesión para no repetir la consulta)
    const link = $s("[data-stat-commit]");
    const repo = P.repo;
    if (!link || !repo) return;
    const show = (c) => {
      link.textContent = c.sha.slice(0, 7);
      link.href = `https://github.com/${repo}/commit/${c.sha}`;
      link.title = new Date(c.date).toLocaleString(App.lang === "es" ? "es-ES" : "en-GB");
    };
    try {
      const cached = JSON.parse(sessionStorage.getItem("portfolio-commit"));
      if (cached && cached.sha) return show(cached);
    } catch (e) {}
    fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(([c]) => {
        const data = { sha: c.sha, date: c.commit.committer.date };
        show(data);
        try { sessionStorage.setItem("portfolio-commit", JSON.stringify(data)); } catch (e) {}
      })
      .catch(() => { link.textContent = "main"; });
  }

  /* ---------- Animaciones ---------- */
  // Efecto "descifrado" de texto: letras aleatorias que se resuelven
  function scramble(el, finalText, { duration = 700 } = {}) {
    const text = finalText ?? el.textContent;
    // Al imprimir, el texto final directamente (si no, el CV puede salir con letras a medio descifrar)
    if (reduceMotion || matchMedia("print").matches) { el.textContent = text; return; }
    const chars = "!<>-_\\/[]{}—=+*^?#01";
    const start = performance.now();
    cancelAnimationFrame(el._scr);
    const frame = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const reveal = Math.floor(p * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (i < reveal || text[i] === " ") out += text[i];
        else out += chars[(Math.random() * chars.length) | 0];
      }
      el.textContent = out;
      if (p < 1) el._scr = requestAnimationFrame(frame);
    };
    el._scr = requestAnimationFrame(frame);
  }

  let revealIO;
  function observeReveal(root = document) {
    const els = root.querySelectorAll("[data-reveal]:not(.is-visible)");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    revealIO ||= new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        el.classList.add("is-visible");
        if (el.matches("[data-scramble]")) scramble(el.querySelector("[data-i18n]") || el);
        revealIO.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    els.forEach((el) => revealIO.observe(el));
  }

  // Brillo que sigue al cursor en tarjetas con [data-glow]
  function initGlow() {
    document.addEventListener("pointermove", (e) => {
      const card = e.target.closest?.("[data-glow]");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    }, { passive: true });
  }

  /* ---------- Arranque ---------- */
  mountChrome();
  applyI18n();
  initHeader();
  initFooter();
  initStatus();
  initGlow();
  document.addEventListener("DOMContentLoaded", () => observeReveal());
  window.addEventListener("load", () => document.body.classList.add("is-loaded"));
})();
