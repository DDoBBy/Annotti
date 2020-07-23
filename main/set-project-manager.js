
const { classificationProjectManager } = require("../commons/classification-classes.js")
const { detectionProjectManager } = require("../commons/detection-classes.js")

function setProjectManager(event, taskId){
    if (taskId == "IC") // Image classification
        global.projectManager = new classificationProjectManager()
    else if (taskId == "OD") // Object detection
        global.projectManager = new detectionProjectManager()
    else if (taskId == "SS") // Symantic segmentation
        console.log("SS")
    else if (taskId == "OCR") // Optical character recognition
        console.log("OCR")
    event.returnValue = "Set project manager -Done"
  }
  
  module.exports = setProjectManager;
  