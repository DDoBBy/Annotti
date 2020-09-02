var selectTask =
  '<div id="select-task-div">' +
  '<select class="custom-select select-task">' +
  '<option selected value="IC">Image classification</option>' +
  '<option value="OD">Object detection</option>' +
  '</select>' +
  '</div>';

var selectDirs =
  '<div class="input-group mb-3 select-dirs">' +
  '<span class="input-group-text" id="selected-dir-list">Select at least one directory' +
  '<div class="input-group-append"><button id="select-dirs-btn"><img src="../resources/imgs/annotti_directory.png" alt="select directory"></button></div>' +
  '</span>' +
  '</div>';

var createProjectBtn =
  '<div>' +
  '<button type="button" class="btn btn-outline-primary btn-block" id="create-project-btn">Create Project</button>' +
  '</div>';

var createProjectTemplate =
  '<div class="create-project">' +
  '<div class="create-project-box">' +
  '<img id="project-logo" src="../resources/imgs/annotti_1.png" alt="logo">' +
  selectTask +
  selectDirs +
  createProjectBtn +
  '</div>' +
  '</div>';

module.exports = { createProjectTemplate };
