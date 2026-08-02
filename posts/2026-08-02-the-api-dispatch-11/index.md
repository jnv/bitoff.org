---
title: 'The API Dispatch #11: CLI is coming to eat our MCPs!'
description: >
  After a February hiatus we will revisit MCP one year later. It looks like the pendulum is swinging back. Perplexity is moving to CLIs, critics are calling MCP dead, and Google is launching WebMCP on top of it all. Meanwhile, the emerging lesson is that “Agentic Experience” and User Experience aren’t either/or: what works for AI agents usually works for humans too. This issue also looks at token-efficient serialization formats gunning to become the JSON of the agentic era.
discussion:
  LinkedIn: https://www.linkedin.com/pulse/api-dispatch-11-cli-coming-eat-our-mcps-mewsrnd-fnvvf
---

{% callout "Author's note" %}
The API Dispatch is a series I started as an internal newsletter at work. It's also available on [LinkedIn](https://www.linkedin.com/newsletters/r-d-api-mewsletter-7305909196418396160/).

Originally published on March 31, 2026.
{% endcallout %}

## Quote of the month

> I abandoned my API for MCP because it was more efficient, but the\[n] abandoned my MCP because my CLI was more effective, but then abandoned my CLI, because the API did what I needed--guessing I will need abandon it next week for Agent Skills though.

—[Kin Lane on LinkedIn](https://www.linkedin.com/posts/kinlane_i-abandoned-my-api-for-mcp-because-it-was-activity-7438275314142760960-zfWG/)

## MCP is dead\*

It’s been one year since MCP became the “next big thing after APIs”, with some pronouncing MCP as the ultimate APIs killer (and yours truly [pronouncing MCP as another overhyped middleware](../2025-05-27-the-api-dispatch-2/index.md)). And now it seems that MCP is joining the hall of forgotten silver bullets.

The recent wave of anti-MCP sentiment was seemingly started by the [tweet by Morgan Linton](https://x.com/morganlinton/status/2031795683897077965) ([Xcancel](https://xcancel.com/morganlinton/status/2031795683897077965)):

> The cofounder and CTO of Perplexity, \[Denis Yarats] just said internally at Perplexity they’re moving away from MCPs and instead using APIs and CLIs

And before that, Eric Holmes wrote why, in his opinion, is MCP dying.

[**MCP is dead. Long live the CLI**](https://ejholmes.github.io/2026/02/28/mcp-is-dead-long-live-the-cli.html) (h/t [Nathaniel Goethel](https://www.linkedin.com/in/nathaniel-goethel))

> The best tools are the ones that work for both humans and machines. CLIs have had decades of design iteration. They’re composable, debuggable, and they piggyback on auth systems that already exist.
>
> MCP tried to build a better abstraction. Turns out we already had a pretty good one.

Last year everyone was building MCP servers. Now seemingly everyone is building CLIs. But does that really mean MCP is dying? Perhaps it’s the hype dying off and the technology is maturing. There are interesting use cases for MCP, for example [Cloudflare’s CodeMode](https://blog.cloudflare.com/code-mode/) uses MCP as a distribution mechanism for tool schemas processed into generated code. But so far we can say that MCP is not replacing APIs – and neither will CLIs.

## WebMCP is getting ready for lift off

Meanwhile, Google [launched an early preview of WebMCP](https://developer.chrome.com/blog/webmcp-epp) in February. What is WebMCP? Think of adding an MCP layer on any website which provides browser AI agents (like Gemini in Chrome) with custom tools. David Eastman has a more detailed introduction in The New Stack:

[**WebMCP turns any Chrome web page into an MCP server for AI agents**](https://thenewstack.io/webmcp-chrome-ai-agents/) (h/t [Eduard Ethan Carres Hidalgo](https://www.linkedin.com/in/eduardethancarres/))

> Because you may be browsing a site and want to ask an agent a question about the page, the agent needs some knowledge of the context before and during your question. You can imagine a user bringing up an AI chat next to a page and asking about something on the screen. So don’t just imagine an agent hitting a headless browser for some task, but also a user interrupting their own browsing session to query the site.

I’m really curious about practical use cases; where does WebMCP bring functionality which cannot be provided through semantic, accessible HTML? But then, it’s faster to slap WebMCP on top of inaccessible `<div>` soup and call it AI-ready.

And for sure, we will see abuses and prompt injections with rogue WebMCP integrations. But maybe the WebMCP tools will be also useful directly for humans, silently bringing a universal extension mechanism. Or, what Scott Werner calls [An (Accidentally) Universal Plugin System](https://worksonmymachine.ai/p/mcp-an-accidentally-universal-plugin) (mentioned in [issue #5](../2025-10-28-the-api-dispatch-5/index.md)).

## If it’s good for AI, maybe it’s also good for humans

There is an underlying narrative weaving behind these topics. Maybe you heard about newfangled terms like “Agentic Experience” which some pundits claim to be more important than User Experience (“Reply ‘AX’ to receive my FREE PDF on how to make your product agent-friendly!”). Maybe you spent hours tweaking `CLAUDE.md` and didn’t even bother with `README.md` (I know I did). But if there’s a lesson to be found in recent MCP vs. CLI discourse, it’s that what works for AI agents usually works for humans too. Or as Vladimir Keleshev puts it, [**AI=true is an Anti-Pattern**](https://keleshev.com/ai-equals-true-is-an-anti-pattern):

> I’ve seen an MCP tool being introduced because the actual command-line tool took a lot of time to execute, was producing no output and was—bacause of that—often mistakingly terminated early by the agent. That reminds me of someone else who is also prone to that… I am! Well, who else, when running a new tool and presented with a hanging command-line, doesn’t just Ctrl-C out of it, if nothing happens for straight 10 seconds?

In other words, “Agentic Experience” and “User Experience” isn’t either/or. If you make your API, CLI, and documentation human friendly, the AI agents will benefit as well.

## Ain’t got no token budget for JSON

Okay, perhaps there’s one area where we could make the experience, or rather budget, more agent friendly: token efficiency. With AI spending burning holes into budgets, industry is becoming token-anxious. Most APIs serialize data into JSON which incurs a lot of token overhead. In turn, new token-efficient formats are trying to become “JSON of the agentic era”. Vineet Bhatkoti takes a closer look at [TOON](https://toonformat.dev/) (Token-Oriented Object Notation) and [TRON](https://tron-format.github.io/) (Token Reduced Object Notation). Both with the same goal, but vastly different approaches.

[**Token-Efficient APIs for the Agentic Era**](https://dzone.com/articles/token-efficient-apis-for-the-agentic-era)

> TOON has proven effective for replacing JSON in internal agent-to-service calls, particularly for tabular data. The implementation is straightforward, the accuracy impact is minimal, and the cost savings are immediate.
>
> TRON remains appropriate for specialized use cases. High-volume agent orchestration scenarios where schema stability is guaranteed and both endpoints are under direct control represent the primary application. It addresses a narrow but valuable use case.
