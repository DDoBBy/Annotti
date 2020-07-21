const {file, label, projectManager} = require("./base-classes.js")

class classificationFileInfo extends file{
  constructor(path){
    super(path)
    this.checked = false
  }
}

class classificationLabel extends label{
  constructor(name, color){
    super(name, color)
    this.files = new Array()
  }
}

class classificationProjectManager extends projectManager{
  constructor(){
    super("IC")
    this.labelList = {}
    this.activated = null
  }

  changeLabelColor(labelID, newColor){
    this.labelList[labelID].color = newColor
    this.labelColors[labelID] = newColor
  }

  appendLabel(name, color){
    this.labelCounter += 1

    if (name == null)
        name = 'New Label ' + (this.labelCounter).toString()
    
    let newLabel = new classificationLabel(name, color)
    this.labelList[this.labelCounter] = newLabel
    this.labelColors[this.labelCounter] = color
    return newLabel
  }

  deleteLabel(labelID){
    delete this.labelList[labelID]
    delete this.labelColors[labelID]
  }

  activateLabel(labelID){
    this.activated = labelID
  }

}

module.exports = { classificationFileInfo, classificationLabel, classificationProjectManager }
