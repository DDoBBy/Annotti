var labelMenu =
  '<div class="label-menu">' +
  '<h1 class = "label-tit" style="text-align:center;">Label</h1>' +
  '<div class="label-infos"></div>' +
  '<button type="button" id="add-label" class="btn btn-secondary">' +
  'Add Label' +
  '</button>' +
  '</div>';

function appendLabelTemplate(labelID, color, name) {
  var appendTemplate =
    "<div class='appendLabel' id='label"+labelID+"'>" +
    '<div>' +
    "<span class='label-color' id='" +
    labelID +
    "'style='background-color: " +
    color +
    ";'></span>" +
    "<input type='text' class='label-name' id='" +
    labelID +
    "' value='" +
    name +
    "'>";

  if (remote.getGlobal('projectManager').taskId == 'IC')
    // Activation button
    appendTemplate +=
      "<input type='checkbox' class='activate' id='" +
      labelID +
      "'>" +
      "<span class='label-counter' id='" +
      labelID +
      "'>" +
      '0</span>';

  appendTemplate +=
    "<div class='del' id='del'>X</div></div>" +
    "<div class = 'select-color bubble popover' style='display: none;'>"+
    "<div class='popover-content'>"+
        "<div class='popover-arrow'></div>"+
    "<span class='label-color-cand label-color-circle' style='background-color: #10b1fe;'></span>" +
    "<span class='label-color-cand label-color-circle' style='background-color: #3fc56b;'></span>" +
    "<span class='label-color-cand label-color-circle' style='background-color: #ce9887;'></span>" +
    "<span class='label-color-cand label-color-circle' style='background-color: #f9c859;'></span>" +
    "<span class='label-color-cand label-color-circle' style='background-color: #ff78f8;'></span>" +
    '</br>' +
    "<span class='label-color-cand label-color-circle' style='background-color: #9f7efe;'></span>" +
    "<span class='label-color-cand label-color-circle' style='background-color: #3691ff;'></span>" +
    "<span class='label-color-cand label-color-circle' style='background-color: #ff936a;'></span>" +
    "<span class='label-color-cand label-color-circle' style='background-color: #ff6480;'></span>" +
    "<span class='label-color-cand label-color-circle' style='background-color: #7a82da;'></span>" +
    '</br>' +
    "<input id='color-input' type='text' value='" +
    color +
    "'>" +
    "<button class='btn btn-secondary label-color-cand-rgb'>OK</button>" +
    "</div>"+
    "</div>"+
    '</div>' +
    '</div>';

  return appendTemplate;
}
module.exports = { labelMenu, appendLabelTemplate };
