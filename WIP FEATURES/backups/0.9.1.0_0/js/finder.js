document.addEventListener('DOMContentLoaded', function() {
  var loadBtn = document.getElementById('loadBtn');
  loadBtn.addEventListener('click', function() {
    reload();
  });

  var findBtn = document.getElementById('findBtn');
  findBtn.addEventListener('click', function() {
    find();
  });


  var contactBtn = document.getElementById('contact');
  contactBtn.addEventListener('click', function() {
    log('question? contact me! <span class="mail-me"><i class="fa fa-envelope"></i> kraiwuthi.a@gmail.com</span>');
  });
});
var counter = 1;
setInterval(function(){ counter = 1; }, 60000);

// TODO: get account name automatically
// TODO: gem level
// TODO: numeric comparison
var host_name = 'https://www.pathofexile.com'
var character_path = '/character-window/get-characters'
var stash_path = '/character-window/get-stash-items'
var tab_path = '/character-window/get-stash-items'
var item_path = '/character-window/get-items'

// league > tab > item
var account = {}
var old_account = ''
$(document).ready(function() {
  $("#keyword").keyup(function (e) {
    if (e.keyCode == 13) {
      // on Enter
      e.preventDefault();
      find();
    }
  });
  $("#account").keyup(function (e) {
    if (old_account != $("#account").val()) {
      changeLoadBtnTitle(false);
      old_account = $("#account").val();
    }
  });

  log('hi<br />');
  chrome.storage.local.get("account", function (obj) {
    // log('loading local data...<br />')
    try {
      account = JSON.parse(obj.account);
      if (account.name) {
        setTimeout(function(){
          $("#keyword").focus();
        }, 200);
        $('#account').val(account.name);
        old_account = account.name;
      }
      console.log(account)
    } catch (ex) {
      account = {};
    }
    if (account.stash && account.stash.Standard) {
      log('<span style="color:#1d9d74;">>>> Please enter the keyword(s), and click find button</span><br />')
      log('<span style="color:#1d9d74;">>>> You can enter multiple keyword separated by comma \',\' like...</span><br />')
      log('<span style="color:#1d9d74;">>>>&nbsp;&nbsp;&nbsp;<code>fire resist, cold resist</code></span><br />')
      changeLoadBtnTitle(true)
    } else {
      log('please login to https://www.pathofexile.com website and click \'load account data\' button<br />')
    }
  })
})

function changeLoadBtnTitle(refresh) {
  if(refresh) {
    $('#loadBtn').html('<i class="fa fa-refresh"></i> reload data')
  } else {
    $('#loadBtn').html('<i class="fa fa-cloud"></i> load account data')
  }
}

function accountName() {
  return $('#account').val();
}

function log(message, clear, regexes) {
  if (clear) {
    $('.content').html('');
  }
  if (regexes) {
    for(var i = 0; i < regexes.length; i++) {
      message = message.replace(regexes[i], function coloring(x){
        return '<span style="color:red;">' + x + '</span>';
      });
    }
  }
  $('.content').append(message);
}

var find = function() {
  $('.content').html('');
  var keywordsStr = $('#keyword').val()
  var keywords = []
  var find_mtx = is_find_mtx();

  // log('search<br />')
  if (account && account.stash && account.stash.Standard) {
    if (!find_mtx && (!keywordsStr || keywordsStr.length < 3)) {
      log('please enter the search value to perform search<br />')
      return
    } else {
      keywords = keywordsStr.split(',')
    }
  } else {
    log('please enter your account name and load your data<br />');
    return;
  }
  var regexes = []
  for(var a = 0; a < keywords.length; a++){
    if (keywords[a]) {
      regexes.push(new RegExp(keywords[a].trim(), 'i'))
    }
  }
  var found = 0
  var stash = account.stash
  for(var leagueName in stash) {
    // log('---checking ' + leagueName + '<br />')
    var league = stash[leagueName]
    for(var tabName in league) {
      // log('---checking ' + tabName + '<br />')
      var tab = league[tabName]
      for(var i = 0; i < tab.length; i++) {
        var item = tab[i];
        found = checkSingleItem(item, regexes, found, null, tabName, leagueName)
        found = findInSocketsOfStashItems(item['socketedItems'], regexes, item, tabName, leagueName, found)
      }
    }
  }
  var characters = account.characters
  for(var character_name in characters) {
    var character = characters[character_name];
    for(var m = 0; m < character['items'].length; m++) {
      var item = character['items'][m];
      var league_name = character['league']
      found = checkSingleItem(item, regexes, found, null, '', league_name, character_name)
      found = findInSocketsOfEquippedItem(item['socketedItems'], regexes, item, character_name, league_name, found)
    }
  }
  if (found == 0) {
    log('no data matches your search criteria<br />')
  } else {
    log('found ' + found + ' item(s)<br />')
  }
}

