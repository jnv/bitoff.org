---
title: 'The API Dispatch #10: The old is new again'
description: >
  In the January issue, we admire the refreshed OpenAPI.tools, panic over the enshittification of API clients, take a tour of legacy API protocols, and pronounce GraphQL dead – again.
discussion:
  Fediverse: https://mastodon.social/@jnv/117020028727010535
  LinkedIn: https://www.linkedin.com/pulse/api-dispatch-10-old-new-again-mewsrnd-ovwwf
---

{% callout "Author's note" %}
The API Dispatch is a series I started as an internal newsletter at work. It's also available on [LinkedIn](https://www.linkedin.com/newsletters/r-d-api-mewsletter-7305909196418396160/).

Originally published on January 28, 2026.
{% endcallout %}

Somehow we’ve arrived at issue number ten of The API Dispatch – apparently this thing has legs. We’re already a few weeks into 2026, so an official “happy new year” would be pushing it, but consider it quietly implied.

## New year, new (OpenAPI) tools

If you ever researched tooling for OpenAPI specification, there’s a big chance you’ve found a pretty simple website OpenAPI.tools. You might want to take another look because the folks from APIs You Won’t Hate gave the site a big revamp. Not only are the individual categories more prominent and filterable, but there are now also cross-category collections like tools which [work with Arazzo spec](https://openapi.tools/collections/arazzo) (for describing API workflows) or support [OpenAPI Spec v3.2](https://openapi.tools/collections/openapi-v3-2-early-adopters) ([published in September](../2025-11-22-the-api-dispatch-7/index.md)). Meanwhile, the tools which are stuck with OpenAPI Spec v3.0 and older were delegated to the [legacy pile](https://openapi.tools/legacy).

[**OpenAPI.tools**](https://openapi.tools/)

## Crises, crises!

Maybe you don’t realize it while sifting through those shiny tools, but we have a crisis on our hands. An API tooling crisis. Well, more specifically an API clients crisis. According to Denys Melnyk Postman, Insomnia, Thunder Client – tools loved by developers in the past – have reached the peak enshittification, locking the users’ collections behind mandatory login, and becoming unusable under the pile on of enterprise features. New contenders like Bruno promise to be better and truly respect users – but for how long?

[**The API Tooling Crisis: Why developers are abandoning Postman and its clones?**](https://efp.asia/blog/2025/12/24/api-tooling-crisis/) (4 mins)

> The bloat isn’t just in the RAM; it’s in the UI. Postman has mutated into a platform trying to be everything at once – an API repo, a social network, a mock server, testing framework. Ninety percent of developers just want to ping an endpoint and see the JSON. Instead, we’re dodging pop-ups and menus designed for enterprise sales teams and then just being locked out behind sign-up wall or paywall.

Personally, being tired of Insomnia (I bid farewell to Postman ages ago), I’m now playing with [httpYac](https://httpyac.github.io/) which builds on top of plain-text `.http` files (used also by [JetBrains IDEs](https://www.jetbrains.com/help/idea/http-client-in-product-code-editor.html) and [Visual Studio](https://learn.microsoft.com/en-us/aspnet/core/test/http-files?view=aspnetcore-10.0)). It has rough edges but the chances of having my requests locked behind a paywall are slim. More about it another time.

## If it’s legacy, it works

Maybe the API you work with isn’t the most modern, but at least it’s not SOAP, right? Who’d be using SOAP these days, right?

If you are nodding approvingly, Kristopher Sandoval may have some bad news for you. In his list of 5 legacy API protocols, SOAP is actually the modern one. Whether it’s CORBA, still heavily used in aviation systems, or EDI, a protocol from the 70’s underpinning global manufacturing, these protocols show no signs of dying – they’re even thriving.

[**5 Legacy API Protocols That Refuse to Die**](https://nordicapis.com/5-legacy-api-protocols-that-refuse-to-die/) (7 mins)

> EDI implementation and management is steadily growing. With AI and automation seeing wider adoption in the industrial space, modern EDI gateways now pipe data into LLMs and analytics systems to do everything from predicting delays to optimizing shipment loading. In many ways, the structural reality and implementation of EDI make it the perfect structured data to ingest for supply-chain AI — it’s well standardized, widely implemented, and structured for clarity of ownership, processing staging between discrete units or sites, and access controls.

## GraphQL is sooo over

And speaking of legacy protocols, we didn’t pronounce GraphQL dead this year. Time to fix it.

I particularly enjoyed this rant from Dwayne Charrington:

[**I Am Glad GraphQL Is Dead, What a F\*\*\*ing Mistake That Was**](https://ilikekillnerds.com/2026/01/15/i-am-glad-graphql-is-dead-what-a-fucking-mistake-that-was/) (5 mins)

> I have watched teams spend weeks setting up GraphQL tooling. Getting the codegen right. Fixing the types. Debugging why the generated types do not match the actual responses. Upgrading Apollo when a new version breaks everything. This is time that could have been spent building features. Instead it was spent feeding the machine.

Or maybe this take from John James may be a bit more to your liking. Although the author’s focus on overfetching feels like a strawman argument to me.

[**GraphQL: the enterprise honeymoon is over**](https://johnjames.blog/posts/graphql-the-enterprise-honeymoon-is-over) (4 mins)

> If you’re using REST behind a BFF, overfetching is already solvable. The BFF can scope down responses and return only what the UI cares about. Yes, GraphQL can also do this. But here’s the part people gloss over. Most downstream services are still REST.

Maybe the answer is… [GraphQL over REST](https://mbonnin.net/2025-12-15_graphql_over_rest/)? It’s just one extra layer of tooling. Just one itsy bitsy query persistence mechanism.
