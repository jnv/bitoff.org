---
title: 'Get started with Greenhouse APIs: Overview and authentication'
description: 'Greenhouse Recruiting provides multiple APIs with different authentication mechanisms. We will show you which one to choose and give you example API calls in JavaScript.'
email: false
discussion:
  Dev.to: https://dev.to/superface/get-started-with-greenhouse-apis-overview-and-authentication-2ip0
---

{% callout "Author's note" %}
This article was originally [published](https://web.archive.org/web/20230609080506/https://superface.ai/blog/greenhouse-recruiting-api-overview-auth) on [Superface](https://superface.ai/) blog before the pivot to agentic tooling platform and is republished here with company's permission.

I am no longer working with Greenhouse API and the content of this article may be outdated.
{% endcallout %}

Our goal at Superface.ai is to simplify API integrations, so you can focus on building your app instead of reading the API docs. We’ve built ready-made integrations for Greenhouse, and in this article we’re sharing what we’ve learned through the process.

The first step to integrating any API is obtaining access. When it comes to Applicant Tracking Systems (ATS), the API for [Greenhouse](https://www.greenhouse.com/) is among the most developer-friendly, with useful and straightforward [documentation](https://developers.greenhouse.io/).

Still, there are six separate APIs for Greenhouse, some of them with overlapping concerns (such as Harvest and Job Board APIs). We have prepared a little crash course on Greenhouse APIs with pointers on when to use which one, how to obtain credentials for each, and how to authenticate your API calls. You will also find examples in JavaScript, which should work in all modern runtimes (particularly Node.js version 18 and newer and Deno).

This article focuses on Greenhouse Recruiting APIs. There are also APIs for [Greenhouse Onboarding](https://developers.greenhouse.io/gho.html) and [Assessment](https://developers.greenhouse.io/assessment.html). We will cover these in future posts.

## Summary

- The [Job Board API](#job-board-api-for-custom-careers-pages) is intended for building custom careers pages.
  - It’s publicly accessible without authentication, cached and not rate limited.
  - It only uses HTTP Basic authentication for submitting candidates through the API.
- The [Harvest API](#harvest-api-for-full-access-to-recruiting-data) provides full access to Greenhouse Recruiting data.
  - It’s useful for building advanced automation and internal productivity tools.
  - It requires HTTP Basic authentication using API keys with granular permissions, and an `On-Behalf-Of` header for auditing of write operations.
  - The number of requests is limited within 10-second windows.
- The [Candidate Ingestion API](#candidate-ingestion-api-for-sourcing-partners) is intended for recruiting partners, like agencies and job portals.
  - Access is authenticated either with HTTP Basic authentication (with API key provided by Greenhouse customer), or OAuth 2.0 with granular scopes.
  - Requests authenticated by HTTP Basic require an `On-Behalf-Of` header, which identifies the Greenhouse user and sets the integration’s permissions.

## Job Board API for custom careers pages

You can use the [Job Board API](https://developers.greenhouse.io/job-board.html) to build a custom careers page for your company. It provides data about published jobs and the company hierarchy (offices and departments). Since job boards only work with published and public data, you don’t need any special credentials for read access – only a “board token” which [corresponds to the URL path of a job board](https://support.greenhouse.io/hc/en-us/articles/360020776251-Job-board-URL-for-Greenhouse-hosted-job-board) (and can be [customized](https://support.greenhouse.io/hc/en-us/articles/5888210160155-Find-your-job-board-URL-for-an-integration)).

For example, if the job board is accessible on the URL `https://boards.greenhouse.io/acme`, the `board_token` is `acme`. Anyone can access the respective API endpoints, for example `https://boards-api.greenhouse.io/v1/boards/acme/jobs` to [list published jobs](https://developers.greenhouse.io/job-board.html#jobs).

The only exception is [posting job applications](https://developers.greenhouse.io/job-board.html#submit-an-application), which requires an API key. Greenhouse recommends using their embedded application form, but if you decide to build one on your own, you will need to [create a Job Board API key](https://support.greenhouse.io/hc/en-us/articles/13446638483355-Create-a-job-board-API-key-for-an-integration), which you’ll use in HTTP Basic authentication as the username, with no password. For example, in JavaScript with Node.js (v18+) or Deno, you can submit an application as follows:

```js
// Set according to your Job Board settings
const JOB_BOARD_TOKEN = `acmeinc`;
// Create Job Board key in Configure > Dev Center > API Credentials
const GREENHOUSE_API_KEY = `2f11da80ea73b20b4d15bfab0ee73257-1`;
// ID of the job where the application is submitted
const JOB_ID = '4043584006';

const CANDIDATE_DATA = {
  first_name: 'Jane',
  last_name: 'Doe',
  email: 'j.doe@example.com',
  phone: '12345678',
  data_compliance: { gdpr_consent_given: true },
};

// base64 encode credentials
const basicAuth = btoa(`${GREENHOUSE_API_KEY}:`);

fetch(
  `https://boards-api.greenhouse.io/v1/boards/${JOB_BOARD_TOKEN}/jobs/${JOB_ID}`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${basicAuth}`,
    },
    body: JSON.stringify(CANDIDATE_DATA),
  }
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(
        `Unexpected response from the server: ${response.status}`
      );
    }
  })
  .then((responseData) => {
    console.log('Application submitted!', responseData);
  })
  .catch((error) => {
    console.error('Error submitting application:', error);
  });
```

## Harvest API for full access to recruiting data

A step above the public Job Board API is the [Harvest API](https://developers.greenhouse.io/harvest.html), which provides access to “most” Greenhouse Recruiting data. This API gives you full access to read and modify candidates, interviews, jobs, and various other organization’s resources.

Harvest API keys have granular permissions. You can [choose what API endpoints and operations are available](https://support.greenhouse.io/hc/en-us/articles/115000521723-Manage-Harvest-API-key-permissions), so you can limit the access scope (and potential security risks) of your application.

Similarly to the Job Board API, Harvest API keys are used with HTTP Basic authentication, where the username is the API key and the password remains empty.

In the following JavaScript example, we’re listing all candidates from the Harvest API using the [GET Candidates endpoint](https://developers.greenhouse.io/harvest.html#get-list-candidates). The pagination is handled through an [async iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of). Each API response [has a Link header for navigating to the next page of results](https://developers.greenhouse.io/harvest.html#pagination), so we’re parsing the header in the sample code:

```jsx
// Create Harvest API key in Configure > Dev Center > API Credentials
const GREENHOUSE_API_KEY = `c8ee19deadbeef5466d92e643916316-2`;

// base64 encode credentials
const basicAuth = btoa(`${GREENHOUSE_API_KEY}:`);

// Parse Link header:
// Example: <https://harvest.greenhouse.io/v1/candidates?page=2&per_page=2>; rel="next", <https://harvest.greenhouse.io/v1/candidates?page=474&per_page=2>; rel="last"
function getNextPageUrl(linkHeader) {
  if (!linkHeader) {
    return '';
  }
  const links = linkHeader.split(',');
  const nextLink = links.find((link) => link.includes('rel="next"'));
  if (!nextLink) {
    return '';
  }
  const nextUrl = nextLink.match(/<(.+)>/)[1];
  return nextUrl;
}

async function* fetchCandidatesPage() {
  // TIP: add ?per_page=1 to test iteration or ?per_page=500 to get a maximum of results
  let nextPageUrl = 'https://harvest.greenhouse.io/v1/candidates';

  while (nextPageUrl) {
    const response = await fetch(nextPageUrl, {
      headers: { Authorization: `Basic ${basicAuth}` },
    });
    if (response.ok) {
      nextPageUrl = getNextPageUrl(response.headers.get('Link'));
      const data = await response.json();
      yield data;
      console.log(nextPageUrl);
    } else {
      throw new Error(
        'Unexpected response from the server: ',
        await response.text()
      );
    }
  }
}

async function iterateCandidates() {
  let page = 0;
  for await (const candidates of fetchCandidatesPage()) {
    console.log(`### Listing candidates, page ${page}`);
    console.log(candidates);
    page++;
  }
}

iterateCandidates();
```

Since the API key is global, there is no straightforward way to identify who performed which operations through the API. Therefore, for auditing purposes, write operations (creating, updating, and deleting resources) require an `On-Behalf-Of` HTTP header containing the Greenhouse ID of the user performing the operation. Your application can get the ID of the user from the [`GET List Users` endpoint](https://developers.greenhouse.io/harvest.html#get-list-users). If you know the email of the user logged into your app, you can use the `email` query parameter to obtain the user’s Greenhouse record, including their ID.

## Job Board API vs. Harvest API

The Job Board API is clearly a subset of the Harvest API, so you may be asking why should you deal with the Job Board API at all?

This depends on the type of application you’re building. The Job Boards API is mostly useful for custom career sites, so if you’re building that, consider the following advantages:

- **Security:** Since the Job Board API is limited only to public data such as published job posts, there’s no risk of leaking sensitive information (for example if the API key is compromised).
- **Rate Limits:** The Job Board API is heavily cached and there are no hard rate limits, while requests to the Harvest API are [throttled within a 10-second window](https://developers.greenhouse.io/harvest.html#throttling).
- **Simplicity:** Since the Job Board API is publicly accessible, you can use it with purely client-side applications. For the Harvest API, you will need to implement a backend to keep the API key secure and to filter out internal data.

On the other hand, the Job Board API doesn’t expose some data, which may be helpful for building custom integrations. Particularly lacking are external IDs of [offices](https://developers.greenhouse.io/harvest.html#the-office-object) and [departments](https://developers.greenhouse.io/harvest.html#the-department-object) (useful for mapping office or department descriptions to an external CMS), or [the time when a job was first published](https://developers.greenhouse.io/harvest.html#the-job-post-object) (for displaying jobs which were recently added, not updated).

## Candidate Ingestion API for sourcing partners

The [Candidate Ingestion API](https://developers.greenhouse.io/candidate-ingestion.html#introduction) is intended for sourcing partners, like external job portals and agencies. It provides limited access to jobs and candidates, as well as the ability to post new candidates.

Similarly to the Harvest API, the Candidate Ingestion API requires HTTP Basic authentication with the API key as the username, an empty password, and the `On-Behalf-Of` header. However, the `On-Behalf-Of` must be set to the user’s e-mail. The permissions of the integration are limited to the user’s role. Typically, you will have a dedicated “service account” for the integration.

In this JavaScript sample, we’re listing jobs using the Candidate Ingestion API

```jsx
// Create Candidate Ingestion API key in Configure > Dev Center > API Credentials; in Partners, select Resource (dev)
const GREENHOUSE_API_KEY = `321a2ff8cdcdeadbeefd372a9c1a69e9-3`;
// Your email or for a dedicated service account
const ON_BEHALF_OF = 'demo@example.com';

// base64 encode credentials
const basicAuth = btoa(`${GREENHOUSE_API_KEY}:`);

fetch(`https://api.greenhouse.io/v1/partner/jobs`, {
  headers: {
    Authorization: `Basic ${basicAuth}`,
    'On-Behalf-Of': ON_BEHALF_OF,
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(
        `Unexpected response from the server: ${response.status}`
      );
    }
  })
  .then((responseData) => {
    console.log(responseData);
  })
  .catch((error) => {
    console.error(error);
  });
```

The Candidate Ingestion API also provides [OAuth 2.0 authorization](https://developers.greenhouse.io/candidate-ingestion.html#authentication), with granular scopes for viewing jobs, candidates, and creating candidates. Consumer key and secret are provided by Greenhouse. The access token is bound to the user who authorized the application, and therefore the `On-Behalf-Of` header is not needed.

## Time to build the integration

Picking an API and getting the right API key is just the start. Now you’ll need to read the documentation, figure out the resources, properties, API calls… And once you build the integration, you also need to keep checking the API for changes and breakages.

Maybe there’s a better way. We've already went through multiple ATSs and distilled their APIs into ready-made ATS connectors, so you don’t need to read the docs and can focus on building your app instead.

With Superface, you’ll get unified integration logic which shields your application from API changes, and provides enhanced monitoring. Our SDK provides direct, proxy-less integration with the external API, so it’s faster and respects the privacy of your candidates. And you’re not reliant on our ready-made connectors – you can modify the integration logic to suit your needs, and build your own connectors.

If that sounds interesting, take a look at our Greenhouse ATS integrations – but we also provide other integrations, like geolocation, sending emails, Slack, and more.
