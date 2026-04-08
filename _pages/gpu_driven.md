---
title: Driving my Renderer with the GPU
datePosted: Apr 2026
image: "assets/images/gpu_driven/gpu_driven.jpg"
project: gpudriven
pinned: true
priority: 1
---

![thumbnail](../assets/images/gpu_driven/gpu_driven.jpg)

In modern video games, we’re seeing more and more objects that need to be rendered. That’s why we’ve often used techniques like instancing and culling, but now even that isn’t enough. The CPU is still doing too much work, which causes the GPU to sit idle. The solution is to offload more work from the CPU to the GPU. That’s exactly what I did in this self-study project, which I completed alongside my main coursework at BUAS. In this post I'll walk through how I implemented GPU-driven rendering using indirect rendering and compute shaders.

### What makes CPU-driven rendering slow
In a traditional CPU-driven renderer, the CPU loops through every object in the scene each frame, records a draw call for each one, and submits them to the GPU. This is fine for a small scene, but at hunderds of thousands of objects, that's also hunderds of thousands of draw calls, state changes, and API calls the GPU can't start until the CPU is done. The CPU becomes the bottleneck.

### A solution
Multi-Draw Indirect changes it so instead of the CPU recording what to draw, the draw commands live in a buffer on the GPU. The CPU then submits one call: drawIndexedIndirect, and the GPU executes the commands itself. This eliminates the need for a CPU loop or any per-object API calls. The CPU's job is now only uploading object data and submitting a single command.

So in Vulkan each draw command would look like this:

{% raw %}
```cpp
struct DrawIndexedIndirectCommand {
  uint32_t indexCount;
  uint32_t instanceCount;
  uint32_t firstIndex;
  int32_t  vertexOffset;
  uint32_t firstInstance;
};
```
{% endraw %}

All mesh data lives in two large buffers for vertices and indices respectively. Because of this each command just needs to know where its mesh starts: firstIndex, vertexOffset, and the amount of indices it will have: indexCount. It only needs to bind the buffers once to then just offset into those buffers.

An array of these live in a buffer on the GPU. The single draw call that executes all of them looks like this:

{% raw %}
```cpp
cmd.drawIndexedIndirectCount(frame->IndirectBuffer()->get(), 0, frame->DrawCount()->get(), 0, render_objects_size,
                             sizeof(vk::DrawIndexedIndirectCommand));
```
{% endraw %}

It’s important to note here that I’m using `drawIndexedIndirectCount` instead of `drawIndexedIndirect`. Whereas `drawIndexedIndirect` takes a draw count from the CPU, `drawIndexedIndirectCount` reads it from a buffer on the GPU alongside a maximum draw count. I’ll explain why this is necessary later.
