---
title: "Education"
layout: single
permalink: /education/
---

<hr />
{% for edu in site.education %}

<div class="education-entry">
  <div class="education-header">
    <div class="education-left">
      <strong>{{ edu.institution }}</strong><br />
      <em>{{ edu.title }}</em>
    </div>
    <div class="education-right">
      {{ edu.duration }}<br />
      <em>{{ edu.location }}</em>
    </div>
  </div>
</div>
{% endfor %}
