// Simple markdown parser
function parseMarkdown(markdown) {
    let html = markdown;
    
    // Escape HTML in code blocks first to protect them
    const codeBlocks = [];
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        const placeholder = `___CODE_BLOCK_${codeBlocks.length}___`;
        codeBlocks.push({ lang: lang || '', code: escapeHtml(code.trim()) });
        return placeholder;
    });
    
    // Inline code
    const inlineCode = [];
    html = html.replace(/`([^`]+)`/g, (match, code) => {
        const placeholder = `___INLINE_CODE_${inlineCode.length}___`;
        inlineCode.push(escapeHtml(code));
        return placeholder;
    });
    
    // Headers
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    
    // Bold and italic
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    
    // Tables
    html = html.replace(/^\|(.+)\|$/gm, (match, content) => {
        const cells = content.split('|').map(cell => cell.trim());
        return '<tr>' + cells.map(cell => {
            // Check if this is a header separator row
            if (cell.match(/^[-:]+$/)) return null;
            return cell;
        }).filter(c => c !== null).map(cell => '<td>' + cell + '</td>').join('') + '</tr>';
    });
    
    // Wrap consecutive table rows
    html = html.replace(/(<tr>[\s\S]*?<\/tr>\n)+/g, (match) => {
        // Check if first row should be header
        const rows = match.split('\n').filter(r => r.trim());
        if (rows.length > 1) {
            const firstRow = rows[0].replace(/<td>/g, '<th>').replace(/<\/td>/g, '</th>');
            const otherRows = rows.slice(1).join('\n');
            return '<table><thead>' + firstRow + '</thead><tbody>' + otherRows + '</tbody></table>\n';
        }
        return '<table><tbody>' + match + '</tbody></table>\n';
    });
    
    // Unordered lists
    html = html.replace(/^\* (.+)$/gm, '<li>$1</li>');
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
    
    // Task lists
    html = html.replace(/<li>\[ \] (.+)<\/li>/g, '<li><input type="checkbox" disabled> $1</li>');
    html = html.replace(/<li>\[x\] (.+)<\/li>/g, '<li><input type="checkbox" disabled checked> $1</li>');
    
    // Horizontal rule
    html = html.replace(/^---$/gm, '<hr>');
    
    // Blockquotes
    html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
    
    // Paragraphs (convert double line breaks to paragraphs)
    html = html.split('\n\n').map(block => {
        // Don't wrap if already has block-level tags
        if (block.match(/^<(h[1-6]|ul|ol|blockquote|pre|table|hr)/)) {
            return block;
        }
        // Don't wrap code block placeholders
        if (block.trim().match(/^___CODE_BLOCK_\d+___$/)) {
            return block.trim();
        }
        // Don't wrap empty blocks
        if (block.trim() === '') {
            return '';
        }
        return '<p>' + block.replace(/\n/g, '<br>') + '</p>';
    }).join('\n');
    
    // Restore inline code
    inlineCode.forEach((code, i) => {
        html = html.replace(`___INLINE_CODE_${i}___`, `<code>${code}</code>`);
    });
    
    // Restore code blocks
    codeBlocks.forEach((block, i) => {
        const langClass = block.lang ? ` class="language-${block.lang}"` : '';
        html = html.replace(
            `___CODE_BLOCK_${i}___`,
            `<pre><code${langClass}>${block.code}</code></pre>`
        );
    });
    
    return html;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

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
async function loadProjectDetail(projects) {
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
    
    // Try to load markdown content
    try {
        const mdResponse = await fetch(`projects/${projectId}.md`);
        if (mdResponse.ok) {
            const markdown = await mdResponse.text();
            const htmlContent = parseMarkdown(markdown);
            
            container.innerHTML = `
                <div class="project-detail">
                    <div class="breadcrumb">
                        <a href="projects.html">← Back to Projects</a>
                    </div>
                    
                    <div class="project-detail-header">
                        <h1>${project.name}</h1>
                        ${project.pinned ? '<span class="pin-badge">Pinned</span>' : ''}
                    </div>
                    
                    <div class="project-detail-meta">
                        <div class="project-detail-tech">
                            <h3>Technologies</h3>
                            <div class="project-tech">
                                ${techTags}
                            </div>
                        </div>
                        
                        ${links.length > 0 ? `
                        <div class="project-detail-links">
                            <h3>Links</h3>
                            <div class="project-links">
                                ${links.join('')}
                            </div>
                        </div>
                        ` : ''}
                    </div>
                    
                    <div class="project-detail-content markdown-content">
                        ${htmlContent}
                    </div>
                </div>
            `;
            
            // Highlight code blocks with Prism
            if (typeof Prism !== 'undefined') {
                Prism.highlightAll();
            }
            return;
        }
    } catch (error) {
        console.log('No markdown file found, falling back to basic display');
    }
    
    // Fallback to basic display if no markdown file exists
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
