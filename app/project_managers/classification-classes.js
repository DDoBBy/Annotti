const { file, label, projectManager } = require('./base-classes.js');

class classificationFile extends file {
  constructor(path) {
    super(path);
  }
}

class classificationLabel extends label {
  constructor(name, color) {
    super(name, color);
    this.files = {};
  }
}

class classificationProjectManager extends projectManager {
  constructor() {
    super('IC');
    this.labelList = {};
    this.checkedFiles = {};
    this.activated = null;
  }

  getColorbyLabelID(labelID) {
    return this.labelColors[labelID];
  }

  getLabelIDbyColor(color) {
    return Object.keys(this.labelColors).find((key) => this.labelColors[key] === color);
  }

  getLabelInfos() {
    return this.labelList;
  }

  getLabelIDbyColor(color) {
    return Object.keys(this.labelColors).find((key) => this.labelColors[key] === color);
  }

  changeLabelColor(labelID, newColor) {
    this.labelList[labelID].color = newColor;
    this.labelColors[labelID] = newColor;
    return Object.keys(this.labelList[labelID].files);
  }

  appendLabel(name, color) {
    // Add new label to project
    if (name == null) name = 'New Label ' + (this.labelCounter + 1).toString();

    var newLabel = new classificationLabel(name, color);
    this.labelList[this.labelCounter] = newLabel;
    this.labelColors[this.labelCounter] = color;
    this.labelNames[this.labelCounter] = name;
    this.labelCounter += 1;
    return newLabel;
  }

  deleteLabel(labelID) {
    // Delete label from project
    var fileIDs = Object.keys(this.labelList[labelID].files);
    delete this.labelList[labelID];
    delete this.labelColors[labelID];
    delete this.labelNames[labelID];
    fileIDs.forEach((fildID) => {
      delete this.checkedFiles[fildID];
    });
    return fileIDs;
  }

  activateLabel(labelID) {
    this.activated = labelID;
  }

  selectWork(labelID, fileID) {
    if (this.checkedFiles.hasOwnProperty(fileID)) {
      if (this.checkedFiles[fileID] == labelID) return 'delete';
      else return 'change';
    } else return 'append';
  }

  appendFiletoLabel(labelID, fileID, filePath) {
    var newFile = new classificationFile(filePath);
    this.labelList[labelID].files[fileID] = newFile;
    this.checkedFiles[fileID] = labelID;
  }

  deleteFilefromLabel(labelID, fileID) {
    delete this.labelList[labelID].files[fileID];
    delete this.checkedFiles[fileID];
  }

  changeFileLabel(labelID, fileID, newFilePath) {
    var prevLabel = this.checkedFiles[fileID];
    delete this.labelList[prevLabel].files[fileID];

    var newFile = new classificationFile(newFilePath);
    this.labelList[labelID].files[fileID] = newFile;
    this.checkedFiles[fileID] = labelID;
  }

  colorAlreadyOccupied(color) {
    return Object.values(this.labelColors).includes(color);
  }
  changeLabelColor(labelID, newColor) {
    this.labelList[labelID].color = newColor;
    this.labelColors[labelID] = newColor;
    return Object.keys(this.labelList[labelID].files);
  }

  nameAlreadyOccupied(name) {
    return Object.values(this.labelNames).includes(name);
  }
  changeLabelName(labelID, newName) {
    this.labelList[labelID].name = newName;
    this.labelNames[labelID] = newName;
  }
}

module.exports = { classificationProjectManager };
