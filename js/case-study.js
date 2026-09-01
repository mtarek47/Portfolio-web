/**
 * CASE STUDY DATA & DETAIL RENDERER
 * Powers technical project deep-dives on project-detail.html
 */

const PROJECT_CASE_STUDIES = {
  'weather-prayer': {
    title: 'Weather & Prayer Times System',
    subtitle: 'Native Android Application with Jetpack Compose & Real-time Sensor APIs',
    category: 'Mobile / Android Engineering',
    role: 'Lead Android & Architecture Developer',
    timeline: '2025',
    heroImage: 'assets/Weather and prayer.png',
    github: 'https://github.com/mtarek47/Weather_and_prayer',
    liveDemo: '#',
    techStack: ['Android', 'Kotlin', 'Jetpack Compose', 'Weather API', 'Earthquake API', 'Geolocation', 'Windy API', 'Coroutines'],
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
    infrastructure: 'Containerized CI/CD build matrix using GitHub Actions to verify linting, unit test coverage, and release APK generation.'
  },
  'blood-connect': {
    title: 'Blood Connect Emergency Network',
    subtitle: 'Full-Stack Native Mobile & Backend Emergency Donor Dispatch Platform',
    category: 'Mobile / Backend Engineering',
    role: 'Full-Stack & Mobile Developer',
    timeline: '2025',
    heroImage: 'assets/blood_connect.jpg',
    github: 'https://github.com/mtarek47/flutter-snake-game',
    liveDemo: '#',
    techStack: ['Kotlin', 'Java', 'Android SDK', 'Express.js', 'Node.js', 'MySQL', 'Firebase Cloud Messaging', 'REST API'],
    architecture: 'Client-Server RESTful Architecture with Push Notifications & Relational Geo-Queries',
    problem: 'Critical emergency blood requests require instantaneous, low-latency donor matching based on blood group compatibility and proximity, ensuring messages reach active donors immediately without failure.',
    solution: 'Engineered a native Android client connected to a secure Express.js REST API with MySQL relational storage. Integrated Firebase Cloud Messaging (FCM) to trigger high-priority alerts with automated delivery verification.',
    keyFeatures: [
      'Proximity-based donor search with indexed MySQL spatial coordinates',
      'Firebase Cloud Messaging dispatch system delivering sub-second emergency notifications',
      'Donor verification lifecycle with secure JWT authentication and privacy masking',
      'Role-based dashboard for request validation and emergency medical team coordination',
      'Optimized connection pooling with MySQL database connection recycling'
    ],
    infrastructure: 'Node.js microservice architecture containerized with Docker and deployed behind an Nginx reverse proxy.'
  },
  'elearning-platform': {
    title: 'Enterprise E-Learning Platform',
    subtitle: 'Java Spring Boot Microservices Architecture with Relational Course Engine',
    category: 'Backend / Enterprise Software',
    role: 'Backend & Database Engineer',
    timeline: '2025',
    heroImage: 'assets/project-enterprise-1.jpg',
    github: 'https://github.com/mtarek47/E-Learning-Platform',
    liveDemo: '#',
    techStack: ['Java', 'Spring Boot', 'Spring Security', 'MySQL', 'Hibernate / JPA', 'REST API', 'Docker'],
    architecture: 'Layered Enterprise Architecture (Controller, Service, Repository, DTO) with Role-Based Access Control (RBAC)',
    problem: 'Educational institutions require scalable course distribution, role-separated management (Student, Instructor, Admin), interactive quiz grading, and progress tracking with high transaction isolation.',
    solution: 'Developed a robust Java Spring Boot backend using Spring Data JPA, Hibernate, and MySQL. Implemented Spring Security with Stateless JWT token authentication and fine-grained method-level security annotations.',
    keyFeatures: [
      'Comprehensive RESTful API endpoints for curriculum management, enrollments, and grading',
      'Stateless JWT authentication with refresh tokens and role-based permissions',
      'Relational schema design with normalized tables, foreign key constraints, and indexing for fast query execution',
      'Transaction-safe course enrollment and automated quiz evaluation pipeline',
      'Docker containerized backend service ready for cloud deployment'
    ],
    infrastructure: 'Multi-stage Docker build producing a slim OpenJDK runtime image; automated JUnit 5 and Mockito integration tests.'
  },
  'project-management': {
    title: 'Project Management & Sprint System',
    subtitle: 'Enterprise Team Collaboration Platform with PostgreSQL & Spring Boot',
    category: 'Full-Stack / Enterprise',
    role: 'Full-Stack Software Engineer',
    timeline: '2025',
    heroImage: 'assets/project-enterprise-2.jpg',
    github: 'https://github.com/mtarek47/Project-Management-System',
    liveDemo: '#',
    techStack: ['Java', 'Spring Boot', 'PostgreSQL', 'React.js', 'REST API', 'Tailwind CSS', 'Docker'],
    architecture: 'Decoupled Client-Server Architecture: React Frontend + Spring Boot Backend + PostgreSQL',
    problem: 'Distributed engineering teams need an intuitive workflow engine supporting task assignment, sprint cycles, roadmap Gantt/timeline visualization, and real-time status reporting.',
    solution: 'Architected a decoupled application featuring a React.js single-page application and a high-performance Spring Boot REST API backed by PostgreSQL. Designed clean relational schemas for hierarchical task trees.',
    keyFeatures: [
      'Interactive Kanban board with drag-and-drop task state transitions',
      'Sprint planning and roadmap tracking with automated velocity computation',
      'Complex SQL queries for team performance metrics and reporting dashboards',
      'Optimistic UI updates for ultra-responsive user interactions',
      'Containerized PostgreSQL database with automated migration scripts'
    ],
    infrastructure: 'Docker Compose orchestration spinning up Spring Boot, PostgreSQL, and React services simultaneously.'
  },
  'ecommerce-web': {
    title: 'Modern E-Commerce Web Application',
    subtitle: 'MERN Stack Online Shopping Platform with State Management & Auth',
    category: 'Web Development / Full-Stack',
    role: 'Full-Stack Web Developer',
    timeline: '2024',
    heroImage: 'assets/project-web-1.jpg',
    github: 'https://github.com/mtarek47/SHOP.CO',
    liveDemo: '#',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'REST API', 'JWT'],
    architecture: 'MERN Architecture with Document-Oriented NoSQL Data Modeling & RESTful APIs',
    problem: 'E-commerce users expect instantaneous product search, seamless cart synchronisation across sessions, and secure checkout flows.',
    solution: 'Constructed an end-to-end full-stack web application using React.js for the client and Express/Node.js on the backend with MongoDB NoSQL storage.',
    keyFeatures: [
      'Dynamic product catalog with multi-attribute filtering (category, price, rating)',
      'Persistent shopping cart with local storage sync and server-side session backup',
      'Secure password hashing with bcrypt and token-based session management',
      'RESTful API architecture handling order placement, status updates, and inventory tracking'
    ],
    infrastructure: 'Node.js runtime deployed with PM2 process manager and environment-driven configuration.'
  },
  'ecommerce-mobile': {
    title: 'E-Commerce Mobile Application',
    subtitle: 'Cross-Platform Mobile App Built with Flutter & Firebase',
    category: 'Mobile / Flutter',
    role: 'Mobile Developer',
    timeline: '2024',
    heroImage: 'assets/ecommerce.jpg',
    github: 'https://github.com/mtarek47/flutter-ecommerce-app',
    liveDemo: '#',
    techStack: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Payment Gateway'],
    architecture: 'Flutter BLoC/Provider State Management with Firebase Serverless Backend',
    problem: 'Shoppers need a fast, native-feeling mobile application for product browsing, secure cart checkout, and instant order confirmations across iOS and Android.',
    solution: 'Built a responsive, cross-platform Flutter application connected directly to Cloud Firestore with real-time listeners and Firebase Authentication.',
    keyFeatures: [
      'Fluid mobile UI with custom Cupertino and Material widgets',
      'Real-time product inventory sync using Firestore streams',
      'Integrated checkout flow and payment gateway interface',
      'User profile management with order history and saved delivery addresses'
    ],
    infrastructure: 'Automated Flutter build pipelines for Android APK and iOS release bundling.'
  },
  'task-management-mobile': {
    title: 'Productivity Task Management App',
    subtitle: 'Offline-First Cross-Platform Task & Time Management App',
    category: 'Mobile / Flutter',
    role: 'Mobile Developer',
    timeline: '2024',
    heroImage: 'assets/project2.jpg',
    github: 'https://github.com/mtarek47/flutter-task-management',
    liveDemo: '#',
    techStack: ['Flutter', 'Dart', 'SQLite', 'Local Notifications', 'State Management'],
    architecture: 'Offline-First Architecture with SQLite Local Database Persistence',
    problem: 'Users require a reliable productivity tool that functions 100% offline with instant local responsiveness and precise scheduled notifications.',
    solution: 'Developed an offline-first mobile app in Flutter utilizing SQLite via sqflite package for local ACID-compliant data storage and Flutter Local Notifications plugin.',
    keyFeatures: [
      'Zero-latency offline data persistence with structured relational SQLite tables',
      'Custom recurrence rules (daily, weekly, monthly) for task reminders',
      'Category tag organization with color-coded priority queues',
      'Responsive design adapting across mobile phones and tablet form factors'
    ],
    infrastructure: 'Static analysis with Dart Analyzer and automated unit testing.'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const caseStudyContainer = document.getElementById('case-study-content');
  if (!caseStudyContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id') || 'weather-prayer';
  const study = PROJECT_CASE_STUDIES[projectId] || PROJECT_CASE_STUDIES['weather-prayer'];

  renderCaseStudy(study, caseStudyContainer);
});

