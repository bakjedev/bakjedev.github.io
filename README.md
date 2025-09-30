# bakje - Portfolio Website

A modern minimalist portfolio website for an engine and tools programmer specializing in C++.

## Features

- **Home Page**: Hero section with pinned projects showcase
- **Projects Page**: Complete collection of all projects
- **Individual Project Pages**: Each project has its own dedicated page with details
- **Modern Design**: Dark grey minimalist theme with smooth animations
- **Responsive**: Mobile-friendly design that adapts to all screen sizes
- **Easy Management**: Simple JSON-based project management

## Adding New Projects

To add a new project, edit the `projects.json` file and add a new project object:

```json
{
  "id": "project-slug",
  "name": "Project Name",
  "description": "Project description...",
  "technologies": ["C++", "Technology1", "Technology2"],
  "pinned": false,
  "github": "https://github.com/username/repo",
  "demo": "https://demo-url.com"
}
```

- `id`: A unique URL-friendly identifier (e.g., "my-cool-project")
- `name`: Display name of the project
- `description`: Brief description of the project
- `technologies`: Array of technologies used
- `pinned`: Set to `true` to display the project on the home page
- `github`: GitHub repository URL (optional, use `""` if not available)
- `demo`: Live demo URL (optional, use `""` if not available)

The project will automatically:
- Appear on the projects page (all projects)
- Appear on the home page (if pinned)
- Get its own detail page at `project-detail.html?id=<project-id>`

## Customization

### Contact Information
Update the contact buttons in `index.html`, `projects.html`, and `project-detail.html`:
- Email: Update the `mailto:` link
- GitHub: Update the GitHub profile URL
- LinkedIn: Update the LinkedIn profile URL

### Styling
Modify the CSS variables in `styles.css` to change colors:
- `--bg-dark`: Main background color
- `--bg-darker`: Navbar/footer background
- `--bg-card`: Project card background
- `--accent`: Accent color for highlights

## Local Development

To run the website locally:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.