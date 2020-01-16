## Looty-ref

Library of ideas for my endavours, tinkering with [Looty](https://github.com/benjaminjackman/looty/) stash manager
to have all in one place remotely available

### Adding new Affixes

files needed : 
**AffixesParser.scala ComputedItem.scala ComputedItemProps.scala ProperItems.scala**
AffixesParser.scala       - choosing to what group affix belong,  how ingame affix is worded, and deciding if it needs to be sumed/substracted/multiplied/divided by some other stat, or just how program is going to recognize this affix. Code excerpt

```
def increased(name: String)(f: (ComputedItem, Double) => Unit) = { regex1(s"^([.+-\\d]+)%* increased $name$$")(f) }
  def reduced(name: String)(f: (ComputedItem, Double) => Unit) = { regex1(s"^([.+-\\d]+)%* reduced $name$$")(f) }
  def plusTo(name: String)(f: (ComputedItem, Double) => Unit) = { regex1(s"^([.+-\\d]+)%* to $name$$")(f) }
  def addsDamage(element: String, suffix : String = "")(f: (ComputedItem, Double, Double) => Unit) = {
    regex2(s"^Adds ([\\d]+) to ([\\d]+) $element Damage${suffix}$$")(f)
  }
  def level(name: String)(f: (ComputedItem, Double) => Unit) = {
    val a = if (name.isEmpty) "" else name + " "
    val r = s"^([.+-\\d]+)%* to Level of Socketed ${a}Gems$$"
    regex1(r)(f)
  }
  def simple1(prefix: String, suffix: String)(f: (ComputedItem, Double) => Unit) = {
    val a = if (prefix.isEmpty) "" else prefix + " "
    val b = if (suffix.isEmpty) "" else " " + suffix
    val r = s"^$a([.+-\\d]+)%*$b$$"
    regex1(r)(f)
```


ComputedItem.scala        - adding affix as some variable to designed section/type. Code excerpt

```
  object leech {var physical = LifeAndMana mutable 0.0}
  object onKill {var lifeAndMana = LifeAndMana mutable 0.0}
  object onAttackHit {var lifeAndMana = LifeAndMana mutable 0.0}
  object gemLevel {

  object total {
  ...
    def armour = properties.armour.oIf(_ == 0.0, x => plusTo.armour, x => x)
    def evasionRating = properties.evasionRating.oIf(_ == 0.0, x => plusTo.evasionRating, x => x)
    def energyShield = properties.energyShield.oIf(_ == 0.0, x => plusTo.energyShield, x => x)
    def globalEnergyShield = increased.maximumEnergyShield + plusTo.attribute.intelligence * .2
    def critChance = (100 + increased.globalCriticalStrikeChance) / 100.0 *
      properties.criticalStrikeChance
  }

  object slots {
  }


  object properties {
    var weaponType: WeaponType = WeaponTypes.NoWeaponType
    var armour                 = 0.0
    var energyShield           = 0.0
    var evasionRating          = 0.0
    val damages                = Elements of MinMaxDamage(0, 0)
    var quality                = 0.0
    var criticalStrikeChance   = 0.0
    var attacksPerSecond       = 0.0
    var chanceToBlock          = 0.0
    var weaponRange          = 0.0
    var stackSize              = 0.0
  }

```


ComputedItemProps.scala   - front end interface - how affix will be named as choosable option in Select Column Panel, and to what group of mods it will be assigned

```
//Efficiency
  val MagicFind                = pno("MagicFind", "mf")(Efficiency)(_.magicFind)
  val IncreasedItemRarity      = pno("IncreasedItemRarity", "iir")(Efficiency)(_.increased.rarityOfItemsFound)
  val IncreasedItemQuantity    = pno("IncreasedItemQuantity", "iiq")(Efficiency)(_.increased.quantityOfItemsFound)
  val IncreasedMoveSpeed       = pno("IncreasedMoveSpeed", "+%move")(Efficiency)(_.increased.movementSpeed)
  val IncreasedProjectileSpeed = pno("IncreasedProjectileSpeed", "+%projSpeed")(Efficiency)(_.increased.projectileSpeed)
  MagicFind ?= "Total of Increased Item Rarity and Increased Item Quantity"
  IncreasedItemRarity !?= "Increased Rarity of Items Found"
  IncreasedItemQuantity !?= "Increased Quantity of Items Found"
  IncreasedMoveSpeed ?= "Increased Movement Speed"
  IncreasedProjectileSpeed !?= "Increased Projectile Speed"

  //Regen
  val LifeLeech          = pno("LifeLeech", "lleech")(Regen)(_.leech.physical.life)
  val LifeGainOnHit      = pno("LifeGainOnHit", "lgoh")(Regen)(_.onAttackHit.lifeAndMana.life)
  val ManaGainOnHit      = pno("ManaGainOnHit", "mgoh")(Regen)(_.onAttackHit.lifeAndMana.mana)
  val LifeGainOnKill     = pno("LifeGainOnKill", "lgok")(Regen)(_.onKill.lifeAndMana.life)
  val ManaGainOnKill     = pno("ManaGainOnKill", "mgok")(Regen)(_.onKill.lifeAndMana.mana)
  val ManaLeech          = pno("ManaLeech", "mleech")(Regen)(_.leech.physical.mana)
  val LifeRegen          = pno("LifeRegen", "lireg")(Regen)(_.regeneratedPerSecond.life)
  val IncreasedManaRegen = pno("IncreasedManaRegen", "+%mareg")(Regen)(_.increased.manaRegenerationRate)
  val MinusToManaCostOfSkills = pno("MinusToManaCostOfSkills", "-mcos")(Regen)(_.minusToManaCostOfSkills)
  LifeLeech !?= "Life Leech from Physical Attack Damage"
  LifeGainOnHit !?= "Life Gain on Hit"
  ManaGainOnHit !?= "Mana Gain on Hit"
  LifeGainOnKill !?= "Life Gain on Kill"
  ManaGainOnKill !?= "Mana Gain on Kill"
  ManaLeech !?= "Mana Leech from Physical Attack Damage"
  LifeRegen !?= "Life Regeneration Rate"
  IncreasedManaRegen !?= "Increased Mana Regeneration Rate"
  MinusToManaCostOfSkills !?= "Mana Cost of Skills"
```

ProperItems.scala - affix named in ComputedItemProps.scala  for example val = movementSpeed is filled with value parsed from JSON with val movementSpeed = p1()

```
object increased {
    val movementSpeed = p1()


    val manaRegenerationRate = p1()

    val quantityOfItemsFound = p1()
    val rarityOfItemsFound   = p1()
```
congratulation, new affix is being parsed!

### TODO

- [ ] read [https://github.com/mleibman/SlickGrid/wiki](https://github.com/mleibman/SlickGrid/wiki) - grid used in Looty
- [ ] read [http://allaboutscala.com/](http://allaboutscala.com/) - nice introduction to scala
- [ ] read how looty caches data and rules of refreshing content[]()
- [ ] read how columns are made, ~~what makes column width not resizable~~ (bug introduced with 2.1.73 jquery upgrade). And how you can add html tags to value, for experiance progress tag

 #### Code:
 - [ ] add pinning row on top of grid - maybe use item id with localStorage.setItem like 
 ```
  localStorage.setItem("PINNED", {
  
  })     
```
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
 - [ ] add optional properties : 
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
