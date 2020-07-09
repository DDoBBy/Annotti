
function selectDir(event){
  const { dialog } = require('electron')

  dialog.showOpenDialog({
    title: 'Select working directory',
    defaultPath: __dirname,
    properties: ['openDirectory', 'multiSelections'],
  }).then((results)=>{
    if(results.canceled)
      event.returnValue = "None"
    else{
      global.workingDirectory = results.filePaths
      event.returnValue = results.filePaths
    }
  }).catch(err => {
    console.log(err)
  })
}

module.exports = selectDir;
