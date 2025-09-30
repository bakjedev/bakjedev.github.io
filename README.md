# bakje - Portfolio Website

A modern minimalist portfolio website for an engine and tools programmer specializing in C++.

## Features

- **Home Page**: Hero section with pinned projects showcase
- **Projects Page**: Complete collection of all projects
- **Modern Design**: Dark grey minimalist theme with smooth animations
- **Responsive**: Mobile-friendly design that adapts to all screen sizes
- **Easy Management**: Simple JSON-based project management

## Adding New Projects

To add a new project, edit the `projects.json` file and add a new project object:

```json
{
  "name": "Project Name",
  "description": "Project description...",
  "technologies": ["C++", "Technology1", "Technology2"],
  "pinned": false,
  "github": "https://github.com/username/repo",
  "demo": "https://demo-url.com"
}
```

- Set `"pinned": true` to display the project on the home page
- The `demo` field is optional and can be left empty with `""`
- Projects are automatically displayed on both home (pinned only) and projects (all) pages

## Customization

### Contact Information
Update the contact buttons in `index.html` and `projects.html`:
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