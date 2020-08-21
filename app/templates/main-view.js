const { breadCrumb } = require('./breadcrumb');

var mainView =
  '<div class="main-view"><div class="finder">' +
  breadCrumb +
  '<div class="grid-view-files" id="all-imgs"></div></div>';

module.exports = { mainView };
