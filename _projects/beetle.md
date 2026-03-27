---
title: "Beetle: Custom Racing Game Engine"
image: "assets/images/beetle/beetle_engine.png"
pinned: true
priority: 1
---

![engine](/assets/images/beetle/beetle_engine.png)

- **Team size:** 6
- **Role:** Engine & Tools Programmer
- **Duration:** 8 weeks
{:.project-table}

<div class="project-details" markdown="1">

Together with a team I built a cross-platform game engine and racing demo in C++. I focused on engine systems and the content pipeline:

- Input mapping system supporting keyboard/mouse/gamepad with configurable axis remapping
- ECS-based 3D sound system backed by FMOD
- [Spline system using cubic Bézier interpolation](../pages/blender_spline), exported from Blender via custom glTF extensions
- Spring arm camera system
- UI framework built on the existing ECS
- [Blender-to-engine content pipeline](../pages/blender_extras) including custom properties, glTF extras parsing, prefabs, and DDS texture conversion

Runs on PC and Steam Deck.

</div>

## Posts

{% include related_posts.html project="beetle" %}
