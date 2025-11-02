// Portfolio Configuration
// Edit this file to customize your portfolio

const config = {
    // Personal Information
    personal: {
        name: "Aarav Agarwal",
        role: "Backend Engineer & Competitive Programmer",
        description: "I architect resilient APIs, automate developer workflows, and keep distributed systems observable.",
        email: "theaaravagarwall@gmail.com",
        github: "theaaravagarwal",
        linkedin: "theaaravagarwal",
        heroHighlights: [
            "Distributed Systems",
            "API Design",
            "Observability & Reliability"
        ]
    },

    about: {
        description: "I'm a backend-focused developer who loves translating complex requirements into fast, reliable services. Competitive programming keeps my problem-solving sharp while real-world work keeps me grounded in shipping value.",
        highlights: [
            "Design event-driven microservices and data pipelines for growing products",
            "Automate CI/CD and infrastructure-as-code so teams can deploy on demand",
            "Instrument services with metrics, tracing, and logging to stay production ready"
        ]
    },

    expertise: {
        intro: "From greenfield builds to scaling mature systems, I focus on backend foundations that let products evolve safely.",
        areas: [
            {
                title: "Service Architecture",
                description: "Designing REST/GraphQL APIs, async workers, and resilient messaging flows.",
                icon: "fas fa-network-wired"
            },
            {
                title: "Data & Storage",
                description: "Modeling relational/NoSQL schemas, building ETL jobs, and keeping data trustworthy.",
                icon: "fas fa-database"
            },
            {
                title: "Developer Experience",
                description: "Automating deployments, crafting observability dashboards, and improving engineering velocity.",
                icon: "fas fa-toolbox"
            }
        ]
    },

    experience: [
        {
            role: "Backend Engineer",
            company: "Freelance",
            timeframe: "2022 - Present",
            description: "Partner with early-stage teams to deliver production-ready services and analytics pipelines.",
            achievements: [
                "Shipped a payments API with event-driven reconciliation and audit-ready reporting.",
                "Cut feature lead-time by automating CI/CD pipelines and containerized staging environments."
            ]
        },
        {
            role: "Software Engineering Intern",
            company: "Productivity SaaS Startup",
            timeframe: "Summer 2023",
            description: "Implemented core services for a telemetry platform processing millions of events per day.",
            achievements: [
                "Built gRPC microservices with Redis-backed caching to reduce response latency by 35%.",
                "Introduced structured logging and tracing that shortened debugging cycles for the team."
            ]
        },
        {
            role: "Competitive Programming Mentor",
            company: "University Coding Club",
            timeframe: "2021 - 2022",
            description: "Mentored teams preparing for regional contests and curated weekly problem sets.",
            achievements: [
                "Coached finalists who placed top 10 in a university-wide hackathon.",
                "Authored editorial-style write-ups to reinforce algorithmic intuition for club members."
            ]
        }
    ],

    competitive: {
        summary: "Competitive programming keeps my fundamentals sharp. I solve problems weekly and share takeaways with the teams I mentor.",
        stats: [
            { label: "Codeforces", value: "Expert" },
            { label: "CodeChef", value: "5-Star" },
            { label: "LeetCode", value: "Top 5%" }
        ],
        profiles: [
            { platform: "Codeforces", handle: "@theaaravagarwal", url: "https://codeforces.com/profile/theaaravagarwal", icon: "fas fa-bolt" },
            { platform: "CodeChef", handle: "@theaaravagarwal", url: "https://www.codechef.com/users/theaaravagarwal", icon: "fas fa-trophy" },
            { platform: "LeetCode", handle: "@theaaravagarwal", url: "https://leetcode.com/theaaravagarwal/", icon: "fas fa-code" }
        ]
    },

    // GitHub Settings
    github: {
        username: "theaaravagarwal", // Your GitHub username (should match personal.github)
        excludeRepos: [
            // Add repository names you want to hide from your portfolio
            "theaaravagarwal.github.io", // Usually you want to hide your portfolio repo
            "theaaravagarwal" // Profile README repo
        ],
        featuredRepos: [
            // Add repository names you want to highlight (they'll appear first)
            // Example: "my-awesome-project", "cool-algorithm"
        ]
    },

    // Technology Stack
    // Add or remove technologies you work with
    techStack: [
        { name: "C++", icon: "fas fa-code" },
        { name: "Java", icon: "fab fa-java" },
        { name: "Python", icon: "fab fa-python" },
        { name: "TypeScript", icon: "fab fa-js" },
        { name: "Node.js", icon: "fab fa-node-js" },
        { name: "PostgreSQL", icon: "fas fa-database" },
        { name: "Redis", icon: "fas fa-bolt" },
        { name: "Docker", icon: "fab fa-docker" },
        { name: "AWS", icon: "fab fa-aws" },
        { name: "Kubernetes", icon: "fas fa-project-diagram" }
        // You can add more technologies here
        // Available icons: https://fontawesome.com/icons
    ]
};

// Color scheme (optional customization)
// You can modify the CSS variables in styles.css for more advanced theming
const theme = {
    primaryColor: "#2563eb", // Blue
    secondaryColor: "#667eea", // Light blue
    accentColor: "#764ba2" // Purple
};
