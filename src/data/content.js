// ALL website copy, taken word for word from "Human Studio Labs — Complete website content structure".
// Edit text here and every page updates. Images live in /public/images (replace a file with the same name to swap it).

const img = (name) => `/images/${name}.webp`

export const IMAGES = {
  portraitBlue: img('portrait-blue'),
  portraitLight: img('portrait-light'),
  headScan: img('head-scan'),
  neonXray: img('neon-xray'),
  bodyXray: img('body-xray'),
  evolvingHologram: img('evolving-hologram'),
  aboutLabs: img('about-human-studio-labs'),
  innovationModel: img('innovation-model'),
  specializedProducts: img('specialized-products'),
  solutionsHero: img('solutions-hero'),
}

export const BRAND = {
  name: 'Human Studio Labs',
  tagline: 'Intelligence built around human needs.',
  email: 'info@humanstudiolabs.com',
  site: 'humanstudiolabs.com',
  logo: '/images/logo.webp',
  icon: '/images/icon.webp',
}

export const NAV = [
  { label: 'Solutions', to: '/solutions' },
  { label: 'About', to: '/about' },
  { label: 'Responsible AI', to: '/responsible-ai' },
  { label: 'Partnerships', to: '/partnerships' },
  { label: 'Contact', to: '/contact' },
]
export const HEADER_CTA = { label: 'Start a Conversation', to: '/contact' }

/* ============================ HOMEPAGE ============================ */

export const HERO = {
  pill: 'Human Studio Labs',
  title: 'Intelligence for the Next Era of Healthcare.',
  tagline: '/ Intelligence built around human needs. /',
  text: [
    'We build AI-powered medical systems and intelligent digital solutions designed to help healthcare institutions work more effectively, professionals advance their expertise, researchers navigate knowledge, and people better understand their health.',
    'By bringing artificial intelligence, software innovation, and human-centered design together, we turn complex healthcare challenges into practical digital capabilities.',
  ],
  primary: { label: 'Explore Our Solutions', to: '/#solutions' },
  secondary: { label: 'Partner With Us', to: '/partnerships' },
  image: { src: IMAGES.portraitBlue, alt: 'A human face overlaid with points of light' },
  panelTop: { label: 'Healthcare Is Evolving', text: 'Healthcare operates at the intersection of complex information, specialized expertise, demanding workflows, and deeply human needs.', stat: '04', statLabel: 'specialized solution areas' },
  panelBottom: { label: 'Our focus', text: 'Our focus is to create technology that fits the way healthcare works today while helping organizations and individuals prepare for what comes next.' },
}

export const EVOLVING = {
  label: 'A more connected approach to healthcare technology',
  title: 'Healthcare Is Evolving. Intelligence Must Evolve With It.',
  intro: 'Healthcare operates at the intersection of complex information, specialized expertise, demanding workflows, and deeply human needs.',
  text: [
    'Yet technology can only create meaningful value when it does more than digitize existing processes. It must help people understand information, coordinate work, access knowledge, and make better-informed decisions.',
    'Human Studio Labs develops intelligent software solutions designed around these realities.',
    'Our focus is to create technology that fits the way healthcare works today while helping organizations and individuals prepare for what comes next.',
  ],
  image: { src: IMAGES.evolvingHologram, alt: 'A specialist studying a holographic model of the human body in a high-tech medical control room', pos: '50% 55%' },
}

export const PATHWAYS = {
  label: 'One innovation vision. Four specialized solution areas.',
  title: 'Four Pathways to a More Intelligent Healthcare Future.',
  image: { src: '/images/four-pathways.webp', alt: 'A clinician exploring a digital model of the human body on a large screen', pos: '58% 45%' },
}

