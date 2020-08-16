var selectTask =
  '<div id="select-task-div">' +
  '<select class="custom-select select-task" style="width:300px">' +
  '<option disabled value="None">Select task to annotate</option>' +
  '<option selected value="IC">Image classification</option>' +
  '<option value="OD">Object detection</option>' +
  '<option value="SS">Semantic Segmentation</option>' +
  '<option value="OCR"> Optical character recognition</option>' +
  '</select>' +
  '</div>';

var selectDirs =
  '<div class="input-group mb-3 select-dirs">' +
  '<span class="input-group-text" id="selected-dir-list" style="width:300px">Select at least one directory</span>' +
  '<div class="input-group-append">' +
  '<button class="btn btn-outline-primary" id="select-dirs-btn" type="button">Select directory</button>' +
  '</div>' +
  '</div>';

var createProjectBtn =
  '<div>' +
  '<button type="button" class="btn btn-outline-primary btn-block" id="create-project-btn">Create Project</button>' +
  '</div>';

var createProjectTemplate =
  '<div class="create-project">' +
  '<h1>Annotti</h1>' +
  selectTask +
  selectDirs +
  createProjectBtn +
  '</div>';

module.exports = { createProjectTemplate };
