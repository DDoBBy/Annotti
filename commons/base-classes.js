class file{
  constructor(path){
    this.path = path
  }
}

class label{
  constructor(name, color){
    this.name = name
    this.color = color
    this.hotKey = null
    this.labelShow = true // blink 상태
  }
  setHotKey(hotKey){
    this.hotKey = hotKey
  }
}

class projectManager{
  constructor(taskId){
    this.taskId = taskId
    this.workingDirectory = []
    this.dataPaths = []

    this.labelCounter = 0    // To make default label ID
    this.lables = {}
  }

  setWorkingDirectory(workingDirectory){
    this.workingDirectory = workingDirectory
  }

  setDataPaths(dataPaths){
    this.dataPaths = dataPaths
  }

  appendLabel(name, color){
    this.labelCounter += 1

    if (name == null)
      name = 'New Label ' + (this.labelCounter).toString()
    
    let newLabel = new label(name, color)
    this.lables[this.labelCounter] = newLabel

    return newLabel
  }

  deleteLabel(labelID){
    delete this.lables[labelID];
  }

}

module.exports = { file, label, projectManager }
