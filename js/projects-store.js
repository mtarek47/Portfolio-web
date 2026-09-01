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
    timeline: '2025',
    heroImage: 'assets/Weather and prayer.png',
    github: 'https://github.com/mtarek47/Weather_and_prayer',
    liveDemo: '',
    techStack: ['Android SDK', 'Kotlin', 'Jetpack Compose', 'Weather API', 'Coroutines'],
    architecture: 'Clean Architecture with MVVM, Coroutines, StateFlow, and Repository Pattern',
    problem: 'Users in diverse geographical areas need reliable, real-time meteorological conditions, severe earthquake alerts, interactive Doppler radar imagery, and exact astronomical prayer calculation times without battery drain or redundant background polling.',
    solution: 'Designed an asynchronous reactive Android architecture utilizing Jetpack Compose for the declarative UI layer and Kotlin Coroutines for non-blocking concurrent API queries to OpenWeather, USGS Earthquake services, and astronomical calculation engines.',
    keyFeatures: [
      'Declarative modern UI built 100% in Jetpack Compose with custom astronomical compass visuals',
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
    subtitle: 'Full-Stack Native Mobile & Backend Emergency Donor Dispatch Platform',
    category: 'mobile backend',
    categoryLabel: 'Mobile / Full-Stack',
    role: 'Full-Stack & Mobile Developer',
    timeline: '2025',
    heroImage: 'assets/blood_connect.jpg',
    github: 'https://github.com/mtarek47/flutter-snake-game',
    liveDemo: '',
    techStack: ['Kotlin / Java', 'Android SDK', 'Express.js', 'MySQL', 'Firebase FCM'],
    architecture: 'Client-Server RESTful Architecture with Push Notifications & Relational Geo-Queries',
    problem: 'Critical emergency blood requests require instantaneous, low-latency donor matching based on blood group compatibility and proximity, ensuring messages reach active donors immediately without failure.',
    solution: 'Engineered a native Android client connected to a secure Express.js REST API with MySQL relational storage. Integrated Firebase Cloud Messaging (FCM) to trigger high-priority alerts with automated delivery verification.',
    keyFeatures: [
      'Sub-second FCM push notifications for urgent donor requests',
      'Spatial MySQL queries for donor radius matching',
      'Donor verification lifecycle with secure JWT authentication and privacy masking',
      'Express.js REST API with optimized connection pooling'
    ],
    infrastructure: 'Node.js microservice architecture containerized with Docker and deployed behind an Nginx reverse proxy.',
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
    techStack: ['Java', 'Spring Boot', 'MySQL', 'Hibernate / JPA', 'REST API', 'Docker'],
    architecture: 'Layered Enterprise Architecture (Controller, Service, Repository, DTO) with Role-Based Access Control (RBAC)',
    problem: 'Educational institutions require scalable course distribution, role-separated management (Student, Instructor, Admin), interactive quiz grading, and progress tracking with high transaction isolation.',
    solution: 'Developed a robust Java Spring Boot backend using Spring Data JPA, Hibernate, and MySQL. Implemented Spring Security with Stateless JWT token authentication and fine-grained method-level security annotations.',
    keyFeatures: [
      'Comprehensive RESTful API endpoints for curriculum management, enrollments, and grading',
      'Stateless JWT authentication with refresh tokens and role-based permissions',
      'Relational schema design with normalized tables, foreign key constraints, and indexing',
      'Transaction-safe course enrollment and automated quiz evaluation pipeline'
    ],
    infrastructure: 'Multi-stage Docker build producing a slim OpenJDK runtime image; automated JUnit 5 and Mockito integration tests.',
    featured: true
  },
  {
    id: 'project-management',
    title: 'Project Management & Sprint System',
    subtitle: 'Enterprise Team Collaboration Platform with PostgreSQL & Spring Boot',
    category: 'backend enterprise web',
    categoryLabel: 'Full-Stack / Spring Boot',
    role: 'Full-Stack Software Engineer',
    timeline: '2025',
    heroImage: 'assets/project-enterprise-2.jpg',
    github: 'https://github.com/mtarek47/Project-Management-System',
    liveDemo: '',
    techStack: ['Java', 'Spring Boot', 'PostgreSQL', 'React.js', 'REST API'],
    architecture: 'Decoupled Client-Server Architecture: React Frontend + Spring Boot Backend + PostgreSQL',
    problem: 'Distributed engineering teams need an intuitive workflow engine supporting task assignment, sprint cycles, roadmap Gantt/timeline visualization, and real-time status reporting.',
    solution: 'Architected a decoupled application featuring a React.js single-page application and a high-performance Spring Boot REST API backed by PostgreSQL. Designed clean relational schemas for hierarchical task trees.',
    keyFeatures: [
      'Interactive Kanban board with optimistic UI state transitions',
      'Sprint planning and roadmap tracking with automated velocity computation',
      'Complex SQL queries for team performance metrics and reporting dashboards'
    ],
    infrastructure: 'Docker Compose orchestration spinning up Spring Boot, PostgreSQL, and React services simultaneously.',
    featured: true
  },
  {
    id: 'ecommerce-web',
    title: 'Modern E-Commerce Web Platform',
    subtitle: 'MERN Stack Online Shopping Platform with State Management & Auth',
    category: 'web',
    categoryLabel: 'Web / MERN',
    role: 'Full-Stack Web Developer',
    timeline: '2024',
    heroImage: 'assets/project-web-1.jpg',
    github: 'https://github.com/mtarek47/SHOP.CO',
    liveDemo: '',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    architecture: 'MERN Architecture with Document-Oriented NoSQL Data Modeling & RESTful APIs',
    problem: 'E-commerce users expect instantaneous product search, seamless cart synchronisation across sessions, and secure checkout flows.',
    solution: 'Constructed an end-to-end full-stack web application using React.js for the client and Express/Node.js on the backend with MongoDB NoSQL storage.',
    keyFeatures: [
      'React state management for cart synchronization across sessions',
      'Express REST API with MongoDB aggregation queries',
      'Secure password hashing with bcrypt and token-based session management'
    ],
    infrastructure: 'Node.js runtime deployed with PM2 process manager and environment-driven configuration.',
    featured: false
  },
  {
    id: 'ecommerce-mobile',
    title: 'E-Commerce Mobile Application',
    subtitle: 'Cross-Platform Mobile App Built with Flutter & Firebase',
    category: 'mobile',
    categoryLabel: 'Mobile / Flutter',
    role: 'Mobile Developer',
    timeline: '2024',
    heroImage: 'assets/ecommerce.jpg',
    github: 'https://github.com/mtarek47/flutter-ecommerce-app',
    liveDemo: '',
    techStack: ['Flutter', 'Dart', 'Firebase', 'Cloud Firestore', 'Payment Gateway'],
    architecture: 'Flutter BLoC/Provider State Management with Firebase Serverless Backend',
    problem: 'Shoppers need a fast, native-feeling mobile application for product browsing, secure cart checkout, and instant order confirmations across iOS and Android.',
    solution: 'Built a responsive, cross-platform Flutter application connected directly to Cloud Firestore with real-time listeners and Firebase Authentication.',
    keyFeatures: [
      'Real-time Firestore stream listeners for instant stock updates',
      'Cross-platform responsive layout for iOS and Android',
      'Firebase authentication and user profile management'
    ],
    infrastructure: 'Automated Flutter build pipelines for Android APK and iOS release bundling.',
    featured: false
  },
  {
    id: 'task-management-mobile',
    title: 'Productivity Task Management App',
    subtitle: 'Offline-First Cross-Platform Task & Time Management App',
    category: 'mobile',
    categoryLabel: 'Mobile / SQLite',
    role: 'Mobile Developer',
    timeline: '2024',
    heroImage: 'assets/project2.jpg',
    github: 'https://github.com/mtarek47/flutter-task-management',
    liveDemo: '',
    techStack: ['Flutter', 'Dart', 'SQLite', 'Local Notifications'],
    architecture: 'Offline-First Architecture with SQLite Local Database Persistence',
    problem: 'Users require a reliable productivity tool that functions 100% offline with instant local responsiveness and precise scheduled notifications.',
    solution: 'Developed an offline-first mobile app in Flutter utilizing SQLite via sqflite package for local ACID-compliant data storage and Flutter Local Notifications plugin.',
    keyFeatures: [
      '100% offline-first functionality with embedded SQLite database',
      'Scheduled local OS background notification alarms',
      'Fast indexed queries for task filtering by priority and category tags'
    ],
    infrastructure: 'Static analysis with Dart Analyzer and automated unit testing.',
    featured: false
  }
];

const STORAGE_KEY = 'tarek_portfolio_projects_data';

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
