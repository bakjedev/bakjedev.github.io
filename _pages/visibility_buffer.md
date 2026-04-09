---
title: "G-Buffer Too Fat"
datePosted: Apr 2026
image: "assets/images/gpu_driven/mixed_thumbnail.jpg"
project: gpudriven
pinned: true
priority: 2
---

![thumbnail](../assets/images/gpu_driven/mixed.jpg)

At first, we used forward rendering. A naive way to render everything in a single pass. It caused overdraw and didn't scale well with many lights, but it was simple. At some point, we realized that the geometry and shading needed to be handled separately. That was called deferred rendering. It made many lights much cheaper, but introduced a heavy G-buffer. The G-buffer is a collection of render targets. Typically storing normals, albedo, position, and material properties, each 16 to 32 bytes per pixel. The geometry pass still writes every fragment including ones that get overwritten by closer geometry, so you're still paying bandwidth for overdraw. MSAA and transparency also become significantly harder. Forward+ addressed some of these issues but the fundamental overdraw problem remains.

The visibility buffer takes the split between geometry and shading even further. Instead of storing interpolated attributes, the first pass now only stores what's needed to reconstruct them: a triangle ID and a draw ID packed into a single uint32. Four bytes per pixel, fixed cost no matter how complex the scene is. The second pass reconstructs everything from scratch, but only for pixels that are actually visible.

### Pass 1: The thin G-buffer

The pre-pass is a normal rasterization pass which, for each pixel, stores which triangle covered it. That's it. No lighting, no attributes, no material data. Just a triangle ID and a draw ID packed into a single uint32 and written to a single render target.

So the fragment shader would look something like this:

{% raw %}
```cpp
uint main(VertexOutput input, uint primitiveID : SV_PrimitiveID) : SV_Target
{
  uint packed = (primitiveID << 16) | (input.drawID & 0xFFFF);
  return packed;
}
```
{% endraw %}

The primitive ID comes from the rasterizer, the draw ID is passed through from the vertex shader. The upper 16 bits store the primitive ID, the lower 16 the draw ID. One 32 bit integer per pixel.

The draw ID isn't directly available in the fragment shader. `SV_DrawIndex` is vertex shader only. So you have to pass it through.

One thing to note here is that, using `SV_PrimitiveID` in the fragment shader requires declaring a capability in SPIR-V. Either geometry shaders, tessellation, or mesh shaders. Without this the pesky validation layers will complain. The simplest solution is enabling the geometry shader feature on your device, even if you're not actually using geometry shaders.

As a quick visualization, I’ve assigned a unique color to each triangle here.

![visualized triangles](../assets/images/gpu_driven/colorful.jpg)

### Pass 2: Reconstruction



##### ...WIP...
