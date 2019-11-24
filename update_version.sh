#!/bin/bash -eax
# line reading taken from https://www.cyberciti.biz/faq/unix-howto-read-line-by-line-from-file/

if [ "$0" != "bin/deploy" ]; then
  echo "Please run from the root of the looty project folder"
  exit 1
fi
# declaration
SRC=looty/src/main/public/manifest.json
_manifest = "looty/src/main/public/manifest.json"
_homeview = "looty/src/main/scala/looty/views/HomeView.scala"
_readme = "README.md"

# we gona assign it
_lastversion = ""

# going to read "version history" from HomeView, searching for latest update
# read _homeview line
# if line have "# Version History" then
# read next line and parse it as
# "## 0.2.1.77 (2019-11-18)"

# doh, other way:
# read file until you read "# Version History"
# remember its line number
# read line with line+1 number
# _version = parse it for 0.n.n.n

# show message with old entry
# last entry:
# 	## 0.2.1.77 (2019-z-z)
# 	Looty works hura
#
# ask for new one
# once you accept writen msg
# parse it asigning inputed ver to _version
# now CHANGE contents of our files

# manifest.json
# match line with "version":"nnnnn"
# replace it with "version": "_version"
# save and exit file

# README.md, HomeView.scala
# find "# Version History"
# insert our message in next line - remember to make/have empty line at the end
# save and exit file

# FINE!


: <<BLOCKCOMMENT

co update_version:

1manifest - sama cyfra

2readme : pelen opis i to
3samo do tego pliku co generuje html dla strony ogolnej

to by bylo tak:
	HomeView.scala - line until "# Version History" found


example:

# Version History
## 0.2.1.77 (2019-11-18)
Chrome extension works again, hurray
BLOCKCOMMENT


: <<Messege
Simple Script to easy your life
Upgrading version so you would not
have to edit 3 files:
HomeView.scala, manifest.json, README.md
everytime. Reyojce! ;)

write version messege like that :

## 0.x.y.z (year-month-day)
Message about our achievments for looty today ;)
Can be on next line also, so type to your heart content

ctrl+t /cmd + t terminates your input and ask for save/exit

Save and quit (Y)
I'd like to add some more ...(N)
or quit (Q)

new line - its inserted by default, but if you type here whatever after first new line it will be ommited
Messege


