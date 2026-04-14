// =============================================
// Stake Landing Page — JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- DOM REFERENCES ----
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.navbar__mobile-link');
  const allAnchorLinks = document.querySelectorAll('a[href^="#"]');

  // ---- STICKY NAVBAR ON SCROLL ----
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // initial check

  // ---- HAMBURGER MENU TOGGLE ----
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('navbar__hamburger--active');
    mobileMenu.classList.toggle('navbar__mobile-menu--open');
    document.body.classList.toggle('no-scroll', isOpen);
  });

  // Close mobile menu on link tap
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('navbar__hamburger--active');
      mobileMenu.classList.remove('navbar__mobile-menu--open');
      document.body.classList.remove('no-scroll');
    });
  });

  // ---- SMOOTH SCROLLING ----
  allAnchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offset = navbar.offsetHeight + 10;
          const y = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  });

  // ---- INTERSECTION OBSERVER — SCROLL ANIMATIONS ----
  const observerConfig = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const scrollAnimator = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        scrollAnimator.unobserve(entry.target);
      }
    });
  }, observerConfig);

  // Register elements for animation
  const elementsToAnimate = document.querySelectorAll(
    '.feature__card, .feature__info, .price__container, .price__card'
  );
  elementsToAnimate.forEach(el => {
    el.classList.add('animate-hidden');
    scrollAnimator.observe(el);
  });

  // ---- COUNTER ANIMATION FOR STATS ----
  const statsCard = document.getElementById('statsCard');
  let statsAnimated = false;

  const animateCounter = (element, target, prefix = '', suffix = '') => {
    const duration = 1800;
    const startTime = performance.now();
    const startValue = 0;

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + (target - startValue) * eased);
      element.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };
    requestAnimationFrame(update);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        const amountEl = document.querySelector('.feature__stats-amount');
        const percentEl = document.querySelector('.feature__stats-percent');
        animateCounter(amountEl, 165000, 'AED ');
        animateCounter(percentEl, 111, '+', '%');
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  if (statsCard) {
    statsObserver.observe(statsCard);
  }

  // ---- PARALLAX EFFECT ON FEATURE SECTION ----
  const featureCard = document.getElementById('featureCard');
  const featureInfo = document.getElementById('featureInfo');

  if (featureCard && featureInfo && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const rect = featureCard.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrollPercent = (windowHeight - rect.top) / (windowHeight + rect.height);
        const parallaxOffset = (scrollPercent - 0.5) * 20;
        featureCard.style.transform = `translateY(${parallaxOffset * -0.5}px)`;
      }
    }, { passive: true });
  }

  // ---- PUZZLE PIECE INTERACTION ----
  const puzzlePiece = document.getElementById('puzzlePiece');
  if (puzzlePiece && window.innerWidth > 768) {
    const cardInner = document.querySelector('.feature__card-inner');
    if (cardInner) {
      cardInner.addEventListener('mousemove', (e) => {
        const rect = cardInner.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
        puzzlePiece.style.animation = 'none';
        puzzlePiece.style.transform = `translateX(calc(-50% + ${x}px)) translateY(${y}px) rotate(${x * 0.2}deg)`;
      });
      cardInner.addEventListener('mouseleave', () => {
        puzzlePiece.style.animation = '';
        puzzlePiece.style.transform = '';
      });
    }
  }

  // ---- BATCH CARD GLOW ON HOVER ----
  const batchCards = document.querySelectorAll('.price__card');
  batchCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 60%, rgba(255,255,255,0.03) 100%)`;
    });
    card.addEventListener('mouseleave', () => {
      if (card.classList.contains('price__card--active')) {
        card.style.background = 'rgba(255, 122, 26, 0.06)';
      } else {
        card.style.background = 'rgba(255, 255, 255, 0.03)';
      }
    });
  });

  // ---- CTA BUTTON RIPPLE EFFECT ----
  const ctaBtn = document.getElementById('ctaBtn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.3);
        width: 100px;
        height: 100px;
        transform: translate(-50%, -50%) scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
      `;
      const rect = this.getBoundingClientRect();
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });

    // Add ripple keyframe dynamically
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rippleEffect {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
});
