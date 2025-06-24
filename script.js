// ---------------------------
// SCROLL DETECTION (OPTIONAL)
// ---------------------------
let isScrolling = false;
let scrollTimeout;

window.addEventListener('scroll', () => {
  isScrolling = true;
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    isScrolling = false;
  }, 150);
});


const scrollEls = document.querySelectorAll('.scroll-animate');

const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target); // Only run once
    }
  });
}, {
  threshold: 0.1
});

scrollEls.forEach(el => {
  revealObserver.observe(el);
});


const slideEls = document.querySelectorAll('.scroll-slide');

const onceObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target); // ✅ stops observing = no reverse
    }
  });
}, {
  threshold: 0.2
});

slideEls.forEach(el => onceObserver.observe(el));



// ---------------------------
// ALIEN ORB CURSOR FOLLOWER
// ---------------------------
const orb = document.querySelector(".orb-cursor");

let mouseX = 0, mouseY = 0;
let orbX = 0, orbY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateOrb() {
  orbX += (mouseX - orbX) * 0.12;
  orbY += (mouseY - orbY) * 0.12;
  orb.style.transform = `translate(${orbX}px, ${orbY}px)`;
  requestAnimationFrame(animateOrb);
}
animateOrb();


// ---------------------------
// FADE-IN ON SCROLL
// ---------------------------
const faders = document.querySelectorAll('.fade-in');

const appearOnScroll = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.2
  }
);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// ---------------------------
// DARK MODE TOGGLE
// ---------------------------
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

function updateThemeLabel() {
  const isLight = body.classList.contains('light-mode');
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    themeToggle.textContent = isLight ? 'Dark Mode: Off' : 'Dark Mode: On';
  } else {
    themeToggle.textContent = isLight ? '☀️' : '🌙';
  }
}

// Detect preferred theme
if (window.matchMedia('(prefers-color-scheme: light)').matches) {
  body.classList.add('light-mode');
}
updateThemeLabel();

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  updateThemeLabel();
});

// Also update if window resizes
window.addEventListener('resize', updateThemeLabel);


// ---------------------------
// Timeline 
// ---------------------------

// Animate vertical timeline line on scroll
const timelineObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.2});

const timeline = document.querySelector(".timeline");
timelineObserver.observe(timeline);


// ---------------------------
// PAGE LOAD ANIMATION

window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");
});

// ---------------------------
// HAMBURGER MENU TOGGLE
// ---------------------------
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Mobile nav auto-close on scroll or outside tap
window.addEventListener('scroll', () => {
  if (navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    document.body.classList.remove('nav-open'); // Also hide orb if needed
  }
});

document.addEventListener('click', (e) => {
  // Only close if clicked outside nav and hamburger
  const clickedInsideNav = navLinks.contains(e.target) || hamburger.contains(e.target);
  if (!clickedInsideNav && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    document.body.classList.remove('nav-open');
  }
});

document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    document.body.classList.remove('nav-open');
  });
});




// ---------------------------
// project section 
// ---------------------------

function openProject(id) {
  document.querySelectorAll('section').forEach(section => {
    if (!section.classList.contains('navbar')) {
      section.style.display = 'none';
    }
  });

  const projectSection = document.getElementById(id);
  if (projectSection) {
    projectSection.style.display = 'flex';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

document.querySelectorAll('.back-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.project-detail').forEach(sec => sec.style.display = 'none');
    document.querySelectorAll('section').forEach(section => {
      if (!section.classList.contains('project-detail')) {
        section.style.display = '';
      }
    });
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});




// ---------------------------
// Scroll to top button
// ---------------------------

// Force scroll to top on refresh
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// Typing Animation
const terminalText = document.getElementById('terminalText');
const terminalLines = [
  "Welcome to my glitch world...",
  "I’m Yash Haldar.",
  "Scroll down to decode the rest."
];

let lineIndex = 0;
let charIndex = 0;

function typeLine() {
  if (lineIndex < terminalLines.length) {
    if (charIndex < terminalLines[lineIndex].length) {
      terminalText.textContent += terminalLines[lineIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeLine, 60);
    } else {
      terminalText.textContent += '\n';
      charIndex = 0;
      lineIndex++;
      setTimeout(() => {
        terminalText.innerHTML += '<br>';
        typeLine();
      }, 700);
    }
  }
}
typeLine();


