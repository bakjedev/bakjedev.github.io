---
title: "Vulkan GPU-Driven Renderer"
image: "assets/images/gpu_driven/shaded_thumbnail.jpg"
pinned: true
priority: 0
---

![frustum](/assets/images/gpu_driven/shaded.jpg)

- **Solo**
- **Role:** Graphics Programmer
- **Duration:** 16 weeks
{:.project-table}

<div class="project-details" markdown="1">

Built a **Vulkan** renderer in **C++** from scratch, starting from a basic triangle and core engine systems (ECS, mesh loading, etc.). Extended it with three main rendering features:

- [**GPU-driven rendering**](../pages/gpu_driven): a compute shader generates `VkDrawIndexedIndirectCommand`s per frame, rendering 636K objects in a single draw call at 60 FPS
- [**Visibility buffer**](../pages/visibility_buffer): a pre-pass rasterizes triangle + draw IDs into a single uint32 per pixel (4 bytes/pixel), with a compute shader reconstructing attributes via manual barycentric interpolation with perspective correction
- [**Frustum culling**](../pages/frustum_culling): plane extraction from the view-projection matrix on the CPU and then a compute shader culling objects in parallel before writing to the indirect buffer

**Cross platform** (Linux/Windows), shaders written in **Slang**.

**Self study** project for **block B and C** of my third year at **BUAS** (students choose a project to work on alongside main coursework).

</div>

## Posts

{% include related_posts.html project="gpudriven" %}

## Github repository

[![procrastinate](https://gh-card.dev/repos/bakjedev/procrastinate.svg)](https://github.com/bakjedev/procrastinate)
