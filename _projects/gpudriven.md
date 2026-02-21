---
title: "Vulkan GPU-Driven Renderer"
image: "assets/images/gpu_driven/frustum_cull.png"
pinned: true
---

![frustum](/assets/images/gpu_driven/frustum_cull.png)

Implemented Multi-Draw Indirect with compute shader generating draw commands from
storage buffers, rendering 636K objects at 60 FPS in single draw call. Built CPU frustum
culling with plane extraction from projection matrix, achieving 5x performance improvement.

### Related

{% include related_posts.html project="gpudriven" %}
