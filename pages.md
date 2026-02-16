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
      <img src="{{ post.image }}", alt="Missing image">
      **{{ post.title }}**
    </a>
  {% endfor %}
</div>
