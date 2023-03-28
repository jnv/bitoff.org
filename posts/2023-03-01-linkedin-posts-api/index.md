---
title: "LinkedIn's New Posts API: The Good, The Bad, and The Ugly"
description: ""
---

Last summer LinkedIn [announced new API versioning][li-versioning-announcement] and plans to migrate existing API endpoints to the new versioning scheme along with some other improvements. The first set of endpoints to be migrated by LinkedIn were [Posts API][posts-api], responsible for working with users' and business profiles' posts.

There was also a deadline: by February 2023, existing API users must migrate to the new Posts API and the old endpoints will stop functioning. That gave integration partners around 8 months for migration, but apparently that was not sufficient. So on the last day of February LinkedIn announced deadline extension to TODO.

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

However, it's not clear to me how exactly the deprecations will be handled, which I [address below]().

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

Finally, some changes are painful

### Scrape it yourself, will you?

### The migration guide is somewhat useless

### Not-so-clear deprecation strategy

[li-versioning-announcement]:
[posts-api]:
[sf-linkedin]:
[projections]: https://learn.microsoft.com/en-us/linkedin/shared/api-guide/concepts/projections
[ugcPosts]:
[versioning]: https://learn.microsoft.com/en-us/linkedin/marketing/versioning?view=li-lms-2023-03
[semver]:
