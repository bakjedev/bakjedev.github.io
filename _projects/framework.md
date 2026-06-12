---
title: "Vulkan Render Graph"
pinned: false
priority: 4
tags: [C++, Graphics, Vulkan]
---

### WIP project page

- **Solo**
- **Role:** Graphics Programmer
- **Duration:** 8 weeks
{:.project-table}

<div class="project-details" markdown="1">

A **render graph** library (`framework`) in **C++** built on **Vulkan**. You declare passes and the resources they read and write, and the graph figures out the execution order and inserts the correct synchronization for you. I built it because the manual barriers and layout transitions in my earlier renderers were often incorrect, so I implemented a system that solves the exact problem I kept getting wrong by hand.

- **Building the dependency graph**: edges are created from per resource read/write lists by detecting RAW, WAW and WAR hazards, then ordered with a topological sort (Kahn's algorithm) that also detects impossible (cyclic) dependencies
- **Automatic barriers**: every resource tracks its current state, access/layout/stage are inferred from how a pass uses a resource, and `vkCmdPipelineBarrier2` barriers are emitted only when the state actually changes
- **An API you build on, not in**: a `Context`/`Graph` split, proxies to swap resources per frame without recompiling, and a concept based resource import interface so you plug in your own image/buffer types (CRTP builders, C++20 concepts)

**Self study** project for **block D** of my third year at **BUAS** (students choose a project to work on alongside main coursework).

For the scope of this project I deliberately kept it focused: imported resources only, one command buffer on one queue family, and no transient resource management. I'm planning to extend it beyond the school project.

</div>

## Github repository

[![framework](https://gh-card.dev/repos/bakjedev/framework.svg)](https://github.com/bakjedev/framework)
