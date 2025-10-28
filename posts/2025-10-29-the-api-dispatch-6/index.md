---
title: 'The API Dispatch #6: It works on my protocol!'
description: In the August edition of the API Dispatch, we will look into the flaws of MCP, the fallacies about versioning and HTTP, and we will say goodbye to Apiary.io.
discussion:
  LinkedIn: https://www.linkedin.com/pulse/api-dispatch-mewsletter-issue-6-mewsrnd-zt2re/
---

{% callout "Author's note" %}
The API Dispatch is a series I started as an internal newsletter at work. It's also available on [LinkedIn](https://www.linkedin.com/newsletters/r-d-api-mewsletter-7305909196418396160/).

Originally published in August 2025.
{% endcallout %}

## MCP, the vibes-based protocol

At this point, you’re probably tired hearing about MCP and how it’s the future of AI / APIs / agents / integrations (pick your favorites). So here’s a rarer critical take from Julien Simon. MCP evolves quickly not just because of the hype, but because it was prematurely released. The community is now speed-running through the hard-won lessons from the past decades of distributed computing. While some issues were addressed, many still remain (for example around observability) and might result in fragmentation of the whole ecosystem.

[Why MCP’s Disregard for 40 Years of RPC Best Practices Will Burn Enterprises](https://julsimon.medium.com/why-mcps-disregard-for-40-years-of-rpc-best-practices-will-burn-enterprises-8ef85ce5bc9b) (9 mins)

> The pattern of retrofitting critical features proves that MCP was released prematurely. Enterprises adopted it based on promises and hype, not operational reality. Now they’re discovering that adding security, observability, and proper error handling after the fact is akin to adding airbags to a car after it has crashed.

## “Just version it!” Or not?

When I got deeper into the world of APIs, I discovered that versioning is a surprisingly controversial topic. What seems like a straightforward technical detail becomes a matter of intricate coordination, negotiation, and bargaining. Here’s our Jose Silva on the “deceptive simplicity trap” of API versioning:

[The versioning fallacy: why “just version it” isn’t that simple](https://blog.zepedro.com/the-versioning-fallacy-why-just-version-it-isnt-that-simple-355fd54a0a1a) (7 mins)

> The teams that confidently say “just version it” are often the same ones that later struggle with coordination overhead, extended migration timelines, and the accumulated complexity of maintaining multiple versions across their systems. They’ve confused the ease of technical implementation with the difficulty of organizational execution.

## Farewell, Apiary.io

Apiary.io was a Prague-based startup which helped to shift the API development towards design-first workflows. After the acquisition in 2017 and years of negligence, Oracle is pulling the plug on September 9. Here’s Phil Sturgeon reflecting on the legacy of Apiary.io:

[Goodbye Apiary.io, You'll Be Missed](https://apisyouwonthate.com/blog/goodbye-apiary-io/) (6 mins)

> Unlike Swagger/OpenAPI which is based on JSON/YAML, the team pioneered a brand new approach, making API Blueprint based on Markdown. This made it very easy to write, and that reduced friction for teams adopting and modifying API Blueprint. It was a lot easier for me to say "Hey you're already writng Markdown for your manual docs, but if you do it like this you'll have an actual API description which you can use programatically too, for docs, mocks, testing, and SDK generation!"

## Falsehoods programmers believe about HTTP & JSON

We’ve already discussed blatant design mistakes of MCP, but its backbone, HTTP and JSON are much more robust? Given their age, ubiquity, and standardization, one would assume that everyone is following the standards, right? Right?! Here’s Mark Gritter from Akita Software debunking some fallacies you may believe about HTTP and JSON, like “A request will have only one Host header” or “HTTP is reliable” or “There’s only one JSON”.

Note that the original article is no longer available (Akita Software was acquired by Postman which shut down their website earlier this year), but you can read the archived version thanks to Internet Archive:

[HTTP Facts vs. HTTP Fictions](https://web.archive.org/web/20250206142201/https://www.akitasoftware.com/blog-posts/http-facts-vs-http-fictions) (archived; 15 mins)

> The biggest lie developers tell themselves about HTTP is that it is reliable: data won’t be corrupted or altered. But it’s only _sort of_ reliable. HTTP is usually (but not always!) carried on TCP, which is a “reliable protocol.” But that means that it has features which attempt to correct for missing data– not that it achieves a particular level of data integrity.
