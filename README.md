# 303/AIDEN — Portfolio

Portfolio de desarrollador web y diseñador gráfico con estilo cyber/tech.
HTML, CSS y JavaScript puros: **sin frameworks ni build**.
Publicado con GitHub Pages en **https://cybr303.github.io**.

## Páginas

| Archivo           | Contenido                                           |
| ----------------- | --------------------------------------------------- |
| `index.html`      | Home: monitor, carrusel de proyectos y contacto     |
| `about.html`      | Sobre mí → Mi proceso → Skills → Experiencia y estudios → Cosas que me gustan |
| `project.html`    | Ficha de cada proyecto (`project.html?id=<id>`)     |

La identidad visual se inspira en AXON (Signal Blue `#0057FF`, IBM Plex Mono, tipografía
ancha, retícula y barras técnicas). Tema claro por defecto y oscuro con el botón de la cabecera. Títulos en Archivo (anchura variable); Syncopate solo en la marca.

La cabecera, el menú y el footer (contacto) son comunes y se generan desde `js/main.js`.

## Cómo editar cosas

Directamente en GitHub o en el ordenador y hacer `git push`. (el progreso se ve en la pestaña **Actions**).

> **Importante — caché del navegador:** los `.html` cargan el CSS y el JS con `?v=13`.
> Cuando cambies un archivo `.css` o `.js` (incluidos los de `data/`), sube ese número
> en los 3 `.html` (busca y reemplaza `?v=13` por `?v=14`). Si no, algunos visitantes
> pueden ver una mezcla de archivos nuevos y viejos durante un rato.

| Quiero cambiar…                                       | Dónde                                                        |
| ----------------------------------------------------- | ------------------------------------------------------------ |
| Nombre, email, LinkedIn, GitHub, textos de "Sobre mí" | `data/profile.js`                                            |
| Títulos que se escriben en el monitor                 | `data/profile.js` → `titles`                                 |
| Texto del post-it                                     | `data/profile.js` → `stickyNote`                             |
| Cosas que me gustan (fotos + texto del carrusel)      | `data/profile.js` → `hobbies` (fotos 4:5 en `img/hobbies/`)  |
| Pasos de "Mi proceso"                                 | `data/profile.js` → `process`                                |
| Etiquetas sobre la foto de "Sobre mí"                 | `data/profile.js` → `about.tags`                             |
| Color del post-it                                     | `css/style.css` → `--note` y `--note-text`                   |
| Skills, soft skills, experiencia, estudios, idiomas   | `data/profile.js`                                            |
| Proyectos y categorías del filtro                     | `data/projects.js` (o `node tools/new-project.mjs`)          |
| Textos fijos (menú, botones, footer…) en ES/EN        | `js/i18n.js`                                                 |
| Colores (tema oscuro y claro)                         | `css/style.css` → `:root` y `:root[data-theme="light"]`      |
| Velocidad del carrusel                                | `js/sections.js` → `SECONDS_PER_CARD` (más alto = más lento) |
| **Icono de la pestaña (favicon)**                     | Sustituye `img/battery.svg` (ver abajo)                      |
| Logo del monitor                                      | Sustituye `img/logo.svg`                                     |
| Foto de perfil                                        | Sube tu foto a `img/` y cambia `photo` en `data/profile.js`  |
| CV                                                    | Sube el PDF a `documentos/` con el nombre de `cv` en `data/profile.js` |

### Cambiar el favicon

- **Lo más fácil:** subir el icono en formato SVG con el mismo nombre, `img/battery.svg`.
- **Si es PNG u otro nombre:** subirlo a `img/` y cambia esta línea en los 3 archivos `.html`:
  ```html
  <link rel="icon" href="img/battery.svg?v=13" type="image/svg+xml">
  ```
  por, por ejemplo:
  ```html
  <link rel="icon" href="img/favicon.png" type="image/png">
  ```
- El navegador guarda el favicon en caché: si no ves el cambio, recarga con `Ctrl+F5`.

### Iconos de skills

Cada skill usa `img/icons/<icon>.svg`. Los iconos salen de https://simpleicons.org;
para que tengan el degradado de la web, copia el `<defs>…</defs>` y el `fill="url(#g)"`
de cualquiera de los que ya hay. Si una skill no tiene icono, se muestra su `abbr`.

## Añadir un proyecto nuevo

```bash
node tools/new-project.mjs
```

Te pregunta título, categorías, fecha, herramientas y enlaces, añade el proyecto
a `data/projects.js` y crea `img/projects/<id>/` con una portada provisional.
Después copia tus imágenes a esa carpeta, actualiza `cover` y `gallery` y completa
los textos en ES y EN. Sin Node, también puedes copiar un bloque de `data/projects.js`
a mano y cambiar los valores.

El proyecto aparece automáticamente en el carrusel (si hay pocos, se repiten hasta
llenarlo), en los filtros, en el contador de "Sobre mí" y en la navegación de las fichas.

## Datos que se actualizan solos

- Año del copyright: `© <copyrightStart>–<año actual>`.
- Años de experiencia: se calculan desde `careerStart`.
- Nº de proyectos y de herramientas.
- Duración de trabajos y estudios; con `end: null` muestra "Actualidad / Present".
- Idioma: se detecta el del navegador y se recuerda la elección (`?lang=en` lo fuerza).

## Verlo en local

Abre `index.html` con doble clic, o levanta un servidor en la carpeta:

```bash
npx http-server        # o: python3 -m http.server
```

## Pendiente de personalizar

- [ ] `data/profile.js`: LinkedIn, experiencia, estudios, idiomas y soft skills (ahora hay datos de ejemplo).
- [ ] `img/profile.svg` → tu foto.
- [ ] `documentos/AidenJimenez_CV.pdf` → tu CV.
- [ ] Proyecto "Diseño gráfico": sustituir por tus piezas reales.
- [ ] `hobbies` en `data/profile.js`: ahora son ejemplos.
