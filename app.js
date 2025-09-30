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

// Load projects when DOM is ready
document.addEventListener('DOMContentLoaded', loadProjects);
