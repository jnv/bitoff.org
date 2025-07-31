---
title: "The API Dispatch #3: The perfect API design workflow doesn't exi…"
description: The April installment of a monthly ‘newsletter’ about APIs. This issue focuses on OpenAPI Spec tooling and API design.
discussion:
  Fediverse: https://mastodon.social/@jnv/114593263280906063
  LinkedIn: https://www.linkedin.com/pulse/api-dispatch-mewsletter-issue-3-mewsrnd-t5joe/
---

{% callout "Author's note" %}
The API Dispatch is a series I started as an internal newsletter at work. It's also available on [LinkedIn](https://www.linkedin.com/newsletters/r-d-api-mewsletter-7305909196418396160/).

Originally published in April 2025.
{% endcallout %}

Let’s talk about API tooling, particularly around OpenAPI specification: design workflow, managing files, and SDK generators. Furthermore, there’s some interesting discussion about designing query parameters, and – related to that – one cool new HTTP method you probably don’t know about (spoiler alert: it’s not standardized yet). And as a bonus, there’s a story of one API security exploit which might make you hungry.

## The perfect modern OpenAPI workflow

Phil Sturgeon (of APIs You Won’t Hate) wrote an excellent guide on how to design an API with specification-first, including Git-centric workflow, linting, testing, and mocking. The guide is part of documentation for Bump.sh, an API documentation platform, but it still contains many tooling recommendations outside of a single vendor.

[The Perfect Modern OpenAPI Workflow](https://docs.bump.sh/guides/openapi/specification/v3.1/the-perfect-modern-openapi-workflow/) (15 mins • Bump.sh Documentation)

> Some people still seem to think OpenAPI is just about API documentation, but as more and more tooling appeared OpenAPI has clearly defined its time and cost savings throughout the API design and development process and beyond.

## How to handle OpenAPI file management?

As of today, the OpenAPI specification (in YAML format) for Connector API has over 2 MB and around 46 thousand lines. Can you imagine maintaining it manually?! Single file specification is perhaps convenient for distribution, but if you follow the specification-first approach, you may want to split your specifications into smaller files for better reviewability and reusability.

In her article, Lorna Mitchell explains how `$ref` syntax works and shows various options for organizing parts of OpenAPI specification: from shared components, to the “radical” single operation per-file approach.

[OpenAPI: How to Handle File Management](https://thenewstack.io/openapi-how-to-handle-file-management/) (4 mins • The New Stack)

> Working in a design-first approach means that changes to API design are easy to achieve at an early stage \[…\]. The downside is that many organizations find the OpenAPI format difficult to work with; often the API description is a single file and it may run to hundreds of thousands of lines of YAML or JSON.

## 8 SDK generators for APIs

One of big promises of OpenAPI specification is code generation: instead of manually wiring the endpoints and converting payload schemas. Just feed the specification into an SDK generation and get a reasonable API client out. But it wouldn’t be us, pesky developers, to not have _opinions_ about generated code.

On the positive side, there are many SDK generators to choose from. On the negative side, you may need to choose one. Luckily here’s Alvaro Tejada Galindo with recent review of 8 popular SDK generators: Fern, APIMatic, OpenAPI-Generator, Stainless, Speakeasy, Kiota, AutoRest, and LibLab.

[Review of 8 SDK Generators for APIs in 2025](https://nordicapis.com/review-of-8-sdk-generators-for-apis-in-2025/) (5 mins • Nordic APIs)

> After evaluating a wide range of tools, two stood out above the rest: **Fern** and **APIMatic**. Both platforms excel in delivering an exceptional user experience, high-quality SDK generation, and well-structured documentation.

## Patterns for Web API Query Parameters

For better or worse, most of Mews APIs don’t use query parameters (no need to when everything is `POST` with body). But since there’s an appetite to explore more “RESTful” designs, we will inevitably end up discussing how to use query parameters for `GET` requests.

For nice overview, here’s David Biesack’s entry to his API Design Patterns series, discussing usability of different (anti)patterns and how to represent them in OpenAPI Specification.

[From Here to There, from Where to Here](https://apidesignmatters.substack.com/p/from-here-to-there-from-where-to) (6 mins • Substack)

> I advise against adopting any query parameter patterns that expose the back-end implementation details of the API web service. I think this emphasizes the main purpose of following good API design and API design patterns: Expect change, and use API design to hide the API consumer from changes which should not impact them.

…but you can also avoid [bikeshedding](https://en.wikipedia.org/wiki/Law_of_triviality) altogether by adopting an API style which tells you precisely how query parameters should work, like [JSON:API](https://jsonapi.org/format/#query-parameters).

## Do you need to `POST` everything?

When I joined Mews, I remember having discussions why we’re using `POST` for retrieval operations:

> Query parameters are limited by length. You can’t fit complex queries into in query parameter and `GET` request can’t contain a body. When everything is `POST`, it’s much simpler and you can have as complex queries as you want.

`POST` method, however, isn’t intended for safe, idempotent operations. HTTP Working Group is aware of this gap in the standard. Since 2015 there’s been a draft of new HTTP method which is safe, idempotent, and cacheable – like `GET` – but can also carry a body. Here’s Bruno Pedro discussing the rationale and interesting design decisions for this new method.

[The HTTP QUERY Method](https://apichangelog.substack.com/p/the-http-query-method) (4 mins • Substack)

> \[…\]misuse of HTTP POST to perform query operations is one of the reasons James Snell et. al. started their work on a viable alternative standard about 10 years ago. They first named the new method SEARCH and later changed it to QUERY. And, we're lucky because they published an update just a few days ago, on March 12, 2025.

The _current_ latest draft is from April 29th, so things are moving really fast. You can watch the progress on [IETF Datatracker](https://datatracker.ietf.org/doc/draft-ietf-httpbis-safe-method-w-body/). Hopefully we will see the final standard soon!

## Exploiting McDonald’s APIs

_And now for something completely different._

What happens when a hungry security researcher encounters an insecure food delivery application? Get ready for a drive-thru full of byte-sized exploits.

[I’m Lovin’ It: Exploiting McDonald’s APIs to hijack deliveries and order food for a penny](https://eaton-works.com/2024/12/19/mcdelivery-india-hack/) (13 mins • Eaton Works)

> I was shocked at how easy that was. This type of vulnerability is called Broken Object Level Authorization or “BOLA’. This is a very common vulnerability I see all the time. Many BOLAs were found in McDelivery.
