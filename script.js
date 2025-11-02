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
            role: "Backend Engineer & Competitive Programmer",
            description: "I build reliable services and tackle complex problems end to end.",
            email: "your.email@example.com",
            github: "yourusername",
            linkedin: "yourlinkedin",
            heroHighlights: ["Distributed Systems", "API Design", "Observability"]
        },
        about: {
            description: "I'm a backend-focused developer who loves turning business needs into resilient services.",
            highlights: [
                "Architect scalable APIs and data pipelines that can grow with products",
                "Instrument systems so teams stay observable under real-world traffic",
                "Apply algorithmic thinking to production bottlenecks and new features"
            ]
        },
        expertise: {
            intro: "I help teams launch dependable platforms, smooth developer workflows, and keep performance in check.",
            areas: [
                {
                    title: "Service Architecture",
                    description: "Designing modular services, data models, and communication patterns.",
                    icon: "fas fa-server"
                },
                {
                    title: "Platform Engineering",
                    description: "Automating CI/CD, infrastructure, and developer tooling.",
                    icon: "fas fa-cubes"
                },
                {
                    title: "Performance & Reliability",
                    description: "Profiling hot paths and introducing safeguards that reduce incidents.",
                    icon: "fas fa-chart-line"
                }
            ]
        },
        experience: [
            {
                role: "Backend Developer",
                company: "Freelance",
                timeframe: "2022 - Present",
                description: "Builds APIs, data processing jobs, and integrations for fast-moving teams.",
                achievements: [
                    "Delivered REST and GraphQL services powering analytics and automation.",
                    "Introduced observability with Prometheus/Grafana to cut mean time to detect by 40%."
                ]
            },
            {
                role: "Open Source Contributor",
                company: "Community",
                timeframe: "Ongoing",
                description: "Maintains utilities that simplify deployments and infrastructure ops.",
                achievements: [
                    "Optimized Node.js services with caching and connection pooling improvements.",
                    "Authored CI pipelines that reduced release friction for contributors."
                ]
            }
        ],
        competitive: {
            summary: "I keep sharp by solving algorithmic problems weekly across major platforms.",
            stats: [
                { label: "Codeforces", value: "Specialist" },
                { label: "CodeChef", value: "4-Star" },
                { label: "LeetCode", value: "Top 10%" }
            ],
            profiles: [
                { platform: "Codeforces", handle: "@handle", url: "#", icon: "fas fa-bolt" },
                { platform: "CodeChef", handle: "@handle", url: "#", icon: "fas fa-trophy" },
                { platform: "LeetCode", handle: "@handle", url: "#", icon: "fas fa-code" }
            ]
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
    updateAboutSection();
    renderTechStack();
    renderExpertise();
    renderExperience();
    renderCompetitive();
    fetchGitHubProjects();
    setupEventListeners();
}

function updatePersonalInfo() {
    const personal = config.personal || {};

    const navName = document.getElementById('nav-name');
    if (navName && personal.name) {
        navName.textContent = personal.name;
    }

    const heroName = document.getElementById('hero-name');
    if (heroName && personal.name) {
        heroName.textContent = `Hi, I'm ${personal.name}`;
    }

    const footerName = document.getElementById('footer-name');
    if (footerName && personal.name) {
        footerName.textContent = personal.name;
    }

    const heroRole = document.getElementById('hero-role');
    if (heroRole) {
        heroRole.textContent = personal.role || 'Backend Developer';
    }

    const heroDescription = document.getElementById('hero-description');
    if (heroDescription && personal.description) {
        heroDescription.textContent = personal.description;
    }

    const heroHighlightsContainer = document.getElementById('hero-highlights');
    if (heroHighlightsContainer) {
        const highlights = Array.isArray(personal.heroHighlights) ? personal.heroHighlights : [];
        heroHighlightsContainer.innerHTML = '';

        if (highlights.length > 0) {
            heroHighlightsContainer.style.display = 'flex';
            highlights.forEach(highlight => {
                const highlightEl = document.createElement('span');
                highlightEl.className = 'hero-highlight';
                highlightEl.textContent = highlight;
                heroHighlightsContainer.appendChild(highlightEl);
            });
        } else {
            heroHighlightsContainer.style.display = 'none';
        }
    }

    if (personal.name) {
        const pageTitle = personal.role ? `${personal.name} | ${personal.role}` : `${personal.name} | Portfolio`;
        document.title = pageTitle;
    }

    const githubLink = document.getElementById('github-link');
    if (githubLink && personal.github) {
        githubLink.href = `https://github.com/${personal.github}`;
    }

    const emailLink = document.getElementById('email-link');
    if (emailLink && personal.email) {
        emailLink.href = `mailto:${personal.email}`;
    }

    const linkedinLink = document.getElementById('linkedin-link');
    if (linkedinLink && personal.linkedin) {
        linkedinLink.href = `https://linkedin.com/in/${personal.linkedin}`;
    }
}

