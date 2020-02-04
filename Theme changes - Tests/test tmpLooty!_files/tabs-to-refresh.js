
var list1 = $(".list1");
var list2 = $('.list2');

list1.on('click', 'a', function() {   
   list2.append($(this));
});

list2.on('click', 'a', function() {
   list1.append($(this));
});

var filter = $('#filter');
var listItems = $('.list1>a');


	
filter.on('keyup', function(e) {
  var val = new RegExp(e.target.value, 'gi');
  for(var i=0; i<listItems.length; i++) {
    if( e.target.value.length > 0) {
      var text = listItems[i].innerHTML;
    
      if( !text.match(val)) {
        //listItems[i].classList.add('is-hidden');
        $(this).hide()
      } else {        
        $(this).show()
      }
    } else {
      $(this).show()
    }
    
  }
});
  
  