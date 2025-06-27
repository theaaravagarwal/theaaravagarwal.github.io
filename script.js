const CONFIG = {
    name: "Aarav Agarwal",
    title: "Full Stack Developer",
    email: "theaaravagarwal@gmail.com",
    phone: "+1 408 505 9054",
    location: "Sunnyvale, CA",
    typingTexts: ["Full Stack Developer", "UI/UX Designer", "Problem Solver", "Tech Enthusiast"],
    about: {
        bio: "I'm a passionate developer with 5+ years of experience creating web applications. I specialize in JavaScript, React, and Node.js, and I love building intuitive user interfaces and robust backend systems.",
        background: "My journey began at University of Technology where I studied Computer Science. Since then, I've worked with startups and established companies to deliver high-quality software solutions.",
        resumeLink: "https://example.com/resume.pdf"
    },
    socials: {
        github: "https://github.com/theaaravagarwal",
        linkedin: "https://linkedin.com/in/theaaravagarwal",
        twitter: "https://twitter.com/aaaaaaagarwal",
        codeforces: "https://codeforces.com/profile/SiegeOnSticks",
    },
    skills: {
        frontend: [
            { name: "HTML/CSS", level: 95 },
            { name: "JavaScript", level: 90 },
            { name: "React", level: 85 },
            { name: "Vue.js", level: 80 },
            { name: "Sass/SCSS", level: 85 }
        ],
        backend: [
            { name: "Java", level: 85 },
            { name: "C++", level: 80 },
            { name: "Node.js", level: 80 },
            { name: "SQL", level: 75 }
        ],
        tools: [
            { name: "Git", level: 90 },
            { name: "Docker", level: 70 },
            { name: "AWS", level: 65 },
            { name: "Figma", level: 80 },
            { name: "Webpack", level: 75 }
        ]
    },
    
    // Projects
    projects: [
        {
            title: "E-Commerce Platform",
            description: "A full-featured online store with product management, cart functionality, and payment processing using Stripe.",
            image: "https://via.placeholder.com/600x400",
            technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
            liveLink: "https://project1.example.com",
            sourceLink: "https://github.com/theaaravagarwal",
            category: "web"
        },
        {
            title: "Task Management App",
            description: "A productivity application for managing tasks, projects, and team collaboration with real-time updates.",
            image: "https://via.placeholder.com/600x400",
            technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
            liveLink: "https://project2.example.com",
            sourceLink: "https://github.com/yourusername/project2",
            category: "app"
        },
        {
            title: "Portfolio Website",
            description: "A responsive portfolio website with animated background and optimized performance.",
            image: "https://via.placeholder.com/600x400",
            technologies: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
            liveLink: "https://yourusername.github.io",
            sourceLink: "https://github.com/yourusername/yourusername.github.io",
            category: "design"
        },
        {
            title: "Weather Dashboard",
            description: "Real-time weather application with forecast data, location search, and interactive maps.",
            image: "https://via.placeholder.com/600x400",
            technologies: ["JavaScript", "OpenWeather API", "Mapbox"],
            liveLink: "https://project4.example.com",
            sourceLink: "https://github.com/yourusername/project4",
            category: "web"
        }
    ],
    
    // Star animation settings
    stars: {
        count: 300,
        size: {
            min: 1,
            max: 3
        },
        speed: {
            min: 2,
            max: 5
        },
        colors: ["#ffffff", "#f4f4f4", "#e8e8e8", "#ccccff", "#ffffcc"],
        shootingStarInterval: 6000
    }
};

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Apply configuration to HTML elements
    applyConfiguration();
    
    // Create enhanced starry background
    createEnhancedStars();
    
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
    
    // Initialize animations
    initAnimations();
});

