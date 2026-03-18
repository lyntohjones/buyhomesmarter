/* ============================================================
   BuyHomeSmarter.com — JavaScript
   Typewriter, counters, scroll animations, interactivity
   ============================================================ */

'use strict';

// ============================================================
// STATE
// ============================================================
let currentCountry = localStorage.getItem('bhs_country') || 'CA';
let countersTriggered = false;
let typewriterDone = false;

// ============================================================
// TYPEWRITER
// ============================================================
const typewriterLines = [
  "Your Realtor Works For Their Commission.",
  "We Work For You.",
  "Stop Overpaying For Your Home.",
  "Get The Insider Knowledge They Hide.",
];

let lineIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isPaused = false;

function typewrite() {
  const el = document.getElementById('typewriterText');
  if (!el) return;

  const current = typewriterLines[lineIndex];

  if (isPaused) {
    setTimeout(typewrite, 1400);
    isPaused = false;
    return;
  }

  if (!isDeleting) {
    el.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isPaused = true;
      isDeleting = true;
    }
    setTimeout(typewrite, 45);
  } else {
    el.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      lineIndex = (lineIndex + 1) % typewriterLines.length;
    }
    setTimeout(typewrite, 22);
  }
}

// ============================================================
// ANIMATED NUMBER COUNTER
// ============================================================
function animateCounter(el, target, prefix = '', suffix = '', duration = 1800) {
  const start = performance.now();
  const startVal = 0;

  function format(val) {
    if (target >= 10000) {
      return prefix + Math.floor(val).toLocaleString() + suffix;
    }
    return prefix + Math.floor(val) + suffix;
  }

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // easeOutExpo
    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current = startVal + (target - startVal) * ease;
    el.textContent = format(current);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = format(target);
  }

  requestAnimationFrame(step);
}

function initCounters() {
  // Hero stats
  document.querySelectorAll('.stat-value').forEach(el => {
    const target = parseInt(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const rawSuffix = el.dataset.suffix || '';
    
    // For "$100,000+" we want to show "$100K+"
    if (target >= 10000 && rawSuffix.includes('K+')) {
      // Already formatted as K
      animateCounter(el, target / 1000, prefix, 'K+', 1800);
    } else {
      animateCounter(el, target, prefix, rawSuffix, 1800);
    }
  });

  // Impact stats
  document.querySelectorAll('.impact-num').forEach(el => {
    const target = parseInt(el.dataset.target);
    if (!target) return;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    
    if (target >= 10000) {
      // Show as formatted number
      animateCounter(el, target, prefix, suffix, 2000);
    } else {
      animateCounter(el, target, prefix, suffix, 1500);
    }
  });
}

// ============================================================
// SCROLL REVEAL
// ============================================================
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Trigger counters once when impact section is visible
        if (entry.target.classList.contains('impact-section') && !countersTriggered) {
          countersTriggered = true;
          setTimeout(initCounters, 200);
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  // Observe section-reveal elements
  document.querySelectorAll('.section-reveal').forEach(el => {
    observer.observe(el);
  });

  // Staggered card animations
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.animate-card');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('visible');
          }, index * 100);
        });
        cardObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });

  // Observe parent containers of cards
  document.querySelectorAll('.problem-grid, .features-grid, .how-steps, .programs-grid, .phases-grid, .secrets-grid').forEach(el => {
    cardObserver.observe(el);
  });

  // Also make all hero stat elements animate immediately
  setTimeout(() => {
    document.querySelectorAll('.hero-stat .stat-value').forEach(el => {
      const target = parseInt(el.dataset.target);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      if (suffix.includes('K+')) {
        animateCounter(el, target / 1000, prefix, 'K+', 2000);
      } else {
        animateCounter(el, target, prefix, suffix, 2000);
      }
    });
  }, 800);
}

// ============================================================
// NAVBAR SCROLL BEHAVIOR
// ============================================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const scrollTop = document.getElementById('scrollTop');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 50;
    navbar.classList.toggle('scrolled', scrolled);
    
    if (scrollTop) {
      scrollTop.classList.toggle('visible', window.scrollY > 400);
    }
  }, { passive: true });
}

// ============================================================
// MOBILE MENU
// ============================================================
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (!hamburger || !mobileMenu) return;
  
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
}

