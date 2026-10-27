/* ==========================================================================
   Página 404 (404.html): muestra la ruta pedida y ajusta los enlaces internos.
   GitHub Pages la sirve en cualquier profundidad (/a/b/c), por eso la página
   usa <base href="/"> y aquí se corrigen los enlaces que solo llevan "#ancla".
   ========================================================================== */
(function () {
  const { t } = App;

  // Ruta pedida tal cual la ve el navegador (decodificada si se puede); textContent evita inyectar HTML
  let path = location.pathname;
  try { path = decodeURIComponent(path); } catch (e) {}
  document.querySelectorAll("[data-e404-path]").forEach((el) => { el.textContent = path; });

  // Con <base href="/"> un enlace "#main" iría a la home: se fija a la página actual
  const here = location.href.split("#")[0];
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    if (!a.hasAttribute("data-to-top")) a.href = here + a.getAttribute("href");
  });

  const setTitle = () => { document.title = `404 · ${t("e404.title")} · ${window.PROFILE.handle}`; };
  setTitle();
  document.addEventListener("langchange", setTitle);
})();
