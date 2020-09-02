$('.label-menu').css('padding', '15px 20px');

$('.label-infos').on('click', '.activate', function (event) {
  if ($(event.target).prop('checked')) {
    $('[class=activate]').prop('checked', false);
    $(event.target).prop('checked', true);
    remote.getGlobal('projectManager').activateLabel($(event.target).attr('id'));
  } else remote.getGlobal('projectManager').activateLabel(null);
});

$('#data-analysis-btn').on('click', () => {
  $('.detection-analysis-window').css('display', 'block');
  showAnalytics();
});

$('.analysis-close-btn').on('click', () => {
  $('.detection-analysis-window').css('display', 'none');
});

$('#save-btn').on('click', () => {
  !fs.existsSync('results') && fs.mkdirSync('results');

  var dataPaths = remote.getGlobal('projectManager').getDataPaths();
  dataPathsInfo = JSON.stringify(dataPaths);
  fs.writeFileSync('results/detection-dataPaths.json', dataPathsInfo);

  var labelList = remote.getGlobal('projectManager').getLabelList();
  labelInfos = JSON.stringify(labelList);
  fs.writeFileSync('results/detection-labelInfos.json', labelInfos);

  var fileList = remote.getGlobal('projectManager').getFileList();
  boxInfos = JSON.stringify(fileList);
  fs.writeFileSync('results/detection-boxInfos.json', boxInfos);
});

$('#data-analysis-btn').on('click', () => {
  $('.detection-analysis-window').css('display', 'block');
  showAnalytics();
});

$('.analysis-close-btn').on('click', () => {
  $('.detection-analysis-window').css('display', 'none');
});

$('#info-btn').on('click', () => {
  $('.information-window').css('display', 'flex');
});
$('.information-close-btn').on('click', () => {
  $('.information-window').css('display', 'none');
});

$('#save-btn').on('click', () => {
  !fs.existsSync('results') && fs.mkdirSync('results');

  var dataPaths = remote.getGlobal('projectManager').getDataPaths();
  var dataPathJson = {};
  for ([key, value] of Object.entries(dataPaths)) {
    dataPathJson[key] = path.basename(value);
  }
  dataPathsInfo = JSON.stringify(dataPathJson);
  fs.writeFileSync('results/detection-dataPaths.json', dataPathsInfo);

  var labelList = remote.getGlobal('projectManager').getLabelList();
  labelInfos = JSON.stringify(labelList);
  fs.writeFileSync('results/detection-labelInfos.json', labelInfos);

  var fileList = remote.getGlobal('projectManager').getFileList();
  var boxInfosJson = {};
  for ([key, value] of Object.entries(fileList)) {
    boxInfosJson[key] = value.boxes;
  }
  boxInfos = JSON.stringify(boxInfosJson);
  fs.writeFileSync('results/detection-boxInfos.json', boxInfos);
});
