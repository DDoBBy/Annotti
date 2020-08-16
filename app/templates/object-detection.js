const { leftMenu } = require('./left-menu');
const { mainView } = require('./main-view');
const { etabs } = require('./etabs');

var objectDetectionTemplate =
  '<div class="main-container">' +
  leftMenu +
  '<div class="working-area">' +
  mainView +
  '</div></div>' +
  etabs +
  '</div>' +
  '<script src="../renderers/tab-commons.js"></script>';

module.exports = { objectDetectionTemplate };
