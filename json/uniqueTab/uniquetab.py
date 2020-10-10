#!/usr/bin/python
from __future__ import print_function
import json
import os
import sys
from time import sleep
import requests
from requests_html import HTMLSession

SLEEP = 1.1

league = None
account = None
poesessid = None
cookies = None
getStandard = False

def grabData( url ):
    print(url)
    wait = SLEEP

    # if i'm doing < ~45? queries i can go as fast as i want, otherwise sleep
    if getStandard:
        sleep(wait)

    r = requests.get(url, cookies=cookies)
    while (r.status_code == 429 ):
        print('RATE LIMTED....WAITING %s sec before retrying'%wait)
        r = requests.get(url, cookies=cookies)
        wait = wait*2
        sleep(wait)

    return r.json()

# -------------------------------------------------------------------------------
#
#   parseItem
#
# ------------------------------------------------------------------------------
def parseItem(item,id):
    name = item['name']

    if name:  # not empty string
        cleanName = name #name[name.rfind('>') + 1:].encode('utf-8')
        frameType = item['frameType']

        # frameType 3 = uniques, 2 = Rare (Jewels)
        if frameType in [3]:

            # 'uniqueName' : { 'type':'string', 'location' : [ 'loc1', 'loc2'] }

            # does everything have a category?
            #category = item['category']
            category = 'foo'
            try:
                category = item['properties'][0]['name']
            except:
                pass#print(item)

            type = 'o' # other

            # one handed items "frameType":3,"category":{"weapons":["twosword"]}
            if ( ('weapons' in category) and (category['weapons'][0] in ('dagger','claw', 'onesword','wand','oneaxe','sceptre','onemace')  )):
                type = 's'

            # empty list for jewels *should* mean normal jewel and not Abyss
            if ( 'jewels' in category ):
                type = 'j'

            # Do i need to check for empty list at all?
            if ( 'accessories' in category ):
                type = 'a'

            # maps
            if ( 'maps' in category ):
                type = 'm'

            if cleanName in uniqueDict.keys():
                uniqueDict[cleanName]['location'].append(id) #.append(id.encode('utf-8'))
                uniqueDict[cleanName]['type'] = type
            else:
                uniqueDict[cleanName] = {'type':'foo', 'location':[]}
                uniqueDict[cleanName]['location'].append(id) #.append(id.encode('utf-8'))
                uniqueDict[cleanName]['type'] = type

# -------------------------------------------------------------------------------
#
#   getItemData
#
# ------------------------------------------------------------------------------
def getItemData(char):
    global uniqueDict

    print("Getting Character %s" % char)

    url = 'https://pathofexile.com/character-window/get-items?character=%s' % char
    jdata = grabData(url)

    charItems = None

    try:
        charItems = jdata['items']  # list of dicts - each list index is one item
    except:
        print(jdata)

    file_to_open = os.path.join('data','%s_inventory.json'%char)
    itemsFile = open(file_to_open, 'w')

    print(json.dumps(charItems, indent=4), end='\n', file=itemsFile)

    for item in charItems:
        name = item['name']

        if name:  # not empty string
            parseItem(item, char)

# -------------------------------------------------------------------------------
#
#   getStashData
# Stash
# /character-window/get-stash-items
# league= {Standard,Hardcore,Torment,Bloodlines}
# tabs= {0,1} 1 to shows tabs name, position, colors
# tabIndex= {0,...,N}
# ------------------------------------------------------------------------------
def getStashData(league,account):
    global uniqueCSV
    global uniqueDict
    global grab
    tabIndex = 0
    numTabs = 0

    # grab first one for tab count
    url = 'https://pathofexile.com/character-window/get-stash-items?league=%s&tabIndex=%d&tabs=1&accountName=%s' % (league,tabIndex,account)
    jdata = grabData(url)

    try:
        numTabs = jdata['numTabs']
        print('nunTabs:', numTabs)
    except:
        print(jdata)


    for tabIndex in range(0,numTabs):
        print("Getting Stash%d"%tabIndex)
        #items = []

        url = 'https://pathofexile.com/character-window/get-stash-items?league=%s&tabIndex=%d&tabs=1&accountName=%s' % (league, tabIndex, account)
        jdata = grabData(url)

        try:
            items = jdata['items']  # list of dicts - each list index is one item
            tabs = jdata['tabs']    # description of each tab type -> check for unique tab
        except:
            print("ERROR")
            print(jdata)

        # or could check for existence of 'uniqueLayout' key
        if tabs[tabIndex]['type'] == 'UniqueStash':
            print(tabIndex, 'UniqueStash')
            grabUniqueTab(account, league)

        tabName = 'Stash'+str(tabIndex+1) # = inventoryId

        for item in items:
            parseItem(item, tabName)

