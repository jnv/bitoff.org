---
title: "The API Dispatch #7: Not your model's model"
description: >
  In the September API dispatch, we're celebrating the release of OpenAPI Specification 3.2. We'll also go over an important API design rule, check out the new RPC system for the web, and take a closer look at why HTTP/1 seems simple but isn’t. Read until the end for One Clever Trick for exfiltrating emails through MCP.
discussion:
  LinkedIn: https://www.linkedin.com/pulse/api-dispatch-mewsletter-issue-7-mewsrnd-1cgbe/
---

{% callout "Author's note" %}
The API Dispatch is a series I started as an internal newsletter at work. It's also available on [LinkedIn](https://www.linkedin.com/newsletters/r-d-api-mewsletter-7305909196418396160/).

Originally published on October 2, 2025.
{% endcallout %}

## OpenAPI Specification 3.2 is here

The new minor version has been in the works for a while (I mentioned it [in the fifth issue](../2025-10-28-the-api-dispatch-5/index.md)) and the final specification was released on 19 Sep 2025. What does it bring?

- Support for new and custom HTTP methods ([QUERY anyone](../2025-05-29-the-api-dispatch-3/index.md#do-you-need-to-post-everything)?)
- Extended tag information: descriptions, nesting, and intended use (`kind`)
- sequential and streaming data support, like `text/event-stream` for Server-Sent Events, and schema for streamed items
- Additional features in `security` schemes, including OAuth 2.0 Device Authorization flow and marking security scheme as deprecated

Check the [official announcement](https://www.openapis.org/blog/2025/09/23/announcing-openapi-v3-2) and the [release notes on GitHub](https://www.openapis.org/blog/2025/09/23/announcing-openapi-v3-2).

## Data model ≠ object model ≠ resource model ≠ message model

A typical misconception about REST APIs design is that all resources should mirror your domain models. That’s how you get leaky abstractions, breaking changes, and expensive fixes just to keep your public interface stable while model changes.

So if you are designing an API which will be used outside of your team, you should adhere to [Amundsen’s Maxim](https://www.amundsens-maxim.com/), in which Mike Amundsen postulates:

> Remember, when designing your Web API, your data model is not your object model is not your resource model is not your message model.

Pair that with [Hyrum’s Law](https://www.hyrumslaw.com/) which, unlike Amundsen’s Maxim, is inevitable.

## Cap’n Web is a new RPC system… and this time it’s cereal!

Cloudflare’s Birthday Week brought us Cap’n Web, a “spritual sibling to [Cap’n Proto](https://capnproto.org/)” from Kenton Varda. Varda previously designed Protocol Buffers v2 at Google and Cap’n Proto was created to address its shortcomings, offering extremely fast binary interchange format and a capability-based RPC with features like promise pipelining (aka “[time traveling](https://capnproto.org/rpc.html)”). Cap’n Web brings these features to JavaScript for clients and servers. Unlike Cap’n Proto it’s schema-less, relying on TypeScript’s type system, and uses plain JSON for transport.

Particularly the promise pipelining makes Cap’n Proto a viable alternative to GraphQL without heavy tooling or specialized language. The announcement blog post goes into extensive details, so I will quote just a code example.

[Cap'n Web: a new RPC system for browsers and web servers](https://blog.cloudflare.com/capnweb-javascript-rpc-library/) (14&nbsp;mins)

```js
let user = api.authenticate(token);

// Get the user's list of friends (an array).
let friendsPromise = user.listFriends();

// Do a .map() to annotate each friend record with their photo.
// This operates on the *promise* for the friends list, so does not
// add a round trip.
// (wait WHAT!?!?)
let friendsWithPhotos = friendsPromise.map((friend) => {
  return { friend, photo: api.getUserPhoto(friend.id) };
});

// Await the friends list with attached photos -- one round trip!
let results = await friendsWithPhotos;
```

(There’s some interesting history: Before Cloudflare, Varda founded [Sandstorm](https://sandstorm.org/), a platform for self-hosting web apps built on Cap’n Proto. He wrote a [very candid backstory of Sandstorm](https://sandstorm.io/news/2024-01-14-move-to-sandstorm-org) – and yes, I still have my Sandstorm stickers from the [crowdfunding campaign](https://sandstorm.io/about#indiegogo).)

## HTTP/1: “Text-based” doesn’t mean “simple”

If anyone can talk about HTTP’s complexity, it’s Daniel Stenberg. He's the author of libcurl which powers many implementations of HTTP clients in your devices. Stenberg argues that while the idea and concept of HTTP is simple, the actual reality is far from that. And lot of this complexity is encountered even in the “simple” text-based HTTP/1:

[HTTP is not simple](https://daniel.haxx.se/blog/2025/08/08/http-is-not-simple/) (6&nbsp;mins)

> There is not one single way to determine the end of a HTTP/1 download – the “body” as we say in protocol lingo. In fact, there are not even two. There are at least three (Content-Length, chunked encoding and Connection: close). Two of them require that the HTTP client parses content size provided in text format. These many end-of-body options have resulted in countless security related problems involving HTTP/1 over the years.

Want more protocol pain? Check the [previous issue](../2025-10-29-the-api-dispatch-6/index.md#falsehoods-programmers-believe-about-http-and-json).

## MCP stands for Mail Copy Please

You knew this was coming. The unofficial release of MCP server for Postmark was sending a copy of every email to attacker’s inbox. Now, one could argue that this issue isn’t with MCP itself, but with npm, where the malicious server was published. Furthermore I don’t think many organizations use an MCP server to send, for example, password reset emails, so we can hope the damage will be smaller than the article suggests. Still it’s an important space to watch as MCP is bringing us new and exciting ways of exfiltrating sensitive data…

[First Malicious MCP in the Wild: The Postmark Backdoor That's Stealing Your Emails](https://www.koi.security/blog/postmark-mcp-npm-malicious-backdoor-email-theft) (7&nbsp;mins)

> \[T\]he truly messed up part? The developer didn't hack anything. Didn't exploit a zero-day. Didn't use some sophisticated attack vector. We literally handed him the keys, said "here, run this code with full permissions," and let our AI assistants use it hundreds of times a day. We did this to ourselves.