function renderCaseStudy(study, container) {
  document.title = `${study.title} — Case Study | Tarek Parvez`;

  const tagsHtml = study.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('');
  const featuresHtml = study.keyFeatures.map(f => `<li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> ${f}</li>`).join('');

  container.innerHTML = `
    <div class="case-study-hero">
      <div class="container">
        <div class="case-study-header">
          <div class="hero-badge-group">
            <span class="hero-role-badge">${study.category}</span>
            <span class="timeline-period">${study.timeline}</span>
          </div>
          <h1 class="hero-title" style="font-size: 2.75rem; margin-bottom: 0.5rem;">${study.title}</h1>
          <p class="section-subtitle" style="font-family: var(--font-mono); font-size: 0.95rem; margin-bottom: 1.5rem;">${study.subtitle}</p>
          <div class="hero-actions">
            <a href="${study.github}" target="_blank" class="btn btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              View GitHub Repository
            </a>
            <a href="projects.html" class="btn btn-secondary">
              ← Back to All Projects
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="case-study-body">
      <div class="container">
        <div class="case-study-grid">
          <div class="case-study-main">
            <div class="study-section">
              <div class="sketch-card" style="margin-bottom: 2.5rem; overflow: hidden; padding: 0;">
                <img src="${study.heroImage}" alt="${study.title}" style="width: 100%; height: auto; display: block; border-bottom: 2px solid var(--border-ink);">
              </div>

              <h3>1. Engineering Overview & Problem</h3>
              <p>${study.problem}</p>
            </div>

            <div class="study-section">
              <h3>2. Architectural Solution</h3>
              <p>${study.solution}</p>
              <div class="sketch-card accent-blue" style="margin: 1.5rem 0; background: var(--bg-card);">
                <div class="board-header">
                  <span>SYSTEM ARCHITECTURE PATTERN</span>
                  <span class="status-indicator"><span class="status-dot"></span> VERIFIED</span>
                </div>
                <p style="font-family: var(--font-mono); font-size: 0.9rem; color: var(--accent-blue); font-weight: 600; margin: 0;">
                  ${study.architecture}
                </p>
              </div>
            </div>

            <div class="study-section">
              <h3>3. Key Engineering Features</h3>
              <ul class="project-highlights" style="font-size: 0.925rem; gap: 0.65rem;">
                ${featuresHtml}
              </ul>
            </div>

            <div class="study-section">
              <h3>4. Infrastructure & Automation</h3>
              <p>${study.infrastructure}</p>
            </div>
          </div>

          <aside class="case-study-sidebar">
            <div class="study-sidebar-card">
              <span class="paper-tape right">SPECS</span>
              <h4 style="font-family: var(--font-mono); font-size: 0.85rem; text-transform: uppercase; color: var(--accent-blue); margin-bottom: 1.25rem;">Project Metadata</h4>
              
              <div style="margin-bottom: 1.25rem;">
                <span style="font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); display: block;">Engineering Role</span>
                <strong style="font-size: 0.95rem;">${study.role}</strong>
              </div>

              <div style="margin-bottom: 1.25rem;">
                <span style="font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); display: block;">Development Period</span>
                <strong style="font-size: 0.95rem;">${study.timeline}</strong>
              </div>

              <div style="margin-bottom: 1.5rem;">
                <span style="font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 0.5rem;">Technology Stack</span>
                <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
                  ${tagsHtml}
                </div>
              </div>

              <div style="border-top: 1.5px dashed var(--grid-line); padding-top: 1.25rem;">
                <a href="contact.html" class="btn btn-primary" style="width: 100%;">Discuss Similar Project</a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  `;
}
