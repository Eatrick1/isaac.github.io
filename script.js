// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate menu toggle button
        const spans = menuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 1)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Counter Animation for Stats
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };
    
    updateCounter();
}

// Intersection Observer for animations and counters
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate counters
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // Only animate once
            }
            
            // Fade in elements
            if (entry.target.classList.contains('blog-post') || 
                entry.target.classList.contains('category-card') || 
                entry.target.classList.contains('gallery-item') ||
                entry.target.classList.contains('wildlife-card') ||
                entry.target.classList.contains('portrait-card') ||
                entry.target.classList.contains('testimonial-card')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        }
    });
}, observerOptions);

// Observe all elements that should animate
document.addEventListener('DOMContentLoaded', () => {
    // Observe fade elements
    const fadeElements = document.querySelectorAll('.blog-post, .category-card, .gallery-item, .wildlife-card, .portrait-card, .testimonial-card');
    
    fadeElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Observe stat counters
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
});

// Gallery Lightbox functionality
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        createLightbox(item);
    });
});

function createLightbox(item) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        animation: fadeIn 0.3s ease-out;
    `;
    
    const img = item.querySelector('img').cloneNode(true);
    img.style.cssText = `
        max-width: 90%;
        max-height: 90vh;
        object-fit: contain;
        animation: zoomIn 0.3s ease-out;
        border-radius: 2px;
    `;
    
    // Add caption if available
    const caption = item.getAttribute('data-caption');
    if (caption) {
        const captionEl = document.createElement('div');
        captionEl.textContent = caption;
        captionEl.style.cssText = `
            position: absolute;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            font-size: 1.2rem;
            text-align: center;
            padding: 1rem 2rem;
            background: rgba(0, 0, 0, 0.7);
            border-radius: 2px;
        `;
        lightbox.appendChild(captionEl);
    }
    
    lightbox.appendChild(img);
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    lightbox.addEventListener('click', () => {
        lightbox.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(lightbox);
            document.body.style.overflow = 'auto';
        }, 300);
    });
}

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes zoomIn {
        from {
            transform: scale(0.8);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Contact form handler (if form exists)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.textContent = 'Thank you for your message! I will get back to you soon.';
        successMsg.style.cssText = `
            padding: 1.5rem;
            background: #27ae60;
            color: white;
            border-radius: 4px;
            margin-top: 1rem;
            animation: slideInLeft 0.5s ease-out;
        `;
        
        contactForm.appendChild(successMsg);
        contactForm.reset();
        
        setTimeout(() => {
            successMsg.style.animation = 'fadeOut 0.5s ease-out';
            setTimeout(() => {
                contactForm.removeChild(successMsg);
            }, 500);
        }, 5000);
    });
}

// Add parallax effect to hero
if (document.querySelector('.main-header')) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content-left');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / 700);
        }
    });
}

// Testimonial hover effect enhancement
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.borderLeft = '4px solid var(--accent-gold)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.borderLeft = 'none';
    });
});

// Category card hover effect
const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.borderBottom = '4px solid var(--accent-gold)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.borderBottom = 'none';
    });
});

// Add loading state
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger animations after load
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-quote, .hero-cta, .hero-scroll');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 300);
});

// Active navigation on scroll
const sections = document.querySelectorAll('section[id], header[id]');
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

console.log('Isaac Aijuka Photography Portfolio - Loaded Successfully! 📷');