export const SOLUTIONS = [
  {
    id: 'medical-operating-systems', n: '01', name: 'Medical Operating Systems', image: IMAGES.headScan, pos: '62% 45%',
    heroImage: { src: '/images/medical-operating-systems.webp', alt: 'A doctor working on a smart surface in a hospital operating room', pos: '50% 62%' },
    tagline: 'The intelligence behind healthcare operations.',
    home: [
      'A connected digital foundation for clinics, medical centres, hospitals, and healthcare organizations.',
      'We develop AI-enabled software concepts and solutions designed to support operational coordination, streamline workflows, organize information, and improve institutional visibility.',
      'Our objective is to help healthcare organizations move towards more connected, adaptable, and intelligently managed operations.',
    ],
    pageTagline: 'A smarter foundation for healthcare delivery.',
    audience: 'Hospital executives, clinic owners, healthcare groups, operations directors, and IT leaders.',
    introTitle: 'From Disconnected Processes to Intelligent Operations',
    intro: [
      'Healthcare organizations rely on multiple teams, information flows, and operational processes working together every day.',
      'Human Studio Labs develops AI-enabled medical software solutions designed to support a more connected approach to healthcare operations.',
      'Our direction is to bring relevant information, workflows, and intelligent assistance into a coherent digital environment—helping institutions improve operational visibility, reduce avoidable administrative friction, and make more informed use of their resources.',
    ],
    capsTitle: 'Capabilities We Aim to Enable',
    groups: [{ caps: [
      ['Operational workflow support', 'Structure and coordinate defined administrative and operational processes.'],
      ['Intelligent information access', 'Help authorized users retrieve and organize relevant information within approved systems and workflows.'],
      ['Management intelligence', 'Support the interpretation of operational indicators and the identification of improvement opportunities.'],
      ['Integration-ready architecture', 'Explore appropriate connections with existing institutional systems, subject to technical feasibility, security, and data-access requirements.'],
      ['Scalable institutional solutions', 'Develop capabilities that can be adapted to different organizational structures and deployment environments.'],
    ] }],
    contextTitle: "Designed for Healthcare's Operational Complexity",
    context: [
      'For clinics and medical centres, the focus may be on day-to-day coordination and streamlined administration. For larger hospitals and healthcare groups, it may extend to more complex departmental workflows and institutional oversight.',
      "Each implementation should begin with a clear understanding of the organization's requirements, current systems, and intended outcomes.",
    ],
    ambition: 'Healthcare operations that are more connected, more transparent, and better supported by intelligence.',
    cta: 'Discuss Your Healthcare Operations',
  },
  {
    id: 'medical-training', n: '02', name: 'Medical Training', image: IMAGES.portraitLight, pos: '55% 40%',
    heroImage: { src: '/images/medical-training.webp', alt: 'A person interacting with a digital model of the human body', pos: '55% 40%' },
    tagline: 'Advancing expertise through intelligent learning.',
    home: [
      'Medical knowledge continues to expand. Learning experiences must keep pace.',
      'Our AI-powered training solutions aim to help medical professionals navigate educational content, assess their understanding, and engage with knowledge in ways that reflect their learning needs.',
      'We help bring the potential of adaptive learning and intelligent educational support into professional development.',
    ],
    pageTagline: 'A more intelligent approach to lifelong medical learning.',
    audience: 'Universities, medical schools, hospitals, training centres, and healthcare professionals.',
    introTitle: 'Learning Designed Around the Demands of Modern Medicine',
    intro: [
      'Medical education is a continuous process. Professionals must keep pace with new evidence, evolving practices, and increasingly specialized knowledge.',
      'Human Studio Labs explores how AI can support more adaptive, interactive, and accessible medical learning.',
      'Our solutions aim to help educational institutions structure learning experiences, help professionals explore relevant material, and support the assessment of knowledge and learning progress.',
    ],
    capsTitle: 'Learning That Responds to the Learner',
    groups: [{ caps: [
      ['Adaptive learning support', 'Help learners navigate educational content according to defined learning objectives and assessed needs.'],
      ['Interactive knowledge exploration', 'Make educational material easier to explore through structured explanations and contextual assistance.'],
      ['Assessment and feedback', 'Support knowledge checks and feedback that identify areas for further learning.'],
      ['Institutional learning management support', 'Help organize learning resources and monitor defined training activities.'],
      ['Continuing professional development', 'Support ongoing learning experiences that can evolve with professional requirements.'],
    ] }],
    contextTitle: 'Technology in Support of Expertise',
    context: [
      'AI can make learning more responsive, but medical competence also depends on supervised practice, clinical experience, and rigorous assessment.',
      'Our approach is to complement these foundations with intelligent tools that support understanding and continued development.',
    ],
    ambition: 'A learning environment that helps medical knowledge become more accessible, relevant, and useful throughout a professional career.',
    cta: 'Explore Medical Learning Partnerships',
  },
  {
    id: 'medical-research', n: '03', name: 'Medical Research', image: IMAGES.neonXray, pos: '48% 40%',
    heroImage: { src: '/images/medical-research.webp', alt: 'A doctor analysing medical scans on large screens', pos: '70% 30%' },
    tagline: 'Supporting the pursuit of medical knowledge.',
    home: [
      'Progress in medicine depends on the ability to find relevant evidence, understand scientific literature, and investigate meaningful questions.',
      'Our AI-assisted research solutions aim to help research teams discover, organize, explore, and synthesize information more efficiently—while preserving scientific rigor and the essential role of human judgment.',
    ],
    pageTagline: 'Intelligent tools for deeper scientific exploration.',
    audience: 'Research institutes, universities, clinical researchers, scientific teams, and academic organizations.',
    introTitle: 'Give Research Teams More Room to Investigate',
    intro: [
      'Medical research requires disciplined inquiry, careful evaluation, and the ability to navigate expanding bodies of scientific knowledge.',
      'AI offers opportunities to support information-intensive research activities, from discovering relevant literature to organizing sources and exploring relationships between findings.',
      'Human Studio Labs develops its research direction around these opportunities, with a focus on supporting researchers rather than automating scientific judgment.',
    ],
    capsTitle: 'From Information to Investigation',
    groups: [{ caps: [
      ['Intelligent literature discovery', 'Help researchers explore publications and identify material relevant to defined research questions.'],
      ['Research knowledge management', 'Organize documents, references, and findings into more accessible knowledge environments.'],
      ['Evidence exploration', 'Support the comparison and synthesis of scientific literature while preserving access to source material.'],
      ['Research workflow assistance', 'Help structure selected information-management and administrative activities.'],
      ['Collaborative knowledge environments', 'Explore ways to support research teams in organizing and sharing information within appropriate permissions.'],
    ] }],
    contextTitle: 'Scientific Rigor Remains Essential',
    context: [
      'AI-generated summaries and interpretations must be checked against original sources. Research conclusions require appropriate methods, independent evaluation, and transparent treatment of uncertainty.',
      'We aim to develop tools that support these responsibilities and help researchers direct more attention toward scientific questions.',
    ],
    ambition: 'Make the research process more navigable without compromising the standards that make research credible.',
    cta: 'Discuss a Research Collaboration',
  },
  {
    id: 'medical-advisory', n: '04', name: 'Medical Advisory', image: IMAGES.portraitBlue, pos: '50% 30%',
    heroImage: { src: '/images/medical-advisory.webp', alt: 'A doctor exploring a digital patient profile', pos: '60% 45%' },
    tagline: 'Making medical knowledge more accessible and actionable.',
    home: [
      'For patients, understanding health information can be challenging. For medical professionals, navigating extensive knowledge requires time, context, and careful judgment.',
      'Our AI-powered advisory solutions are designed to support accessible health education and professional knowledge exploration, with capabilities and safeguards appropriate to each intended use.',
      'The goal is to support informed engagement with healthcare, not to replace the professional responsibility of medical practitioners.',
    ],
    pageTagline: 'Medical knowledge, made more accessible.',
    audience: 'Patients, individuals, doctors, healthcare professionals, and healthcare organizations.',
    introTitle: 'Intelligent Support for Better-Informed Healthcare Conversations',
    intro: [
      'Access to information does not always lead to understanding. Medical terminology, complex evidence, and individual circumstances can make health questions difficult to navigate.',
      'Human Studio Labs develops AI-powered advisory concepts designed to make medical information more accessible and support knowledge exploration for healthcare professionals.',
      'We distinguish between patient-facing health information and professional decision support because each requires different safeguards, intended uses, and standards of evaluation.',
    ],
    capsTitle: 'For Patients and for Professionals',
    groups: [
      { title: 'For Patients: Clarity and Understanding', caps: [
        ['Accessible health education', 'Help explain health information in clear, understandable language.'],
        ['Preparation for consultations', 'Help users organize questions and concerns before speaking with a healthcare professional.'],
        ['Care navigation support', 'Where appropriately designed, help users understand potential next steps and when professional assessment may be needed.'],
        ['Informed participation', 'Encourage more meaningful conversations between patients and qualified healthcare professionals.'],
      ] },
      { title: 'For Professionals: Knowledge and Context', caps: [
        ['Medical information retrieval', 'Support the exploration of relevant professional reference material.'],
        ['Evidence-based knowledge exploration', 'Help professionals navigate scientific publications and relevant guidance while verifying sources and limitations.'],
        ['Workflow-specific assistance', 'Support defined information-management tasks where appropriate.'],
        ['Professionally governed decision support', 'Enable carefully scoped decision-support capabilities where they have been appropriately evaluated and meet applicable requirements.'],
      ] },
    ],
    contextTitle: 'Human Judgment at the Centre',
    context: [
      'AI-generated information can be incomplete, outdated, or incorrect. Patient-facing tools must not present unsupported conclusions as diagnoses, and professional tools must not obscure the need for clinical judgment.',
      'Our aim is to create responsible digital experiences that help people understand information and help professionals work with knowledge more effectively.',
    ],
    ambition: 'A more informed connection between people, medical knowledge, and the professionals responsible for their care.',
    cta: 'Explore Medical Advisory Solutions',
  },
]

