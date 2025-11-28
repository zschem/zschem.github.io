---
title: "Conferences"
layout: single
permalink: /conferences/
---

{% for edu in site.conferences %}

<div class="education-entry">
  <div class="education-header">
    <div class="education-left">
      <strong>{{ edu.title }}</strong><br />
      <em>{{ edu.institution }}</em>
    </div>
    <div class="education-right">
      {{ edu.duration }}<br />
      <em>{{ edu.location }}</em>
    </div>
  </div>
</div>
{% endfor %}
