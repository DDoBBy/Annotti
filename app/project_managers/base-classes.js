class file {
  constructor(path) {
    this.path = path;
  }
}

class label {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
}

class projectManager {
  constructor(taskId) {
    this.taskId = taskId;

    this.workingDirectory = [];
    this.dataPaths = {};

    this.labelCounter = 0; // To make default label ID
    this.labelColors = {}; // To check duplicated label color
    this.labelNames = {}; // To check duplicated label name
  }

  setWorkingDirectory(workingDirectory) {
    this.workingDirectory = workingDirectory;
  }

  appendDataPaths(dataPaths) {
    this.dataPaths = { ...this.dataPaths, ...dataPaths };
  }

  getDataPaths() {
    return this.dataPaths;
  }

  getColorbyLabelID(labelID) {
    return this.labelColors[labelID];
  }

  getLabelIDbyColor(color) {
    return Object.keys(this.labelColors).find((key) => this.labelColors[key] === color);
  }

  nameAlreadyOccupied(name) {
    return Object.values(this.labelNames).includes(name);
  }

  changeLabelName(labelID, newName) {
    this.labelNames[labelID] = newName;
  }

  colorAlreadyOccupied(color) {
    return Object.values(this.labelColors).includes(color);
  }
}

module.exports = { file, label, projectManager };
