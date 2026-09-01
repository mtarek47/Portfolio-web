/**
 * NEOREK SKETCH PORTFOLIO - MAIN CLIENT SCRIPT
 * Handles navigation, mobile drawer, active states, and interactive notebook widgets
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initMobileDrawer();
  initCopyButtons();
  initPipelineInteractions();
});

/**
 * Highlights active navigation link based on current page URL
 */
function initNavigation() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Normalize href
    const linkPath = href.split('/').pop();
    
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Mobile Drawer Menu Open/Close Logic
 */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    
    // Animate hamburger bars
    const bars = toggleBtn.querySelectorAll('span');
    if (isOpen) {
      bars[0].style.transform = 'translateY(6px) rotate(45deg)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'translateY(-6px) rotate(-45deg)';
    } else {
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    }
  });

  // Close drawer when clicking outside or on a link
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      const bars = toggleBtn.querySelectorAll('span');
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    });
  });
}

/**
 * Click to copy email or code snippets
 */
function initCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalText = btn.innerHTML;
        btn.innerHTML = `<span style="color: var(--accent-green); font-family: var(--font-mono);">✓ Copied!</span>`;
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    });
  });
}

/**
 * Interactive Pipeline Step Click Simulation
 */
function initPipelineInteractions() {
  const steps = document.querySelectorAll('.pipeline-step');
  const terminalOut = document.querySelector('.terminal-snippet code');

  if (!steps.length || !terminalOut) return;

  const terminalCommands = {
    'dev': '<span class="terminal-prompt">$</span> <span class="terminal-cmd">git checkout -b feature/reliability</span>\n<span class="terminal-prompt">$</span> <span class="terminal-cmd">mvn clean test</span>\n<span class="terminal-success">[INFO] BUILD SUCCESS - 0 FAILURES</span>',
    'git': '<span class="terminal-prompt">$</span> <span class="terminal-cmd">git commit -m "feat(api): optimize connection pooling"</span>\n<span class="terminal-prompt">$</span> <span class="terminal-cmd">git push origin main</span>\n<span class="terminal-success">[OK] Remote branch updated -> sha: e7a91bf</span>',
    'ci': '<span class="terminal-prompt">$</span> <span class="terminal-cmd">gh workflow run ci-cd.yml</span>\n<span class="terminal-prompt">$</span> <span class="terminal-cmd">docker build -t tarek/core-service:v2.4 .</span>\n<span class="terminal-success">[DOCKER] Successfully tagged tarek/core-service:v2.4</span>',
    'prod': '<span class="terminal-prompt">$</span> <span class="terminal-cmd">deploy --env=production --health-check</span>\n<span class="terminal-success">[LIVE] Container healthy. 0 HTTP 5xx errors. Ready for traffic!</span>'
  };

  steps.forEach(step => {
    step.addEventListener('click', () => {
      const key = step.getAttribute('data-step') || 'prod';
      if (terminalCommands[key]) {
        terminalOut.innerHTML = terminalCommands[key];
      }
      steps.forEach(s => s.style.borderColor = 'var(--border-ink)');
      step.style.borderColor = 'var(--accent-coral)';
    });
  });
}