export const PRINCIPLES = {
  label: 'Technology should fit the work—not force the work to fit the technology.',
  title: 'Built Around the Realities of Healthcare.',
  intro: 'We approach healthcare innovation through five connected principles.',
  image: { src: IMAGES.bodyXray, alt: 'An X-ray style illustration of the human body' },
  items: [
    ['Understand the environment', 'Every solution begins with the people, processes, information, and constraints that define its intended use.'],
    ['Connect the right capabilities', 'We explore how AI, software architecture, information management, and user experience can work together to address a defined need.'],
    ['Simplify complexity', 'We aim to make sophisticated technology accessible through clear workflows, intuitive experiences, and useful outputs.'],
    ['Design for trust', 'Privacy, security, appropriate oversight, validation, and transparent limitations are essential considerations in healthcare AI.'],
    ['Improve through evidence', 'We seek to evaluate solutions against defined requirements and meaningful measures of performance, usability, and value.'],
  ],
}

export const ECOSYSTEM = {
  label: 'Specialized products. A shared standard of innovation.',
  title: 'One Innovation Company. A Growing Intelligence Ecosystem.',
  intro: 'Human Studio Labs is the parent innovation company behind a growing portfolio of AI applications, software platforms, and intelligent digital solutions.',
  text: [
    'Each product is developed around a specific audience, purpose, and set of requirements. Together, they form a broader ecosystem united by shared principles of human-centered design, technical development, and responsible innovation.',
    'This structure allows us to explore new opportunities, develop specialized capabilities, and create partnerships without losing the clarity of a unified corporate vision.',
    'As the portfolio evolves, opportunities may emerge for deeper integration, shared capabilities, and more connected digital experiences.',
  ],
  link: { label: 'Discover Our Ecosystem', to: '/about' },
  image: { src: IMAGES.portraitLight, alt: '', pos: '60% 40%' },
}