function updateAboutSection() {
    const about = config.about || {};

    const aboutDescription = document.getElementById('about-description');
    if (aboutDescription && about.description) {
        aboutDescription.textContent = about.description;
    }

    const highlightsList = document.getElementById('about-highlights');
    if (highlightsList) {
        const highlightsWrapper = highlightsList.closest('.about-highlights');
        const highlights = Array.isArray(about.highlights) ? about.highlights : [];
        highlightsList.innerHTML = '';

        if (highlights.length > 0) {
            highlights.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                highlightsList.appendChild(li);
            });
            if (highlightsWrapper) {
                highlightsWrapper.style.display = 'block';
            }
        } else if (highlightsWrapper) {
            highlightsWrapper.style.display = 'none';
        }
    }
}

function renderTechStack() {
    const techStackContainer = document.getElementById('tech-stack');
    if (!techStackContainer) return;

    techStackContainer.innerHTML = '';
    const techStack = Array.isArray(config.techStack) ? config.techStack : [];
    
    techStack.forEach(tech => {
        const techItem = document.createElement('div');
        techItem.className = 'tech-item';
        techItem.innerHTML = `
            <i class="${tech.icon}"></i>
            <div>${tech.name}</div>
        `;
        techStackContainer.appendChild(techItem);
    });
}

function renderExpertise() {
    const expertiseSection = config.expertise || {};
    const intro = document.getElementById('expertise-intro');
    if (intro && expertiseSection.intro) {
        intro.textContent = expertiseSection.intro;
    }

    const grid = document.getElementById('expertise-grid');
    if (!grid) return;

    const areas = Array.isArray(expertiseSection.areas) ? expertiseSection.areas : [];
    if (areas.length === 0) {
        return;
    }

    grid.innerHTML = '';
    areas.forEach(area => {
        const card = document.createElement('div');
        card.className = 'expertise-card';
        const iconMarkup = area.icon ? `<i class="${area.icon}"></i>` : '';
        card.innerHTML = `
            ${iconMarkup}
            <h3>${area.title || 'Expertise'}</h3>
            <p>${area.description || ''}</p>
        `;
        grid.appendChild(card);
    });
}

function renderExperience() {
    const timeline = document.getElementById('experience-timeline');
    if (!timeline) return;

    const experiences = Array.isArray(config.experience) ? config.experience : [];
    if (experiences.length === 0) {
        return;
    }

    timeline.innerHTML = '';
    experiences.forEach(experience => {
        const item = document.createElement('div');
        item.className = 'experience-item';

        const headingParts = [experience.role, experience.company].filter(Boolean);
        const heading = headingParts.join(' &middot; ') || 'Experience';
        const timeframe = experience.timeframe
            ? `<span class="experience-date">${experience.timeframe}</span>`
            : '';
        const description = experience.description
            ? `<p>${experience.description}</p>`
            : '';

        item.innerHTML = `
            <div class="experience-header">
                <h3>${heading}</h3>
                ${timeframe}
            </div>
            ${description}
        `;

        if (Array.isArray(experience.achievements) && experience.achievements.length > 0) {
            const list = document.createElement('ul');
            experience.achievements.forEach(point => {
                const listItem = document.createElement('li');
                listItem.textContent = point;
                list.appendChild(listItem);
            });
            item.appendChild(list);
        }

        timeline.appendChild(item);
    });
}

function renderCompetitive() {
    const competitive = config.competitive || {};

    const summary = document.getElementById('competitive-summary');
    if (summary && competitive.summary) {
        summary.textContent = competitive.summary;
    }

    const statsContainer = document.getElementById('competitive-stats');
    if (statsContainer) {
        const stats = Array.isArray(competitive.stats) ? competitive.stats : [];
        statsContainer.innerHTML = '';

        if (stats.length > 0) {
            statsContainer.style.display = 'grid';
            stats.forEach(stat => {
                if (!stat.label && !stat.value) return;
                const statCard = document.createElement('div');
                statCard.className = 'stat-card';
                statCard.innerHTML = `
                    <span class="stat-value">${stat.value || ''}</span>
                    <span class="stat-label">${stat.label || ''}</span>
                `;
                statsContainer.appendChild(statCard);
            });
        } else {
            statsContainer.style.display = 'none';
        }
    }

    const profilesContainer = document.getElementById('competitive-grid');
    if (profilesContainer) {
        const profilesWrapper = profilesContainer.closest('.competitive-links');
        const profiles = Array.isArray(competitive.profiles) ? competitive.profiles : [];
        profilesContainer.innerHTML = '';

        if (profiles.length > 0) {
            profiles.forEach(profile => {
                if (!profile.platform && !profile.handle) return;
                const link = document.createElement('a');
                link.className = 'competitive-card';
                link.href = profile.url || '#';
                if (profile.url) {
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                }
                const iconMarkup = profile.icon ? `<i class="${profile.icon}"></i>` : '<i class="fas fa-code"></i>';
                link.innerHTML = `
                    ${iconMarkup}
                    <div>
                        <span class="platform">${profile.platform || ''}</span>
                        <span class="handle">${profile.handle || ''}</span>
                    </div>
                `;
                profilesContainer.appendChild(link);
            });
            if (profilesWrapper) {
                profilesWrapper.style.display = 'block';
            }
        } else if (profilesWrapper) {
            profilesWrapper.style.display = 'none';
        }
    }
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
