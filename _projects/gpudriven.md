---
title: "Vulkan GPU-Driven Renderer"
pinned: true
---

Implemented Multi-Draw Indirect with compute shader generating draw commands from
storage buffers, rendering 636K objects at 60 FPS in single draw call. Built CPU frustum
culling with plane extraction from projection matrix, achieving 5x performance improvement.
