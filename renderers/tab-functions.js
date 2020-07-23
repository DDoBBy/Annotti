const TabGroup = require("electron-tabs");
let tabGroup;
let tab;

function readyTab(){
    tabGroup = new TabGroup();
}

function openTab(thumbnailId){
    console.log(thumbnailId);
    var filePath = remote.getGlobal('projectManager').dataPaths[thumbnailId];
    var basename = path.basename(filePath);
    if (basename.length > 10){
        basename = basename.slice(0, 5) + "..." + basename.slice(-5);
    }


    $('#working-area').css("display", "none");
    $('#tab-area').css("display", "block");
    
    tabGroup = new TabGroup();

    tab = tabGroup.addTab({
        title: basename,
        src: "../templates/tab.html",
        visible: true,
        active: true
    });

    tab.on("close", (tab) => {
        if(tabGroup.getActiveTab() == null){
            $('#working-area').css("display", "block");
            $('#tab-area').css("display", "none");
        }
    });
}


module.exports = { readyTab, openTab }