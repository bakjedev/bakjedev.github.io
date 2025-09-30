# bakje - Portfolio Website

A modern minimalist portfolio website for an engine and tools programmer specializing in C++.

## Features

- **Home Page**: Hero section with pinned projects showcase
- **Projects Page**: Complete collection of all projects
- **Individual Project Pages**: Each project has its own dedicated page with rich content support
- **Rich Content**: Support for markdown formatting including headers, paragraphs, code snippets, images, tables, and more
- **Modern Design**: Dark grey minimalist theme with smooth animations
- **Responsive**: Mobile-friendly design that adapts to all screen sizes
- **Easy Management**: Simple JSON-based project management with optional markdown content

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

### Adding Rich Content to Project Pages

To add detailed content with formatting, code examples, and images to a project detail page, create a markdown file in the `projects/` directory with the same name as the project's `id`:

**Example**: For a project with `id: "my-cool-project"`, create `projects/my-cool-project.md`

The markdown file supports:

#### Headers
```markdown
# Main Title (hidden, shown in page header)
## Section Header
### Subsection Header
```

#### Text Formatting
```markdown
**bold text**
*italic text*
***bold and italic***
```

#### Links
```markdown
[Link Text](https://example.com)
```

#### Code Blocks
````markdown
```cpp
// C++ code example
class MyClass {
    void doSomething();
};
```
````

You can specify language for proper formatting: `cpp`, `python`, `javascript`, `bash`, etc.

#### Lists
```markdown
- Bullet point 1
- Bullet point 2

* Alternative bullet style
* Another bullet
```

#### Task Lists
```markdown
- [ ] Uncompleted task
- [x] Completed task
```

#### Tables
```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Value 1  | Value 2  | Value 3  |
| Value 4  | Value 5  | Value 6  |
```

#### Images
```markdown
![Alt text](path/to/image.png)
```

#### Blockquotes
```markdown
> This is a quote or important note
```

#### Horizontal Rules
```markdown
---
```

**Note**: If no markdown file exists, the project detail page will display the basic information from `projects.json`.

**Example**: See `projects/custom-game-engine.md` for a complete example of a rich project page.

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