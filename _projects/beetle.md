---
title: "Beetle: Custom Racing Game Engine"
image: "assets/images/beetle/beetle_engine.png"
pinned: true
---

![engine](/assets/images/beetle/beetle_engine.png)

Together with a team I built a cross-platform game engine and racing demo, developed in C++ with Blender as the level editor. I focused on engine systems and the content pipeline: an input mapping system supporting keyboard/mouse/gamepad with configurable axis remapping, an ECS-based 3D sound system backed by FMOD, a spline system using cubic Bézier interpolation (exported from Blender via custom glTF extensions), a spring arm camera system, a UI framework built on the existing ECS, and the Blender-to-engine content pipeline including custom properties, glTF extras parsing, prefabs, and DDS texture conversion. Runs on PC and Steam Deck.

### Related

{% include related_posts.html project="beetle" %}