export const AUDIENCES = {
  label: 'Who we serve',
  title: 'Designed for Every Perspective in Healthcare.',
  image: { src: IMAGES.portraitLight, alt: 'A serene face with light flowing across the skin', pos: '60% 40%' },
  video: 'https://pub-cf581317971544ca8bc920fcb6643c6c.r2.dev/Who%20we%20serve.mp4',
  items: [
    ['Healthcare institutions', 'Technology that supports operational coordination, workflow management, and informed institutional decisions.'],
    ['Medical professionals', 'Intelligent learning and knowledge-support tools that complement expertise and professional development.'],
    ['Research institutions', 'Digital capabilities designed to support literature exploration, knowledge organization, and research workflows.'],
    ['Patients and individuals', 'Accessible health-information experiences that help people understand information and engage more effectively with healthcare professionals.'],
    ['Healthcare technology partners', 'A foundation for collaboration, integration, product development, and specialized AI solutions.'],
  ],
}

export const PERFORMANCE = {
  label: 'Evidence and products',
  title: 'Intelligence Must Be Earned Through Performance.',
  text: [
    'In healthcare, innovation is meaningful only when its capabilities are appropriate to the task, its limitations are understood, and its value can be evaluated.',
    'We believe the future of medical AI will be shaped not by technology alone, but by the quality of its application, the responsibility of its design, and the confidence it earns through real-world use.',
    'Our ambition is to develop solutions that combine technological progress with practical purpose—creating value for the institutions, professionals, researchers, and individuals who depend on healthcare.',
  ],
}

