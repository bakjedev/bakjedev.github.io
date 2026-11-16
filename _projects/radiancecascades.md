---
title: "Radiance Cascades: 2D Global Illumination"
image: "assets/images/radiance_cascades/rc2d_thumbnail.png"
pinned: true
priority: 1
tags: [C++, Graphics, Vulkan]
---

<video width="640" controls style="display:block; margin:0 auto; max-width:100%; height:auto;">
  <source src="../assets/images/radiance_cascades/rc2d_showcase.mp4" type="video/mp4">
</video>

- **Solo**
- **Role:** Graphics Programmer
- **Duration:** 8 weeks
{:.project-table}

<div class="project-details" markdown="1">

Real-time 2D **global illumination** in **C++** and **Vulkan** using **radiance cascades**. Paint solid and
emissive materials and the lighting is updated every frame with nice soft shadows: ~6ms on an RTX 3070 at
1024×1024, ~88M ray intervals per frame across 6 cascades.

- **Jump flood signed distance field**: calculates the nearest solid and empty pixel for every pixel, giving signed distances. Used for ray marching, skipping probes inside solids, and the falloff for lighting interiors of solids
- [**Bilinear-fix merging**](../pages/bilinear): every ray traces to the interval start of each of the 4 neighbouring probes in the next cascade, so the rays stay continuous when merged instead of skipping areas, (mostly) removing ringing artifacts at cascade boundaries
- [**Morton-layout directions**](../pages/bilinear): a ray's 4 child directions live in a 2×2 texel block. A single hardware bilinear sample can then average them. Resulting in only 4 texture fetches per texel instead of 16, ~2ms saved
- [**Profiled using Nsight**](../pages/gpuprofiling): 16x8 workgroups and memory reads moved out of the trace loop.

Shaders written in **Slang**.

The frame runs through [**framework**](../pages/framework), a **Vulkan render graph** library I built in block D of my third year at BUAS: declare passes and the resources they read and write, and the graph figures out the execution order and inserts the correct synchronization. This project was its first real workload, and it necessitated a couple additions: per-mip/per-layer image state tracking (the JFA pass ping pongs between two layers of the same image), per-pass GPU timestamps (for the timing graph), and debug labels for RenderDoc and Nsight.

**Self study** project for **block A** of my fourth year at **BUAS**. For block B I will be extending this into 3D.

</div>
## Posts

{% include related_posts.html project="rc2d" %}

## Github repositories

[![Radiance Cascades Github](https://github-stats-extended.vercel.app/api/pin?username=bakjedev&repo=bakjedev%2Fradiance-cascades&theme=light_github_repocard)](https://github.com/bakjedev/radiance-cascades/tree/2d)

[![Framework Github](https://github-stats-extended.vercel.app/api/pin?username=bakjedev&repo=bakjedev%2Fframework&theme=light_github_repocard)](https://github.com/bakjedev/framework/tree/transients)
