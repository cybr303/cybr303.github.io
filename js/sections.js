/* ==========================================================================
   Secciones de la web. Cada bloque solo se pinta si su contenedor existe
   en la página actual (home, about, skills, experience).
   Todo se genera a partir de data/profile.js y data/projects.js.
   ========================================================================== */
(function () {
  const { t, tr, esc } = App;
  const P = window.PROFILE;
  const $ = (sel, root = document) => root.querySelector(sel);

  /* ---------------- HERO (home) ---------------- */
  const hero = {
    get exists() { return !!$("[data-typed]"); },
    timer: null,

    render() {
      // Nombre partido en letras para poder variar la anchura de cada una (eje wdth de Archivo)
      const nameEl = $("[data-name]");
      nameEl.setAttribute("aria-label", P.name);
      nameEl.innerHTML = P.name.split(" ").map((word) =>
        `<span class="hero-name__line" aria-hidden="true">${[...word].map((ch) => `<span class="hero-name__ch">${esc(ch)}</span>`).join("")}</span>`
      ).join("");
      $("[data-whoami]").textContent = P.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
      $("[data-location]").textContent = tr(P.location);
      const count = $("[data-project-count]");
      if (count) count.textContent = t("projects.count", { n: window.PROJECTS.length });
      // Si no hay `role` en profile.js, la línea bajo el título se oculta
      const role = tr(P.role);
      $("[data-role]").textContent = role || tr(P.titles).join(" & ");
      $("[data-role-visible]").textContent = role;
      $("[data-role-visible]").hidden = !role;
      $("[data-sticky-text]").textContent = tr(P.stickyNote);
      $("[data-status]").hidden = !P.available;
      if (this.booted) $("[data-boot]").textContent = `${t("hero.boot")}...`;
    },

    // Teclea texto carácter a carácter
    type(el, text, speed = 55) {
      return new Promise((resolve) => {
        if (App.reduceMotion) { el.textContent = text; return resolve(); }
        let i = 0;
        const step = () => {
          el.textContent = text.slice(0, ++i);
          if (i < text.length) this.timer = setTimeout(step, speed + Math.random() * 40);
          else resolve();
        };
        step();
      });
    },
    erase(el, speed = 28) {
      return new Promise((resolve) => {
        const step = () => {
          el.textContent = el.textContent.slice(0, -1);
          if (el.textContent.length) this.timer = setTimeout(step, speed);
          else resolve();
        };
        step();
      });
    },
    wait(ms) { return new Promise((r) => (this.timer = setTimeout(r, ms))); },

    async loopTitles() {
      const token = (this.token = {});
      const el = $("[data-typed]");
      const titles = tr(P.titles);
      if (App.reduceMotion) { el.textContent = titles.join(" · "); return; }
      let i = 0;
      while (token === this.token) {
        await this.type(el, titles[i % titles.length]);
        if (token !== this.token) break;
        await this.wait(1800);
        if (token !== this.token) break;
        await this.erase(el);
        await this.wait(250);
        i++;
      }
    },

    restartTitles() {
      clearTimeout(this.timer);
      $("[data-typed]").textContent = "";
      if (this.stopped) return this.showStatic();
      this.loopTitles();
    },

    // La terminal interactiva (js/terminal.js) toma el control: se para la animación y
    // queda el estado final fijo (arranque hecho y los títulos completos, sin cursor)
    stop() {
      if (this.stopped) return;
      this.stopped = true;
      this.token = null;
      clearTimeout(this.timer);
      this.booted = true;
      $("[data-boot]").textContent = `${t("hero.boot")}...`;
      const screen = $(".monitor__screen");
      if (screen.classList.contains("is-booting")) {
        screen.classList.remove("is-booting");
        screen.classList.add("is-on");
      }
      this.showStatic();
    },
    showStatic() {
      $("[data-typed]").textContent = tr(P.titles).join(" · ");
      $(".hero-titles .caret").hidden = true;
    },

    async boot() {
      this.render();
      const bootEl = $("[data-boot]");
      const screen = $(".monitor__screen");
      if (!App.reduceMotion) {
        screen.classList.add("is-booting");
        await this.type(bootEl, `${t("hero.boot")}...`, 30);
        await this.wait(250);
      }
      if (this.stopped) return;
      this.booted = true;
      bootEl.textContent = `${t("hero.boot")}...`; // por si se cambió el idioma mientras tecleaba
      screen.classList.remove("is-booting");
      screen.classList.add("is-on");
      this.loopTitles();
    },

    clock() {
      const el = $("[data-clock]");
      const tick = () => {
        const locale = App.lang === "es" ? "es-ES" : "en-GB";
        el.textContent = new Date().toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
      };
      tick();
      setInterval(tick, 10000);
    },

    // Cotas: miden el monitor de verdad y se actualizan al cambiar el tamaño de la ventana
    dims() {
      const mon = $(".monitor__bezel");
      const w = $("[data-dim-w]");
      const h = $("[data-dim-h]");
      const update = () => {
        const r = mon.getBoundingClientRect();
        w.textContent = `${Math.round(r.width)} px`;
        h.textContent = `${Math.round(r.height)} px`;
        mon.closest("[data-machine]").style.setProperty("--bezel-h", `${r.height}px`);
      };
      update();
      if ("ResizeObserver" in window) new ResizeObserver(update).observe(mon);
    },

    // Anchura de las letras del nombre según la distancia al cursor
    pointer() {
      const section = $(".hero");
      const chars = () => section.querySelectorAll(".hero-name__ch");
      let raf = 0;
      let last = null;
      const frame = () => {
        raf = 0;
        if (!last) return;
        const { x, y } = last;
        if (App.reduceMotion || !matchMedia("(hover: hover)").matches) return;
        chars().forEach((ch) => {
          const r = ch.getBoundingClientRect();
          const d = Math.hypot(x - (r.left + r.width / 2), (y - (r.top + r.height / 2)) * 1.6);
          const k = Math.max(0, 1 - d / 300);
          ch.style.fontStretch = `${Math.round(62 + k * 50)}%`;
        });
      };
      section.addEventListener("pointermove", (e) => {
        last = { x: e.clientX, y: e.clientY };
        if (!raf) raf = requestAnimationFrame(frame);
      }, { passive: true });
      section.addEventListener("pointerleave", () => {
        last = null;
        chars().forEach((ch) => (ch.style.fontStretch = ""));
      });
    },

    init() {
      this.boot();
      this.clock();
      this.dims();
      this.pointer();
    },
  };

  /* ---------------- PROYECTOS: carrusel continuo (home) ---------------- */
  const projects = {
    get exists() { return !!$("[data-marquee]"); },
    filter: new URLSearchParams(location.search).get("filter") || "all",
    MIN_CARDS: 6, // si hay pocos proyectos se repiten hasta llenar el carrusel
    SECONDS_PER_CARD: 7, // velocidad: cuanto mayor, más lento

    usedCategories() {
      const used = new Set(window.PROJECTS.flatMap((p) => p.categories || []));
      return Object.keys(window.PROJECT_CATEGORIES).filter((k) => used.has(k));
    },

    renderFilters() {
      const wrap = $("[data-filters]");
      const cats = this.usedCategories();
      if (!cats.includes(this.filter)) this.filter = "all";
      wrap.innerHTML = ["all", ...cats].map((key) => {
        const label = key === "all" ? t("projects.all") : tr(window.PROJECT_CATEGORIES[key]);
        const n = key === "all" ? window.PROJECTS.length : window.PROJECTS.filter((p) => p.categories?.includes(key)).length;
        return `<button type="button" class="chip${key === this.filter ? " is-active" : ""}" data-filter="${key}" aria-pressed="${key === this.filter}">
          ${esc(label)}<span class="chip__n mono">${n}</span></button>`;
      }).join("");
    },

    card(p, copy) {
      const cats = (p.categories || []).map((c) => `<li>${esc(tr(window.PROJECT_CATEGORIES[c]) || c)}</li>`).join("");
      // Las copias (para el bucle infinito) se ocultan a lectores de pantalla y al tabulador
      const hidden = copy ? ` aria-hidden="true"` : "";
      const tab = copy ? ` tabindex="-1"` : "";
      return `
      <article class="project-card"${hidden}>
        <a class="project-card__link" href="project.html?id=${encodeURIComponent(p.id)}"${tab} draggable="false">
          <div class="project-card__media">
            <img src="${esc(p.cover)}" alt="" loading="lazy" draggable="false">
            <span class="project-card__year mono">${esc(String(p.date).slice(0, 4))}</span>
          </div>
          <div class="project-card__body">
            <ul class="tags">${cats}</ul>
            <h3 class="project-card__title">${esc(tr(p.title))}</h3>
            <p class="project-card__sub">${esc(tr(p.subtitle))}</p>
            <p class="project-card__summary">${esc(tr(p.summary))}</p>
            <span class="project-card__cta mono">${esc(t("projects.open"))} <span aria-hidden="true">→</span></span>
          </div>
        </a>
      </article>`;
    },

    render() {
      const list = App.sortedProjects().filter((p) => this.filter === "all" || p.categories?.includes(this.filter));
      const track = $("[data-marquee]");
      $("[data-empty]").hidden = list.length > 0;
      if (!list.length) { track.innerHTML = ""; return; }

      // Una "vuelta" con al menos MIN_CARDS tarjetas; luego se duplica para que el bucle no tenga cortes
      const lap = [];
      while (lap.length < Math.max(this.MIN_CARDS, list.length)) lap.push(...list);
      const html = lap.map((p, i) => this.card(p, i >= list.length)).join("");
      const copy = lap.map((p) => this.card(p, true)).join("");
      track.innerHTML = html + copy;
      this.offset = 0;
      this.anim = null;
      this.measure();
    },

    /* Movimiento: lo hace JS (no una animación CSS) para que las flechas puedan
       avanzar o retroceder una tarjeta y luego seguir el desplazamiento automático */
    offset: 0, // píxeles desplazados hacia la izquierda
    anim: null, // salto en curso de una flecha: { from, to, start }
    paused: false,
    JUMP_MS: 450,

    measure() {
      const track = $("[data-marquee]");
      const card = track.querySelector(".project-card");
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      this.step = card ? card.getBoundingClientRect().width + gap : 0; // una tarjeta + hueco
      this.half = (track.scrollWidth + gap) / 2; // ancho de una vuelta (la pista lleva dos copias)
    },

    apply() {
      const track = $("[data-marquee]");
      if (this.half > 0) this.offset = ((this.offset % this.half) + this.half) % this.half;
      track.style.transform = `translateX(${-this.offset}px)`;
    },

    jump(dir) {
      if (!this.step) return;
      const base = this.anim ? this.anim.to : this.offset; // clics seguidos se acumulan
      // Alinea con el borde de una tarjeta para que no quede cortada
      const target = dir > 0 ? (Math.floor(base / this.step + 0.01) + 1) * this.step : (Math.ceil(base / this.step - 0.01) - 1) * this.step;
      if (App.reduceMotion) { this.offset = target; this.anim = null; this.apply(); return; }
      this.anim = { from: this.offset, to: target, start: performance.now() };
    },

    tick(now) {
      const dt = Math.min(now - (this.last || now), 100) / 1000;
      this.last = now;
      if (this.anim) {
        const k = Math.min((now - this.anim.start) / this.JUMP_MS, 1);
        const ease = 1 - Math.pow(1 - k, 3);
        this.offset = this.anim.from + (this.anim.to - this.anim.from) * ease;
        if (k === 1) { this.offset = this.anim.to; this.anim = null; }
        this.apply();
      } else if (!this.paused && !App.reduceMotion && this.step && !document.hidden) {
        this.offset += (this.step / this.SECONDS_PER_CARD) * dt;
        this.apply();
      }
      requestAnimationFrame((t) => this.tick(t));
    },

    setFilter(key) {
      this.filter = key;
      const url = new URL(location.href);
      key === "all" ? url.searchParams.delete("filter") : url.searchParams.set("filter", key);
      history.replaceState(null, "", url);
      this.renderFilters();
      this.render();
    },

    init() {
      this.renderFilters();
      this.render();
      $("[data-filters]").addEventListener("click", (e) => {
        const btn = e.target.closest("[data-filter]");
        if (btn) this.setFilter(btn.dataset.filter);
      });

      // Se pausa con el ratón encima (flechas incluidas) o al navegar con el teclado
      const carousel = $("[data-carousel]");
      const sync = () => { this.paused = carousel.matches(":hover") || !!carousel.querySelector(":focus-visible"); };
      ["mouseenter", "mouseleave", "focusin", "focusout"].forEach((ev) => carousel.addEventListener(ev, () => setTimeout(sync)));
      $("[data-carousel-prev]").addEventListener("click", () => this.jump(-1));
      $("[data-carousel-next]").addEventListener("click", () => this.jump(1));
      window.addEventListener("resize", () => { this.measure(); this.apply(); });
      window.addEventListener("load", () => this.measure()); // las portadas pueden cambiar el ancho
      requestAnimationFrame((t) => this.tick(t));
    },
  };

  /* ---------------- ABOUT ---------------- */
  const about = {
    get exists() { return !!$("[data-about-body]"); },
    render() {
      $("[data-about-hello]").textContent = tr(P.about.hello);
      $("[data-about-name]").textContent = tr(P.about.name);
      $("[data-about-lead]").textContent = tr(P.about.lead);
      $("[data-about-body]").textContent = tr(P.about.body);
      $("[data-about-where]").textContent = tr(P.location);
      $("[data-linkedin]").href = P.linkedin;
      $("[data-linkedin-label]").textContent = P.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
      $("[data-about-tags]").innerHTML = (P.about.tags || []).map((tag, i) =>
        `<span class="about-tag about-tag--${i + 1}">${esc(tr(tag))}</span>`).join("");
      const photo = $("[data-photo]");
      photo.src = P.photo;
      photo.alt = P.name;

      const stats = [
        { n: App.yearsSince(P.careerStart), label: t("about.stat.years"), plus: true },
        { n: window.PROJECTS.length, label: t("about.stat.projects") },
        { n: P.skills.length, label: t("about.stat.tools") },
      ];
      const dl = $("[data-stats]");
      dl.innerHTML = stats.map((s) => `
        <div class="stat"><dt>${esc(s.label)}</dt><dd class="mono"><span data-count-to="${s.n}">${s.n}</span>${s.plus ? "+" : ""}</dd></div>`).join("");
      this.countUp(dl);

      $("[data-contact-list]").innerHTML = `
        <li><span class="mono">@</span><a href="mailto:${esc(P.email)}">${esc(P.email)}</a></li>
        <li><span class="mono">in</span><a href="${esc(P.linkedin)}" target="_blank" rel="noopener">LinkedIn</a></li>
        ${P.github ? `<li><span class="mono">gh</span><a href="${esc(P.github)}" target="_blank" rel="noopener">${esc(P.github.replace(/^https?:\/\//, ""))}</a></li>` : ""}
        <li><span class="mono">◎</span>${esc(tr(P.location))}</li>
        ${P.available ? `<li class="is-available"><span class="status-pill__dot"></span>${esc(t("hero.status"))}</li>` : ""}`;
    },

    countUp(root) {
      if (App.reduceMotion) return;
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target;
          const target = Number(el.dataset.countTo);
          const start = performance.now();
          const frame = (now) => {
            const p = Math.min(1, (now - start) / 900);
            el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(frame);
          };
          requestAnimationFrame(frame);
          io.unobserve(el);
        });
      }, { threshold: 0.6 });
      root.querySelectorAll("[data-count-to]").forEach((el) => io.observe(el));
    },
  };

  /* ---------------- SKILLS ---------------- */
  const skills = {
    get exists() { return !!$("[data-skill-grid]"); },
    render() {
      $("[data-skill-grid]").innerHTML = P.skills.map((s, i) => {
        const abbr = esc(s.abbr || s.name.slice(0, 2));
        // Si el icono no existe o falla, se sustituye por el monograma
        const icon = s.icon
          ? `<img class="skill__icon" src="img/icons/${esc(s.icon)}.svg" alt="" loading="lazy"
               onerror="this.outerHTML='<span class=&quot;skill__icon is-mono&quot;>${abbr}</span>'">`
          : `<span class="skill__icon is-mono">${abbr}</span>`;
        return `
        <li class="skill" style="--i:${i}" data-glow>
          ${icon}
          <span class="skill__name">${esc(s.name)}</span>
        </li>`;
      }).join("");

      $("[data-soft-list]").innerHTML = P.softSkills.map((s) => `<li>${esc(tr(s))}</li>`).join("");
      $("[data-lang-list]").innerHTML = P.languages.map((l) =>
        `<li><strong>${esc(tr(l.name))}</strong><span class="mono">${esc(tr(l.level))}</span></li>`).join("");
    },
  };

  /* ---------------- EXPERIENCIA / ESTUDIOS ---------------- */
  const experience = {
    get exists() { return !!$("[data-experience]"); },
    item(e) {
      const tasks = (e.tasks || []).map((x) => `<li>${esc(tr(x))}</li>`).join("");
      return `
      <li class="tl-item" data-reveal>
        <div class="tl-item__row">
          <h3 class="tl-item__title">${esc(tr(e.title))}</h3>
          <span class="tl-item__leader" aria-hidden="true"></span>
          <p class="tl-item__date mono">
            ${e.start ? `<time datetime="${esc(e.start)}">${esc(App.formatYM(e.start))}</time> | ` : ""}${e.end ? `<time datetime="${esc(e.end)}">${esc(App.formatYM(e.end))}</time>` : `<span class="is-now">${esc(t("exp.present"))}</span>`}
          </p>
        </div>
        <p class="tl-item__place">${esc(tr(e.place))}${e.start ? ` <span class="tl-item__dur mono">· ${esc(App.duration(e.start, e.end))}</span>` : ""}</p>
        ${tasks ? `<ul class="tl-item__tasks">${tasks}</ul>` : ""}
      </li>`;
    },
    render() {
      // Lo más reciente primero: lo que sigue en curso arriba; si no hay inicio, cuenta el fin
      const key = (e) => (e.end ? String(e.end) : "9999") + String(e.start || "9999");
      const list = (items = []) => [...items].sort((a, b) => key(b).localeCompare(key(a))).map((e) => this.item(e)).join("");
      $("[data-experience]").innerHTML = list(P.experience);
      $("[data-studies]").innerHTML = list(P.studies);
      const awards = $("[data-awards]");
      if (awards) {
        awards.innerHTML = list(P.awards);
        awards.hidden = awards.previousElementSibling.hidden = !P.awards?.length;
      }
    },
  };

  /* ---------------- PROCESO DE TRABAJO ---------------- */
  const ICONS = {
    search: '<circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/>',
    design: '<path d="M12 3 4 21h16L12 3z"/><circle cx="12" cy="15" r="2"/>',
    code: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
    launch: '<path d="M5 19c1-4 3-7 6-9l3 3c-2 3-5 5-9 6zM14 4c3 0 6 3 6 6l-4 4-6-6 4-4z"/>',
  };
  const icon = (name, size = 24) =>
    `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.search}</svg>`;

  const process = {
    get exists() { return !!$("[data-process]"); },
    // Semicírculo dividido en segmentos (uno por paso) con líneas discontinuas hacia cada paso
    hub(steps) {
      const W = 300, H = 420, cx = 40, cy = H / 2, rOut = 175, rIn = 98, gap = 3;
      const n = steps.length, span = 180 / n;
      const pt = (r, deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)];
      let svg = "";
      steps.forEach((step, i) => {
        const a1 = -90 + i * span + gap, a2 = -90 + (i + 1) * span - gap, mid = (a1 + a2) / 2;
        const [x1, y1] = pt(rOut, a1), [x2, y2] = pt(rOut, a2), [x3, y3] = pt(rIn, a2), [x4, y4] = pt(rIn, a1);
        svg += `<path class="process__seg" d="M${x1} ${y1}A${rOut} ${rOut} 0 0 1 ${x2} ${y2}L${x3} ${y3}A${rIn} ${rIn} 0 0 0 ${x4} ${y4}Z"/>`;
        const [ix, iy] = pt((rOut + rIn) / 2, mid);
        svg += `<g transform="translate(${ix - 13} ${iy - 13})" class="process__seg-icon">${icon(step.icon, 26)}</g>`;
        const [dx, dy] = pt(rOut, mid);
        svg += `<circle class="process__dot" cx="${dx}" cy="${dy}" r="5"/><path class="process__line" d="M${dx + 6} ${dy}H${W}"/>`;
      });
      svg += `<circle class="process__core" cx="${cx}" cy="${cy}" r="${rIn - 18}"/>`;
      svg += `<text class="process__core-text" x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="central">303</text>`;
      return { svg: `<svg class="process__hub" viewBox="0 0 ${W} ${H}" aria-hidden="true">${svg}</svg>`, tops: steps.map((_, i) => pt(rOut, -90 + (i + 0.5) * span)[1] / H) };
    },
    render() {
      const steps = P.process || [];
      const { svg, tops } = this.hub(steps);
      $("[data-process]").innerHTML = `${svg}
        <ol class="process__steps">${steps.map((s, i) => `
          <li class="process__step" style="--top:${(tops[i] * 100).toFixed(2)}%">
            <span class="process__num mono">${String(i + 1).padStart(2, "0")}</span>
            <span class="process__icon">${icon(s.icon, 20)}</span>
            <div><h3>${esc(tr(s.title))}</h3><p>${esc(tr(s.text))}</p></div>
          </li>`).join("")}
        </ol>`;
    },
  };

  /* ---------------- COSAS QUE ME GUSTAN: carrusel automático de fotos ---------------- */
  const hobbies = {
    get exists() { return !!$("[data-hobbies]"); },
    MIN_CARDS: 8,
    SECONDS_PER_CARD: 6,
    card(h, copy) {
      return `
        <li class="hobby"${copy ? ' aria-hidden="true"' : ""}>
          <img src="${esc(h.image)}" alt="${copy ? "" : esc(tr(h.title))}" loading="lazy">
          <div class="hobby__caption">
            <h3 class="hobby__title">${esc(tr(h.title))}</h3>
            <p class="hobby__text">${esc(tr(h.text))}</p>
          </div>
        </li>`;
    },
    render() {
      const list = P.hobbies || [];
      const track = $("[data-hobbies]");
      if (!list.length) { track.innerHTML = ""; return; }
      const lap = [];
      while (lap.length < Math.max(this.MIN_CARDS, list.length)) lap.push(...list);
      track.innerHTML = lap.map((h, i) => this.card(h, i >= list.length)).join("") + lap.map((h) => this.card(h, true)).join("");
      track.style.setProperty("--duration", `${lap.length * this.SECONDS_PER_CARD}s`);
      track.classList.add("is-running");
    },
  };

  /* ---------------- Arranque ---------------- */
  const renderers = [about, process, skills, experience, hobbies].filter((s) => s.exists);
  // Recuentos reales a la derecha del índice de cada sección (/02 ········ 4 pasos)
  const COUNTS = {
    process: () => (P.process || []).length,
    skills: () => P.skills.length,
    exp: () => P.experience.length + P.studies.length + (P.awards?.length || 0),
    hobbies: () => (P.hobbies || []).length,
  };
  function renderCounts() {
    document.querySelectorAll("[data-count]").forEach((el) => {
      const n = COUNTS[el.dataset.count]?.();
      if (n != null) el.textContent = t(`${el.dataset.count}.count`, { n });
    });
  }

  function renderAll() {
    if (hero.exists) hero.render();
    renderers.forEach((s) => s.render());
    renderCounts();
    App.observeReveal();
  }

  if (hero.exists) {
    hero.init();
    document.addEventListener("terminal:start", () => hero.stop());
  }
  if (projects.exists) projects.init();
  renderAll();

  document.addEventListener("langchange", () => {
    renderAll();
    if (hero.exists) hero.restartTitles();
    if (projects.exists) { projects.renderFilters(); projects.render(); }
    // Vuelve a "descifrar" los títulos visibles con el nuevo idioma
    document.querySelectorAll("[data-scramble].is-visible").forEach((el) => App.scramble(el.querySelector("[data-i18n]") || el));
  });
})();
