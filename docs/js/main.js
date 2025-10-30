// ===================================
// MAIN.JS - FoodChain Landing Page
// ===================================

// ===================================
// 1. NAVEGACIÓN SUAVE (Smooth Scroll Nativo)
// ===================================
function initSmoothNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Offset para el header
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===================================
// 2. ANIMACIONES CON GSAP Y SCROLLTRIGGER
// ===================================
function initAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.header', {
    y: -100,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  });

  const heroTimeline = gsap.timeline({
    defaults: { ease: 'power2.out' }
  });

  heroTimeline
    .from('.hero-title', {
      y: 40,
      opacity: 0,
      duration: 0.7
    })
    .from('.hero-subtitle', {
      y: 20,
      opacity: 0,
      duration: 0.6
    }, '-=0.4')
    .from('.hero-buttons .btn', {
      y: 15,
      opacity: 0,
      duration: 0.5,
      stagger: 0.15
    }, '-=0.3');

  // Animación simple para tarjetas del problema - SIN efectos complejos
  gsap.from('.problema-card', {
    scrollTrigger: {
      trigger: '.problema',
      start: 'top 85%',
      toggleActions: 'play none none reverse',
      fastScrollEnd: true
    },
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
  });

  gsap.from('.step', {
    scrollTrigger: {
      trigger: '.solucion',
      start: 'top 75%',
      toggleActions: 'play none none reverse',
      fastScrollEnd: true
    },
    x: -40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power2.out'
  });

  gsap.from('.solucion-visual .visual-arrow', {
    scrollTrigger: {
      trigger: '.solucion-visual',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      fastScrollEnd: true
    },
    scale: 0,
    opacity: 0,
    duration: 0.4,
    stagger: 0.1,
    ease: 'back.out(1.5)'
  });

  gsap.from('.visual-icon', {
    scrollTrigger: {
      trigger: '.solucion-visual',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      fastScrollEnd: true
    },
    scale: 0,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'back.out(1.5)'
  });

  initTimelineAnimation();

  gsap.from('.segment-layout', {
    scrollTrigger: {
      trigger: '.segmentos',
      start: 'top 75%',
      toggleActions: 'play none none reverse',
      fastScrollEnd: true
    },
    y: 40,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  });

  gsap.from('.tech-card', {
    scrollTrigger: {
      trigger: '.tecnologia',
      start: 'top 75%',
      toggleActions: 'play none none reverse',
      fastScrollEnd: true
    },
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.12,
    ease: 'power2.out'
  });

  gsap.from('.team-member', {
    scrollTrigger: {
      trigger: '.equipo',
      start: 'top 75%',
      toggleActions: 'play none none reverse',
      fastScrollEnd: true
    },
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
  });

  gsap.from('.footer-cta', {
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      fastScrollEnd: true
    },
    y: 40,
    opacity: 0,
    duration: 0.7,
    ease: 'power2.out'
  });
}

// ===================================
// 3. ANIMACIÓN DE LA TIMELINE
// ===================================
function initTimelineAnimation() {
  const timelineSteps = document.querySelectorAll('.timeline-step');
  const timelineSvgLine = document.querySelector('.timeline-svg-line');

  if (!timelineSteps.length) return;

  if (timelineSvgLine) {
    gsap.to(timelineSvgLine, {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: '.casos',
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 0.5,
        anticipatePin: 1
      },
      ease: 'none'
    });
  }

  timelineSteps.forEach((step, index) => {
    ScrollTrigger.create({
      trigger: step,
      start: 'top 65%',
      end: 'bottom 65%',
      fastScrollEnd: true,
      onEnter: () => {
        timelineSteps.forEach(s => s.classList.remove('active'));
        if (timelineSteps[index]) {
          timelineSteps[index].classList.add('active');
        }
      },
      onEnterBack: () => {
        timelineSteps.forEach(s => s.classList.remove('active'));
        if (timelineSteps[index]) {
          timelineSteps[index].classList.add('active');
        }
      },
    });
  });
}

// ===================================
// 4. SISTEMA DE TABS
// ===================================
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');

      const targetContent = document.querySelector(`[data-content="${targetTab}"]`);
      if (targetContent) {
        targetContent.classList.add('active');
        gsap.fromTo(targetContent,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          }
        );
      }
    });
  });
}

// ===================================
// 5. FORMULARIO DE CONTACTO
// ===================================
function initContactForm() {
  const form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        company: formData.get('company')
      };

      console.log('Form submitted:', data);

      alert('¡Gracias! Nos pondremos en contacto pronto.');
      form.reset();
    });
  }
}

// ===================================
// 6. INICIALIZAR ICONOS DE LUCIDE
// ===================================
function initLucideIcons() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
    // Re-crear íconos después de un pequeño delay para asegurar que el DOM esté listo
    setTimeout(() => {
      lucide.createIcons();
    }, 100);
  }
}

// ===================================
// 7. HEADER SCROLL EFFECT
// ===================================
function initHeaderScroll() {
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
  });
}

// ===================================
// 8. SCROLL TO TOP BUTTON - FLOTANTE
// ===================================
function initScrollToTop() {
  const scrollBtn = document.getElementById('scrollToTop');
  if (!scrollBtn) {
    console.warn('Scroll to top button not found');
    return;
  }

  let ticking = false;

  // Mostrar/ocultar botón flotante según scroll (optimizado)
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Aparece cuando el usuario hace scroll hacia abajo más de 200px
        if (window.scrollY > 200) {
          scrollBtn.classList.add('visible');
        } else {
          scrollBtn.classList.remove('visible');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Click para volver al inicio con scroll suave
  scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===================================
// 9. INICIALIZACIÓN PRINCIPAL
// ===================================
function init() {
  initSmoothNavigation(); // Navegación suave nativa del navegador
  initTabs();
  initContactForm();
  initLucideIcons();
  initHeaderScroll();
  initScrollToTop();

  requestAnimationFrame(() => {
    initAnimations();
    ScrollTrigger.refresh();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 150);
});

gsap.config({
  force3D: true,
  nullTargetWarn: false
});

ScrollTrigger.config({
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
  ignoreMobileResize: true
});

// Optimización: Reducir ejecuciones durante scroll
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });
