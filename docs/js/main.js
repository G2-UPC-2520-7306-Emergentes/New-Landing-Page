// ===================================
// MAIN.JS - FoodChain Landing Page
// ===================================

// Variables globales
let currentLanguage = localStorage.getItem('selectedLanguage') || 'es';
let translations = {};

// ===================================
// 1. INICIALIZACIÓN DE LENIS (Smooth Scroll)
// ===================================
function initLenis() {
  const lenis = new Lenis({
    duration: 0.8,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
    lerp: 0.1,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  lenis.on('scroll', () => {
    ScrollTrigger.update();
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        lenis.scrollTo(target, {
          offset: -80,
          duration: 0.6,
          easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
        });
      }
    });
  });

  return lenis;
}

// ===================================
// 2. SISTEMA DE INTERNACIONALIZACIÓN (i18n)
// ===================================
async function loadTranslations() {
  try {
    // Cargar el idioma guardado o español por defecto
    const response = await fetch(`../i18n/${currentLanguage}.json`);
    translations = await response.json();
    updateLanguage(currentLanguage);
  } catch (error) {
    console.error('Error loading translations:', error);
    // Si falla, intentar cargar español como fallback
    try {
      const fallbackResponse = await fetch('../i18n/es.json');
      translations = await fallbackResponse.json();
      currentLanguage = 'es';
      updateLanguage('es');
    } catch (fallbackError) {
      console.error('Error loading fallback translations:', fallbackError);
    }
  }
}

async function updateLanguage(lang) {
  currentLanguage = lang;

  // Guardar el idioma seleccionado en localStorage
  localStorage.setItem('selectedLanguage', lang);

  // Si no tenemos las traducciones cargadas, cargarlas
  if (!translations || Object.keys(translations).length === 0) {
    try {
      const response = await fetch(`../i18n/${lang}.json`);
      translations = await response.json();
    } catch (error) {
      console.error(`Error loading ${lang} translations:`, error);
      return;
    }
  }

  // Actualizar todos los elementos con data-i18n
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[key]) {
      element.textContent = translations[key];
    }
  });

  // Actualizar placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (translations[key]) {
      element.placeholder = translations[key];
    }
  });

  // Actualizar título de la página
  if (translations.page_title) {
    document.title = translations.page_title;
  }

  // Cambiar el atributo lang del documento
  document.documentElement.lang = lang;

  // Actualizar botones activos
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    }
  });

  // Reinicializar los iconos de Lucide después de cambiar el idioma
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

function initLanguageSwitcher() {
  const langButtons = document.querySelectorAll('.lang-btn');

  if (!langButtons.length) {
    console.warn('No language buttons found');
    return;
  }

  langButtons.forEach(btn => {
    // Remover listeners previos si existen
    btn.removeEventListener('click', handleLanguageChange);

    // Añadir el nuevo listener
    btn.addEventListener('click', handleLanguageChange);
  });

  // Función handler separada para mejor manejo
  async function handleLanguageChange(e) {
    e.preventDefault();
    const lang = this.getAttribute('data-lang');

    if (lang && (lang === 'es' || lang === 'en')) {
      console.log('Changing language to:', lang);
      
      // Cargar el nuevo archivo de idioma
      try {
        const response = await fetch(`../i18n/${lang}.json`);
        translations = await response.json();
        await updateLanguage(lang);
      } catch (error) {
        console.error(`Error loading ${lang} translations:`, error);
      }
    }
  }
}

// ===================================
// 3. ANIMACIONES CON GSAP Y SCROLLTRIGGER
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
// 4. ANIMACIÓN DE LA TIMELINE
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
// 5. SISTEMA DE TABS
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
// 6. FORMULARIO DE CONTACTO
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

      const successMessage = currentLanguage === 'es'
        ? '¡Gracias! Nos pondremos en contacto pronto.'
        : 'Thank you! We will contact you soon.';

      alert(successMessage);
      form.reset();
    });
  }
}

// ===================================
// 7. INICIALIZAR ICONOS DE LUCIDE
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
// 8. HEADER SCROLL EFFECT
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
// 9. INICIALIZACIÓN PRINCIPAL
// ===================================
async function init() {
  await loadTranslations();
  
  initLenis();
  initLanguageSwitcher();
  initTabs();
  initContactForm();
  initLucideIcons();
  initHeaderScroll();

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
