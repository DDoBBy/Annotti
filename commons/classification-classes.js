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
    }
}

module.exports = { classificationFileInfo, classificationLabel, classificationProjectManager }
