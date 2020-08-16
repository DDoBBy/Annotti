class file {
  constructor(path) {
    this.path = path;
  }
}

class label {
  constructor(name, color) {
    this.name = name;
    this.color = color;
    this.hotKey = null;
    this.labelShow = true; // blink status
  }
  setHotKey(hotKey) {
    this.hotKey = hotKey;
  }
}

class projectManager {
  constructor(taskId) {
    this.taskId = taskId;

    this.workingDirectory = [];
    this.dataPaths = [];

    this.labelCounter = 0; // To make default label ID
    this.labelColors = {}; // To check duplicated label color
    this.labelNames = {}; // To check duplicated label name
  }

  setWorkingDirectory(workingDirectory) {
    this.workingDirectory = workingDirectory;
  }

  setDataPaths(dataPaths) {
    // Legacy
    this.dataPaths = dataPaths;
  }
  appendDataPaths(dataPaths) {
    this.dataPaths = this.dataPaths.concat(dataPaths);
  }

  changeLabelColor(labelID, newColor) {
    this.labelColors[labelID] = newColor;
  }

  changeLabelName(labelID, newName) {
    this.labelNames[labelID] = newName;
  }

  appendLabel() {
    throw new Error('appendLabel() not implemented');
  }

  deleteLabel() {
    throw new Error('deleteLabel() not implemented');
  }
}

module.exports = { file, label, projectManager };
