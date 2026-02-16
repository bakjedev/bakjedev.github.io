---
layout: default
title: About
---

## Hi I'm Quinten Bubberman!

I'm a third-year **game programmer** at **Breda University of Applied Sciences**. I enjoy working close to the metal, focusing on **engine, tools, and graphics programming**. I love solving technical challenges, optimizing performance, and building systems that empower other developers and bring games to life.

**I'm looking for an internship starting September 2026.**

### What I work with

- **Primary Language:** C++
- **Other Languages:** Python, Rust
- **Engines:** Unreal, Godot
- **Natural Languages:** Dutch, English
- **Interests:** Gaming (Counter-Strike, Minecraft, Valheim, Factorio), real time rendering, optimization

## Pinned Projects

<div class="post-grid">
  {% for project in site.projects %}
    {% if project.pinned %}
      <a href="{{ project.url }}" class="post-card">
        {% if project.image %}
          <img src="{{ project.image }}" alt="Missing image">
        {% endif %}
        <h3>{{ project.title }}</h3>
      </a>
    {% endif %}
  {% endfor %}
</div>

## Pinned Posts

<div class="post-grid">
  {% for post in site.pages %}
    {% if post.pinned %}
      <a href="{{ post.url }}" class="post-card">
        {% if post.image %}
          <img src="{{ post.image }}" alt="Missing image">
        {% endif %}
        <h3>{{ post.title }}</h3>
      </a>
    {% endif %}
  {% endfor %}
</div>
