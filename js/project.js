/* ==========================================================================
   Ficha de proyecto: project.html?id=<id>
   Cabecera con ficha técnica, portada y secciones numeradas:
   Contexto, Sistema*, Base de datos*, Construcción*, Antes / después* (con
   comparador deslizable si las imágenes encajan), Resultado y Archivo (carrusel).
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
    // Con diagrama de BD, los nodos con tablas se pueden enfocar para resaltarlas
    const linked = (node) => p.schema && node.tags?.length;
    const nodeHtml = (node, i, core) => `
      <li class="pj-node${core ? " pj-node--core" : ""}"${linked(node) ? ` tabindex="0" data-er-tags="${esc(node.tags.join(","))}"` : ""}>
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

    /* Base de datos (sigue a la banda azul) y construcción del logo */
    const schema = p.schema?.tables?.length ? schemaHtml(p.schema, ++n) : "";
    const build = p.construction?.paths?.length ? buildHtml(p.construction, ++n) : "";

    /* /03 Antes / después (ver compareBody) */
    const change = p.before && p.after ? `
      <section class="pj-sec" aria-label="${esc(t("project.change"))}" data-reveal>
        ${sectionHead(++n, t("project.changeSub"), t("project.change"))}
        <div class="pj-ba" data-ba>${compareBody(p)}</div>
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

      ${context}${system}${schema}${build}${change}${result}${archive}

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
    if (p.before && p.after) compare.check(p);
    if (build) construction.init();
  }

  /* ---------- Diagrama de base de datos (campo schema) ---------- */
  // Medidas del plano en px: margen izquierdo (por ahí van las relaciones de la
  // primera columna consigo misma), ancho de tabla, calle entre columnas,
  // cabecera, alto de fila, relleno inferior y separación entre tablas
  const ER = { left: 40, colW: 208, gap: 80, head: 30, row: 22, pad: 6, vgap: 28 };

  function schemaLayout(s) {
    const pos = {};
    const colY = [];
    s.tables.forEach((tb) => {
      const cols = tb.cols.map((c) => c.split(":"));
      const h = ER.head + cols.length * ER.row + ER.pad;
      const y = colY[tb.col] || 0;
      pos[tb.name] = { name: tb.name, col: tb.col, cols, x: ER.left + tb.col * (ER.colW + ER.gap), y, h };
      colY[tb.col] = y + h + ER.vgap;
    });
    const last = Math.max(...s.tables.map((tb) => tb.col));
    const width = ER.left + (last + 1) * ER.colW + last * ER.gap + 12;
    const height = Math.max(...colY) - ER.vgap;
    // Centro vertical de una fila: la de la columna indicada o la PK
    const rowY = (tb, col) => {
      const i = Math.max(0, tb.cols.findIndex(([name, k]) => (col ? name === col : k === "pk")));
      return tb.y + ER.head + i * ER.row + ER.row / 2;
    };
    // Cada relación sale de la PK del padre y entra en la fila de la FK del hijo
    const rels = (s.relations || []).map(([a, ref, type]) => {
      const [b, col] = ref.split(".");
      const A = pos[a], B = pos[b];
      if (!A || !B) return null;
      let x1, x2, g;
      if (A.col < B.col) { x1 = A.x + ER.colW; x2 = B.x; g = A.col; }
      else if (A.col > B.col) { x1 = A.x; x2 = B.x + ER.colW; g = B.col; }
      else if (A.col === 0) { x1 = A.x; x2 = B.x; g = -1; }              // misma columna: por el margen
      else { x1 = A.x + ER.colW; x2 = B.x + ER.colW; g = A.col; }         // o por la calle de la derecha
      return { a, b, col, type: type || "1-N", x1, x2, y1: rowY(A), y2: rowY(B, col), g };
    }).filter(Boolean);
    // Carriles: cada relación baja por su propia vertical dentro de la calle.
    // Las de más recorrido van más cerca de su padre, así no se cruzan entre sí.
    const groups = {};
    rels.forEach((r) => (groups[r.g] ||= []).push(r));
    Object.entries(groups).forEach(([g, list]) => {
      g = Number(g);
      const start = g < 0 ? 6 : ER.left + g * (ER.colW + ER.gap) + ER.colW + 16;
      const end = g < 0 ? ER.left - 16 : start + ER.gap - 32;
      const step = list.length > 1 ? (end - start) / (list.length - 1) : 0;
      const span = (r) => Math.abs(r.y2 - r.y1);
      const mid = list.length > 1 ? null : (start + end) / 2;
      list.filter((r) => r.x1 <= start).sort((m, k) => span(k) - span(m)).forEach((r, i) => (r.lane = mid ?? start + i * step));
      list.filter((r) => r.x1 > start).sort((m, k) => span(k) - span(m)).forEach((r, i) => (r.lane = mid ?? end - i * step));
    });
    return { pos, rels, width, height };
  }

  function schemaHtml(s, num) {
    const L = schemaLayout(s);
    // Línea en ángulo recto + notación: dos rayas en el lado "1" y pata de gallo en el lado "N"
    const lines = L.rels.map((r) => {
      const d1 = Math.sign(r.lane - r.x1) || 1;
      const d2 = Math.sign(r.x2 - r.lane) || 1;
      const [one, many] = r.type.split("-");
      const foot = many === "N"
        ? `M${r.x2 - d2 * 11} ${r.y2}L${r.x2} ${r.y2 - 5}M${r.x2 - d2 * 11} ${r.y2}L${r.x2} ${r.y2 + 5}`
        : `M${r.x2 - d2 * 8} ${r.y2 - 5}V${r.y2 + 5}`;
      return `
        <g class="pj-er__rel" data-er-rel data-a="${esc(r.a)}" data-b="${esc(r.b)}">
          <path d="M${r.x1} ${r.y1}H${r.lane}V${r.y2}H${r.x2}"/>
          <path d="M${r.x1 + d1 * 5} ${r.y1 - 5}v10M${r.x1 + d1 * 9} ${r.y1 - 5}v10${foot}"/>
          <text x="${r.x1 + d1 * 5}" y="${r.y1 - 8}" text-anchor="${d1 > 0 ? "start" : "end"}">${esc(one)}</text>
          <text x="${r.x2 - d2 * 4}" y="${r.y2 - 8}" text-anchor="${d2 > 0 ? "end" : "start"}">${esc(many)}</text>
        </g>`;
    }).join("");
    const refOf = (tb, col) => L.rels.find((r) => r.b === tb && r.col === col)?.a;
    const tables = Object.values(L.pos).map((tb) => `
      <li class="pj-er__t" tabindex="0" role="group" aria-label="${esc(tb.name)}" data-er-t="${esc(tb.name)}"
        style="--x:${tb.x}px;--y:${tb.y}px;--h:${tb.h}px">
        <p class="pj-er__name"><span>${esc(tb.name)}</span><span class="pj-er__n">${tb.cols.length}</span></p>
        <ul class="pj-er__cols">${tb.cols.map(([name, k]) => {
          const ref = k === "fk" && refOf(tb.name, name);
          return `<li${k ? ` class="is-${esc(k)}"` : ""}><span class="pj-er__col">${esc(name)}</span>${ref ? `<span class="pj-er__ref">→ ${esc(ref)}</span>` : ""}${k ? `<b>${esc(k.toUpperCase())}</b>` : ""}</li>`;
        }).join("")}</ul>
      </li>`).join("");
    return `
      <section class="pj-band pj-band--er" aria-label="${esc(t("pj.schema.title"))}">
        <div class="pj-band__inner" data-reveal>
          ${sectionHead(num, t("pj.schema.sub", { t: s.tables.length, r: L.rels.length }), t("pj.schema.title"))}
          <p class="pj-er__hint mono">${esc(t("pj.schema.hint"))}</p>
          <div class="pj-er" data-er>
            <div class="pj-er__canvas" style="--w:${L.width}px;--h:${L.height}px;--tw:${ER.colW}px;--head:${ER.head}px;--row:${ER.row}px">
              <svg class="pj-er__lines" viewBox="0 0 ${L.width} ${L.height}" width="${L.width}" height="${L.height}" aria-hidden="true">${lines}</svg>
              <ul class="pj-er__tables">${tables}</ul>
            </div>
          </div>
          <p class="pj-er__legend mono">
            <span><b>PK</b> ${esc(t("pj.schema.legendPk"))}</span>
            <span><b>FK</b> ${esc(t("pj.schema.legendFk"))}</span>
            <span><svg viewBox="0 0 64 14" width="64" height="14" aria-hidden="true"><path d="M0 7H64M5 2v10M9 2v10M53 7L64 2M53 7L64 12"/></svg> 1–N · ${esc(t("pj.schema.legendRel"))}</span>
          </p>
          <p class="pj-er__note mono">${esc(t("pj.schema.note"))}</p>
        </div>
      </section>`;
  }

  // Resalta tablas y relaciones. Con `table`, esa tabla y sus vecinas;
  // si no, las tablas de la lista (las etiquetas de un nodo de Sistema).
  function erHighlight(names = [], table = null) {
    const el = root.querySelector("[data-er]");
    if (!el) return;
    const set = new Set(names);
    const rels = [...el.querySelectorAll("[data-er-rel]")];
    const touches = (g) => g.dataset.a === table || g.dataset.b === table;
    if (table) rels.filter(touches).forEach((g) => { set.add(g.dataset.a); set.add(g.dataset.b); });
    el.classList.toggle("is-focus", set.size > 0);
    el.querySelectorAll("[data-er-t]").forEach((x) => x.classList.toggle("is-hot", set.has(x.dataset.erT)));
    rels.forEach((g) => g.classList.toggle("is-hot", table ? touches(g) : set.has(g.dataset.a) && set.has(g.dataset.b)));
    root.querySelectorAll("[data-er-tags]").forEach((x) => x.classList.toggle("is-hot", !!table && x.dataset.erTags.split(",").includes(table)));
  }
  function erTarget(e) {
    const tb = e.target.closest?.("[data-er-t]");
    if (tb) return erHighlight([tb.dataset.erT], tb.dataset.erT);
    const node = e.target.closest?.("[data-er-tags]");
    if (node) return erHighlight(node.dataset.erTags.split(","));
    erHighlight();
  }
  root.addEventListener("mouseover", erTarget);
  root.addEventListener("focusin", erTarget);
  root.addEventListener("mouseleave", () => erHighlight());
  root.addEventListener("focusout", (e) => { if (!root.contains(e.relatedTarget)) erHighlight(); });

  /* ---------- Construcción del logo (campo construction) ---------- */
  function buildHtml(c, num) {
    const [W, H] = c.viewBox;
    const m = c.module || H / 12;
    const P = 64; // margen alrededor del dibujo para las cotas
    const PR = P + 28; // a la derecha, algo más para el rótulo del eje
    const axis = c.axis ?? H / 2;
    const ratio = (W / H).toFixed(2).replace(".", App.lang === "es" ? "," : ".");
    // Retícula: cada línea se dibuja con un pequeño retardo (--d)
    let d = 0;
    const grid = [];
    for (let x = Math.ceil(-P / m) * m; x <= W + PR; x += m) grid.push(`<line x1="${x}" y1="${-P}" x2="${x}" y2="${H + P}" pathLength="1" style="--d:${d++}"/>`);
    for (let y = Math.ceil(-P / m) * m; y <= H + P; y += m) grid.push(`<line x1="${-P}" y1="${y}" x2="${W + PR}" y2="${y}" pathLength="1" style="--d:${d++}"/>`);
    // Guía del ángulo: desde el vértice `angleAt` (sobre el eje) sube por el borde del trazo
    const rad = ((c.angle || 0) * Math.PI) / 180;
    const [ax, ay] = c.angleAt || [0, axis];
    const len = (ay + 24) / Math.sin(rad || 1);
    const r = 30;
    const f = (n) => n.toFixed(1);
    const angle = c.angle ? `
      <line class="pj-build__guide" x1="${ax}" y1="${ay}" x2="${f(ax - Math.cos(rad) * len)}" y2="${f(ay - Math.sin(rad) * len)}"/>
      <path class="pj-build__guide pj-build__guide--solid" d="M${ax - r} ${ay}A${r} ${r} 0 0 1 ${f(ax - r * Math.cos(rad))} ${f(ay - r * Math.sin(rad))}"/>
      <text x="${ax - r - 6}" y="${ay - 8}" text-anchor="end">${c.angle}°</text>` : "";
    const steps = ["step1", "step2", "step3"].map((k) => `<li>${esc(t(`pj.build.${k}`))}</li>`).join("");
    return `
      <section class="pj-sec" aria-label="${esc(t("pj.build.title"))}" data-reveal>
        ${sectionHead(num, t("pj.build.sub"), t("pj.build.title"))}
        <div class="pj-build" data-build>
          <figure class="pj-build__stage">
            <svg viewBox="${-P} ${-P} ${W + P + PR} ${H + 2 * P}" role="img" aria-label="${esc(tr(c.title))} · ${esc(t("pj.build.desc"))}">
              <g class="pj-build__grid">${grid.join("")}</g>
              <g class="pj-build__guides">
                <rect class="pj-build__guide" x="0" y="0" width="${W}" height="${H}"/>
                <line class="pj-build__guide" x1="${-P + 10}" y1="${axis}" x2="${W + PR - 10}" y2="${axis}"/>
                ${angle}
              </g>
              <g class="pj-build__dims">
                <path d="M0 ${-34}H${W}M0 ${-40}v12M${W} ${-40}v12M${-34} 0V${H}M${-40} 0h12M${-40} ${H}h12"/>
                <text x="${W / 2}" y="${-44}" text-anchor="middle">W = ${ratio} H</text>
                <text x="${-44}" y="${H / 4}" text-anchor="middle" transform="rotate(-90 ${-44} ${H / 4})">H</text>
                <text x="${W + 8}" y="${axis - 8}">${esc(t("pj.build.axis"))}</text>
                <text x="${W + PR - 10}" y="${H + P - 12}" text-anchor="end">${esc(t("pj.build.grid", { n: Math.round(H / m) }))}</text>
              </g>
              <g class="pj-build__shapes">${c.paths.map((p, i) => `<path d="${esc(p)}"${c.ink?.includes(i) ? ' class="is-ink"' : ""} pathLength="1" style="--i:${i}"/>`).join("")}</g>
            </svg>
            <figcaption class="mono"><span>${esc(tr(c.title))}</span><span>#0057FF</span></figcaption>
          </figure>
          <div class="pj-build__side">
            <ol class="pj-build__steps">${steps}</ol>
            <button type="button" class="btn btn--ghost" data-build-replay><span aria-hidden="true">↻</span> ${esc(t("pj.build.replay"))}</button>
          </div>
        </div>
      </section>`;
  }

  // Se dispara al entrar en pantalla; con movimiento reducido, estado final directamente
  const construction = {
    io: null,
    init() {
      const el = root.querySelector("[data-build]");
      this.io?.disconnect();
      if (!el) return;
      if (App.reduceMotion || !("IntersectionObserver" in window)) return el.classList.add("is-static", "is-run");
      this.io = new IntersectionObserver((entries) => {
        if (!entries.some((en) => en.isIntersecting)) return;
        el.classList.add("is-run");
        this.io.disconnect();
      }, { threshold: 0.4 });
      this.io.observe(el);
    },
    replay() {
      const el = root.querySelector("[data-build]");
      if (!el) return;
      el.classList.remove("is-run");
      void el.offsetWidth; // fuerza el reinicio de las transiciones
      el.classList.add("is-run");
    },
  };

  /* ---------- Antes / después: comparador deslizable ---------- */
  // Solo si las dos imágenes tienen proporciones parecidas (hasta un 15 % de
  // diferencia). Si no, se queda la vista de dos figuras con flecha.
  const CMP_TOLERANCE = 1.15;
  const cmpFit = new Map(); // "antes|después" → proporción de la imagen "después" o false
  const cmpKey = (p) => `${p.before.src}|${p.after.src}`;
  const capHtml = (s, key) => `
    <span class="mono">[${pad(key === "before" ? 1 : 2)}] ${esc(t(`project.${key}`))}</span>
    <strong>${esc(tr(s.title))}</strong>
    <span class="mono">${esc(tr(s.caption))}</span>`;
  const shot = (s, key) => `
    <figure class="pj-ba__shot">
      <img src="${esc(s.src)}" alt="${esc(tr(s.title))}" loading="lazy">
      <figcaption>${capHtml(s, key)}</figcaption>
    </figure>`;

  function compareBody(p) {
    const delta = p.delta?.length ? `<ul class="pj-ba__delta mono">${p.delta.map((d) => `<li>${esc(tr(d))}</li>`).join("")}</ul>` : "";
    const ar = cmpFit.get(cmpKey(p));
    if (!ar) return `${shot(p.before, "before")}<span class="pj-ba__arrow mono" aria-hidden="true">→</span>${shot(p.after, "after")}${delta}`;
    const v = compare.pos;
    return `
      <div class="pj-cmp" data-cmp style="--pos:${v}%;aspect-ratio:${ar}">
        <img class="pj-cmp__img" src="${esc(p.after.src)}" alt="${esc(tr(p.after.title))}" draggable="false">
        <div class="pj-cmp__before"><img class="pj-cmp__img" src="${esc(p.before.src)}" alt="${esc(tr(p.before.title))}" draggable="false"></div>
        <span class="pj-cmp__tag mono" aria-hidden="true">[01] ${esc(t("project.before"))}</span>
        <span class="pj-cmp__tag pj-cmp__tag--after mono" aria-hidden="true">[02] ${esc(t("project.after"))}</span>
        <div class="pj-cmp__handle" role="slider" tabindex="0" aria-label="${esc(t("pj.cmp.label"))}" title="${esc(t("pj.cmp.hint"))}"
          aria-valuemin="0" aria-valuemax="100" aria-valuenow="${v}" aria-valuetext="${v} %">
          <span class="pj-cmp__grip mono" aria-hidden="true">◂▸</span>
        </div>
      </div>
      <div class="pj-cmp__caps">
        <p class="pj-cmp__cap">${capHtml(p.before, "before")}</p>
        <p class="pj-cmp__cap pj-cmp__cap--after">${capHtml(p.after, "after")}</p>
      </div>
      ${delta}`;
  }

  const compare = {
    pos: 50,
    // Mide las dos imágenes (una vez por pareja) y, si encajan, cambia a comparador
    check(p) {
      const key = cmpKey(p);
      if (cmpFit.has(key)) return this.bind();
      const ratio = (src) => new Promise((ok) => {
        const im = new Image();
        im.onload = () => ok(im.naturalWidth / im.naturalHeight);
        im.onerror = () => ok(0);
        im.src = src;
      });
      Promise.all([ratio(p.before.src), ratio(p.after.src)]).then(([a, b]) => {
        const fit = a && b && Math.max(a, b) / Math.min(a, b) <= CMP_TOLERANCE;
        cmpFit.set(key, fit ? Number(b.toFixed(4)) : false);
        const box = root.querySelector("[data-ba]");
        if (!fit || !box) return;
        box.classList.add("pj-ba--cmp");
        box.innerHTML = compareBody(p);
        this.bind();
      });
    },
    bind() {
      const el = root.querySelector("[data-cmp]");
      if (!el) return;
      el.closest("[data-ba]").classList.add("pj-ba--cmp");
      const handle = el.querySelector('[role="slider"]');
      const set = (v) => {
        v = Math.round(Math.min(100, Math.max(0, v)));
        this.pos = v;
        el.style.setProperty("--pos", `${v}%`);
        handle.setAttribute("aria-valuenow", v);
        handle.setAttribute("aria-valuetext", `${v} %`);
      };
      const fromX = (e) => {
        const r = el.getBoundingClientRect();
        set(((e.clientX - r.left) / r.width) * 100);
      };
      let drag = false;
      el.addEventListener("pointerdown", (e) => {
        if (e.button) return;
        drag = true;
        el.setPointerCapture(e.pointerId);
        el.classList.add("is-drag");
        fromX(e);
        handle.focus({ preventScroll: true });
      });
      el.addEventListener("pointermove", (e) => drag && fromX(e));
      const stop = () => { drag = false; el.classList.remove("is-drag"); };
      el.addEventListener("pointerup", stop);
      el.addEventListener("pointercancel", stop);
      handle.addEventListener("keydown", (e) => {
        const step = e.shiftKey ? 10 : 2;
        const keys = { ArrowLeft: -step, ArrowDown: -step, ArrowRight: step, ArrowUp: step, PageDown: -10, PageUp: 10 };
        if (e.key in keys) set(this.pos + keys[e.key]);
        else if (e.key === "Home") set(0);
        else if (e.key === "End") set(100);
        else return;
        e.preventDefault();
      });
    },
  };

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
    if (e.target.closest("[data-build-replay]")) return construction.replay();
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
