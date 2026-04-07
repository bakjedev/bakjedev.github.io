---
title: "Vulkan GPU-Driven Renderer"
image: "assets/images/gpu_driven/mixed_thumbnail.jpg"
pinned: true
priority: 2
---

![frustum](/assets/images/gpu_driven/mixed.jpg)

- **Solo**
- **Role:** Graphics Programmer
- **Duration:** 8 weeks
{:.project-table}


Built a Vulkan renderer from scratch. Starting from a basic triangle and core engine systems (ECS, mesh loading, etc.) I extended it with GPU-driven rendering: a compute shader generates `VkDrawIndexedIndirectCommand`s, letting the GPU decide what to draw in a single draw call. Rendered 636K objects at 60 FPS. Implemented GPU frustum culling with plane extraction from the view-projection matrix. Cross-platform (Linux/Windows), uses Slang for shaders.

[![procrastinate](https://gh-card.dev/repos/bakjedev/procrastinate.svg)](https://github.com/bakjedev/procrastinate)

## Posts

{% include related_posts.html project="gpudriven" %}
