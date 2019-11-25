## Looty-ref

Library of ideas for my endavours, tinkering with [Looty](https://github.com/benjaminjackman/looty/) stash manager
to have all in one place remotely avaiable

[GitKraken board](https://app.gitkraken.com/glo/board/XdYli-AbPwAPFRzD)

---

### TODO
mostly the same as in glo boards, thus its easier sometimes for me to add here, and update there :)

#### Planned improvements:
#### Design:
 - [ ] move menu
 - [ ] create help menu/panel 
  
 #### Code:
 - [ ] resolve Throtteling errors, using limit headers values
 - [ ] add chaos equivalent price to your owned currency with [poe.ninja data](https://poe.ninja/api/Data/GetCurrencyOverview?league=Blight)
 - [ ] add jewel types for search/filter like: 
 
  ```
  { 
    "jewelTypes":[
    "Searching Eye Abyss Jewel",
    "Murderous Eye Abyss Jewel",
    "Ghastly Eye Abyss Jewel",
    "Hypnotic Eye Abyss Jewel",
    "Crimson Jewel",
    "Viridian Jewel",
    "Cobalt Jewel"
    ]
  }
  ```
  hmm *looty does show this info*, **but** if we choose column tpeln, id say its very ambigous... Solution? when user choose column type than propose tpeln , or add it to default view
  - [ ] Make more visible information when making new Select Column save -> "New: column_filter_name" -> something maybe tooltip
  
  - [ ] Probably hard as fuck for me. Add support for all abyss/jewel mods on rare ver. (because Jewels are awesome!)
  **"Potential"** problems :
  * How am i going to figure out where the hell all those mods fit into Select Column panel ?! now it takes whole screen on my laptop. 
    * (And i was secretly thinking about porting it to mobile one day, foolish me!) 
  * there is fuckton of mods - how to even "ugryźć to" 
  
  
  
  Both: 
 - [ ] experiment with icons for every row/ or for row with Jewels
 - [ ] I have discovered [Semantic UI](https://github.com/Semantic-Org/Semantic-UI) and its counterpart in React - I'm in Love <3 (was thinking, how the heck will I style this redesign thing ...) 
