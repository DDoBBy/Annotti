const TabGroup = require("electron-tabs");


function openTab(thumbnailId){
    console.log(thumbnailId);
    var filePath = remote.getGlobal('projectManager').dataPaths[thumbnailId];
    var basename = path.basename(filePath);
    if (basename.length > 10){
        basename = basename.slice(0, 5) + "..." + basename.slice(-5);
    }


    $('#working-area').css("display", "none");
    $('#tab-area').css("display", "block");
    
    let tabGroup = new TabGroup();

    let tab = tabGroup.addTab({
        title: basename,
        src: "../templates/tab.html",
        visible: true,
        active: true
    });
}


module.exports = { openTab }