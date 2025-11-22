---
title: 'The API Dispatch #5: Beyond the endpoint, Upon the OpenAPI Spec, Above MCP'
description: The July installment of a monthly ‘newsletter’ about APIs. This issue looks back on API meetup, OpenAPI Spec 3.2, and a few optimistic opinions about MCP.
discussion:
  LinkedIn: https://www.linkedin.com/pulse/api-dispatch-mewsletter-issue-5-mewsrnd-debwe/
  # Fediverse:
---

{% callout "Author's note" %}
The API Dispatch is a series I started as an internal newsletter at work. It's also available on [LinkedIn](https://www.linkedin.com/newsletters/r-d-api-mewsletter-7305909196418396160/).

Originally published in July 2025.
{% endcallout %}

In the mid-summer edition of The API Dispatch, we’ll review the June API meetup, check how to leverage GitHub Copilot for more efficient API development and also take a look at OpenAPI Spec 3.2 And I have also two pieces about greater implications of MCP as an universal plugin system, prying the platforms open.

## Looking back Beyond the Endpoint

At the end of the June our awesome R&D Community team organized API meetup in the Prague office. If you didn’t make it, don’t worry: all talks have been recorded and available on YouTube:

[Mews Meetup: Beyond the Endpoint](https://www.youtube.com/playlist?list=PLPC0G0NFzXJrGYhF933XFjcmYdA4bvgRd) (5 videos • YouTube)

- In [Code-First Meets Spec-First](https://www.youtube.com/watch?v=PkJXWzd0O2Y&list=PLPC0G0NFzXJrGYhF933XFjcmYdA4bvgRd&index=1) Martin Horák walked us through his journey of switching from code-first to spec-first API design at Mews, sharing mistakes he made and the tools that saved him.
- In [AI Meets API: Practical AI Use Cases Across the API Lifecycle](https://www.youtube.com/watch?v=t1Jg9Y6-sg4&list=PLPC0G0NFzXJrGYhF933XFjcmYdA4bvgRd&index=2) Matyáš Křeček demonstrated how AI can assist at every stage of API development – from planning and diagram generation to mock servers, testing, and changelog creation. If you prefer reading, Matyáš also [prepared a write up of his talk](https://www.linkedin.com/pulse/ai-meets-api-practical-use-cases-across-lifecycle-maty%C3%A1%C5%A1-k%C5%99e%C4%8Dek-ifite/) (4 mins • LinkedIn).
- In [GraphQL can make your life better. Or worse.](https://www.youtube.com/watch?v=Uo7Q08JpGLU&list=PLPC0G0NFzXJrGYhF933XFjcmYdA4bvgRd&index=3) Michal Řehout explored how poorly designed GraphQL schemas and schema stitiching can become a nightmare – and what to do instead.
- In [AI Is Coming For Your API](https://www.youtube.com/watch?v=Esdgf5AfJBU&list=PLPC0G0NFzXJrGYhF933XFjcmYdA4bvgRd&index=5) Martyn Davies showed how AI agents consume and interact with APIs, urging teams to catalog endpoints, enforce authentication and rate-limiting via gateways, and adopt HTTP message signatures to guard against malicious or unintended agent traffic.
- And finally, in [Best Practices My A\*\*](https://www.youtube.com/watch?v=bc_SIzR8Xvc&list=PLPC0G0NFzXJrGYhF933XFjcmYdA4bvgRd&index=4) Vojta Šťavík took a lighthearted look at beloved engineering “best-practice” mantras, poking fun at the ones that don’t add value and celebrating those that actually improve code and collaboration.

## AI Development Kit for Your IDE

During his talk, Matyáš also showed prompts and instructions for LLM tools in editors, particularly GitHub Copilot. These resources are available in GitHub repository, generously shared by Matyáš and DX Heroes:

[DXHeroes/ai-dev-setup](https://github.com/DXHeroes/ai-dev-setup) (GitHub)

Use it as a starting point for your LLM-enhanced API development setup!

## OpenAPI Specification 3.2 is coming soon

Erik Wilde highlights the features of the next minor version of OpenAPI Specification.

[Erik Wilde: OpenAPI 3.2: New Features for Query, Tags, and Multipart Support](http://www.linkedin.com/posts/erikwilde_api-apidescription-openapi-activity-7351475759875514369-2kSE/) (1 min • LinkedIn)

> OpenAPI 3.2 introduces built-in support for the HTTP QUERY method, enabling API designers and developers to leverage richer query capabilities natively. \[…\]
>
> Tags will get a powerful upgrade! The improved tag model in OpenAPI 3.2 allows for more granular categorization, flexible grouping, and richer metadata on your APIs. \[…\]
>
> OpenAPI 3.2 also enhances multipart support, simplifying how complex file uploads and structured multipart requests are described and validated.

You can also follow the [v3.2.0 milestone on GitHub](https://github.com/OAI/OpenAPI-Specification/milestone/12).

## Will your toaster start taking phone calls thanks to MCP?

You surely heard about Model Context Protocol (and if not, I’ve covered it in [The API Dispatch #2](../2025-05-27-the-api-dispatch-2/index.md)) and how it allows for connecting of AI models to the outside world. But it doesn’t have to be just for AI right? That’s what Scott Werner argues: similar to how HTTP, Bluetooth, and USB expanded way beyond their original use cases, MCP has a potential to become a universal plugin ecosystem.

[MCP: An (Accidentally) Universal Plugin System](https://worksonmymachine.substack.com/p/mcp-an-accidentally-universal-plugin) (4 mins • Substack)

> USB-C \[is\] special because it's a _possibility space_. It's a hole that says "put something here and we'll figure it out." \[…\]
>
> MCP is the same thing but for functionality. It's not saying "I'm for AI." It's saying "I'm a well-designed hole. Put something here."

## MCP is bringing the optimism of Web 2.0 back

And in a similar vein, Anil Dash notices that MCP is bringing back the openness and interoperability last experienced during the era of Web 2.0. Not Facebook-style social media (which actually killed Web 2.0), but interoperability through standardized protocols and formats, pushing the web to its natural, decentralized, programmable state.

[MCP is the coming of Web 2.0 2.0](https://www.anildash.com/2025/05/20/mcp_web20_20/) (6 mins • Anil Dash)

> The rise of MCP gives hope that the popularity of AI amongst coders might pry open all these other platforms to make them programmable for any purpose, not just so that LLMs can control them.
