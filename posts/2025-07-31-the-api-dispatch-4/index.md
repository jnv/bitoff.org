---
title: "The API Dispatch #4: Design-first doesn't have to be OpenAPI Spec first"
description: The June installment of a monthly ‘newsletter’ about APIs. This issue focuses on The Language-Oriented Approach to API development, along with TypeSpec, Smithy, and ALPS.
discussion:
  Fediverse: https://mastodon.social/@jnv/114949897275674051
  LinkedIn: https://www.linkedin.com/pulse/api-dispatch-mewsletter-issue-4-mewsrnd-4vvqe/
---

{% callout "Author's note" %}
The API Dispatch is a series I started as an internal newsletter at work. It's also available on [LinkedIn](https://www.linkedin.com/newsletters/r-d-api-mewsletter-7305909196418396160/).

Originally published in June 2025.
{% endcallout %}

Since I started this newsletter, I looked forward to this issue.

As we are breaking the monolith into increasing number of services, there’s a need for best practices, paved roads, and API governance. This includes choosing recommended technologies: Should we stick with JSON-over-HTTP or start investing in gRPC? Or GraphQL? Or SOAP? (just kidding)

Picking the technology decides how you design your APIs because each stack is tied to its own specification formats. But what if we could flip it around? Start with the domain design and turn the technology decision into an “implementation detail”…

In this issue, we will explore “The Language-Oriented Approach” to API development, which goes beyond the OpenAPI specification. Instead of concentrating on the technical details of individual operations, this approach emphasizes high-level design and leaves the specifics to the tools. Furthermore, we will examine tools that support this method, such as TypeSpec, ALPS, and Smithy.

## The Language-Oriented Approach to API Development

The “design-first API development” became synonymous with “OpenAPI specification-first”. But while OpenAPI spec is great format for _documenting_ APIs, arguably it’s not the best way to _design_ APIs. OpenAPI spec looks at API design through the lens of technology capabilities and HTTP semantics. The API governance then focuses on restricting the design to ensure consistency of APIs in the organization. This presents a steep learning curve: you need to understand OpenAPI specification, HTTP semantics, as well as organization design rules.

In his short book from 2023, Stephen Mizell introduces “language-oriented approach” to API development, which flips the API design around:

> In this approach, people create their own language for the way they talk about APIs and capture that language in a DSL \[Domain Specific Language\]. From there, they generate OpenAPI documents that always match the style and standards of the organization or team.

