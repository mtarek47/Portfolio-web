/**
 * PROJECTS RENDERER & FILTER
 * Dynamically loads all projects from ProjectsStore and provides client-side filtering
 */

document.addEventListener('DOMContentLoaded', () => {
  renderProjectsGrid();
  initProjectFilters();
});

function renderProjectsGrid() {
  const container = document.querySelector('.projects-grid');
  if (!container) return;

  const projects = window.ProjectsStore ? window.ProjectsStore.getProjects() : [];
  if (!projects || projects.length === 0) return;

  container.innerHTML = projects.map(p => {
    const techStack = Array.isArray(p.techStack) ? p.techStack : [];
    const tagsHtml = techStack.map(t => `<span class="tech-tag">${t}</span>`).join('');
    
    const keyFeatures = Array.isArray(p.keyFeatures) ? p.keyFeatures : [];
    const highlightsHtml = keyFeatures.slice(0, 3).map(f => `
      <li>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>${f}</span>
      </li>
    `).join('');

    const githubBtn = p.github ? `
      <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
        <i class="devicon-github-original"></i> GitHub
      </a>
    ` : '';

    const demoBtn = p.liveDemo ? `
      <a href="${p.liveDemo}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
        Demo
      </a>
    ` : '';

    return `
      <div class="project-card" data-category="${p.category || 'web'}">
        <div class="project-img-wrapper">
          <img src="${p.heroImage || 'assets/project-enterprise-1.jpg'}" alt="${p.title}" loading="lazy" onerror="this.src='assets/project-enterprise-1.jpg'">
          <span class="project-category-badge">${p.categoryLabel || p.category || 'Project'}</span>
        </div>
        <div class="project-body">
          <h3 class="project-title">${p.title}</h3>
          <div class="project-arch-tag">Architecture: ${p.architecture || 'Modular Architecture'}</div>
          <p class="project-summary">${p.subtitle || p.problem || ''}</p>
          <ul class="project-highlights">
            ${highlightsHtml}
          </ul>
          <div class="project-tags">
            ${tagsHtml}
          </div>
          <div class="project-footer-actions">
            <a href="project-detail.html?id=${encodeURIComponent(p.id)}" class="btn btn-secondary btn-sm">Case Study</a>
            ${githubBtn}
            ${demoBtn}
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Update button total count
  const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
  if (allBtn) {
    allBtn.textContent = `All Projects (${projects.length})`;
  }
}

function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');
      const projectCards = document.querySelectorAll('.project-card');

      projectCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.97)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
