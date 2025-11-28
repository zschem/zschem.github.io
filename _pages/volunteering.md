---
title: "Volunteering"
layout: single
permalink: /volunteering/
---

<ul>
{% for item in site.volunteering %}
<li>
<p><strong>{{ item.title }}</strong> {{ item.description }}</p>
</li>
{% endfor %}
</ul>