function findInSocketsOfStashItems(socketed_items, regexes, parent, tab_name, league_name, found) {
  if (socketed_items) {
    for(var n = 0; n < socketed_items.length; n++) {
      checkSingleItem(socketed_items[n], regexes, found, parent, tab_name, league_name)
    }
  }
  return found
}

function is_find_mtx() {
  // checkboxes
  return $('#chkmtx').is(':checked')
}

function checkSingleItem(item, regexes, found, parent, tab_name, league_name, character) {
  var name = item['name'].replace(/<.*>/, '')
  var title = item['typeLine'].replace(/<.*>/, '')
  var implicit = item['implicitMods']
  var explicit = item['explicitMods']
  var cosmetic = item['cosmeticMods']

  var has_cosmetic = cosmetic && cosmetic.length > 0
  var find_mtx = is_find_mtx();

  var match = false

  for(var j = 0; j < regexes.length; j++) {
    var regex = regexes[j]
    if (regex.test(title) ||
      regex.test(implicit) ||
      regex.test(explicit) ||
      regex.test(cosmetic) ||
      regex.test(league_name) ||
      regex.test(name)) {
      match = true;
    } else {
      match = false;
    }
    if (find_mtx) {
      if (!has_cosmetic) {
        match = false;
      }
    }
    if (!match) {
      break;
    }
  }
  if (regexes.length === 0) {
    if (find_mtx && has_cosmetic) {
      match = true;
    }
  }

  if (match) {
    found += 1
    // console.log(name);
    var league_tag = '<a href="#" class="tag"><i class="fa fa-flag"></i> ' + league_name + '</a>'
    var character_tag = '<a href="#" class="tag"><i class="fa fa-user"></i> ' + character + '</a>'
    var tab_tag = '<a href="#" class="tag"><i class="fa fa-table"></i> ' + tab_name + ' <span style="font-size: 8px;">tab</span></a>'
    var socketed_tag = '<a href="#" class="tag socketed"><i class="fa fa-dot-circle-o"></i> socketed</span></a>'
    var mtx_tag = ''
    if (has_cosmetic) {
      mtx_tag = ' <a href="#" class="tag mtx"><i class="fa fa-paint-brush"></i> mtx</span></a>'
    }
    var indent = '&nbsp;&nbsp;&nbsp;'
    if (parent) {
      var parent_name = parent['name'].replace(/<.*>/, '')
      var parent_title = parent['typeLine'].replace(/<.*>/, '')
      if (character) {
        // for socketed character item
        var inventory_id = parent['inventoryId'].replace(/([A-Z])/g, ' $1').toLowerCase()
        printMatchItem(indent + league_tag + character_tag + ' ' + socketed_tag + mtx_tag + '<br />' +
          '&nbsp;&nbsp;&nbsp; ' + name + ' ' + title +
          ' socketed in ' + parent_name + ' ' + parent_title +
          ' in ' + inventory_id + ' slot<br />',
          item, regexes
        )
      } else {
        // for socketed stash item
        printMatchItem(indent + league_tag + ' ' + tab_tag + ' ' + socketed_tag + mtx_tag + '<br />' +
          '&nbsp;&nbsp;&nbsp; ' + name + ' ' + title +
          ' socketed in ' + parent_name + ' ' + parent_title + '<br />',
          item, regexes
        )
      }
    } else if(character) {
      // for character item
      var inventory_id = item['inventoryId'].replace(/([A-Z])/g, ' $1').toLowerCase()
      printMatchItem(indent + league_tag + character_tag + mtx_tag + '<br />' +
        '&nbsp;&nbsp;&nbsp; ' + name + ' ' + title + ' in ' + inventory_id +
        ' slot<br />',
        item, regexes
      )
    } else {
      // stash item
      printMatchItem(indent + league_tag + ' ' + tab_tag + mtx_tag + '<br />' +
        '&nbsp;&nbsp;&nbsp; ' + name + ' ' + title + '<br />',
        item, regexes
      )
    }
  }
  return found
}