// Apply configuration to HTML elements
function applyConfiguration() {
    // Update page title
    document.title = `${CONFIG.name} | Portfolio`;
    
    // Update name instances
    document.querySelectorAll('.user-name').forEach(el => {
        el.textContent = CONFIG.name;
    });
    
    // Update logo
    document.querySelector('.logo').textContent = CONFIG.name;
    
    // Update about section
    document.querySelector('.about-text p:first-child').textContent = CONFIG.about.bio;
    document.querySelector('.about-text p:nth-child(2)').textContent = CONFIG.about.background;
    
    // Update personal info
    document.querySelector('.info-name').textContent = CONFIG.name;
    document.querySelector('.info-email').textContent = CONFIG.email;
    document.querySelector('.info-location').textContent = CONFIG.location;
    
    // Update resume link
    const resumeLink = document.querySelector('.resume-link');
    if (resumeLink) {
        resumeLink.href = CONFIG.about.resumeLink;
    }
    
    // Update contact info
    document.querySelector('.contact-email').textContent = CONFIG.email;
    document.querySelector('.contact-phone').textContent = CONFIG.phone;
    document.querySelector('.contact-location').textContent = CONFIG.location;
    
    // Update social links
    for (const [platform, url] of Object.entries(CONFIG.socials)) {
        const link = document.querySelector(`.social-${platform}`);
        if (link) {
            link.href = url;
        }
    }
    
    // Generate skills
    generateSkills();
    
    // Generate projects
    generateProjects();
    
    // Update footer
    document.querySelector('.footer-copyright').textContent = 
        `© ${new Date().getFullYear()} ${CONFIG.name}. All Rights Reserved.`;
}

// Generate skills from configuration
function generateSkills() {
    const skillsContainer = document.querySelector('.skills-container');
    skillsContainer.innerHTML = '';
    
    // Create skill categories
    for (const [category, skills] of Object.entries(CONFIG.skills)) {
        const categoryEl = document.createElement('div');
        categoryEl.className = 'skill-category';
        
        const categoryTitle = document.createElement('h3');
        categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categoryEl.appendChild(categoryTitle);
        
        const skillItems = document.createElement('div');
        skillItems.className = 'skill-items';
        
        // Create individual skill items
        skills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            
            const skillName = document.createElement('div');
            skillName.className = 'skill-name';
            skillName.textContent = skill.name;
            
            const skillBar = document.createElement('div');
            skillBar.className = 'skill-bar';
            
            const skillLevel = document.createElement('div');
            skillLevel.className = 'skill-level';
            skillLevel.style.width = `${skill.level}%`;
            
            const skillPercentage = document.createElement('div');
            skillPercentage.className = 'skill-percentage';
            skillPercentage.textContent = `${skill.level}%`;
            
            skillBar.appendChild(skillLevel);
            skillItem.appendChild(skillName);
            skillItem.appendChild(skillBar);
            skillItem.appendChild(skillPercentage);
            skillItems.appendChild(skillItem);
        });
        
        categoryEl.appendChild(skillItems);
        skillsContainer.appendChild(categoryEl);
    }
}