window.closeMobile = function() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
};

// ============================================================
// COUNTRY TOGGLE
// ============================================================
window.setCountry = function(country) {
  currentCountry = country;
  localStorage.setItem('bhs_country', country);
  
  // Update nav buttons
  document.querySelectorAll('.country-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.includes(country));
  });

  // Switch programs tab
  switchTab(country);

  // Update programs callout text
  const caCallout = document.getElementById('programsCalloutCA');
  const caText = document.getElementById('programsCalloutTextCA');
  const usText = document.getElementById('programsCalloutTextUS');
  
  if (country === 'CA') {
    if (caCallout) caCallout.textContent = 'These programs stack.';
    if (caText) caText.classList.remove('hidden');
    if (usText) usText.classList.add('hidden');
  } else {
    if (caCallout) caCallout.textContent = 'Stacking programs changes everything.';
    if (caText) caText.classList.add('hidden');
    if (usText) usText.classList.remove('hidden');
  }
};

// ============================================================
// PROGRAMS TAB SWITCHER
// ============================================================
window.switchTab = function(tab) {
  const tabCA = document.getElementById('tabCA');
  const tabUS = document.getElementById('tabUS');
  const gridCA = document.getElementById('programsCA');
  const gridUS = document.getElementById('programsUS');
  
  if (!tabCA || !tabUS || !gridCA || !gridUS) return;
  
  if (tab === 'CA') {
    tabCA.classList.add('active');
    tabUS.classList.remove('active');
    gridCA.classList.remove('hidden');
    gridUS.classList.add('hidden');
  } else {
    tabUS.classList.add('active');
    tabCA.classList.remove('active');
    gridUS.classList.remove('hidden');
    gridCA.classList.add('hidden');
  }
};

// ============================================================
// SECRET CARDS ACCORDION
// ============================================================
window.toggleSecret = function(card) {
  const isOpen = card.classList.contains('open');
  
  // Close all
  document.querySelectorAll('.secret-card').forEach(c => c.classList.remove('open'));
  
  // Toggle current
  if (!isOpen) {
    card.classList.add('open');
    // Scroll into view if needed
    setTimeout(() => {
      const rect = card.getBoundingClientRect();
      if (rect.bottom > window.innerHeight) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  }
};

// ============================================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = document.querySelector('.navbar')?.offsetHeight || 70;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 12;
        window.scrollTo({ top, behavior: 'smooth' });
        closeMobile();
      }
    });
  });
}

// ============================================================
// ACTIVE NAV LINK ON SCROLL
// ============================================================
function initActiveNavTracking() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          link.style.color = href === `#${id}` ? 'var(--gold)' : '';
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px'
  });
  
  sections.forEach(s => observer.observe(s));
}

