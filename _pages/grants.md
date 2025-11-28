---
title: "Grants"
layout: single
permalink: /grants/
---

{% for edu in site.grants %}

<div class="education-entry">
  <div class="education-header">
    <div class="education-left">
      <strong>{{ edu.title }}</strong><br />
      <em>{{ edu.institution }} - <strong>{{ edu.amount }}</strong></em>
    </div>
    <div class="education-right">
      {{ edu.duration }}<br />
      <em>{{ edu.location }}</em>
    </div>
  </div>
</div>
{% endfor %}
