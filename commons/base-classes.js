class file{
    constructor(path){
        this.path = path
    }
}

class label{
    constructor(name, color, hotKey){
        this.name = name
        this.color = color
        this.hotKey = hotKey
        this.labelShow = true // blink 상태
    }
}

class projectManager{
    constructor(taskId){
        this.taskId = taskId
        this.workingDirectory = []
        this.dataPaths = []
    }

    setWorkingDirectory(workingDirectory){
        this.workingDirectory = workingDirectory
    }

    setDataPaths(dataPaths){
        this.dataPaths = dataPaths
    }

}

module.exports = { file, label, projectManager }
