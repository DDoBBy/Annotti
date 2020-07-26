let $ = require('jquery')

$(function(){
	var $write = $('#write'),
		shift = false,
		capslock = false;
	
	// The rest of the code goes here.
});

$('#keyboard li').click(function(){
	var $this = $(this), character = $this.html(); // If it's a lowercase letter, nothing happens to this variable
    console.log(character)
    
    var selectedKey = "<div class = 'selected-key'>"+character+"</div>"
    $("#selected").append(selectedKey);
	// Code for processing the key.
});

// // Delete
// if ($this.hasClass('delete')) {
// 	var html = $write.html();
	
// 	$write.html(html.substr(0, html.length - 1));
// 	return false;
// }

// $('.ok').on('click', () => {
//     let shortcut = $('.kb')[0].value;
//     console.log(shortcut);

//     var appendTemplate = "<div class = 'label-item'">+
//     ""+"</div>"

//   });
