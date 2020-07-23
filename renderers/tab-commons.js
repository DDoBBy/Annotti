// const {remote} = require('electron')
let $ = require('jquery')
const fs = require('fs')
const path = require('path')
const { remote } = require('electron')
const { openTab } = require('../renderers/tab-functions.js')

let id = 0

function composeImgElements(filePath, thumbnailId){
  var basename = path.basename(filePath)
  if (basename.length > 10){
    basename = basename.slice(0, 5) + "..." + basename.slice(-5)
  }
  var element = '<div class="thumbnail" id="thumbnail-'+thumbnailId+'" onclick="openTab(' + thumbnailId + ')">'+
  '<img src="'+filePath+'" style="display: block;width:80%; height:80%"></img>'+
  '<a class"img-name">'+basename+"</a></div>"
  $('#all-imgs').append(element)
}

async function* fileWaker(ext, dir) {
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name)
    if (dirent.isDirectory())
      yield* fileWaker(ext, res)
    else {
      if(ext.includes(path.extname(res))){
        composeImgElements(res, id++)
        yield res
      }
    }
  }
}

async function getDataPathFromDir(ext, dir){
  let dataPaths = []
  for await (const f of fileWaker(ext, dir))
    dataPaths.push(f)
  return dataPaths
}

async function searchSelectedDirs(ext){
  let dataPaths = []
  let workingDirectory = remote.getGlobal('projectManager').workingDirectory
  for (i=0;i<workingDirectory.length;i++){
    let paths = await getDataPathFromDir(ext, workingDirectory[i])
    dataPaths = dataPaths.concat(paths)
  }
  return dataPaths
}

async function getAllDataPaths(){
  const imgExtensions = ['.png', '.jpg', '.jpeg']
  let dataPaths = await searchSelectedDirs(imgExtensions)
  remote.getGlobal('projectManager').setDataPaths(dataPaths)
}

$(document).ready(getAllDataPaths)
