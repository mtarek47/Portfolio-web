/**
 * CASE STUDY DETAIL RENDERER
 * Dynamically renders full technical specs and case studies from ProjectsStore
 */

document.addEventListener('DOMContentLoaded', () => {
  const caseStudyContainer = document.getElementById('case-study-content');
  if (!caseStudyContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id') || 'weather-prayer';

  let study = null;
  if (window.ProjectsStore && typeof window.ProjectsStore.getProjectById === 'function') {
    study = window.ProjectsStore.getProjectById(projectId);
  }

  if (!study) {
    study = {
      title: 'Project Case Study',
      subtitle: 'Technical Architectural Overview',
      category: 'Software Engineering',
      role: 'Software Engineer',
      timeline: '2025',
      heroImage: 'assets/project-enterprise-1.jpg',
      github: 'https://github.com/mtarek47',
      liveDemo: '#',
      techStack: ['Java', 'Spring Boot', 'Docker', 'Linux', 'REST API'],
      architecture: 'Clean Layered Architecture with Decoupled Services',
      problem: 'Detailed problem specification currently being updated in engineering notebook.',
      solution: 'Engineered modular microservices and automated deployment pipelines.',
      keyFeatures: [
        'Automated CI/CD validation matrix',
        'Optimized database queries and connection pooling',
        'Stateless token authentication and RBAC'
      ],
      infrastructure: 'Dockerized microservice deployed with automated health monitoring.'
    };
  }

  renderCaseStudy(study, caseStudyContainer);
});

function renderCaseStudy(study, container) {
  document.title = `${study.title} — Case Study | Tarek Parvez`;

  const techStack = Array.isArray(study.techStack) ? study.techStack : [];
  const tagsHtml = techStack.map(t => `<span class="tech-tag">${t}</span>`).join('');
  
  const keyFeatures = Array.isArray(study.keyFeatures) ? study.keyFeatures : [];
  const featuresHtml = keyFeatures.map(f => `<li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> ${f}</li>`).join('');

  const githubBtn = study.github ? `
    <a href="${study.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
      View GitHub Repository
    </a>
  ` : '';

  const liveDemoBtn = study.liveDemo ? `
    <a href="${study.liveDemo}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
      Live Demo
    </a>
  ` : '';

  container.innerHTML = `
    <div class="case-study-hero">
      <div class="container">
        <div class="case-study-header">
          <div class="hero-badge-group">
            <span class="hero-role-badge">${study.categoryLabel || study.category || 'Engineering'}</span>
            <span class="timeline-period">${study.timeline || '2025'}</span>
          </div>
          <h1 class="hero-title" style="font-size: 2.75rem; margin-bottom: 0.5rem;">${study.title}</h1>
          <p class="section-subtitle" style="font-family: var(--font-mono); font-size: 0.95rem; margin-bottom: 1.5rem;">${study.subtitle || ''}</p>
          <div class="hero-actions">
            ${githubBtn}
            ${liveDemoBtn}
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
                <img src="${study.heroImage || 'assets/project-enterprise-1.jpg'}" alt="${study.title}" style="width: 100%; height: auto; display: block; border-bottom: 2px solid var(--border-ink);" onerror="this.src='assets/project-enterprise-1.jpg'">
              </div>

              <h3>1. Engineering Overview & Problem</h3>
              <p>${study.problem || 'System design solving real-time responsiveness and reliability requirements.'}</p>
            </div>

            <div class="study-section">
              <h3>2. Architectural Solution</h3>
              <p>${study.solution || 'Modular architecture separating concerns cleanly between domain layers.'}</p>
              <div class="sketch-card accent-blue" style="margin: 1.5rem 0; background: var(--bg-card);">
                <div class="board-header">
                  <span>SYSTEM ARCHITECTURE PATTERN</span>
                  <span class="status-indicator"><span class="status-dot"></span> VERIFIED</span>
                </div>
                <p style="font-family: var(--font-mono); font-size: 0.9rem; color: var(--accent-blue); font-weight: 600; margin: 0;">
                  ${study.architecture || 'Clean Layered Architecture with Decoupled Services'}
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
              <p>${study.infrastructure || 'Containerized deployment with continuous testing.'}</p>
            </div>
          </div>

          <aside class="case-study-sidebar">
            <div class="study-sidebar-card">
              <span class="paper-tape right">SPECS</span>
              <h4 style="font-family: var(--font-mono); font-size: 0.85rem; text-transform: uppercase; color: var(--accent-blue); margin-bottom: 1.25rem;">Project Metadata</h4>
              
              <div style="margin-bottom: 1.25rem;">
                <span style="font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); display: block;">Engineering Role</span>
                <strong style="font-size: 0.95rem;">${study.role || 'Software Engineer'}</strong>
              </div>

              <div style="margin-bottom: 1.25rem;">
                <span style="font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); display: block;">Development Period</span>
                <strong style="font-size: 0.95rem;">${study.timeline || '2025'}</strong>
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
