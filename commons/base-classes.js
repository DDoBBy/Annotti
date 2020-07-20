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
    this.labelShow = true   // blink status
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
    this.labelColors = {}
    this.labelList = {}        
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
    this.labelList[this.labelCounter] = newLabel
    this.labelColors[this.labelCounter] = color
    console.log(this.labelList)
    console.log(this.labelColors)
    return newLabel
  }

  deleteLabel(labelID){
    delete this.labelList[labelID]
    delete this.labelColors[labelID]
    console.log(this.labelList)
    console.log(this.labelColors)
  }

  changeLabelColor(labelID, newColor){
    this.labelList[labelID].color = newColor
    this.labelColors[labelID] = newColor
    console.log(this.labelList)
    console.log(this.labelColors)
  }
}

module.exports = { file, label, projectManager }
