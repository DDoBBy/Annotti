let $ = require('jquery')
const fs = require('fs')
const path = require('path')
const { remote } = require('electron')
const { data } = require('jquery')

let id = 0
const imgExtensions = ['.png', '.jpg', '.jpeg', '.PNG', '.JPG', '.JPEG']

function composeImgElements(filePath, imgInfoId){
  var basename = path.basename(filePath)
  if (basename.length > 10){
    basename = basename.slice(0, 5) + "..." + basename.slice(-5)
  }
  var element = '<div class="img-info" id="'+imgInfoId+'">'+
  '<img class="thumbnail" id="'+imgInfoId+'" src="'+filePath+'" style="display: block;width:80px; height:80px"></img>'+
  '<a class"img-name">'+basename+"</a></div>"
  $('#all-imgs').append(element)
}

function composeFolderElements(folderPath){
  var basename = path.basename(folderPath)
  var element = '<div class="folder-info">'+
  '<img class="folder-thumbnail" id="'+folderPath+'" src="../resources/imgs/folder.png" style="display: block;width:80px; height:80px"></img>'+
  '<a class"img-name">'+basename+"</a></div>"
  $('#all-imgs').append(element)
}


async function readFolder(folderPath) {
  var dataPaths = []
  var dir = await fs.promises.opendir(folderPath);
  for await (const dirent of dir) {
    dataPath = path.resolve(folderPath, dirent.name)
    if (dirent.isDirectory())
      composeFolderElements(dataPath)
    else{
      if(imgExtensions.includes(path.extname(dataPath))){
        composeImgElements(dataPath, id++)
        dataPaths.push(dataPath)
      }
    }
  }
  remote.getGlobal('projectManager').appendDataPaths(dataPaths)
  return dataPaths
}


async function showSelectedDirectories(){
  var workingDirectory = remote.getGlobal('projectManager').workingDirectory
  for (const folderPath of workingDirectory){
    await composeFolderElements(folderPath)
  }
}

$('.working-datas').on('click', '.folder-thumbnail', function(event) {
  var folderPath = $(event.target).attr('id')
  readFolder(folderPath)
});


$('document').ready(showSelectedDirectories)
