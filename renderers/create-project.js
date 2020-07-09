// Create project
const {dialog} = require('electron')
let $ = require('jquery')

let selected_paths = "None"

function alertError(msg, detail){
  const {remote} = require('electron')
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
  selected_paths = ipcRenderer.sendSync('selectDir')
  
  if(selected_paths=="None"){
    alertError('Directory not selected error', 'Select at least one working directory')
    $('#selected-dirs').text("Select at least one directory")
  }
  else
    $('#selected-dirs').text(selected_paths)
});

// Click create project button
$('#create-project').on('click', () => {
  const {remote} = require('electron')
  let task_id = $('#select-task option:selected').val()

  if(task_id=="None"&&selected_paths=="None")
    alertError('Task and directory not selected error', 'Select task and at least one working directory')
  else if(selected_paths=="None")
    alertError('Directory not selected error', 'Select at least one working directory')
  else if(selected_paths=="None")
    alertError('Task not selected error', 'Select task')
  else{
    remote.getCurrentWindow().loadURL(`file://${__dirname}/../templates/default.html`)
  }
}) 