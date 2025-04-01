# Changes to google web store impose on looty extension following changes

in `mainfest` no more 'unsafe-eval' allowed for security reasons

how it is used in looty:
- jailed library
- ScriptView.scala - which is not used - it was for future scoring system which was never implemented by Benjamin
```
from changelog
## 0.2.1.10 (2014-08-24)
* Added ACE / vm.js (for custom scores, not yet implemented)
```
- Vm.scala
- vm.js

### todo:
- lets possibly **break** the app removing jailed and vm.scala and ScriptView and see what happens :D


## changes in GGG request url 

For account names previously it was enough to ask for "account-name" but now it requires unique identificator added as folowing "account-name#1234"
Character request url changed following format "account-name" requiring "account-name#6036" which in url is encoded as "account-name%25236036

### todo 

1. find where request is being made
2. get information about account part "#1234" and concatanete it like following "%25231234" to request urls
3. see if it works
