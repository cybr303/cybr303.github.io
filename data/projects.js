/* ==========================================================================
   PROYECTOS — cada objeto del array es un proyecto.
   Se pintan solos en el carrusel de la home y en project.html?id=<id>.
   Para añadir uno nuevo: `node tools/new-project.mjs` (ver README) o copia
   un bloque y cambia los valores. Se ordenan por `date` (más reciente primero).

   categories → claves de window.PROJECT_CATEGORIES (filtros de la web)
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
      "es": "La información sobre entrenamiento en positivo y enriquecimiento está dispersa entre vídeos, foros y blogs. FitPup la reúne en un solo sitio y te deja seguir tu progreso en cada curso. Partí de mi prototipo estático y lo convertí en una aplicación Laravel con cuentas verificadas por email, perfiles de perro, cursos con seguimiento, guías de nutrición y suplementos, actividades de enriquecimiento y una comunidad con publicaciones y comentarios, desplegada con Docker en Render. La integración de pagos con Stripe quedó a medias: el checkout funciona, pero la activación del plan por webhook no llegó a tiempo para la entrega.",
      "en": "Information on positive training and enrichment is scattered across videos, forums and blogs. FitPup brings it together and lets you track your progress in each course. I took my static prototype and turned it into a Laravel app with email-verified accounts, dog profiles, courses with progress tracking, nutrition and supplement guides, enrichment activities and a community with posts and comments, deployed with Docker on Render. The Stripe integration stayed half-done: checkout works, but activating the plan through the webhook didn't make it in time for the deadline."
    },
    "highlights": [
      { "es": "Modelo de datos de 11 entidades (perros, cursos, progreso, nutrición, comunidad, suscripciones) con migraciones y seeders", "en": "11-entity data model (dogs, courses, progress, nutrition, community, subscriptions) with migrations and seeders" },
      { "es": "Registro con verificación por email, recuperación de contraseña y rutas protegidas", "en": "Sign-up with email verification, password recovery and protected routes" },
      { "es": "Seguimiento del progreso del usuario en cada curso", "en": "Per-user progress tracking for each course" },
      { "es": "Checkout de suscripción con Stripe en 3 niveles", "en": "Three-tier subscription checkout with Stripe" },
      { "es": "Despliegue con Docker en Render", "en": "Deployed with Docker on Render" }
    ],
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
    "id": "identidad-marca",
    "date": "2026-03",
    "categories": ["graphic", "branding"],
    "title": { "es": "Identidad visual: Greenbite y AXON", "en": "Visual identity: Greenbite and AXON" },
    "subtitle": { "es": "Dos identidades de marca · práctica de diseño", "en": "Two brand identities · design coursework" },
    "summary": {
      "es": "Dos identidades completas, de la investigación al manual de uso: Greenbite, una marca de comida rápida saludable para foodtruck, y AXON, mi propio estudio de diseño y desarrollo web, que es la identidad de este portfolio.",
      "en": "Two complete identities, from research to usage guidelines: Greenbite, a healthy fast food brand for a food truck, and AXON, my own design and web development studio, which is the identity of this portfolio."
    },
    "cover": "img/projects/identidad-marca/cover.jpg",
    "gallery": [
      { "src": "img/projects/identidad-marca/02.jpg", "caption": { "es": "Greenbite · logotipo final", "en": "Greenbite · final logo" } },
      { "src": "img/projects/identidad-marca/03.jpg", "caption": { "es": "Greenbite · isotipo", "en": "Greenbite · brand mark" } },
      { "src": "img/projects/identidad-marca/04.jpg", "caption": { "es": "Greenbite · aplicaciones: bolsa kraft, tote, vasos, envoltorios, papelería y caja", "en": "Greenbite · applications: kraft bag, tote, cups, wrappers, stationery and food box" } },
      { "src": "img/projects/identidad-marca/05.jpg", "caption": { "es": "Greenbite · prototipos explorados", "en": "Greenbite · explored prototypes" } },
      { "src": "img/projects/identidad-marca/06.jpg", "caption": { "es": "Greenbite · prototipos finales", "en": "Greenbite · final prototypes" } },
      { "src": "img/projects/identidad-marca/07.jpg", "caption": { "es": "Greenbite · usos según fondo", "en": "Greenbite · usage on different backgrounds" } },
      { "src": "img/projects/identidad-marca/08.jpg", "caption": { "es": "AXON · logotipo final", "en": "AXON · final logo" } },
      { "src": "img/projects/identidad-marca/09.jpg", "caption": { "es": "AXON · isotipo", "en": "AXON · brand mark" } },
      { "src": "img/projects/identidad-marca/10.jpg", "caption": { "es": "AXON · aplicaciones: rótulo, tarjeta y papelería", "en": "AXON · applications: building sign, business card and stationery" } },
      { "src": "img/projects/identidad-marca/11.jpg", "caption": { "es": "AXON · prototipo A, descartado", "en": "AXON · prototype A, discarded" } },
      { "src": "img/projects/identidad-marca/12.jpg", "caption": { "es": "AXON · prototipo B, elegido, con su isotipo", "en": "AXON · prototype B, chosen, with its brand mark" } },
      { "src": "img/projects/identidad-marca/13.jpg", "caption": { "es": "AXON · usos según fondo", "en": "AXON · usage on different backgrounds" } }
    ],
    "time": { "es": "Curso 2025/2026", "en": "2025/2026 school year" },
    "role": { "es": "Práctica de CFGS Diseño y Edición de Publicaciones · diseño completo", "en": "Publishing design diploma coursework · full design" },
    "tools": ["Illustrator"],
    "goal": {
      "es": "El encargo pedía dos identidades visuales con todo el proceso: briefing, concepto, bocetos, prototipos, logotipo, isotipo, paleta, usos según fondo y mockups. Greenbite es comida rápida saludable en Madrid, en foodtruck y para llevar, pensada para profesionales de 25 a 40 años. Descarté los símbolos de producto literal porque cualquier negocio de comida podría usarlos, y me quedé con un sello circular: una hoja que también es un cucurucho de papel, con una serif orgánica en arco y una paleta de verdes y tierras. AXON es mi propio estudio de diseño y desarrollo web. El nombre viene del axón de la neurona, y el logotipo interviene la X: sus cuatro brazos se acercan sin tocarse y dejan un hueco en forma de rombo, como una sinapsis. Elegí ese prototipo frente a una X inclinada, que era más decorativa que conceptual.",
      "en": "The brief asked for two visual identities with the full process: briefing, concept, sketches, prototypes, logo, brand mark, palette, background usage and mockups. Greenbite is healthy fast food in Madrid, sold from a food truck and as take-away, aimed at professionals aged 25 to 40. I ruled out literal product symbols because any food business could use them, and settled on a circular badge: a leaf that is also a paper cone, with an organic serif set in an arc and a palette of greens and earth tones. AXON is my own design and web development studio. The name comes from the neuron's axon, and the logo intervenes the X: its four arms come close without touching and leave a diamond-shaped gap, like a synapse. I chose that prototype over a tilted X, which was more decorative than conceptual."
    },
    "highlights": [
      { "es": "Dos marcas con públicos opuestos: cercana y natural frente a técnica y brutalista", "en": "Two brands for opposite audiences: warm and natural versus technical and brutalist" },
      { "es": "Sistema completo: logotipo, isotipo, paleta, tipografía y usos según fondo", "en": "Full system: logo, brand mark, palette, typography and background usage" },
      { "es": "AXON (Signal Blue #0057FF e IBM Plex Mono) es la identidad de este portfolio", "en": "AXON (Signal Blue #0057FF and IBM Plex Mono) is the identity of this portfolio" }
    ],
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
