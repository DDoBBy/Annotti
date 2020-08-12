// Desktop menu(맨 위에 뜨는 메뉴 설정)
const { app, shell, dialog, Menu, BrowserWindow } = require('electron');
const appName = app.getName();

let arrMenu = [
  {
    label: '편집',
    submenu: [
      {
        label: '실행취소',
        role: 'undo',
      },
      {
        label: '다시실행',
        role: 'redo',
      },
      {
        type: 'separator',
      },
      {
        label: '잘라내기',
        role: 'cut',
      },
      {
        label: '복사',
        role: 'copy',
      },
      {
        label: '붙여넣기',
        role: 'paste',
      },
      {
        label: '모두선택',
        role: 'selectall',
      },
      {
        label: '삭제',
        role: 'delete',
      },
    ],
  },
  {
    label: '창',
    role: 'window',
    submenu: [
      {
        label: '최소화',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize',
      },
      {
        label: '&닫기',
        accelerator: 'CmdOrCtrl+W',
        role: 'close',
      },
      {
        type: 'separator',
      },
      {
        role: 'togglefullscreen',
      },
    ],
  },

  {
    label: '사이트',
    role: 'help',
  },
  {
    label: '포탈',
    submenu: [
      {
        label: '&네이버',
        click() {
          shell.openExternal('http://naver.com');
        },
      },
    ],
  },
  {
    label: '클릭',
    submenu: [
      {
        label: '다이얼로그창을 보여주세요',
        click() {
          dialog.showMessageBox({
            message: 'Electron의 dialog.showMessageBox 창!!',

            buttons: ['확인'],
          });
        },
      },
      {
        label: '제목에 붉은배경색 칠하기',
        click() {
          BrowserWindow.getFocusedWindow().webContents.executeJavaScript('changeColor()');
        },
      },
    ],
  },
];

// OS 구분
if (process.platform === 'darwin') {
  arrMenu.unshift({
    label: appName,
    submenu: [
      {
        label: '프로그램 종료',
        role: 'quit',
      },
    ],
  });
} else {
  arrMenu.unshift({
    label: '파일',
    submenu: [
      {
        label: '프로그램 종료',
        role: 'quit',
      },
    ],
  });
}

var menu = Menu.buildFromTemplate(arrMenu);
module.exports = menu;
