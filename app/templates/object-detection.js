const { leftMenu } = require('./left-menu');
const { mainView } = require('./main-view');
const { labelMenu } = require('./labels');
const { detectionAnalysisTemplate } = require('./detection-analysis');
const { InformationTemplate } = require('./information');
const { DetectionWorkingArea } = require('./detection-working-area');

var objectDetectionTemplate =
  '<div class="main-container">' +
  leftMenu +
  InformationTemplate +
  detectionAnalysisTemplate +
  '<div class="working-area">' +
  mainView +
  '</div>' +
  '</div>' +
  DetectionWorkingArea +
  labelMenu +
  '</div>' +
  '<script src="../renderers/tab-commons.js"></script>' +
  '<script src="../renderers/add-label.js"></script>' +
  '<script src="../renderers/detection-functions.js"></script>' +
  '<script src="../renderers/object-detection.js"></script>' +
  '<script src="../renderers/detection-analysis.js"></script>';

module.exports = { objectDetectionTemplate };
