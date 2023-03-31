---
title: "Is Twitter API Free? I've built a website to find out"
description: "A single-serving site for checking the status of Twitter API paywall."
---

Last week, Twitter announced the end of free access to its public API. The announcement came [in a Tweet][announcement], a single week before the change, lacked any details about the pricing, and only [vaguely promised more information](https://twitter.com/TwitterDev/status/1621027418680229888).

Today is February 8th, one day before the announced deadline. No further information was provided on the TwitterDev account, community forums, or developer newsletter. Only more vague promises of a free “write-only API for bots providing good content” in a [reply tweet](https://twitter.com/elonmusk/status/1622082025166442505) by Mr. “Chief Twit” himself.

To help fellow developers, I've made a website to provide a definitive answer to the question: [**Is Twitter API Free?**](https://istwitterapifree.com/)

## A single-serving site

{% figure "istwitterapifree.png", "Screenshot of the website: Is Twitter API free? Yes. Not for long. The deadline is tomorrow. But maybe you can use it for posting if Elon likes you." %}

IsTwitterApiFree.com as of February 8th.

{% endfigure %}

There's a long tradition of [single-serving sites](https://en.wikipedia.org/wiki/Single-serving_site), like [Tired.com](http://tired.com/) or [Zombo.com](https://zombo.com/). I wanted to build a single-serving site of my own, and this seemed like a good opportunity to make some fun out of this chaotic situation.

It's also telling that Ryan King, Twitter employee number 33, [relaunched](https://theryanking.com/post/is-twitter-down/) his [Is Twitter Down?](https://istwitterdown.com/) site after more than a decade, reminding the old days of Fail Whale.

## Behind the scenes

I could've just made a static HTML site with “Yes”, and changed it to “No” once it'd be clear Twitter pulled the plug. That'd be the simplest thing to do, so I overengineered the whole thing, obviously.

The website is periodically regenerated by GitHub Actions and deployed to GitHub Pages. During the build, a single Twitter API call is made for the existence of the [announcement tweet][announcement].

I don't know how exactly the Twitter API will communicate the paid access, but I assume that the API call will fail somehow. It's also possible that Twitter might remove the tweet if Mr. “Chief Twit” changes his mind. Therefore the success or failure of the call decides what is shown on the page.

I challenged myself to avoid any extra packages, so the [site generator logic][source] is written in vanilla JavaScript with a few Node.js built-in libraries. I'm using the built-in `fetch` function, which is available without any flags since Node.js 18.

I'm also curious about how many visitors my silly site gets. [Goat Counter](https://www.goatcounter.com/) is a perfect web analytics tool for this kind of project, free and privacy-friendly. You can even view the traffic to the site [on a public dashboard](https://istwitterapifree.goatcounter.com/).

## The feed and the bots

The site wouldn't be complete without a [Twitter bot](https://twitter.com/IsTwApiFree) and a [Mastodon bot](https://masto.ai/@istwitterapifree) (of course). I wanted to avoid implementing the posting logic, so I used the most unappreciated technology on the web: the good old RSS feed (well, technically an Atom feed).

The site generator creates a [feed with a single entry](https://istwitterapifree.com/feed.xml). The entry is identified by the current date, so feed readers will display a new item at most once a day, regardless of how many times the site is regenerated.

This feed is passed to automation. For Twitter, I've used <acronym title="If This Then That">IFTTT</acronym> to post a new feed item to the Twitter account. I assume that a larger provider like IFTTT already pays for Twitter API, so it won't be affected.

{% figure "ifttt.png", "Screenshot of IFTTT applet: If new feed item, then post a tweet." %}

The whole magic behind the [IsTwApiFree bot](https://twitter.com/IsTwApiFree).

{% endfigure %}

For posting to Mastodon, I originally tried [Mastofeed](https://mastofeed.org/), but I haven't figured out a way to include the content of the feed entry in the post. I've turned to GitHub Actions, particularly [Mastofeedbot](https://github.com/joschi/mastofeedbot), which runs as a separate action after the site is updated.

## Lesson learned: Intl API

The generated site displays how many days remain until the deadline. What helped me was JavaScript's built-in [Internationalization API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl), particularly [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat) to format the number of days to a string like “in 2 days” or “yesterday”. I'm calculating the number of days between `now` and the assumed deadline, which is set to midnight on February 9 in Pacific time.

```js
const deadline = new Date(1675929600 * 1000); // Feb 9 midnight PST
const now = new Date();

// Calculate millisecond difference between the dates
const diffMs = deadline.getTime() - now.getTime();
// Round the difference to number of days
const diffDays = Math.round(diffMs / (1000 * 3600 * 24));

const rtf = new Intl.RelativeTimeFormat("en", {
  localeMatcher: "best fit",
  numeric: "auto",
  style: "long",
});

// 3 → "in 3 days"
// 0 → "today"
// -1 → "yesterday" etc.
const daysRelative = rtf.format(diffDays, "days");

return diffDays > 0
  ? `The deadline is ${daysRelative}`
  : `The deadline was ${daysRelative}`;
```

While the manipulation with dates is still painful, Intl APIs simplify at least formatting. I'm looking forward to the stable support for [Temporal API](https://tc39.es/proposal-temporal/docs/).

## What's next

My hope for the [Is Twitter API Free?](https://istwitterapifree.com/) site is that it becomes irrelevant in a few weeks. I might add some recommendations for developers who stumble upon the site, like resources for building ActivityPub bots or scraping Twitter's private API. No matter whether Twitter implements the API paywall in the end, or retracts the plan, it has already lost any remaining credibility as a platform for developers. It's time to move on.

Meanwhile, keep checking [the site](https://istwitterapifree.com/), follow the [Twitter bot](https://twitter.com/IsTwApiFree) or the [Mastodon bot](https://masto.ai/@istwitterapifree), and check the [site's source][source].

[announcement]: https://twitter.com/TwitterDev/status/1621026986784337922
[source]: https://github.com/jnv/istwitterapifree.com