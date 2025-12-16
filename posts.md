---
layout: default
title: Posts
---

# Posts

{% for post in site.posts %}
- [{{ post.title }}]({{ post.url }})
{% endfor %}
