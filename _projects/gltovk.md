---
title: "Vulkan Renderer Replacement"
image: "assets/images/from_gl_to_vk/cathedral.png"
pinned: true
---

Migrated existing engine rendering backend from OpenGL to Vulkan, implementing PBR with
IBL and instanced rendering. Built shadow mapping for directional lights, MSAA, and postprocessing pipeline. Profiled with NSight Graphics and optimized vertex shader I/O and
buffer transfers, reducing frame time by 33%.

### Related

<div class="post-grid">
  {% for post in site.pages %}
    {% if post.project == "gltovk" %}
      <a href="../{{ post.url }}" class="post-card">
        {% if post.image %}
          <img src="{{ post.image }}" alt="Missing image">
        {% endif %}
        <h3>{{ post.title }}</h3>
      </a>
    {% endif %}
  {% endfor %}
</div>
