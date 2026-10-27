/* ==========================================================================
   Página "Marca": manual de identidad vivo.
   Todo lo que se muestra se lee del propio sitio: tokens de css/style.css
   (getComputedStyle), fuentes cargadas (document.fonts), medidas reales en
   el navegador y la entrada "axon" de data/projects.js.
   ========================================================================== */
(function () {
  const App = window.App;
  const root = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const project = (window.PROJECTS || []).find((p) => p.id === "axon");

  // Nombres de la paleta del manual AXON (y su Pantone, cuando el manual lo da)
  const AXON_NAMES = {
    "#0057FF": { name: "Signal Blue", pantone: "2728 C" },
    "#3380FF": { name: "Node Blue", pantone: "2727 C" },
    "#0A0A0F": { name: "Axon Black" },
    "#F2F2F8": { name: "Static White" },
    "#8899CC": { name: "Steel Freq", pantone: "2706 C" },
  };
  // Tokens de color sólidos de :root que se documentan (los rgb() con alfa se quedan fuera)
  const COLOR_TOKENS = ["--bg", "--bg-2", "--band", "--surface-solid", "--text", "--text-2", "--muted", "--accent", "--signal", "--on-signal"];

  const isLight = () => root.dataset.theme === "light";
  const css = (prop) => getComputedStyle(root).getPropertyValue(prop).trim();

  /* ---------- Color: valor real de cada token ---------- */
  // Un elemento de prueba resuelve var(--token) al color final que pinta el navegador
  const probe = document.createElement("span");
  probe.hidden = true;
  document.body.appendChild(probe);
  function resolveColor(token) {
    probe.style.color = "";
    probe.style.color = `var(${token})`;
    const nums = getComputedStyle(probe).color.match(/[\d.]+/g) || [0, 0, 0];
    const [r, g, b] = nums.map(Number);
    const hex = "#" + [r, g, b].map((n) => Math.round(n).toString(16).padStart(2, "0")).join("").toUpperCase();
    return { r, g, b, hex };
  }

  function renderSwatches() {
    const list = $("[data-bm-swatches]");
    if (!list) return;
    list.innerHTML = COLOR_TOKENS.map((token) => {
      const c = resolveColor(token);
      const axon = AXON_NAMES[c.hex];
      const role = App.t(`brand.color.role${token}`);
      return `
        <li>
          <button class="bm-swatch" type="button" data-copy="${c.hex}" style="--sw: var(${token})"
            aria-label="${App.esc(App.t("brand.color.copy", { hex: c.hex }))}${axon ? " · " + axon.name : ""}">
            <span class="bm-swatch__chip" aria-hidden="true"></span>
            <span class="bm-swatch__body">
              <strong class="bm-swatch__name">${axon ? axon.name : App.esc(role)}</strong>
              <span class="bm-swatch__role">${axon ? App.esc(role) : App.t("brand.color.web")}</span>
              <span class="bm-swatch__rows mono">
                <span><b>HEX</b> ${c.hex}</span>
                <span><b>RGB</b> ${c.r}·${c.g}·${c.b}</span>
                <span><b>CSS</b> ${token}</span>
                ${axon && axon.pantone ? `<span><b>PMS</b> ${axon.pantone}</span>` : ""}
              </span>
            </span>
          </button>
        </li>`;
    }).join("");
    const count = $("[data-bm-color-count]");
    if (count) count.textContent = App.t("brand.color.count", { n: COLOR_TOKENS.length });
  }

  // Clic en una muestra: copia el HEX y avisa con el toast del footer
  function initCopy() {
    const toast = $("[data-toast]");
    const say = (text) => {
      if (!toast) return;
      toast.textContent = text;
      toast.classList.add("is-visible");
      clearTimeout(toast._t);
      toast._t = setTimeout(() => toast.classList.remove("is-visible"), 1800);
    };
    document.addEventListener("click", async (e) => {
      const btn = e.target.closest("[data-copy]");
      if (!btn) return;
      const hex = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(hex);
      } catch (err) {
        // Respaldo para navegadores sin API de portapapeles
        const ta = document.createElement("textarea");
        ta.value = hex;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); } catch (e2) {}
        ta.remove();
      }
      say(App.t("brand.color.copied", { hex }));
    });
  }

  /* ---------- Ficha técnica de la portada ---------- */
  function countRootTokens() {
    // Variables declaradas en la regla :root de style.css
    for (const sheet of document.styleSheets) {
      let rules;
      try { rules = sheet.cssRules; } catch (e) { continue; }
      for (const rule of rules) {
        if (rule.selectorText === ":root") return [...rule.style].filter((p) => p.startsWith("--")).length;
      }
    }
    return 0;
  }
  function fontFamilies() {
    const fams = new Set();
    let faces = 0;
    document.fonts.forEach((f) => { fams.add(f.family.replace(/"/g, "")); faces++; });
    return { fams: [...fams], faces };
  }

  function renderSpec() {
    const spec = $("[data-bm-spec]");
    if (spec && project) {
      const fonts = fontFamilies();
      const rows = [
        [App.t("brand.spec.studio"), "AXON"],
        [App.t("brand.spec.manual"), `${App.formatYM(project.date)} · ${project.tools.join(" / ")}`],
        [App.t("brand.spec.tokens"), App.t("brand.spec.tokens.v", { n: countRootTokens() })],
        [App.t("brand.spec.fonts"), App.t("brand.spec.fonts.v", { n: fonts.fams.length, f: fonts.faces })],
        [App.t("brand.spec.theme"), App.t(isLight() ? "brand.theme.light" : "brand.theme.dark")],
      ];
      spec.innerHTML = rows.map(([k, v]) => `<div class="spec__row"><dt${k.startsWith("--") ? ' class="bm-token"' : ""}>${App.esc(k)}</dt><dd>${App.esc(v)}</dd></div>`).join("");
    }
    const fc = $("[data-bm-font-count]");
    if (fc) fc.textContent = App.t("brand.type.count", { n: fontFamilies().fams.length });
    const tn = $("[data-bm-theme-name]");
    if (tn) tn.textContent = App.t(isLight() ? "brand.theme.light" : "brand.theme.dark");

    // Ejemplo de .spec con los valores vivos de dos tokens
    const demo = $("[data-bm-spec-demo]");
    if (demo) {
      demo.innerHTML = [["--signal", resolveColor("--signal").hex], ["--accent", resolveColor("--accent").hex], ["--radius", css("--radius")]]
        .map(([k, v]) => `<div class="spec__row"><dt class="bm-token">${k}</dt><dd>${v}</dd></div>`).join("");
    }

    // Versión del logo que usa ahora el monitor de la home (tinta en claro, clara en oscuro)
    $$("[data-bm-version]").forEach((fig) => fig.classList.toggle("is-now", (fig.dataset.bmVersion === "light") === isLight()));
  }

  /* ---------- Páginas reales del manual (pie desde data/projects.js) ---------- */
  function renderRefs() {
    if (!project) return;
    $$("[data-bm-ref]").forEach((a) => {
      const src = a.dataset.bmRef;
      const item = project.gallery.find((g) => g.src === src);
      if (!item) return;
      const page = String(project.gallery.indexOf(item) + 2).padStart(2, "0");
      a.innerHTML = `
        <img src="${src}" alt="${App.esc(App.tr(item.caption))}" loading="lazy" width="1440" height="1018">
        <span class="bm-ref__cap mono"><span>${App.t("brand.ref")} · ${page}</span><span>${App.esc(App.tr(item.caption))} ↗</span></span>`;
    });
    const outro = $("[data-bm-outro]");
    if (outro) outro.textContent = App.t("brand.outro", { n: project.gallery.length + 1 });
  }

  /* ---------- Medidas: cotas del logo y retícula ---------- */
  const round = (n) => Math.round(n * 10) / 10;
  function measure() {
    const art = $(".bm-safe__art");
    if (art) {
      const w = art.getBoundingClientRect().width;
      $("[data-bm-safe-w]").textContent = `${Math.round(w)} px`;
      $("[data-bm-safe-h]").textContent = `${Math.round(w)} px`;
      $("[data-bm-safe-note]").textContent = App.t("brand.logo.safe.note", { x: round(w / 10) });
    }
    $$("[data-bm-measure]").forEach((el) => {
      el.textContent = `${Math.round(el.closest(".bm-min__art").getBoundingClientRect().width)} px`;
    });

    // Retícula: mismo cálculo que .bg-fx__cols (12 columnas; 4 por debajo de 720 px)
    const box = $(".bm-grid");
    if (!box) return;
    const cols = matchMedia("(max-width: 720px)").matches ? 4 : 12;
    const w = box.getBoundingClientRect().width;
    const list = $("[data-bm-grid]");
    if (list.children.length !== cols) {
      list.innerHTML = Array.from({ length: cols }, (_, i) => `<li><span>${String(i + 1).padStart(2, "0")}</span></li>`).join("");
    }
    $("[data-bm-grid-w]").textContent = `${Math.round(w)} px`;
    $("[data-bm-col-w]").textContent = `${round(w / cols)} px`;
    $("[data-bm-cols]").textContent = App.t("brand.grid.cols", { n: cols });
    const gutter = Math.round((document.documentElement.clientWidth - w) / 2);
    const rows = [
      ["--container", css("--container")],
      [App.t("brand.grid.cols.k"), `${cols} × ${round(w / cols)} px`],
      [App.t("brand.grid.gutter"), `${gutter} px`],
      ["--header-h", css("--header-h")],
      ["--border", css("--border")],
      ["--radius", css("--radius")],
    ];
    $("[data-bm-grid-spec]").innerHTML = rows.map(([k, v]) => `<div class="spec__row"><dt${k.startsWith("--") ? ' class="bm-token"' : ""}>${App.esc(k)}</dt><dd>${App.esc(v)}</dd></div>`).join("");
  }

  /* ---------- Tipografía: ejes de Archivo ---------- */
  function initAxis() {
    const sample = $("[data-bm-sample]");
    const wdth = $('[data-bm-axis="wdth"]');
    const wght = $('[data-bm-axis="wght"]');
    const code = $("[data-bm-css]");
    if (!sample || !wdth || !wght) return;
    const presets = $$("[data-bm-preset]");
    const apply = () => {
      sample.style.fontStretch = `${wdth.value}%`;
      sample.style.fontWeight = wght.value;
      $('[data-bm-out="wdth"]').textContent = `${wdth.value}%`;
      $('[data-bm-out="wght"]').textContent = wght.value;
      code.textContent = `font-family: var(--f-title); font-stretch: ${wdth.value}%; font-weight: ${wght.value};`;
      presets.forEach((b) => {
        const on = b.dataset.bmPreset === `${wdth.value},${wght.value}`;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", String(on));
      });
    };
    wdth.addEventListener("input", apply);
    wght.addEventListener("input", apply);
    presets.forEach((b) => b.addEventListener("click", () => {
      [wdth.value, wght.value] = b.dataset.bmPreset.split(",");
      apply();
    }));
    apply();
  }

  // Chips de ejemplo: se comportan como el filtro de proyectos (uno activo)
  function initChips() {
    const group = $("[data-bm-chips]");
    if (!group) return;
    group.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      $$(".chip", group).forEach((c) => {
        c.classList.toggle("is-active", c === chip);
        c.setAttribute("aria-pressed", String(c === chip));
      });
    });
  }

  /* ---------- Arranque ---------- */
  function renderAll() {
    renderSwatches();
    renderSpec();
    renderRefs();
    measure();
  }
  renderAll();
  initCopy();
  initAxis();
  initChips();

  // Cambio de tema: los valores se vuelven a leer de :root
  new MutationObserver(() => { renderSwatches(); renderSpec(); }).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  document.addEventListener("langchange", renderAll);
  let raf;
  addEventListener("resize", () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure); }, { passive: true });
  if (document.fonts) document.fonts.ready.then(() => { renderSpec(); measure(); });
  addEventListener("load", measure);
})();
