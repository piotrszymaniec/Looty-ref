## Looty-ref

Library of ideas for my endavours, tinkering with [Looty](https://github.com/benjaminjackman/looty/) stash manager
to have all in one place remotely available

### TODO

- [ ] read [https://github.com/mleibman/SlickGrid/wiki](https://github.com/mleibman/SlickGrid/wiki) - grid used in Looty
- [ ] read [http://allaboutscala.com/](http://allaboutscala.com/) - nice introduction to scala

 #### Code:
 - [ ] add experiance progress bar of gems (?maybe characters too)
 - [ ] resolve Throttling errors, using limit headers values. Limit is 45 requests per 60s. 
Solution is to make 44-45 and wait 15sec for next batch. Or what im leaning to more is to do 1 request every 60/45 sec  ~ 1.4sec
 - [ ] add chaos equivalent price to your owned currency with [poe.ninja data](https://poe.ninja/api/Data/GetCurrencyOverview?league=Blight) [WealthView.scala ](https://github.com/benjaminjackman/looty/blob/b8b1c6fb370db9f94c56b9da6e26af521f719b64/looty/src/main/scala/looty/views/WealthView.scala)
 - [x] add jewel types for search/filter 
 
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
  **"Potential"** problems :
  * Where the hell all those mods fit into Select Column panel ?! Now it takes whole screen on my laptop (1280x800). 
 - [ ] parse not parsed properties, for jewels like Range, and put them in collapsed part of pannel by default
