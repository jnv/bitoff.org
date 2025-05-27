---
title: 'The API Dispatch #2: MCP is coming to eat our APIs! (or maybe not)'
description: The March installment of a monthly ‘newsletter’ about APIs focuses on Model Context Protocol and other agents-related API abstractions. Also, I squeezed in recent RFCs for API deprecation and early hints.
discussion:
  LinkedIn: https://www.linkedin.com/pulse/api-dispatch-mewsletter-issue-2-mewsrnd-xdx2e/
---

{% callout "Author's note" %}
The API Dispatch is a series I started as an internal newsletter at work. It's also available on [LinkedIn](https://www.linkedin.com/newsletters/r-d-api-mewsletter-7305909196418396160/).

Originally published on March 2025.
{% endcallout %}

In March you may have noticed a sudden hype around **Model Context Protocol** (MCP). In this issue of The API Dispatch we will take a look into this hype, along with alternatives to MCP (like **agents.json**, **<abbr title="Unified Intent Mediator protocol">UIM</abbr>**, and **<abbr title="Agent Communication Protocol">ACP</abbr>**). In addition, there are recent news on standardization of RFCs related to **API deprecation** and **HTTP performance**.

## Model Context Protocol

MCP defines a standardized way for Large Language Models to access context data and tools. The [official documentation](https://modelcontextprotocol.io/) describes MCP as “USB-C port for AI applications”:

> Just as USB-C provides a standardized way to connect your devices to various peripherals and accessories, MCP provides a standardized way to connect AI models to different data sources and tools.

[Introduced by Anthropic in November 2024](https://www.anthropic.com/news/model-context-protocol) and supported in Claude for desktop, it gained more interest from developers in the past months, most recently with OpenAI [announcing planned support for MCP](https://nitter.net/OpenAIDevs/status/1904957755829481737).

So what MCP means for APIs? Does it spell the end of APIs? Or their evolution? A cynic in me says “it’s just another overhyped middleware”. For less cynical view though, I can recommend the article from Kevin Swiber:
[MCP: The Ultimate API Consumer (Not the API Killer)](https://www.layered.dev/mcp-the-ultimate-api-consumer-not-the-api-killer) (5 mins • layered.dev • h/t [Peter Vitez](https://mews.atlassian.net/wiki/people/712020:3d773bd0-7264-469e-8710-4085d8ec5af3?ref=confluence))

> The relationship between MCP and APIs is symbiotic, not adversarial. MCP servers are essentially specialized API clients with a standardized interface—they're not replacing APIs, they're consuming them en masse.

For an in-depth look, I enjoyed this conversation between Josh Twist and Martyn Davies from Zuplo: [Is MCP hype or helpful? (The API & Anchor Ep. 6)](https://www.youtube.com/watch?v=XQxjvqJSFYE) (29 mins • YouTube)

> I can connect my client, send the API, and it can stream back over server side events (SSE), the tokens as they come out, which creates a better experience. Now, it's important to remember, though, that MCP is about providing a way for a tool, effectively augmenting an LLM to reach out to some sort of web service, and get information. Let's be honest, 99.9999 percent of web servers in the world or web calls do not use SSE.

Note that the most recent version of MCP from March 26th introduced new [Streamable HTTP transport](https://spec.modelcontextprotocol.io/specification/2025-03-26/basic/transports/#streamable-http) which allows for stateless responses while still keeping support for SSE. So this simplifies implementation of basic MCP servers and addresses some of criticism in the discussion above.

How does the development with MCP looks in practice though? Perhaps it’s not straightforward as models performing actions directly through MCP. Perhaps it’s really about providing the context for the model. For example, Stripe has [published their documentation](https://docs.stripe.com/building-with-llms#mcp) through MCP server. When you connect that documentation to MCP client, like Cursor editor, it can substantially improve its code-generation abilities, like [demonstrated in this demo posted by Simon Taylor](https://www.linkedin.com/posts/sytaylor_this-demo-is-wild-watch-an-engineer-build-activity-7299095626993029120-zW_J/) (3 mins • LinkedIn).

> I have this Stripe MCP installed and we have a demo tomorrow where we just want to show off how the subscription management is gonna work in Stripe. I can literally talk to my computer and have it write a command line interface that I’m going to use in my demo.

## …and the others

MCP isn’t the only, nor the first attempt at extending <abbr title="Large Language Model">LLM</abbr> capabilities in a standardized way.

### Unified Intent Mediator Protocol

Back in September 2024 Synapti published [Unified Intent Mediator Protocol](https://www.uimprotocol.com/) (UIM) which introduces concept of “intents” for AI agents – the concept is similar to [tools in MCP](https://modelcontextprotocol.io/docs/concepts/tools).

[Understanding Intents: The Building Blocks of the UIM Protocol](https://www.uimprotocol.com/ideas/blog-post-title-three-shhh4) (4 mins • uimprotocol.com)

> Think of \[intent\] as a digital instruction card: it tells the AI agent what it can do, what it needs to do it, and what it will get back once it’s done.

UIM Protocol goes a bit further than MCP as it defines a standardized model authorization for AI agents: Policy Adherence Tokens (PAT).
[The Role of Policy Adherence Tokens (PAT) in Ensuring Secure and Compliant Interactions](https://www.uimprotocol.com/ideas/blog-post-title-two-8ha2y) (5 mins • uimprotocol.com)

> …PATs, are digital tokens that act like a passport for AI agents. They encapsulate everything the agent needs to know about what it can and can’t do when interacting with a web service. Think of them as permission slips that also handle billing and compliance.

### agents.json

Introduced by Wildcard in February 2025, agents.json is much lighter specification which reuses existing API descriptions in OpenAPI specifications, and introduces an additional layer – the `agents.json` file – which describes how API operations fit together.

From the [official documentation](https://docs.wild-card.ai/agentsjson/introduction):

> Describing endpoints/data models without describing _**how**_ they interact together is why AI agents struggle to take the right sequence of actions. To solve this, we introduce flows and links. Flows are contracts with a series of 1 or more API calls that describe an outcome. Links describe how two actions are stitched together.

The advantage of this approach over MCP, as covered in their [FAQ](https://docs.wild-card.ai/agentsjson/faq), is possibility to leverage existing APIs without the need to introduce support for a new protocol.

I see also a big overlap with recently standardized [Arazzo Specification](https://www.openapis.org/arazzo) from OpenAPI Initiative, which also aims to declaratively describe API workflows – not just for AI agents. Let’s see where this goes.

### Agent Communication Protocol

Last protocol I will cover is in very early stage: Agent Communication Protocol (ACP) which is part of [BeeAI](https://beeai.dev/) agent composition framework. The initial version extends MCP and aims to tackle various topics not addressed in MCP, like language ambiguity and agent-to-agent communication.

There’s an open [discussion on GitHub](https://github.com/orgs/i-am-bee/discussions/284) and [early documentation](https://docs.beeai.dev/acp/alpha/introduction) under the BeeAI agent composition framework. What makes ACP interesting is its strong focus on standardization. The BeeAI framework was donated by IBM to The Linux Foundation, so it’s not tied to a single vendor. The question is whether the ecosystem around AI agents is ready for this sort of standardization. And of course, one cannot forget that [XKCD about standards](https://xkcd.com/927/).

## The Deprecation HTTP Response Header Field (RFC 9745) becomes a standard

[Announced by Erik Wilde](https://www.linkedin.com/posts/erikwilde_api-apidesign-apimanagement-activity-7308004300205535232-rRT6) (1 min • LinkedIn):

> It's alive! The IETF just published RFC 9745 which defines "The Deprecation HTTP Response Header Field".

Here’s [the whole RFC](https://www.rfc-editor.org/rfc/rfc9745) (8 mins • [http://rfc-editor.org](http://rfc-editor.org) ), but the gist of the standard is this example:

```
Deprecation: @1688169599
Link: <https://developer.example.com/deprecation>;
      rel="deprecation"; type="text/html"
```

The `Deprecation` response header contains the timestamp when the resource is (or has been) deprecated, and the optional `Link` may contain the link to the documentation.

Deprecation header builds upon the earlier [RFC 8594](https://www.rfc-editor.org/rfc/rfc8594) which defines the `Sunset` header, but, as Wilde points out, uses different date format.

## HTTP code 103 Early Hints (RFC 8297) becomes a standard

[Status code 103](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/103) allows the server to send `Link` headers while the response is still being prepared. The browsers then can start fetching resources, like scripts and styles, earlier. Early Hints can be also leveraged in server-side APIs for preloading relations as exemplified by Vulcain.

[Use preloading to create fast and idiomatic client-driven REST APIs](https://vulcain.rocks/docs) (5 mins • vulcain.rocks)

> When possible, we recommend using Early Hints (the 103 HTTP status code) to push the relations. Vulcain allows to gracefully fallback to preload links in the headers of the final response or to HTTP/2 Server Push when the 103 status code isn't supported.

Early Hints status code also replaces, to some extent, the server push feature of HTTP/2 which has been [considered dead](https://evertpot.com/http-2-push-is-dead/) for some time.

Since it was standardized in 2017 ([RFC 8297](https://www.rfc-editor.org/rfc/rfc8297)), as of February 2025 the 103 Early Hints status code is no longer considered experimental and it’s now a [proposed standard](https://datatracker.ietf.org/doc/status-change-early-hints-to-proposed-standard/).

---

That’s it for March. Next issue will be hopefully shorter and less about AI agents. Do you have some favorite use cases for MCP? Are you hoping for another protocol? Let me know!
