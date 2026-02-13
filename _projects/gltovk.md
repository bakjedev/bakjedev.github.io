---
title: "Vulkan Renderer Replacement"
pinned: true
---

Migrated existing engine rendering backend from OpenGL to Vulkan, implementing PBR with
IBL and instanced rendering. Built shadow mapping for directional lights, MSAA, and postprocessing pipeline. Profiled with NSight Graphics and optimized vertex shader I/O and
buffer transfers, reducing frame time by 33%.
