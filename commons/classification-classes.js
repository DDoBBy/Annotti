const {file, label, projectManager} = require("./base-classes.js")

class classificationFileInfo extends file{
    constructor(path){
        super(path)
        this.checked = false
    }
}

class classificationLabel extends label{
    constructor(name, color, hotKey){
        super(name, color, hotKey)
        this.files = new Array()
    }
}

class classificationProjectManager extends projectManager{
    constructor(){
        super("IC")
        this.icLabels = new Array()
        this.icFileInfos = new Array()
    }

    append_icLabel(label){
        this.icLabels.push(label)
    }
}

module.exports = { classificationFileInfo, classificationLabel, classificationProjectManager }
