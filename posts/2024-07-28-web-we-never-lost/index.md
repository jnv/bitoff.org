---
title: "The Web We've (Never) Lost"
description: 'Based on my talk for PragueJS meetup from February 2024'
---

This text is partially a transcript, partially a recollection of a talk I presented on the [PragueJS meetup](https://www.meetup.com/praguejs/) in February 2024.[^recording]

[^recording]: There's also a [recording](https://www.youtube.com/watch?v=0uURChbvhVY) if you really want, but it's, ummm, not very good. It’s definitely not my best performance.

Abstract:

> Doesn't it feel like the web is getting worse every day? Do you miss the days when Google wasn't a garbage factory, Twitter wasn't a cesspool of Nazis, and you weren't treated like a pair of eyeballs with a wallet? Don't worry, the web of yore is still alive and kicking – in fact, it's thriving. You just need to know where to look. Let's take a dive into the non-mainstream web, where people create blogs and websites for the sheer joy of it, algorithmic feeds are nowhere to be found – and you can join, too!

## The Web We’ve (Never) Lost[^dash]

[^dash]: The title is not-so-subtle reference to Anil Dash's classic article from 2012 [The Web We Lost](https://www.anildash.com/2012/12/13/the_web_we_lost/).

I’m Jan and I work as an engineer with the API team at Mews. While I went through many roles in my career, they all have one thing in common: I’m always building something for the web.

I do like web. Not just like a development platform, but as a medium and as a cultural artifact. And in my talk, I want to show you why we should pay more attention to the web in its own right. Particularly this year.

Let me start with two questions:

- Do you have a social media profile? (on Twitter, Facebook, LinkedIn or Instagram) _Majority of the attendees raised hands._
- Do you have a personal website, perhaps a blog? _Only a few people raised hands._

Interesting, and we're on a JavaScript meetup where most of us build things for the web. So for those of you who didn't raise your hand for the second question I hope to give you some inspiration.

{% img "slide04.png", "Screenshots of headlines from various publications: “The Year Millennials Aged Out of the Internet”, “Why the Internet isn't fun anymore”, “Social media is doomed to die”, “The modern internet sucks: Bring back GeoCities”, “The Web Is Fucked”" %}

Over the last year there were a few though pieces in major publications about how internet isn’t fun anymore, how social media is dying. And look, that’s nothing new, in fact, that “Bring back GeoCities” is from 2015.

Still, there seems to be a shift in power dynamics on the web. Part of it is definitely a generational change, it’s now clear that generation Z uses the web differently than millennials.

{% img "slide05.png", "Snippet of newspaper from The Simpsons with photo of Grampa Simpson yelling at cloud and visibly modified title: “Old man yells at TikTok”" %}

And I don’t want to sound like Abe:

> “These young’uns with their TikToks have no idea what the real web is about! Back in my days, when we wanted to surf the web, we had to walk 10 miles to the beach”

I want to instead focus on established platforms which became synonymous with social media and the web.

### 2022—2023

A few things happened in 2022 which we saw to fully play out last year.

First, let’s talk about Google. For the past few years it became quite a meme how Google Search is just full of ads and you really have to look for actual, organic results.

{% figure "slide8.png", "Tweet by user spakhm: “For some searches literally *the whole screen!!* on google is now ads.”, with screenshot of Google search results page for “retool slack integration” showing only sponsored links." %}

Screenshot via Dmitri Brereton's [Google Search Is Dying](https://dkb.blog/p/google-search-is-dying)

{% endfigure %}

Clearly, we’ve come a long way from simple 10 blue links, since Google now pushes its additional properties.

{% figure "slide9.png", "Tweet by Daisuke Wakabayashi from March 2022: “I cover Google for a living so I am obviously aware how the results page has evolved over the years. Today, I was searching for “hearing aids” for my dad on my phone and I was stunned by the number of ads, and non-link results. It’s pretty stunning”" %}

[Source tweet and video](https://twitter.com/daiwaka/status/1503155482072010758).

{% endfigure %}

Well, we now have somewhat an [objective research confirming our suspicion](https://downloads.webis.de/publications/papers/bevendorff_2024a.pdf) (PDF). Google is getting worse as it loses its fight against SEO spam.
The only silver lining is that competitors are doing worse.

{% figure "slide11.jpg", "Photo of a man speaking before US Congress with a name tag “Mr. Samuel Altman”." %}

Photo from Politico: [AI hearing leaves Washington with 3 big questions](https://www.politico.com/news/2023/05/16/sam-altmans-congress-ai-chatgpt-00097225).

{% endfigure %}

Now, let’s add that guy to the mix. For those that don’t know, Sam Altman is CEO of OpenAI. While GPT has been available for a while now, ChatGPT was released in fall of 2022 and to this day we’re still trying to grasp the consequences of widely available generative Large Language Models (LLMs).

Since LLMs are trained on data from the web, they’re really good at generating plausibly looking articles.

{% figure "slide12.png", "Screenshot of twitter thread by user MackGrenfell: “Just pulled off a bit of an SEO heist using GPT-3, creating 1,800 articles around a competitor brand's main pages by scraping their sitemap. Here's how it went: 1) Find a competitor who ranks for all the sorts of terms you want to rank for, and look at their sitemap. You'll want them to have URLs which are broadly descriptive of what the content at that URL is. …”" %}
[Source tweets](https://twitter.com/MackGrenfell/status/1514557363902205952)
{% endfigure %}

Growth hackers like this guy love ChatGPT. Generate thousands of articles based on the competitor’s website structure? No problem.

So how does Google deals with AI-generated content?

{% figure "slide13.png", "Headline of article from Futurism: AI Garbage Is Destroying Google Results; “It’s the worst quality results on Google I’ve seen in my 14-year career.”" %}
[Source article](https://futurism.com/ai-garbage-destroying-google-results)
{% endfigure %}

Not well.

<hr>

{% figure "slide14.png", "Old photo of Elon Musk from 2000 holding a Visa card with “x.com” logo in front of camera, CRT monitor with PayPal logo in his background." %}
[Source article (archive)](https://web.archive.org/web/20221224182438/https://finance.yahoo.com/news/elon-musk-makes-spends-billions-200625424.html)
{% endfigure %}

Anyway, let’s talk about this guy. Note the text on the card he’s holding. It’s not a coincidence.

Musk reluctantly bought Twitter in 2022 (but he really tried not to). I’m not going to talk about his misdeeds, how Twitter became a prime source of disinformation and conspiration theories – many of them spread by Musk himself.

{% figure "slide16.jpg", "Chart showing Twitter’s mobile app performance in percent points of daily and monthly active users over time. Daily active users peak around rebranding to X in July 2023 and then drop by September 2023 to negative percentage around -3%." %}
Source: [The Elon Effect](https://web.archive.org/web/20221224182438/https://finance.yahoo.com/news/elon-musk-makes-spends-billions-200625424.html)
{% endfigure %}

Sure, [Twitter is losing users](https://slate.com/technology/2023/10/twitter-users-decline-apptopia-elon-musk-x-rebrand.html), but probably not so quickly as some of us hoped.
Personally I turned my profile private and I try to minimize interaction with the platform to a minimum. I just don’t want to take part in billionaire’s mid-life crisis toy.

What’s more important though, Twitter is [losing a lot of money from advertising](https://archive.is/RDcig), which is its major source of income. $2.5 billion is about half of what they made previous year.
I bet we’ll see more desperate moves to monetize existing users.
And there is an underlying theme to this all.

### Enshittification

Have you heard about **enshittification**? _Only a handful of people raised their hand._

It was [named the word of year 2023](https://americandialect.org/2023-word-of-the-year-is-enshittification/).

Enshittification is a term [coined by Cory Doctorow](https://pluralistic.net/2023/01/21/potemkin-ai/#hey-guys) to explain the dynamics of online platforms:

{% figquote "[Cory Doctorow: TikTok's enshittification][doctorow_tiktok]", "https://pluralistic.net/2023/01/21/potemkin-ai/#hey-guys:~:text=Here%20is%20how%20platforms%20die%3A%20first%2C%20they%20are%20good%20to%20their%20users%3B%20then%20they%20abuse%20their%20users%20to%20make%20things%20better%20for%20their%20business%20customers%3B%20finally%2C%20they%20abuse%20those%20business%20customers%20to%20claw%20back%20all%20the%20value%20for%20themselves.%20Then%2C%20they%20die." %}
Here is how platforms die: first, they are good to their users; then they abuse their users to make things better for their business customers; finally, they abuse those business customers to claw back all the value for themselves. Then, they die.
{% endfigquote %}

We see this playing out with [Amazon](https://pluralistic.net/2022/11/28/enshittification/#relentless-payola), [TikTok][doctorow_tiktok], [Reddit](https://www.motherjones.com/politics/2023/06/reddit-blackout/), but also with [Uber](https://www.prospectmagazine.co.uk/ideas/technology/63324/how-weve-enshittified-the-tech-economy) and [AirBnB](https://jacobin.com/2024/01/airbnb-big-tech-hotels-travel-sharing-economy-capitalism).[^wikiensh] But the prime example is Facebook.

[^wikiensh]: Wikipedia helpfully provides [more examples](https://en.wikipedia.org/w/index.php?title=Enshittification&oldid=1236451329#Examples).

{% figure "slide21.png", "Comic: How to reach people on the internet. How it used to be: blobby person points to a small house with sign “Matt's Website” saying: “Come on over! I've got some neat stuff here.” What happened: Same person points to a skyscraper with Facebook logo, saying: “Actually, follow me over there. It'll be easier to reach each other.” Other people go to the skyscraper, the sign above the door says: “Welcome, new active users!” Where we're at now: The sign above skyscrapers' door states: “Door locks engaged.” The same person points to their house, shouting at the skyscraper: “Hey, I made some new stuff. Can you show it to my followers?” The sign above the door changes: “Promotion! Boost this post for $10.000 and reach a fraction of your followers!” The person responds: “Fuck!”" %}

[The Oatmeal: How to reach people on the internet][oatmeal]

{% endfigure %}

Matthew Inman, aka The Oatmeal [captured the phenomenon of enshittification][oatmeal] before it even had name.

Circa 15 years ago, Facebook was a hip place where following friends and pages was convenient. But once we’ve got accustomed to the algorithmic newsfeed, Facebook started to push more advertising on us – and also pushed content producers to pay for ads. It’s sort of inevitable trajectory of platforms which act as an intermediary between the users and businesses, because they control both sides.

{% img "slide24.png", "Drake Hotline Bling meme with Drake rejecting the Twitter's blue bird with X for its eyes and embracing logo of Threads by Meta." %}

And we see the enshittification cycle to start anew, with many Twitter users moving to Threads by Meta. I don’t see where this could go wrong.

**Can we break the enshittification cycle?** Are we doomed to move from one platform to another, always becoming a hostage in some grand enshittification scheme? Or is there something else?

Well, here’s a proposal. Instead of posting on yet another social media… We can build a website.

### Where have all the websites gone?

{% figure "slide27.png", "Tweet by user cutestgoth from November 2023: “it feels like there are no websites anymore. there used to be so many websites you could go on. where did all the websites go”" %}
[Source tweet](https://twitter.com/cutestgoth/status/1727512834097959322)
{% endfigure %}

But after spending years in apps and on social media which actively discourage us from posting and clicking on links, one can get easily lost. I mean, it _feels_ like the web became much smaller.

But the websites are still there – if you know where to look for them.

I particularly like this definition by (now defunct) community [Yesterweb](https://yesterweb.org/) which defined the “core web” and the “peripheral web”:

{% figquote "[The Yesterweb, summary](https://yesterweb.org/#the-mass-movement)", "https://yesterweb.org/#the-mass-movement:~:text=The%20core%20web%20is,unaware%20of%20its%20existence." %}
The **core web** is the ‘default’ internet experience for all human beings, largely defined by monopoly-capitalist platforms like Facebook, Twitter, TikTok, Reddit, and others. […]

The **peripheral web** can be described as the outskirts of the core web, with platforms such as Mastodon, SpaceHey, Neocities, Discord and IRC chatrooms, Matrix rooms, various imageboards, and others, including various functional clones of core web applications. It is the digital countryside of the corporate megalopolis. […]
{% endfigquote %}

{% figure "slide30.jpg", "An illustration visibly generated by text-to-image model, depicting a city of skyscrapers with familiar corporation logos like Facebook, Amazon, and Twitter. The city is surrounded by lake and green hills with small cottages." %}
“\[The peripheral web] is the digital countryside of the corporate megalopolis.” (generated with DALL·E 3)
{% endfigure %}

But beside “peripheral web” there are different names for this idea, like:

- [indie web](https://indieweb.org/)
- [small web](https://ar.al/2020/08/07/what-is-the-small-web/) and [web0](https://web0.small-web.org/)
- [slow web](https://www.slowweb.io/)
- [smol net](https://communitywiki.org/wiki/SmolNet)

Each of these names covers a bit different concept, but they have some things in common: they aim to create a web which is human-scale, sustainable, and devoid of corporate greed.

Maybe you’re thinking that it sounds great – but where do I start on this peripheral web?

### Discovery

#### Search engines

First we have alternative **search engines**. And I don’t mean alternative as Bing or DuckDuckGo (which is mostly rebranded Bing). These are search engines with their own indexes and features which let you find content outside of big, Google-optimized sites.

Engines such as:

- [Stract](https://stract.com/), an open-source engine which lets you filter results through so called Optics
- [Wiby](https://wiby.me/), a sort of “retro” search engine with a wonderful [Surprise me!](https://wiby.me/surprise/) feature
- [Marginalia](https://search.marginalia.nu/), a DIY search engine with some very interesting and opinionated result filters
- [Feedle](https://feedle.world/) which indexes data from RSS feeds, so mostly from blogs[^feedle]
- [Kagi](https://kagi.com/), a paid search engine which aims to beat Google by being actually better

And there are [many more interesting search engines](https://seirdy.one/posts/2021/03/10/search-engines-with-own-indexes/).

[^feedle]: Remember Technorati?

#### Webrings

If you haven’t heard of webrings, they can look, for example, like this.

{% figure "slide38.jpg", "A banner with text “Check out the other awesome websites in The Geek Ring!” and three buttons: Previous, Random, and Next." %}
Banner from [Geekring](https://geekring.net/).
{% endfigure %}

When you add your site to a webring, you will put links to the previous and next site in the ring, so visitors can find websites – maybe with similar focus, maybe not. Topics of those topics, varies from general like “personal websites”, through specific topics like [digital accessibility](https://a11y-webring.club/), to very specific niches like [french-speaking sites about salads](https://bboissin.appspot.com/salade.html). And again, there are [many more webrings to browse](https://brisray.com/web/webring-list.htm).

#### Directories

Before search engines became the de facto method of navigating the web, we had directories. Yahoo started that way, Czech search engine Seznam (“the list”) started that way, even [Google used to have a directory](https://en.wikipedia.org/wiki/Google_Directory) of its own. Directories still exist and there are some new takes on it.

For example, there’s [Curlie](https://curlie.org/) which builds on the legacy of [DMOZ](https://en.wikipedia.org/wiki/DMOZ). Some newer contenders include [Ooh.directory](https://ooh.directory/) focused on blogs, and [Personalsit.es](https://personalsit.es/) focused on personal websites.

#### Communities

While social media became synonymous with Facebook and few other, large, ad-driven platforms, there are still many, many smaller on-line communities focusing on various niches.

One of the original, truly web-native communities, were GeoCities, a free hosting which was home to websites for various niches. Since 2009 we can only experience [GeoCities in its archived form](https://blog.archive.org/2009/08/25/GeoCities-preserved/), but [Neocities](https://neocities.org/) picked up the torch.

{% figure "slide45.png", "Screenshot of website Gifypet with introduction text: “Hello sir/madam, Did you dream of your very own pet? Who is there to watch over your site when you are gone? GifyPet will! This little friend will welcome your guests and love you forever! Best Regards, GifyPet Adoption Center”" %}
[GifyPets](https://gifypet.neocities.org/), one of the featured Neocities site. It lets you build your own pet you can put on your site and other visitors can interact with it.
{% endfigure %}

For more advanced users there is [Glitch](https://glitch.com/), “the friendly place where everyone builds the web”. Beside static websites it also supports Node.js. While it’s similar to Replit or CodeSandbox, Glitch focuses on community and creative aspects of coding. For example, Stefan Bohacek [hosts hist social media bots](https://stefans-creative-bots.glitch.me/) on Glitch. You can go straight to the editor, “remix” the project and create a bot of your own.

Maybe you heard about MySpace, or even experienced it. Unlike today’s social media, MySpace allowed users to fully customize their profiles using custom CSS and HTML. This feature, which was originally a bug, lead to the notorious busy, tasteless user profiles with autoplaying music. While you may sneer at MySpace today, keep in mind that it [raised a whole generation of web developers](https://www.codecademy.com/resources/blog/myspace-and-the-coding-legacy/) – many people were exposed to programming thanks to MySpace’s fortunate bug. And it’s where [SpaceHey](https://spacehey.com/) aims to be MySpace’s successor, a “retro social network” which allows users to fully modify their profiles.

{% figure "slide50.png", "SpaceHey profile of user _n_0r_a, with loud red colors and multitude of animated GIFs." %}
Example of profile customization on SpaceHey ([check it out](https://spacehey.com/profile?id=2453593) to fully appreciate the animations and custom cursor).
{% endfigure %}

Speaking of social media and the peripheral web, I must mention the Fediverse. There’s [Mastodon](https://joinmastodon.org/) as a non-profit, decentralized microblogging platform, but that’s just the tip of the iceberg. There’s a multitude of server software and instances running that software, all with different features and different communities, but all still able to talk to each other. I will just point you to a few resources: [fediverse.info](https://fediverse.info/) with a basic explanation, [Fediverse Observer](https://fediverse.observer/) and [to the Fediverse](https://www.fediverse.to/) to view different instances, and [Fediverse Party](https://fediverse.party/) to check out various federating applications.

### What can I do?

Okay, so no you have plenty of resources you to discover this world wild web, but what you can do with it? Let me break it down into three categories: read, curate, and created.

#### Read

I love the recommendation to just **click around and find out**[^faround]:

[^faround]: Yeah, it’s a reference to “[FAFO](https://en.wiktionary.org/wiki/fuck_around_and_find_out)” – but without negative consequences.

{% figquote "[John J. Hoare: Click Around, Find Out](https://www.dirtyfeed.org/2024/01/click-around-find-out/)", "https://www.dirtyfeed.org/2024/01/click-around-find-out/#:~:text=If%20you%20care,much%20about%20it." %}
If you care about the indie web growing, by all means write, by all means create, by all means curate. But most of all, just read. Or listen, or experience. Spend an afternoon clicking around, like everybody used to. The more people who do that, the more everything else will slot into place without even having to think much about it.
{% endfigquote %}

And when you are clicking around, you may as well read. And if you stumble upon someone’s blog and you enjoy their writing, you may as well add their blog to an RSS reader, so you can check if they write something in the future.

What’s that, RSS feeds? Yeah, the technology which was pronounced dead (mostly [thanks to demise of Google Reader](https://www.theverge.com/23778253/google-reader-death-2013-rss-social)) is [very much alive](http://isrssdead.com/). Let’s see, how many of you are using an RSS reader? _Only a few hands raised._ And how many of you listen to podcasts? _Majority of people raised hands._ So you are using RSS feeds as well.

The technology faded into the background, becoming the reliable plumbing of the web. RSS readers let you be mindful about the content you consume and don’t trap you into an endless scrolling just to show you more ads.

Good place to start with RSS feeds is [About Feeds](https://aboutfeeds.com/).

#### Curate

While you’re reading interesting content, you may as well collect it and share it with others. You don’t need anything fancy, a simple list you post somewhere will suffice. For example, back in 2013 I noticed that people are putting various lists of resources on GitHub, so I naturally [created a list of such lists](https://github.com/jnv/lists); it’s just a single Markdown file and occasionally I still add something new there.

If you prefer something more social or simpler for maintenance, there’s for example [Are.na](https://www.are.na/), which lets you curate images and text into various channels. Yes, it’s sort of like Pinterest but without crap.

{% figure "slide58.png", "SpaceHey profile of user _n_0r_a, with loud red colors and multitude of animated GIFs." %}
One of my favorite Are.na channels is the [collection of fruit crate labels](https://www.are.na/kyle-levy/fruit-crate-labels).
{% endfigure %}

#### Create

Perhaps you now have an itch to create something on the web yourself.

Make yourself a homepage which shows your personality, or at least contact details. It can be complex and playful as [nuel’s](https://nuel.pw/), or extremely simple and boring [as mine](https://jan.vlnas.cz/).

Create a [single-serving site](https://en.wikipedia.org/wiki/Single-serving_site). Just to give you a few examples:

- This one asks [Is it Friday yet?](http://isitfridayyet.net/)
- This one [makes everything OK](https://make-everything-ok.com/)
- Czechs and Slovaks probably know <a href="http://milujipraci.cz/" hreflang="cs" lang="cs">Miluji práci</a> (I love my job); it’s actually very <acronym title="not safe for work">NSFW</acronym> soundboard

Last year I also made a single-serving site of my own to [track whether Twitter’s API is free](/is-twitter-api-free/). It didn’t become a viral sensation but it was fun to build. I let the domain expire, but the page is [archived on GitHub](https://jnv.github.io/istwitterapifree.com/).

If you want to start or return to blogging, I particularly like the advice to [treat a blog as a brain dump](https://btxx.org/posts/dump/). If you don’t feel like buying a domain (just yet), there are many blogging platforms for there – but hold on, before you sign up on Substack, check out some of these:

- [Write.as](https://write.as/) is a hosted version of open-source project [WriteFreely](https://writefreely.org/) which can also bring your blog to the fediverse
- [Micro.blog](https://micro.blog/) despite its name is also good for “macro” blogging; while it’s paid, it has also community features and federates with the Fediverse
- [Bear Blog](https://bearblog.dev/) is my favorite for its plain looks and straightforwardness
- [Prose](https://prose.sh/) is a blog hosting service which belongs under [pico](https://pico.sh/), a collection of services using SSH (so you `scp` your blog to the server)

For more options, check out [list of blogging platforms from Jason Velazquez](https://micro.fromjason.xyz/2024/01/06/blogging-platforms.html).

And if you decide to (re)start blogging, Jason Kottke has a message for you:

{% figquote "[Tweet from Jason Kottke](https://twitter.com/jkottke/status/505405730367627264), August 29, 2014", "https://twitter.com/jkottke/status/505405730367627264" %}
Oh you’re blogging again? Cute. WELCOME BACK MOTHERFUCKERS.
{% endfigquote %}

### Wrap up

I want to end with quote from Tim Berners-Lee:

{% figquote "[Tim Berners-Lee: Answers for Young People](https://www.w3.org/People/Berners-Lee/Kids.html)", "https://www.w3.org/People/Berners-Lee/Kids.html#:~:text=So%20what%20is%20made%20of%20the,to%20help%20people%20understand%20each%20other." %}
What is made of the Web is up to us. You, me, and everyone else. […]

Let’s use the web to create neat new exciting things.

Let’s use the Web to help people understand each other.
{% endfigquote %}

So, here’s what I want you to do:

1. Click around and find out.
2. Start curating stuff into a list.
3. Create your homepage.

Let’s create some new, exciting things on the web, for the web.

## Resources

### Discovery

#### Search Engines

- [Stract](https://stract.com/)
- [Wiby](https://wiby.me/)
- [Marginalia](https://search.marginalia.nu/)
- [Feedle](https://feedle.world/)
- [Kagi](https://kagi.com/)

#### Directories

- [Curlie](https://curlie.org)
- [Personalsit.es](https://personalsit.es)
- [Ooh.directory](https://ooh.directory)

#### Webrings

- [Webring List](https://brisray.com/web/webring-list.htm)
- [a11y webring club](https://a11y-webring.club/)
- [Hotline Webring](https://hotlinewebring.club/) (no longer accepting new sites)
- [TheOldNet WebRing](https://webring.theoldnet.com/)
- [CSS Joy](https://cs.sjoy.lol/)
- [Geekring](https://geekring.net/)

#### Communities

- [Neocities](https://neocities.org/)
- [Glitch](https://glitch.com/)
- [SpaceHey](https://spacehey.com/)
- Fediverse
  - [fediverse.info](https://fediverse.info/)
  - [Fediverse Observer](https://fediverse.observer/)
  - [Fediverse Party](https://fediverse.party/)
  - [To the Fediverse](https://www.fediverse.to/)

### What can I do?

#### Read

- [Click around, find out](https://www.dirtyfeed.org/2024/01/click-around-find-out/)
- RSS feeds
  - [Is RSS dead?](http://isrssdead.com/)
  - [About Feeds](https://aboutfeeds.com/)

### Curate

- [Are.na](https://www.are.na/)
- [Raindrop](https://raindrop.io)
- [My list of lists](https://github.com/jnv/lists)

### Create

- Single-serving sites
  - [Tired.com](http://tired.com/)
  - [Zombo.com](http://zombo.com)
- Blogs
  - [Get blogging!](https://getblogging.org/)
  - [Start a fucking blog](https://startafuckingblog.com/) (contains strong language)
  - [Jason’s list of blogging platforms](https://micro.fromjason.xyz/2024/01/06/blogging-platforms.html)

### Additional reading

- [Motherfucking website](https://motherfuckingwebsite.com/) (contains strong language)
- [Where have all the websites gone?](https://www.fromjason.xyz/p/notebook/where-have-all-the-websites-gone/) by Jason Velazquez
- [Where have all the flowers gone?](https://daverupert.com/2024/01/where-have-all-the-websites-gone/) by Dave Rupert (reply to Jason’s post)
- [The Internet Is About to Get Weird Again](https://www.rollingstone.com/culture/culture-commentary/internet-future-about-to-get-weird-1234938403/) by Anil Dash
- [Why the Internet Isn’t Fun Anymore](https://www.newyorker.com/culture/infinite-scroll/why-the-internet-isnt-fun-anymore) by Kyle Chayka
- [The Web Is Fucked](https://thewebisfucked.com/) (contains strong language)

#### Indie web, Small web et al.

- [Yesterweb](https://yesterweb.org/)
- [IndieWeb](https://indieweb.org)
- Small web
  - [What is the Small Web?](https://ar.al/2020/08/07/what-is-the-small-web/) by Aral Balkan
  - [The small web is beautiful](https://benhoyt.com/writings/the-small-web-is-beautiful/) by Ben Hoyt
  - [Rediscovering the Small Web](https://neustadt.fr/essays/the-small-web/) by Parimal Satyal
  - [web0 manifesto](https://web0.small-web.org/)
- smol web
  - [what is the smol web?](https://erock.prose.sh/what-is-the-smol-web) by Eric Bower
  - [smolweb](https://smolweb.org/)
- slow web
  - [The Slow Web Initiative](https://www.slowweb.io/)
  - [“Slow web” entry on IndieWeb wiki](https://indieweb.org/slow_web)
- [SmolNet](https://communitywiki.org/wiki/SmolNet)

[doctorow_tiktok]: https://pluralistic.net/2023/01/21/potemkin-ai/#hey-guys
[oatmeal]: https://theoatmeal.com/comics/reaching_people
