let $ = require('jquery')
const { remote, ipcRenderer } = require('electron')

var shortcutArray = new Array()

function getLabels(){
    var labelNo = remote.getGlobal('projectManager').labelCounter
    var labelList = Object.values(remote.getGlobal('projectManager').labelList)
    for(label in labelList){
        var labelColor = labelList[label].color
        var labelName = labelList[label].name
        var labelTemplate = setLabelDiv(labelName, labelColor, label)
        $(".list-label").append(labelTemplate)
    }
}

$('#keyboard li').click(function(){
	var $this = $(this), character = $this.html();
    
    var selectedKey = "<div class = 'selected-key'>"+character+"</div>"
    $("#selected").append(selectedKey);

    shortcutArray.push(character);
});

function setLabelDiv(labelName, labelColor, labelID){
    var labelTemplate = "<div class = 'label' style='background-color: "+labelColor+"'>"+labelName+"<input type='radio' class='selected-label' value='"+labelID+"' "+"/>"+"</div>"
    return labelTemplate
}

//OK 버튼을 어디에 둘까...?
$('.ok').on('click', () => {
    if(shortcutArray.includes("Ctrl")){
        shortcutArray.splice(shortcutArray.indexOf("Ctrl"),1,"CmdOrCtrl")
    }
    var labelID = $("input:radio[class='selected-label']:checked"). val( );
    var label = Object.values(remote.getGlobal('projectManager').labelList)[labelID]
    label.setHotKey(shortcutArray.join('+'))

    ipcRenderer.send('hotkeySetting',labelID, label.hotKey)

  });

$(document).ready(getLabels)