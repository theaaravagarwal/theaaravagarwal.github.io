// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Create starry background
    createStars();
    
    // Initialize typed text effect
    initTypedText();
    
    // Mobile navigation toggle
    initMobileNav();
    
    // Scroll effects
    initScrollEffects();
    
    // Project filtering
    initProjectFilters();
    
    // Form submission
    initContactForm();
});

// Create starry night background
function createStars() {
    const starsContainer = document.getElementById('stars-container');
    const starsCount = 200;
    
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size (1-3px)
        const size = Math.random() * 2 + 1;
        
        // Random opacity and animation duration/delay
        const opacity = Math.random() * 0.7 + 0.3;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;
        
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--opacity', opacity);
        star.style.setProperty('--duration', `${duration}s`);
        star.style.setProperty('--delay', `${delay}s`);
        
        starsContainer.appendChild(star);
    }
    
    // Add occasional shooting stars
    setInterval(createShootingStar, 8000);
}

// Create shooting star effect
function createShootingStar() {
    const starsContainer = document.getElementById('stars-container');
    const shootingStar = document.createElement('div');
    
    // Position and style
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const angle = Math.random() * 45 + 45; // 45-90 degrees
    
    shootingStar.style.position = 'absolute';
    shootingStar.style.left = `${startX}%`;
    shootingStar.style.top = `${startY}%`;
    shootingStar.style.width = '2px';
    shootingStar.style.height = '2px';
    shootingStar.style.backgroundColor = 'white';
    shootingStar.style.borderRadius = '50%';
    shootingStar.style.boxShadow = '0 0 10px 2px rgba(255, 255, 255, 0.7)';
    shootingStar.style.transform = `rotate(${angle}deg)`;
    
    // Add trail with pseudo-
}
