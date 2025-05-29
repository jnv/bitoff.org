---
title: 'The API Dispatch #1'
description: The first installment of a monthly ‘newsletter’ about APIs.
discussion:
  LinkedIn: https://www.linkedin.com/pulse/api-dispatch-mewsletter-issue-1-mewsrnd-pavnc/
---

{% callout "Author's note" %}
The API Dispatch is a series I started as an internal newsletter at work. It's also available on [LinkedIn](https://www.linkedin.com/newsletters/r-d-api-mewsletter-7305909196418396160/).

Originally published in February 2025.
{% endcallout %}

Welcome to the pilot issue of the API ‘Mewsletter’. Unlike frontend, the world of APIs moves a bit slower. So beside the latest news, I plan to share some older but still valuable content. And maybe some standards.

This issue will cover the uncertain role of APIs in AI revolution, why you shouldn’t build IPAs or work around a certain network hack, history of hypermedia, and a standard format for serving API errors.

## [Is the AI Revolution Leaving APIs Behind?](https://nordicapis.com/is-the-ai-revolution-leaving-apis-behind/)

How better to kick off the inaugural issue of our API newsletter than by questioning the relevance of APIs in the agentic AI future? Art Anthony summarized Zdenek Nemec's keynote from the Nordic APIs Platform Summit.

In theory, LLMs and APIs should be a match made in heaven, machine calling another machine without human to do all the wiring. Right? Right?!

> When \[AI] agents can infer semantics, they can work like a human. In other words, they can use API documentation (especially from standardized formats like the OpenAPI Specification) to figure out which endpoints to call to get the data that they need.
>
> Unfortunately, there is no guarantee that they'll actually be able to call those endpoints. Nemec provides the example of LinkedIn – although the service has an API, he says that "it is not easily accessible" and "its functionality is limited." He suggests that successfully obtaining access to the API can take several weeks, then compares it with a third-party scraping service that can be connected to an agent in just one minute.
>
> \[…] "LLMs perform miserably when finishing complex tasks with complicated APIs." APIs typically have many methods, object IDs, fields, and data types, and this high granularity adds a great deal of abstraction that AI tools struggle with.

Perhaps the APIs aren't doomed though, we just need to "think about how we are building and _for whom_ we are building."

If you prefer video, watch Zdenek's talk: [APIs for AI: Have We Failed?](https://www.youtube.com/watch?v=lsdizCmFs7U)

## [Most people build IPAs, not APIs](https://www.linkedin.com/posts/emmanuelparaskakis_most-people-build-ipas-not-apis-and-no-activity-7294791684335226880-o7lv/)

From Emmanuel Paraskakis on LinkedIn:

> Most people build IPAs, not APIs.
>
> (And no, I'm not talking about your favorite craft beer—remember, API stands for Application Programming Interface.)
>
> ✅ Here's the right sequence for building an API product:
>
> 1. Application: What's the use case or app?
> 2. Programming: Who's the developer that will use your API to build that app?
> 3. Interface: How can you create an interface that serves both the use case and the developer?
>
> ❌ The common, but flawed approach is the reverse:
>
> 1. Interface: Start by building out an API from a database schema.
> 2. Programming: Generate docs and SDKs, hoping some developers will stumble upon them.
> 3. Application: Expect the market to magically build a million apps and throw money your way.
>
> This backward process often leads to failed API products.
>
> So, build your APIs right by starting with the use case and the user in mind. Only then can you design an interface that truly works.

[Mews Connector API](https://mews-systems.gitbook.io/connector-api) certainly started as IPA, let's see if we manage to turn it into API.

(Also, this isn't related to [APIs over IPAs podcast](https://www.moesif.com/blog/podcasts/) by Moesif.)

## [An interview with Mike Amundsen, Author of 'RESTful Web APIs'](https://htmx.org/essays/interviews/mike-amundsen/)

Carson Gross (famous for Twitter sh\*tposting and infamous for HTMX) dives into the history of hypertext and hypermedia with Mike Amundsen. HTMX reinvigorated hypermedia-driven UIs, but hypermedia-driven API clients never caught up. But perhaps AI agents could be "sufficiently smart" hypermedia clients?

> I think the rise in popularity of LLM-driven automation is another great opportunity to create hypermedia-based, composable services that can be "orchestrated" on the fly. I am worried that we'll get too tied up in trying to make generative AI systems look and act like human users and miss the chance to design hypermedia workflow designed specifically to take advantage of the strengths of statistical language models.

(Note to myself: Next month add something about Model Context Protocol.)

## [Let's Stop Building APIs Around a Network Hack](https://apisyouwonthate.com/blog/lets-stop-building-apis-around-a-network-hack/) (2017)

I find this article from Phil Sturgeon, unfortunately, still relevant:

> Clients have for a long time been very unhappy making multiple HTTP/1.1 calls, especially over mobile networks. That concern has had a noticeable impact on how we design APIs. Multiple calls is considered a point of bad design \[…]
>
> The main point here is that HTTP/1.1 forces you to handle DNS, HTTP handshakes, SSL negotiation, etc., on every single call, and if your homepage wants 10 things from the API then it's doing all of that junk 10 times…
>
> HTTP/2 does all of that once, then you just make those calls back and forth. You can make those calls asynchronously, and fetch more data for those items as the responses come back.

We have a feature similar to compound documents in Connector API (extents), and we are slowly getting rid of them in favor of more granular operations. Majority of our Open API traffic is still using HTTP/1, though…

## [RFC 9457: Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc9457 'https://www.rfc-editor.org/rfc/rfc9457')

How'd you design an error response for a JSON API? Actually, you don't need to answer, because there's already an RFC for that, defining the `application/problem+json` media type for communicating problem details with API consumers. The error response looks like this:

```
HTTP/1.1 403 Forbidden
Content-Type: application/problem+json
Content-Language: en

{
 "type": "https://example.com/probs/out-of-credit",
 "title": "You do not have enough credit.",
 "detail": "Your current balance is 30, but that costs 50.",
 "instance": "/account/12345/msgs/abc",
 "balance": 30,
 "accounts": ["/account/12345",
              "/account/67890"]
}
```

Note that `balance` and `accounts` fields are just examples, you can add any additional properties you need, the RFC defines the semantics of a few basic properties: `type`, `status`, `title`, `detail`, and `instance`.

If an idea of reading an RFC scares you, you can also check a [two-part series about Problem Details](https://swagger.io/blog/problem-details-rfc9457-doing-api-errors-well/) on Swagger blog.

As my colleague pointed out, ASP\.NET Core is using `application/problem+json` by default in its [exception handler](https://learn.microsoft.com/en-us/aspnet/core/web-api/handle-errors?view=aspnetcore-8.0#exception-handler) (they just refer to the older [RFC 7807](https://datatracker.ietf.org/doc/html/rfc7807)).
