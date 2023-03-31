---
title: "LinkedIn's New Posts API: The Good, The Bad, and The Ugly"
description: ""
syntaxHighlighting: true
---

Last summer LinkedIn [announced new API versioning][li-versioning-announcement] and plans to migrate existing API endpoints to the new versioning scheme along with some other improvements. The first set of endpoints to be migrated by LinkedIn were [Posts API][posts-api], responsible for working with users' and business profiles' posts.

There was also a deadline: by February 2023, existing API users must migrate to the new Posts API and the old endpoints will stop functioning. That gave integration partners around 8 months for migration, but apparently that was not sufficient. So on the last day of February LinkedIn announced deadline extension to June 30.

Since I've migrated [LinkedIn's integration through Superface][sf-linkedin], I wrote down a few notes about the overall experience and frustrations with LinkedIn's new API and this particular deprecation.

## The Good Parts

### The API is better

I used to show LinkedIn API as an example of poor API design. There were three endpoints for handling users' and organizations' posts (UGC Posts, Shares, and Posts API which was in beta for a long time), with seemingly overlapping features.
With [weird, ad-hoc syntax](https://mastodon.social/@jnv/107842987885512426) for [field projections][projections] and [annoyingly long property names](https://github.com/superfaceai/station/blob/9d2a052f1224b6076af78ff29bdb92dbbdf72eae/grid/social-media/posts/maps/linkedin.suma#L64-L65), it wasn't the most pleasant API to work with.

I'll have to find another poorly designed API now because the new Posts API is definitely an overall improvement. Deeply nested structures with confusing properties and arbitrary nesting of arrays – it's all gone.

To illustrate the difference, here is the same post as represented by the legacy [ugcPosts API][ugcPosts] and the new versioned Posts API:

<details>
<summary>Post from ugcPosts API (legacy)</summary>

```json
{
  "lifecycleState": "PUBLISHED",
  "specificContent": {
    "com.linkedin.ugc.ShareContent": {
      "shareCommentary": {
        "inferredLocale": "en_US",
        "attributes": [],
        "text": "Don't forget the image."
      },
      "media": [
        {
          "description": {
            "attributes": [],
            "text": "Image"
          },
          "media": "urn:li:digitalmediaAsset:D4E10AQE71V5w_-aalA",
          "thumbnails": [],
          "overlayMetadata": {
            "tapTargets": [],
            "stickers": [],
            "overlayTexts": []
          },
          "status": "READY"
        }
      ],
      "shareFeatures": {
        "hashtags": []
      },
      "shareMediaCategory": "IMAGE"
    }
  },
  "visibility": {
    "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
  },
  "created": {
    "actor": "urn:li:person:bDTsVFtMTq",
    "time": 1679663763610
  },
  "author": "urn:li:organization:2414183",
  "clientApplication": "urn:li:developerApplication:208506072",
  "versionTag": "0",
  "id": "urn:li:share:7045020441609936898",
  "firstPublishedAt": 1679663764088,
  "lastModified": {
    "actor": "urn:li:csUser:7",
    "time": 1679663764133
  },
  "distribution": {
    "externalDistributionChannels": [],
    "distributedViaFollowFeed": true,
    "feedDistribution": "MAIN_FEED"
  },
  "contentCertificationRecord": "{\"originCountryCode\":\"nl\",\"modifiedAt\":1679663763588,\"spamRestriction\":{\"classifications\":[],\"contentQualityClassifications\":[],\"systemName\":\"MACHINE_SYNC\",\"lowQuality\":false,\"contentClassificationTrackingId\":\"F00EA9A4CF8AA4C780241D4CE87D5E87\",\"contentRelevanceClassifications\":[],\"spam\":false},\"contentHash\":{\"extractedContentMd5Hash\":\"7871A7EF3ADBC18955073E68D2203F27\",\"lastModifiedAt\":1679663763587}}"
}
```

</details>

<details>
<summary>Post from the Posts API (new, versioned)</summary>

```json
{
  "isReshareDisabledByAuthor": false,
  "createdAt": 1679663763610,
  "lifecycleState": "PUBLISHED",
  "lastModifiedAt": 1679663764133,
  "visibility": "PUBLIC",
  "publishedAt": 1679663764088,
  "author": "urn:li:organization:2414183",
  "id": "urn:li:share:7045020441609936898",
  "distribution": {
    "feedDistribution": "MAIN_FEED",
    "thirdPartyDistributionChannels": []
  },
  "content": {
    "media": {
      "altText": "Image",
      "id": "urn:li:image:D4E10AQE71V5w_-aalA"
    }
  },
  "commentary": "Don't forget the image.",
  "lifecycleStateInfo": {
    "isEditedByAuthor": false
  }
}
```

</details>

### Clear versioning and deprecations policy

The legacy APIs were all “version 2” as to be distinguished from even older “[version 1 endpoints](https://web.archive.org/web/20180821140959/https://developer.linkedin.com/docs/rest-api)”. However, there was no further granularity in these versions. It seems to me that new features were introduced on new endpoints, which is probably why they ended up with three different endpoints for posts.

For the versioned API “reboot” LinkedIn chose a [calendar-based versioning scheme][versioning], with each version identified by an year and a month (e.g., `202303`) and no guarantees about breaking changes between versions (as opposed to [semantic versioning][semver]). Per documentation, each API version is supported for one year and specifying the version is mandatory for each call. Therefore one can quickly see how much their integration code is behind the current versions.

I think calendar-based versioning is a right call for quickly evolving APIs and it seems to be ever more popular choice. GitHub [announced a similar versioning scheme](https://github.blog/2022-11-28-to-infinity-and-beyond-enabling-the-future-of-githubs-rest-api-with-api-versioning/) in November. And combined with a stable support window (something what [Facebook is doing with Graph API]()), it provides a predictability and stable pace for API consumers.

However, it's not clear to me how exactly the deprecations will be handled, which I [address below](#not-so-clear-deprecation-strategy)).

### Communication to integration partners

Maybe my expectations about LinkedIn API were too low, but I was pleasantly surprised how well the communication about deprecations was handled. There was a relatively long transition period of eight months (now extended), and all consecutive email communication and documentation pages contained a big reminder about the deprecation.

Still, it's pretty usual the emails go amiss and no one checks the API documentation. The integration is working now, so why'd I need to check the docs? But LinkedIn did use the communication channels they have with partners to get the message across.

### Responsive support

Even more important was responsive support. While previously LinkedIn recommended asking questions using [linkedin-api tag on Stack Overflow](https://stackoverflow.com/questions/tagged/linkedin-api) (which usually went unanswered), now they provide a support portal. I've submitted a ticket, and to my surprise, I've received a helpful answer from support representative in less than 24 hours. While I'd prefer a public forum where I could search for existing solutions first, having a working support channel is an improvement in itself.

## The Bad Parts

While LinkedIn got a lot of things right, there are a few things which bug me.

### The clean shut-off

At this point it's clear that the 8 months transition period was either too optimistic, or planned “soft deadline” from the start. API deprecations are constant pain, since you need to wait on your integration partners to do the changes. If your partners are paying for your product, you don't want to pull the rug from them. But if your partners are big enterprises, you can't expect them to react quickly to your changes. But I think LinkedIn could have done a few things to hasten the migration.

At this point, it's not clear what actually _happens_ when LinkedIn shuts off the deprecated endpoints. Will they return a HTTP status error `410 Gone` with a JSON message explaining the situation? Will they return a proxy error as HTML page? Or will they redirect client to a Rick Roll? (Probably not the last option.)

One way to test the migration readiness is to schedule planned “brownouts”. For example, GitHub uses this strategy for API deprecations (see [an example with authentication changes](https://github.blog/changelog/2021-05-04-brownout-notice-api-authentication-via-query-parameters-and-the-oauth-applications-api-for-12-hours/)). GitHub schedules multiple 12 to 48 hour outages over the months prior to the deprecation, to simulate the final removal of the API. This is great way to check whether the migration is complete as typically there's _that one more call_ no one migrated yet.

I'm not sure if this is acceptable strategy for LinkedIn, both from technical and business stand point. But it seems more sensible to me than just to pull the plug on the final day.

### Removed features in favor of simplicity

I mentioned that the new API removed [field projections][projections] with weird and poorly documented syntax. The downside is that there's no equivalent feature in the new API.

My typical use case for projections was to grab images and videos in posts with a single API request. Now to achieve the same functionality I need to collect media IDs from posts and resolve them with separate API calls. I believe this leads to much simpler implementation on LinkedIn's side, and it can encourage clients to cache referenced media, but it still shifts some complexity on the client's side.

### Not-so-opaque object IDs

And speaking of media resolution, here's another catch.

Take a look at these objects from Posts API response:

```json
[
  {
    "id": "urn:li:ugcPost:7044823133844885504",
    "commentary": "Post A",
    "content": {
      "media": {
        "title": "Some title",
        "id": "urn:li:video:C5605AQHzRSAmLcHkTA"
      }
    }
  },
  {
    "id": "urn:li:share:7046413622230614016",
    "commentary": "Post B",
    "content": {
      "media": {
        "id": "urn:li:image:D5622AQHy2GLswHBoSg"
      }
    }
  }
]
```

Now, can you tell which post contains a video and which contains image?

Obviously, you can tell by the `id` property (`urn:li:video` vs. `urn:li:image`) but you _shouldn't have to_. IDs should be opaque values.

LinkedIn has separate endpoints to resolve [images](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/community-management/shares/images-api?view=li-lms-2023-03#get-a-single-image) and [videos](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/community-management/shares/videos-api?view=li-lms-2023-03#get-a-video), so you need to do string match the ID to figure out which endpoint to call.

Here are a few approaches how this could be improved:

- Provide a new endpoint for resolving any media, where I can pass both video and image IDs (e.g., `/rest/videos?ids=List(urn:li:video:...,urn:li:image:...)`).
- Add a new property identifying the type of media:
  ```json
  {
    "id": "urn:li:share:7046413622230614016",
    "commentary": "Post B",
    "content": {
      "media": {
        "type": "image",
        "id": "urn:li:image:D5622AQHy2GLswHBoSg"
      }
    }
  }
  ```
- Or, in an actual RESTful manner, provide me with a link to the resource (although it's not consistent for this API):
  ```json
  {
    "id": "urn:li:share:7046413622230614016",
    "commentary": "Post B",
    "content": {
      "media": {
        "self": "https://api.linkedin.com/rest/images/urn:li:image:D5622AQHy2GLswHBoSg",
        "id": "urn:li:image:D5622AQHy2GLswHBoSg"
      }
    }
  }
  ```

## The Ugly Parts

Some API changes are painful and ugly, but they have their reasons and maybe they'll be resolved in time.

### Scrape it yourself, will you?

Most social media, like Facebook or Twitter, automatically generate a “preview card” from a link contained in a post. There are some slight differences when publishing with API, for example Facebook [accepts custom title, description, and thumbnail](https://developers.facebook.com/docs/graph-api/reference/v16.0/page/feed#custom-image) for the preview card – as long as the link points to a domain with verified ownership. Twitter on the other doesn't allow any preview customization during publishing.

LinkedIn used to automatically generate a link preview when a post was published through the legacy `ugcPosts`, but with posts API this functionality [has been removed](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/community-management/shares/posts-api?view=li-lms-2023-03&tabs=http#article-post-creation-sample-request):

> Posts API does not support URL scraping for article post creation as it introduces level of unpredictability in how a post is going to look when API partners create it. Instead, API partners need to set article fields such as thumbnail, title and description within the post when creating an article post.

I agree with this approach in principle. I've experienced first-hand customer complaints about articles with missing or incorrect thumbnails, which were usually caused by a disparity between the preview generated by a 3rd-party application, and LinkedIn's preview scraper. Furthermore LinkedIn's scraped previews were impossible to refresh, so sometimes I had to instruct customers to add dummy query strings to the links they share just to get a correct preview.[^fb-debugger]

[^fb-debugger]: Unlike Facebook which provides a [convenient tool](https://developers.facebook.com/tools/debug/) for debugging and refreshing link previews.

So putting the responsibility for generating a link preview fully on API clients' side makes sense. However, it adds an extra complexity to the publishing process.

Sure, you could just willy-nilly scrape arbitrary pages you want to publish. But sometimes that won't work. I've dealt with websites whose owners were paranoid about _any_ scraping, and blocked any requests coming from unknown bots. In the end they allowlisted our link preview scraper, but it took some negotiation.

LinkedIn could simplify this process, and help both developers and paranoid site owners by providing a separate API endpoint for scraping URL previews. Similar to Facebook which [already provides this feature](https://developers.facebook.com/docs/graph-api/reference/v16.0/url) (and by providing the `scrape=true` query parameter you can refresh the cached data).

### The migration guide is somewhat useless

LinkedIn provides convenient [migration guides](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/migrations) for individual APIs.
Unfortunately the [Content APIs migration guide](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/community-management/contentapi-migration-guide) left me struggling with the new API. Sure, it how individual fields in schemas were renamed, simplified, or removed (although a direct JSON to JSON comparison would be probably more descriptive) and it briefly describes how the workflow changed. But it's still too brief.

If you need me to change the workflow, show me step by step how it differs from the old one. Even better, show me some code. The guide also doesn't mention anything about the removal of field projections, but maybe the usage of this feature was way too marginal.

### Not-so-clear deprecation strategy

The [versioning guide mentions](https://learn.microsoft.com/en-us/linkedin/marketing/versioning?view=li-lms-2023-03#keep-up-with-us) that LinkedIn expects their partners to “keep with them”:

> LinkedIn expects that our LinkedIn Marketing API Program API partners work to deliver the latest and most valuable experiences to our customers within a reasonable time of their availability. _As a result, we will sunset our API versions as early as one (1) year after release._[^emph]

[^emph]: Emphasis mine.

Since no versioned API reached its end-of-life yet, I have yet to see what “sunsetting an API version” means. I think it could be one of these options:

1. The requests start immediately return an error on the first day of 13th month. (But what error? What status code?)
2. The requests will probably work for some time, but can break at any time – it's your risk to call an outdated API.
3. We will automatically redirect your outdated calls to a newer API version and it will work as long as we don't introduce any breaking changes to the request schema.

The third option is something what Facebook does. I occasionally run into code using 5+ years old API versions,[^passport] and it still works. I suspect LinkedIn could go with the first or second option. If this will be the case, I hope they'll provide developers with an early warning that their integrations are about to break. In other words:

- Provide developers with API versions usage in app analytics.
- Describe in gory details what exactly happens after the API reaches the end-of-life.

## Conclusion

So that's probably way too much words about the new LinkedIn API. Despite my criticism, I think it's still an overall improvement and I'm glad LinkedIn takes the developer experience seriously, unlike other social media ([ahem](/is-twitter-api-free/)).

[^passport]: In [passport-facebook](https://github.com/jaredhanson/passport-facebook/blob/22aaab2a5c8b036e68287aa32ebe8f2bb68afb5c/lib/strategy.js#L50) for example.

[li-versioning-announcement]: https://www.linkedin.com/developers/news/featured-updates/versioning-content-launch
[posts-api]: https://learn.microsoft.com/en-us/linkedin/marketing/integrations/community-management/shares/posts-api
[sf-linkedin]: https://superface.ai/social-media/publish-post?provider=linkedin
[projections]: https://learn.microsoft.com/en-us/linkedin/shared/api-guide/concepts/projections
[ugcPosts]: https://learn.microsoft.com/en-us/linkedin/marketing/integrations/community-management/shares/ugc-post-api
[versioning]: https://learn.microsoft.com/en-us/linkedin/marketing/versioning
[semver]: https://semver.org/
