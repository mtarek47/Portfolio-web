/**
 * INTERACTIVE SKILLS & ARCHITECTURE GRAPH (D3.js Force-Directed Graph)
 * Built following Alan Zucconi's "Interactive Graphs in the Browser" tutorial
 * (https://www.alanzucconi.com/2015/11/01/interactive-graphs-in-the-browser/)
 * 
 * Features:
 * - D3 Force Simulation (repulsion, link springs, collision, cluster centering)
 * - Interactive node drag-and-drop (.call(d3.drag()))
 * - Semantic domain clustering (DevOps, Backend, Databases, Web/Mobile, Architecture, Security)
 * - Zero-collision SVG text labeling with paint-order halo
 * - Floating Frosted Liquid Glass inspector tooltip
 * - Category filter pills + Pulse energy animation + View reset
 */

(function () {
  'use strict';

  const SKILLS_DATA = {
    clusters: {
      devops:  { id: 'devops',  name: 'DevOps & Infra',       color: '#f97316', cx: 0.50, cy: 0.24 },
      backend: { id: 'backend', name: 'Backend & APIs',       color: '#2563eb', cx: 0.74, cy: 0.38 },
      data:    { id: 'data',    name: 'Databases & Storage',  color: '#eab308', cx: 0.74, cy: 0.74 },
      security:{ id: 'security',name: 'Security & Protocols', color: '#ec4899', cx: 0.50, cy: 0.78 },
      frontend:{ id: 'frontend',name: 'Web & Mobile UI',      color: '#06b6d4', cx: 0.24, cy: 0.70 },
      arch:    { id: 'arch',    name: 'Architecture & SOLID', color: '#8b5cf6', cx: 0.24, cy: 0.32 }
    },
    nodes: [
      // DevOps Cluster (Orange)
      { id: 'docker', label: 'Docker', cluster: 'devops', radius: 22, isHub: true, desc: 'Multi-stage container builds & microservice containerization' },
      { id: 'compose', label: 'Docker Compose', cluster: 'devops', radius: 14, desc: 'Multi-container application orchestration & network topology' },
      { id: 'linux', label: 'Linux Admin', cluster: 'devops', radius: 17, desc: 'systemd service units, cron, process monitoring & permissions' },
      { id: 'cicd', label: 'CI/CD Pipelines', cluster: 'devops', radius: 16, desc: 'Automated test, build and production delivery automation' },
      { id: 'gh_actions', label: 'GitHub Actions', cluster: 'devops', radius: 14, desc: 'Custom declarative workflow runners & automation' },
      { id: 'nginx', label: 'Nginx', cluster: 'devops', radius: 14, desc: 'High-performance reverse proxy & SSL termination' },
      { id: 'bash', label: 'Bash Scripting', cluster: 'devops', radius: 13, desc: 'Infrastructure automation & server maintenance' },

      // Backend & Core APIs Cluster (Blue)
      { id: 'java', label: 'Java 17/21', cluster: 'backend', radius: 18, desc: 'Enterprise OOP, Concurrency, JVM performance tuning' },
      { id: 'spring', label: 'Spring Boot 3', cluster: 'backend', radius: 24, isHub: true, desc: 'Production backend architecture, REST controllers & DI' },
      { id: 'spring_sec', label: 'Spring Security', cluster: 'backend', radius: 14, desc: 'Stateless auth filters, role-based access control & RBAC' },
      { id: 'jpa', label: 'Spring Data JPA', cluster: 'backend', radius: 15, desc: 'Hibernate ORM, schema mapping & query optimization' },
      { id: 'nodejs', label: 'Node.js', cluster: 'backend', radius: 17, desc: 'Asynchronous event loop, non-blocking I/O microservices' },
      { id: 'express', label: 'Express.js', cluster: 'backend', radius: 14, desc: 'Modular middleware, route handlers & JSON APIs' },
      { id: 'rest', label: 'REST APIs', cluster: 'backend', radius: 17, desc: 'Standardized HTTP contracts, status codes & OpenAPI spec' },

      // Database Cluster (Yellow/Gold)
      { id: 'postgres', label: 'PostgreSQL', cluster: 'data', radius: 21, isHub: true, desc: 'ACID transactions, relational modeling, complex indexing' },
      { id: 'mysql', label: 'MySQL', cluster: 'data', radius: 15, desc: 'Relational data management & query performance' },
      { id: 'mongodb', label: 'MongoDB', cluster: 'data', radius: 15, desc: 'Flexible document schemas & aggregation pipelines' },
      { id: 'redis', label: 'Redis', cluster: 'data', radius: 14, desc: 'Fast in-memory cache, pub/sub & rate limiting' },
      { id: 'sqlite', label: 'SQLite / Room', cluster: 'data', radius: 13, desc: 'Embedded zero-latency persistence for mobile & local storage' },

      // Frontend & Mobile Cluster (Cyan/Teal)
      { id: 'react', label: 'React.js', cluster: 'frontend', radius: 21, isHub: true, desc: 'Modular component architecture, custom hooks & SPA state' },
      { id: 'js_ts', label: 'JavaScript ES6+', cluster: 'frontend', radius: 16, desc: 'Modern async/await, closures & client runtime logic' },
      { id: 'html_css', label: 'HTML5 / CSS3', cluster: 'frontend', radius: 14, desc: 'Semantic layout, liquid glassmorphism, responsive grid' },
      { id: 'kotlin', label: 'Kotlin', cluster: 'frontend', radius: 18, desc: 'Native Android architecture, Coroutines & Flow' },
      { id: 'compose_ui', label: 'Jetpack Compose', cluster: 'frontend', radius: 15, desc: 'Declarative reactive UI framework for modern Android' },
      { id: 'flutter', label: 'Flutter / Dart', cluster: 'frontend', radius: 15, desc: 'Cross-platform mobile apps for Android & iOS' },

      // Architecture & Systems (Purple)
      { id: 'sys_design', label: 'System Design', cluster: 'arch', radius: 22, isHub: true, desc: 'Tiered architecture, decoupled services & fault tolerance' },
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
      { source: 'spring', target: 'postgres', weight: 4 },
      { source: 'spring', target: 'docker', weight: 4 },
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

  class D3SkillsGraph {
    constructor() {
      this.svgElement = document.getElementById('skills-network-svg');
      this.tooltip = document.getElementById('skills-graph-tooltip');
      this.container = document.querySelector('.graph-canvas-wrapper');
      
      if (!this.svgElement || !window.d3) return;

      this.activeCluster = 'all';
      this.hoveredNode = null;
      this.init();
    }

    init() {
      const d3 = window.d3;
      const rect = this.container.getBoundingClientRect();
      this.width = rect.width || 900;
      this.height = Math.max(540, Math.min(window.innerHeight * 0.70, 620));

      this.svg = d3.select(this.svgElement)
        .attr('viewBox', `0 0 ${this.width} ${this.height}`)
        .attr('width', '100%')
        .attr('height', this.height);

      // Defs for gradients & filters
      this.setupDefs();

      // Master Zoom Group
      this.g = this.svg.append('g').attr('class', 'graph-main-group');

      // Zoom behavior
      this.zoom = d3.zoom()
        .scaleExtent([0.65, 2.5])
        .on('zoom', (event) => {
          this.g.attr('transform', event.transform);
          this.hideTooltip();
        });

      this.svg.call(this.zoom);

      // Deep copy nodes and links for D3 simulation
      this.nodesData = SKILLS_DATA.nodes.map(n => ({
        ...n,
        color: SKILLS_DATA.clusters[n.cluster].color,
        clusterName: SKILLS_DATA.clusters[n.cluster].name
      }));

      // Map for quick id lookup
      const nodeMap = new Map(this.nodesData.map(n => [n.id, n]));

      this.linksData = SKILLS_DATA.links.map(l => ({
        source: nodeMap.get(l.source),
        target: nodeMap.get(l.target),
        weight: l.weight || 1
      })).filter(l => l.source && l.target);

      // Pre-position nodes near cluster centers
      this.nodesData.forEach(n => {
        const c = SKILLS_DATA.clusters[n.cluster] || { cx: 0.5, cy: 0.5 };
        const jitter = 50;
        n.x = c.cx * this.width + (Math.random() - 0.5) * jitter;
        n.y = c.cy * this.height + (Math.random() - 0.5) * jitter;
      });

      // Layer groups (links below nodes)
      this.linksLayer = this.g.append('g').attr('class', 'links-layer');
      this.nodesLayer = this.g.append('g').attr('class', 'nodes-layer');
      this.particlesLayer = this.g.append('g').attr('class', 'particles-layer');

      // Render links (Alan Zucconi Step 2)
      this.linkElements = this.linksLayer.selectAll('line.link')
        .data(this.linksData)
        .enter().append('line')
        .attr('class', 'link')
        .style('stroke-width', d => Math.max(1.2, Math.sqrt(d.weight) * 1.5))
        .style('stroke', '#94a3b8')
        .style('stroke-opacity', 0.35);

      // Render nodes as groups (Alan Zucconi Step 3)
      this.nodeElements = this.nodesLayer.selectAll('g.node')
        .data(this.nodesData)
        .enter().append('g')
        .attr('class', 'node')
        .attr('data-id', d => d.id)
        .attr('data-cluster', d => d.cluster)
        .call(this.createDragBehavior());

      // 1. Halo circle
      this.nodeElements.append('circle')
        .attr('class', 'halo')
        .attr('r', d => d.radius + (d.isHub ? 7 : 4))
        .style('color', d => d.color);

      // 2. Core circle
      this.nodeElements.append('circle')
        .attr('class', 'core')
        .attr('r', d => d.radius)
        .style('fill', d => d.color);

      // 3. Node labels with SVG halo (Zero text collision glitch)
      this.nodeElements.append('text')
        .attr('class', 'node-label')
        .attr('y', d => d.radius + 15)
        .text(d => d.label);

      // Initialize Force Simulation (Step 2 of tutorial)
      this.initSimulation();

      // Bind UI events
      this.bindEvents();
    }

    setupDefs() {
      const defs = this.svg.append('defs');

      // Soft drop shadow filter for nodes
      const filter = defs.append('filter')
        .attr('id', 'node-shadow')
        .attr('x', '-30%').attr('y', '-30%')
        .attr('width', '160%').attr('height', '160%');

      filter.append('feDropShadow')
        .attr('dx', '0').attr('dy', '3')
        .attr('stdDeviation', '4')
        .attr('flood-opacity', '0.18');
    }

    initSimulation() {
      const d3 = window.d3;
      const clusters = SKILLS_DATA.clusters;

      this.simulation = d3.forceSimulation(this.nodesData)
        .force('link', d3.forceLink(this.linksData)
          .id(d => d.id)
          .distance(d => (d.source.cluster === d.target.cluster ? 55 : 85))
          .strength(0.65)
        )
        .force('charge', d3.forceManyBody()
          .strength(d => (d.isHub ? -360 : -220))
          .distanceMax(380)
        )
        .force('collide', d3.forceCollide()
          .radius(d => d.radius + 18)
          .iterations(3)
        )
        .force('center', d3.forceCenter(this.width / 2, this.height / 2).strength(0.06))
        .force('clusterX', d3.forceX(d => {
          const c = clusters[d.cluster];
          return c ? c.cx * this.width : this.width / 2;
        }).strength(0.18))
        .force('clusterY', d3.forceY(d => {
          const c = clusters[d.cluster];
          return c ? c.cy * this.height : this.height / 2;
        }).strength(0.18))
        .on('tick', () => this.onTick());
    }

    onTick() {
      const pad = 35;

      // Keep within bounds
      this.nodesData.forEach(d => {
        d.x = Math.max(pad, Math.min(this.width - pad, d.x));
        d.y = Math.max(pad, Math.min(this.height - pad, d.y));
      });

      // Update link lines
      this.linkElements
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      // Update node container positions
      this.nodeElements
        .attr('transform', d => `translate(${d.x},${d.y})`);
    }

    createDragBehavior() {
      const d3 = window.d3;
      return d3.drag()
        .on('start', (event, d) => {
          if (!event.active) this.simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
          this.hideTooltip();
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
          this.hideTooltip();
        })
        .on('end', (event, d) => {
          if (!event.active) this.simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        });
    }

    bindEvents() {
      const self = this;

      // Node Mouse Hover
      this.nodeElements
        .on('mouseenter', function (event, d) {
          self.handleNodeHover(d, this);
        })
        .on('mouseleave', function () {
          self.handleNodeLeave();
        })
        .on('click', function (event, d) {
          event.stopPropagation();
          self.handleNodeClick(d);
        });

      // SVG Canvas Click (Reset highlight)
      this.svg.on('click', () => {
        this.resetHighlights();
      });

      // Filter Buttons
      const filterBtns = document.querySelectorAll('.graph-filter-btn');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          filterBtns.forEach(b => b.classList.remove('active'));
          e.currentTarget.classList.add('active');
          const cluster = e.currentTarget.getAttribute('data-cluster');
          this.setFilter(cluster);
        });
      });

      // Pulse Button
      const btnPulse = document.getElementById('btn-graph-pulse');
      if (btnPulse) {
        btnPulse.addEventListener('click', () => this.triggerPulse());
      }

      // Reset Button
      const btnReset = document.getElementById('btn-graph-reset');
      if (btnReset) {
        btnReset.addEventListener('click', () => this.resetView());
      }

      // Window resize
      window.addEventListener('resize', () => {
        this.handleResize();
      });
    }

    handleNodeHover(node, element) {
      this.hoveredNode = node;

      // Find neighbor node IDs
      const neighborIds = new Set();
      neighborIds.add(node.id);

      this.linksData.forEach(l => {
        if (l.source.id === node.id) neighborIds.add(l.target.id);
        if (l.target.id === node.id) neighborIds.add(l.source.id);
      });

      // Highlight links
      this.linkElements
        .classed('highlighted', l => l.source.id === node.id || l.target.id === node.id)
        .classed('dimmed', l => l.source.id !== node.id && l.target.id !== node.id);

      // Highlight nodes
      this.nodeElements
        .classed('highlighted', d => neighborIds.has(d.id))
        .classed('dimmed', d => !neighborIds.has(d.id));

      // Show tooltip
      this.showTooltip(node, element);
    }

    handleNodeLeave() {
      this.hoveredNode = null;
      this.hideTooltip();

      if (this.activeCluster === 'all') {
        this.linkElements.classed('highlighted', false).classed('dimmed', false);
        this.nodeElements.classed('highlighted', false).classed('dimmed', false);
      } else {
        this.applyClusterFilter(this.activeCluster);
      }
    }

    handleNodeClick(node) {
      this.triggerPulseFromNode(node);
    }

    setFilter(clusterId) {
      this.activeCluster = clusterId;
      this.applyClusterFilter(clusterId);
    }

    applyClusterFilter(clusterId) {
      if (clusterId === 'all') {
        this.nodeElements.classed('dimmed', false).classed('highlighted', false);
        this.linkElements.classed('dimmed', false).classed('highlighted', false);
        return;
      }

      this.nodeElements.each(function (d) {
        const matches = d.cluster === clusterId;
        window.d3.select(this)
          .classed('dimmed', !matches)
          .classed('highlighted', matches);
      });

      this.linkElements.each(function (l) {
        const matches = l.source.cluster === clusterId || l.target.cluster === clusterId;
        window.d3.select(this)
          .classed('dimmed', !matches)
          .classed('highlighted', matches);
      });
    }

    resetHighlights() {
      this.activeCluster = 'all';
      const allBtn = document.querySelector('.graph-filter-btn[data-cluster="all"]');
      if (allBtn) {
        document.querySelectorAll('.graph-filter-btn').forEach(b => b.classList.remove('active'));
        allBtn.classList.add('active');
      }
      this.nodeElements.classed('dimmed', false).classed('highlighted', false);
      this.linkElements.classed('dimmed', false).classed('highlighted', false);
      this.hideTooltip();
    }

    showTooltip(node, element) {
      if (!this.tooltip) return;

      const rect = element.getBoundingClientRect();
      const containerRect = this.container.getBoundingClientRect();

      const connected = [];
      this.linksData.forEach(l => {
        if (l.source.id === node.id) connected.push(l.target.label);
        if (l.target.id === node.id) connected.push(l.source.label);
      });

      const tagsHtml = connected.slice(0, 5)
        .map(name => `<span class="graph-tag">${name}</span>`)
        .join('');

      this.tooltip.innerHTML = `
        <div class="graph-tooltip-header">
          <span class="graph-tooltip-dot" style="background: ${node.color}; box-shadow: 0 0 8px ${node.color};"></span>
          <div>
            <div class="graph-tooltip-title">${node.label}</div>
            <div class="graph-tooltip-cluster" style="color: ${node.color};">${node.clusterName}</div>
          </div>
        </div>
        <div class="graph-tooltip-desc">${node.desc}</div>
        <div class="graph-tooltip-connections">
          <div class="conn-label">Connected (${connected.length}):</div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
            ${tagsHtml}
          </div>
        </div>
      `;

      // Position tooltip safely inside container
      const tooltipX = rect.left - containerRect.left + (rect.width / 2) + 15;
      const tooltipY = rect.top - containerRect.top - 20;

      this.tooltip.style.display = 'block';
      this.tooltip.style.left = `${Math.min(tooltipX, containerRect.width - 280)}px`;
      this.tooltip.style.top = `${Math.max(15, Math.min(tooltipY, containerRect.height - 180))}px`;
      this.tooltip.style.opacity = '1';
    }

    hideTooltip() {
      if (this.tooltip) {
        this.tooltip.style.opacity = '0';
        this.tooltip.style.display = 'none';
      }
    }

    triggerPulse() {
      const d3 = window.d3;
      // Animate energy particles along randomly selected active links
      const sampleLinks = this.linksData.filter(() => Math.random() > 0.45);

      sampleLinks.forEach(link => {
        const particle = this.particlesLayer.append('circle')
          .attr('class', 'pulse-particle')
          .attr('r', 3.5)
          .attr('cx', link.source.x)
          .attr('cy', link.source.y)
          .style('fill', link.source.color)
          .style('color', link.source.color);

        particle.transition()
          .duration(700 + Math.random() * 400)
          .ease(d3.easeCubicOut)
          .attr('cx', link.target.x)
          .attr('cy', link.target.y)
          .style('opacity', 0)
          .remove();
      });

      this.simulation.alpha(0.12).restart();
    }

    triggerPulseFromNode(node) {
      const d3 = window.d3;
      const outgoing = this.linksData.filter(l => l.source.id === node.id || l.target.id === node.id);

      outgoing.forEach(link => {
        const isForward = link.source.id === node.id;
        const start = isForward ? link.source : link.target;
        const end = isForward ? link.target : link.source;

        const particle = this.particlesLayer.append('circle')
          .attr('class', 'pulse-particle')
          .attr('r', 4)
          .attr('cx', start.x)
          .attr('cy', start.y)
          .style('fill', node.color)
          .style('color', node.color);

        particle.transition()
          .duration(650)
          .ease(d3.easeCubicOut)
          .attr('cx', end.x)
          .attr('cy', end.y)
          .style('opacity', 0)
          .remove();
      });

      this.simulation.alpha(0.15).restart();
    }

    resetView() {
      const d3 = window.d3;
      this.svg.transition()
        .duration(650)
        .call(this.zoom.transform, d3.zoomIdentity);

      this.resetHighlights();

      // Soft reheat to restore balanced cluster layout
      this.simulation.alpha(0.4).restart();
    }

    handleResize() {
      const rect = this.container.getBoundingClientRect();
      this.width = rect.width || 900;
      this.height = Math.max(540, Math.min(window.innerHeight * 0.70, 620));

      this.svg
        .attr('viewBox', `0 0 ${this.width} ${this.height}`)
        .attr('height', this.height);

      this.simulation
        .force('center', window.d3.forceCenter(this.width / 2, this.height / 2).strength(0.06))
        .alpha(0.2)
        .restart();
    }
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new D3SkillsGraph());
  } else {
    new D3SkillsGraph();
  }
})();
