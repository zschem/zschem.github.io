---
title: "Education"
layout: single
permalink: /education/
---

<strong>Relevant Coursework</strong>
<br />
<em
          >Social Justice Transformation, Educational Policy Analysis,
Curriculum Pedagogy Diversity, Education Democratic Society, Power
Knowledge Difference, Ethics and Values in Education, Qualitative
Research.</em
        >

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
