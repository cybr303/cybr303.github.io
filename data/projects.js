/* ==========================================================================
   PROYECTOS — cada objeto del array es un proyecto.
   Se pintan solos en el carrusel de la home y en project.html?id=<id>.
   Para añadir uno nuevo: `node tools/new-project.mjs` (ver README) o copia
   un bloque y cambia los valores. Se ordenan por `date` (más reciente primero).

   categories → claves de window.PROJECT_CATEGORIES (filtros de la web)

   Campos opcionales de la ficha (si faltan, esa sección no aparece):
   headline  → título de la sección Contexto
   statement → frase corta que resume el problema
   system    → { title, label?, nodes: [{ title, text, tags? }], core? } (banda azul)
   schema    → { tables: [{ name, col (0–3), cols: ["id:pk", "user_id:fk", "email:uq", …] }],
                 relations: [[tablaPadre, "tablaHija.columnaFK", "1-N"]] } (diagrama de BD tras Sistema)
   construction → { title, viewBox: [w, h], module, axis, angle, angleAt: [x, y], paths: [d…] } (logo dibujándose)
   before / after → { src, title, caption } y delta: [cambios] (antes / después).
                 Si las dos imágenes tienen proporciones parecidas se muestran con un comparador deslizable.
   result    → frase de la sección Resultado
   ========================================================================== */
window.PROJECT_CATEGORIES = {
  web: { es: "Desarrollo web", en: "Web development" },
  ui: { es: "UI", en: "UI" },
  ux: { es: "UX", en: "UX" },
  graphic: { es: "Diseño gráfico", en: "Graphic design" },
  branding: { es: "Branding", en: "Branding" },
};

