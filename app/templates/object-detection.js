const { leftMenu } = require('./left-menu');
const { mainView } = require('./main-view');

var objectDetectionTemplate =
  '<div class="main-container">' + leftMenu + '<div class="working-area">' + mainView;

module.exports = { objectDetectionTemplate };
