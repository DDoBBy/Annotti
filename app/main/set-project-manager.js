const { classificationProjectManager } = require('../project_managers/classification-classes.js');
const { detectionProjectManager } = require('../project_managers/detection-classes.js');

function setProjectManager(event, taskId) {
  if (taskId == 'IC')
    // Image classification
    global.projectManager = new classificationProjectManager();
  else if (taskId == 'OD') {
    // Object detection
    global.projectManager = new detectionProjectManager();
  }
  event.returnValue = 'Set project manager -Done';
}

module.exports = setProjectManager;
