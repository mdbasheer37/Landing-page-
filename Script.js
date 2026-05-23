/* =============================================
   CHEAP4U TECHNOLOGY — LANDING PAGE SCRIPTS
   ============================================= */

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Navbar background on scroll
  if (scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Scroll-to-top button
  if (scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---- THEME TOGGLE ----
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('cheap4u-theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('cheap4u-theme', next);
});

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// Close nav on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  }
});

// ---- INTERSECTION OBSERVER ANIMATIONS ----
const animateElements = document.querySelectorAll('[data-animate]');

const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.getAttribute('data-delay') || 0;

      setTimeout(() => {
        el.classList.add('animated');
      }, parseInt(delay));

      observer.unobserve(el);
    }
  });
}, observerOptions);

animateElements.forEach(el => observer.observe(el));

// ---- 3D WALLET CARD TILT ----
const walletCard = document.querySelector('.wallet-card-3d');
if (walletCard) {
  walletCard.addEventListener('mousemove', (e) => {
    const rect = walletCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 12;
    const rotateX = -((y - centerY) / centerY) * 8;
    walletCard.querySelector('.wc-inner').style.transform =
      `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  });

  walletCard.addEventListener('mouseleave', () => {
    walletCard.querySelector('.wc-inner').style.transform = '';
  });
}

// ---- ANIMATED COUNTER ----
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(start).toLocaleString();
  }, 16);
}

// Trigger counters when visible
const statNums = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      const num = parseFloat(text.replace(/[^0-9.]/g, ''));
      if (!isNaN(num) && num > 1) {
        const suffix = text.replace(/[0-9.]/g, '');
        animateCounter(el, num, 1500);
        // Restore suffix after animation
        setTimeout(() => { el.textContent = text; }, 1600);
      }
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => statObserver.observe(el));

// ---- CONTACT FORM ----
function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const success = document.getElementById('cfSuccess');

  // Simulate submission
  btn.textContent = 'Sending...';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  setTimeout(() => {
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #00c896, #009977)';
    success.classList.add('show');
    form.reset();

    setTimeout(() => {
      btn.innerHTML = 'Send Message <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>';
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.style.background = '';
      success.classList.remove('show');
    }, 4000);
  }, 1500);
}

// ---- SMOOTH HOVER LIFT ON CARDS ----
const serviceCards = document.querySelectorAll('.service-card:not(.featured-card)');
serviceCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const icon = card.querySelector('.sc-icon-wrap');
    if (icon) icon.style.transform = 'scale(1.1) rotate(-3deg)';
  });
  card.addEventListener('mouseleave', () => {
    const icon = card.querySelector('.sc-icon-wrap');
    if (icon) icon.style.transform = '';
  });
});

// ---- ACTIVE NAV LINK ON SCROLL ----
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.id;
  });

  navAnchors.forEach(a => {
    a.style.color = '';
    a.style.background = '';
    if (a.getAttribute('href') === `#${current}`) {
      a.style.color = 'var(--blue)';
      a.style.background = 'var(--blue-xlight)';
    }
  });
});

// ---- PHONE MOCKUP INTERACTIVE ----
const psIcons = document.querySelectorAll('.ps-icon');
psIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    icon.style.transform = 'scale(0.9)';
    setTimeout(() => { icon.style.transform = ''; }, 200);
  });
});

// ---- PARALLAX HERO SHAPES (subtle) ----
window.addEventListener('mousemove', (e) => {
  const shapes = document.querySelectorAll('.shape');
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  shapes.forEach((shape, i) => {
    const factor = (i + 1) * 0.5;
    shape.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

// ---- WALLET CARD BUTTON FEEDBACK ----
const pwcBtn = document.querySelector('.pwc-btn');
if (pwcBtn) {
  pwcBtn.addEventListener('click', () => {
    const original = pwcBtn.textContent;
    pwcBtn.textContent = '✓ Opening...';
    setTimeout(() => { pwcBtn.textContent = original; }, 1500);
  });
}

// ---- SCREENSHOT CARD HOVER DETAIL ----
const screenshotCards = document.querySelectorAll('.screenshot-card');
screenshotCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const mockup = card.querySelector('.ss-mockup');
    if (!card.classList.contains('featured-ss')) {
      mockup.style.boxShadow = 'var(--shadow-xl), 0 0 0 6px var(--blue)';
    }
  });
  card.addEventListener('mouseleave', () => {
    const mockup = card.querySelector('.ss-mockup');
    if (!card.classList.contains('featured-ss')) {
      mockup.style.boxShadow = '';
    }
  });
});

// ---- LOADING ANIMATION ----
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});

console.log('%c🇳🇬 Cheap4u Technology', 'color: #0d8bff; font-size: 18px; font-weight: bold;');
console.log('%cFast & Affordable VTU Services in Nigeria', 'color: #3d5a80; font-size: 12px;');