window.PROJECTS = [
  {
    "id": "fitpup-laravel",
    "date": "2025-06",
    "categories": ["web", "ui", "ux"],
    "title": { "es": "FitPup", "en": "FitPup" },
    "subtitle": { "es": "Plataforma web · versión Laravel", "en": "Web platform · Laravel version" },
    "summary": {
      "es": "Plataforma para dueños de perros que quieren entrenar en positivo: cursos con progreso, nutrición, enriquecimiento ambiental, comunidad y un plan premium.",
      "en": "A platform for dog owners who want to train with positive methods: courses with progress tracking, nutrition, enrichment, a community and a premium plan."
    },
    "cover": "img/projects/fitpup-laravel/cover.jpg",
    "gallery": [
      { "src": "img/projects/fitpup-laravel/02.jpg", "caption": { "es": "Métodos de entrenamiento", "en": "Training methods" } },
      { "src": "img/projects/fitpup-laravel/03.jpg", "caption": { "es": "Planes premium con Stripe", "en": "Premium plans with Stripe" } },
      { "src": "img/projects/fitpup-laravel/04.jpg", "caption": { "es": "Comunidad", "en": "Community" } },
      { "src": "img/projects/fitpup-laravel/05.jpg", "caption": { "es": "Versión móvil", "en": "Mobile version" } }
    ],
    "time": { "es": "4 semanas · may – jun 2025", "en": "4 weeks · May – Jun 2025" },
    "role": { "es": "Proyecto final de DAW · diseño y desarrollo full-stack en solitario", "en": "DAW final project · solo full-stack design & development" },
    "tools": ["Laravel 12", "PHP 8", "MySQL", "Blade", "Alpine.js", "Tailwind", "Stripe", "Docker", "Render"],
    "goal": {
      "es": "La información sobre entrenamiento en positivo y enriquecimiento está dispersa entre vídeos, foros y blogs. FitPup la reúne en un solo sitio y te deja seguir tu progreso en cada curso. Partí de mi prototipo estático y lo convertí en una aplicación Laravel con cuentas verificadas por email, perfiles de perro, cursos con seguimiento, guías de nutrición y suplementos, actividades de enriquecimiento y una comunidad con publicaciones y comentarios, desplegada con Docker en Render.",
      "en": "Information on positive training and enrichment is scattered across videos, forums and blogs. FitPup brings it together and lets you track your progress in each course. I took my static prototype and turned it into a Laravel app with email-verified accounts, dog profiles, courses with progress tracking, nutrition and supplement guides, enrichment activities and a community with posts and comments, deployed with Docker on Render."
    },
    "highlights": [
      { "es": "Modelo de datos de 11 entidades (perros, cursos, progreso, nutrición, comunidad, suscripciones) con migraciones y seeders", "en": "11-entity data model (dogs, courses, progress, nutrition, community, subscriptions) with migrations and seeders" },
      { "es": "Registro con verificación por email, recuperación de contraseña y rutas protegidas", "en": "Sign-up with email verification, password recovery and protected routes" },
      { "es": "Seguimiento del progreso del usuario en cada curso", "en": "Per-user progress tracking for each course" },
      { "es": "Checkout de suscripción con Stripe en 3 niveles", "en": "Three-tier subscription checkout with Stripe" },
      { "es": "Despliegue con Docker en Render", "en": "Deployed with Docker on Render" }
    ],
    "headline": { "es": "Del prototipo a la plataforma", "en": "From prototype to platform" },
    "statement": { "es": "La información sobre entrenamiento en positivo está dispersa entre vídeos, foros y blogs. FitPup la reúne y te deja seguir tu progreso.", "en": "Information on positive training is scattered across videos, forums and blogs. FitPup brings it together and lets you track your progress." },
    "system": {
      "title": { "es": "La arquitectura", "en": "The architecture" },
      "label": { "es": "Modelo de datos · migraciones y seeders", "en": "Data model · migrations and seeders" },
      "core": {
        "title": { "es": "Laravel 12", "en": "Laravel 12" },
        "text": { "es": "Blade y Alpine.js en el front, MySQL detrás, empaquetado en Docker.", "en": "Blade and Alpine.js on the front end, MySQL behind it, packaged with Docker." }
      },
      "nodes": [
        {
          "title": { "es": "Cuentas", "en": "Accounts" },
          "text": { "es": "Registro, verificación por email y recuperación de contraseña.", "en": "Sign-up, email verification and password recovery." },
          "tags": ["users"]
        },
        {
          "title": { "es": "Perros", "en": "Dogs" },
          "text": { "es": "Cada usuario crea los perfiles de sus perros.", "en": "Each user creates profiles for their dogs." },
          "tags": ["dogs"]
        },
        {
          "title": { "es": "Cursos", "en": "Courses" },
          "text": { "es": "Entrenamientos con progreso guardado.", "en": "Training courses with saved progress." },
          "tags": ["trainings", "training_progress", "progress_tracking"]
        },
        {
          "title": { "es": "Nutrición y enriquecimiento", "en": "Nutrition & enrichment" },
          "text": { "es": "Guías, suplementos, planes y actividades.", "en": "Guides, supplements, plans and activities." },
          "tags": ["nutrition", "nutrition_guides", "supplements", "user_nutrition_plans", "enriquecimiento"]
        },
        {
          "title": { "es": "Comunidad", "en": "Community" },
          "text": { "es": "Publicaciones y comentarios.", "en": "Posts and comments." },
          "tags": ["community", "comment"]
        },
        {
          "title": { "es": "Suscripciones", "en": "Subscriptions" },
          "text": { "es": "Tres planes con checkout de Stripe.", "en": "Three plans with Stripe checkout." },
          "tags": ["plans", "user_subscriptions", "payment"]
        }
      ]
    },
    "schema": {
      "tables": [
        { "name": "users", "col": 1, "cols": ["id:pk", "nombre", "email:uq", "email_verified_at", "stripe_customer_id", "password", "foto_perfil", "fecha_registro"] },
        { "name": "dogs", "col": 2, "cols": ["id:pk", "usuario_id:fk", "nombre", "raza", "nivel_entrenamiento"] },
        { "name": "training_progress", "col": 2, "cols": ["id:pk", "usuario_id:fk", "perro_id:fk", "entrenamiento_id:fk", "fecha_completado", "notas"] },
        { "name": "progress_tracking", "col": 2, "cols": ["id:pk", "user_id:fk", "training_id:fk", "progress", "current_step", "completed"] },
        { "name": "user_nutrition_plans", "col": 2, "cols": ["id:pk", "user_id:fk", "dog_id:fk", "activity_level", "diet_preference", "status"] },
        { "name": "trainings", "col": 3, "cols": ["id:pk", "titulo", "dificultad", "premium", "pasos", "video_url"] },
        { "name": "nutrition_guides", "col": 3, "cols": ["id:pk", "title", "category", "difficulty", "premium"] },
        { "name": "supplements", "col": 3, "cols": ["id:pk", "name", "category", "dosage", "benefits"] },
        { "name": "nutrition", "col": 1, "cols": ["id:pk", "titulo", "tipo", "ingredientes", "calorias_por_porcion"] },
        { "name": "enriquecimiento", "col": 1, "cols": ["id:pk", "nombre_actividad", "tipo", "nivel_energia", "pasos", "imagen"] },
        { "name": "community", "col": 0, "cols": ["id:pk", "usuario_id:fk", "titulo", "contenido", "categoria"] },
        { "name": "comment", "col": 0, "cols": ["id:pk", "post_id:fk", "usuario_id:fk", "contenido"] },
        { "name": "plans", "col": 0, "cols": ["id:pk", "tipo", "precio", "stripe_price_id"] },
        { "name": "user_subscriptions", "col": 0, "cols": ["id:pk", "user_id:fk", "plan_id:fk", "fecha_inicio", "fecha_vencimiento", "estado"] },
        { "name": "payment", "col": 0, "cols": ["id:pk", "usuario_id:fk", "suscripcion_id:fk", "monto", "metodo_pago"] }
      ],
      "relations": [
        ["users", "dogs.usuario_id", "1-N"],
        ["users", "community.usuario_id", "1-N"],
        ["users", "comment.usuario_id", "1-N"],
        ["community", "comment.post_id", "1-N"],
        ["users", "training_progress.usuario_id", "1-N"],
        ["dogs", "training_progress.perro_id", "1-N"],
        ["trainings", "training_progress.entrenamiento_id", "1-N"],
        ["users", "progress_tracking.user_id", "1-N"],
        ["trainings", "progress_tracking.training_id", "1-N"],
        ["users", "user_nutrition_plans.user_id", "1-N"],
        ["dogs", "user_nutrition_plans.dog_id", "1-N"],
        ["users", "user_subscriptions.user_id", "1-N"],
        ["plans", "user_subscriptions.plan_id", "1-N"],
        ["users", "payment.usuario_id", "1-N"]
      ]
    },
    "before": {
      "src": "img/projects/fitpup-static/cover.jpg",
      "title": { "es": "FitPup v1", "en": "FitPup v1" },
      "caption": { "es": "Prototipo estático · HTML, CSS y Bootstrap", "en": "Static prototype · HTML, CSS & Bootstrap" }
    },
    "after": {
      "src": "img/projects/fitpup-laravel/cover.jpg",
      "title": { "es": "FitPup Laravel", "en": "FitPup Laravel" },
      "caption": { "es": "Aplicación con base de datos, desplegada", "en": "App with a database, deployed" }
    },
    "delta": [
      { "es": "Cuentas y verificación", "en": "Accounts and verification" },
      { "es": "Perfiles de perro", "en": "Dog profiles" },
      { "es": "Progreso por curso", "en": "Progress per course" },
      { "es": "Comunidad", "en": "Community" },
      { "es": "Pagos con Stripe", "en": "Stripe payments" },
      { "es": "Docker + Render", "en": "Docker + Render" }
    ],
    "result": { "es": "Misma idea, ahora con datos reales.", "en": "Same idea, now with real data." },
    "links": { "live": "https://fitpup.onrender.com", "repo": "https://github.com/cybr303/FitPup" }
  },
  {
    "id": "fitpup-static",
    "date": "2025-04",
    "categories": ["web", "ui"],
    "title": { "es": "FitPup v1", "en": "FitPup v1" },
    "subtitle": { "es": "Prototipo · HTML, CSS y Bootstrap", "en": "Prototype · HTML, CSS & Bootstrap" },
    "summary": {
      "es": "Primera versión de FitPup: landing y páginas de producto maquetadas a mano para validar la idea y la identidad visual.",
      "en": "First version of FitPup: hand-coded landing and product pages to validate the idea and the visual identity."
    },
    "cover": "img/projects/fitpup-static/cover.jpg",
    "gallery": [
      { "src": "img/projects/fitpup-static/02.jpg", "caption": { "es": "Página premium", "en": "Premium page" } },
      { "src": "img/projects/fitpup-static/03.jpg", "caption": { "es": "Beneficios premium", "en": "Premium benefits" } }
    ],
    "time": { "es": "2 semanas", "en": "2 weeks" },
    "role": { "es": "Diseño UI y maquetación", "en": "UI design & front-end" },
    "tools": ["HTML5", "CSS3", "Bootstrap 5", "JavaScript", "Figma"],
    "goal": {
      "es": "El objetivo era definir la estructura de la plataforma y su identidad (paleta verde oliva, tipografía y tono) con un prototipo navegable y responsive antes de pasar al back-end.",
      "en": "The goal was to define the platform structure and its identity (olive green palette, typography and tone) with a clickable, responsive prototype before moving on to the back-end."
    },
    "highlights": [
      { "es": "Sistema de color con variables CSS", "en": "Colour system with CSS custom properties" },
      { "es": "Diseño responsive con Bootstrap", "en": "Responsive layout with Bootstrap" }
    ],
    "links": {}
  },
  {
    "id": "axon",
    "date": "2026-04",
    "categories": ["graphic", "branding"],
    "title": { "es": "AXON", "en": "AXON" },
    "subtitle": { "es": "Identidad y manual de marca de mi estudio · práctica de diseño", "en": "Identity and brand guidelines for my studio · design coursework" },
    "summary": {
      "es": "La identidad de AXON, mi estudio de diseño y desarrollo web: del logotipo al manual de identidad corporativa completo, con normas de uso, color, tipografía y aplicaciones físicas y digitales. Es la identidad de este portfolio.",
      "en": "The identity of AXON, my design and web development studio: from the logo to a complete brand guidelines manual, with usage rules, colour, typography and print and digital applications. It is the identity of this portfolio."
    },
    "cover": "img/projects/axon/cover.jpg",
    "gallery": [
      { "src": "img/projects/axon/02.jpg", "caption": { "es": "Portada del manual", "en": "Manual cover" } },
      { "src": "img/projects/axon/03.jpg", "caption": { "es": "Logotipo e isotipo", "en": "Logo and brand mark" } },
      { "src": "img/projects/axon/04.jpg", "caption": { "es": "Construcción, retícula y tamaños mínimos", "en": "Construction, grid and minimum sizes" } },
      { "src": "img/projects/axon/05.jpg", "caption": { "es": "Versiones correctas", "en": "Correct versions" } },
      { "src": "img/projects/axon/06.jpg", "caption": { "es": "Usos incorrectos", "en": "Incorrect uses" } },
      { "src": "img/projects/axon/07.jpg", "caption": { "es": "Colores corporativos", "en": "Brand colours" } },
      { "src": "img/projects/axon/08.jpg", "caption": { "es": "Tipografía corporativa: IBM Plex Mono", "en": "Brand typeface: IBM Plex Mono" } },
      { "src": "img/projects/axon/09.jpg", "caption": { "es": "Patrón gráfico y texturas", "en": "Graphic pattern and textures" } },
      { "src": "img/projects/axon/10.jpg", "caption": { "es": "Tarjeta de visita", "en": "Business card" } },
      { "src": "img/projects/axon/11.jpg", "caption": { "es": "Tarjeta de identidad", "en": "ID badge" } },
      { "src": "img/projects/axon/12.jpg", "caption": { "es": "Papel de carta y propuesta", "en": "Letterhead and proposal" } },
      { "src": "img/projects/axon/13.jpg", "caption": { "es": "Merchandising", "en": "Merchandise" } },
      { "src": "img/projects/axon/14.jpg", "caption": { "es": "Firma de email", "en": "Email signature" } },
      { "src": "img/projects/axon/15.jpg", "caption": { "es": "Redes sociales", "en": "Social media" } },
      { "src": "img/projects/axon/16.jpg", "caption": { "es": "Web corporativa", "en": "Studio website" } },
      { "src": "img/projects/axon/17.jpg", "caption": { "es": "Proceso: prototipo A, descartado", "en": "Process: prototype A, discarded" } },
      { "src": "img/projects/axon/18.jpg", "caption": { "es": "Proceso: prototipo B, elegido, con su isotipo", "en": "Process: prototype B, chosen, with its brand mark" } }
    ],
    "time": { "es": "Curso 2025/2026 · dos prácticas (marzo y abril)", "en": "2025/2026 school year · two assignments (March and April)" },
    "role": { "es": "Práctica de CFGS Diseño y Edición de Publicaciones · naming, identidad y manual", "en": "Publishing design diploma coursework · naming, identity and guidelines" },
    "tools": ["Illustrator", "InDesign"],
    "goal": {
      "es": "AXON es un estudio unipersonal que une diseño gráfico y desarrollo web, para creativos, pequeños negocios y startups que no quieren coordinar a un diseñador y a un desarrollador por separado. El nombre viene del axón de la neurona, y el logotipo interviene la X: sus cuatro brazos se acercan sin tocarse y dejan un hueco en forma de rombo, como una sinapsis. Lo elegí frente a una X inclinada, que era más decorativa que conceptual. En la segunda práctica corregí el logotipo antes de hacer el manual: acerqué la X a la A, la estreché y, como el hueco entre A y X seguía pareciendo mayor que el resto, probé cinco soluciones y cambié la A, la O y la N a Aktiv Grotesk. Después maqueté en InDesign el manual de identidad: construcción, área de seguridad, versiones, usos incorrectos, paleta fría (Signal Blue, Axon Black, Static White), IBM Plex Mono, patrón, fotografía y aplicaciones, de la tarjeta de visita a la web.",
      "en": "AXON is a one-person studio that combines graphic design and web development, for creatives, small businesses and startups who don't want to coordinate a designer and a developer separately. The name comes from the neuron's axon, and the logo intervenes the X: its four arms come close without touching and leave a diamond-shaped gap, like a synapse. I chose it over a tilted X, which was more decorative than conceptual. In the second assignment I refined the logo before building the manual: I moved the X closer to the A and narrowed it, and since the A–X gap still looked wider than the rest, I tested five fixes and switched the A, O and N to Aktiv Grotesk. Then I laid out the brand guidelines in InDesign: construction, clear space, versions, incorrect uses, a cold palette (Signal Blue, Axon Black, Static White), IBM Plex Mono, pattern, photography and applications, from the business card to the website."
    },
    "highlights": [
      { "es": "Manual de identidad completo, en versión para imprenta (con sangrado) y para web", "en": "Complete brand guidelines, in a print version (with bleed) and a web version" },
      { "es": "Corrección óptica del logotipo: cinco soluciones probadas y una argumentada", "en": "Optical refinement of the logo: five fixes tested and one argued for" },
      { "es": "Aplicaciones físicas y digitales: papelería, merchandising, email, redes, favicon y web", "en": "Print and digital applications: stationery, merchandise, email, social, favicon and website" },
      { "es": "Es la identidad de este portfolio: Signal Blue #0057FF e IBM Plex Mono", "en": "It is the identity of this portfolio: Signal Blue #0057FF and IBM Plex Mono" }
    ],
    "headline": { "es": "Un estudio, dos oficios", "en": "One studio, two crafts" },
    "statement": { "es": "AXON es un estudio unipersonal que une diseño gráfico y desarrollo web, para quien no quiere coordinar a un diseñador y a un desarrollador por separado.", "en": "AXON is a one-person studio that combines graphic design and web development, for people who don't want to coordinate a designer and a developer separately." },
    "system": {
      "title": { "es": "El sistema de marca", "en": "The brand system" },
      "label": { "es": "Manual de identidad · versión imprenta y web", "en": "Brand guidelines · print and web versions" },
      "nodes": [
        {
          "title": { "es": "Logotipo", "en": "Logo" },
          "text": { "es": "Construcción, área de seguridad, tamaños mínimos, versiones y usos incorrectos.", "en": "Construction, clear space, minimum sizes, versions and incorrect uses." }
        },
        {
          "title": { "es": "Color", "en": "Colour" },
          "text": { "es": "Signal Blue #0057FF, Axon Black y Static White.", "en": "Signal Blue #0057FF, Axon Black and Static White." }
        },
        {
          "title": { "es": "Tipografía", "en": "Typography" },
          "text": { "es": "IBM Plex Mono como corporativa; Aktiv Grotesk en la A, la O y la N del logotipo.", "en": "IBM Plex Mono as the brand typeface; Aktiv Grotesk for the A, O and N in the logo." }
        },
        {
          "title": { "es": "Patrón y fotografía", "en": "Pattern & photography" },
          "text": { "es": "Patrón gráfico, texturas y estilo de fotografía.", "en": "Graphic pattern, textures and photography style." }
        }
      ],
      "core": {
        "title": { "es": "Aplicaciones", "en": "Applications" },
        "text": { "es": "Tarjeta de visita, identificación, papel de carta, merchandising, firma de email, redes sociales, favicon y web.", "en": "Business card, ID badge, letterhead, merchandise, email signature, social media, favicon and website." }
      }
    },
    "construction": {
      "title": { "es": "Isotipo", "en": "Brand mark" },
      "viewBox": [344, 312],
      "module": 26,
      "axis": 160,
      "angle": 62,
      "angleAt": [87, 160],
      "paths": [
        "M2 0H97L175 160H87Z",
        "M258 0H343L260 160L211 81Z",
        "M174 160H260L342 312H258Z",
        "M87 160L129 236L89 312H0Z"
      ]
    },
    "result": { "es": "Una marca que uso todos los días: la de este portfolio.", "en": "A brand I use every day: this portfolio's." },
    "links": {}
  },
  {
    "id": "greenbite",
    "date": "2026-03",
    "categories": ["graphic", "branding"],
    "title": { "es": "Greenbite", "en": "Greenbite" },
    "subtitle": { "es": "Identidad visual para comida rápida saludable · práctica de diseño", "en": "Visual identity for healthy fast food · design coursework" },
    "summary": {
      "es": "Identidad visual completa para Greenbite, una marca ficticia de comida rápida saludable que vende en foodtruck y para llevar en Madrid: logotipo, isotipo, paleta, usos según fondo y aplicaciones.",
      "en": "A complete visual identity for Greenbite, a fictional healthy fast food brand selling from a food truck and as take-away in Madrid: logo, brand mark, palette, background usage and applications."
    },
    "cover": "img/projects/greenbite/cover.jpg",
    "gallery": [
      { "src": "img/projects/greenbite/02.jpg", "caption": { "es": "Logotipo final", "en": "Final logo" } },
      { "src": "img/projects/greenbite/03.jpg", "caption": { "es": "Isotipo", "en": "Brand mark" } },
      { "src": "img/projects/greenbite/04.jpg", "caption": { "es": "Aplicaciones: bolsa kraft, tote, vasos, envoltorios, papelería y caja", "en": "Applications: kraft bag, tote, cups, wrappers, stationery and food box" } },
      { "src": "img/projects/greenbite/05.jpg", "caption": { "es": "Prototipos explorados", "en": "Explored prototypes" } },
      { "src": "img/projects/greenbite/06.jpg", "caption": { "es": "Prototipos finales", "en": "Final prototypes" } },
      { "src": "img/projects/greenbite/07.jpg", "caption": { "es": "Usos según fondo", "en": "Usage on different backgrounds" } }
    ],
    "time": { "es": "Curso 2025/2026", "en": "2025/2026 school year" },
    "role": { "es": "Práctica de CFGS Diseño y Edición de Publicaciones · diseño completo", "en": "Publishing design diploma coursework · full design" },
    "tools": ["Illustrator"],
    "goal": {
      "es": "El encargo pedía una identidad visual con todo el proceso: briefing, concepto, bocetos, prototipos, logotipo, isotipo, paleta, usos según fondo y mockups. Greenbite vende comida rápida saludable en Madrid, en foodtruck y para llevar, a profesionales de 25 a 40 años. Empecé por la tipografía y exploré tres rutas para el símbolo: iconos de producto, un monograma gb y un arco mediterráneo. Descarté los iconos de producto literal porque cualquier negocio de comida podría usarlos. Llevé cuatro prototipos a la recta final y elegí el sello circular: una hoja que también es un cucurucho de papel, con una serif orgánica en arco y una paleta de verdes y tierras.",
      "en": "The brief asked for a visual identity with the full process: briefing, concept, sketches, prototypes, logo, brand mark, palette, background usage and mockups. Greenbite sells healthy fast food in Madrid, from a food truck and as take-away, to professionals aged 25 to 40. I started with the typography and explored three routes for the symbol: product icons, a gb monogram and a Mediterranean arch. I ruled out literal product icons because any food business could use them. Four prototypes made the shortlist and I chose the circular badge: a leaf that is also a paper cone, with an organic serif set in an arc and a palette of greens and earth tones."
    },
    "highlights": [
      { "es": "Un símbolo con doble lectura: hoja y cucurucho de comida para llevar", "en": "A symbol with a double reading: a leaf and a take-away paper cone" },
      { "es": "Cuatro prototipos evaluados contra el briefing antes de elegir", "en": "Four prototypes weighed against the brief before choosing" },
      { "es": "Sistema completo: logotipo, isotipo, paleta y usos según fondo", "en": "Full system: logo, brand mark, palette and background usage" }
    ],
    "headline": { "es": "Una hoja que también es un cucurucho", "en": "A leaf that is also a paper cone" },
    "statement": { "es": "Comida rápida saludable en foodtruck y para llevar, para profesionales de 25 a 40 años en Madrid. El símbolo tenía que contar las dos cosas.", "en": "Healthy fast food from a food truck and to take away, for professionals aged 25 to 40 in Madrid. The symbol had to say both things." },
    "system": {
      "title": { "es": "El sistema de marca", "en": "The brand system" },
      "nodes": [
        {
          "title": { "es": "Símbolo", "en": "Symbol" },
          "text": { "es": "Sello circular con una hoja que también es un cucurucho de papel.", "en": "A circular badge with a leaf that is also a paper cone." }
        },
        {
          "title": { "es": "Tipografía", "en": "Typography" },
          "text": { "es": "Serif orgánica en arco.", "en": "An organic serif set in an arc." }
        },
        {
          "title": { "es": "Color", "en": "Colour" },
          "text": { "es": "Verdes y tierras.", "en": "Greens and earth tones." }
        },
        {
          "title": { "es": "Usos según fondo", "en": "Background usage" },
          "text": { "es": "Versiones para fondos claros, oscuros y de color.", "en": "Versions for light, dark and coloured backgrounds." }
        }
      ],
      "core": {
        "title": { "es": "Aplicaciones", "en": "Applications" },
        "text": { "es": "Bolsa kraft, tote, vasos, envoltorios, papelería y caja.", "en": "Kraft bag, tote, cups, wrappers, stationery and food box." }
      }
    },
    "result": { "es": "Un símbolo con doble lectura, listo para el foodtruck.", "en": "A symbol with a double reading, ready for the food truck." },
    "links": {}
  },
  {
    "id": "gestalt",
    "date": "2026-02",
    "categories": ["graphic", "branding"],
    "title": { "es": "Leyes de la Gestalt", "en": "Gestalt laws" },
    "subtitle": { "es": "Logotipo, cartel y portada · práctica de diseño", "en": "Logo, poster and book cover · design coursework" },
    "summary": {
      "es": "Tres piezas vectoriales, cada una construida sobre una ley de la Gestalt: el logotipo de FitPup (cierre), un cartel de Steven Universe (pregnancia) y una portada de Alicia en el País de las Maravillas (semejanza).",
      "en": "Three vector pieces, each built on one Gestalt law: the FitPup logo (closure), a Steven Universe poster (prägnanz) and an Alice in Wonderland book cover (similarity)."
    },
    "cover": "img/projects/gestalt/cover.jpg",
    "gallery": [
      { "src": "img/projects/gestalt/02.jpg", "caption": { "es": "FitPup · ley de cierre", "en": "FitPup · law of closure" } },
      { "src": "img/projects/gestalt/03.jpg", "caption": { "es": "Steven Universe · ley de pregnancia", "en": "Steven Universe · law of prägnanz" } },
      { "src": "img/projects/gestalt/04.jpg", "caption": { "es": "Alicia · ley de semejanza", "en": "Alice · law of similarity" } },
      { "src": "img/projects/gestalt/05.jpg", "caption": { "es": "Mockup: taza FitPup", "en": "Mockup: FitPup mug" } },
      { "src": "img/projects/gestalt/06.jpg", "caption": { "es": "Mockup: sello FitPup", "en": "Mockup: FitPup stamp" } },
      { "src": "img/projects/gestalt/07.jpg", "caption": { "es": "Mockup: cartel en mupi", "en": "Mockup: street poster" } },
      { "src": "img/projects/gestalt/08.jpg", "caption": { "es": "Mockup: libro", "en": "Mockup: book" } },
      { "src": "img/projects/gestalt/09.jpg", "caption": { "es": "Proceso FitPup: de boceto a logo", "en": "FitPup process: sketch to logo" } },
      { "src": "img/projects/gestalt/10.jpg", "caption": { "es": "Proceso del cartel", "en": "Poster process" } },
      { "src": "img/projects/gestalt/11.jpg", "caption": { "es": "Proceso de la portada", "en": "Cover process" } }
    ],
    "time": { "es": "Curso 2025/2026", "en": "2025/2026 school year" },
    "role": { "es": "Práctica de CFGS Diseño y Edición de Publicaciones · diseño completo", "en": "Publishing design diploma coursework · full design" },
    "tools": ["Illustrator"],
    "goal": {
      "es": "El encargo era diseñar tres piezas gráficas aplicando las leyes de la Gestalt, con bocetos a mano, prototipo, diseño final vectorial y mockups. Para FitPup quería un logo deportivo y no \"tierno\": unas orejas de perro sin contorno inferior que el ojo cierra solo, con Bebas Neue para la fuerza atlética. El cartel anuncia una nueva temporada de Steven Universe reduciendo cada personaje a un solo rasgo y agrupándolos dentro de la gema de Steven. La portada de Alicia usa un patrón de rombos con iconos del libro y resalta en rojo los palos de la baraja, que se leen como una sola figura.",
      "en": "The brief was to design three graphic pieces applying Gestalt laws, with hand sketches, a prototype, a final vector design and mockups. For FitPup I wanted a sporty logo rather than a \"cute\" one: dog ears with no bottom outline that the eye closes on its own, set in Bebas Neue for athletic weight. The poster announces a new Steven Universe season by reducing each character to a single trait and grouping them inside Steven's gem. The Alice cover uses a diamond pattern of icons from the book and picks out the card suits in red, so they read as a single figure."
    },
    "highlights": [
      { "es": "Una ley distinta por pieza: cierre, pregnancia y semejanza", "en": "One law per piece: closure, prägnanz and similarity" },
      { "es": "Proceso completo: bocetos a mano, iteraciones digitales y mockups", "en": "Full process: hand sketches, digital iterations and mockups" },
      { "es": "El logo de FitPup es la identidad de mi proyecto web", "en": "The FitPup logo is the identity of my web project" }
    ],
    "headline": { "es": "Tres piezas, tres leyes", "en": "Three pieces, three laws" },
    "statement": { "es": "Cada pieza se apoya en una ley de la percepción: el ojo cierra, simplifica o agrupa lo que ve.", "en": "Each piece rests on one law of perception: the eye closes, simplifies or groups what it sees." },
    "system": {
      "title": { "es": "Las leyes", "en": "The laws" },
      "nodes": [
        {
          "title": { "es": "Cierre", "en": "Closure" },
          "text": { "es": "Logotipo de FitPup: orejas de perro sin contorno inferior, con Bebas Neue.", "en": "FitPup logo: dog ears with no bottom outline, set in Bebas Neue." }
        },
        {
          "title": { "es": "Pregnancia", "en": "Prägnanz" },
          "text": { "es": "Cartel de Steven Universe: cada personaje reducido a un rasgo, dentro de la gema de Steven.", "en": "Steven Universe poster: each character reduced to one trait, inside Steven's gem." }
        },
        {
          "title": { "es": "Semejanza", "en": "Similarity" },
          "text": { "es": "Portada de Alicia: patrón de rombos con los palos de la baraja en rojo.", "en": "Alice cover: a diamond pattern with the card suits in red." }
        }
      ]
    },
    "result": { "es": "El logotipo de FitPup nació aquí.", "en": "The FitPup logo was born here." },
    "links": {}
  },
  {
    "id": "diseno-grafico",
    "date": "2024-12",
    "categories": ["graphic", "branding"],
    "title": { "es": "Diseño gráfico", "en": "Graphic design" },
    "subtitle": { "es": "Selección de piezas", "en": "Selected pieces" },
    "summary": {
      "es": "Selección de trabajos de identidad visual, cartelería y piezas para redes sociales.",
      "en": "A selection of visual identity, poster and social media work."
    },
    "cover": "img/projects/diseno-grafico/cover.svg",
    "gallery": [
      { "src": "img/projects/diseno-grafico/cover.svg", "caption": { "es": "Sustituye por tus piezas", "en": "Replace with your pieces" } }
    ],
    "time": { "es": "2024", "en": "2024" },
    "role": { "es": "Diseño gráfico", "en": "Graphic design" },
    "tools": ["Illustrator", "Photoshop", "InDesign", "Figma"],
    "goal": {
      "es": "Texto de ejemplo: explica aquí el encargo, a quién iba dirigido y qué decisiones de diseño tomaste. Sustituye este proyecto por tus trabajos reales.",
      "en": "Sample text: explain the brief, who it was for and which design decisions you made. Replace this project with your real work."
    },
    "highlights": [],
    "links": {}
  }
];
