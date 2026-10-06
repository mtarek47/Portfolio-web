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
    id: 'ai-riverguard',
    title: 'AI RiverGuard: Satellite & ML Erosion System',
    subtitle: 'Satellite Remote Sensing & Deep Learning for River Erosion & Sand Mining Monitoring',
    category: 'backend enterprise web',
    categoryLabel: 'AI / GIS / Computer Vision',
    role: 'GIS & ML Systems Architect',
    timeline: '2026',
    heroImage: 'assets/project-enterprise-2.jpg',
    github: 'https://github.com/mtarek47/Ai-RiverGurd',
    liveDemo: '',
    techStack: ['Python', 'FastAPI', 'PyTorch U-Net', 'Sentinel-1/2 SAR', 'PostgreSQL + PostGIS', 'React-Leaflet'],
    architecture: 'Satellite Remote Sensing ML Pipeline + GeoSpatial Engine + Interactive GIS Dashboard',
    problem: 'Severe riverbank erosion (Jamuna, Padma, Meghna), illegal sand mining, and river encroachment in Bangladesh displace thousands of families annually, but monitoring has historically relied on slow, manual field surveys.',
    solution: 'Engineered an enterprise GIS and Machine Learning platform combining Sentinel-1 SAR and Sentinel-2 multispectral satellite imagery, PyTorch U-Net water body segmentation, NDWI indices, and PostGIS spatial queries to detect bank shifts and encroachment in real-time.',
    keyFeatures: [
      'PyTorch U-Net deep learning water segmentation & NDWI spectral analysis pipeline',
      'Temporal erosion rate analytics with UTM Zone 45N EPSG:32645 exact metric area projections',
      'Asynchronous satellite image processing queue powered by Celery & Redis',
      'Interactive React-Leaflet GIS dashboard with multi-layer Esri & CartoDB overlays'
    ],
    infrastructure: 'FastAPI microservices with PostGIS spatial indexing and Dockerized Celery background workers.',
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
    id: 'smart-escape',
    title: 'Smart Escape: Interactive Evacuation Simulator',
    subtitle: 'Lowest-Cost Evacuation Route Simulator with Real-Time Hazard Pathfinding',
    category: 'web',
    categoryLabel: 'Web / Algorithms / Graph',
    role: 'Solo Algorithm & Web Developer',
    timeline: '2026',
    heroImage: 'assets/project-web-1.jpg',
    github: 'https://github.com/mtarek47/Smart-Escape',
    liveDemo: 'https://mtarek47.github.io/Smart-Escape/',
    techStack: ['JavaScript', 'HTML5 Canvas', 'Graph Algorithms', 'Dijkstra / A*', 'CSS3'],
    architecture: 'Client-Side Graph-Theoretic Pathfinding Engine with Interactive Canvas Rendering',
    problem: 'Emergency building evacuation simulations often require complex heavy software and fail to provide fast, interactive, real-time recalculation of safe routes when exits or hallways are blocked by sudden hazards (fire, smoke, debris).',
    solution: 'Developed a standalone, zero-dependency browser application that models building floorplans as weighted node graphs, calculating the safest lowest-cost evacuation path instantly upon dynamic hazard placement.',
    keyFeatures: [
      'Real-time graph pathfinding recalculation upon dynamic hazard placement and exit blockages',
      'Interactive floorplan canvas with node weight customization and hazard radius simulation',
      'Bilingual user interface (English & Bengali) designed for maximum accessibility',
      '100% offline-ready single-file architecture with zero external runtime dependencies'
    ],
    infrastructure: 'Hosted on GitHub Pages with instant client-side execution.',
    featured: false
  },
  {
    id: 'smart-buy-pos',
    title: 'Smart Buy: Modern Web POS System',
    subtitle: 'Production-Grade, Offline-First Point of Sale for Supershop, Retail & Pharmacy',
    category: 'web enterprise backend',
    categoryLabel: 'Enterprise / Docker / Node.js',
    role: 'Full-Stack Software Engineer',
    timeline: '2026',
    heroImage: 'assets/project-enterprise-1.jpg',
    github: 'https://github.com/mtarek47/ShopManagement',
    liveDemo: '',
    techStack: ['Node.js', 'PostgreSQL', 'Docker Compose', 'JavaScript', 'HTML5/CSS3', 'REST API'],
    architecture: 'Containerized Client-Server Architecture with PostgreSQL Persistence & Web UI',
    problem: 'Traditional retail POS software is bloated, platform-locked (Windows-only), difficult to install, and fails when local hardware changes or internet connectivity is intermittent.',
    solution: 'Architected a lightweight, fully containerized web POS system orchestrated with Docker Compose. Runs seamlessly across macOS, Linux, and Windows with a single command, featuring barcode scanning, inventory tracking, invoice printing, and analytics.',
    keyFeatures: [
      'Single-command deployment with Docker Compose (zero local database config required)',
      'High-speed barcode scanning, cart calculation, and thermal receipt generation',
      'Real-time inventory decrementing with low-stock warning thresholds and supplier logging',
      'Comprehensive sales reporting dashboards and daily transaction reconciliation'
    ],
    infrastructure: 'Multi-container Docker Compose setup binding Node.js backend and PostgreSQL database.',
    featured: true
  },
  {
    id: 'ticket-booking-nismp',
    title: 'NISMP: Multi-Modal Transport Booking Platform',
    subtitle: 'National Integrated Smart Mobility Platform for Bus, Train, Launch & Flight',
    category: 'web enterprise backend',
    categoryLabel: 'Enterprise / React 19 / TypeScript',
    role: 'Lead Architect & Full-Stack Developer',
    timeline: '2026',
    heroImage: 'assets/project-enterprise-2.jpg',
    github: 'https://github.com/mtarek47/Ticket-booking',
    liveDemo: '',
    techStack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Express.js', 'Prisma ORM', 'PostgreSQL', 'Docker'],
    architecture: 'Decoupled Client-Server Enterprise Architecture: React 19 SPA + Express TypeScript + Prisma ORM',
    problem: 'Commuters and travelers in Bangladesh face fragmented booking experiences across different transportation sectors (Bus, Train, Launch, Flight), lacking a single unified platform with real-time seat locking and instant digital tickets.',
    solution: 'Engineered an enterprise-grade multi-modal transit ticketing platform featuring over 60+ transport management REST endpoints, optimistic seat locking algorithms, digital wallet integrations, and responsive cross-device UI.',
    keyFeatures: [
      'Multi-modal transit booking engine covering nationwide Bus, Rail, River Launch, and Domestic Flights',
      'High-concurrency seat locking mechanism preventing double-booking race conditions',
      'Express.js + TypeScript backend with 60+ REST endpoints and Prisma PostgreSQL ORM',
      'Modern glassmorphic UI built in React 19, Vite, and Tailwind CSS with instant search filters'
    ],
    infrastructure: 'Docker Compose local development orchestration with automated Prisma database migrations.',
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
    liveDemo: 'https://mtarek47.github.io/devfest-242-15-882/',
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'AI Document Parsing', 'Procurement Specs', 'REST API'],
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
    title: 'Project Management & Sprint System',
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
    id: 'expensio',
    title: 'Expensio: Tour & Expense Manager',
    subtitle: 'DBMS Relational Expense Splitter & Dual-Approval Settlement Platform',
    category: 'web backend',
    categoryLabel: 'DBMS / Full-Stack / MySQL',
    role: 'Database & Backend Developer',
    timeline: '2025',
    heroImage: 'assets/project-web-1.jpg',
    github: 'https://github.com/asikafridi/expensio',
    liveDemo: '',
    techStack: ['Node.js', 'Express.js', 'MySQL 8.0', 'Triggers & Procedures', 'HTML5/CSS3', 'JavaScript'],
    architecture: 'Relational Database Management System (RDBMS) with Stored Procedures, Views & REST API',
    problem: 'Group tours and shared ventures often result in complex financial disputes, uneven bill splitting, and unverified payments that are difficult to track manually.',
    solution: 'Designed an advanced relational database system with MySQL stored procedures, triggers, and views coupled with a Node/Express backend that calculates individual dues automatically and enforces a two-step payment approval workflow.',
    keyFeatures: [
      'Automated equal and weighted bill splitting algorithms across multi-member groups',
      'Two-step payment verification and settlement workflow preventing unconfirmed transactions',
      'Advanced MySQL database triggers, views, and integrity constraints ensuring zero data anomalies',
      'Optional business module for tracking capital investment and profit-sharing dividends'
    ],
    infrastructure: 'Node.js runtime backed by optimized MySQL connection pooling and stored procedures.',
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
    id: 'belles-pantry',
    title: "Belle's Pantry: Culinary Business Web",
    subtitle: 'Modern 5-Page Commercial Brochure Platform with Interactive UI',
    category: 'web',
    categoryLabel: 'Web / React 18 / Vite',
    role: 'Frontend Web Engineer',
    timeline: '2025',
    heroImage: 'assets/project2.jpg',
    github: 'https://github.com/mtarek47',
    liveDemo: '',
    techStack: ['React 18', 'Vite', 'React Router', 'CSS3 Design System', 'Web3Forms'],
    architecture: 'Single Page Application (SPA) with Client-Side Routing and Serverless Form Handlers',
    problem: 'Artisan culinary and boutique food businesses need an elegant, fast-loading digital presence to showcase artisanal offerings, communicate culinary philosophy, and capture catering inquiries.',
    solution: 'Developed a responsive, modern business website using React 18 and Vite featuring seamless client-side page transitions, accordion FAQ widgets, and serverless Web3Forms integration.',
    keyFeatures: [
      'Full 5-page commercial architecture (Home, About, Services/Offerings, FAQ, Contact)',
      'Accessible native accordion interaction for customer inquiries and FAQs',
      'Serverless email dispatch integration via Web3Forms API with client-side validation',
      'Pure CSS layout with responsive typography and fluid image galleries'
    ],
    infrastructure: 'Vite build pipeline optimized for lightning-fast production bundle sizes.',
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

const STORAGE_KEY = 'tarek_portfolio_projects_data_v4';

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
