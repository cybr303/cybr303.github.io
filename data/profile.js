/* ==========================================================================
   PERFIL — edita aquí tus datos personales, skills y experiencia.
   Todo el texto que cambia con el idioma va en { es: "...", en: "..." }.
   Las fechas usan formato "AAAA-MM"; deja `end: null` si sigue en curso
   y la web mostrará "Actualidad / Present" y calculará la duración sola.
   ========================================================================== */
window.PROFILE = {
  handle: "303/AIDEN",
  name: "Aiden Jiménez",
  // Rotan en la pantalla del monitor del hero
  titles: {
    es: ["Desarrollador web", "Diseñador gráfico"],
    en: ["Web developer", "Graphic designer"],
  },
  location: { es: "Madrid, España", en: "Madrid, Spain" },
  available: true, // muestra el indicador "disponible para trabajar"

  careerStart: "2022-09",
  // Año de inicio del copyright 
  copyrightStart: 2025,

  email: "cybr303@gmail.com",
  linkedin: "https://www.linkedin.com/in/aiden-jimenez-393320329/",
  github: "https://github.com/cybr303",
  // Repositorio de esta web: la barra de estado del footer muestra su último commit
  repo: "cybr303/cybr303.github.io",
  cv: {
    es: "documentos/AidenJimenez_CV.pdf",
    en: "documentos/AidenJimenez_CV.pdf",
  },
  photo: "img/profile.svg", 

  stickyNote: {
    es: "¡Hola! Diseño lo que programo y programo lo que diseño :)",
    en: "Hi! I design what I code and code what I design :)",
  },

  about: {
    hello: { es: "Hola,", en: "Hello," },
    name: { es: "soy Aiden!", en: "I'm Aiden!" },
    // Etiquetas que flotan sobre la foto
    tags: [
      { es: "Madrid, España", en: "Madrid, Spain" },
    ],
    lead: { es: "Desarrollador web & diseñador gráfico", en: "Web developer & graphic designer" },
    body: {
      es: "Tengo un perfil híbrido: soy Técnico Superior en Desarrollo de Aplicaciones Web y estudio Diseño y Edición de Publicaciones Impresas y Multimedia. Combino el desarrollo front-end con una mirada de diseño UI/UX, así que puedo llevar un proyecto desde la arquitectura de la aplicación hasta su identidad visual. Participé en el HP Codewars Madrid 2023 y ya he aplicado lo que sé en proyectos reales.",
      en: "I have a hybrid profile: I hold a Higher Diploma in Web Application Development and I'm studying Print & Multimedia Publishing Design. I combine front-end development with a UI/UX design eye, so I can take a project from the application's architecture to its visual identity. I took part in HP Codewars Madrid 2023 and have already put what I know to work on real projects.",
    },
  },

  // Iconos: `icon` es el nombre del SVG en img/icons/ (sacados de https://simpleicons.org).
  // Si no hay icono o falla, se muestra `abbr` como monograma.
  skills: [
    { name: "HTML5", icon: "html5", abbr: "H5" },
    { name: "CSS3", icon: "css3", abbr: "C3" },
    { name: "JavaScript", icon: "javascript", abbr: "JS" },
    { name: "PHP", icon: "php", abbr: "PHP" },
    { name: "Laravel", icon: "laravel", abbr: "Lv" },
    { name: "Spring", abbr: "Sp" },
    { name: "Blade", icon: "blade", abbr: "{{ }}" },
    { name: "MySQL", icon: "mysql", abbr: "SQL" },
    { name: "Bootstrap", icon: "bootstrap", abbr: "Bs" },
    { name: "Tailwind", icon: "tailwindcss", abbr: "Tw" },
    { name: "Git", icon: "git", abbr: "Git" },
    { name: "GitHub", icon: "github", abbr: "GH" },
    { name: "Figma", icon: "figma", abbr: "Fg" },
    { name: "Photoshop", icon: "adobephotoshop", abbr: "Ps" },
    { name: "Illustrator", icon: "adobeillustrator", abbr: "Ai" },
    { name: "InDesign", icon: "adobeindesign", abbr: "Id" },
    { name: "Canva", icon: "canva", abbr: "Cv" },
  ],

  softSkills: [
    { es: "Comunicación con cliente y equipo", en: "Client & team communication" },
    { es: "Pensamiento visual", en: "Visual thinking" },
    { es: "Resolución de problemas", en: "Problem solving" },
    { es: "Autonomía y organización", en: "Autonomy & organisation" },
    { es: "Atención al detalle", en: "Attention to detail" },
    { es: "Aprendizaje continuo", en: "Continuous learning" },
  ],

  languages: [
    { name: { es: "Español", en: "Spanish" }, level: { es: "Nativo", en: "Native" } },
    { name: { es: "Inglés", en: "English" }, level: { es: "Avanzado", en: "Advanced" } },
  ],

  // Proceso de trabajo (página "Sobre mí"). `icon`: search | design | code | launch
  process: [
    {
      icon: "search",
      title: { es: "Descubrir", en: "Discover" },
      text: { es: "Entiendo el proyecto, el público y los objetivos antes de abrir el editor.", en: "I get to know the project, the audience and the goals before opening the editor." },
    },
    {
      icon: "design",
      title: { es: "Diseñar", en: "Design" },
      text: { es: "Moodboard, wireframes y prototipo en Figma para validar la idea.", en: "Moodboard, wireframes and a Figma prototype to validate the idea." },
    },
    {
      icon: "code",
      title: { es: "Desarrollar", en: "Build" },
      text: { es: "Maquetación responsive y código limpio, probando en cada paso.", en: "Responsive layouts and clean code, testing at every step." },
    },
    {
      icon: "launch",
      title: { es: "Entregar", en: "Deliver" },
      text: { es: "Lanzamiento, ajustes finales y soporte para que todo funcione.", en: "Launch, final tweaks and support so everything keeps working." },
    },
  ],

  // Cosas que me gustan: se muestran en un carrusel de fotos con un texto corto.
  // Fotos en img/hobbies/ (formato vertical 4:5, unos 720×900 px).
  hobbies: [
    {
      image: "img/hobbies/videojuegos.jpg",
      title: { es: "Videojuegos", en: "Video games" },
      text: { es: "Desconectar con una buena partida, sobre todo en consolas portátiles.", en: "Unwinding with a good game, especially on handheld consoles." },
    },
    {
      image: "img/hobbies/entrenamiento-canino.jpg",
      title: { es: "Entrenamiento canino", en: "Dog training" },
      text: { es: "Educación en positivo y enriquecimiento: de aquí nació FitPup.", en: "Positive training and enrichment: this is where FitPup came from." },
    },
    {
      image: "img/hobbies/viajar.jpg",
      title: { es: "Viajar con mi perro", en: "Travelling with my dog" },
      text: { es: "Descubrir sitios nuevos, siempre con mi compañero de cuatro patas.", en: "Discovering new places, always with my four-legged sidekick." },
    },
    {
      image: "img/hobbies/ilustracion.jpg",
      title: { es: "Ilustración", en: "Illustration" },
      text: { es: "Bocetos a lápiz y carboncillo para soltar la mano y despejar la cabeza.", en: "Pencil and charcoal sketches to loosen up and clear my head." },
    },
    {
      image: "img/hobbies/organizacion.jpg",
      title: { es: "Organización", en: "Organisation" },
      text: { es: "Sí, de verdad: listas, agendas y una mochila donde todo tiene su sitio.", en: "Yes, really: lists, planners and a backpack where everything has its place." },
    },
  ],

  // Experiencia laboral (se ordena sola, la más reciente primero).
  // Si no se sabe el inicio, deja `start: null`: solo se muestra el fin (o "Actualidad").
  experience: [
    {
      title: { es: "Asistente técnico", en: "Technical assistant" },
      place: "Working Capital Management Group S.A. · Madrid",
      start: "2023-04",
      end: "2023-07",
      tasks: [
        { es: "Soporte técnico a teleoperadores", en: "Tech support for call-centre agents" },
        { es: "Scripts en PHP para automatizar tareas", en: "PHP scripts to automate tasks" },
        { es: "Consultas y gestión en MySQL", en: "MySQL queries and management" },
      ],
    },
    {
      title: { es: "Personal de equipo / Entrenador", en: "Crew member / Trainer" },
      place: "McDonald's · Madrid",
      start: "2024-03",
      end: null,
      tasks: [
        { es: "Atención al cliente", en: "Customer service" },
        { es: "Trabajo en equipo bajo presión", en: "Teamwork under pressure" },
        { es: "Gestión del flujo de pedidos", en: "Order flow management" },
      ],
    },
    {
      title: { es: "Auxiliar de producción", en: "Production assistant" },
      place: "Etcétera Graphics · Madrid",
      start: "2025-04",
      end: "2025-05",
      tasks: [
        { es: "Acabados: laminado, plastificado, guillotinado, hendido", en: "Finishing: laminating, guillotine cutting, creasing" },
        { es: "Encuadernación, tarjetas, carteles y lanyards", en: "Bookbinding, cards, posters and lanyards" },
        { es: "Calidad y plazos en taller de impresión digital", en: "Quality and deadlines in a digital print shop" },
      ],
    },
    {
      title: { es: "Asistente técnico en desarrollo web", en: "Web development technical assistant" },
      place: "Universidad Rey Juan Carlos · Madrid",
      start: "2024-04",
      end: "2024-07",
      tasks: [
        { es: "Web del proyecto PROMISE (LAIMBIO, URJC)", en: "Website for the PROMISE project (LAIMBIO, URJC)" },
        { es: "Interfaces en HTML, CSS y JavaScript", en: "HTML, CSS and JavaScript interfaces" },
        { es: "Trabajo directo con investigadores", en: "Working directly with researchers" },
      ],
    },
  ],

  // Formación (las fechas pueden ser solo el año, "AAAA")
  studies: [
    {
      title: {
        es: "Técnico Superior en Diseño y Edición de Publicaciones Impresas y Multimedia",
        en: "Higher Diploma in Print & Multimedia Publishing Design",
      },
      place: "IES Virgen de la Paloma · Madrid",
      start: "2025",
      end: "2027",
    },
    {
      title: {
        es: "Técnico Superior en Desarrollo de Aplicaciones Web",
        en: "Higher Diploma in Web Application Development",
      },
      place: "IES Rosa Chacel · Madrid",
      start: "2023",
      end: "2025",
      tasks: [
        { es: "Proyecto final: FitPup", en: "Final project: FitPup" },
      ],
    },
    {
      title: {
        es: "Técnico en Sistemas Microinformáticos y Redes",
        en: "Vocational Diploma in Computer Systems and Networks",
      },
      place: "IES Rosa Chacel · Madrid",
      start: "2021",
      end: "2023",
    },
  ],

  // Otros eventos (competiciones, premios…)
  awards: [
    {
      title: { es: "HP Codewars Madrid 2023", en: "HP Codewars Madrid 2023" },
      place: "Hewlett Packard Enterprise",
      start: null,
      end: "2023",
      tasks: [
        { es: "Competición de programación en equipo", en: "Team programming competition" },
        { es: "Retos algorítmicos a contrarreloj", en: "Timed algorithmic challenges" },
      ],
    },
  ],
};
