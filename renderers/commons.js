// const {remote} = require('electron')
let $ = require('jquery')
const { remote } = require('electron')
const fs = require('fs')
const path = require('path')

let imgPaths = []


function fileWalker(dir, ext, done) {
  let results = []
  fs.readdir(dir, function(err, list) {
    if (err) return done(err)
    var pending = list.length
    if (!pending) return done(null, results)
    list.forEach(function(file){
      file = path.resolve(dir, file)
      fs.stat(file, function(err, stat){
        if (stat && stat.isDirectory()) {
          results.push(file)
          fileWalker(file, ext, function(err, res){
              results = results.concat(res)
              if (!--pending) done(null, results)
          })
        } else {
          if(ext.includes(path.extname(file))){
            results.push(file);
            imgPaths = imgPaths.concat(file)
            $('#test-imgs').append("<h3 id=selected-img-"+imgPaths.length+">"+file+"</h3>")
          }
          if (!--pending) done(null, results)
        }
      })
    })
  })
}

function loadImg(){
  const imgExtensions = ['.png', '.jpg', '.jpeg']
  let workingDirectory = remote.getGlobal('workingDirectory')    
    
  for(i=0;i<workingDirectory.length;i++){
    fileWalker(workingDirectory[i], imgExtensions, function(err, data){
      if(err)
          throw err;
      imgPaths = imgPaths.concat(data)
    });
  }
}

$(document).ready(loadImg);
