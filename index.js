/* ==========================================
   MODERN DEVOPS PORTFOLIO - JAVASCRIPT
   ========================================== */

// === NAVIGATION FUNCTIONALITY ===
const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// === STICKY NAVIGATION ON SCROLL ===
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add/remove scrolled class
    if (scrollTop > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop;
});

// === ACTIVE NAVIGATION LINK ===
function setActiveNav() {
    const sections = document.querySelectorAll('.section, .hero');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveNav);

// === SMOOTH SCROLL FOR NAVIGATION LINKS ===
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// === SCROLL REVEAL ANIMATION ===
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
    observer.observe(section);
});

// === STAGGERED ANIMATION FOR CARDS ===
function animateCards(cardSelector, delay = 100) {
    const cards = document.querySelectorAll(cardSelector);
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * delay}ms, transform 0.6s ease ${index * delay}ms`;
    });

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach(card => cardObserver.observe(card));
}

// Apply staggered animations to different card types
animateCards('.skill-category', 100);
animateCards('.timeline-item', 150);
animateCards('.project-card', 120);
animateCards('.cert-card', 100);
animateCards('.contact-card', 100);

// === TYPING EFFECT FOR HERO GREETING (Optional Enhancement) ===
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Uncomment to enable typing effect
// window.addEventListener('load', () => {
//     const greeting = document.querySelector('.hero-greeting');
//     if (greeting) {
//         const originalText = greeting.textContent;
//         typeWriter(greeting, originalText, 80);
//     }
// });

// === SCROLL TO TOP BUTTON (Optional) ===
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');

    // Add styles
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #00d9ff 0%, #0ea5e9 100%);
        color: #0a0e1a;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 16px rgba(0, 217, 255, 0.3);
    `;

    document.body.appendChild(scrollBtn);

    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-5px)';
        scrollBtn.style.boxShadow = '0 6px 24px rgba(0, 217, 255, 0.5)';
    });

    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0)';
        scrollBtn.style.boxShadow = '0 4px 16px rgba(0, 217, 255, 0.3)';
    });
}

// Uncomment to enable scroll to top button
createScrollToTop();

// === PARALLAX EFFECT FOR HERO BACKGROUND (Optional) ===
function initParallax() {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// Uncomment to enable parallax effect
// initParallax();

// === CURSOR GLOW EFFECT (Optional Enhancement) ===
function createCursorGlow() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 217, 255, 0.6) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        display: none;
    `;

    document.body.appendChild(cursor);

    // Show cursor glow on desktop only
    if (window.innerWidth > 768) {
        cursor.style.display = 'block';

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });

        // Enlarge on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
            });

            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
            });
        });
    }
}

// Uncomment to enable cursor glow effect
// createCursorGlow();

// === PERFORMANCE OPTIMIZATION ===
// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Use debounced scroll handler for better performance
window.addEventListener('scroll', debounce(setActiveNav, 20));

// === ACCESSIBILITY ENHANCEMENTS ===
// Add skip to content link
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#about';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -100px;
        left: 0;
        background: var(--accent-primary);
        color: var(--bg-primary);
        padding: 0.75rem 1.5rem;
        text-decoration: none;
        z-index: 10000;
        transition: top 0.3s;
    `;

    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });

    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-100px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
}

addSkipLink();

// === KEYBOARD NAVIGATION ===
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// === PROJECT CARDS INTERACTION ===
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// === SKILL CATEGORY ANIMATION ===
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach(category => {
    category.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.skill-icon');
        if (icon) {
            icon.style.transform = 'rotate(360deg) scale(1.1)';
            icon.style.transition = 'transform 0.6s ease';
        }
    });

    category.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.skill-icon');
        if (icon) {
            icon.style.transform = 'rotate(0deg) scale(1)';
        }
    });
});

// === DYNAMIC YEAR IN FOOTER ===
function updateFooterYear() {
    const footerText = document.querySelector('.footer-text');
    if (footerText) {
        const currentYear = new Date().getFullYear();
        footerText.innerHTML = `© ${currentYear} Sandeep Allakonda. Built with passion for DevOps.`;
    }
}

updateFooterYear();

// === CONSOLE EASTER EGG (Optional Fun Addition) ===
console.log(`
%c╔══════════════════════════════════════╗
║   Welcome to Sandeep's Portfolio!   ║
║                                      ║
║   Looking for something?             ║
║   Let's connect!                     ║
║                                      ║
║   GitHub: /sandeepallakonda          ║
║   Email: allakondasandeep246         ║
║          @gmail.com                  ║
╚══════════════════════════════════════╝
`, 'color: #00d9ff; font-family: monospace; font-size: 12px;');

// === PAGE LOAD PERFORMANCE ===
window.addEventListener('load', () => {
    // Remove loading class if you add one
    document.body.classList.add('loaded');

    // Log page load time (for debugging)
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});

// === HANDLE EXTERNAL LINKS ===
const externalLinks = document.querySelectorAll('a[target="_blank"]');
externalLinks.forEach(link => {
    // Add visual indicator for external links
    link.addEventListener('click', (e) => {
        // You can add analytics tracking here if needed
        console.log(`External link clicked: ${link.href}`);
    });
});

// === VIEWPORT HEIGHT FIX FOR MOBILE ===
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setViewportHeight();
window.addEventListener('resize', debounce(setViewportHeight, 100));

// === PREFERS REDUCED MOTION ===
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-normal', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

// === INTERSECTION OBSERVER FOR ANIMATIONS ===
// Additional observer for hero section
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.2
});

const hero = document.querySelector('.hero');
if (hero) {
    heroObserver.observe(hero);
}

// === END OF SCRIPT ===
console.log('Portfolio initialized successfully! 🚀');