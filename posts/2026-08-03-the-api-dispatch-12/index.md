---
title: 'The API Dispatch #12: Haters gonna HATEOAS'
description: >
  This month we will look into why that funny acronym HATEOAS (Hypermedia as the engine of application state) is making headlines as the fix for broken web APIs. We will take a dive from the history of hypermedia to agent affordances and a cure for bloated MCP servers. And also unwrap Arazzo 1.1, and learn how to do idempotency the right way.
discussion:
  Fediverse: https://mastodon.social/@jnv/117030752939393421
  LinkedIn: https://www.linkedin.com/pulse/api-dispatch-12-haters-gonna-hateoas-mewsrnd-dpsyf
---

{% callout "Author's note" %}
The API Dispatch is a series I started as an internal newsletter at work. It's also available on [LinkedIn](https://www.linkedin.com/newsletters/r-d-api-mewsletter-7305909196418396160/).

Originally published on June 4, 2026.
{% endcallout %}

AI is very loudly and ruthlessly changing every aspect of software development. But when it comes to APIs, it turns out there’s this one REST constraint we were quietly skipping for two decades – and maybe, just maybe, it could be exactly what our shiny new AI ~~overlords~~ agents are waiting for.

## Prediction of the month

> RESTful APIs may be dead soon. Instead, web services may expose a single POST entry point for a prompt. Internally, an AI agent may decide how to interpret it and what to do with the data and the database.

—[Yegor Bugayenko on X](https://x.com/yegor256/status/2055272248919871812) ([Xcancel](https://xcancel.com/yegor256/status/2055272248919871812))

Bookmark this one, we’ll see how it ages.

## Moats, not boats

API Evangelist Kin Lane sits down with Mike Amundsen for a surprisingly deep conversation about two of my favorite topics: hypertext history and APIs. So what do Paul Otlet’s punk-rock 1920s vision of on-demand information and Ted Nelson’s dream of Xanadu have in common with today’s agentic systems? Surprisingly, a lot.

[**API Evangelist Conversation with Mike Amundsen on the Lineage of the Web, Hypermedia, Capabilities, and What Comes Next**](https://conversations.apievangelist.com/store/2026-05-20-mike-amundsen/) (11 min), full interview on [YouTube](https://www.youtube.com/watch?v=j0wpJDPbROY) (52 min)

> For me hypermedia is the notion of being able to make connections — and the connections themselves are what I think are most powerful, not the endpoints, not the things on either end.

Amundsen is also retelling a lesson from Leonard Richardson about why hypermedia never quite won in APIs. It works great when two parties want to cooperate (think libraries sharing books across the planet) and falls apart the moment they’d rather compete:

> Hypermedia levels the playing field, makes it easy for anyone to enter the marketplace, and what you really want in privatization is moats, not boats. Hypermedia works when we want to cooperate and collaborate, but it is not really inviting when we want to compete with each other.

## Broken by design

_Web APIs today are broken._ A strong claim, isn’t it? According to Darrel Miller from Microsoft the issue is with tight coupling between client and server that every successor protocol promised to solve and none actually did.

And why is this persistent problem suddenly so urgent? Because AI agents need to discover at runtime what an API can do. Something our deterministic, hardcoded-path APIs were never built for.

Janet Wagner at Nordic APIs rounds up a sentiment that’s been building among industry folks. And the proposed fixes read like a chapter from a textbook about REST APIs: use reusable, self-describing media types and, surprise, surprise, embrace hypermedia as the engine of application state.

[**Web APIs Are Broken, So How Do We Fix Them?**](https://nordicapis.com/web-apis-are-broken-so-how-do-we-fix-them/) (7 mins)

> When an API returns a response with a content type like text/calendar, the client has everything it needs to know to process that. It doesn’t need a JSON schema to figure out how to do it — and trust me, you’d never be able to describe iCal in a JSON schema.

Chris Hood separately pitches the [Agentic API specification](https://agenticapi.com/), which proposes expressive custom methods like `SUMMARIZE` or `CHECK` in place of CRUD. Personally, I’d be a bit cautious about [arbitrary HTTP extensions](https://en.wikipedia.org/wiki/Hyper_Text_Coffee_Pot_Control_Protocol).

## A graph, not a menu

When it comes to implementing MCP servers, one typical (anti)pattern for implementation is to map each operation from existing API to MCP tool. Then you end up with a manifest of 150 tools that eats your context window, degrades the model’s tool-selection accuracy, and happily offers `cancel_order` on an order that already shipped.

Jay Hamilton proposes a simple fix: expose a _single_ `api_navigate` tool and let the model follow the `_links` in each response. MCP server becomes a dumb proxy while the links in response from the underlying API provide the client with contextual possibilities. Almost like, hmm, an engine of application state?

[**HATEOAS as the Cure for MCP Tool Bloat?**](https://jaystevenhamilton.medium.com/hateoas-as-the-cure-for-mcp-tool-bloat-7c60dfdbde05) (7 mins)

> The right level of abstraction for an LLM is not an endpoint, it’s a graph of possibilities. HATEOAS gives you that graph. It always did. We finally have a client that knows how to use it.

Somehow it turns out that something which seemed too annoying for human developers is actually great for LLM agents.

## Arazzo learns to wait

If you’re not moving your workflows to self-describing API responses just yet, watch out for Arazzo. That’s a specification for workflows that layers on top of OpenAPI to describe multi-step API sequences. The recently announced version 1.1 adds, among others, AsyncAPI support: a single workflow can now span synchronous and asynchronous calls:

[**Announcing Arazzo Specification 1.1**](https://www.openapis.org/blog/2026/05/19/announcing-arazzo-specification-1-1) (4 mins)

> A workflow can now call an HTTP endpoint, publish to an event bus, wait for an acknowledgment, and chain the result into the next step — all described in a single, machine-readable document.

Check also the roadmap which promises support for actor-in-loop (human or agent) and steps invoking gRPC, GraphQL, SOAP, MCP, and A2A. You can check the growing Arazzo ecosystem on [OpenAPI.tools](https://openapi.tools/collections/arazzo).

## Same key, different story

How do you prevent an unsafe request from happening twice? “That’s easy,” I hear you say, “just check the `Idempotency-Key` header and replay the response”.

Here’s Madalin Ilie of Dochia showing why it surely sounds easy – until the second request comes. Perhaps it’s a concurrent retry, a partial failure, a downstream-unknown state, or the same `Idempotency-Key` carrying a different body.

[**Idempotency Is Easy Until the Second Request Is Different**](https://blog.dochia.dev/blog/idempotency/) (25 mins)

> The easy version of idempotency remembers that a key was seen.
>
> The useful version remembers what the key meant.

If you build anything that moves money, sends emails, or calls a 3rd party provider – which, at Mews, is most of us – this one is worth the half hour of your time.
