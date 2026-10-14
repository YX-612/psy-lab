/**
 * 粒子星光背景
 */
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h;
  let animationId;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.3 + 0.05,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
      hue: Math.random() > 0.7 ? 45 : 270
    };
  }

  function init() {
    resize();
    const count = Math.min(Math.floor((w * h) / 8000), prefersReducedMotion ? 30 : 120);
    particles = Array.from({ length: count }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    particles.forEach((p) => {
      if (!prefersReducedMotion) {
        p.y -= p.speed;
        p.twinklePhase += p.twinkleSpeed;
        if (p.y < -5) {
          p.y = h + 5;
          p.x = Math.random() * w;
        }
      }

      const alpha = prefersReducedMotion
        ? p.opacity
        : p.opacity * (0.6 + 0.4 * Math.sin(p.twinklePhase));

      const color = p.hue === 45
        ? `rgba(232, 197, 71, ${alpha})`
        : `rgba(180, 160, 220, ${alpha})`;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      if (p.size > 1.5 && alpha > 0.4) {
        ctx.beginPath();
        ctx.moveTo(p.x - p.size * 3, p.y);
        ctx.lineTo(p.x + p.size * 3, p.y);
        ctx.moveTo(p.x, p.y - p.size * 3);
        ctx.lineTo(p.x, p.y + p.size * 3);
        ctx.strokeStyle = color.replace(/[\d.]+\)$/, `${alpha * 0.3})`);
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });

    animationId = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    resize();
    init();
  });

  init();
  draw();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      draw();
    }
  });
})();
