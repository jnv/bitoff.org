---
title: 'Get started with Instagram API: The Setup'
description: 'First dive into Instagram Graph API: How to create a business account and a Facebook app.'
---

{% callout "Author's note" %}
This article was originally [published](https://web.archive.org/web/20230521175122/https://superface.ai/blog/instagram-setup) on [Superface](https://superface.ai/) blog before the pivot to agentic tooling platform and is republished here with company's permission.

I am no longer working with Instagram API and the content of this article may be outdated.
{% endcallout %}

Instagram Graph API is Facebook's official way to access Instagram from your application. The API allows you to manage your account, publish content, and access some public data from Instagram, but only a subset of features is available compared to Instagram's official applications.

That's no coincidence. Facebook severely [restricted its APIs](https://about.fb.com/news/2018/04/restricting-data-access/) after the Cambridge Analytica scandal. Instagram Graph API was designed with these privacy concerns in mind, [replacing former Instagram API](https://developers.facebook.com/blog/post/2020/03/10/final-reminder-Instagram-legacy-api-platform-disabled-mar-31/) which was much more open.

Some design decisions and limitations around Instagram Graph API are so confusing, developers often ask how to perform even basic tasks. For example, how to get access to the API for their account, or figure out the correct account ID. I've answered numerous questions like this, which led me to start this series.

This is a first dive into Instagram Graph API, covering the initial prerequisites: creating an Instagram business account and setting up a Facebook app. In the next article I will cover how to get an access token and basic information about Instagram account, including the business account ID required for further interactions. In future posts, I will cover authorization in Node.js, content publishing, and retrieval of posts and comments.

## Pair Instagram account with Facebook Page

Instagram Graph API can be used only by “[Instagram Professional accounts](https://help.instagram.com/138925576505882)” – this includes Business accounts (intended for companies), and Creator accounts (intended for individuals, like influencers). The good news is you don't need to pay anything for a Professional account.

Before you proceed, you need three things:

- A Facebook account (can be your personal)
- A Facebook page – ideally a dedicated testing page, so [create one now](https://www.facebook.com/pages/create/)
- An Instagram account – ideally a dedicated account for testing ([sign up for one](https://www.instagram.com/accounts/emailsignup/))

For development purposes, we will need to turn the [Instagram account into a Business account](https://help.instagram.com/502981923235522) and pair it with the Facebook page.

Once you log into your Instagram account, go to account settings. Here, click “Switch to professional account”.

{% figure "01.png", "Instagram account settings with “Switch to professional account” under the left menu" %}{% endfigure %}

You have two options: Creator and Business. Select Business, pick a category (can be anything) and skip the step to add contact information.

{% figure "02.png", "Selection of Professional account type with Business selected" %}{% endfigure %}

Next, on the Facebook side, go to your Facebook page's settings. On “Professional dashboard” select “Linked Accounts” and you should see a button to “Connect account” from Instagram.

{% figure "03.png", "Dashboard with Facebook page settings with Linked Accounts highlighted in left-side navigation" %}{% endfigure %}

{% figure "04.png", "Linked account page with Connect account highlighted" %}{% endfigure %}

This will show you a pop-up to enter Instagram credentials, and once you log in, you should see a success message.

{% figure "05.png", "Success message: Instagram connected" %}{% endfigure %}

## Create a Facebook application

Next, we will need to create a Facebook app. Visit [My apps](https://developers.facebook.com/apps/) on ~~Facebook~~ Meta for Developers site and click “Create App”. This will take you to app type selection.

{% figure "06.png", "App type selection with the first option, Business, selected" %}{% endfigure %}

Select “Business”, enter name and contact e-mail, and finally, you should see various products to add to your app. Find Instagram Graph API, click “Set up”, and that's it for now.

{% figure "07.png", "Add products to app screen with Instagram Graph API highlighted" %}{% endfigure %}

## Resources

Facebook is constantly changing their products, so it's possible that by the time you read this article, some flows are entirely different. You can refer to the following official resources, although in some cases these may also be outdated.

- [Set Up a Business Account on Instagram](https://help.instagram.com/502981923235522/)
- [Add or Change the Facebook Page Connected to Your Instagram Business Account](https://help.instagram.com/570895513091465/) – as of September 2022 this guide seems to be outdated; it describes the possibility to connect a Facebook page from Instagram side, but I didn't find the described functionality in Instagram's web interface.
- [Instagram Graph API: Getting Started](https://developers.facebook.com/docs/instagram-api/getting-started)
