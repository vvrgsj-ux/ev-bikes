// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Title animations
function splitTitle(element) {
    const text = element.innerText;
    element.innerText = '';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.innerText = char;
        span.style.display = 'inline-block';
        element.appendChild(span);
    });
    
    gsap.from(element.querySelectorAll('span'), {
        duration: 0.8,
        opacity: 0,
        y: 20,
        stagger: 0.05,
        ease: 'back.out'
    });
}

// Initialize title animation
const titleElement = document.querySelector('[data-split]');
if (titleElement) {
    window.addEventListener('load', () => {
        splitTitle(titleElement);
    });
}

// Scroll animations
function initScrollAnimations() {
    // Model cards
    const modelCards = document.querySelectorAll('.model-card');
    modelCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.6,
            opacity: 0,
            y: 30,
            delay: index * 0.1
        });
    });

    // About features
    const features = document.querySelectorAll('.feature-item');
    features.forEach((feature, index) => {
        gsap.from(feature, {
            scrollTrigger: {
                trigger: feature,
                start: 'top 80%'
            },
            duration: 0.5,
            opacity: 0,
            x: -20,
            delay: index * 0.1
        });
    });

    // Gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%'
            },
            duration: 0.5,
            opacity: 0,
            scale: 0.9,
            delay: index * 0.05
        });
    });

    // Contact cards
    const contactCards = document.querySelectorAll('.info-card');
    contactCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%'
            },
            duration: 0.6,
            opacity: 0,
            y: 20,
            delay: index * 0.1
        });
    });
}

// Run animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    initScrollAnimations();
}

// Parallax effect on mouse move
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
    document.addEventListener('mousemove', (e) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 10;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 10;
        
        const floatingOrbs = document.querySelectorAll('.orb');
        floatingOrbs.forEach(orb => {
            gsap.to(orb, {
                x: xPos * 2,
                y: yPos * 2,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
}

// Hover effects on cards
const allCards = document.querySelectorAll('.model-card, .info-card');
allCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            duration: 0.3,
            y: -10,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            duration: 0.3,
            y: 0,
            ease: 'power2.out'
        });
    });
});

// Button ripple effect
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

const buttons = document.querySelectorAll('button.btn');
buttons.forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add ripple CSS
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization - Reduce animations on mobile
const isMobile = window.matchMedia('(max-width: 768px)').matches;
if (isMobile) {
    gsap.defaults({ duration: 0.3 });
}