// =============================================
// Stake Landing Page — JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  // ---- DOM ELEMENTS ----
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.navbar__mobile-link');
  const navLinks = document.querySelectorAll('a[href^="#"]');

  // ---- STICKY NAVBAR ----
  let lastScrollY = 0;
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 50) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
    lastScrollY = currentScrollY;
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // ---- HAMBURGER MENU TOGGLE ----
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('navbar__hamburger--active');
    mobileMenu.classList.toggle('navbar__mobile-menu--open');
    document.body.classList.toggle('no-scroll');
  });

  // Close mobile menu on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('navbar__hamburger--active');
      mobileMenu.classList.remove('navbar__mobile-menu--open');
      document.body.classList.remove('no-scroll');
    });
  });

  // ---- SMOOTH SCROLL ----
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const navHeight = navbar.offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ---- INTERSECTION OBSERVER FOR ANIMATIONS ----
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        animateOnScroll.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements
  const animatedElements = document.querySelectorAll(
    '.feature__card, .feature__info, .price__container, .price__card'
  );
  animatedElements.forEach(el => {
    el.classList.add('animate-hidden');
    animateOnScroll.observe(el);
  });

  // ---- BATCH CARD HOVER EFFECTS (desktop enhancement) ----
  const batchCards = document.querySelectorAll('.price__card');
  batchCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)';
    });
    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('price__card--active')) {
        card.style.transform = 'translateY(0)';
      } else {
        card.style.transform = 'translateY(-4px)';
      }
    });
  });
});
