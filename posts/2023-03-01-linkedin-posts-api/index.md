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
With [weird, ad-hoc syntax](https://mastodon.social/@jnv/107842987885512426) for fields projections and [annoyingly long property names](https://github.com/superfaceai/station/blob/9d2a052f1224b6076af78ff29bdb92dbbdf72eae/grid/social-media/posts/maps/linkedin.suma#L64-L65), it wasn't the most pleasant API to work with.

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

The legacy APIs were all “version 2” as to be distinguished for even older “[version 1 endpoints](https://web.archive.org/web/20180821140959/https://developer.linkedin.com/docs/rest-api)”. However, there was no further granularity in these versions. It seems to me that new features were rather introduced on new endpoints, which is probably why they ended up with three different endpoints for the same concept of posts.

For the versioned API “reboot” LinkedIn chose a [calendar-based versioning][versioning], with each version identified by an year and month (e.g., `202303`) and no guarantees about breaking changes between versions (as opposed to [semantic versioning][semver]). Per documentation, each API version is supported for one year and specifying the version is mandatory for each call. Therefore one can quickly see how much their integration code is behind the current versions.

Calendar-based versioning seems to . GitHub [announced a similar versioning scheme](https://github.blog/2022-11-28-to-infinity-and-beyond-enabling-the-future-of-githubs-rest-api-with-api-versioning/) last year.

### Communication to integration partners

### Responsive support

## The Bad Parts

### The clean shut-off

### Not-so-opaque object IDs

### The cost of simplicity: removed features

## The Ugly Parts

### Scrape it yourself, will you?

### The migration guide is somewhat useless

### Not-so-clear deprecation

[li-versioning-announcement]:
[posts-api]:
[sf-linkedin]:
[ugcPosts]:
[versioning]: https://learn.microsoft.com/en-us/linkedin/marketing/versioning?view=li-lms-2023-03
[semver]:
