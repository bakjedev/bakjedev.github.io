---
layout: default
title: Posts
---

# Posts

{% for project in site.projects %}
- [{{ project.title }}]({{ project.url }})
{% endfor %}
