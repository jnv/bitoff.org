---
title: 'Twitter API Changes: The missing FAQ for Free & Basic access'
description: 'Answers to common confusions about the new free and paid plans for Twitter API.'
email: false
discussion:
  Dev.to: https://dev.to/superface/twitter-api-changes-the-missing-faq-for-free-basic-access-2lil
---

{% callout "Author's note" %}
This article was originally [published](https://web.archive.org/web/20230407124115/https://superface.ai/blog/twitter-api-new-plans) on [Superface](https://superface.ai/) blog before the pivot to agentic tooling platform and is republished here with company's permission.

I am no longer working with Twitter (X) API and the content of this article is outdated.
{% endcallout %}

The new Twitter API access tiers [were finally announced][announcement]. Unfortunately, some important details were left out from the announcement, leaving many developers confused and stressed out as the [deprecation deadline](https://twitter.com/TwitterDev/status/https://web.archive.org/web/20230424153629/https://twitter.com/TwitterDev/status/1641222786894135296) is getting closer.

At Superface, we maintain social media integrations, including Twitter’s, and we’ve [built an authorization library for Twitter API][twitter-oauth2-passport]], so we’ve been closely observing the recent developments around Twitter API. (I’ve even [made a site for that][is-twitter-api-free].)

In this article, I have collected observations and recommendations about Twitter’s new API. In summary:

- If possible, [don’t migrate to the new plans yet](#should-i-migrate-to-the-new-plans-now)
- [You can use Twitter Login for free](#do-i-need-to-pay-so-the-users-of-my-app-can-log-in-with-twitter) both with OAuth 2.0 and OAuth 1.0a
- You need to [migrate your app to API v2](#do-i-need-to-migrate-to-the-twitter-api-v2)
- You can [post tweets with media](#can-i-post-tweets-with-media-images-gifs-videos)
- You can still [embed tweets](#can-i-embed-tweets)
- If you need to do [anything else than login users or post tweets](#can-i-only-post-tweets-with-free-access), you'll have to pay a monthly fee (maybe even [a large sum](#i-need-to-read-more-than-10000-tweets-per-month-what-should-i-do))
- [Don’t rely on official support](#where-can-i-get-help-with-twitter-api)

Here’s a warning, though: Twitter is in constant flux, so any information in this article can become outdated at any time. I will do my best to keep it up to date – check the [changelog](#changelog) for updates to the article.

## What do we know from the announcement?

The changes were announced on the [Twitter Dev account][announcement] and the [community forums](https://web.archive.org/web/20230415020053/https://twittercommunity.com/t/announcing-new-access-tiers-for-the-twitter-api/188728). Here's what we can learn from these announcements:

- All existing API access tiers (Standard, Premium, Essential, and Elevated) are being replaced by the new Free and Basic tiers.
- Both tiers allow users to log in with Twitter, read the profile of an authorized user, and post tweets on behalf of users.
- Only the paid Basic tier provides read access to user profiles and tweets at a much lower rate than previous tiers (10,000 tweets per month, compared to 500,000 on Essential and 2 million on Elevated).
- The Basic tier costs $100 / month.
- The v1.1 API is being deprecated in favor of the v2 API (with an exception for media uploads, [see below](#can-i-post-tweets-with-media-images-gifs-videos)).
- The previous plans and legacy API will be deprecated by April 29th, 2023 _at the latest_ – so technically the changes can happen any time sooner.
- The [Twitter Ads API](https://web.archive.org/web/20230409230353/https://developer.twitter.com/en/docs/twitter-ads-api) is unaffected by these changes.
- There are no special access plans for researchers and academics at this time.

## Do I need to pay, so the users of my app can log in with Twitter?

No, Twitter Login is available on the Free plan.

You can also read the information about a logged-in user through the [`GET /2/users/me`](https://web.archive.org/web/20230330040655/https://developer.twitter.com/en/docs/twitter-api/users/lookup/api-reference/get-users-me) endpoint. It is rate limited to 25 requests per 24 hours _per user_, so just make sure your integration code doesn’t read this endpoint too frequently (or fails gracefully when you hit the limit).

During my testing, I also frequently encountered a “Something went wrong” error on Twitter’s authorization page.

{% figure "error.png", "Screenshot of error: Something went wrong. You weren't able to give access to the App. Go back and try logging in again." %}{% endfigure %}

After a few retries, the authorization flow was successful. If your users encounter a similar issue, instruct them to just retry logging in a few times.

## Do I need to use OAuth 2.0 for login?

No, both [OAuth 1.0a](https://web.archive.org/web/20230323211546/https://developer.twitter.com/en/docs/authentication/oauth-1-0a) and [OAuth 2.0](https://web.archive.org/web/20230212161400/https://developer.twitter.com/en/docs/authentication/oauth-2-0) (with app-only and user contexts) are supported on both access tiers.

You must use OAuth 1.0a if you want to publish tweets with images or videos. On the other hand, newer API features, like [Bookmarks](https://web.archive.org/web/20230213013529/https://developer.twitter.com/en/docs/twitter-api/tweets/bookmarks/introduction) or [Spaces](https://web.archive.org/web/20230212020942/https://developer.twitter.com/en/docs/twitter-api/spaces/overview), are available only with OAuth 2.0. Check the [Twitter v2 Authentication Mapping](https://web.archive.org/web/20230212021524/https://developer.twitter.com/en/docs/authentication/guides/v2-authentication-mapping) to see what features are supported in respective authentication contexts.

## Do I need to migrate to the Twitter API v2?

Yes, unless you're planning to migrate to the Enterprise API (starting at $42,000/month). According to the announcement, both Standard v1.1 and Premium v1.1 endpoints will be deprecated. The Basic tier is [described](https://web.archive.org/web/20230412103158/https://developer.twitter.com/en#:~:text=Rate%20limited%20access%20to%20suite%20of%20v2%20endpoints) as:

> Rate limited access to suite of v2 endpoints

The only exceptions are media upload endpoints, which are not available in the v2 API.

However, the official [Twitter Enterprise API Interest form](https://docs.google.com/forms/d/e/1FAIpQLScO3bczKWO2jFHyVZJUSEGfdyfFaqt2MvmOfl_aJp0KxMqtDA/viewform) (yes, that's a Google Form) states that Enterprise API “enables continued access to v1.1, v2 and additional Enterprise APIs.” So if you're planning to pay for the Enterprise access, you can keep on using the v1.1 API.

Check the [Twitter’s migration guides](https://web.archive.org/web/20230414183837/https://developer.twitter.com/en/docs/twitter-api/migrate/overview) on how to migrate from the v1.1 API to v2.

## Can I post tweets with media (images, GIFs, videos)?

Yes, that’s possible even on the Free plan, but you need to combine v2 API endpoints with v1.1 media upload endpoints. You must use OAuth 1.0a with read+write access, as media upload endpoints don’t support OAuth 2.0 access tokens.

Follow these steps to post a tweet with media attachments:

1. Upload media using the [Upload media endpoints](https://web.archive.org/web/20230321085425/https://developer.twitter.com/en/docs/twitter-api/v1/media/upload-media/overview): [`POST media/upload`](https://web.archive.org/web/20230321112506/https://developer.twitter.com/en/docs/twitter-api/v1/media/upload-media/api-reference/post-media-upload) for images or [chunked upload endpoints](https://web.archive.org/web/20230321113625/https://developer.twitter.com/en/docs/twitter-api/v1/media/upload-media/api-reference/post-media-upload-init) for videos.
2. You will receive `media_id` for the uploaded objects.
3. Post a tweet using the [`POST /2/tweets`](https://web.archive.org/web/20230226175534/https://developer.twitter.com/en/docs/twitter-api/tweets/manage-tweets/api-reference/post-tweets) endpoint and reference the uploaded media objects in a `media` property like this:

   ```json
   {
     "text": "Tweet with media",
     "media": { "media_ids": ["1455952740635586573"] }
   }
   ```

## Can I only post tweets with Free access?

Mostly, yes. It’s possible only to [manage a user’s tweets](https://web.archive.org/web/20230305235248/https://developer.twitter.com/en/docs/twitter-api/tweets/manage-tweets/introduction) (i.e., create, delete), upload media, and [look up information about the authorized user](https://web.archive.org/web/20230212024740/https://developer.twitter.com/en/docs/twitter-api/users/lookup/api-reference/get-users-me).

If you hit a paid endpoint, you will get a non-descriptive error message like this:

```json
{
  "title": "Forbidden",
  "type": "about:blank",
  "status": 403,
  "detail": "Forbidden"
}
```

Notably, you can’t read [a user’s tweets timeline](https://web.archive.org/web/20230212034612/https://developer.twitter.com/en/docs/twitter-api/tweets/timelines/api-reference/get-users-id-tweets) or the [mentions timeline](https://web.archive.org/web/20230212053631/https://developer.twitter.com/en/docs/twitter-api/tweets/timelines/api-reference/get-users-id-mentions). So if you are building an application that tracks users’ mentions (e.g., social media care or analytics, or a bot that replies to tweets), you will have to pay for Basic access.

## I need to read more than 10,000 tweets per month, what should I do?

The next access tier after the Basic is Enterprise, which starts at $42,000 per month. You can apply through the [Twitter Developer Portal](https://web.archive.org/web/20230412103158/https://developer.twitter.com/en#:~:text=Subscribe%20now-,Enterprise,-For%20businesses%20and).

No doubt there are other ways to get the data for cheaper or for free, but that’s outside the scope of this article.

## Can I embed tweets?

Yes, [Twitter for Websites](https://web.archive.org/web/20230212054800/https://developer.twitter.com/en/docs/twitter-for-websites) features remain unaffected by these changes, including [Embedded Tweets](https://web.archive.org/web/20230212054800/https://developer.twitter.com/en/docs/twitter-for-websites/embedded-tweets/overview).

While there are [reports of broken embeds][theverge], they are usually caused by suspended access to the Twitter API. For example, [Substack reported issues with embeds](https://web.archive.org/web/20230410150303/https://twitter.com/SubstackInc/status/1644059805315747844), however, they use custom embeds unrelated to the official widgets. If you embed tweets on your own by fetching them from API, you will need to pay at least for the basic plan.

## Should I migrate to the new plans now?

Yes, but consider setting up a separate developer account with either Free or Basic access and test your application there first, before migrating your main account.

If you currently have Essential or Elevated access and Twitter still didn't suspend your application, consider stalling the migration until it's forced by Twitter. On the community forums, some users [report losing access](https://archive.is/2sQty) after purchasing the Basic access, probably because they were over the 10,000 tweets/month limit at the time of the purchase. Other users report [issues with rate limits](https://archive.is/NZ37t). These bugs seem to be symptoms of rushed development. We can hope that they will be fixed before the April 29th deadline.

Twitter already suspended many applications and bots, including those which'd likely fit into the Free plan. There doesn't seem to be any particular pattern, although I suspect either popular applications or those using the v1.1 API are being targeted first.

Furthermore, on April 20 Twitter suddenly [shut down Premium v1.1 API](https://web.archive.org/web/20230421003712/https://twitter.com/TwitterDev/status/1649191520250245121) without any prior announcement.

## Where can I get help with Twitter API?

If you run into issues with migration to the new access plans, don’t expect any help or refund from Twitter. As Ryan Barrett on the Twitter Developers forum points out, you can [treat the Twitter API as effectively unmaintained](https://web.archive.org/web/20230331000408/https://twittercommunity.com/t/the-twitter-api-is-now-effectively-unmaintained/186011).

Still, the [Twitter Developers forum](https://twittercommunity.com/) is probably the best place where you can get help from community volunteers and a good place to search for known issues.

## Changelog

Here I'm tracking major updates to the article.

- April 7: First published version.
- April 11: Minor grammar corrections.
- April 21: Changed recommendation around migration, confirmed Enterprise API pricing, updated information about API v1.1 availability, Premium API deprecation, and suspension of existing apps.

[announcement]: https://web.archive.org/web/20230406185829/https://twitter.com/TwitterDev/status/1641222782594990080
[theverge]: https://www.theverge.com/2023/4/6/23673043/twitter-substack-embeds-bots-tools-api

[is-twitter-api-free]: {{ "../2023-02-08-is-twitter-api-free/index.md" | inputPathToUrl }}
[twitter-oauth2-passport]]: https://web.archive.org/web/20230329194459/https://superface.ai/blog/twitter-oauth2-passport
