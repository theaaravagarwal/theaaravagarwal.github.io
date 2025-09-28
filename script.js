// Configuration will be loaded from config.js
let config = {};

// Load configuration and initialize the site
async function loadConfig() {
    try {
        const response = await fetch('./config.js');
        const configText = await response.text();
        // Extract the config object from the file
        const configMatch = configText.match(/const config = ({[\s\S]*?});/);
        if (configMatch) {
            config = eval('(' + configMatch[1] + ')');
            initializeSite();
        }
    } catch (error) {
        console.error('Error loading config:', error);
        // Use default config if loading fails
        useDefaultConfig();
        initializeSite();
    }
}

function useDefaultConfig() {
    config = {
        personal: {
            name: "Your Name",
            description: "Developer passionate about creating cool projects",
            email: "your.email@example.com",
            github: "yourusername",
            linkedin: "yourlinkedin"
        },
        github: {
            username: "yourusername",
            excludeRepos: ["yourusername.github.io", "yourusername"],
            featuredRepos: []
        },
        techStack: [
            { name: "C++", icon: "fas fa-code" },
            { name: "Java", icon: "fab fa-java" },
            { name: "Python", icon: "fab fa-python" },
            { name: "JavaScript", icon: "fab fa-js" },
            { name: "HTML/CSS", icon: "fab fa-html5" },
            { name: "Git", icon: "fab fa-git-alt" }
        ]
    };
}

function initializeSite() {
    updatePersonalInfo();
    renderTechStack();
    fetchGitHubProjects();
    setupEventListeners();
}

function updatePersonalInfo() {
    // Update all instances of name
    document.getElementById('nav-name').textContent = config.personal.name;
    document.getElementById('hero-name').textContent = `Hi, I'm ${config.personal.name}`;
    document.getElementById('footer-name').textContent = config.personal.name;
    
    // Update description
    document.getElementById('hero-description').textContent = config.personal.description;
    
    // Update contact links
    document.getElementById('github-link').href = `https://github.com/${config.personal.github}`;
    document.getElementById('email-link').href = `mailto:${config.personal.email}`;
    document.getElementById('linkedin-link').href = `https://linkedin.com/in/${config.personal.linkedin}`;
}

function renderTechStack() {
    const techStackContainer = document.getElementById('tech-stack');
    techStackContainer.innerHTML = '';
    
    config.techStack.forEach(tech => {
        const techItem = document.createElement('div');
        techItem.className = 'tech-item';
        techItem.innerHTML = `
            <i class="${tech.icon}"></i>
            <div>${tech.name}</div>
        `;
        techStackContainer.appendChild(techItem);
    });
}

async function fetchGitHubProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    
    try {
        const response = await fetch(`https://api.github.com/users/${config.github.username}/repos?sort=updated&per_page=50`);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const repos = await response.json();
        
        // Filter out excluded repos and forks
        const filteredRepos = repos.filter(repo => 
            !repo.fork && 
            !config.github.excludeRepos.includes(repo.name) &&
            repo.name !== config.github.username
        );
        
        // Sort: featured repos first, then by stars, then by updated date
        const sortedRepos = filteredRepos.sort((a, b) => {
            const aFeatured = config.github.featuredRepos.includes(a.name);
            const bFeatured = config.github.featuredRepos.includes(b.name);
            
            if (aFeatured && !bFeatured) return -1;
            if (!aFeatured && bFeatured) return 1;
            if (b.stargazers_count !== a.stargazers_count) {
                return b.stargazers_count - a.stargazers_count;
            }
            return new Date(b.updated_at) - new Date(a.updated_at);
        });
        
        renderProjects(sortedRepos);
        
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        projectsGrid.innerHTML = `
            <div class="loading">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Unable to load projects. Please check the GitHub username in config.js</p>
            </div>
        `;
    }
}

function renderProjects(repos) {
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = '';
    
    if (repos.length === 0) {
        projectsGrid.innerHTML = `
            <div class="loading">
                <i class="fas fa-info-circle"></i>
                <p>No projects found. Make sure your repositories are public!</p>
            </div>
        `;
        return;
    }
    
    repos.forEach(repo => {
        const projectCard = createProjectCard(repo);
        projectsGrid.appendChild(projectCard);
    });
}

function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.languages = repo.language ? repo.language.toLowerCase() : '';
    
    // Determine if it's a web project
    const isWebProject = repo.language === 'HTML' || repo.language === 'CSS' || 
                        repo.language === 'JavaScript' || 
                        (repo.topics && repo.topics.some(topic => 
                            ['web', 'website', 'frontend', 'react', 'vue', 'angular'].includes(topic)
                        ));
    
    if (isWebProject) {
        card.dataset.languages += ' web';
    }
    
    const languages = repo.language ? [repo.language] : [];
    const languageTags = languages.map(lang => 
        `<span class="language-tag">${lang}</span>`
    ).join('');
    
    const liveLink = repo.homepage ? 
        `<a href="${repo.homepage}" class="project-link" title="Live Demo" target="_blank">
            <i class="fas fa-external-link-alt"></i>
        </a>` : '';
    
    card.innerHTML = `
        <div class="project-header">
            <h3 class="project-title">${repo.name}</h3>
            <p class="project-description">${repo.description || 'No description available'}</p>
        </div>
        <div class="project-stats">
            <div class="project-stat">
                <i class="fas fa-star"></i>
                <span>${repo.stargazers_count}</span>
            </div>
            <div class="project-stat">
                <i class="fas fa-code-branch"></i>
                <span>${repo.forks_count}</span>
            </div>
            <div class="project-stat">
                <i class="fas fa-eye"></i>
                <span>${repo.watchers_count}</span>
            </div>
        </div>
        <div class="project-footer">
            <div class="project-languages">
                ${languageTags}
            </div>
            <div class="project-links">
                ${liveLink}
                <a href="${repo.html_url}" class="project-link" title="View Code" target="_blank">
                    <i class="fab fa-github"></i>
                </a>
            </div>
        </div>
    `;
    
    return card;
}

function setupEventListeners() {
    // Smooth scrolling for navigation links
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
    
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            
            // Filter projects
            document.querySelectorAll('.project-card').forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const languages = card.dataset.languages;
                    if (languages.includes(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Initialize the site when the page loads
document.addEventListener('DOMContentLoaded', loadConfig);