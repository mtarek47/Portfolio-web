/**
 * ADMIN PANEL CLIENT LOGIC
 * Handles client-side authentication, password management, project CRUD operations, and export utilities
 */

const DEFAULT_ADMIN_USER = 'admin';
const DEFAULT_ADMIN_PASS = 'tarek2026';
const CREDS_STORAGE_KEY = 'tarek_portfolio_admin_credentials';
const AUTH_KEY = 'tarek_portfolio_admin_auth';

function getStoredCredentials() {
  try {
    const stored = localStorage.getItem(CREDS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.username && parsed.password) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Could not read credentials from localStorage:', e);
  }
  return { username: DEFAULT_ADMIN_USER, password: DEFAULT_ADMIN_PASS };
}

function saveStoredCredentials(username, password) {
  localStorage.setItem(CREDS_STORAGE_KEY, JSON.stringify({ username, password }));
}

document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initCredentialsModal();
  initProjectForm();
  initImportExport();
});

/**
 * Authentication management
 */
function initAuth() {
  const loginSection = document.getElementById('admin-login-section');
  const dashboardSection = document.getElementById('admin-dashboard-section');
  const loginForm = document.getElementById('login-form');
  const logoutBtn = document.getElementById('logout-btn');
  const authError = document.getElementById('login-error');

  function checkAuthState() {
    const isAuth = sessionStorage.getItem(AUTH_KEY) === 'true';
    if (isAuth) {
      if (loginSection) loginSection.style.display = 'none';
      if (dashboardSection) dashboardSection.style.display = 'block';
      if (logoutBtn) logoutBtn.style.display = 'inline-flex';
      loadProjectsTable();
    } else {
      if (loginSection) loginSection.style.display = 'block';
      if (dashboardSection) dashboardSection.style.display = 'none';
      if (logoutBtn) logoutBtn.style.display = 'none';
    }
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.getElementById('login-username').value.trim();
      const pass = document.getElementById('login-password').value.trim();
      const currentCreds = getStoredCredentials();

      if (user === currentCreds.username && pass === currentCreds.password) {
        sessionStorage.setItem(AUTH_KEY, 'true');
        if (authError) authError.style.display = 'none';
        loginForm.reset();
        checkAuthState();
      } else {
        if (authError) {
          authError.style.display = 'block';
          authError.textContent = 'Invalid username or password. Please try again.';
        }
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem(AUTH_KEY);
      checkAuthState();
    });
  }

  checkAuthState();
}

/**
 * Change Username & Password feature
 */
function initCredentialsModal() {
  const openBtn = document.getElementById('btn-change-creds');
  const modal = document.getElementById('creds-modal');
  const closeBtn = document.getElementById('creds-modal-close');
  const credsForm = document.getElementById('change-creds-form');
  const credsMsg = document.getElementById('change-creds-msg');

  if (!openBtn || !modal || !credsForm) return;

  openBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    const currentCreds = getStoredCredentials();
    document.getElementById('current-username-display').textContent = currentCreds.username;
    if (credsMsg) credsMsg.style.display = 'none';
    credsForm.reset();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  credsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const currentPassInput = document.getElementById('change-current-pass').value.trim();
    const newUsernameInput = document.getElementById('change-new-user').value.trim();
    const newPassInput = document.getElementById('change-new-pass').value.trim();
    const confirmPassInput = document.getElementById('change-confirm-pass').value.trim();

    const currentCreds = getStoredCredentials();

    if (currentPassInput !== currentCreds.password) {
      showCredsMessage('Current password is incorrect.', 'error');
      return;
    }

    if (newPassInput.length < 4) {
      showCredsMessage('New password must be at least 4 characters.', 'error');
      return;
    }

    if (newPassInput !== confirmPassInput) {
      showCredsMessage('New password and confirmation do not match.', 'error');
      return;
    }

    saveStoredCredentials(newUsernameInput || currentCreds.username, newPassInput);
    showCredsMessage('Credentials updated successfully!', 'success');

    setTimeout(() => {
      modal.style.display = 'none';
      showNotification('New username & password saved!');
    }, 1500);
  });

  function showCredsMessage(msg, type) {
    if (!credsMsg) return;
    credsMsg.style.display = 'block';
    credsMsg.style.background = type === 'success' ? 'var(--accent-green-light)' : 'var(--accent-coral-light)';
    credsMsg.style.borderColor = type === 'success' ? 'var(--accent-green)' : 'var(--accent-coral)';
    credsMsg.style.color = type === 'success' ? 'var(--accent-green)' : 'var(--accent-coral)';
    credsMsg.textContent = msg;
  }
}

