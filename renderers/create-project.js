// Create project
const {remote} = require('electron')
let $ = require('jquery')

function alertError(msg, detail){
  remote.dialog.showMessageBox({
    type:'error',
    title:'Error',
    message: msg,
    detail: detail
  })
}

// Click select directory button
$('#select-dir').on('click', () => {
  const {ipcRenderer} = require('electron')
  ipcRenderer.sendSync('selectDir')
  let workingDirectory = remote.getGlobal('workingDirectory')
  if(workingDirectory!="None")
    $('#selected-dirs').text(workingDirectory)
});

// Click create project button
$('#create-project').on('click', () => {
  let taskId = $('#select-task option:selected').val()
  let workingDirectory = remote.getGlobal('workingDirectory')
  
  if(taskId=="None"&&workingDirectory=="None")
    alertError('Task and directory not selected error', 'Select task and at least one working directory')
  else if(workingDirectory=="None")
    alertError('Directory not selected error', 'Select at least one working directory')
  else if(taskId=="None")
    alertError('Task not selected error', 'Select task')
  else
    remote.getCurrentWindow().loadURL(`file://${__dirname}/../templates/default.html`)
}) 