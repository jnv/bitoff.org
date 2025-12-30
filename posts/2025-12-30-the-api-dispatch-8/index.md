---
title: 'The API Dispatch #8: Range Against the Machine'
description: >
  In the October issue of API Dispatch, we’ll take a look at Postman’s State of the API report, highlighting the gap between AI-powered development and AI-ready APIs. We then dive into HTTP caching and the sharp edges you can still bleed on – range, content negotiation, transfer-encoding – and a few under-tested API injection paths. Mike Amundsen returns to tap the sign with his maxim – and to remind you that MCP is (still) not your app.
discussion:
  LinkedIn: https://www.linkedin.com/pulse/api-dispatch-mewsletter-issue-8-mewsrnd-5rkde/
  Fediverse: https://mastodon.social/@jnv/115811040752891631
---

{% callout "Author's note" %}
The API Dispatch is a series I started as an internal newsletter at work. It's also available on [LinkedIn](https://www.linkedin.com/newsletters/r-d-api-mewsletter-7305909196418396160/).

Originally published on November 13, 2025.
{% endcallout %}

## Postman’s State of the API Report is back

Back in September, Postman released its annual State of the API report. Perhaps the findings are not surprising: every year, more respondents claim their organization is API-first (from 66% in 2023, through 74% in 2024, to 82% this year), while collaboration on APIs and managing changes is still a challenge. A big focus of this year’s report is, unsurprisingly, on AI adoption – designing APIs with AI, for AI.

[Postman 2025 State of the API Report](https://www.postman.com/state-of-api/2025/)

> Only 24% of developers actively design APIs with AI agents in mind. \[…\] Meanwhile, 60% still design primarily for humans only, and 16% haven't even considered AI agents as API consumers yet.
>
> This mismatch has real consequences. More of your integration code is now written or assisted by AI. AI Agents rely on precise, machine-readable signals, not tribal knowledge. When your API lacks predictable schemas, typed errors, and clear behavioral rules, AI agents can't function as they're intended to.

## Everything You Always Wanted to Know About HTTP Caching (But Were Afraid to Ask)

Maybe you don’t know it, but you’re certainly using it. Caching is a built-in feature of HTTP, and you either need to understand it, or it will come back to haunt you. Luckily Jono Alderson has your back. His guide to caching covers the most important caching headers, explains headers’ interactions, and debunks common misconceptions developers hold about HTTP caching. I particularly appreciated the rich sidenotes explaining historical context and edge cases.

[A complete guide to HTTP caching](https://www.jonoalderson.com/performance/http-caching/) (33 mins)

> Caching is often treated as a technical detail, an afterthought, or a hack that papers over performance problems. But the truth is more profound: caching is infrastructure. It’s the nervous system that keeps the web responsive under load, that shields brittle origins, and that shapes how both humans and machines experience your brand.

How does that relate to APIs? Let’s get into that another time.

{% figure "roy-fielding-caching.png", "Ad banner parody with a photo of Roy Fielding and a fictional quote: “Caching… In MY network architecture?!?” It's more likely than you think. Button: Free REST check" %}

Source: [htmx_org on Twitter](https://xcancel.com/htmx_org/status/1752440282581545004).

And yes, that’s Roy Fielding.

{% endfigure %}

## Don’t bleed out on these HTTP edge cases

If you read the previous issues of this newsletter, you know I have a thing for edge cases and oddities in protocols, especially HTTP. So I had to include this article from Dochia (possibly written by Madalin Ilie).

Here’s the bad news: some features of HTTP are prone to implementation vulnerabilities, like DoS through crafted range headers or request smuggling through transfer-encoding. Good news: your framework is probably handling them correctly. Bad news again: the framework doesn’t handle everything, or you may be unintentionally breaking the validations with custom code.

[Nine HTTP Edge Cases Every API Developer Should Understand](https://blog.dochia.dev/blog/http_edge_cases/) (11 mins)

> Your defense isn’t more code. It’s understanding HTTP deeply, knowing what your framework handles, using infrastructure layers for redundancy, and writing custom validation only where genuinely needed. Most security vulnerabilities come from unnecessary custom code that reimplements (incorrectly) what the framework already does correctly.

## Don’t get injected with these HTTP attacks

Continuing the topic of vulnerabilities (and listicles), Kristopher Sandoval compiled six lesser-known injection attacks APIs may be exposed to. Some of them, like GraphQL resolver abuse, are a different take on good ol’ SQL injection. Others, like injection via webhook URLs, can take advantage of asynchronous APIs.

[6 API Injection Attacks You're Probably Not Testing For](https://nordicapis.com/6-api-injection-attacks-youre-probably-not-testing-for/) (7 mins)

> The reality is that you can’t scan what you don’t see. Injection isn’t just about SQL or XML — modern APIs are full of secondary parsing paths, dynamic type coercion, and indirect data flows. These are the kinds of blind spots that attackers love, and the kinds of faults that scanners typically miss.

## Your MCP is not your database is not your object graph is not your app…

Back in 2012, Mike Amundsen [started a game](https://mamund.com/blog/archives/1131.html) which he still likes to play. Every new API technology claims to fix the problems of its predecessors, only to fall into the same trap of exposing internal models directly and relying on fixed schemas instead of dynamic messaging and showing affordances. So whether the hot new stuff today is gRPC, GraphQL, or MCP, they have one thing in common – they’re not your application.

[I Like This Game (Redux)](https://mamund.substack.com/p/i-like-this-game-redux) (3 mins)

> Whether it’s a database schema, an object graph, a file system, or today’s MCP descriptions, these models are just individual views of the systemic whole. The real architecture of network-based software makes it possible for multiple views of the same system to not only safely co-exist but to also effectively cooperate and interact. By casting your designs in the stone of data models, object models, etc. you are relegating your work to the scrap heap sooner than you think.

Of course, it’s yet another riff on [Amundsen’s Maxim](../2025-11-22-the-api-dispatch-7/index.md#data-model-object-model-resource-model-message-model).
