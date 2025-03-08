---
title: 'API is like a box of chocolates, you never know what you GET'
description: 'Poorly documented API with weird behavior. Can it be any worse?'
discussion:
  Dev.to: https://dev.to/superface/api-is-like-a-box-of-chocolates-you-never-know-what-you-get-31p6
  Medium: https://medium.com/superface/api-is-like-a-box-of-chocolates-you-never-know-what-you-get-7632a9406239
---

{% callout "Author's note" %}
This article was originally [published](https://web.archive.org/web/20241228135242/https://superface.ai/blog/box-of-chocolates) on [Superface](https://superface.ai/) blog before the pivot to agentic tooling platform and is republished here with company's permission.
{% endcallout %}

Imagine you get a task to integrate an API. It's a partner API, the code is outside your control, and it's not very widely used. But there is at least some documentation. You quickly dive in. There's a list of endpoints, required parameters, authorization, but something's missing. There is absolutely no information about API responses, not even how a regular response should look like, not to mention possible errors. So, it's time to pull out an HTTP client, and start poking the API with requests to see how it behaves.

Dealing with undocumented responses isn't such a big deal, we have tools for visualizing JSON (for example [JSON Crack](https://jsoncrack.com/)) and inferring its schema (like [MakeTypes](https://jvilk.com/MakeTypes/)). It's those edge cases which completely throw off any assumptions you already made.

Recently, I worked with an API which was like that. The documentation only mentioned that endpoints exist, and some particular parameters are required. Once I figured API's weird, custom-made authorization schema, I started to poke around the endpoints.

First thing I noticed was responses’ content type. While the API responds with JSON, the `content-type` header marks the response as HTML. This breaks automatic parsing in most HTTP clients (and also syntax highlighting and formatting), but the response can still be parsed manually. The fun started when some responses included HTML warnings with the data, for example:

```html
<br />
<b>Warning</b>: Undefined array key "TEST" in <b>/some/source/file</b> on line
<b>123</b>
<br />
<br />
{"foo":"bar"}
```

<i>Technically</i> the API behaved consistently: it claimed to respond with HTML, and so it did. But in practice, this behavior renders the API mostly useless for consumers. Sure, I could search the response and parse only the JSON part. While finding clever hacks is fun, it's usually not sustainable in the long run. Not to mention that keeping error messages exposing your source files structure is a [security risk](https://owasp.org/www-community/attacks/Full_Path_Disclosure). I reported the issue to the API provider (somehow surprised no one reported this issue before). They were swift to respond and improved their API based on my suggestions.

While I love to solve technical challenges as any other developer, sometimes it's really easier to talk to people. However, it frustrates me to think how much time is wasted by examining on poorly documented APIs with surprising behaviors. And while we should be advocating for better developer experience even for internal and partner APIs, we can also share our discoveries by abstracting APIs into [reusable use cases](https://dev.to/superface/stop-the-manual-api-plumbing-5639).