function findInSocketsOfEquippedItem(socketed_items, regexes, parent, character, leagueName, found) {
  var parent_name = parent['name']
  var parent_title = parent['typeLine']
  var inventoryId = parent['inventoryId']
  if (socketed_items) {
    for(var n = 0; n < socketed_items.length; n++) {
      found = checkSingleItem(socketed_items[n], regexes, found, parent, '', leagueName, character)
    }
  }
  return found
}

function printMatchItem(message, item, regexes) {
  log(message, false, regexes)
  var indent = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- '
  var implicit = item['implicitMods']
  var explicit = item['explicitMods']
  var cosmetic = item['cosmeticMods']
  if (implicit) {
    for(var j = 0; j < implicit.length; j++) {
      log(indent +  implicit[j] + '<br />', false, regexes)
    }
  }
  if (explicit) {
    for(var k = 0; k < explicit.length; k++) {
      log(indent +  explicit[k] + '<br />', false, regexes)
    }
  }
  if (cosmetic) {
    for(var l = 0; l < cosmetic.length; l++) {
      log(indent + cosmetic[l] + ' <i class="fa fa-dot-circle-o mtx circle"></i><br />', false, regexes)
    }
  }
  log('<br />')
}

function saveData() {
  if (account.stash && account.stash.Standard) {
    chrome.storage.local.set({'account': JSON.stringify(account)},
      function (){
        log('saved to local data<br />')
        log('<span style="color:#1d9d74;">We are ready!</span><br />')
        log('<span style="color:#1d9d74;">>>> Please enter the keyword(s) and click find button</span><br />')
        log('<span style="color:#1d9d74;">>>> You can enter multiple keyword separated by comma \',\'</span><br />')
      }
    )
    return true;
  } else {
    return false;
  }
}

function getLeagueTabs(league_name) {
  var stash_url = host_name + stash_path
  log('getting stash data from ' + league_name + '<br />')
  account['stash'][league_name] = {}
  $.get(
    stash_url,
    {
      'tabIndex' : 0,
      'accountName' : accountName(),
      'league' : league_name,
      'tabs' : 1
    },
    function(stash_data) {
      // console.log(stash_data);
      if (stash_data && stash_data.tabs) {
        for(var k = 0; k < stash_data.tabs.length; k++) {
          var tab = stash_data.tabs[k];
          var tab_name = tab['n']
          account['stash'][league_name][tab_name] = []
          if (!tab['hidden']) {
            getTabItems(league_name, tab_name, tab['i'])
          }
        }
      }
    }
  )
  .fail(function() {
    log( "error: cannot load tabs<br />" );
  })
}

