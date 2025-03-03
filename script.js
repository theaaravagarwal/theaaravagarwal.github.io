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
    
    // Add trail with pseudo-element
    shootingStar.style.position = 'relative';
    
    // Animation
    shootingStar.animate(
        [
            { transform: 'translateX(0) translateY(0) rotate(' + angle + 'deg)', opacity: 1 },
            { transform: 'translateX(100px) translateY(100px) rotate(' + angle + 'deg)', opacity: 0 }
        ],
        {
            duration: 1000,
            easing: 'ease-out'
        }
    );
    
    starsContainer.appendChild(shootingStar);
    
    // Remove after animation
    setTimeout(() => {
        shootingStar.remove();
    }, 1000);
}

// Initialize typed text effect
function initTypedText() {
    const typedTextElement = document.querySelector('.typed-text');
    const textArray = ['Web Developer', 'Designer', 'Freelancer', 'Photographer'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Speed control
        let typeSpeed = isDeleting ? 50 : 150;
        
        // If complete, start deleting
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = 1000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typeSpeed = 500; // Pause before typing next
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start typing effect
    setTimeout(type, 1000);
}

// Mobile navigation toggle
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Scroll effects
function initScrollEffects() {
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Highlight active nav link
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Project filtering
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send the form data to a server
            // For now, we'll just show a success message
            const formData = new FormData(contactForm);
            let formValues = {};
            
            formData.forEach((value, key) => {
                formValues[key] = value;
            });
            
            console.log('Form submitted:', formValues);
            
            // Show success message
            contactForm.innerHTML = '<div class="success-message"><h3>Thank you!</h3><p>Your message has been sent successfully. I\'ll get back to you soon.</p></div>';
        });
    }
}
