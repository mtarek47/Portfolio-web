/**
 * CENTRALIZED PROJECTS DATA STORE
 * Supports client-side persistence (localStorage) for GitHub Pages compatibility
 * Allows adding, editing, deleting, and exporting projects via Admin Panel
 */

const DEFAULT_PROJECTS = [
  {
    id: 'weather-prayer',
    title: 'Weather & Prayer Times System',
    subtitle: 'Native Android Application with Jetpack Compose & Real-time Sensor APIs',
    category: 'mobile',
    categoryLabel: 'Android / Kotlin',
    role: 'Lead Android & Architecture Developer',
    timeline: '2026',
    heroImage: 'assets/Weather and prayer.png',
    github: 'https://github.com/mtarek47/Weather_and_prayer',
    liveDemo: '',
    techStack: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'OpenWeather API', 'USGS GeoJSON', 'Coroutines', 'Room DB'],
    architecture: 'Clean Architecture with MVVM, Coroutines, StateFlow, and Repository Pattern',
    problem: 'Users in diverse geographical areas need reliable, real-time meteorological conditions, severe earthquake alerts, interactive Doppler radar imagery, and exact astronomical prayer calculation times without battery drain or redundant background polling.',
    solution: 'Designed an asynchronous reactive Android architecture utilizing Jetpack Compose for the declarative UI layer and Kotlin Coroutines for non-blocking concurrent API queries to OpenWeather, USGS Earthquake services, and astronomical calculation engines.',
    keyFeatures: [
      'Declarative modern UI built 100% in Jetpack Compose with custom astronomical Qibla compass visuals',
      'Real-time earthquake monitoring with USGS GeoJSON telemetry feeds and depth magnitude plotting',
      'Accurate mathematical prayer time algorithms with GPS coordinate geocoding',
      'Windy interactive radar map embedding with hardware-accelerated rendering',
      'Offline caching layer utilizing Room database with cache invalidation policies'
    ],
    infrastructure: 'Containerized CI/CD build matrix using GitHub Actions to verify linting, unit test coverage, and release APK generation.',
    featured: true
  },
  {
    id: 'blood-connect',
    title: 'Blood Connect Emergency Dispatch',
    subtitle: 'Lifesaving Android & AI Emergency Donor Matching Platform',
    category: 'mobile',
    categoryLabel: 'Android / Kotlin / AI',
    role: 'Lead Mobile & AI Developer',
    timeline: '2026',
    heroImage: 'assets/blood_connect.jpg',
    github: 'https://github.com/mtarek47/Blood_connect_app',
    liveDemo: '',
    techStack: ['Kotlin', 'Jetpack Compose', 'Gemini AI', 'Firebase FCM', 'Google Maps API', 'Coroutines'],
    architecture: 'MVVM Architecture with Gemini AI Medical Assistance & Real-Time Proximity Dispatch',
    problem: 'During critical medical emergencies, finding compatible blood donors quickly is life-or-death. Traditional static donor lists are slow and lack live geographical matching, instant delivery alerts, and intelligent triage support.',
    solution: 'Engineered a native Android application in Kotlin and Jetpack Compose integrated with Google Gemini AI for smart health assistance and Firebase Cloud Messaging for sub-second emergency donor broadcast based on live geolocation.',
    keyFeatures: [
      'Gemini AI-powered smart health and emergency medical guidance assistant',
      'Sub-second high-priority FCM push notification broadcast for urgent blood requests',
      'Real-time proximity and blood-group compatibility donor locator on Google Maps',
      'Donor verification lifecycle with secure authentication and privacy protection'
    ],
    infrastructure: 'Firebase Cloud backend with automated CI test runs on pull requests.',
    featured: true
  },
  {
    id: 'cryptimg',
    title: 'Cryptimg: Steganographic Nostr Engine',
    subtitle: 'Compression-Resistant Image Steganography with 2D-DCT & Reed-Solomon FEC',
    category: 'backend enterprise',
    categoryLabel: 'Python / Cryptography / CLI',
    role: 'Creator & Systems Engineer',
    timeline: '2026',
    heroImage: 'assets/project-enterprise-1.jpg',
    github: 'https://github.com/mtarek47/Cryptimg',
    liveDemo: '',
    techStack: ['Python', '2D-DCT QIM', 'Reed-Solomon FEC', 'Nostr Protocol', 'FastAPI', 'Cryptography'],
    architecture: 'Modular Cryptographic Steganography Engine (Core Algorithm, CLI, REST API, Web UI)',
    problem: 'Censorship and lossy social media pipelines (JPEG compression, WebP re-encoding, aggressive resizing) destroy ordinary LSB-based steganographic payloads and metadata, making censorship-resistant data transport impossible.',
    solution: 'Engineered a production-grade steganographic engine embedding cryptographically signed Nostr events into image transform domains using 2D-DCT Quantization Index Modulation (QIM) paired with Reed-Solomon Forward Error Correction (FEC) for extreme error resilience.',
    keyFeatures: [
      'Robust 2D-DCT QIM frequency-domain payload embedding resistant to lossy compression',
      'Reed-Solomon Forward Error Correction (FEC) surviving aggressive social media transcoding and resizing',
      'Nostr protocol integration for cryptographically signed decentralized event publishing',
      'Complete toolkit: High-performance CLI, FastAPI backend, and interactive Web UI'
    ],
    infrastructure: 'Modular Python architecture with automated test suite for compression resistance thresholds.',
    featured: true
  },
  {
    id: 'reels-escape',
    title: 'Reels Escape: Focus & Digital Wellbeing',
    subtitle: 'Privacy-First Android Utility Blocking Short-Form Video Traps in Real-Time',
    category: 'mobile',
    categoryLabel: 'Android / Kotlin',
    role: 'Android Systems Developer',
    timeline: '2026',
    heroImage: 'assets/project2.jpg',
    github: 'https://github.com/mtarek47/Reels_Escape',
    liveDemo: 'https://github.com/mtarek47/Smart-Escape',
    techStack: ['Kotlin', 'Android Accessibility Service', 'Jetpack Compose', 'Room DB', 'Coroutines'],
    architecture: 'Low-Latency Android Accessibility Telemetry Engine with Zero-Network Privacy Shield',
    problem: 'Short-form addictive video feeds (YouTube Shorts, Instagram Reels, Facebook Reels) cause severe productivity loss and unconscious doom-scrolling habits.',
    solution: 'Engineered an on-device Android utility that runs a low-latency Accessibility Service to detect short-form video UI signatures in real-time, instantly closing the feed and redirecting the user back to focus mode without capturing personal screen content.',
    keyFeatures: [
      'Real-time automated detection and instant neutralization of Reels & Shorts feeds',
      '100% On-Device Privacy Architecture with zero internet permissions required',
      'Customizable deterrence modes, mindfulness delay timers, and focus streak statistics',
      'Minimal battery footprint with optimized Android background event listening'
    ],
    infrastructure: 'Native Android SDK build pipeline with strict privacy audit verification.',
    featured: true
  },
  {
    id: 'tender-package-builder',
    title: 'AI Tender Document Package Builder',
    subtitle: 'AI-Powered Automated Procurement & Specification Verification System',
    category: 'web enterprise',
    categoryLabel: 'AI / Full-Stack / Web',
    role: 'Full-Stack & AI Engineer',
    timeline: '2026',
    heroImage: 'assets/project-enterprise-2.jpg',
    github: 'https://github.com/mtarek47/devfest-242-15-882',
    liveDemo: '',
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'AI API', 'Document Parsing', 'REST API'],
    architecture: 'Client-Side Document Processing & AI Procurement Verification Pipeline',
    problem: 'Preparing and vetting commercial tender packages manually requires cross-checking hundreds of compliance rules, technical specifications, and legal clauses, leading to costly procurement errors.',
    solution: 'Built an AI-assisted tender document builder and validator for AI DevFest 2026 that parses tender documents, verifies compliance criteria, and generates structured procurement packages automatically.',
    keyFeatures: [
      'Automated parsing and categorization of complex procurement specifications',
      'AI compliance checking against standard governmental and commercial guidelines',
      'Dynamic package generator creating unified, printable submission packages',
      'Interactive validation dashboard with error highlighting and clause suggestions'
    ],
    infrastructure: 'Lightweight modular architecture optimized for instant in-browser analysis.',
    featured: false
  },
  {
    id: 'elearning-platform',
    title: 'Enterprise E-Learning Platform',
    subtitle: 'Java Spring Boot Microservices Architecture with Relational Course Engine',
    category: 'backend enterprise',
    categoryLabel: 'Enterprise / Java',
    role: 'Backend & Database Engineer',
    timeline: '2025',
    heroImage: 'assets/project-enterprise-1.jpg',
    github: 'https://github.com/mtarek47/E-Learning-Platform',
    liveDemo: '',
    techStack: ['Java', 'Spring Boot', 'MySQL', 'Hibernate / JPA', 'Spring Security', 'Docker'],
    architecture: 'Layered Enterprise Architecture (Controller, Service, Repository, DTO) with RBAC',
    problem: 'Educational institutions require scalable course distribution, role-separated management (Student, Instructor, Admin), interactive quiz grading, and progress tracking with high transaction isolation.',
    solution: 'Developed a robust Java Spring Boot backend using Spring Data JPA, Hibernate, and MySQL. Implemented Spring Security with Stateless JWT token authentication and fine-grained method-level security annotations.',
    keyFeatures: [
      'Comprehensive RESTful API endpoints for curriculum management, enrollments, and grading',
      'Stateless JWT authentication with refresh tokens and role-based permissions',
      'Relational schema design with normalized tables, foreign key constraints, and indexing',
      'Transaction-safe course enrollment and automated quiz evaluation pipeline'
    ],
    infrastructure: 'Multi-stage Docker build producing a slim OpenJDK runtime image; automated JUnit 5 tests.',
    featured: true
  },
  {
    id: 'project-management',
    title: 'Project Management & Task System',
    subtitle: 'Enterprise Team Collaboration Platform with Spring Boot & PostgreSQL',
    category: 'backend enterprise web',
    categoryLabel: 'Full-Stack / Spring Boot',
    role: 'Full-Stack Software Engineer',
    timeline: '2025',
    heroImage: 'assets/project-enterprise-2.jpg',
    github: 'https://github.com/mtarek47/Project-Management-System',
    liveDemo: '',
    techStack: ['Java', 'Spring Boot', 'PostgreSQL', 'HTML5/JS', 'Spring Data JPA', 'Docker'],
    architecture: 'Decoupled Client-Server Architecture: Responsive Web Frontend + Spring Boot Backend + PostgreSQL',
    problem: 'Distributed engineering teams need an intuitive workflow engine supporting task assignment, sprint cycles, roadmap Gantt/timeline visualization, and real-time status reporting.',
    solution: 'Architected an enterprise task management system with a high-performance Spring Boot REST API backed by PostgreSQL. Designed clean relational schemas for hierarchical task trees and role authorization.',
    keyFeatures: [
      'Sprint planning and milestone tracking with automated velocity computation',
      'Complex SQL queries for team performance metrics and reporting dashboards',
      'Role-based assignment workflows for Admin, Project Manager, and Developer tiers',
      'Centralized task submission, review, and milestone delivery pipeline'
    ],
    infrastructure: 'Dockerized Spring Boot application with containerized PostgreSQL and automated schema migrations.',
    featured: true
  },
  {
    id: 'ecommerce-web',
    title: 'SHOP.CO Fashion E-Commerce Platform',
    subtitle: 'Feature-Rich Modern Online Shopping Platform for Fashion Retailers',
    category: 'web',
    categoryLabel: 'Web / Full-Stack',
    role: 'Full-Stack Web Developer',
    timeline: '2026',
    heroImage: 'assets/ecommerce.jpg',
    github: 'https://github.com/mtarek47/SHOP.CO',
    liveDemo: '',
    techStack: ['JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST API'],
    architecture: 'Full-Stack Web Architecture with Document-Oriented NoSQL Data Modeling & State Persistence',
    problem: 'Fashion retailers need a fast, visually appealing storefront supporting dynamic product filtering (size, color, price, category), instant cart calculations, and responsive checkout across mobile and desktop.',
    solution: 'Constructed an end-to-end e-commerce platform with rich client-side interactivity, fast catalog search, product detail showcases, and synchronized shopping cart state management.',
    keyFeatures: [
      'Dynamic multi-attribute catalog filtering (price range, style, size, color)',
      'Persistent shopping cart and instant price calculation with promo discount codes',
      'Interactive product review and customer rating system',
      'Fully responsive modern UI optimized for mobile touch shoppers'
    ],
    infrastructure: 'Node.js microservice architecture containerized with Docker and environment-driven configs.',
    featured: false
  },
  {
    id: 'news-portal',
    title: 'News Article Portal & CMS Platform',
    subtitle: 'Responsive News Website with REST API & Admin Content Management Panel',
    category: 'web backend',
    categoryLabel: 'Web / Vanilla JS / CMS',
    role: 'Frontend & API Developer',
    timeline: '2026',
    heroImage: 'assets/project-web-1.jpg',
    github: 'https://github.com/mtarek47/news-article-with-api',
    liveDemo: '',
    techStack: ['JavaScript', 'REST API', 'HTML5', 'CSS3', 'Admin CMS'],
    architecture: 'Decoupled News Reader + Admin Management Console with Dynamic REST API Integration',
    problem: 'Digital publishers require an ultra-fast, lightweight reader frontend paired with an intuitive admin dashboard to publish, categorize, and update news articles dynamically.',
    solution: 'Built a lightweight, responsive news portal using vanilla JavaScript for zero-framework overhead and blistering page speeds, integrated with an authenticated admin panel for content operations.',
    keyFeatures: [
      'Real-time category filtering (Technology, Business, Sports, Politics)',
      'Full CRUD admin dashboard for drafting, publishing, and archiving articles',
      'High-performance DOM rendering with zero runtime framework dependencies',
      'Responsive newspaper-inspired layout with responsive typography'
    ],
    infrastructure: 'Static frontend deployment with API-driven data binding.',
    featured: false
  },
  {
    id: 'routine-management',
    title: 'DS Routine Management System',
    subtitle: 'High-Performance Terminal Schedule Manager in C with Singly Linked Lists',
    category: 'backend',
    categoryLabel: 'Systems / C / Data Structures',
    role: 'Systems Developer',
    timeline: '2025',
    heroImage: 'assets/project2.jpg',
    github: 'https://github.com/mtarek47/DS-small-project-Routine-management-',
    liveDemo: '',
    techStack: ['C Language', 'Data Structures', 'Linked Lists', 'Algorithms', 'ANSI CLI'],
    architecture: 'Dynamic Memory-Managed Singly Linked List Data Engine with Interactive ANSI CLI',
    problem: 'Managing complex academic class routines in resource-constrained environments requires fast lookups, memory efficiency, and conflict-free schedule modifications without bulky dependencies.',
    solution: 'Engineered a terminal-based schedule manager in C implementing customized singly linked list data structures for dynamic node insertion, deletion, updating, and chronological sorting with ANSI color interface.',
    keyFeatures: [
      'Dynamic memory allocation and pointer-driven linked list data management',
      'Time-slot search, batch schedule updates, and conflict detection algorithms',
      'Formatted terminal UI utilizing ANSI escape color codes for intuitive navigation',
      'Zero external library dependencies with clean POSIX-compliant C code'
    ],
    infrastructure: 'Compiled with GCC using strict compiler warning flags (-Wall -Wextra).',
    featured: false
  },
  {
    id: 'portfolio-web',
    title: 'Engineering Portfolio & Digital System',
    subtitle: 'Technical Engineering Notebook Visual System & Telemetry Dashboard',
    category: 'web',
    categoryLabel: 'Web / Design System',
    role: 'Lead Engineer & Architect',
    timeline: '2026',
    heroImage: 'assets/profile.png',
    github: 'https://github.com/mtarek47/Portfolio-web',
    liveDemo: 'https://tarekparvez.me',
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'Sketch Theme', 'GitHub Pages', 'Cloudflare'],
    architecture: 'Custom Technical Notebook Theme with Pure CSS Design System & Client-Side Store',
    problem: 'Generic portfolio templates fail to convey real software engineering depth, architecture principles, and DevOps automation workflows.',
    solution: 'Handcrafted a bespoke engineering sketchbook theme featuring interactive pipeline telemetry, stack topology diagrams, client-side project stores, and full mobile optimization.',
    keyFeatures: [
      'Custom millimeter dot-grid notebook design system with hand-drawn sketch styling',
      'Interactive visual computing stack schematic and DevOps lifecycle diagrams',
      'Centralized localStorage-backed project management console with GitHub sync',
      '100% responsive fluid mobile layout with zero framework bloat'
    ],
    infrastructure: 'GitHub Pages static hosting configured behind Cloudflare CDN with automated CI caching policies.',
    featured: false
  }
];

const STORAGE_KEY = 'tarek_portfolio_projects_data_v3';

const ProjectsStore = {
  getProjects() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read projects from localStorage:', e);
    }
    return DEFAULT_PROJECTS;
  },

  getProjectById(id) {
    const projects = this.getProjects();
    return projects.find(p => p.id === id) || null;
  },

  saveProject(project) {
    const projects = this.getProjects();
    const index = projects.findIndex(p => p.id === project.id);
    if (index >= 0) {
      projects[index] = { ...projects[index], ...project };
    } else {
      projects.unshift(project);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    return project;
  },

  deleteProject(id) {
    let projects = this.getProjects();
    projects = projects.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    return projects;
  },

  resetDefaults() {
    localStorage.removeItem(STORAGE_KEY);
    return DEFAULT_PROJECTS;
  },

  exportJSON() {
    return JSON.stringify(this.getProjects(), null, 2);
  },

  importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON import:', e);
    }
    return false;
  }
};

window.ProjectsStore = ProjectsStore;
