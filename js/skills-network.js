/**
 * INTERACTIVE SKILLS & ARCHITECTURE CONSTELLATION GRAPH
 * Pure HTML5 Canvas + Force-Directed Spring Physics Simulation
 * Inspired by interactive network graphs (Apple-grade Liquid Glass integration)
 * Zero Text Collisions: Smart adaptive labeling with floating glass inspector
 */

(function () {
  'use strict';

  const SKILLS_DATA = {
    clusters: {
      devops:  { id: 'devops',  name: 'DevOps & Infra',       color: '#f97316', lightColor: 'rgba(249, 115, 22, 0.16)', cx: 0.52, cy: 0.22 },
      backend: { id: 'backend', name: 'Backend & APIs',       color: '#2563eb', lightColor: 'rgba(37, 99, 235, 0.16)', cx: 0.70, cy: 0.44 },
      data:    { id: 'data',    name: 'Databases & Storage',  color: '#eab308', lightColor: 'rgba(234, 179, 8, 0.16)', cx: 0.72, cy: 0.74 },
      security:{ id: 'security',name: 'Security & Protocols', color: '#ec4899', lightColor: 'rgba(236, 72, 153, 0.16)', cx: 0.50, cy: 0.62 },
      frontend:{ id: 'frontend',name: 'Web & Mobile UI',      color: '#06b6d4', lightColor: 'rgba(6, 182, 212, 0.16)', cx: 0.24, cy: 0.58 },
      arch:    { id: 'arch',    name: 'Architecture & SOLID', color: '#8b5cf6', lightColor: 'rgba(139, 92, 246, 0.16)', cx: 0.26, cy: 0.30 }
    },
    nodes: [
      // DevOps Cluster (Orange)
      { id: 'docker', label: 'Docker', cluster: 'devops', radius: 21, isHub: true, desc: 'Multi-stage container builds & microservice containerization' },
      { id: 'compose', label: 'Docker Compose', cluster: 'devops', radius: 14, desc: 'Multi-container application orchestration & network topology' },
      { id: 'linux', label: 'Linux Admin', cluster: 'devops', radius: 17, desc: 'systemd service units, cron, process monitoring & permissions' },
      { id: 'cicd', label: 'CI/CD Pipelines', cluster: 'devops', radius: 16, desc: 'Automated test, build and production delivery automation' },
      { id: 'gh_actions', label: 'GitHub Actions', cluster: 'devops', radius: 14, desc: 'Custom declarative workflow runners & automation' },
      { id: 'nginx', label: 'Nginx', cluster: 'devops', radius: 13, desc: 'High-performance reverse proxy & SSL termination' },
      { id: 'bash', label: 'Bash Scripting', cluster: 'devops', radius: 12, desc: 'Infrastructure automation & server maintenance' },

      // Backend & Core APIs Cluster (Blue)
      { id: 'java', label: 'Java 17/21', cluster: 'backend', radius: 18, desc: 'Enterprise OOP, Concurrency, JVM performance tuning' },
      { id: 'spring', label: 'Spring Boot 3', cluster: 'backend', radius: 23, isHub: true, desc: 'Production backend architecture, REST controllers & DI' },
      { id: 'spring_sec', label: 'Spring Security', cluster: 'backend', radius: 14, desc: 'Stateless auth filters, role-based access control & RBAC' },
      { id: 'jpa', label: 'Spring Data JPA', cluster: 'backend', radius: 15, desc: 'Hibernate ORM, schema mapping & query optimization' },
      { id: 'nodejs', label: 'Node.js', cluster: 'backend', radius: 16, desc: 'Asynchronous event loop, non-blocking I/O microservices' },
      { id: 'express', label: 'Express.js', cluster: 'backend', radius: 14, desc: 'Modular middleware, route handlers & JSON APIs' },
      { id: 'rest', label: 'REST APIs', cluster: 'backend', radius: 17, desc: 'Standardized HTTP contracts, status codes & OpenAPI spec' },

      // Database Cluster (Yellow/Gold)
      { id: 'postgres', label: 'PostgreSQL', cluster: 'data', radius: 20, isHub: true, desc: 'ACID transactions, relational modeling, complex indexing' },
      { id: 'mysql', label: 'MySQL', cluster: 'data', radius: 15, desc: 'Relational data management & query performance' },
      { id: 'mongodb', label: 'MongoDB', cluster: 'data', radius: 15, desc: 'Flexible document schemas & aggregation pipelines' },
      { id: 'redis', label: 'Redis', cluster: 'data', radius: 14, desc: 'Fast in-memory cache, pub/sub & rate limiting' },
      { id: 'sqlite', label: 'SQLite / Room', cluster: 'data', radius: 13, desc: 'Embedded zero-latency persistence for mobile & local storage' },

      // Frontend & Mobile Cluster (Cyan/Teal)
      { id: 'react', label: 'React.js', cluster: 'frontend', radius: 20, isHub: true, desc: 'Modular component architecture, custom hooks & SPA state' },
      { id: 'js_ts', label: 'JavaScript ES6+', cluster: 'frontend', radius: 16, desc: 'Modern async/await, closures & client runtime logic' },
      { id: 'html_css', label: 'HTML5 / CSS3', cluster: 'frontend', radius: 14, desc: 'Semantic layout, liquid glassmorphism, responsive grid' },
      { id: 'kotlin', label: 'Kotlin', cluster: 'frontend', radius: 18, desc: 'Native Android architecture, Coroutines & Flow' },
      { id: 'compose_ui', label: 'Jetpack Compose', cluster: 'frontend', radius: 15, desc: 'Declarative reactive UI framework for modern Android' },
      { id: 'flutter', label: 'Flutter / Dart', cluster: 'frontend', radius: 15, desc: 'Cross-platform mobile apps for Android & iOS' },

      // Architecture & Systems (Purple)
      { id: 'sys_design', label: 'System Design', cluster: 'arch', radius: 21, isHub: true, desc: 'Tiered architecture, decoupled services & fault tolerance' },
      { id: 'clean_code', label: 'Clean Architecture', cluster: 'arch', radius: 15, desc: 'SOLID design principles, domain separation & testability' },
      { id: 'git', label: 'Git & GitHub', cluster: 'arch', radius: 16, desc: 'Collaborative branching workflows & release management' },

      // Security & Protocols (Pink/Magenta)
      { id: 'jwt', label: 'JWT & OAuth2', cluster: 'security', radius: 16, isHub: true, desc: 'Stateless bearer tokens, token signing & security claims' },
      { id: 'websocket', label: 'WebSockets', cluster: 'security', radius: 13, desc: 'Full-duplex real-time communication & live event streaming' }
    ],
    links: [
      { source: 'spring', target: 'java', weight: 4 },
      { source: 'spring', target: 'spring_sec', weight: 3 },
      { source: 'spring', target: 'jpa', weight: 3 },
      { source: 'spring', target: 'postgres', weight: 3 },
      { source: 'spring', target: 'docker', weight: 3 },
      { source: 'spring', target: 'rest', weight: 4 },
      { source: 'spring', target: 'jwt', weight: 3 },
      { source: 'spring_sec', target: 'jwt', weight: 4 },
      { source: 'jpa', target: 'postgres', weight: 4 },
      { source: 'jpa', target: 'mysql', weight: 3 },
      { source: 'postgres', target: 'redis', weight: 2 },
      { source: 'docker', target: 'compose', weight: 4 },
      { source: 'docker', target: 'linux', weight: 4 },
      { source: 'docker', target: 'cicd', weight: 4 },
      { source: 'docker', target: 'gh_actions', weight: 3 },
      { source: 'docker', target: 'nginx', weight: 3 },
      { source: 'docker', target: 'sys_design', weight: 3 },
      { source: 'cicd', target: 'gh_actions', weight: 4 },
      { source: 'cicd', target: 'git', weight: 3 },
      { source: 'linux', target: 'bash', weight: 3 },
      { source: 'linux', target: 'nginx', weight: 3 },
      { source: 'nodejs', target: 'express', weight: 4 },
      { source: 'nodejs', target: 'js_ts', weight: 4 },
      { source: 'nodejs', target: 'mongodb', weight: 3 },
      { source: 'nodejs', target: 'websocket', weight: 3 },
      { source: 'express', target: 'rest', weight: 4 },
      { source: 'react', target: 'js_ts', weight: 4 },
      { source: 'react', target: 'html_css', weight: 3 },
      { source: 'react', target: 'rest', weight: 3 },
      { source: 'react', target: 'jwt', weight: 2 },
      { source: 'kotlin', target: 'compose_ui', weight: 4 },
      { source: 'kotlin', target: 'sqlite', weight: 3 },
      { source: 'kotlin', target: 'rest', weight: 3 },
      { source: 'flutter', target: 'sqlite', weight: 3 },
      { source: 'flutter', target: 'rest', weight: 3 },
      { source: 'sys_design', target: 'clean_code', weight: 3 },
      { source: 'sys_design', target: 'spring', weight: 4 },
      { source: 'sys_design', target: 'docker', weight: 3 },
      { source: 'sys_design', target: 'postgres', weight: 3 },
      { source: 'clean_code', target: 'java', weight: 2 },
      { source: 'clean_code', target: 'git', weight: 2 }
    ]
  };

  class SkillsConstellation {
    constructor(canvas, tooltip, container) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.tooltip = tooltip;
      this.container = container;

      this.nodes = [];
      this.links = [];
      this.nodeMap = new Map();
      this.activeCluster = 'all';

      this.width = 0;
      this.height = 0;
      this.dpr = window.devicePixelRatio || 1;

      // Mouse & touch interaction state
      this.hoveredNode = null;
      this.draggedNode = null;
      this.mousePos = { x: -1000, y: -1000 };
      this.isMouseDown = false;

      // Energy pulses traveling along edges (only on explicit user trigger)
      this.pulses = [];

      // Time tracker for floating animation
      this.time = 0;

      this.initData();
      this.bindEvents();
      this.resize();
      this.animate = this.animate.bind(this);
      requestAnimationFrame(this.animate);

      // Automated continuous pulse loop has been REMOVED per user request
    }

    initData() {
      const { nodes, links, clusters } = SKILLS_DATA;

      this.nodes = nodes.map(n => {
        const cluster = clusters[n.cluster] || {};
        const node = {
          ...n,
          color: cluster.color || '#2563eb',
          lightColor: cluster.lightColor || 'rgba(37,99,235,0.16)',
          clusterName: cluster.name || 'General',
          x: 0,
          y: 0,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          pinned: false,
          baseRadius: n.radius,
          currentRadius: n.radius,
          isHub: !!n.isHub
        };
        this.nodeMap.set(n.id, node);
        return node;
      });

      this.links = links.map(l => ({
        source: this.nodeMap.get(l.source),
        target: this.nodeMap.get(l.target),
        weight: l.weight || 1
      })).filter(l => l.source && l.target);
    }

    resize() {
      const rect = this.container.getBoundingClientRect();
      this.width = rect.width;
      this.height = Math.max(540, Math.min(window.innerHeight * 0.70, 620));

      this.canvas.width = this.width * this.dpr;
      this.canvas.height = this.height * this.dpr;
      this.canvas.style.width = `${this.width}px`;
      this.canvas.style.height = `${this.height}px`;
      this.ctx.scale(this.dpr, this.dpr);

      // Seed positions with generous spacing across the canvas
      const { clusters } = SKILLS_DATA;
      this.nodes.forEach(n => {
        const c = clusters[n.cluster];
        if (n.x === 0 && n.y === 0) {
          const cx = (c.cx || 0.5) * this.width;
          const cy = (c.cy || 0.5) * this.height;
          const jitter = 60;
          n.x = cx + (Math.random() - 0.5) * jitter;
          n.y = cy + (Math.random() - 0.5) * jitter;
        }
      });
    }

    bindEvents() {
      window.addEventListener('resize', () => this.resize());

      const getPos = (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
          x: clientX - rect.left,
          y: clientY - rect.top
        };
      };

      const handlePointerMove = (e) => {
        const pos = getPos(e);
        this.mousePos = pos;

        if (this.draggedNode) {
          this.draggedNode.x = pos.x;
          this.draggedNode.y = pos.y;
          this.draggedNode.vx = 0;
          this.draggedNode.vy = 0;
          return;
        }

        let found = null;
        for (let i = this.nodes.length - 1; i >= 0; i--) {
          const n = this.nodes[i];
          const dx = pos.x - n.x;
          const dy = pos.y - n.y;
          if (dx * dx + dy * dy <= (n.radius + 10) * (n.radius + 10)) {
            found = n;
            break;
          }
        }

        if (found !== this.hoveredNode) {
          this.hoveredNode = found;
          this.updateTooltip(found, pos);
          this.canvas.style.cursor = found ? 'grab' : 'default';
        } else if (found) {
          this.updateTooltipPos(pos);
        }
      };

      const handlePointerDown = (e) => {
        const pos = getPos(e);
        this.isMouseDown = true;

        for (let i = this.nodes.length - 1; i >= 0; i--) {
          const n = this.nodes[i];
          const dx = pos.x - n.x;
          const dy = pos.y - n.y;
          if (dx * dx + dy * dy <= (n.radius + 12) * (n.radius + 12)) {
            this.draggedNode = n;
            n.pinned = true;
            this.canvas.style.cursor = 'grabbing';
            break;
          }
        }
      };

      const handlePointerUp = () => {
        this.isMouseDown = false;
        if (this.draggedNode) {
          this.draggedNode.pinned = false;
          this.draggedNode = null;
          this.canvas.style.cursor = this.hoveredNode ? 'grab' : 'default';
        }
      };

      this.canvas.addEventListener('mousemove', handlePointerMove);
      this.canvas.addEventListener('mousedown', handlePointerDown);
      window.addEventListener('mouseup', handlePointerUp);

      this.canvas.addEventListener('touchstart', (e) => {
        handlePointerDown(e);
      }, { passive: true });

      this.canvas.addEventListener('touchmove', (e) => {
        handlePointerMove(e);
      }, { passive: true });

      this.canvas.addEventListener('touchend', handlePointerUp);

      this.canvas.addEventListener('mouseleave', () => {
        this.hoveredNode = null;
        this.hideTooltip();
        this.canvas.style.cursor = 'default';
      });
    }

    updateTooltip(node, pos) {
      if (!this.tooltip) return;
      if (!node) {
        this.hideTooltip();
        return;
      }

      const connected = [];
      this.links.forEach(l => {
        if (l.source.id === node.id) connected.push(l.target.label);
        if (l.target.id === node.id) connected.push(l.source.label);
      });

      const tagsHtml = connected.slice(0, 6).map(t => `<span class="graph-tag">${t}</span>`).join('');

      this.tooltip.innerHTML = `
        <div class="graph-tooltip-header">
          <span class="graph-tooltip-dot" style="background: ${node.color}; box-shadow: 0 0 10px ${node.color};"></span>
          <span class="graph-tooltip-title">${node.label}</span>
        </div>
        <div class="graph-tooltip-cluster" style="color: ${node.color};">${node.clusterName}</div>
        <p class="graph-tooltip-desc">${node.desc}</p>
        ${connected.length > 0 ? `
          <div class="graph-tooltip-connections">
            <span class="conn-label">Connected Stack:</span>
            <div class="conn-tags">${tagsHtml}</div>
          </div>
        ` : ''}
      `;

      this.tooltip.style.display = 'block';
      this.tooltip.style.opacity = '1';
      this.updateTooltipPos(pos);
    }

    updateTooltipPos(pos) {
      if (!this.tooltip) return;
      const pad = 20;
      const tooltipRect = this.tooltip.getBoundingClientRect();
      const contRect = this.container.getBoundingClientRect();

      let left = pos.x + pad;
      let top = pos.y + pad;

      if (left + tooltipRect.width > contRect.width - 15) {
        left = pos.x - tooltipRect.width - pad;
      }
      if (top + tooltipRect.height > contRect.height - 15) {
        top = pos.y - tooltipRect.height - pad;
      }

      this.tooltip.style.transform = `translate3d(${Math.max(12, left)}px, ${Math.max(12, top)}px, 0)`;
    }

    hideTooltip() {
      if (!this.tooltip) return;
      this.tooltip.style.opacity = '0';
      setTimeout(() => {
        if (!this.hoveredNode) {
          this.tooltip.style.display = 'none';
        }
      }, 200);
    }

    filterCluster(clusterId) {
      this.activeCluster = clusterId;
      this.triggerEnergyPulse();
    }

    triggerEnergyPulse() {
      this.links.forEach(link => {
        this.pulses.push({
          source: link.source,
          target: link.target,
          progress: 0,
          speed: 0.025 + Math.random() * 0.02,
          color: link.source.color
        });
      });
    }

    resetPhysics() {
      const { clusters } = SKILLS_DATA;
      this.nodes.forEach(n => {
        const c = clusters[n.cluster];
        const cx = (c.cx || 0.5) * this.width;
        const cy = (c.cy || 0.5) * this.height;
        n.x = cx + (Math.random() - 0.5) * 60;
        n.y = cy + (Math.random() - 0.5) * 60;
        n.vx = 0;
        n.vy = 0;
      });
      this.triggerEnergyPulse();
    }

    updatePhysics() {
      const { clusters } = SKILLS_DATA;
      const damping = 0.86;
      const chargeStrength = 2200; // Strong repulsion prevents clustering & collisions
      const centerGravity = 0.007; // Gentle cluster anchoring
      const springLength = 105;    // Balanced spring spacing
      const springStiffness = 0.035;

      this.time += 0.02;

      // 1. Center Pull & Cluster Gravity
      this.nodes.forEach(n => {
        if (n.pinned) return;

        const c = clusters[n.cluster];
        const targetX = (c.cx || 0.5) * this.width;
        const targetY = (c.cy || 0.5) * this.height;

        n.vx += (targetX - n.x) * centerGravity;
        n.vy += (targetY - n.y) * centerGravity;

        // Subtle organic float
        n.vx += Math.sin(this.time + n.radius * 0.3) * 0.06;
        n.vy += Math.cos(this.time + n.radius * 0.3) * 0.06;
      });

      // 2. Node-to-Node Coulomb Repulsion (Generous distance keeps nodes apart)
      for (let i = 0; i < this.nodes.length; i++) {
        const n1 = this.nodes[i];
        for (let j = i + 1; j < this.nodes.length; j++) {
          const n2 = this.nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const distSq = dx * dx + dy * dy || 1;
          const minDist = n1.radius + n2.radius + 36;

          if (distSq < minDist * minDist * 4) {
            const dist = Math.sqrt(distSq);
            const force = (chargeStrength / distSq);
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;

            if (!n1.pinned) { n1.vx -= fx; n1.vy -= fy; }
            if (!n2.pinned) { n2.vx += fx; n2.vy += fy; }
          }
        }
      }

      // 3. Link Springs (Hooke's Law)
      this.links.forEach(link => {
        const s = link.source;
        const t = link.target;
        const dx = t.x - s.x;
        const dy = t.y - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        
        const targetLen = s.cluster === t.cluster ? springLength : springLength * 1.4;
        const force = (dist - targetLen) * springStiffness * (link.weight * 0.25 + 0.75);

        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;

        if (!s.pinned) { s.vx += fx; s.vy += fy; }
        if (!t.pinned) { t.vx += fx; t.vy += fy; }
      });

      // 4. Boundary Collision & Velocity Integration
      const pad = 48;
      this.nodes.forEach(n => {
        if (!n.pinned) {
          n.vx *= damping;
          n.vy *= damping;
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < pad) { n.x = pad; n.vx *= -0.5; }
          if (n.x > this.width - pad) { n.x = this.width - pad; n.vx *= -0.5; }
          if (n.y < pad) { n.y = pad; n.vy *= -0.5; }
          if (n.y > this.height - pad) { n.y = this.height - pad; n.vy *= -0.5; }
        }
      });

      // 5. Update Pulses
      for (let i = this.pulses.length - 1; i >= 0; i--) {
        const p = this.pulses[i];
        p.progress += p.speed;
        if (p.progress >= 1) {
          this.pulses.splice(i, 1);
        }
      }
    }

    render() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.width, this.height);

      const isHovering = !!this.hoveredNode;
      const hoveredId = this.hoveredNode ? this.hoveredNode.id : null;

      // Find neighbor set for hover highlight
      const neighbors = new Set();
      if (this.hoveredNode) {
        neighbors.add(this.hoveredNode.id);
        this.links.forEach(l => {
          if (l.source.id === hoveredId) neighbors.add(l.target.id);
          if (l.target.id === hoveredId) neighbors.add(l.source.id);
        });
      }

      // 1. Draw Links
      this.links.forEach(l => {
        const s = l.source;
        const t = l.target;

        const isConnected = isHovering && (s.id === hoveredId || t.id === hoveredId);
        const matchesFilter = this.activeCluster === 'all' || s.cluster === this.activeCluster || t.cluster === this.activeCluster;

        let alpha = 0.22;
        let lineWidth = l.weight * 0.95;

        if (isHovering) {
          if (isConnected) {
            alpha = 0.90;
            lineWidth = l.weight * 1.8 + 1.2;
          } else {
            alpha = 0.05;
          }
        } else if (!matchesFilter) {
          alpha = 0.06;
        }

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(t.x, t.y);

        if (isConnected) {
          const grad = ctx.createLinearGradient(s.x, s.y, t.x, t.y);
          grad.addColorStop(0, s.color);
          grad.addColorStop(1, t.color);
          ctx.strokeStyle = grad;
          ctx.shadowColor = s.color;
          ctx.shadowBlur = 10;
        } else {
          ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
          ctx.shadowBlur = 0;
        }

        ctx.lineWidth = lineWidth;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // 2. Draw Energy Pulses
      this.pulses.forEach(p => {
        const px = p.source.x + (p.target.x - p.source.x) * p.progress;
        const py = p.source.y + (p.target.y - p.source.y) * p.progress;

        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 3. Draw Nodes
      this.nodes.forEach(n => {
        const isSelf = isHovering && n.id === hoveredId;
        const isNeighbor = isHovering && neighbors.has(n.id);
        const matchesFilter = this.activeCluster === 'all' || n.cluster === this.activeCluster;

        let nodeAlpha = 1;
        let radius = n.baseRadius;

        if (isHovering) {
          if (isSelf) {
            radius = n.baseRadius + 5;
            nodeAlpha = 1;
          } else if (isNeighbor) {
            radius = n.baseRadius + 2;
            nodeAlpha = 0.95;
          } else {
            nodeAlpha = 0.18;
          }
        } else if (!matchesFilter) {
          nodeAlpha = 0.22;
        }

        ctx.globalAlpha = nodeAlpha;

        // Outer Frosted Halo
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius + 6, 0, Math.PI * 2);
        ctx.fillStyle = n.lightColor;
        ctx.fill();

        // Node Glow on Active/Hover
        if (isSelf || (this.activeCluster !== 'all' && n.cluster === this.activeCluster)) {
          ctx.shadowColor = n.color;
          ctx.shadowBlur = 18;
        } else {
          ctx.shadowBlur = 0;
        }

        // Main Node Body (Glass Ball / Solid Specular Core)
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        const radGrad = ctx.createRadialGradient(n.x - radius * 0.35, n.y - radius * 0.35, 1, n.x, n.y, radius);
        radGrad.addColorStop(0, '#ffffff');
        radGrad.addColorStop(0.35, n.color);
        radGrad.addColorStop(1, n.color);
        ctx.fillStyle = radGrad;
        ctx.fill();

        // Node White Specular Rim
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = isSelf ? 2.5 : 1.75;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Inner Specular White Light Reflection
        ctx.beginPath();
        ctx.arc(n.x - radius * 0.3, n.y - radius * 0.3, radius * 0.32, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.fill();

        // =====================================================================
        // SMART ADAPTIVE LABELING (Eliminates All Collisions & Text Glitches)
        // Only draw label badge if:
        // 1) Hovered node
        // 2) Connected neighbor
        // 3) Filtered category is active
        // 4) In default state, ONLY primary Hub nodes show a clean pill
        // =====================================================================
        const shouldShowLabel = isSelf || isNeighbor || 
          (this.activeCluster !== 'all' && matchesFilter) || 
          (!isHovering && this.activeCluster === 'all' && n.isHub);

        if (shouldShowLabel) {
          ctx.font = `${isSelf ? '600' : '500'} 11px Inter, -apple-system, BlinkMacSystemFont, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';

          const textY = n.y + radius + 6;
          const textWidth = ctx.measureText(n.label).width;

          // Apple Frosted Glass Pill Badge
          ctx.fillStyle = 'rgba(255, 255, 255, 0.94)';
          ctx.beginPath();
          if (typeof ctx.roundRect === 'function') {
            ctx.roundRect(n.x - textWidth / 2 - 6, textY - 1, textWidth + 12, 17, 5);
          } else {
            ctx.rect(n.x - textWidth / 2 - 6, textY - 1, textWidth + 12, 17);
          }
          ctx.fill();

          ctx.strokeStyle = isSelf ? n.color : 'rgba(203, 213, 225, 0.85)';
          ctx.lineWidth = isSelf ? 1.5 : 1;
          ctx.stroke();

          ctx.fillStyle = isSelf ? n.color : '#0f172a';
          ctx.fillText(n.label, n.x, textY + 1);
        }

        ctx.globalAlpha = 1;
      });
    }

    animate() {
      this.updatePhysics();
      this.render();
      requestAnimationFrame(this.animate);
    }
  }

  // Initialization on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('skills-canvas');
    const tooltip = document.getElementById('skills-graph-tooltip');
    const container = document.getElementById('skills-graph-container');

    if (!canvas || !container) return;

    const graph = new SkillsConstellation(canvas, tooltip, container);

    // Filter Buttons
    const filterBtns = container.querySelectorAll('.graph-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cluster = btn.getAttribute('data-cluster') || 'all';
        graph.filterCluster(cluster);
      });
    });

    // Control Actions
    const resetBtn = document.getElementById('btn-graph-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => graph.resetPhysics());
    }

    const pulseBtn = document.getElementById('btn-graph-pulse');
    if (pulseBtn) {
      pulseBtn.addEventListener('click', () => graph.triggerEnergyPulse());
    }
  });

})();
