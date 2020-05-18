Looty Directory Tree
https://github.com/Traf27/looty/blob/master/looty/src/main/scala/looty/
```
├── EmbedMain.scala
├── LootyMain.scala
├── chrome
│   ├── ChromeStorage.scala    chrome.storage object import to use in PoeCacherChrome.scala
│   └── StoreMaster.scala
├── facades
│   └── jailed
│       └── package.scala      ?
├── looty-dir-tree.html
├── looty.scala                jQuery init and various functions
├── model
│   ├── Accessible.scala        ?
│   ├── Attributes.scala        dexterity, itellect, strength calculations helper functions
│   ├── CharClasses.scala       main character classes, starting attributes and helper listing functions
│   ├── ComputedItem.scala      fields for affixes 
│   ├── ComputedItemProps.scala describing columns to be created from properties made in parsers and PoeTypes.scala
│   ├── Elements.scala          resists and element damage types calculated here
│   ├── HighScorer.scala
│   ├── InventoryIds.scala
│   ├── ItemScorer.scala
│   ├── LifeAndMana.scala       stats that have the same wording for mana and life are calculated here
│   ├── LootContainerId.scala   LootContainer stands for stash tab, and character inventory
│   ├── PaperDoll.scala         character slots structure, and methods
│   ├── PassiveSkillTreeHelp.scala
│   ├── SocketColors.scala          sockets scturcture, and methods
│   ├── WeaponTypes.scala           as name implies 
│   └── parsers
│       ├── AffixesParser.scala     parsers for affixes that are strings, contain numbers, or are of boolean type
│       ├── ArmourParser.scala
│       ├── ItemParser.scala
│       ├── PropertyParsers.scala   parser for data in "properties" field of JSON containing various stuff
│       ├── RequirementsParser.scala
│       └── SocketsParser.scala
├── mods
│   ├── AffixesParser2.scala    parser for exporting to Csv
│   ├── ModsCsvParser.scala
│   └── ProperItem.scala        file for binding js values to those used in csv export
├── poeapi
│   ├── PoeCacher.scala         base class for caching downloaded data for further reuse
│   ├── PoeCacherChrome.scala   class that cache data downloaded from ggg servers
│   ├── PoeCacherDemo.scala     class that can read data from stored sample-items.json file in data directory
│   ├── PoeCacherExileTools.scala
│   ├── PoeRpcs.scala           handling http requests
│   └── PoeTypes.scala          here are described all supported Item properties got from JSON
├── script
│   └── LootScorerScriptParser.scala
├── templates
│   └── Index.scala.html
├── util
│   ├── AjaxHelp.scala
│   ├── DurationText.scala
│   └── Optional.scala
├── views
│   ├── Alerter.scala
│   ├── ControlPane.scala
│   ├── GlobalView.scala
│   ├── HomeView.scala
│   ├── ItemDetailHover.scala
│   ├── LoadSavePane.scala
│   ├── LootView.scala      page with grid 
│   ├── LootViewSaver.scala
│   ├── MapsView.scala
│   ├── PoeBuilderView.scala       redirection to pathofexile.com/ poeskilltree
│   ├── RefreshPane.scala       panel for refreshing tabs data
│   ├── ScriptView.scala
│   ├── SettingsView.scala
│   ├── UnderlayView.scala
│   ├── View.scala
│   ├── WealthView.scala        data with currency
│   ├── XpView.scala            calculating gem xp through playing - manual
│   ├── loot
│   │   ├── Column.scala
│   │   ├── ColumnsPane.scala
│   │   ├── Container.scala
│   │   ├── Filters.scala
│   │   ├── LootFilter.scala
│   │   ├── ScoresPane.scala
│   │   └── UpgradesPane.scala
│   ├── snippets
│   │   └── Select2Wrapper.scala
│   └── widgets
│       ├── Select2Widget.scala
│       ├── SelectCharacterWidget.scala
│       ├── SelectLeagueWidget.scala
│       └── SelectStashWidget.scala
└── vmjs
    └── Vm.scala


15 directories, 72 files

tree v1.8.0 © 1996 - 2018 by Steve Baker and Thomas Moore
HTML output hacked and copyleft © 1998 by Francesc Rocher
JSON output hacked and copyleft © 2014 by Florian Sesser
Charsets / OS/2 support © 2001 by Kyosuke Tokoro
```
