// ========================================
// NAVBAR FUNCTIONALITY
// ========================================

const navbarToggle = document.getElementById('navbar-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close');
const mobileLinks = document.querySelectorAll('.mobile-link');

console.log('Mobile menu elements:', { navbarToggle, mobileMenu, mobileClose });

// Open mobile menu
if (navbarToggle && mobileMenu) {
  navbarToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Toggle clicked, adding active class');
    mobileMenu.classList.add('active');
    navbarToggle.classList.add('hidden');
    document.body.classList.add('menu-open');
  });
}

// Close mobile menu
if (mobileClose && mobileMenu) {
  mobileClose.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Close clicked, removing active class');
    mobileMenu.classList.remove('active');
    navbarToggle.classList.remove('hidden');
    document.body.classList.remove('menu-open');
  });
}

// Close menu when clicking backdrop
if (mobileMenu) {
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu || e.target.classList.contains('mobile-menu')) {
      console.log('Backdrop clicked, closing menu');
      mobileMenu.classList.remove('active');
      navbarToggle.classList.remove('hidden');
      document.body.classList.remove('menu-open');
    }
  });
}

// Close menu when clicking a link
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    console.log('Link clicked, closing menu');
    mobileMenu.classList.remove('active');
    navbarToggle.classList.remove('hidden');
    document.body.classList.remove('menu-open');
  });
});

// Active link highlighting
const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
const sections = document.querySelectorAll('section[id]');

function setActiveLink() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', setActiveLink);

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ========================================
// FAQ ACCORDION
// ========================================
// EVENT/PROJECT UTILITIES
// ========================================

function toggleModel(text) {
  var model = document.getElementById(text)
  model.classList.toggle("hidden")
  model.classList.toggle("visible")
}

function toggleEvent(text) {
  var card = document.getElementById(text)
  card.firstElementChild.classList.toggle("hidden")
}


let events = document.getElementById('event-content')
events = events.children
let projects = document.getElementById('project-content')
projects = projects.children

let mainEventOptions = {
  root: document.querySelector("#event-content"),
  rootMargin: "0px",
  threshold: 0.9,
};
let mainProjectOptions = {
  root: document.querySelector("#project-content"),
  rootMargin: "0px",
  threshold: 0.9,
};
var event_vis = {}
var project_vis = {}

let mainEventCallback = (entries) => {
  entries.forEach((entry) => {
    event_vis[entry.target.id] = entry.isIntersecting
  });
}
let mainProjectCallback = (entries) => {
  entries.forEach((entry) => {
    project_vis[entry.target.id] = entry.isIntersecting
  });
};
let mainEventObserver = new IntersectionObserver(mainEventCallback, mainEventOptions);
let mainProjectObserver = new IntersectionObserver(mainProjectCallback, mainProjectOptions);

for (let i = 0; i < events.length; i++) {
  mainEventObserver.observe(events[i])
}
for (let i = 0; i < projects.length; i++) {
  mainProjectObserver.observe(projects[i])
}

function slide(a, b) {
  let vis;
  if(a==0){
    vis=event_vis
  }
  if(a==1){
    vis=project_vis
  }
  let left = Object.values(vis).indexOf(true)
  let right = left+2
  let first_id = Object.keys(vis).at(left)
  let last_id = Object.keys(vis).at(right)

  if(b==1){
    if(right>=Object.values(vis).length-1){
      slide(a,-1)
    }else{
      let target=document.getElementById(Object.keys(vis).at(right+1))
      target.scrollIntoView({ behavior: "smooth",block:"center", inline: "nearest" });
    }
  }
  if(b==-1){
    if(left<=0){
      slide(a, 1)
    }else{
      let target=document.getElementById(Object.keys(vis).at(left-1))
      target.scrollIntoView({ behavior: "smooth",block:"center", inline: "nearest" });
    }
  }
}

// ========================================
// HERO TAGLINE ANIMATION
// ========================================

// Wait for GSAP to load, then initialize the animation
function initHeroAnimation() {
  if (typeof gsap === 'undefined') {
    console.log('GSAP not loaded yet, waiting...');
    setTimeout(initHeroAnimation, 100);
    return;
  }

  // Register GSAP plugins
  if (typeof TextPlugin !== 'undefined') {
    gsap.registerPlugin(TextPlugin);
  }

  // Get all elements
  const mathSymbols = document.querySelectorAll('.math-symbol');
  const hiddenTexts = document.querySelectorAll('.hidden-text');
  const line1Words = document.querySelectorAll('.line-1 .word');
  const line2Words = document.querySelectorAll('.line-2 .word');

  // Initial setup - hide everything
  gsap.set([line1Words, line2Words], { 
    opacity: 0,
    x: -20
  });

  // Hide text versions, show symbols
  hiddenTexts.forEach(text => {
    text.style.display = 'none';
    text.style.opacity = '0';
  });

  mathSymbols.forEach(symbol => {
    symbol.style.display = 'inline-block';
    symbol.style.opacity = '1';
  });

  // Create main timeline
  const mainTimeline = gsap.timeline();

  // Animate line 1 words in from left to right
  mainTimeline.to(line1Words, {
    opacity: 1,
    x: 0,
    duration: 0.4,
    stagger: 0.08,
    ease: "power2.out"
  });

  // Animate line 2 words in from left to right
  mainTimeline.to(line2Words, {
    opacity: 1,
    x: 0,
    duration: 0.4,
    stagger: 0.08,
    ease: "power2.out"
  }, "-=0.2"); // Slight overlap with line 1

  // Wait a moment before morphing
  mainTimeline.add(() => {}, "+=0.5");

  // Morph each symbol to text
  const morphPairs = [
    { symbol: '.symbol-not', text: '.text-not' },
    { symbol: '.symbol-in-1', text: '.text-in-1' },
    { symbol: '.symbol-in-2', text: '.text-in-2' },
    { symbol: '.symbol-real', text: '.text-real' }
  ];

  morphPairs.forEach((pair, index) => {
    const symbolEl = document.querySelector(pair.symbol);
    const textEl = document.querySelector(pair.text);

    if (symbolEl && textEl) {
      // Fade out symbol and float up
      mainTimeline.to(symbolEl, {
        opacity: 0,
        y: -15,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          symbolEl.style.display = 'none';
          // Immediately show text element and position it below
          textEl.style.display = 'inline-block';
          gsap.set(textEl, { y: 15, opacity: 0 });
        }
      }, index === 0 ? "morph" : "morph+=" + (index * 0.15));

      // Fade in text and rise up
      mainTimeline.to(textEl, 
        { 
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out"
        },
        "morph+=" + (index * 0.15 + 0.15)
      );
    }
  });

  // Clean up transform properties after all animations complete
  mainTimeline.eventCallback("onComplete", () => {
    gsap.set([line1Words, line2Words], { clearProps: "transform,x,y" });
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroAnimation);
} else {
  initHeroAnimation();
}