// ============================================================
// CARD HOVER EFFECTS — TILT
// ============================================================
function initCardTilt() {
  document.querySelectorAll('.feature-card, .prog-card, .phase-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const rotateX = ((y - midY) / midY) * -4;
      const rotateY = ((x - midX) / midX) * 4;
      card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ============================================================
// PROGRAMS CALLOUT INITIAL STATE
// ============================================================
function initProgramsCallout() {
  const caText = document.getElementById('programsCalloutTextCA');
  const usText = document.getElementById('programsCalloutTextUS');
  if (caText && usText) {
    if (currentCountry === 'CA') {
      caText.classList.remove('hidden');
      usText.classList.add('hidden');
    } else {
      caText.classList.add('hidden');
      usText.classList.remove('hidden');
    }
  }
}

// ============================================================
// APPLY SAVED COUNTRY ON LOAD
// ============================================================
function applySavedCountry() {
  if (currentCountry === 'US') {
    setCountry('US');
  }
}

// ============================================================
// HERO CARD STACK ANIMATION
// ============================================================
function initHeroCards() {
  const hcardBack = document.querySelector('.hcard-back');
  const hcardFront = document.querySelector('.hcard-front');
  
  if (!hcardBack || !hcardFront) return;
  
  setTimeout(() => {
    hcardBack.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    hcardFront.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s';
    hcardBack.style.opacity = '0.6';
    hcardFront.style.opacity = '1';
  }, 600);
}

// ============================================================
// GOLDEN RATIO SCROLL PROGRESS BAR
// ============================================================
function initProgressBar() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #FFD700, #FFE55C);
    z-index: 9999;
    width: 0%;
    transition: width 0.1s linear;
    pointer-events: none;
  `;
  document.body.appendChild(bar);
  
  window.addEventListener('scroll', () => {
    const winH = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / winH) * 100;
    bar.style.width = `${scrolled}%`;
  }, { passive: true });
}

// ============================================================
// TOOLTIP FOR TRUST ITEMS
// ============================================================
function initTooltips() {
  const tips = {
    'CMHC': 'Canada Mortgage and Housing Corporation — federal housing authority',
    'HUD.gov': 'Department of Housing and Urban Development — US federal agency',
    'CFPB': 'Consumer Financial Protection Bureau — protects buyers from junk fees',
    'Fannie Mae': 'Federal National Mortgage Association — sets conventional loan standards',
    'VA.gov': 'Department of Veterans Affairs — VA loan program for military buyers',
    'USDA': 'US Dept of Agriculture — 0% down rural home loans',
  };
  
  document.querySelectorAll('.trust-item').forEach(item => {
    const text = item.textContent.trim().replace(/[🏛️📊🏦🎖️🌾]/u, '').trim();
    const tip = Object.entries(tips).find(([k]) => text.includes(k));
    if (tip) {
      item.title = tip[1];
      item.style.cursor = 'help';
    }
  });
}

// ============================================================
// OPEN FIRST SECRET ON LOAD (Teaser)
// ============================================================
function openFirstSecret() {
  setTimeout(() => {
    const first = document.querySelector('.secret-card');
    if (first) first.classList.add('open');
  }, 300);
}

// ============================================================
// PARALLAX FOR HERO ORBS
// ============================================================
function initParallax() {
  const orb1 = document.querySelector('.hero-orb-1');
  const orb2 = document.querySelector('.hero-orb-2');
  
  if (!orb1 || !orb2) return;
  
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      orb1.style.transform = `translateY(${y * 0.3}px)`;
      orb2.style.transform = `translateY(${y * -0.2}px)`;
    }
  }, { passive: true });
}

// ============================================================
// CTA CLICK TRACKING (Analytics-ready)
// ============================================================
function initCTATracking() {
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.textContent.trim().substring(0, 50);
      // Analytics hook — replace with actual GA4 event if needed
      if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_click', { cta_text: text });
      }
    });
  });
}

// ============================================================
// REVEAL PROGRAMS GRID ON TAB SWITCH
// ============================================================
function reinitCardsForGrid(gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  
  const cards = grid.querySelectorAll('.animate-card');
  cards.forEach((c, i) => {
    c.classList.remove('visible');
    setTimeout(() => c.classList.add('visible'), i * 100);
  });
}

// Override switchTab to also reinit cards
const _origSwitchTab = window.switchTab;
window.switchTab = function(tab) {
  _origSwitchTab(tab);
  setTimeout(() => reinitCardsForGrid(tab === 'CA' ? 'programsCA' : 'programsUS'), 50);
};

// ============================================================
// INIT ALL
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initScrollReveal();
  initActiveNavTracking();
  initProgressBar();
  initParallax();
  initTooltips();
  initHeroCards();
  initCTATracking();
  initProgramsCallout();
  openFirstSecret();
  
  // Start typewriter
  setTimeout(typewrite, 400);
  
  // Apply saved country preference
  applySavedCountry();
  
  // Initialize card tilt on desktop only
  if (window.innerWidth > 768) {
    initCardTilt();
  }
  
  // Reveal programs grid cards immediately
  setTimeout(() => {
    document.querySelectorAll('#programsCA .animate-card').forEach((c, i) => {
      setTimeout(() => c.classList.add('visible'), 200 + i * 100);
    });
  }, 100);
});

// ============================================================
// WINDOW RESIZE HANDLER
// ============================================================
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.innerWidth > 768) {
      initCardTilt();
    }
  }, 200);
});

// ============================================================
// KEYBOARD ACCESSIBILITY
// ============================================================
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeMobile();
    document.querySelectorAll('.secret-card.open').forEach(c => c.classList.remove('open'));
  }
});

// Make secret cards keyboard accessible
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.secret-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleSecret(card);
      }
    });
  });
});
