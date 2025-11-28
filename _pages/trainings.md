---
title: "Trainings"
layout: single
permalink: /trainings/
---

{% for edu in site.trainings %}

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