/**
 * Load and render projects in Admin table
 */
function loadProjectsTable() {
  const listContainer = document.getElementById('admin-projects-list');
  const countBadge = document.getElementById('admin-project-count');
  if (!listContainer) return;

  const projects = window.ProjectsStore ? window.ProjectsStore.getProjects() : [];
  if (countBadge) countBadge.textContent = `${projects.length} Total`;

  if (projects.length === 0) {
    listContainer.innerHTML = `<p style="padding: 2rem; text-align: center; color: var(--text-muted);">No projects found. Add one below!</p>`;
    return;
  }

  listContainer.innerHTML = projects.map(p => {
    const tags = Array.isArray(p.techStack) ? p.techStack.slice(0, 3).join(', ') : '';
    return `
      <div class="sketch-card" style="margin-bottom: 1rem; padding: 1.25rem 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        <div style="flex: 1; min-width: 260px;">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
            <strong style="font-size: 1.15rem;">${p.title}</strong>
            <span class="tech-tag ${p.featured ? 'coral' : ''}" style="font-size: 0.7rem;">${p.categoryLabel || p.category}</span>
            ${p.featured ? '<span class="tech-tag green" style="font-size: 0.65rem;">★ Featured</span>' : ''}
          </div>
          <div style="font-family: var(--font-mono); font-size: 0.775rem; color: var(--text-muted);">
            ID: <code>${p.id}</code> | Stack: ${tags} | Timeline: ${p.timeline || '2025'}
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
          <a href="project-detail.html?id=${encodeURIComponent(p.id)}" target="_blank" class="btn btn-secondary btn-sm" title="Preview Case Study">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            Preview
          </a>
          <button class="btn btn-blue btn-sm btn-edit-project" data-id="${p.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            Edit
          </button>
          <button class="btn btn-secondary btn-sm btn-delete-project" data-id="${p.id}" style="color: var(--accent-coral); border-color: var(--accent-coral);">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            Delete
          </button>
        </div>
      </div>
    `;
  }).join('');

  document.querySelectorAll('.btn-edit-project').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      editProject(id);
    });
  });

  document.querySelectorAll('.btn-delete-project').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (confirm(`Are you sure you want to delete project "${id}"?`)) {
        window.ProjectsStore.deleteProject(id);
        loadProjectsTable();
        showNotification('Project deleted successfully.');
      }
    });
  });
}

/**
 * Project Add/Edit Form Handling
 */
function initProjectForm() {
  const form = document.getElementById('project-form');
  const titleInput = document.getElementById('proj-title');
  const idInput = document.getElementById('proj-id');
  const cancelBtn = document.getElementById('proj-cancel-btn');
  const formTitle = document.getElementById('form-mode-title');

  if (titleInput && idInput) {
    titleInput.addEventListener('input', () => {
      if (!form.getAttribute('data-editing')) {
        idInput.value = titleInput.value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      form.reset();
      form.removeAttribute('data-editing');
      if (formTitle) formTitle.textContent = 'Add New Project';
      if (idInput) idInput.readOnly = false;
      window.scrollTo({ top: document.getElementById('admin-projects-list').offsetTop - 100, behavior: 'smooth' });
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const id = idInput.value.trim();
      const title = titleInput.value.trim();
      if (!id || !title) {
        alert('Project ID and Title are required.');
        return;
      }

      const techStack = document.getElementById('proj-tech').value
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const keyFeatures = document.getElementById('proj-features').value
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean);

      const projectData = {
        id,
        title,
        subtitle: document.getElementById('proj-subtitle').value.trim(),
        category: document.getElementById('proj-category').value.trim(),
        categoryLabel: document.getElementById('proj-category-label').value.trim(),
        role: document.getElementById('proj-role').value.trim() || 'Software Engineer',
        timeline: document.getElementById('proj-timeline').value.trim() || '2025',
        heroImage: document.getElementById('proj-image').value.trim() || 'assets/project-enterprise-1.jpg',
        github: document.getElementById('proj-github').value.trim(),
        liveDemo: document.getElementById('proj-demo').value.trim(),
        techStack,
        architecture: document.getElementById('proj-arch').value.trim(),
        problem: document.getElementById('proj-problem').value.trim(),
        solution: document.getElementById('proj-solution').value.trim(),
        keyFeatures,
        infrastructure: document.getElementById('proj-infra').value.trim(),
        featured: document.getElementById('proj-featured').checked
      };

      window.ProjectsStore.saveProject(projectData);
      form.reset();
      form.removeAttribute('data-editing');
      if (idInput) idInput.readOnly = false;
      if (formTitle) formTitle.textContent = 'Add New Project';

      loadProjectsTable();
      showNotification('Project saved successfully and live across the portfolio!');
      window.scrollTo({ top: document.getElementById('admin-projects-list').offsetTop - 100, behavior: 'smooth' });
    });
  }
}

