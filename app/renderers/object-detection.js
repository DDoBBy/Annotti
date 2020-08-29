$('.label-menu').css('padding', '15px 20px');

$('.label-infos').on('click', '.activate', function (event) {
  if ($(event.target).prop('checked')) {
    $('[class=activate]').prop('checked', false);
    $(event.target).prop('checked', true);
    remote.getGlobal('projectManager').activateLabel($(event.target).attr('id'));
  } else remote.getGlobal('projectManager').activateLabel(null);
});

$('#tab-image').on('click', '#label-canvas', function (event) {
  if (event.altKey) {
    // Ctrl key doesn't working at MAC OS
    if (remote.getGlobal('projectManager').activated == null)
      alertError('Label selection error', 'You need to select label before assign it to data');
    else {
      // Annotation
      var fileID = $(event.target).attr('id');
      var filePath = $(event.target).attr('src');
      var labelID = remote.getGlobal('projectManager').activated;
      var labelColor = remote.getGlobal('projectManager').getColorbyLabelID(labelID);

      //   remote.getGlobal('projectManager').append_file_label(fileID, labelID);
      //   var x1 = event.pageX;
      //   var y1 = event.pageY;
      //   var x2 = x1 + 30;
      //   var y2 = y1 + 30;
      //   var position = {
      //     x1: x1,
      //     y1: y1,
      //     x2: x2,
      //     y2: y2,
      //   };
      //   remote.getGlobal('projectManager').appendDetectionBox(fileID, labelID, position);
      //   console.log(remote.getGlobal('projectManager').fileList[fileID][labelID]);
    }
  }
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
  dataPathsInfo = JSON.stringify(dataPaths);
  fs.writeFileSync('results/detection-dataPaths.json', dataPathsInfo);

  var labelList = remote.getGlobal('projectManager').getLabelList();
  labelInfos = JSON.stringify(labelList);
  fs.writeFileSync('results/detection-labelInfos.json', labelInfos);

  var fileList = remote.getGlobal('projectManager').getFileList();
  boxInfos = JSON.stringify(fileList);
  fs.writeFileSync('results/detection-boxInfos.json', boxInfos);
});
