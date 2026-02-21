---
title: "Vulkan GPU-Driven Renderer"
image: "assets/images/gpu_driven/frustum_cull.png"
pinned: true
priority: 2
---

![frustum](/assets/images/gpu_driven/frustum_cull.png)

- **Solo**
- **Role:** Graphics Programmer
- **Duration:** 8 weeks
{:.project-table}

Built a Vulkan renderer from scratch. Starting from a basic triangle and core engine systems (ECS, mesh loading, etc.) I extended it with GPU-driven rendering: a compute shader generates DrawIndexedIndirectCommands, letting the GPU decide what to draw in a single draw call. Rendered 636K objects at 60 FPS. Implemented GPU frustum culling with plane extraction from the view-projection matrix. Cross-platform (Linux/Windows), uses Slang for shaders.

### Related

{% include related_posts.html project="gpudriven" %}
