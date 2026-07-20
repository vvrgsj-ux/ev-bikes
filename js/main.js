// DOM Elements
const loader = document.getElementById('loader');
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelectorAll('.nav-link');
const modelsGrid = document.getElementById('modelsGrid');
const galleryGrid = document.getElementById('galleryGrid');
const testrideForm = document.getElementById('testrideForm');
const backToTop = document.getElementById('backToTop');

// Hide loader
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Back to top
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Render Models
function renderModels() {
    modelsGrid.innerHTML = models.map((model, index) => `
        <div class="model-card" style="animation-delay: ${index * 0.1}s">
            <div class="model-image">
                <img src="${model.image}" alt="${model.name}" loading="lazy">
            </div>
            <div class="model-body">
                <div class="model-header">
                    <h3 class="model-name">${model.name}</h3>
                    <span class="model-category">${model.category.split(' ')[0]}</span>
                </div>
                <div class="model-specs">
                    <div class="spec-item">
                        <div class="spec-label">Motor</div>
                        <div class="spec-value">${model.specs.motor}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Battery</div>
                        <div class="spec-value">${model.specs.battery}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Range</div>
                        <div class="spec-value">${model.specs.range}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Top Speed</div>
                        <div class="spec-value">${model.specs.topSpeed}</div>
                    </div>
                </div>
                <div class="model-actions">
                    <button class="btn btn-primary" style="flex: 1; padding: 10px;">Details</button>
                    <button class="action-btn" onclick="scrollToTestRide()">Test Ride</button>
                    <a href="https://wa.me/919994598837?text=Hi%20Vettry%20E-bikes!%20I%20am%20interested%20in%20${model.name}" target="_blank" class="action-btn">WhatsApp</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Render Gallery
function renderGallery() {
    galleryGrid.innerHTML = galleryItems.map(item => `
        <div class="gallery-item">
            <img src="${item.image}" alt="${item.label}" loading="lazy">
            <div class="gallery-overlay">
                <p class="gallery-label">${item.label}</p>
            </div>
        </div>
    `).join('');
}

// Scroll to test ride
function scrollToTestRide() {
    document.getElementById('testride').scrollIntoView({ behavior: 'smooth' });
}

// Form submission
testrideForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(testrideForm);
    const name = formData.get('name') || e.target[0].value;
    const phone = formData.get('phone') || e.target[1].value;
    const model = e.target[2].value;
    const date = e.target[3].value;
    
    const whatsappMessage = `Hi Vettry E-bikes!%0AI would like to book a test ride for ${model} on ${date}. My name is ${name} and my phone number is ${phone}.`;
    const whatsappUrl = `https://wa.me/919994598837?text=${whatsappMessage}`;
    
    window.open(whatsappUrl, '_blank');
    testrideForm.reset();
});

// Initialize
renderModels();
renderGallery();

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                imageObserver.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});