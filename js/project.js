/* ==========================================================================
   Ficha de proyecto: project.html?id=<id>
   Cabecera con ficha técnica, portada y secciones numeradas:
   Contexto, Sistema*, Antes / después*, Resultado y Archivo (carrusel).
   * Solo aparecen si el proyecto tiene esos datos (ver data/projects.js).
   ========================================================================== */
(function () {
  const { t, tr, esc } = App;
  const root = document.querySelector("[data-project]");
  const id = new URLSearchParams(location.search).get("id");
  const list = App.sortedProjects();
  const pad = (n) => String(n).padStart(2, "0");

  function notFound() {
    root.innerHTML = `
      <div class="not-found">
        <p class="mono kicker">404</p>
        <h1 class="section-title glitch" data-text="${esc(t("project.notfound"))}">${esc(t("project.notfound"))}</h1>
        <p>${esc(t("project.notfound.text"))}</p>
        <a class="btn btn--primary" href="index.html#projects">← ${esc(t("project.back"))}</a>
      </div>`;
  }

  // Cabecera de cada sección: /01 ······ etiqueta, y el título debajo
  function sectionHead(n, label, title, extra = "") {
    return `
      <div class="section-index mono"><span>/${pad(n)}</span><span>${esc(label)}</span></div>
      <h2 class="pj-h2">${esc(title)}</h2>${extra}`;
  }

  function render() {
    const idx = list.findIndex((p) => p.id === id);
    if (idx === -1) return notFound();
    const p = list[idx];
    const prev = list[(idx - 1 + list.length) % list.length];
    const next = list[(idx + 1) % list.length];
    const title = tr(p.title);
    const ref = `303-${p.id.toUpperCase()}`;
    const cat = (c) => tr(window.PROJECT_CATEGORIES[c]) || c;
    let n = 0;

    document.querySelector('meta[name="description"]').content = tr(p.summary);

    const tags = (p.categories || []).map((c) => `
      <li><a class="chip chip--link" href="index.html?filter=${encodeURIComponent(c)}#projects" title="${esc(t("project.filterBy"))} ${esc(cat(c))}">
        <span class="mono">#</span>${esc(cat(c))}</a></li>`).join("");

    const spec = [
      [t("project.year"), esc(String(p.date).slice(0, 4))],
      [t("project.timeline"), esc(tr(p.time))],
      [t("project.role"), esc(tr(p.role))],
      [t("project.tools"), (p.tools || []).map(esc).join(" · ")],
    ].filter(([, v]) => v).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${v}</dd></div>`).join("");

    const links = [
      p.links?.live && `<a class="btn btn--primary" href="${esc(p.links.live)}" target="_blank" rel="noopener">${esc(t("project.live"))} <span aria-hidden="true">↗</span></a>`,
      p.links?.repo && `<a class="btn btn--ghost" href="${esc(p.links.repo)}" target="_blank" rel="noopener">${esc(t("project.repo"))} <span aria-hidden="true">↗</span></a>`,
    ].filter(Boolean).join("");

    /* /01 Contexto */
    const context = `
      <section class="pj-sec" aria-label="${esc(t("project.context"))}" data-reveal>
        ${sectionHead(++n, t("project.context"), tr(p.headline) || t("project.context"))}
        <div class="pj-cols${p.statement ? "" : " pj-cols--single"}">
          ${p.statement ? `<p class="pj-statement">${esc(tr(p.statement))}</p>` : ""}
          <p class="pj-prose">${esc(tr(p.goal))}</p>
        </div>
      </section>`;

    /* /02 Sistema (banda azul) */
    const sys = p.system;
    const nodeHtml = (node, i, core) => `
      <li class="pj-node${core ? " pj-node--core" : ""}">
        <span class="pj-node__id mono">${core ? "core" : `${esc(t("project.system"))}_${pad(i + 1)}`}</span>
        <h3>${esc(tr(node.title))}</h3>
        <p>${esc(tr(node.text))}</p>
        ${node.tags?.length ? `<ul class="pj-node__tags mono">${node.tags.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
      </li>`;
    const system = sys?.nodes?.length ? `
      <section class="pj-band" aria-label="${esc(t("project.system"))}">
        <div class="pj-band__inner" data-reveal>
          ${sectionHead(++n, tr(sys.label) || t("project.system"), tr(sys.title) || t("project.system"))}
          <ul class="pj-sys">
            ${sys.nodes.map((node, i) => nodeHtml(node, i, false)).join("")}
            ${sys.core ? nodeHtml(sys.core, 0, true) : ""}
          </ul>
        </div>
      </section>` : "";

    /* /03 Antes / después */
    const shot = (s, key) => `
      <figure class="pj-ba__shot">
        <img src="${esc(s.src)}" alt="${esc(tr(s.title))}" loading="lazy">
        <figcaption>
          <span class="mono">[${pad(key === "before" ? 1 : 2)}] ${esc(t(`project.${key}`))}</span>
          <strong>${esc(tr(s.title))}</strong>
          <span class="mono">${esc(tr(s.caption))}</span>
        </figcaption>
      </figure>`;
    const change = p.before && p.after ? `
      <section class="pj-sec" aria-label="${esc(t("project.change"))}" data-reveal>
        ${sectionHead(++n, t("project.changeSub"), t("project.change"))}
        <div class="pj-ba">
          ${shot(p.before, "before")}
          <span class="pj-ba__arrow mono" aria-hidden="true">→</span>
          ${shot(p.after, "after")}
          ${p.delta?.length ? `<ul class="pj-ba__delta mono">${p.delta.map((d) => `<li>${esc(tr(d))}</li>`).join("")}</ul>` : ""}
        </div>
      </section>` : "";

    /* /04 Resultado */
    const highlights = (p.highlights || []).map((h) => `<li>${esc(tr(h))}</li>`).join("");
    const result = `
      <section class="pj-sec" aria-label="${esc(t("project.result"))}" data-reveal>
        ${sectionHead(++n, t("project.resultSub"), t("project.result"))}
        <div class="pj-cols">
          <div>
            ${p.result ? `<p class="pj-result">${esc(tr(p.result))}</p>` : ""}
            ${links ? `<div class="pj-links">${links}</div>` : ""}
          </div>
          ${highlights ? `<ol class="pj-hl">${highlights}</ol>` : ""}
        </div>
      </section>`;

    /* /05 Archivo: carrusel */
    const g = p.gallery || [];
    const archive = g.length ? `
      <section class="pj-sec" aria-label="${esc(t("project.archive"))}" data-reveal>
        ${sectionHead(++n, t("project.archiveSub", { n: g.length }), t("project.archive"))}
        <div class="pj-car" data-carousel>
          <div class="pj-car__stage">
            <button type="button" class="pj-car__open" data-open="0" aria-label="${esc(t("project.zoom"))}">
              <img data-car-img src="${esc(g[0].src)}" alt="${esc(tr(g[0].caption))}">
            </button>
            <div class="pj-car__bar mono">
              <span data-car-cap></span>
              ${g.length > 1 ? `<span class="pj-car__nav">
                <button type="button" class="icon-btn" data-car-step="-1" aria-label="${esc(t("project.prev"))}">←</button>
                <button type="button" class="icon-btn" data-car-step="1" aria-label="${esc(t("project.next"))}">→</button>
              </span>` : ""}
            </div>
          </div>
          ${g.length > 1 ? `<ul class="pj-car__thumbs">${g.map((x, i) => `
            <li><button type="button" data-car-go="${i}" aria-label="${pad(i + 1)} · ${esc(tr(x.caption))}">
              <img src="${esc(x.src)}" alt="" loading="lazy">
            </button></li>`).join("")}</ul>` : ""}
        </div>
      </section>` : "";

    root.innerHTML = `
      <a class="back-link mono" href="index.html#projects">← ${esc(t("project.back"))}</a>

      <header class="pj-head">
        <div class="pj-head__main">
          <p class="pj-crumb mono"><span>/case_study</span><span>${esc(cat((p.categories || [])[0]))} · ${esc(String(p.date).slice(0, 4))}</span></p>
          <h1 class="pj-title" data-title>${esc(title)}</h1>
          <p class="pj-sub mono">${esc(tr(p.subtitle))}</p>
          <p class="pj-summary">${esc(tr(p.summary))}</p>
          <ul class="project-tags">${tags}</ul>
        </div>
        <aside class="pj-spec mono" aria-label="${esc(t("project.specs"))}">
          <p class="pj-spec__head"><span>${esc(t("project.specs"))}</span><span>${esc(ref)}</span></p>
          <dl>${spec}</dl>
          <p class="pj-spec__foot"><span>REF ${esc(ref)}</span><span class="pj-barcode" aria-hidden="true"></span></p>
        </aside>
      </header>

      <figure class="pj-cover">
        <img src="${esc(p.cover)}" alt="${esc(title)}">
        <figcaption class="mono"><span>${esc(p.links?.live ? p.links.live.replace(/^https?:\/\//, "") : `${p.id}.local`)}</span><span>IMG_00</span></figcaption>
      </figure>

      ${context}${system}${change}${result}${archive}

      <nav class="project-nav" aria-label="${esc(t("nav.projects"))}">
        <a href="project.html?id=${encodeURIComponent(prev.id)}" class="project-nav__link">
          <span class="mono">← ${esc(t("project.prev"))}</span><strong>${esc(tr(prev.title))}</strong>
        </a>
        <span class="project-nav__ref mono" aria-hidden="true">archive ref · ${esc(ref)}</span>
        <a href="project.html?id=${encodeURIComponent(next.id)}" class="project-nav__link project-nav__link--next">
          <span class="mono">${esc(t("project.next"))} →</span><strong>${esc(tr(next.title))}</strong>
        </a>
      </nav>`;

    App.observeReveal(root);
    App.scramble(root.querySelector("[data-title]"), title, { duration: 900 });
    lightbox.items = g;
    carousel.show(0);
  }

  /* ---------- Carrusel del archivo ---------- */
  const carousel = {
    index: 0,
    show(i) {
      const el = root.querySelector("[data-carousel]");
      const items = lightbox.items;
      if (!el || !items.length) return;
      this.index = (i + items.length) % items.length;
      const item = items[this.index];
      const img = el.querySelector("[data-car-img]");
      img.src = item.src;
      img.alt = tr(item.caption);
      el.querySelector("[data-open]").dataset.open = this.index;
      el.querySelector("[data-car-cap]").innerHTML = `<b>IMG_${pad(this.index + 1)}</b> · ${esc(tr(item.caption))} · ${this.index + 1}/${items.length}`;
      el.querySelectorAll("[data-car-go]").forEach((b) => b.setAttribute("aria-current", String(Number(b.dataset.carGo) === this.index)));
    },
  };

  /* ---------- Lightbox de la galería ---------- */
  const lb = document.querySelector("[data-lightbox]");
  const lightbox = {
    items: [],
    index: 0,
    lastFocus: null,
    open(i) {
      this.lastFocus = document.activeElement;
      lb.hidden = false;
      document.body.classList.add("no-scroll");
      requestAnimationFrame(() => lb.classList.add("is-open"));
      this.show(i);
      lb.querySelector("[data-lightbox-close]").focus();
    },
    show(i) {
      if (!this.items.length) return;
      this.index = (i + this.items.length) % this.items.length;
      const item = this.items[this.index];
      const img = lb.querySelector("[data-lightbox-img]");
      img.src = item.src;
      img.alt = tr(item.caption);
      carousel.show(this.index);
      lb.querySelector("[data-lightbox-caption]").textContent = `${this.index + 1}/${this.items.length} · ${tr(item.caption)}`;
      const multi = this.items.length > 1;
      lb.querySelector("[data-lightbox-prev]").hidden = !multi;
      lb.querySelector("[data-lightbox-next]").hidden = !multi;
    },
    close() {
      lb.classList.remove("is-open");
      document.body.classList.remove("no-scroll");
      setTimeout(() => (lb.hidden = true), 200);
      this.lastFocus?.focus();
    },
  };

  root.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-open]");
    if (btn) return lightbox.open(Number(btn.dataset.open));
    const step = e.target.closest("[data-car-step]");
    if (step) return carousel.show(carousel.index + Number(step.dataset.carStep));
    const go = e.target.closest("[data-car-go]");
    if (go) carousel.show(Number(go.dataset.carGo));
  });
  lb.querySelector("[data-lightbox-close]").addEventListener("click", () => lightbox.close());
  lb.querySelector("[data-lightbox-prev]").addEventListener("click", () => lightbox.show(lightbox.index - 1));
  lb.querySelector("[data-lightbox-next]").addEventListener("click", () => lightbox.show(lightbox.index + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) lightbox.close(); });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") lightbox.close();
    if (e.key === "ArrowRight") lightbox.show(lightbox.index + 1);
    if (e.key === "ArrowLeft") lightbox.show(lightbox.index - 1);
    if (e.key === "Tab") {
      // Mantiene el foco dentro del lightbox
      const f = [...lb.querySelectorAll("button:not([hidden])")];
      const i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  });

  render();
  document.addEventListener("langchange", render);
})();
