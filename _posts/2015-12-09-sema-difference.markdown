---
layout: post
title: "Sema difference? English and Swahili news coverage of the 2015 general election in Tanzania"
date: 2015-12-09 16:29:18 +0300
categories: projects
og_image_path: /images/sema-difference/reading-headlines.jpg
custom_js:
- nv.d3
- count-charts
---

{% include image.html url="/images/sema-difference/reading-headlines.jpg" caption="Men in Stone Town, Zanzibar read headlines on Oct 14, 2015, about 10 days before the election" %}

> Yes, this great East African country has been among the countries with the
> best media freedom conditions in the world. 
>
> <footer>&mdash; <a href="http://www.dailynews.co.tz/index.php/features/42710-tanzania-scores-high-in-media-freedom">Daily News</a> (government-owned Tanzanian newspaper) in an article with no byline<footer>

> It seems that the media will never be free from the clutches of the government.
> The laws imposed on the media are strict and makes it practically impossible
> for journalists to do their job.
>
> <footer>&mdash; <a href="http://www.thecitizen.co.tz/Sunday/Press-freedom-restrictions-deny-citizens-information/-/1841668/2094730/-/thnfaz/-/index.html">The Citizen</a> (foreign-owned Tanzanian newspaper) in an article with no byline</footer>

If you find yourself in Tanzania and can’t read the headlines above, <span class="non-english">hakuna matata</span>. Major publishers here offer both English and Swahili language dailies. Last summer as media coverage ramped up around the now-concluded general election, I started to wonder how much it matters that I, an english-speaking foreigner, read the news in a different language than most Tanzanians. Were there differences in coverage in English vs. Swahili, or between publishing houses? Were foreigners getting the same news as locals, and could I figure out a way to measure the difference?

Analysis of almost 9000 articles showed that election coverage was the primary focus of Tanzanian print media this Fall, especially in Swahili. Unsurprisingly the ruling party and topics favorable to the Tanzanian government received the most coverage in government-owned publications. I didn’t find an obvious difference in which topics were covered in English vs. Swahili, but Election-related terms appeared more often in Swahili. I think this consistency between languages reflects well on the Tanzanian media. Experiments with topic modeling highlighted some unexpected aspects of the election coverage, including a dominant focus on political promises and electoral policy and procedures.

