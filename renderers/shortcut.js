let $ = require('jquery')
const { remote } = require('electron')
const { app, globalShortcut } = remote
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
    console.log(label.hotKey)

    //여기에 단축키 설정하는 코드를 넣을까?

    app.whenReady().then(() => {
        globalShortcut.register(label.hotKey, () => {
            console.log('HIHI')
        })
    })

    // Mousetrap.bind(label.hotKey, () => { console.log('HOTKEY CLICKED') })

  });

$(document).ready(getLabels)