/**
 * Edit existing project (populates form)
 */
function editProject(id) {
  const project = window.ProjectsStore.getProjectById(id);
  if (!project) return;

  const form = document.getElementById('project-form');
  const formTitle = document.getElementById('form-mode-title');
  const idInput = document.getElementById('proj-id');

  form.setAttribute('data-editing', 'true');
  if (formTitle) formTitle.textContent = `Edit Project: ${project.title}`;

  if (idInput) {
    idInput.value = project.id;
    idInput.readOnly = true;
  }

  document.getElementById('proj-title').value = project.title || '';
  document.getElementById('proj-subtitle').value = project.subtitle || '';
  document.getElementById('proj-category').value = project.category || 'web';
  document.getElementById('proj-category-label').value = project.categoryLabel || '';
  document.getElementById('proj-role').value = project.role || '';
  document.getElementById('proj-timeline').value = project.timeline || '';
  document.getElementById('proj-image').value = project.heroImage || '';
  document.getElementById('proj-github').value = project.github || '';
  document.getElementById('proj-demo').value = project.liveDemo || '';
  document.getElementById('proj-tech').value = (project.techStack || []).join(', ');
  document.getElementById('proj-arch').value = project.architecture || '';
  document.getElementById('proj-problem').value = project.problem || '';
  document.getElementById('proj-solution').value = project.solution || '';
  document.getElementById('proj-features').value = (project.keyFeatures || []).join('\n');
  document.getElementById('proj-infra').value = project.infrastructure || '';
  document.getElementById('proj-featured').checked = !!project.featured;

  form.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Export and Import utilities
 */
function initImportExport() {
  const exportJsonBtn = document.getElementById('btn-export-json');
  const copyCodeBtn = document.getElementById('btn-copy-code');
  const resetBtn = document.getElementById('btn-reset-defaults');
  const importBtn = document.getElementById('btn-import-json');

  if (exportJsonBtn) {
    exportJsonBtn.addEventListener('click', () => {
      const json = window.ProjectsStore.exportJSON();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `portfolio-projects-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showNotification('JSON file exported successfully.');
    });
  }

  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', async () => {
      const projects = window.ProjectsStore.getProjects();
      const jsCode = `const DEFAULT_PROJECTS = ${JSON.stringify(projects, null, 2)};`;
      try {
        await navigator.clipboard.writeText(jsCode);
        showNotification('Copied DEFAULT_PROJECTS JavaScript code to clipboard! You can paste this into js/projects-store.js to commit it to Git.');
      } catch (err) {
        alert('Could not copy code. Check console.');
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all projects to original defaults? Any custom added projects will be reset.')) {
        window.ProjectsStore.resetDefaults();
        loadProjectsTable();
        showNotification('Reset to original default projects catalog.');
      }
    });
  }

  if (importBtn) {
    importBtn.addEventListener('click', () => {
      const jsonStr = prompt('Paste your Projects JSON string here:');
      if (jsonStr) {
        const success = window.ProjectsStore.importJSON(jsonStr);
        if (success) {
          loadProjectsTable();
          showNotification('Projects imported successfully!');
        } else {
          alert('Invalid JSON format. Please check your data.');
        }
      }
    });
  }
}

function showNotification(msg) {
  const notif = document.createElement('div');
  notif.className = 'sketch-card accent-blue';
  notif.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 9999;
    padding: 1rem 1.5rem;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    background: var(--bg-card);
    display: flex;
    align-items: center;
    gap: 0.65rem;
    animation: slideUp 0.3s ease;
  `;
  notif.innerHTML = `
    <span class="status-dot"></span>
    <span>${msg}</span>
  `;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 4000);
}
