// Portfolio Configuration
// Edit this file to customize your portfolio

const config = {
    // Personal Information
    personal: {
        name: "Aarav Agarwal",
        description: "Developer passionate about creating cool projects in C++, Java, Python, JavaScript and more",
        email: "theaaravagarwall@gmail.com",
        github: "theaaravagarwal", // Your GitHub username
        linkedin: "theaaravagarwal" // Your LinkedIn username
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
        { name: "JavaScript", icon: "fab fa-js" },
        { name: "HTML/CSS", icon: "fab fa-html5" },
        { name: "Git", icon: "fab fa-git-alt" },
        { name: "React", icon: "fab fa-react" },
        { name: "Node.js", icon: "fab fa-node-js" }
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