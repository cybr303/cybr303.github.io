/* ==========================================================================
   CV imprimible ("Sobre mí"): rellena la cabecera y el pie que solo se ven
   al imprimir (css/print.css) y conecta el botón "Imprimir CV".
   Todos los datos salen de data/profile.js.
   ========================================================================== */
(function () {
  const { t, tr, esc } = App;
  const P = window.PROFILE;
  const $ = (sel) => document.querySelector(sel);
  if (!$("[data-print-name]")) return;

  // Dominio de la web sin protocolo (cybr303.github.io); en local se usa el del repo
  const site = location.hostname.endsWith("github.io") ? location.hostname : (P.repo || "").split("/").pop();
  const bare = (url) => String(url).replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  // Fecha de impresión en formato técnico AAAA-MM-DD (igual en los dos idiomas)
  const today = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  function render() {
    // Nombre en dos líneas, como en la home: la segunda en Signal Blue
    $("[data-print-name]").innerHTML = P.name.split(" ").map((w) => `<span>${esc(w)}</span>`).join("");
    $("[data-print-handle]").textContent = P.handle;
    $("[data-print-role]").textContent = tr(P.about.lead);
    $("[data-print-date]").textContent = today();

    const row = (key, value, href) => `
      <div class="spec__row"><dt>${esc(t(key))}</dt><dd>${href ? `<a href="${esc(href)}">${esc(value)}</a>` : esc(value)}</dd></div>`;
    $("[data-print-contact]").innerHTML = [
      row("print.email", P.email, `mailto:${P.email}`),
      P.github ? row("print.github", bare(P.github), P.github) : "",
      site ? row("print.web", site, `https://${site}`) : "",
      row("hero.spec.base", tr(P.location)),
      P.available ? row("hero.spec.status", t("hero.status")) : "",
    ].join("");

    // Pie técnico de cada hoja: lo pinta @page (css/print.css) a partir de esta variable
    const foot = `${P.handle} · ${site} · ${t("print.printed")} ${today()}`;
    document.documentElement.style.setProperty("--print-foot", JSON.stringify(foot));
  }

  // Antes de imprimir: fecha del día, títulos sin "descifrar" a medias y nombre de archivo para "Guardar como PDF"
  let title = document.title;
  addEventListener("beforeprint", () => {
    render();
    document.querySelectorAll("[data-scramble] [data-i18n]").forEach((el) => {
      cancelAnimationFrame(el._scr);
      el.textContent = t(el.dataset.i18n);
    });
    title = document.title;
    document.title = `${P.name.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "")}_CV`;
  });
  addEventListener("afterprint", () => { document.title = title; });

  $("[data-print-btn]")?.addEventListener("click", () => window.print());
  document.addEventListener("langchange", render);
  render();
})();
