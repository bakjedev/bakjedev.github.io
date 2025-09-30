// Load and display projects
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const data = await response.json();
        
        // Display pinned projects on home page
        const pinnedContainer = document.getElementById('pinned-projects-container');
        if (pinnedContainer) {
            const pinnedProjects = data.projects.filter(p => p.pinned);
            displayProjects(pinnedProjects, pinnedContainer);
        }
        
        // Display all projects on projects page
        const allContainer = document.getElementById('all-projects-container');
        if (allContainer) {
            displayProjects(data.projects, allContainer);
        }
        
        // Load individual project detail page
        const detailContainer = document.getElementById('project-detail-container');
        if (detailContainer) {
            loadProjectDetail(data.projects);
        }
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function displayProjects(projects, container) {
    container.innerHTML = '';
    
    projects.forEach(project => {
        const card = createProjectCard(project);
        container.appendChild(card);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = `project-card ${project.pinned ? 'pinned' : ''}`;
    
    // Make card clickable to navigate to project detail page
    card.style.cursor = 'pointer';
    card.onclick = () => {
        window.location.href = `project-detail.html?id=${project.id}`;
    };
    
    const techTags = project.technologies.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    const links = [];
    if (project.github) {
        links.push(`<a href="${project.github}" class="project-link" target="_blank" onclick="event.stopPropagation()">GitHub →</a>`);
    }
    if (project.demo) {
        links.push(`<a href="${project.demo}" class="project-link" target="_blank" onclick="event.stopPropagation()">Demo →</a>`);
    }
    
    card.innerHTML = `
        <div class="project-header">
            <h3 class="project-title">${project.name}</h3>
            ${project.pinned ? '<span class="pin-badge">Pinned</span>' : ''}
        </div>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">
            ${techTags}
        </div>
        ${links.length > 0 ? `<div class="project-links">${links.join('')}</div>` : ''}
    `;
    
    return card;
}

// Load and display individual project details
function loadProjectDetail(projects) {
    // Get project ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    
    if (!projectId) {
        displayProjectNotFound();
        return;
    }
    
    // Find the project with matching ID
    const project = projects.find(p => p.id === projectId);
    
    if (!project) {
        displayProjectNotFound();
        return;
    }
    
    // Update page title
    document.title = `${project.name} - bakje`;
    
    // Display project details
    const container = document.getElementById('project-detail-container');
    
    const techTags = project.technologies.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    const links = [];
    if (project.github) {
        links.push(`<a href="${project.github}" class="project-link" target="_blank">GitHub →</a>`);
    }
    if (project.demo) {
        links.push(`<a href="${project.demo}" class="project-link" target="_blank">Demo →</a>`);
    }
    
    container.innerHTML = `
        <div class="project-detail">
            <div class="breadcrumb">
                <a href="projects.html">← Back to Projects</a>
            </div>
            
            <div class="project-detail-header">
                <h1>${project.name}</h1>
                ${project.pinned ? '<span class="pin-badge">Pinned</span>' : ''}
            </div>
            
            <div class="project-detail-content">
                <div class="project-detail-description">
                    <h2>About</h2>
                    <p>${project.description}</p>
                </div>
                
                <div class="project-detail-tech">
                    <h2>Technologies</h2>
                    <div class="project-tech">
                        ${techTags}
                    </div>
                </div>
                
                ${links.length > 0 ? `
                <div class="project-detail-links">
                    <h2>Links</h2>
                    <div class="project-links">
                        ${links.join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        </div>
    `;
}

function displayProjectNotFound() {
    const container = document.getElementById('project-detail-container');
    container.innerHTML = `
        <div class="project-detail">
            <div class="breadcrumb">
                <a href="projects.html">← Back to Projects</a>
            </div>
            <div class="project-not-found">
                <h1>Project Not Found</h1>
                <p>The project you're looking for doesn't exist.</p>
                <a href="projects.html" class="contact-btn">View All Projects</a>
            </div>
        </div>
    `;
}

// Load projects when DOM is ready
document.addEventListener('DOMContentLoaded', loadProjects);
