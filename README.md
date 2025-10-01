# bakje's Portfolio Website

A clean, modern portfolio website showcasing engine development and tools programming projects.

## Features

- **Dynamic Project Loading**: Projects are loaded from `projects.json` for easy updates
- **Pinned Projects**: Highlight your best work on the home page
- **Project Detail Pages**: Each project can have a detailed markdown page
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Theme**: Professional dark theme optimized for developer portfolios

## Structure

- `index.html` - Home page with pinned projects
- `projects.html` - All projects page
- `project-detail.html` - Individual project detail pages
- `projects.json` - Project data configuration
- `projects/` - Markdown files for project details
- `app.js` - JavaScript for loading and displaying projects
- `styles.css` - Styling

## Adding a New Project

1. Add project data to `projects.json`:
```json
{
  "id": "my-project",
  "name": "My Project",
  "description": "A brief description of the project",
  "technologies": ["C++", "OpenGL", "CMake"],
  "pinned": true,
  "github": "https://github.com/username/repo",
  "demo": "https://example.com"
}
```

2. (Optional) Create a markdown file at `projects/my-project.md` for detailed project information

## GitHub Pages Deployment

This site is deployed using GitHub Pages. The `.nojekyll` file in the root directory is important - it tells GitHub Pages to skip Jekyll processing and serve the files as-is, which is necessary for the JavaScript to load the JSON data correctly.

## Local Development

To test locally, run a simple HTTP server from the project root:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## License

© 2024 bakje. All rights reserved.