export const CLOSING = {
  label: 'The Future Is Not a Single Technology',
  title: 'It Is What We Build With It.',
  text: 'Human Studio Labs brings together AI, software innovation, and human-centered thinking to create a new generation of digital solutions for healthcare and beyond.',
  line: 'The direction is ambitious. The approach is practical. The purpose remains human.',
  image: IMAGES.headScan,
}

/* ============================ ABOUT ============================ */

export const ABOUT = {
  label: 'About Human Studio Labs',
  title: 'An Innovation Company Built Around Human Needs.',
  image: { src: '/images/aboutus.webp', alt: 'Human Studio Labs', pos: '50% 35%', video: 'https://pub-cf581317971544ca8bc920fcb6643c6c.r2.dev/About%20Human%20Studio%20Labs.mp4' },
  intro: [
    'Human Studio Labs is an AI and software innovation company established to develop, own, manage, and scale intelligent digital products.',
    'Our work brings together artificial intelligence, software engineering, product strategy, and human-centered design to address challenges across healthcare and related sectors.',
    'We believe the next generation of digital technology should do more than process information or automate individual tasks. It should help people work with greater clarity, make knowledge more accessible, and create better ways to address complex needs.',
    'Our company operates as the strategic foundation for a growing portfolio of specialized products. Each product has a distinct purpose and audience, while sharing a common commitment to purposeful innovation and responsible development.',
  ],
  vision: 'To shape a future in which intelligent technology advances healthcare, expands access to knowledge, and enables more effective human and institutional experiences.',
  mission: 'To develop and scale AI-powered software solutions that transform real-world challenges into practical, measurable, and sustainable digital value.',
  philosophy: {
    title: 'Intelligence built around human needs.',
    text: [
      'We believe technology should be designed around the people who use it, the environments in which it operates, and the outcomes it is intended to support.',
      'This principle guides our approach to product design, technical development, user experience, and responsible AI.',
    ],
  },
  model: [
    ['Human — Understand the need.', 'Begin with people, their challenges, and the context in which a solution must work.'],
    ['Studio — Shape the solution.', 'Translate insights into clear product concepts, intuitive experiences, and practical applications.'],
    ['Labs — Develop and evaluate.', 'Build, test, refine, and validate solutions against defined requirements.'],
    ['Intelligence — Create value.', 'Apply AI where it can provide meaningful assistance and support measurable improvements.'],
  ],
  modelNote: 'The result is an innovation model that connects strategic thinking with product development and real-world application.',
  forward: [
    'Human Studio Labs is building the foundation for an evolving ecosystem of intelligent digital solutions.',
    'Our ambition is to create products that can grow with their users, respond to emerging needs, and contribute to a more connected and intelligent digital future.',
  ],
}

/* ============================ RESPONSIBLE AI ============================ */

