var labelColor = new Array();

function alertError(msg, detail){
    remote.dialog.showMessageBox({
      type:'error',
      title:'Error',
      message: msg,
      detail: detail
    })
  }

// Click add label button
$('#add-label').on('click', () => {
    var template = $('#appendTemplate').html();
    $(".label-list").append(template);
 });

// Click color selector
$('.label-list').on('click','.label-color', function(event) {
    $(event.target).parent().next().toggle();   
});

// Click remove button
var $item = $('.label-list').on('click','.del', function(event) {
    $(event.target).parent().parent().remove();
});

$('.label-list').on('click','.label-color-cand', function(event) {
    $(event.target).parent().prev().children('.label-color').css('background-color',$(event.target).css("background-color"));
});

function clickColor(r, g, b){

}

$('.label-list').on('click','.label-color-cand-rgb', function(event) {

    $(event.target).parent().prev().children('.label-color').css('background-color',$(event.target).css("background-color"));
});