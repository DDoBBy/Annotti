const { file, label, projectManager } = require('./base-classes.js');

class detectionBox {
  constructor(labelID, x1, y1, x2, y2) {
    this.labelID = labelID;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
}

class detectionLabel extends label {
  constructor(name, color) {
    super(name, color);
  }
}

class detectionFile extends file {
  constructor(path) {
    super(path);
    this.boxes = {};
  }
}

class detectionProjectManager extends projectManager {
  constructor() {
    super('OD');
    this.fileList = {};
    this.labelList = {};
    this.activated = null;
  }

  appendLabel(name, color) {
    if (name == null) name = 'New Label ' + (this.labelCounter + 1).toString();

    var newLabel = new detectionLabel(name, color);
    this.labelList[this.labelCounter] = newLabel;
    this.labelColors[this.labelCounter] = color;
    this.labelNames[this.labelCounter] = name;
    this.labelCounter += 1;
    return newLabel;
  }

  deleteLabel(labelID) {
    delete this.labelList[labelID];
    delete this.labelColors[labelID];
  }

  changeLabelColor(fileID, labelID, newColor) {
    this.labelList[labelID].color = newColor;
    this.labelColors[labelID] = newColor;
    return this.fileList[fileID];
  }

  changeLabelName(labelID, newName) {
    this.labelList[labelID].name = newName;
    this.labelNames[labelID] = newName;
  }

  activateLabel(labelID) {
    this.activated = labelID;
  }

  openFileTab(fileID, filePath) {
    this.fileList[fileID] = new detectionFile(filePath);
  }

  appendBox(fileID, labelID, boxID, x1, y1, x2, y2) {
    var newBox = new detectionBox(labelID, x1, y1, x2, y2);
    this.fileList[fileID].boxes[boxID] = newBox;
  }

  deleteBox(fileID, boxID) {
    delete this.fileList[fileID].boxes[boxID];
  }

  changeBoxLable(fileID, labelID, boxID) {
    this.fileList[fileID].boxes[boxID].labelID = labelID;
  }

  changeBoxPosition(fileID, boxID, x1, y1, x2, y2) {
    this.fileList[fileID].boxes[boxID].x1 = x1;
    this.fileList[fileID].boxes[boxID].y1 = y1;
    this.fileList[fileID].boxes[boxID].x2 = x2;
    this.fileList[fileID].boxes[boxID].y2 = y2;
  }

  getLabelInfos() {
    return this.labelList;
  }

  getFileInfos() {
    return this.fileList;
  }
}

module.exports = { detectionProjectManager };
