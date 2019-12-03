# Tutorial 
## Advanced column filtering
Looty's column filter boxes work with **regural expresions**. (Except text is not case sensitive like in standard reg. expr. So 'WeApon' and 'weapon' will show 'Weapon' results)

basics:

special characters used as commands are as follows : (if you would like to use them as they are, you have to put \ character before them ex. \[ )

```
. means any character, it can be number, letter, special sign like ` / '
[ ] brackets meaning 
```

That means if we take column Type and we will put there 
```
wep .h
```
it will include in filter 'Wep 1H' and 'Wep 2H'

HomeView message :

You can type things to search for into the empty row at the top of the columns.

For numeric column types Try starting the search with > or < or = 
examples:
in column rLvl (required level) type <21 that will pick all items that requires 20 level and less
in column dex (dexterity) type >39 that will pick all items that gives +40 and more into dexterity

if you type any value, it will show values equal and greater
to filter item with some dexterity, strength, critical strike, stamina - put in those columns 1 so it will pick value 1 or greater

in few columns you can type filters at once, to filter even more accurate results

Now you are ready for creating and saving your own custom filters. As shown below. numeric/text filters you will have while creating your filter, are going to be saved. So it could be a good idea to make relevant filters, for example:
rings for leveling melee character:
it would be:
click Select Column button
click "all -" button (make picture of button)
pick following columns
[loc, rarity, name, type, rlvl, stamina, str, dex, int, ]


The search is not case sensitive.
If the first term isn't an operator, then it defaults to regular expression search.
| between words are treated as an 'OR', use this to search for several different types at once, for example: gloves|helmet|boots
You can type into multiple columns to filter down to what you want, for example to find boots with a red socket that can be worn by characters under level 35, enter boots in the type column and r in the sockets column and <35 in the rlvl column.
Click the column titles to sort by them, shift clicking allows multi-sorting
Click on a character / stash tab button to update that stash tab from the server, and to show only it's contents.
Use the clear and reload everything button when you need to update several stash tabs, or you re-ordered them
Sockets in the socket column are displayed first by largest group, then in alphabetical order. That means G-G-R-R won't ever be listed as G-R-G-R or other permutations.
Entering .-.-.-. in the sockets column will match all four link+ socketed items
Entering B-B-G-R in the sockets column will match all four link+ socketed items, that have 2 blues linked with a green and red.
The UI is dark so that you can leave it up on a second monitor while you play.
The score field was roughly based on this reddit post
Looty was written in ScalaJs
