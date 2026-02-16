---
layout: default
title: Projects
---

<div class="post-grid">
  {% for project in site.projects %}
    <a href="{{ project.url }}" class="post-card">
      {% if project.image %}
        <img src="{{ project.image }}" alt="Missing image">
      {% endif %}
      <h3>{{ project.title }}</h3>
    </a>
  {% endfor %}
</div>
