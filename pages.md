---
layout: default
title: Posts
---

{% for post in site.pages %}
- [{{ post.title }}]({{ post.url }})
{% endfor %}
