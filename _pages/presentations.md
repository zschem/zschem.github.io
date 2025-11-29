---
title: "Presentations"
layout: single
permalink: /presentations/
---

{% for edu in site.presentations %}

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
  <ul class="exp-bullets">
    {% for bullet in edu.bullets %}
      <li>{{ bullet }}</li>
    {% endfor %}
  </ul>
</div>
{% endfor %}
