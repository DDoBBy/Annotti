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
