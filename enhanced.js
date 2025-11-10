/**
 * ORSC Website - Enhanced Interactions
 * Version: 2.0
 * Last Updated: November 10, 2025
 * 
 * Modern JavaScript for animations and scroll effects
 */

// ========================================
// SCROLL PROGRESS BAR
// ========================================

function initScrollProgress() {
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.appendChild(scrollProgress);
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight);
    scrollProgress.style.transform = `scaleX(${scrolled})`;
  });
}

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-fade, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => revealObserver.observe(el));
}

// ========================================
// ========================================
// SMOOTH SCROLL TO SECTION
// ========================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ========================================
// INITIALIZE ALL FEATURES
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  initScrollProgress();
  initScrollReveal();
  initSmoothScroll();
});