### What election?
On October 25 Tanzania held its 5th general election since 1992, electing John Magufuli as President by a 58% majority. Dr. Magufuli represented the ruling party CCM (Chama Cha Mapinduzi), and defeated Edward Lowassa, the candidate for opposition party CHADEMA (Chama cha Demokrasia na Maendeleo). [It was a lively campaign](http://www.bbc.com/news/world-africa-34599144) but CCM’s victory was expected, and the transition of power from former president Jakaya Kikwete was smooth and generally peaceful. 

<div class="image-wrapper">
  <img class="inline-image" src="/images/sema-difference/magufuli.jpg">
  <img class="inline-image" src="/images/sema-difference/lowassa.jpg">
  <div class="caption">CCM candidate and current President of Tanzania John Magufuli on the left, CHADEMA candidate Edward Lowassa on the right.</div>
</div>

A wrinkle worth mentioning happened in Zanzibar, which runs its own presidential election in parallel with the mainland. Amid rumors of an opposition victory the CCM-dominated Zanzibar Electoral Commission (ZEC) [annulled the election result](https://www.washingtonpost.com/news/monkey-cage/wp/2015/11/01/in-zanzibar-democracy-peace-and-unity-are-at-stake-after-annulled-elections/) on October 28, citing irregularities. The move was [widely criticized](http://tanzania.usembassy.gov/pr_10282015a.html) and left Zanzibar in an uncertain political situation that is still unresolved.

### 3 publishers, 6 newspapers
Tanzania has an active media landscape including over 30 print publications that vary widely in scope and quality. Conveniently the 3 most prominent publishers  each produce a daily newspaper in English and Swahili, so these 6 papers were an obvious choice for this project. The Kenya-based Nation Media Group publishes The [Citizen](http://thecitizen.co.tz) (EN) and [Mwananchi](http://mwananchi.co.tz) (SW), Tanzanian-owned IPP Media publishes [The Guardian](http://www.ippmedia.com/?m=54&lang=EN) (EN) and [Nipashe](http://www.ippmedia.com/?m=54&lang=SW) (SW), and government-owned TSN (Tanzanian Standard Newspapers) publishes the [Daily News](http://dailynews.co.tz/) (EN) and [Habarileo](http://habarileo.co.tz) (SW). Here they are in a table:

<div class="scrollable-table-wrapper">
  <table class="publisher-table">
    <thead>
      <th></th>
      <th>English</th>
      <th class="sw">Swahili</th>  
    </thead>
    <tbody>
      <tr class="with-header">
        <td>Nation Media</td>
        <td class="nation">Citizen</td>
        <td class="nation sw">Mwananchi</td>
      </tr>
      <tr class="with-header">
        <td>IPP Media</td>
        <td class="ipp">Guardian</td>
        <td class="ipp sw">Nipashe</td>
      </tr>
      <tr class="with-header">
        <td>TSN</td>
        <td class="tsn">Daily News</td>
        <td class="tsn sw">Habarileo</td>
      </tr>
    </tbody>
  </table>
</div>

<p><div class="caption">The 6 newspapers used for this project. Nation Media is foreign-owned, IPP Media is owned by a wealthy Tanzanian, and TSN is controlled by the government of Tanzania.</div></p>

### The setup
On September 14, 2015 I set up scrapers to download all articles linked from the front page of these 6 newspapers’ websites. The scrapers were built in python with [scrapy](http://scrapy.org) and ran twice daily, with deduplication done in post-processing. The election was held on October 25, and by mid-November the scrapers had accumulated almost 9000 articles: about 4900 in English and 3900 in Swahili. I used Python to clean and organize the scraped articles, and looked at the data in 3 ways:

  1. Counted terms of interest by language and publication
  2. Manually compared selected English and Swahili headlines
  3. Experimented with topic modeling using Latent Dirichlet Allocation (LDA) on the English articles

### Counting terms
I selected some key terms related to the election, plus a few more general terms for comparison, and counted the number of times they were mentioned over two months from September 15 - November 15.

<div class="select-wrapper">
  <div class="label">Daily counts for</div>
  <select id="chart-select">
    <option value="magufuli-magufuli">Magufuli</option>
    <option value="lowassa-lowassa">Lowassa</option>
    <option value="ccm-ccm">CCM</option>
    <option value="ukawa-ukawa">UKAWA</option>
    <option value="chadema-chadema">CHADEMA</option>
    <option value="zanzibar-zanzibar">Zanzibar</option>
    <option value="uchaguzi-election">election (uchaguzi)</option>
    <option value="rushwa-corruption">corruption (rushwa)</option>
    <option value="michezo-sports">sports (michezo)</option>
    <option value="kenya-kenya">Kenya</option>
  </select>
</div>

<div id="chart-wrapper"></div>
<div class="caption">Counts of the selected term from September 15 - November 15, with English publications above the x-axis and Swahili publications below. Select different terms from the dropdown, and click the legend to toggle publications.</div>

Election-related terms were consistently mentioned more in Swahili than English, often by at least a factor of 2, and absolute counts were high across all publications. Ruling party CCM and candidate [Joeseph] Magufuli were mentioned more than opposition party CHADEMA/UKAWA and candidate [Edward] Lowassa. This was true for all publications, but the difference was largest for the TSN (government-owned) papers Daily News and Habarileo. For example, Magufuli was mentioned 3.6 times as often as Lowassa by TSN, vs 2.2 times as often in IPP Media publications. TSN mentioned CCM 1.8 times as often as CHADEMA and UKAWA combined. Their coverage of Zanzibar stands out as the only case where an election-related term was mentioned more in English (Daily News) than Swahili (Habarileo).

<div class="select-wrapper">
  <div class="label">Select a publisher:</div>
  <select id="table-select">
    <option value="nation">Nation media (Kenya-owned)</option>
    <option value="ipp">IPP media (TZ independent)</option>
    <option value="tsn">TSN (TZ government)</option>
    <option value="totals">EN/SW totals</option>
  </select>
</div>

<div class="scrollable-table-wrapper">
  <table id="nation" class="summary-table table-compressed table-full-width">
    <thead>
      <th></th>
      <th class="nation">Citizen</th>
      <th class="nation sw">Mwananchi</th>
      <th>Total</th>
      <th>Citizen/Mwananchi</th>
    </thead>
    <tbody>
      <tr><td>Magufuli</td><td>644</td><td>1164</td><td>1808</td><td>0.55</td></tr>
      <tr><td>Lowassa</td><td>457</td><td>928</td><td>1385</td><td>0.49</td></tr>
      <tr><td>CCM</td><td>1101</td><td>2007</td><td>3108</td><td>0.55</td></tr>
      <tr><td>UKAWA</td><td>292</td><td>596</td><td>888</td><td>0.49</td></tr>
      <tr><td>CHADEMA</td><td>614</td><td>1087</td><td>1701</td><td>0.56</td></tr>
      <tr><td>Zanzibar</td><td>425</td><td>578</td><td>1003</td><td>0.74</td></tr>
      <tr><td>election/uchaguzi*</td><td>1322</td><td>2259</td><td>3581</td><td>0.59</td></tr>
      <tr class="shaded"><td>corruption/rushwa*</td><td>237</td><td>171</td><td>408</td><td>1.39</td></tr>
      <tr class="shaded"><td>sports/michezo*</td><td>126</td><td>138</td><td>264</td><td>0.91</td></tr>
      <tr class="shaded"><td>Kenya</td><td>345</td><td>127</td><td>472</td><td>2.72</td></tr>
    </tbody>
  </table>

  <table id="ipp" class="summary-table table-compressed table-full-width">
    <thead>
      <th></th>
      <th class="ipp">Guardian</th>
      <th class="ipp sw">Nipashe</th>
      <th>Total</th>
      <th>Guardian/Nipashe</th>
    </thead>
    <tbody>
      <tr><td>Magufuli</td><td>326</td><td>1099</td><td>1860</td><td>0.30</td></tr>
      <tr><td>Lowassa</td><td>267</td><td>683</td><td>853</td><td>0.39</td></tr>
      <tr><td>CCM</td><td>733</td><td>1828</td><td>2801</td><td>0.40</td></tr>
      <tr><td>UKAWA</td><td>172</td><td>433</td><td>574</td><td>0.40</td></tr>
      <tr><td>CHADEMA</td><td>467</td><td>1007</td><td>1334</td><td>0.46</td></tr>
      <tr><td>Zanzibar</td><td>501</td><td>744</td><td>1266</td><td>0.67</td></tr>
      <tr><td>election/uchaguzi*</td><td>889</td><td>2134</td><td>3176</td><td>0.42</td></tr>
      <tr class="shaded"><td>corruption/rushwa*</td><td>128</td><td>169</td><td>322</td><td>0.76</td></tr>
      <tr class="shaded"><td>sports/michezo*</td><td>143</td><td>114</td><td>454</td><td>1.25</td></tr>
      <tr class="shaded"><td>Kenya</td><td>170</td><td>68</td><td>338</td><td>2.50</td></tr>
    </tbody>
  </table>

  <table id="tsn" class="summary-table table-compressed table-full-width">
    <thead>
      <th></th>
      <th class="tsn">Daily News</th>
      <th class="tsn sw">Habarileo</th>
      <th>Total</th>
      <th>Daily News/Habarileo</th>
    </thead>
    <tbody>
      <tr><td>Magufuli</td><td>761</td><td>1205</td><td>1966</td><td>0.63</td></tr>
      <tr><td>Lowassa</td><td>170</td><td>371</td><td>541</td><td>0.46</td></tr>
      <tr><td>CCM</td><td>973</td><td>1013</td><td>1986</td><td>0.96</td></tr>
      <tr><td>UKAWA</td><td>141</td><td>169</td><td>310</td><td>0.83</td></tr>
      <tr><td>CHADEMA</td><td>327</td><td>484</td><td>811</td><td>0.68</td></tr>
      <tr><td>Zanzibar</td><td>522</td><td>459</td><td>981</td><td>1.14</td></tr>
      <tr><td>election/uchaguzi*</td><td>1042</td><td>1897</td><td>2939</td><td>0.55</td></tr>
      <tr class="shaded"><td>corruption/rushwa*</td><td>153</td><td>217</td><td>370</td><td>0.71</td></tr>
      <tr class="shaded"><td>sports/michezo*</td><td>340</td><td>313</td><td>653</td><td>1.09</td></tr>
      <tr class="shaded"><td>Kenya</td><td>270</td><td>183</td><td>453</td><td>1.48</td></tr>
    </tbody>
  </table>

  <table id="totals" class="summary-table table-compressed table-full-width">
    <thead>
      <th></th>
      <th class="">Total (EN)</th>
      <th class="sw">Total (SW)</th>
      <th>Total (EN)/Total (SW)</th>
    </thead>
    <tbody>
      <tr><td>Magufuli</td><td>1731</td><td>3468</td><td>0.50</td></tr>
      <tr><td>Lowassa</td><td>894</td><td>1982</td><td>0.45</td></tr>
      <tr><td>CCM</td><td>2807</td><td>4848</td><td>0.58</td></tr>
      <tr><td>UKAWA</td><td>605</td><td>1198</td><td>0.51</td></tr>
      <tr><td>CHADEMA</td><td>1408</td><td>2578</td><td>0.55</td></tr>
      <tr><td>Zanzibar</td><td>1448</td><td>1781</td><td>0.81</td></tr>
      <tr><td>election/uchaguzi*</td><td>3253</td><td>6290</td><td>0.52</td></tr>
      <tr class="shaded"><td>corruption/rushwa*</td><td>518</td><td>557</td><td>0.93</td></tr>
      <tr class="shaded"><td>sports/michezo*</td><td>609</td><td>565</td><td>1.08</td></tr>
      <tr class="shaded"><td>Kenya</td><td>785</td><td>378</td><td>2.08</td></tr>
    </tbody>
  </table>
</div>

<p><div class="caption">Comparison of term counts in English and Swahili. For pairs marked * the English word was counted in English language publications, and the Swahili word in Swahili publications. Shaded rows are terms not directly related to the election, provided for comparison.</div></p>

Some academic studies of media bias normalize term counts, for example as counts per 10,000 words or as a fraction of words published. I briefly played with these techniques and didn’t find them useful for highlighting trends between publications, especially on days when few articles were published, so the tables and charts here use absolute counts.

### Reading the headlines
Manually reading headlines around controversial events helps put these term counts in context. It’s not quantitative, but [coverage of political scandals can be more revealing](http://papers.ssrn.com/sol3/papers.cfm?abstract_id=2526461) of a publication’s editorial bias than topic selection. Headlines are also how many people in Tanzania get their news: the photo at the top of this post is a common scene.

The Zanzibar election annulment on October 28 is a good example because it’s a discrete, high profile and polarizing event. Ben Taylor ([@mtega](https://twitter.com/mtega)), a [blogger](http://mtega.com/) and consultant with TZ civil society organization [Twaweza](http://www.twaweza.org/), graciously helped with translations from Swahili to English. The list below shows headlines from all articles scraped on October 30 (2 days after the annulment) that mention Zanzibar. There’s unavoidable subjectivity in interpreting them, but two trends stand out.

First, consistent with the word counts above, TSN is pro-government and pro-CCM, IPP Media is pro-opposition and Nation is more centrist. This isn’t surprising (government-owned media supports the government, foreign-owned publisher less opinionated, nobody shocked), but it does make for colorful comparisons. Two days after a major story the Guardian calls Zanzibar a “sure cause for worry” and Nipashe speculates on what will happen if Zanzibar becomes violent, while the Daily News hails “Peaceful Elections” and Habarileo runs a fluffy piece about Zanzibari architecture. You’ll see a similar pattern most days.

<div class="headline-container">
  <div class="headlines nation">
    <div class="pub-name">Citizen</div>
    <ul>
      <li>Congrats, Dr Magufuli; we now must move on</li>
      <li>CUF: No need to conduct fresh polls in Zbar</li>
      <li>EAC releases poll result report </li>
      <li>Forge a democratic Zanzibar, Moyo tells CCM </li>
      <li>Peace resumes after tense 3 days in Zanzibar </li>
      <li>Pressure mounts on ZEC to reverse decision on polls</li>
      <li>Take leadership responsibility, Maalim Seif asks Kikwete, Shein  </li>
      <li>What it’ll cost to repeat Zbar polls</li>
    </ul>
  </div>
  <div class="headlines nation sw">
    <div class="pub-name">Mwananchi *</div>
    <ul>  
      <li>Congratulations Dr. Magufuli, take this into account</li>
      <li>Lowassa contests Dr Magufuli presidency</li>
      <li>Maalim Seif orders Jakaya Kikwete and Shein to stand for peace</li>
      <li>Magufuli 2015</li>
      <li>Observers put pressure on ZEC</li>
    </ul>
  </div>
</div>

<div class="headline-container">
  <div class="headlines ipp">
    <div class="pub-name">Guardian</div>
    <ul>
      <li>Final Whistle: Magufuli is President</li>
      <li>Situation in Zanzibar sure cause for worry</li>
      <li>Six Zanzibar presidential candidates fault  ZEC on election results rulling</li>
      <li>Status of tuna fisheries in Tanzania under spotlight</li>
      <li>UK, observers call upon ZEC to resume tabulation process</li>
    </ul>
  </div>
  <div class="headlines ipp sw">
    <div class="pub-name">Nipashe *</div>
    <ul>  
      <li>Maalim Seif: What ZEC has done is a revolution</li>
      <li>Nine hard questions on the Zanzibar elections</li>
      <li>Nine houses burned down on Zanzibar while Magufuli is announced as the winner</li>
      <li>ZEC will take the blame if Zanzibar becomes violent</li>
    </ul>
  </div>
</div>

<div class="headline-container">
  <div class="headlines tsn">
    <div class="pub-name">Daily News</div>
    <ul>
      <li>Businesses open in Isles after a weeks lull</li>
      <li>Let us all give Magufuli full support</li>
      <li>Observers hail Tanzania over peaceful polls</li>
      <li>PBZ posts 2.19bn/- profit for July-Sept</li>
      <li>Peaceful elections? The people have shown the way!</li>
      <li>Tanzania Postal Bank makes 1.88bn/- profit in Q3</li>
      <li>TSA picks constitutional amendment committee</li>
    </ul>
  </div>
  <div class="headlines tsn sw">
    <div class="pub-name">Habarileo *</div>
    <ul>  
      <li>Election challenges should be settled peacefully</li>
      <li>Human rights organization wants to assist ZEC</li>
      <li>Stone town's valued architectural art</li>
      <li>Quiet returns to Zanzibar</li>
    </ul>
  </div>
</div>
<div class="caption">All headlines from articles mentioning Zanzibar, scraped on October 30. Publications marked * are translated from Swahili.</div>

Second, and more positive, is that for each publisher there doesn’t appear to be a major difference between their coverage of important current events in English vs Swahili. If anything Swahili headlines are more emotionally charged. In the example above Nipashe discusses houses burning, violence, revolution (though the word has less volatile connotations in Swahili) and asks hard questions. It’s impressive to see strong dissenting viewpoints in a major local language publication.

### Topic modeling
Word counts turned out to be a simple if rough way to quantify topic coverage, but counts can’t incorporate word sense or context. [Latent Dirichlet Allocation](https://en.wikipedia.org/wiki/Latent_Dirichlet_allocation) (LDA) is a computational technique for discovering groups of words that represent topics covered by a collection of documents. It is often applied to find topics in large, unstructured texts, for example [Sarah Palin’s leaked emails](http://blog.echen.me/2011/06/27/topic-modeling-the-sarah-palin-emails/) in 2011 (this page also links to a good [general discussion of LDA](http://blog.echen.me/2011/08/22/introduction-to-latent-dirichlet-allocation/)). In the end it wasn’t especially useful, but worth including because it highlighted two aspects of the overall election coverage that I didn’t expect.

I ran LDA on the English language articles, n = 4935. I used [NLTK](http://www.nltk.org/) and [Gensim](https://radimrehurek.com/gensim/) to clean the text (downcase, remove punctuation/white space/stop words, and identify common bigrams), and then ran Gensim’s LDA implementation with k = 100. k is an LDA parameter which represents the number of topics and is often chosen heuristically. I then manually reviewed each topic and assigned it a label. For example a topic including these terms:

> players, stars, team, taifa_stars, tournament, mkwasa, tanzania, dar_es, teams, match

was labeled “sports”. I then used the LDA model to assign these labels to articles based on the most strongly represented topics in each article.

Unfortunately most of the topics discovered by LDA, at least at my level of skill with the technique, were  too general (e.g. “wildlife”) or too specific (e.g. “stampede during the Hajj”) to help identify editorial differences. Still, two stand out as noteworthy.

The most frequently occurring topic in Daily News and Habarileo, and second most frequent overall, was labeled “political promises”. It looks like this:

> government, would, people, dr_magufuli, ensure, country, residents, water, promised, area

Many articles strongly represented by this topic have headlines like:

  * Lowassa: I'll make Tanzania land of milk, honey
  * Dr Shein vows to uphold Union as CCM launches campaign in Zanzibar
  * Tanzanians like to see real development, says Magufuli

This is neat because LDA turned out to be good at unsupervised identification of political promises, and a little surprising because most [Tanzanians don’t have faith in politicians’ promises](http://www.twaweza.org/go/learning-note-6-politics). Apparently they still like to read about them.

Another interesting topic I labeled “election process”. Its terms include:

  > election, nec (national electoral comission), vote, people, political_parties, polling_stations, peace, country, campaigns

and some typical headlines:

  * Why NEC needs to act fairly to all
  * General Election campaigns should be smooth, peaceful
  * IGP warns parties' security groups over 'grabbing' of powers of police
  * NEC working on problems in voter registration

This topic was among the top 10 for each publication, and 4th most common overall. There’s room for interpretation, but I think this shows a media focus on the procedures and mechanics of the election. It suggests a lively interest in the electoral process from a young democracy during its 5th multi-party general election.

{% include image.html url="/images/sema-difference/posters.jpg" %}

### Wrapping up
When I started this project I thought it would be an opportunity to learn more about algorithms from text analytics, but simple tools ended up being able to identify high level trends. While the analysis surfaced some interesting features of the election coverage, overall topic coverage in English and Swahili publications seems similar. I don’t think it would be valuable to probe for more subtle differences with computational techniques alone.

Many academic studies of media bias use human labeling to supplement results from LDA and other machine learning approaches. If I were to take this project further, for example to examine what topic coverage is associated with the high counts of election-related words in Swahili, I would start by having human readers label articles. I’d only look to topic models or machine classification if trends were still unclear, or I wanted to try and generalize the results to new articles.

### Data
Want to go deeper? Lonely on a Tuesday? The data's online! You can [download the original articles](https://s3.amazonaws.com/tzscrape/tz_articles.zip) in json format or check out [the scrapers](https://github.com/thebenedict/tzscrape) on github. The brave might peruse my idiosyncratic python [scripts for data cleaning](https://github.com/thebenedict/tzanalyze), including a Jupyter notebook with the LDA experiments.

#### Thanks!
Ben Taylor for context, translation and thoughtful feedback. Josh Levens, Jessica Padron and Daniel Waistell for help with translation. Angela Ambroz, Mike Dewar, David Feldman, Kelly Hamblin, and Ashely Price for useful discussions. Kelly and Jennifer Hamblin contributed photos.