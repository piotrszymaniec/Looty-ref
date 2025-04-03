# quite few problems arised when trying to migrate to scala 1.13.8
Reasoning was as follows:  
1. I wanted to be able to parse pathofexile.com webpage for detailed accountName in format account#1234  because by default we know only "account" part of accountName
2. But to do it i needed dom function Html - which is not present in current version of scalajs.dom and ther is no 'dom.experimental.fetch' to download page - so i needed newer version
3. Yet it needs updated scalajs version like 1.7.0  and this scalajs version needs scala 13.8 at least
4. sbt-launch had to be updated to 1.7.0
5. then starting sbt-win.cmd threw quite some error beacouse ther is no sbt-idea, sbt-twirl or sbt-less version compatible with scala 2.13, only scala 2.12
6. resolver in sbt cant search for right places because following urls does not have required files
7. after 4hr of searching and detective and archeology work I droped the idea of updating

### new approach

access pathofexile.com with request from javascript and give scalajs and scala value taken from specific place of webpage - namely from '<span class="profile-link"><a href="/account/view-profile/account-name-1234">account-name#1234</a></span>'
