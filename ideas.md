# Ideas

- [ ] read how poe.ninja is translating item that you want to trade to official trade links ???

### Full text search
concatanate bruteforce way all strings from item and store as ?column like "TextSearch"
where player can search via string matching

Remember data like that: with item id as a key and concatenated content as value
Potential problems: if items will be blessed, does its id change?
Even if not than we have old data vs new which should be updated... but as we retrieve loads of data we should compare either way (before parsing!) Content of item properties.

Think of a way/class handling new<->old data updating, delating, or readressing missing item in storage.
Items comes in its contents are stored?temporary id is compared but.. if id is already found then we haveto check all its contents against contents, any other elegant way to do that? 
(Am i able to make compare items from request concurrently?)



### Handling large Quantity of tabs 
that player has, to choose right form of refreshing his tabs:
Problem - what if someone has 50, 100, 500 tabs? 
Do we need to refresh all ? Though some of them are (read-only) so :

```
stashTabs = {
	"tabs": [
		{
			"i": 25,
		}
	]
}

stashTabs.tabs[x].i
```
### Link for item to check on (poe.trade, pathofexile.com) 

?single page -> another buton
?just ctrl+c translator script

?switch for altering between poe.trade/pathofexile

/what:

?Item i'm looking at
?items i have filtered now

/behaviour 
- undercut values by 10% - x%? up to floor value 
- overcut values by 10% -x%? 

/how
?copy via clipboard being over an item  -> on copy to clipboard change its code

/where
- poe.trade
- pathofexile.com
- poe.xyz ?

class for translation state A->B - 
?is there already class i can use? or i need to work with js object?

#### and other way around


### item copied from poe, paste and make filters:

?shift+crl+v 
?some switch-box in settings what to do with pasted items into filters

could be useful to check if some "GreAt looking item" is realy great :)
### Favorites Items/Best Items - so you can save those what you like to <3 list

<3 items are always favoured 
  ?different color background/fonts
  ?with border
  ?with heart left most (youd have to save there extra space for icon)
  ?

?and search against this item/s
?track when they change stash/tab placement (items have own id, so work with this...)
