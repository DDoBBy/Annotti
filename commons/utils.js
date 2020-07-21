
const {remote} = require('electron')

function alertError(msg, detail){
  remote.dialog.showMessageBox({
    type:'error',
    title:'Error',
    message: msg,
    detail: detail
  })
}
  
module.exports = { alertError }
