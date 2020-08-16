const TabGroup = require('electron-tabs');
let tabGroup;
let tab;

function readyTab() {
  tabGroup = new TabGroup();
}

function openTab(thumbnailId) {
  var filePath = remote.getGlobal('projectManager').dataPaths[thumbnailId];
  var basename = path.basename(filePath);

  $('.working-area').css('display', 'none');
  $('.tab-area').css('display', 'flex');
  $('.etabs-tabgroup').css('max-width', $('.tab-area').width() - 15);

  var ret_flag = false;
  tabGroup.eachTab(function (cur) {
    if (cur.title == basename) {
      cur.activate();
      ret_flag = true;
    }
  });
  if (ret_flag) return;

  tab = tabGroup.addTab({
    title: basename,
    src: '../templates/tab.html?id=' + thumbnailId,
    visible: true,
    active: true,

    webviewAttributes: {
      nodeintegration: true,
    },
  });

  tab.setPosition(1);
  $('.etabs-tab-title').css('title', basename);

  const webview = document.querySelector('webview');
  webview.addEventListener('dom-ready', () => {
    webview.openDevTools();
  });

  tab.on('webview-ready', (tab) => {
    webview.addEventListener('console-message', (e) => {
      //console.log('Guest page logged a message:', e.message);
    });
  });

  tab.on('close', (tab) => {
    if (tabGroup.getActiveTab() == null) {
      $('.working-area').css('display', 'block');
      $('.tab-area').css('display', 'none');
    }
  });
}

module.exports = { readyTab, openTab };
