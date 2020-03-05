## Looty-ref

Library of ideas for my endavours, tinkering with [Looty](https://github.com/benjaminjackman/looty/) stash manager
to have all in one place remotely available

[Developer Notes](https://github.com/Traf27/Looty-ref/blob/master/Dev-notes.md) - How-to, and intrinsics of Looty programming

### To Read

1. [https://github.com/mleibman/SlickGrid/wiki](https://github.com/mleibman/SlickGrid/wiki) - grid used in Looty
1. [http://allaboutscala.com/](http://allaboutscala.com/) - nice introduction to scala
1. https://github.com/chicagoscala/beginning-exercises tutorial project from the ground up
- [ ] read how looty caches data and rules of refreshing content[]()
- [ ] read how columns are made, ~~what makes column width not resizable~~ (bug introduced with 2.1.73 jquery upgrade). And how you can add html tags to value, for experiance progress tag

---

 #### Code:
 - [ ] add pinning row on top of grid - maybe use item id with localStorage.setItem like 
 ```
  localStorage.setItem("PINNED", {
  
  })     
```
and we could add hidden cell to grid row, with item id.

And actualy we are not constrained by rowish look of pined item, it can be anything, anywhere: button on the right, dynamic list, or favoritelist  somewhere (like with your refresh dynamic-select)
Yay so i got idea about 
- [ ] wishlist -> item with better stats (choosen which one, from this on item, and maybe could add some) and thats a long shot but ...
we could have a place to save item we wish to have upgrade for, and looty would request info from trade in a loop, abut items better than (anddd push messeges for us, ding! there is a upgrade to buy (list tooltip maybe?), and you click and send), within price constrains, and for example you could/should enter as much info as needed to lessen the counts ?
or whatever, put there frames,

I've already wrote code snipett for localStorage volatile data yay! :D
Orrr I can add library like https://github.com/marcuswestin/store.js

 - [ ] check/add using  localStorage extension library/or raw for volatile states to persist through page refresh. With 
 ```
 
 
 window.onbeforeunload ( function() { 
  sessionSettings = ....
  localStorage.setItem(sessionSettings, "....")  
  }) //to store and 
  
 window.load( function() { //update states of voletile variables, like currently selectwed columns, and which league we show
  sessionSettings = localStorage.getItem("sessionSettings");
  loadSettings(sessionSettings)
 ...
 })
 function loadSettings(settings) {
  ... //what and where
 }
 ```
 - [ ] add clickable row, to lit it
 - [ ] add last caching time
 - [ ] add progress of retrieving stashes example: 5 of 25
   - [ ] add ETA to retrieve all stash tab data (and characters), using predictive query time of stash tab. There are: special tab, normal tab, quad tab having various number reqests needed to download them with API
 - [ ] add possibility to choose watched tabs, and those auto refresh on set timer (options or set value), rest will be refreshed only on hard reset(?) or.... ?how it is done now?
 - [ ] ?upon opening looty again/ when else? we could compare last used character (queries to www.pathofexile.com and scrapping profile char), with actual and refresh char invs of said chars.
 - [ ] add experiance progress bar of gems (?maybe characters too)
 - [ ] resolve Throttling errors, using limit headers values. Limit is 45 requests per 60s. 
Solution is to make 44-45 and wait 15sec for next batch. Or what im leaning to more is to do 1 request every 60/45 sec  ~ 1.4sec
 - [ ] add chaos equivalent price to your owned currency with [poe.ninja data](https://poe.ninja/api/Data/GetCurrencyOverview?league=Blight) [WealthView.scala ](https://github.com/benjaminjackman/looty/blob/b8b1c6fb370db9f94c56b9da6e26af521f719b64/looty/src/main/scala/looty/views/WealthView.scala)
 - [x] add jewel types for search/filter 
 - [ ] add ~~optional properties~~ influence property : 
 
 
* elder
* shaper
* unidentified
* corrupted
* veiled (how it is written in json structure)
* crusader
* ...
* ...
* has implicit ( column or checkbox? )
* priced? Is there info for items priced individualy about their value?

#### How to automatize adding future options, affixes ? What/is the pattern to forsee the structure ("extended" field im looking at you -_-). And how to organise interface to be future features proof space wise :) ?

There is error because of this fragment of item json (which is not parsed by Looty yet) :
```
{
...
  properties: [{
    displayMode: 0,
    name: "Abyss"
  }]
  ...
}
```
  - [ ] Add support for all abyss/jewel mods on rare ver. (because Jewels are awesome!) :O
   - **instructions how to add new affix** 
  **"Potential"** problems :
  * Where the hell all those mods fit into Select Column panel ?! Now it takes whole screen on my laptop (1280x800). 
 - [ ] parse not parsed properties, for jewels like Range, and put them in collapsed part of pannel by default

#### Some maybe-will-useit
[http://www.dotnetfunda.com/forums/show/21633/is-it-possible-to-detect-a-page-refresh-f5-using-jquery](Ajax onload onbeforeunload)
