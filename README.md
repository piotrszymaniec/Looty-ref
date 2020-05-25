## Looty-ref

Library of ideas for my endavours, tinkering with [Looty](https://github.com/benjaminjackman/looty/) stash manager
to have all in one place remotely available
  
[Developer Notes](https://github.com/Traf27/Looty-ref/blob/master/Dev-notes.md) - How-to, and intrinsics of Looty programming  
[Looty files structure, with short annotations, for fast devs. introduction and general overview](https://github.com/Traf27/Looty-ref/blob/master/looty-scala-files-structure.md)

### Other .md files
1. [Redesign](https://github.com/Traf27/Looty-ref/blob/master/Redesign.md) ideas, todos, wips
1. [Developer notes](https://github.com/Traf27/Looty-ref/blob/master/Dev-notes.md) some usefull coding advices
1. [How To create json data](https://github.com/Traf27/Looty-ref/blob/master/howto-item-sample.md) for loading to looty for testing purposes  
1. [Ideas](https://github.com/Traf27/Looty-ref/blob/master/ideas.md)  
1. [Issues](https://github.com/Traf27/Looty-ref/blob/master/issues.md) I have with coding recently  

- [notes for tutorial](https://github.com/Traf27/Looty-ref/blob/master/wip/tutorial.md)

#### self note
#### ----> sort and rename files <----
#### ----> create clean and easy to read <----
#### ----> document <----
i wish ....


### usefull resources

1. [PoE Ninja API How-to](https://github.com/Traf27/misc-poe-tools/blob/master/doc/poe-ninja-api.md) 
1. [SlickGrid](https://github.com/mleibman/SlickGrid/wiki) Wiki - grid used in Looty
1. [http://allaboutscala.com/](http://allaboutscala.com/) - nice introduction tut to scala
- [ ] read how columns are made, ~~what makes column width not resizable~~ (bug introduced with 2.1.73 jquery upgrade). And how you can add html tags to value, for experiance progress tag

#### Other github's projects/tools that somehow handle PoE item data:
1. https://github.com/Dynatos/PoEStashUniqueItemIndexer - collecting uniques data to show what you (not) have already <js>
1. https://github.com/vadash/GetExpensiveUniques - takes uniques from poe.ninja and pick those above some price <C#>
1. https://github.com/Traf27/PathOfExileClipboardListener - dont be fooled by name, its full blown private stash database engine, though written in 2014, when some info like ilvl or itemid wasn't there, def. first stop for building one <C#>
  



#### Programming
[ttps://github.com/chicagoscala/beginning-exercises scala tutorial project from the ground up
[scala.js beginner tutorial](https://www.scala-js.org/doc/tutorial/basic/)

---
### TODO  
#### Code:
- [x] read how looty caches data and rules of refreshing content
- [x] add jewel types for search/filter
- [x] add influence property : (elder, shaper, crusader, redemeer, hunter, warlord) 
- [x] add instructions how to add new affix
- [x] parse not parsed properties -> added column unparsed with joined affixes
- [ ] mark item as removed -> remove from cache and slickgrid data - use item id ?
- [ ] add experiance progress bar of gems (?maybe characters too)
- [ ] add chaos equivalent price to your owned currency  [WealthView.scala ]
(https://github.com/benjaminjackman/looty/blob/b8b1c6fb370db9f94c56b9da6e26af521f719b64/looty/src/main/scala/looty/views/WealthView.scala)  
- [ ] WealthView - change input to double, instead of integer, to allow currency import from poe.ninja
- [ ] add optional properties : 
* unidentified
* corrupted
* veiled (how it is written in json structure)
* ...
* ...
* has implicit ( column or checkbox? )
* priced? Is there info for items priced individualy about their value?
- [ ] slick grid location column color for searching stash tab faster - cross reference stashtabs info and stash location name
 - [ ] add clickable row, to lit it
 - [ ] add last caching time
 - [ ] add progress of retrieving stashes example: 5 of 25
   - [ ] add ETA to retrieve all stash tab data (and characters), using predictive query time of stash tab. There are: special tab, normal tab, quad tab having various number reqests needed to download them with API
 - [ ] add possibility to choose watched tabs, and those auto refresh on set timer (options or set value), rest will be refreshed only on hard reset(?) or.... ?how it is done now?
 - [ ] ?upon opening looty again/ when else? we could compare last used character (queries to www.pathofexile.com and scrapping profile char), with actual and refresh char invs of said chars.
 - [ ] resolve Throttling errors, using limit headers values. Limit is 45 requests per 60s. 
Solution is to make 44-45 and wait 15sec for next batch. Or what im leaning to more is to do 1 request every 60/45 sec  ~ 1.4sec
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
 

#### How to automatize adding future options, affixes ? What/is the pattern to forsee the structure ("extended" field im looking at you -_-). And how to organise interface to be future features proof space wise :) ?

  - [ ] Add support for all abyss/jewel mods on rare ver. (because Jewels are awesome!) :O
  
  **"Potential"** problems :
  * Where the hell all those mods fit into Select Column panel ?! Now it takes whole screen on my laptop (1280x800). 


#### Some maybe-will-useit
[http://www.dotnetfunda.com/forums/show/21633/is-it-possible-to-detect-a-page-refresh-f5-using-jquery](Ajax onload onbeforeunload)
