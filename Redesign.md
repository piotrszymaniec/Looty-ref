# Redesign

## TODO:
 - [ ] move menu
 - [ ] create help menu/panel 
 - [ ] make that league buttons remeber state - you see what league you are in
 - [ ] Solve "problem" with column selection, other words big soup of mods you can have as columns
 - [x] Alerter Warning for user that looty has no creditentials - poe site with loged wasnt visited. Explain why 
 
 #### User selecting mods/affixes for columns
 
 Several problems with that. As of current version:
 * tight space for choosing mods
 * categories not visible enough and/or eyebaling left for cat. name and right for desired mod and shorthands because of lack of space, often lead to sacrifices in cost of readability.
 * maybe group it in more general sets like below

Readability has to be improven. Random thoughts below.

### Menu Idea
left menu with accordion (open/close) 
probably mod filter on top
with similar categories:

- General
  - location
  - name 
  - rarity
  - ...
- Defense
  - resist all
  - fire resist
  - cold resist
  - lightning resist
  - chaos resist
  - posison resist
  - regen
  - 
  ...
- Offense
  - critical strike
  - critical multiplier
  - flat dmg
  - dmg increase
  ... 
  - Melee
    - elemental dmg
    - % damage increase
    - flat dmg with melee skill
    - conversion
    - melee range
    ...
  - Range
    - Bows
      - elemental dmg
      - % damage increase
      - dlat dmg with bows
      ...
  - Spell
    - % elemental dmg incresed
    ...
    - Minions
      - minion attack/cast speed
      - minion %increased damage
      - minion crit
      - minion crit multi
      - minion ...
      ...
- Utility
  - movement
  - flask charges
  - magic find
  ...
- ...
  
---

### Resources:

make [gitbook](https://app.gitbook.com/@traf27/s/looty/~/drafts/-LvYvY0VsDZr7-TKZQSW/) for looty 
[link to character avatars sprite ](https://www.pathofexile.com/image/gen/inventory-sprite.png?1575514741117)

Use icons for dmg types/resistances
♨ Fire
⚡ Lightning
❄ Ice
☣ Chaos
⚒ Physical

---

#### Left menu idea
  <img src="https://github.com/Traf27/Looty-ref/blob/master/READMEpics/affix_column_selection_test-0.1.png" alt="drawing" width="25%"/>

 #### Thumbnail idea:
   <img src="https://github.com/Traf27/Looty-ref/blob/master/READMEpics/mod_panel_page_thumbnail_view-0.1.png" alt="drawing" width="60%"/>
