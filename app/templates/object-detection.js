const { leftMenu } = require('./left-menu');
const { mainView } = require('./main-view');
const { etabs } = require('./etabs');
const { detectionAnalysisTemplate } = require('./detection-analysis');

var objectDetectionTemplate =
  '<div class="main-container">' +
  leftMenu +
  '<div class="working-area">' +
  mainView +
  detectionAnalysisTemplate +
  '</div></div>' +
  etabs +
  '</div>' +
  '<script src="../renderers/tab-commons.js"></script>' +
  '<script src="../renderers/object-detection.js"></script>' +
  '<script src="../renderers/detection-analysis.js"></script>';

module.exports = { objectDetectionTemplate };
