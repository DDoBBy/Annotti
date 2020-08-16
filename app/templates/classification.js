const { leftMenu } = require('./left-menu');
const { mainView } = require('./main-view');
const { labelMenu } = require('./labels');

var classificationTemplate =
  '<div class="main-container">' +
  leftMenu +
  '<div class="working-area">' +
  mainView +
  labelMenu +
  '</div>' +
  '</div>' +
  '<script src="../renderers/commons.js"></script>' +
  '<script src="../renderers/add-label.js"></script>' +
  '<script src="../renderers/classification.js"></script>';

module.exports = { classificationTemplate };