// Generate projects from configuration
function generateProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = '';
    
    CONFIG.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-category', project.category);
        
        projectCard.innerHTML = `
            <div class="project-img">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.liveLink}" class="btn small" target="_blank" rel="noopener">View Project</a>
                    <a href="${project.sourceLink}" class="btn small secondary" target="_blank" rel="noopener">Source Code</a>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Create enhanced starry background
function createEnhancedStars() {
    const starsContainer = document.getElementById('stars-container');
    starsContainer.innerHTML = '';
    
    // Create canvas for better performance
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    starsContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Array to store star objects
    const stars = [];
    
    // Create stars
    for (let i = 0; i < CONFIG.stars.count; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * (CONFIG.stars.size.max - CONFIG.stars.size.min) + CONFIG.stars.size.min;
        const color = CONFIG.stars.colors[Math.floor(Math.random() * CONFIG.stars.colors.length)];
        const blinkSpeed = Math.random() * (CONFIG.stars.speed.max - CONFIG.stars.speed.min) + CONFIG.stars.speed.min;
        
        stars.push({
            x,
            y,
            radius,
            color,
            blinkSpeed,
            opacity: Math.random(),
            increasing: Math.random() > 0.5
        });
    }
    
    // Animation function
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw stars
        stars.forEach(star => {
            // Update opacity for twinkling effect
            if (star.increasing) {
                star.opacity += 0.01 * (star.blinkSpeed / 3);
                if (star.opacity >= 1) {
                    star.increasing = false;
                }
            } else {
                star.opacity -= 0.01 * (star.blinkSpeed / 3);
                if (star.opacity <= 0.1) {
                    star.increasing = true;
                }
            }
            
            // Draw star
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.globalAlpha = star.opacity;
            ctx.fill();
            
            // Add glow effect
            const gradient = ctx.createRadialGradient(
                star.x, star.y, 0,
                star.x, star.y, star.radius * 2
            );
            gradient.addColorStop(0, star.color);
            gradient.addColorStop(1, 'transparent');
            
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.globalAlpha = star.opacity * 0.3;
            ctx.fill();
            
            // Reset global alpha
            ctx.globalAlpha = 1;
        });
        
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Reposition stars
        stars.forEach(star => {
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * canvas.height;
        });
    });
    
    // Add shooting stars
    setInterval(createShootingStar, CONFIG.stars.shootingStarInterval);
}

// Create shooting star effect
function createShootingStar() {
    const canvas = document.querySelector('#stars-container canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Random position and angle
    const startX = Math.random() * canvas.width;
    const startY = Math.random() * (canvas.height / 3); // Start in top third
    const angle = Math.random() * 60 - 30; // -30 to 30 degrees
    const length = Math.random() * 150 + 100;
    const speed = Math.random() * 100 + 100;
    
    // Animation variables
    let progress = 0;
    let opacity = 0;
    
    function drawShootingStar() {
        if (progress >= 1) return;
        
        // Clear previous frame (only the area of the shooting star)
        ctx.clearRect(startX - length, startY - length, length * 2, length * 2);
        
        // Update progress
        progress += 0.02;
        
        // Calculate opacity (fade in and out)
        if (progress < 0.3) {
            opacity = progress / 0.3;
        } else if (progress > 0.7) {
            opacity = (1 - progress) / 0.3;
        } else {
            opacity = 1;
        }
        
        // Calculate current position
        const currentX = startX + Math.cos(angle * Math.PI / 180) * length * progress;
        const currentY = startY + Math.sin(angle * Math.PI / 180) * length * progress;
        
        // Draw shooting star
        ctx.beginPath();
        ctx.moveTo(currentX, currentY);
        
        // Create tail
        const tailLength = length * 0.3;
        const tailX = currentX - Math.cos(angle * Math.PI / 180) * tailLength;
        const tailY = currentY - Math.sin(angle * Math.PI / 180) * tailLength;
        
        // Draw line
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = 'rgba(255, 255, 255, ' + opacity + ')';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255, 255, 255, ' + opacity * 0.8 + ')';
        
        // Draw head
        ctx.beginPath();
        ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, ' + opacity + ')';
        ctx.fill();
        
        // Reset shadow
        ctx.shadowBlur = 0;
        
        // Continue animation
        if (progress < 1) {
            requestAnimationFrame(drawShootingStar);
        }
    }
    
    // Start animation
    drawShootingStar();
}

// Initialize typed text effect
function initTypedText() {
    const typedTextElement = document.querySelector('.typed-text');
    if (!typedTextElement) return;
    
    const textArray = CONFIG.typingTexts;
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
    
    if (!hamburger || !navLinks) return;
    
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
    
    if (!header || !sections.length) return;
    
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
        
        // Reveal elements on scroll
        document.querySelectorAll('.reveal').forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    });
}

// Project filtering
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterBtns.length || !projectCards.length) return;
    
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
    
    if (!contactForm) return;
    
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
        contactForm.innerHTML = '<div class="success-message"><h3>Thank you!</h3><p>ymessage has been sent successfully. I\'ll get back to you soon.</p></div>';
    });
}

// Initialize animations
function initAnimations() {
    // Add reveal class to elements for scroll animations
    const elementsToAnimate = document.querySelectorAll('.section-title, .about-content, .project-card, .skill-category, .contact-content');
    
    elementsToAnimate.forEach(element => {
        element.classList.add('reveal');
    });
    
    // Trigger initial scroll to activate visible elements
    window.dispatchEvent(new Event('scroll'));
}