function getTabItems(league_name, tab_name, tab_index) {
  var tab_url = host_name + tab_path
  // log('getting item data from ' + tab_name + ' tab<br />')
  $.get(
    tab_url,
    {
      'tabIndex' : tab_index,
      'accountName' : accountName(),
      'league' : league_name,
      'tabs' : 0
    },
    function(tab_data) {
      if (tab_data && tab_data.items) {
        for(var l = 0; l < tab_data.items.length; l++) {
          var item = tab_data.items[l];
          var _item = {
            'name': item['name'],
            'typeLine': item['typeLine'],
            'implicitMods': item['implicitMods'],
            'explicitMods': item['explicitMods'],
            'cosmeticMods': item['cosmeticMods']
          }
          var socketed_items = item['socketedItems'];
          if (socketed_items) {
            _item['socketedItems'] = []
            for(var j = 0; j < socketed_items.length; j++) {
              _item['socketedItems'].push({
                'name': socketed_items[j]['name'],
                'typeLine': socketed_items[j]['typeLine'],
                'implicitMods': socketed_items[j]['implicitMods'],
                'explicitMods': socketed_items[j]['explicitMods'],
                'cosmeticMods': socketed_items['cosmeticMods']
              })
            }
          }
          account['stash'][league_name][tab_name].push(_item)
        }
      }
    }
  )
  .fail(function() {
    log( "error: cannot load items<br />" );
  })
}

function getCharacterItems(character_name, league_name) {
  var item_url = host_name + item_path
  // log('loading items from ' + character_name + '<br />')
  account['characters'] = {}
  $.get(item_url, {'accountName': accountName(), 'character': character_name }, function (data) {
    // console.log(character_name)
    console.log(data)
    account['characters'][character_name] = {
      'league' : league_name,
      'items' : []
    }
    for(var i = 0; i < data.items.length; i++) {
      var item = data.items[i]
      var _item = {
        'name': item['name'],
        'typeLine': item['typeLine'],
        'implicitMods': item['implicitMods'],
        'explicitMods': item['explicitMods'],
        'inventoryId': item['inventoryId'],
        'cosmeticMods': item['cosmeticMods']
      }
      var socketed_items = item['socketedItems'];
      if (socketed_items) {
        _item['socketedItems'] = []
        for(var j = 0; j < socketed_items.length; j++) {
          _item['socketedItems'].push({
            'name': socketed_items[j]['name'],
            'typeLine': socketed_items[j]['typeLine'],
            'implicitMods': socketed_items[j]['implicitMods'],
            'explicitMods': socketed_items[j]['explicitMods'],
            'cosmeticMods': socketed_items[j]['cosmeticMods']
          })
        }
      }
      account['characters'][character_name]['items'].push(_item)
    }
  })
  .fail(function(data) {
  })
  .always(function() {
  });
}

var has_ajax_monitoring = false;
function reload() {
  if(counter == 0) {
    log('You are requesting your stash too frequently. Please try again later.(1 request / min)<br />', true)
    return;
  }
  counter -= 1;
  var account_name = accountName();
  if (!account_name) {
    log('please check your account name<br />', true)
    return;
  }
  account = {'name': account_name}
  account['stash'] = {}
  log('loading data from server<br />', true)
  var character_url = host_name + character_path
  log('getting equipment data from your account<br />', true)
  $.get(character_url, {'accountName': accountName()}, function (data) {
    if (data) {
      var leagues = []
      for(var i = 0; i < data.length; i++) {
        var league = data[i]['league']
        if (league) {
          leagues.push(league)
        }
        getCharacterItems(data[i]['name'], league)
      }
      leagues = $.unique(leagues);

      if(leagues.length > 0) {
        for(var j = 0; j < leagues.length; j++) {
          getLeagueTabs(leagues[j])
        }
      }
    } else {
      log( '<span style="color:red;">error: cannot load account info please login to https://www.pathofexile.com</span><br />' );
      log( '<span style="color:red;">and check your internet connection</span><br />');
      return;
    }
  })
  .fail(function(data) {
    log( '<span style="color:red;">error: cannot load account info please login to https://www.pathofexile.com</span><br />' );
    log( '<span style="color:red;">and check your internet connection</span><br />');
    return;
  })
  .always(function() {
  });
  if (!has_ajax_monitoring) {
    $(document).ajaxStop(function() {
      log('finished loading<br />')
      if(saveData()){
        changeLoadBtnTitle(true);
      }
    });
    has_ajax_monitoring = true;
  }
}
