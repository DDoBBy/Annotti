const { alertError } = require('../commons/utils.js');

function rgb2hex(rgb) {
  if (rgb.search("rgb") == -1){
    return rgb;
  } else {
    rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
    function hex(x){
      return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]); 
  }
} 

function generateRandomColor(){
  var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
  return randomColor;
}

// Click add label button
$('#add-label').on('click', () => {
  var randomColor = generateRandomColor()
  
  var labelColors = Object.values(remote.getGlobal('projectManager').labelColors)
  while(labelColors.includes(randomColor)){
      randomColor=generateRandomColor();
  }

  var labelID = remote.getGlobal('projectManager').labelCounter + 1
  var newLabel = remote.getGlobal('projectManager').appendLabel(null, randomColor)
  
  var appendTemplate = "<div class='appendLabel'>"+
    "<div>"+
      "<span class='label-color' id='"+labelID+"'style='background-color: "+newLabel.color+";'></span>"+
      "<input type='text' class='label' value='"+newLabel.name+"'>"+
      "<input type='checkbox' class='activate' id='"+labelID+"'>"+
      "<div class='del' id='del'>X</div>"+
    "</div>"+
    "<div class = 'select-color bubble' style='display: none;'>"+
      "<span class='label-color-cand label-color-circle' style='background-color: #10b1fe;'></span>"+
      "<span class='label-color-cand label-color-circle' style='background-color: #3fc56b;'></span>"+
      "<span class='label-color-cand label-color-circle' style='background-color: #ce9887;'></span>"+
      "<span class='label-color-cand label-color-circle' style='background-color: #f9c859;'></span>"+
      "<span class='label-color-cand label-color-circle' style='background-color: #ff78f8;'></span>"+
      "</br>"+
        "<span class='label-color-cand label-color-circle' style='background-color: #9f7efe;'></span>"+
        "<span class='label-color-cand label-color-circle' style='background-color: #3691ff;'></span>"+
        "<span class='label-color-cand label-color-circle' style='background-color: #ff936a;'></span>"+
        "<span class='label-color-cand label-color-circle' style='background-color: #ff6480;'></span>"+
        "<span class='label-color-cand label-color-circle' style='background-color: #7a82da;'></span>"+
      "</br>"+
      "<input id='color-input' type='text' value='"+newLabel.color+"'>"+
      "<button class='label-color-cand-rgb'>OK</button>"+
    "</div>"+
  "</div>"
  $(".label-list").append(appendTemplate);
});

// Click color selector
$('.label-list').on('click','.label-color', function(event) {
    $(event.target).parent().next().toggle();   
});

// Click remove button
var $item = $('.label-list').on('click','.del', function(event) {
    $(event.target).parent().parent().remove();
    
    var delKey = $(event.target).parent().parent().find('span').attr('id')
    remote.getGlobal('projectManager').deleteLabel(delKey)
});

$('.label-list').on('click','.label-color-cand', function(event) {
    var color = rgb2hex($(event.target).css("background-color"));
    
    var labelColors = Object.values(remote.getGlobal('projectManager').labelColors)
    if (labelColors.includes(color)){
        alertError("Duplicate Color","Color already used. Please select another color.")
        return;
    }
    
    $(event.target).parent().prev().children('.label-color').css('background-color', color);
    $(event.target).parent().toggle();  

    var labelID = $(event.target).parent().prev().find('span').attr('id')
    remote.getGlobal('projectManager').changeLabelColor(labelID, color)
});

function clickColor(r, g, b){

}

$('.label-list').on('click','.label-color-cand-rgb', function(event) {
    var color = $(event.target).parent().children('#color-input')[0].value;
    
    var labelColors = Object.values(remote.getGlobal('projectManager').labelColors)
    if (labelColors.includes(color)){
        alertError("Duplicate Color","Color already used. Please select another color.")
        return;
    }

    $(event.target).parent().prev().children('.label-color').css('background-color',color);
    $(event.target).parent().toggle();

    var labelID = $(event.target).parent().prev().find('span').attr('id')
    remote.getGlobal('projectManager').changeLabelColor(labelID, color)
});