---
layout: default
title: Posts
---

{% for post in site.pages %}
- [{{ post.title }}]({{ post.url }})
{% endfor %}

<div class="post-grid">
  {% for post in site.pages %}
    <a href="{{ post.url }}" class="post-card">
      <img src="{{ post.image }}" alt="Missing image">
      <h3>{{ post.title }}</h3>
    </a>
  {% endfor %}
</div>
