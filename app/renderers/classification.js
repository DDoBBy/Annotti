$('.label-infos').on('click', '.activate', function (event) {
  if ($(event.target).prop('checked')) {
    $('[class=activate]').prop('checked', false);
    $(event.target).prop('checked', true);
    remote.getGlobal('projectManager').activateLabel($(event.target).attr('id'));
  } else remote.getGlobal('projectManager').activateLabel(null);
});

$('.working-datas').on('click', '.thumbnail', function (event) {
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
      var work = remote.getGlobal('projectManager').selectWork(labelID, fileID);

      if (work == 'append') {
        remote.getGlobal('projectManager').appendFiletoLabel(labelID, fileID, filePath);
        $(event.target).css({ border: '8px solid' + labelColor });
        $('#' + labelID + '.label-counter').text(
          Number($('#' + labelID + '.label-counter').text()) + 1
        );
      } else if (work == 'delete') {
        remote.getGlobal('projectManager').deleteFilefromLabel(labelID, fileID, filePath);
        $(event.target).css({ border: 'none' });
        $('#' + labelID + '.label-counter').text(
          Number($('#' + labelID + '.label-counter').text()) - 1
        );
      } else {
        // 'change'
        prevLabelID = remote
          .getGlobal('projectManager')
          .getLabelIDbyColor(rgb2hex($(event.target).css('border-color')));
        $('#' + prevLabelID + '.label-counter').text(
          Number($('#' + prevLabelID + '.label-counter').text()) - 1
        );
        $('#' + labelID + '.label-counter').text(
          Number($('#' + labelID + '.label-counter').text()) + 1
        );
        remote.getGlobal('projectManager').changeFileLabel(labelID, fileID, filePath);
        $(event.target).css({ border: '8px solid' + labelColor });
      }
    }
  }
});

$('#data-analysis').on('click', () => {
  !fs.existsSync('logs') && fs.mkdirSync('logs');
  fs.writeFileSync('logs/log-classification.html', document.documentElement.outerHTML);
  remote
    .getCurrentWindow()
    .loadURL(`file://${__dirname}/../templates/classification-analysis.html`);
});

$('#save').on('click', () => {
  var labelInfos = remote.getGlobal('projectManager').getLabelInfos();
  var names = {};
  for ([key, value] of Object.entries(labelInfos)) {
    names[key] = value.name;
  }
  jsonInfo = JSON.stringify(names);
  !fs.existsSync('results') && fs.mkdirSync('results');
  fs.writeFileSync('results/classification.json', jsonInfo);
});
