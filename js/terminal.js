/* ==========================================================================
   Terminal del monitor (home). Se activa con el botón ">_ escribir" de la
   barra de la pantalla o con un clic en la pantalla, y acepta comandos reales
   que leen data/profile.js y data/projects.js. Al activarla se para la
   animación del hero (evento "terminal:start", lo escucha js/sections.js).
   ========================================================================== */
(function () {
  const { t, tr, esc } = App;
  const P = window.PROFILE;
  const $ = (sel, root = document) => root.querySelector(sel);

  const bar = $("[data-term-bar]");
  const body = $(".screen-body");
  const text = $(".screen-text");
  if (!bar || !body || !text) return;

  const ids = () => App.sortedProjects().map((p) => p.id);
  const history = [];
  let histPos = 0;
  let active = false;

  /* ---------- Piezas: botón, registro y línea de prompt ---------- */
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "term-toggle";
  btn.setAttribute("aria-pressed", "false");
  btn.innerHTML = `<span aria-hidden="true">&gt;_</span> <span data-i18n="term.open">${esc(t("term.open"))}</span>`;
  bar.append(btn);

  const log = document.createElement("div");
  log.className = "term-log";
  log.setAttribute("role", "log");
  log.setAttribute("aria-live", "polite");

  const form = document.createElement("form");
  form.className = "term term-prompt";
  form.hidden = true;
  form.setAttribute("autocomplete", "off");
  form.innerHTML = `
    <label class="sr-only" for="term-input" data-i18n="term.label">${esc(t("term.label"))}</label>
    <span class="term__prompt" aria-hidden="true">$</span>
    <input class="term-input" id="term-input" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="go" aria-describedby="term-hint">
    <span class="sr-only" id="term-hint" data-i18n="term.hint">${esc(t("term.hint"))}</span>`;
  text.append(log, form);
  const input = $("input", form);

  /* ---------- Salida ---------- */
  const scrollEnd = () => { text.scrollTop = text.scrollHeight; };

  // Cada línea es texto plano o { html } (ya escapado) para enlaces
  function print(lines, cls = "term-line--out") {
    const block = document.createElement("div");
    block.className = "term-block";
    [].concat(lines).forEach((line) => {
      const p = document.createElement("p");
      p.className = `term-line ${cls}`;
      if (line && line.html != null) p.innerHTML = line.html;
      else p.textContent = line;
      block.append(p);
    });
    log.append(block);
    scrollEnd();
  }
  const echo = (cmd) => {
    const p = document.createElement("p");
    p.className = "term-line";
    p.innerHTML = `<span class="term__prompt">$</span> ${esc(cmd)}`;
    log.append(p);
  };
  const link = (href, label, ext) => ({ html: `<a href="${esc(href)}"${ext ? ` target="_blank" rel="noopener"` : ""}>${esc(label)}</a>` });
  // Columnas alineadas con espacios (la fuente es monoespaciada)
  const cols = (rows) => {
    const w = Math.max(...rows.map((r) => r[0].length)) + 2;
    return rows.map(([a, b]) => a.padEnd(w) + b);
  };

  /* ---------- Comandos ---------- */
  const files = () => (App.lang === "en" ? ["about", "role.txt"] : ["sobre-mi", "role.txt"]);
  const commands = {
    help() {
      // Los nombres en inglés también funcionan siempre (alias)
      const en = App.lang === "en";
      print(cols([
        ["help", t("term.help.help")],
        [en ? "ls projects" : "ls proyectos", t("term.help.ls")],
        ["open <id>", t("term.help.open")],
        [en ? "cat about" : "cat sobre-mi", t("term.help.cat")],
        ["skills", t("term.help.skills")],
        [en ? "contact" : "contacto", t("term.help.contact")],
        ["cv", t("term.help.cv")],
        ["theme", t("term.help.theme")],
        ["lang es|en", t("term.help.lang")],
        ["clear", t("term.help.clear")],
        ["exit", t("term.help.exit")],
      ]).concat(t("term.help.tip")));
    },
    ls(arg) {
      if (arg && !["proyectos", "projects", "proyectos/", "projects/"].includes(arg)) {
        return print(t("term.ls.missing", { x: arg }), "term-line--err");
      }
      print(cols(App.sortedProjects().map((p) => [p.id, tr(p.title)])));
    },
    open(arg) {
      if (!arg) return print(t("term.open.usage"), "term-line--err");
      arg = arg.toLowerCase();
      if (!ids().includes(arg)) return print(t("term.open.missing", { x: arg }), "term-line--err");
      print(t("term.open.go", { x: arg }));
      location.href = `project.html?id=${encodeURIComponent(arg)}`;
    },
    cat(arg) {
      if (arg === "sobre-mi" || arg === "about") {
        // Resumen breve: titular y la primera frase del texto de "Sobre mí"
        const first = tr(P.about.body).split(/(?<=[.!?])\s/)[0];
        return print([tr(P.about.lead), `${t("hero.spec.base")}: ${tr(P.location)}`, first, link("about.html", t("term.cat.more"))]);
      }
      if (arg === "role.txt") return print(tr(P.titles).join(" · "));
      if (!arg) return print(files().join("  "));
      print(t("term.cat.missing", { x: arg }), "term-line--err");
    },
    skills() {
      print(P.skills.map((s) => s.name).join(" · "));
    },
    contacto() {
      const bare = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
      const items = [["email", P.email, `mailto:${P.email}`, false]];
      if (P.linkedin) items.push(["linkedin", bare(P.linkedin), P.linkedin, true]);
      if (P.github) items.push(["github", bare(P.github), P.github, true]);
      const lines = cols(items.map(([k, v]) => [k, v]));
      print(items.map(([, , href, ext], i) => link(href, lines[i], ext)));
    },
    cv() {
      const href = tr(P.cv);
      window.open(href, "_blank", "noopener");
      print([t("term.cv.open"), link(href, href.split("/").pop(), true)]);
    },
    theme() {
      // Mismo mecanismo que la cabecera: se pulsa su botón (aplica y recuerda el tema)
      $("[data-theme-toggle]").click();
      const light = document.documentElement.dataset.theme === "light";
      print(t("term.theme.set", { x: t(light ? "term.theme.light" : "term.theme.dark") }));
    },
    lang(arg) {
      if (arg !== "es" && arg !== "en") return print(t("term.lang.usage"), "term-line--err");
      App.setLang(arg);
      print(t("term.lang.set", { x: arg }));
    },
    whoami() {
      print($("[data-whoami]").textContent);
    },
    clear() {
      log.innerHTML = "";
      // También desaparece la animación inicial: la pantalla queda limpia
      [...text.children].forEach((el) => { if (el !== log && el !== form) el.hidden = true; });
    },
    exit() { deactivate(); },
  };
  // Alias en inglés
  commands.contact = commands.contacto;

  function run(raw) {
    const line = raw.trim();
    echo(line);
    if (!line) return scrollEnd();
    history.push(line);
    histPos = history.length;
    const [cmd, ...rest] = line.split(/\s+/);
    const fn = Object.prototype.hasOwnProperty.call(commands, cmd.toLowerCase()) && commands[cmd.toLowerCase()];
    if (fn) fn(rest.join(" "));
    else print(t("term.notFound", { x: cmd }), "term-line--err");
    scrollEnd();
  }

  /* ---------- Autocompletado con Tab ---------- */
  const names = ["help", "ls", "open", "cat", "skills", "contacto", "contact", "cv", "theme", "lang", "clear", "exit", "whoami"];
  const argsFor = { open: ids, ls: () => [App.lang === "en" ? "projects" : "proyectos"], cat: files, lang: () => ["es", "en"] };

  function complete() {
    const val = input.value.replace(/^\s+/, "");
    const space = val.indexOf(" ");
    const [pool, word, prefix] = space < 0
      ? [names, val, ""]
      : [(argsFor[val.slice(0, space).toLowerCase()] || (() => []))(), val.slice(space + 1).trim(), val.slice(0, space) + " "];
    const hits = pool.filter((n) => n.startsWith(word));
    if (!hits.length) return;
    if (hits.length === 1) {
      input.value = prefix + hits[0] + (space < 0 && argsFor[hits[0]] ? " " : "");
      return;
    }
    // Varias opciones: se completa el prefijo común y se listan
    let common = hits[0];
    hits.forEach((h) => { while (!h.startsWith(common)) common = common.slice(0, -1); });
    input.value = prefix + common;
    echo(val);
    print(hits.join("  "));
  }

  /* ---------- Activar / salir ---------- */
  function activate() {
    if (!active) {
      active = true;
      document.dispatchEvent(new CustomEvent("terminal:start"));
      body.removeAttribute("aria-hidden"); // la pantalla deja de ser decorativa
      body.classList.add("is-term");
      btn.setAttribute("aria-pressed", "true");
      form.hidden = false;
      if (!log.children.length) print(t("term.welcome"));
    }
    input.focus({ preventScroll: true });
    scrollEnd();
  }
  function deactivate() {
    active = false;
    form.hidden = true;
    btn.setAttribute("aria-pressed", "false");
    btn.focus();
  }

  btn.addEventListener("click", () => (active ? deactivate() : activate()));
  body.addEventListener("click", (e) => {
    // Un clic en un enlace del registro o seleccionando texto no roba el foco
    if (e.target.closest("a") || String(getSelection())) return;
    activate();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = input.value;
    input.value = "";
    run(val);
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { e.preventDefault(); deactivate(); }
    // Con la línea vacía, Tab mueve el foco como siempre (no atrapa al teclado)
    else if (e.key === "Tab" && !e.shiftKey && input.value.trim()) { e.preventDefault(); complete(); }
    else if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      histPos = Math.max(0, histPos - 1);
      input.value = history[histPos];
    } else if (e.key === "ArrowDown" && history.length) {
      e.preventDefault();
      histPos = Math.min(history.length, histPos + 1);
      input.value = history[histPos] ?? "";
    }
  });
  // Con el teclado virtual del móvil, la ventana cambia de alto: se mantiene visible la última línea
  addEventListener("resize", () => { if (active) scrollEnd(); }, { passive: true });
})();