As Mizell [emphasizes](https://smizell.com/posts/2023/02/new-book-the-language-oriented-approach-to-api-development/), this isn’t a revolutionary new concept, but naming of an existing practice successfully used in various companies.

[The Language-Oriented Approach to API Development](https://smizell.com/language-oriented-approach/) (44 mins • smizell.com)

> The language-oriented approach makes it easier to do upfront, customer-driven API design. It's an approach that organizations like Amazon, Microsoft, and Stripe use to drive their API programs at scale.

Mizell also dives into case studies how specific companies practice the language-oriented approach. Some of the languages in the book are also available for others to use and adopt – and that’s where we look next.

## TypeSpec

[TypeSpec](https://typespec.io/) from Microsoft was around since 2022, originally under the name Cadl. Microsoft started to promote the language last year and [released version 1.0](https://typespec.io/docs/release-notes/release-2025-05-06/) in May. As the name and language’s origin implies, it’s heavily inspired by TypeScript (I’d say it’s basically TypeScript without JavaScript):

```ts
// From TypeSpec's homepage
import "@typespec/http";
using Http;

model Store {
  name: string;
  address: Address;
}

model Address {
  street: string;
  city: string;
}

@route("/stores")
interface Stores {
  list(@query filter: string): Store[];
  read(@path id: Store): Store;
}
```

When you pass the document through TypeSpec compiler, you can generate OpenAPI Specification or (with additional annotations) Protobuf, JSON Schema, even complete API [clients](https://typespec.io/docs/emitters/clients/introduction/) and (highly experimental) [servers](https://typespec.io/docs/emitters/servers/http-server-csharp/project/).

For practical example, check the tutorial by J. Simpson:

[Using TypeSpec to Design APIs](https://nordicapis.com/using-typespec-to-design-apis/) (6 mins • Nordic APIs)

### API Specification Wars Redux

API specification formats have colorful history of competition. I will discuss it another time, but maybe we are about to see another take on “API specification wars”. Chris Wood hints at this possibility in his write up of Gareth Jones' talk from Austin API Summit 2024:

['Tis but a Scratch: Does TypeSpec Reignite the Specification Wars?](https://nordicapis.com/tis-but-a-scratch-does-typespec-reignite-the-specification-wars/) (5 mins • Nordic APIs)

> TypeSpec is an attempt to combine the design-first and code-first worlds into something that works across both methodologies and reduces cognitive load for designers. You get the convenience and flexibility of an API design approach that “looks like code” and is eminently reusable and extensible, with a means to support API governance embedded in the tools themselves. You also get support for tools and description languages already in the existing API landscape, especially for the OpenAPI Specification. The TypeSpec approach also means a general decrease in complexity, which, for Microsoft, eases its use across the organization.

Perhaps we will see some countershots from OpenAPI Initiative in the upcoming major revision of OpenAPI Specification dubbed “[Moonwalk](https://www.openapis.org/blog/2025/02/05/moonwalk-2025-update)”…

### Is code the answer, though?

If we go back to the “language-driven approach”, one of the promised benefits is faster onboarding of newcomers as well as bringing non-technical people into the fold. However, isn’t TypeSpec’s emphasis on developer experience at the detriment of accessibility for non-developers? Fabrizio Ferri Benedetti points out the problematic mindset behind TypeSpec:

[TypeSpec reminds us why OpenAPI exists in the first place](https://passo.uno/typespec-openapi-api-design/) (5 mins • passo.uno)

> None of what TypeSpec brings to the table solves the fundamental problem of opening API design to more people. If anything, it seems a way of wrestling back control of API development from other collectives. I hope to be proven wrong.

## Smithy

[Smithy](https://smithy.io/) evolved from Amazon’s internal Interface Definition Language (IDL) as protocol-agnostic language for designing services. Initially open-sourced in 2019, it reached version 2.0 in 2022. Compared to TypeSpec, the syntax feels closer to Protobuf and other IDLs:

```
$version: "2"
namespace example.weather

service Weather {
    version: "2006-03-01"
    resources: [City]
    operations: [GetCurrentTime]
}

resource City {
    identifiers: { cityId: CityId }
    read: GetCity
    list: ListCities
    resources: [Forecast]
}
```

Compared to TypeSpec, Smithy provides [more diverse tooling ecosystem](https://github.com/smithy-lang/awesome-smithy), including wider editor support and client and server generators for more languages (although C# is particularly lacking). Where TypeSpec treats reusability and patterns sharing same as software packages, Smithy provides [an index of reusable traits](https://smithy.io/2.0/trait-index.html) (one can, of course, build its own traits).

For deep dive into Smithy, check out Kristopher Sandoval’s [Overview of Smithy, an API Description Language From Amazon](https://nordicapis.com/overview-of-smithy-an-api-description-language-from-amazon/) (8 mins • Nordic APIs).

## ALPS

[ALPS](http://alps.io/), or Application Level Profile Semantics, doesn’t have a fancy website like TypeSpec, nor large ecosystem like Smithy. (But it has an [RFC draft](https://datatracker.ietf.org/doc/draft-amundsen-richardson-foster-alps/)!) In fact, ALPS doesn't have much of syntax:

```yaml
# Example from https://github.com/mamund/alps-unified/blob/main/samples/todo-alps.yaml
alps:
  version: '1.0'
  doc:
    value: 'Simple Todo list example'
  descriptor:
    # properties
    # - these are the data elements
    - id: id
      type: semantic
      text: storage id of todo item

    - id: body
      type: semantic
      text: content of todo item
    # groupings
    # - these are the storage objects
    - id: todoItem
      type: group
      text: todo item
      descriptor:
        - href: '#id'
        - href: '#body'
    # actions
    # - these are the operations
    - id: todoList
      type: safe
      rt: todoItem
      text: return list of todo items

    - id: todoAdd
      type: unsafe
      rt: todoItem
      text: create a new todo item
      descriptor:
        - href: '#todoItem'

    - id: todoRemove
      type: idempotent
      tags: delete
      rt: todoItem
      text: remove a single todo item
      descriptor:
        - href: '#id'
```

“Wait a minute, this is YAML! And there are no resources, URLs or anything!” However, the snippet above is enough to generate an OpenAPI specification, AsyncAPI specification or Protobuf file.

> ALPS tells you the WHAT of the service, not the HOW.

Kin Lane summarized Mike Amundsen’s explanation in [What is ALPS?](https://apievangelist.com/2015/03/10/what-is-alps/) (2 mins • API Evangelist):

> ALPS describes the operations (actions) and data elements of a service. That’s all. That description is the same no matter the design-time tooling, protocol, or message format used. That description is the same whether you are implementing code on the client-side or server-side.

ALPS goes really well with domain-driven design. It’s intended as a machine-readable “format for describing the bounded context of a service”.

Unlike other specification formats, ALPS also captures transitions between actions which Amundsen likens to a topographic map of API landscape:

[ALPS and the Topographic Mindset](https://mamund.substack.com/p/alps-and-the-topographic-mindset?utm_source=publication-search) (2 mins • Substack)

> A flat OpenAPI doc might say: “POST here, then GET there.”
>
> ALPS says: “From here, you could create, explore, update, or transition. Here's what those actions mean, and what they'll afford you.”

This is particularly interesting with the rise of “agentic” API clients which are no longer bound to design-time constraints:

[Affordance Aversion](https://mamund.substack.com/p/affordance-aversion?) (2 mins • Substack)

> ALPS puts many people off. Why? Because it, by design, reduces certainty. It introduces dynamism. It asks developers to focus on what the system looks like at runtime, not build time.

As for tooling, Amundsen built [alps-unified](https://github.com/mamund/alps-unified) tool for converting ALPS descriptions into various API specification formats. There is also [App State Diagram](https://www.app-state-diagram.com/manuals/1.0/en/index.html) for visualization of actions (although it works with XML representation of ALPS).

Amundsen describes the development process with ALPS in his books: [Design and Build Great Web APIs](https://pragprog.com/titles/maapis/design-and-build-great-web-apis/) and [RESTful Web API Patterns & Practices Cookbook](https://www.webapicookbook.com/).
