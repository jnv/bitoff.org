---
title: 'Geocoding APIs compared: Pricing, free tiers & terms of use'
description: 'Pick the cheapest geocoding API provider for your project. An impartial comparison of pricing for HERE, Google Maps Platform, Azure Maps, OpenCage, TomTom Maps, LocationIQ, and Nominatim.'
email: false
---

{% callout "Author's note" %}
This article was originally [published](https://web.archive.org/web/20230810062017/https://superface.ai/blog/geocoding-apis-comparison-1) on [Superface](https://superface.ai/) blog before the pivot to agentic tooling platform and is republished here with company's permission.

I am no longer working with geocoding APIs and the content of this article may be outdated.
{% endcallout %}

Geocoding is the process of converting an address to geolocation coordinates (latitude and longitude). _Reverse_ geocoding is the opposite: assigning a street address to the given coordinates. Examples of geocoding include:

- Obvious ones, like finding a location on a map or displaying an address of a selected location.
- Visualization of customer data.
- Working with coordinates stored in photos.
- Local search, such as displaying events or restaurants in the user’s proximity or within a city radius.

How do you build this feature? The easiest way is to use a geocoding API, which often includes reverse geocoding and address data cleaning functions as well.

The good news is that there isn’t a shortage of geocoding API providers to choose from. The bad news is that you have to pick one. Which is why we’re here: to help you decide on the most suitable geocoding API for your project.

## Comparison criteria

In this article, we will look at the pricing model, and terms of use:

- **Pricing:** Most geocoding API providers have a volume-based pricing. So, we will look at pricing tiers and price per API request.
- **Free tier:** Typically there is a free or trial tier with a limited number of requests or limited functionality. This can be useful for testing the API or even keeping your costs low for personal or low-budget projects.
- **Data terms of use:** It’s essential to know if there are any limitations about the data usage: Does the provider require displaying an attribution? Is it even okay to use the data for commercial use?

In the follow-up articles, we will also explore additional criteria:

- **Accuracy:** It doesn’t matter whether the API is cheap if the results are useless. So, we will do a head-to-head comparison of various queries and compare the results.
- **Performance:** If your project requires displaying the geocoding results in real-time, then every millisecond matters.

## What’s Superface and why is this comparison neutral

At Superface we don’t provide a geocoding API. Instead, we are building a universal API client which lets you connect to any API and any provider – directly from your application without passing the data through our servers. You can even use multiple providers behind a single interface without the need to study the documentation for each or keep up with the API changes.

Geocoding is particularly one domain where your project can benefit from using multiple API providers. Whether it’s for accuracy, cost management, or legal reasons. Our goal is to provide you with accurate and impartial information about geocoding APIs, and we will show you how you can use them immediately with OneSDK, our API client.

Oh, and one more thing: OneSDK is free and [open-source](https://github.com/superfaceai/one-sdk-js), it doesn’t matter whether you will use it for geocoding twice or a billion times. Our business is built around providing the connectors to the APIs and their long-term support, but not around the usage volume.

## Geocoding APIs compared

| Provider    | Free Requests              | Rate Limit (requests per second)             | Pricing (per 1,000 requests)                                | Additional Notes                                           |
| ----------- | -------------------------- | -------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------- |
| HERE        | 30,000/month               | 5                                            | $0.83 up to 5M<br>$0.66 up to 10M                           |                                                            |
| Google Maps | 40,000/month ($200 credit) | 50                                           | $5 up to 100,000<br>$4 up to 500,000                        | Attribution & Google Maps required                         |
| Azure Maps  | 5,000/month                | 500 (geocoding)<br>250 (reverse geocoding)   | $4.50                                                       |                                                            |
| OpenCage    | 2,500/day                  | 1 (free)<br>15 (X-Small)<br>up to 40 (Large) | $0.17 (10,000 per day)<br>$0.11 (300,000 per day)[^monthly] | Free trial for testing only<br>Monthly fixed pricing       |
| TomTom Maps | 2,500/day                  | 5                                            | $0.54                                                       |                                                            |
| LocationIQ  | 5,000/day                  | 2                                            | $0.16 (10,000 per day)<br>$0.03 (1M per day)[^monthly]      | Free plan requires attribution<br>Monthly fixed pricing    |
| Nominatim   | n/a                        | 1                                            | n/a                                                         | Low-volume, noncommercial use only<br>Attribution required |

[^monthly]: For services with monthly subscription (OpenCage and LocationIQ) the price per 1,000 requests is based on daily limit per 30 days for the lowest and the highest plans paid monthly.

### HERE

[HERE’s pricing](https://www.here.com/get-started/pricing) starts with the Limited Plan, which provides you with **1,000 free requests per day**, with a rate limit of **5 requests per second**.

If you provide payment information, you are upgraded to the Base Plan. The Base Plan removes the rate limit and sets you up for **30,000 free requests per month**. Above that, requests up to 5 million are **$0.830 per 1,000**, and **$0.660 per 1,000** requests between 5 and 10 million per month.

### Google Maps Platform

Google Maps Platform requires you to provide billing details to use the Geocoding API, and provides you with **$200 of free credit per month**, which is good for **40,000 free geocoding API requests** (check the [Geocoding API Usage and Billing](https://developers.google.com/maps/documentation/geocoding/usage-and-billing)).

If that’s not enough, the pricing starts at **$5 per 1,000 requests** up to 100,000 requests per month. Above that, the price gets lower to **$4 per 1,000** requests up to 500,000 requests.

Regardless of usage, there’s a rate limit of 50 requests per second. Google also [prohibits displaying of geocoding results](https://developers.google.com/maps/documentation/geocoding/policies#map) on another map than Google Maps, and [requires displaying Google logo](https://developers.google.com/maps/documentation/geocoding/policies#logo) for attribution.

### Azure Maps

Azure Maps provides **5,000 free requests per month** (see the [pricing for Azure Maps Search](https://azure.microsoft.com/en-us/pricing/details/azure-maps/)), and the **price per 1,000 requests above that is $4.50** (up to 500,000 requests).

[Queries are rate limited](https://learn.microsoft.com/en-us/azure/azure-maps/azure-maps-qps-rate-limits) to 500 per second for geocoding, and 250 per second for reverse geocoding.

### OpenCage

[OpenCage pricing](https://opencagedata.com/pricing) is richer than for other services. You have a choice of purchasing a one-time requests package (valid up to one year), or subscribing to different usage tiers on a monthly or annual basis.

The free tier is intended only for testing and development and provides you with **2,500 requests per day**, rate limited to 1 request per second. The cheapest package costs **$50 per month** and comes with **10,000 requests per day** (about $0.17 per 1,000 requests) and a rate limit of 15 requests per second. The biggest pre-Enterprise package costs **$1,000 per month**, with **300,000 requests per day** and a rate limit of 40 requests per second (which is approx $0.11 per 1,000 requests).

One nice thing is that the daily request limit is “soft” – if you occasionally cross the limit, the service won’t be blocked, and you won’t be charged anything extra. Only if you repeatedly pass the limit OpenCage asks you to upgrade your plan for the next month.

### LocationIQ

[LocationIQ pricing](https://locationiq.com/pricing) is very similar to OpenCage's. You have a choice of plans paid on a monthly and annual basis, but no option to purchase a one-time requests package.

The free tier does allow commercial usage as long as you include a link in your application to LocationIQ. Furthermore, the free tier limit is doubled compared to OpenCage, with **5,000 free requests** allowed per day and a rate limit of 2 requests per second. The smallest package is basically the same as OpenCage's: it costs **$49 per month** and comes with **10,000 requests per day** (about $0.16 per 1,000 requests) and a rate limit of 15 requests per second. However, the biggest package includes **1 million requests per day** for **$950 per month** (about $0.03 per 1,000 requests).

Similar to OpenCage, LocationIQ has a “soft” limit for daily requests, allowing requests “upto an additional 100% of your daily limit”. For example, on the smallest package, you can occasionally perform 20,000 requests per day before getting an error.

### TomTom Maps API

TomTom provides a generous free tier with **2,500 requests per day** available for commercial applications as well. Above that, **1,000 requests cost €0.50 ($0.54)**.

### Nominatim

[Nominatim](https://nominatim.org/) is a bit different from the other services on this list. It’s primarily an open-source project that uses data from [OpenStreetMap](https://www.openstreetmap.org/). And conversely, OpenStreetMap’s search is powered by Nominatim. You can (and should) run Nominatim [on your server](https://nominatim.org/release-docs/latest/admin/Installation/), but if you just want to try the API or have a low-volume hobby project, you’re welcome to use the Nominatim instance provided by OpenStreetMap.

However, pay close attention to its [usage policy](https://operations.osmfoundation.org/policies/nominatim/), in particular:

- Maximum of 1 request per second.
- Identify your application using User-Agent or HTTP Referer headers.
- Display [attribution](https://wiki.osmfoundation.org/wiki/Licence/Attribution_Guidelines).
- Don’t resell the data.

Nominatim is also used by some [commercial providers](https://wiki.openstreetmap.org/wiki/Nominatim#Alternatives_/_Third-party_providers), including OpenCage and LocationIQ.

## Pricing comparison

While each service has different pricing tiers, we can compare the price based on the number of requests made. We’ve omitted Nominatim in this comparison, since it’s always free, but isn’t intended for commercial projects.

### Small usage (up to 30,000 requests / month)

- HERE: free
- Google Maps Platform: free (with credit)
- Azure Maps: $112.5/month
- OpenCage: free or $50/month (X-Small)
- TomTom Maps: free
- LocationIQ: free or $49/month (Geocoding Lite)

### Medium usage (100,000 requests/month or 3,333/day)

- HERE: $58.1
- Google Maps Platform: $300 (with credit)
- Azure Maps: $427.5
- OpenCage: $50 (X-Small)
- TomTom Maps: $16.2 ($0.54/day)
- LocationIQ: free or $49/month (Geocoding Lite)

### High usage (300,000 requests/month or 10,000/day)

- HERE: $224.1
- Google Maps Platform: $1,100 (with credit)
- Azure Maps: $1327.5
- OpenCage: $50 (X-Small) or $125 (Small)
- TomTom Maps: $121.5 ($4.05/day)
- LocationIQ: $49/month (Geocoding Lite) or $99 (Developer)

## Conclusion: What’s the best geocoding API deal?

Based purely on pricing, we can draw a conclusion about each provider.

**Azure Maps** is, for higher volume scenarios, the most expensive option, with low free tier and fixed price per request. Similar to Google Maps, Azure Maps’ price per 1,000 requests is almost ten times higher compared to other providers.

**Google Maps Platform** is similarly expensive, but also the most restrictive provider, with requirements for attribution and displaying data using their embedded maps. This can introduce additional costs, as Google Maps with JavaScript API is also paid per usage.

**OpenCage** and **LocationIQ** both provide monthly plans with a fixed price. OpenCage also provides the possibility to purchase one-off usage credits and handles billing in multiple currencies automatically. LocationIQ, on the other hand, provides more generous free tier, and their monthly plans are cheaper, especially for higher volume usage. The “Business Plus” plan in particular allows for 1 million requests per day, allowing for a whopping 30 million requests per month without negotiating custom pricing. A monthly subscription probably makes the most sense if your usage volume of the geocoding API is consistent throughout the month.

On the other hand, **TomTom Maps** may be preferable if your usage is uneven. The price per 1,000 calls is among the lowest, and you have a large amount of free requests per day. And unlike OpenCage and LocationIQ, you don't need to pay a monthly subscription. The commercial-friendly free tier is also a great option for smaller and low-budget projects.

**HERE** is a viable option for high-volume usage. While most providers require you to upgrade to the (presumably expensive) Enterprise plan once you use around 500,000 requests/month, HERE will ask you only once you reach 10 million monthly requests. (However, LocationIQ allows for 1 million requests _per day_ with their biggest package.)

Finally, **Nominatim** is a special option. Great for small projects, but not intended for commercial usage. Still, if you use the service, consider [supporting the project](https://nominatim.org/funding/).

## Resources

- OpenCage has a [detailed guide on comparing and testing geocoding providers](https://opencagedata.com/guides/how-to-compare-and-test-geocoding-services); rather than comparing individual providers, it explains what criteria you should consider.
- On GIS Stack Exchange, you can find a sheet with a [comprehensive comparison of providers’ accuracy](https://gis.stackexchange.com/a/62389/27909); the last update was in 2021.
- You can find additional comparisons by [Smarty](https://www.smarty.com/articles/geocoding-api-comparison) (formerly SmartyStreets), [Geoapify](https://www.geoapify.com/top-geocoding-services-comparison), and [Geocodio](https://www.geocod.io/compare/), however some information about pricing may be outdated and the comparisons are obviously biased.

## Updates

The article was updated on June 26, 2023, to include LocationIQ per the provider's request.