def queryData(league):
    print('queryData: %s'%league)

    getStashData(league, account)

    # grab character list
    url = 'https://pathofexile.com/character-window/get-characters'
    jdata = grabData(url)

    # only grab chars in correct league
    for character in jdata:
        if (character['league'] == league):
            getItemData(character['name'])

def storeStandardUniques():
    file_to_open = os.path.join('data', 'standardUniques.json')
    standardUniquesJson = open(file_to_open, 'w')
    json.dump(uniqueDict, standardUniquesJson, sort_keys=True, indent=4)

def printUniques():
    global standardUniquesJson

    file_to_open = os.path.join('data', 'standardUniques.json')
    try:
        stdUniqJson = json.loads(open(file_to_open).read())
    except:
        pass # will be created for the first time below

    keys = sorted(uniqueDict)  # key = unique item, value = location

    out1 = ""
    out2 = ""
    for key in keys:
        #print(key, ':', uniqueDict[key])
        type = uniqueDict[key]['type']
        location = uniqueDict[key]['location']
        count = len(location)
        stdCount = 0

        # will fail if file doesn't exist, ok
        try:
            item = stdUniqJson[key]
            loc = stdUniqJson[key]['location']
            stdCount = len(loc)
        except:
            pass

        if (stdCount == 0) or (type == 's' and stdCount == 1):
            out2 += "%s;%s;%d;%d;%s\n" % (key, type, count, stdCount, location)
        else:
            out1 += "%s;%s;%d;%d;%s\n" % (key, type, count, stdCount, location)

    print(out1)
    print('-------')
    print(out2)

    print('Total:%d'%len(keys))

# TODO: pass in tab id
def grabUniqueTab(account,league):
    uniqueStashNum = 0
    session = HTMLSession()

    r = session.get('https://www.pathofexile.com/account/view-profile/%s/stashes'%account, cookies=cookies)

    # get the league order for stashes
    headers =  r.html.find('h2')
    for element in headers[1:]:
        text = element.text
        stashLeague = text[text.find('in') + len('in'):text.find('League')].strip()
        if stashLeague == league:
            break

        uniqueStashNum += 1

    # get all unique stashes - can't determine which league its for...maybe grab the containing Element "showcase-item" first?
    stashes = r.html.find('a[href^="/account/view-stash"]')
    #print(stashes)

    # get correct stash, hopefully
    element = stashes[uniqueStashNum]
    #print(element.links)
    url = 'https://www.pathofexile.com'+element.links.pop()
    r = session.get(url, cookies=cookies)

    # get all type pages
    types = r.html.find('a[href^="/account/view-stash"]')
    #print(types)

    # visit each type page
    for type in types:
        url = 'https://www.pathofexile.com' + type.links.pop()
        #print(url)
        r = session.get(url, cookies=cookies)


        # get all owned items
        owned = r.html.find('div[class="item owned"]')  # or print(r.html.search('DeferredItemRenderer')) and parse the json values?
        #print(owned)

        # loop through each item
        for item in owned:
            #print(item)
            name = item.text
            #print(name)

            if name in uniqueDict.keys():
                uniqueDict[name]['location'].append('UST')
                uniqueDict[name]['type'] = 'u'
            else:
                uniqueDict[name] = {'type':'foo', 'location':[]}
                uniqueDict[name]['location'].append('UST')
                uniqueDict[name]['type'] = 'u'  # get page name?
        #sys.exit(0)

##-----------------------------------------------------
##  MAIN
##-----------------------------------------------------
uniqueDict = {}

if not os.path.exists('data'):
    os.makedirs('data')

config = json.loads(open('config.json').read())
account = config['account']
getStandard = config['getStandard']
league = config['league']
poesessid = config['poesessid']
SLEEP = config['sleep']
cookies = dict(POESESSID='%s' % poesessid)

# to find poesessid
# chrome - click on lock icon in URL
# Firefox shift+F9

#grabUniqueTab(account,league)
#sys.exit(0)

# update the Standard league info - don't do it twice
if ( getStandard ):
    queryData('Standard')
    storeStandardUniques()
    uniqueDict = {}

queryData(league)
printUniques()