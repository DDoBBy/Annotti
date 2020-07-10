// const {remote} = require('electron')
let $ = require('jquery')
const { remote } = require('electron')
const fs = require('fs')
const path = require('path');
let id = 0

function composeImgElements(filePath, thumbnailId){
  let element = '<div class="thumbnail" id="thumbnail-'+thumbnailId+'">'+
  '<img src="'+filePath+'" style="display: block;width:50px; height:50px"></img>'+
  '<a class"img-name">'+path.basename(filePath)+"</a></div>"
  $('#all-imgs').append(element)
}

async function* fileWaker(ext, dir) {
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory())
      yield* fileWaker(ext, res);
    else {
      if(ext.includes(path.extname(res))){
        composeImgElements(res, id++)
        yield res;
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
  let workingDirectory = remote.getGlobal('workingDirectory')
  for (i=0;i<workingDirectory.length;i++){
    let paths = await getDataPathFromDir(ext, workingDirectory[i])
    dataPaths = dataPaths.concat(paths)
  }
  return dataPaths
}

async function getAllDataPaths(){
  const imgExtensions = ['.png', '.jpg', '.jpeg']
  let test = await searchSelectedDirs(imgExtensions)
  console.log(test) // 모든 이미지 경로 array 필요한 사람 이 뒤로부터 쓰면 될듯
}

$(document).ready(getAllDataPaths);
