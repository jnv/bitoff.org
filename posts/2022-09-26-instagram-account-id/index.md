---
title: 'Instagram API: Find the right account ID'
description: 'How to get account details from Instagram Graph API'
email: false
discussion:
  Dev.to: https://dev.to/superface/instagram-api-find-the-right-account-id-4k3j
  Medium: https://medium.com/superface/instagram-api-find-the-right-account-id-1ec63953de5a
---

{% callout "Author's note" %}
This article was originally [published](https://web.archive.org/web/20230329183703/https://superface.ai/blog/instagram-account-id) on [Superface](https://superface.ai/) blog before the pivot to agentic tooling platform and is republished here with company's permission.

I am no longer working with Instagram API and the content of this article may be outdated.
{% endcallout %}

To manage your Instagram account through an API, you need two things: a user access token and a business account ID. Getting an access token is easy, but figuring out the account ID takes a few steps and sometimes causes a confusion.

**Prerequisites:** This tutorial assumes you have an Instagram business account connected with a Facebook page and Facebook application with Instagram Graph API enabled. Check my previous article on [how to set up a test account for Instagram API]({{ "../2022-09-23-instagram-setup/index.md" | inputPathToUrl }}).

If you are currently troubleshooting requests to Instagram's API and can't wrap your head around their IDs, skip right away to [common ID confusions](#common-id-confusions).

## Get an access token

For the following steps, I will use [Graph API Explorer](https://developers.facebook.com/tools/explorer/). This is a useful tool for trying out Facebook's APIs and also to obtain access tokens for authorized API access.

In the right sidebar, select the previously created application under “Meta App”. Make sure “User Token” is selected and add the following permissions: `instagram_basic`, `pages_show_list`, and `instagram_content_publish` (this will come handy in later tutorials).

{% figure "10.png", "Detail of Graph API Explorer sidebar with selected Meta App, User Token, and required permissions" %}{% endfigure %}

Finally, click “Generate Access Token”. Facebook will display a pop-up with prompts to authorize access to your Instagram and Facebook pages. Make sure to select **both** your testing Instagram account and the associated Facebook page.

{% figure "11.png", "Facebook authorization dialog with Instagram account selected" %}{% endfigure %}

## Find your Instagram account ID

If you authorized the application correctly, you should be able to list Facebook pages the application has access to.

Enter the following path to the Graph API Explorer: `me/accounts`. After submitting, you should see Facebook pages you gave your application access to.

{% figure "12.png", "Graph API Explorer with path set to me/accounts and authorized page in response, page's ID is highlighted." %}{% endfigure %}

Now, copy the value `id` of your page and enter the following path:

```
<page ID>?fields=instagram_business_account
```

In the response, you will see both the Facebook's page ID and the ID of your Instagram account. Copy the value of `id` under `instagram_business_account` – this ID is necessary for further interactions with your Instagram account via API.

{% figure "13.png", "Graph API Explorer with path set to Facebook page ID and fields set to instagram_business_account. In response, there is a nested field “id” under instagram_business_account object." %}{% endfigure %}

## Get account details

With this ID, we can retrieve basic information about our Instagram account, like its username, name, and profile picture. Try querying the following path with your Instagram business account ID:

```
<business account ID>?fields=id,name,username,profile_picture_url
```

{% figure "14.png", "Graph API Explorer with Instagram account details" %}{% endfigure %}

### All in single request

There is also an undocumented way to retrieve Instagram account details in a single request from `me/accounts`. This way, we can skip intermediary requests and retrieve authorized Instagram accounts directly:

```
me/accounts?fields=instagram_business_account{id,name,username,profile_picture_url}
```

{% figure "15.png", "Graph API Explorer with Instagram account details retrieved from me/accounts edge" %}{% endfigure %}

In Facebook's Graph API, it is possible to traverse some edges within a single request – this is what the curly braces in the `fields` query parameter are for. In other words, we are telling the API, “give me these fields for `instagram_business_account` edge under `me/accounts` edge”.

## Common ID confusions

A common source of mistakes when dealing with Graph API is use of an incorrect type ID. If the API doesn't behave like you expect, check if you have the right ID. In case of Instagram Graph API, we are dealing with the following IDs:

- Facebook Page ID – retrieved from `me/accounts` endpoint identifies [Page node](https://developers.facebook.com/docs/instagram-api/reference/page) and acts as an entry point to get an Instagram account associated with the Page.
- Instagram (Business) Account ID – retrieved from Page node under `instagram_business_account` edge. Documentation refers to it as [IG User node](https://developers.facebook.com/docs/instagram-api/reference/ig-user). It must be accessed with _a user_ access token.
- `ig_id` or Instagram User ID – this is an ID of the Instagram account from the legacy, deprecated API. It is intended for migration of applications using the pre-graph API, but it's not used anywhere else. It's also represented as a number, while Graph API IDs are strings.

## Get Instagram account easier way

{% callout "Author's note", 3 %}
Note that the following section is outdated. The code is provided for historical reference only.
{% endcallout %}

Picking a correct Instagram account is a pretty basic integration task, so we've built an easier way to do that. If you use Node.js, before you grab `fetch` and start building your custom abstraction, try OneSDK. We have an integration ready to [get a list of authorized Instagram accounts](https://web.archive.org/web/20231217140938/https://superface.ai/social-media/publishing-profiles?provider=instagram). And the same interface works also for Facebook, LinkedIn, Pinterest, and Twitter – but let's keep it for another time.

First, install OneSDK into your project:

```shell
npm i @superfaceai/one-sdk@2
```

And paste the following code into `profiles.js` file:

```js
const { SuperfaceClient } = require('@superfaceai/one-sdk');

// Replace the value with the token from Graph Explorer
const ACCESS_TOKEN = 'YOUR USER ACCESS TOKEN HERE';

const sdk = new SuperfaceClient();

async function getProfiles() {
  const sdkProfile = await sdk.getProfile(
    'social-media/publishing-profiles@1.0.1'
  );
  const result = await sdkProfile
    .getUseCase('GetProfilesForPublishing')
    .perform(
      {},
      { provider: 'instagram', parameters: { accessToken: ACCESS_TOKEN } }
    );

  try {
    return result.unwrap();
  } catch (error) {
    console.error(error);
  }
}

getProfiles().then((result) => {
  console.log(result.profiles);
});
```

Don't forget to insert your actual user access token as a value of the `ACCESS_TOKEN` variable. You can copy it from Graph API Explorer:

{% figure "16.png", "Graph API Explorer right sidebar with button “Copy to clipboard” next to the access token highlighted" %}{% endfigure %}

When you run this code, you will get an array with authorized accounts, their ID, username, and profile image:

```shell
$ node profiles.js
[
  {
    id: '17841455280630860',
    name: 'Dev Testing App IG Acct',
    username: 'dev_testing_app',
    imageUrl: 'https://scontent.fprg5-1.fna.fbcdn.net/...'
  }
]
```

The code behind the integration is [open-source](https://github.com/superfaceai/station/tree/aee145aae8626f8736d8b8bda55cc77187b9f852/grid/social-media/publishing-profiles/maps) and your application communicates with Instagram API directly without intermediary servers.
