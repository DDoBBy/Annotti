const { createProjectTemplate } = require('../templates/create-project');
const { classificationTemplate } = require('../templates/classification');
const { objectDetectionTemplate } = require('../templates/object-detection');
// const { segmentationTemplate } = require('../templates/segmentation');
// const { ocrTemplate } = require('../templates/ocr');

let workingDirectory = ['/Users/sinhyeonji/Downloads/annotti_icon'];

function composeUI() {
  $('#root').append(createProjectTemplate);
}

// Click select directory button
$('#root').on('click', '#select-dirs-btn', () => {
  workingDirectory = ipcRenderer.sendSync('selectDir');
  if (workingDirectory != 'None') {
    $('#selected-dir-list').text(workingDirectory);
  }
});

// Click create project button
$('#root').on('click', '#create-project-btn', () => {
  let taskId = $('.select-task option:selected').val();
  // Both None
  if (taskId == 'None' && workingDirectory == 'None')
    alertError(
      'Task and directory not selected error',
      'Select task and at least one working directory'
    );
  // Working directory = None
  else if (workingDirectory == 'None')
    alertError('Directory not selected error', 'Select at least one working directory');
  // TaskID = None
  else if (taskId == 'None') alertError('Task not selected error', 'Select task');
  // All info entered
  else {
    ipcRenderer.sendSync('setProjectManager', taskId);
    remote.getGlobal('projectManager').setWorkingDirectory(workingDirectory);
    $('#root').empty();
    if (taskId == 'IC') $('#root').append(classificationTemplate);
    else if (taskId == 'OD') $('#root').append(objectDetectionTemplate);
    // else if (taskId == 'SS') $('#root').append(segmentationTemplate);
    // else if (taskId == 'OCR') $('#root').append(ocrTemplate);
  }
});

$(document).ready(composeUI);
