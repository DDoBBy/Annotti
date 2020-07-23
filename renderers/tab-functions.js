const TabGroup = require("electron-tabs");


function openTab(thumbnailId){
    console.log(thumbnailId);
    $('#working-area').css("display", "none");
    $('#tab-area').css("display", "block");
    
    let tabGroup = new TabGroup();

    let tab = tabGroup.addTab({
        title: "tab",
        //src: "http://electron.atom.io",
        src: "../templates/tab.html",
        visible: true
    });
}


module.exports = { openTab }