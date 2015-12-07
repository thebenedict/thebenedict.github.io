---
layout: post
title:  "Sema difference? English and Swahili news coverage of the 2015 general election in Tanzania"
date:   2015-12-04 16:29:18 +0300
categories: media nlp
---

> Yes, this great East African country has been among the countries with the
> best media freedom conditions in the world. 
>
> <footer>-- Daily News (government-owned Tanzanian newspaper) in an article with no byline<footer>

> It seems that the media will never be free from the clutches of the government.
> The laws imposed on the media are strict and makes it practically impossible
> for journalists to do their job.
>
> <footer>-- The Citizen (foreign-owned Tanzanian newspaper) in an article with no byline</footer>

[PHOTO: Zanzibar men looking at headlines]

If you find yourself in Tanzania and can’t read the headlines above, hakuna matata: major publishers here offer both English and Swahili language dailies. Late last summer as media coverage ramped up around the now-concluded general election, I started to wonder how much it matters that I read the news in a different language than most Tanzanians. Were there differences in coverage in English vs. Swahili, or between publishing houses? Were foreigners reading the same news as locals, and could I figure out a way to measure the differences?

Analysis of almost 9000 articles showed that election coverage was the primary focus of Tanzanian print media this Fall, especially in Swahili. Unsurprisingly the ruling party and topics favorable to the Tanzanian government received the most coverage in government-owned publications. I didn’t find an obvious difference in which topics were covered in English vs. Swahili, but Election-related terms appeared more often in Swahili. I think this consistency between languages reflects well on the Tanzanian media. Experiments with topic modeling highlighted some unexpected aspects of the election coverage, including a dominant focus on political promises and electoral policy and procedures.

What election?
On October 25 Tanzania held its 5th general election since 1992, electing John Magufuli as President by a 58% majority. Dr. Magufuli represented the ruling party CCM (Chama Cha Mapinduzi), and defeated Edward Lowassa, the candidate for opposition party CHADEMA (Chama cha Demokrasia na Maendeleo). It was a lively campaign but CCM’s victory was expected, and the transition of power from former president Jakaya Kikwete was smooth and generally peaceful. 

[Photos: Magufuli, CCM logo, Lowassa, CHADEMA Logo]

A wrinkle worth mentioning happened in Zanzibar, which runs its own presidential election in parallel with the mainland. Amid rumors of an opposition victory the CCM-dominated Zanzibar Electoral Commission (ZEC) annulled the election result on October 28, citing irregularities. The move was widely criticized and left Zanzibar in an uncertain political situation that is still unresolved.

3 publishers, 6 newspapers
Tanzania has an active media landscape including over 30 print publications that vary widely in scope and quality. Conveniently the 3 most prominent publishing houses each produce a daily newspaper in English and Swahili, so these 6 papers were an obvious choice for this project. The Kenya-based Nation Media Group publishes The Citizen (EN) and Mwananchi (SW), Tanzanian-owned IPP Media publishes The Guardian (EN) and Nipashe (SW), and government-owned TSN (Tanzanian Standard Newspapers) publishes the Daily News (EN) and Habarileo (SW). Here they are in a table:

[table of publishers’ EN/SW newspapers]

The setup
On September 14, 2015 I set up scrapers to download all articles linked from the front page of these 6 newspapers’ websites. The scrapers were built in python with scrapy and ran twice daily, with deduplication done in post-processing. The election was held on October 25, and by mid-November the scrapers had accumulated almost 9000 articles: about 4900 in English and 3900 in Swahili. I used Python to clean and organize the scraped articles, and looked at the data in 3 ways:

Counted terms of interest by language and publication
Manually compared selected English and Swahili headlines
Experimented with topic modeling using Latent Dirichlet Allocation (LDA) on the English articles

Counting terms
I selected some key terms related to the election, plus a few more general terms for comparison, and counted the number of times they were mentioned over two months from September 15 - November 15.

[Table of terms]
[Table of ratios]

Election-related terms were consistently mentioned more in Swahili than English, often by at least a factor of 2, and absolute counts were high across all publications. Ruling party CCM and candidate [Joeseph] Magufuli were mentioned more than opposition party CHADEMA/UKAWA and candidate [Edward] Lowassa. This was true for all publications, but the difference was largest for the TSN (government-owned) papers Daily News and Habarileo. For example, Magufuli was mentioned 3.6 times as often as Lowassa by TSN, vs 2.2 times as often in IPP Media publications. TSN mentioned CCM 1.8 times as often as CHADEMA and UKAWA combined. Their coverage of Zanzibar stands out as the only case where an election-related term was mentioned more in English (Daily News) than Swahili (Habarileo).

Some academic studies of media bias normalize term counts, for example as counts per 10,000 words or as a fraction of words published. I briefly played with these techniques and didn’t find them useful for highlighting trends between publications, especially on days when few articles were published, so the tables and charts here use absolute counts.

Reading the headlines
Manually reading headlines around controversial events helps put these term counts in context. It’s not quantitative, but coverage of political scandals can be more revealing of a publication’s editorial bias than topic selection. Headlines are also how many people in Tanzania get their news: the photo at the top of this post is a common scene.

The Zanzibar election annulment on October 28 is a good example because it’s a discrete, high profile and polarizing event. Ben Taylor (@mtega), a blogger and consultant with TZ civil society organization Twaweza, graciously helped with translations from Swahili to English. Here are the headlines from all articles scraped on October 30 (2 days after the annulment) that mention Zanzibar:

Citizen:
Congrats, Dr Magufuli; we now must move on
CUF: No need to conduct fresh polls in Zbar
EAC releases poll result report 
Forge a democratic Zanzibar, Moyo tells CCM 
Peace resumes after tense 3 days in Zanzibar 
Pressure mounts on ZEC to reverse decision on polls
Take leadership responsibility, Maalim Seif asks Kikwete, Shein  
What it’ll cost to repeat Zbar polls

Mwananchi *
Congratulations Dr. Magufuli, take this into account
Lowassa contests Dr Magufuli presidency
Maalim Seif orders Jakaya Kikwete and Shein to stand for peace
Magufuli 2015
Observers put pressure on ZEC

Guardian
Final Whistle: Magufuli is President
Situation in Zanzibar sure cause for worry
Six Zanzibar presidential candidates fault  ZEC on election results rulling
Status of tuna fisheries in Tanzania under spotlight
UK, observers call upon ZEC to resume tabulation process

Nipashe *
Maalim Seif: What ZEC has done is a revolution
Nine hard questions on the Zanzibar elections
Nine houses burned down on Zanzibar while Magufuli is announced as the winner
ZEC will take the blame if Zanzibar becomes violent

Daily News
Businesses open in Isles after a weeks lull
Let us all give Magufuli full support
Observers hail Tanzania over peaceful polls
PBZ posts 2.19bn/- profit for July-Sept
Peaceful elections? The people have shown the way!
Tanzania Postal Bank makes 1.88bn/- profit in Q3
TSA picks constitutional amendment committee

Habarileo *
Election challenges should be settled peacefully
Human rights organization wants to assist ZEC
Stone town's valued architectural art
Quiet returns to Zanzibar

* Translated from Swahili

There’s unavoidable subjectivity in interpreting these, but two trends stand out to me. First, consistent with the word counts above, TSN is pro-government and pro-CCM, while IPP Media is pro-opposition and Nation is more centrist. This isn’t surprising (government-owned media supports the government, foreign-owned publisher less opinionated, nobody shocked), but it does make for colorful comparisons. Two days after a major story the Guardian calls Zanzibar a “sure cause for worry” and Nipashe speculates on what will happen if Zanzibar becomes violent, while the Daily News hails “Peaceful Elections” and Habarileo runs a fluffy piece about Zanzibari architecture. You’ll see a similar pattern most days.

Second, and more positive, is that for each publisher there doesn’t appear to be a major difference between their coverage of important current events in English vs Swahili. If anything Swahili headlines are more emotionally charged. In the example above Nipashe discusses houses burning, violence, revolution (though the word has less volatile connotations in Swahili) and asks hard questions. It’s impressive to see strong dissenting viewpoints in a major local language publication.

Topic modeling
Word counts turned out to be a simple if rough way to quantify topic coverage, but counts can’t incorporate word sense or context. Latent Dirichlet Allocation (LDA) is a computational technique for discovering groups of words that represent topics covered by a collection of documents. It is often applied to find topics in large, unstructured texts, for example Sarah Palin’s leaked emails in 2011 (this page also links to a good general discussion of LDA). In the end LDA wasn’t especially useful, but worth including because it highlighted two aspects of the overall election coverage that I didn’t expect.

I ran LDA on the English language articles, n = 4935. I used NLTK and Gensim to clean the text (downcase, remove punctuation/white space/stop words, and identify common bigrams), and then ran Gensim’s LDA implementation with k = 100. k is an LDA parameter which represents the number of topics and is often chosen heuristically. I then manually reviewed each topic and assigned it a label. For example a topic including these words:

players, stars, team, taifa_stars, tournament, mkwasa, tanzania, dar_es, teams, match

was labeled “sports”. I then used the LDA model to assign these labels to articles based on the most strongly represented topics in each article.

Unfortunately most of the topics discovered by LDA, at least at my level of skill with the technique, were  too general (e.g. “wildlife”) or too specific (e.g. “stampede during the Hajj”) to help identify editorial differences. Still, two stand out as noteworthy.

The most frequently occurring topic in Daily News and Habarileo, and second most frequent overall, was labeled “political promises”. It Iooks like this:

  government, would, people, dr_magufuli, ensure, country, residents, water, promised, area

Many articles strongly represented by this topic have headlines like:

Lowassa: I'll make Tanzania land of milk, honey
Dr Shein vows to uphold Union as CCM launches campaign in Zanzibar
Tanzanians like to see real development, says Magufuli

This is neat because LDA turned out to be good at unsupervised identification of political promises, and a little surprising because most Tanzanians don’t have faith in politicians’ promises. Apparently they still like to read about them.

Another interesting topic I labeled “election process”. Its terms include:

election, nec (national electoral comission), vote, people, political_parties, polling_stations, peace, country, campaigns

and some typical headlines:

Why NEC needs to act fairly to all
General Election campaigns should be smooth, peaceful
IGP warns parties' security groups over 'grabbing' of powers of police
NEC working on problems in voter registration

This topic was among the top 10 for each publication, and 4th most common overall. There’s room for interpretation, but I think this shows a media focus on the procedures and mechanics of the election. It suggests a lively interest in the electoral process from a young democracy during its 5th multi-party general election.

Wrapping up
When I started this project I thought it would be an opportunity to learn more about algorithms from text analytics, but simple tools ended up being able to identify high level trends. While the analysis surfaced some interesting features of the election coverage, overall topic coverage in English and Swahili publications seems similar. I don’t think it would be valuable to probe for more subtle differences with computational techniques alone.

Many academic studies of media bias use human labeling to supplement results from LDA and other machine learning approaches. If I were to take this project further, for example to examine what topic coverage is associated with the high counts of election-related words in Swahili, I would start by having human readers label articles. I’d only look to topic models or machine classification if trends were still unclear, or I wanted to try and generalize the results to new articles.