export const RESPONSIBLE = {
  label: 'Responsible AI',
  title: 'Innovation With Accountability.',
  image: { src: '/images/responsible-hero.webp', alt: 'A digital human profile made of circuits', pos: '50% 30%' },
  homeImage: { src: '/images/responsible-ai.webp', alt: 'A doctor working with a digital model of the human body', pos: '40% 35%' },
  intro: [
    'In healthcare, intelligent technology must be designed with an understanding of both its potential and its limitations.',
    'Human Studio Labs approaches responsible AI as an integral part of product development, not as a statement added after the technology has been built.',
  ],
  areasIntro: 'Our approach considers five essential areas.',
  areas: [
    ['Privacy and security', 'Protect sensitive information through appropriate data governance, access controls, and security measures suited to the product and deployment environment.'],
    ['Reliability and evaluation', 'Assess system performance against its intended purpose and establish appropriate testing, monitoring, and review processes.'],
    ['Transparency and limitations', 'Help users understand the role of AI, the nature of its outputs, and the limitations that may affect their interpretation.'],
    ['Human oversight', 'Ensure that responsibilities and review requirements are clearly defined, especially in clinical and other high-impact use cases.'],
    ['Continuous improvement', 'Use appropriate feedback, monitoring, and evaluation to identify risks and opportunities for improvement.'],
  ],
  closing: [
    "The safeguards required for an administrative assistant are not necessarily the same as those required for a clinical decision-support tool. We therefore believe that responsible AI must be tailored to each solution's purpose, users, risks, and applicable regulatory requirements.",
    'Our objective is to build technology whose value is supported by thoughtful design, appropriate validation, and clear accountability.',
  ],
}

/* ============================ PARTNERSHIPS ============================ */

export const PARTNERSHIPS = {
  label: 'Enterprise Solutions & Partnerships',
  title: 'Technology Shaped Around Your Organization.',
  image: { src: '/images/partnerships.webp', alt: 'A team meeting around an interactive digital table overlooking a city skyline', pos: '50% 56%' },
  intro: [
    'Every healthcare organization has its own operational environment, priorities, systems, and challenges.',
    'Human Studio Labs works to understand these requirements before defining the appropriate technology approach.',
    'Depending on the engagement, our work may include AI-powered software products, enterprise platforms, tailored applications, system integrations, licensing, implementation, or technology partnerships.',
  ],
  stepsTitle: 'How We Work Together',
  steps: [
    ['01. Discover', 'Understand your objectives, existing environment, requirements, and challenges.'],
    ['02. Define', 'Establish the solution scope, intended users, technical requirements, and criteria for success.'],
    ['03. Develop', 'Design and build the appropriate digital capabilities, integrations, and AI-enabled workflows.'],
    ['04. Evaluate', 'Assess the solution against agreed functional, technical, operational, and relevant safety requirements.'],
    ['05. Evolve', 'Identify opportunities for refinement, expansion, and continuing value.'],
  ],
  note: 'We aim to establish clear expectations from the outset, with defined deliverables and realistic implementation plans.',
  ctaTitle: "Let's Explore What's Possible.",
  ctaText: 'Whether you represent a hospital, clinic, research institute, educational organization, or healthcare technology company, we welcome conversations about challenges where intelligent software can provide meaningful value.',
  ctaLabel: 'Contact Human Studio Lab',
}

/* ============================ CONTACT ============================ */

export const CONTACT = {
  label: 'Contact',
  title: 'Start With a Challenge Worth Solving.',
  image: { src: '/images/contact-us.webp', alt: 'A human and a digital profile in conversation', pos: '70% 40%' },
  text: [
    'Tell us about your organization, your objectives, and the challenge you want to address.',
    'Our team can explore the appropriate solution area, discuss potential approaches, and identify the next steps for a productive conversation.',
  ],
  fields: { name: 'Your name', org: 'Organization', email: 'Professional email', area: 'Area of interest', message: 'How can we help?' },
  areas: ['Medical Operating Systems', 'Medical Training', 'Medical Research', 'Medical Advisory', 'Technology Partnership', 'Other'],
  submit: 'Submit Enquiry',
}
