---
layout: default
title: Home
---

# About

## Hi I'm Quinten Bubberman!

I'm a third-year **game programmer** at **Breda University of Applied Sciences**. I enjoy working close to the metal, focusing on **engine, tools, and graphics programming**. I love solving technical challenges, optimizing performance, and building systems that empower other developers and bring games to life.

### What i work with

- **Primary Language:** C++
- **Other Languages:** Python, Rust
- **Engines:** Unreal, Godot
- **Interests:** Gaming (Counter-Strike, Minecraft, Valheim, Factorio), real time rendering, optimization

### Pinned Posts

<ul>
  {% for post in site.pages %}
    {% if post.pinned %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>
