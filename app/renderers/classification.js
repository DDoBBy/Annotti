const { getImageCanvas } = require('../renderers/draw-image');

const selection = Selection.create({
  class: 'selection',
  selectables: ['#all-imgs > div'],
  boundaries: ['#all-imgs'],
});

selection
  .on('beforestart', (evt) => {
    if (!evt.oe.altKey) return false;
    var labelID = remote.getGlobal('projectManager').activated;
    if (labelID == null) return false;
  })
  .on('move', ({ changed: { added } }) => {
    var labelID = remote.getGlobal('projectManager').activated;
    var labelColor = remote.getGlobal('projectManager').getColorbyLabelID(labelID);

    for (const el of added) {
      if (el.className == 'folder-info') continue;
      var fileID = el.id;
      var filePath = el.children[0].src;
      var work = remote.getGlobal('projectManager').selectWork(labelID, fileID);
      if (work == 'append') {
        remote.getGlobal('projectManager').appendFiletoLabel(labelID, fileID, filePath);
        el.children[0].style.cssText = 'border: 8px solid' + labelColor + ';';
        $('#' + labelID + '.label-counter').text(
          Number($('#' + labelID + '.label-counter').text()) + 1
        );
      } else if (work == 'delete') {
        remote.getGlobal('projectManager').deleteFilefromLabel(labelID, fileID, filePath);
        el.children[0].style.cssText = 'border: none;';
        $('#' + labelID + '.label-counter').text(
          Number($('#' + labelID + '.label-counter').text()) - 1
        );
      } else {
        prevLabelID = remote
          .getGlobal('projectManager')
          .getLabelIDbyColor(rgb2hex(el.children[0].style.borderColor));
        $('#' + prevLabelID + '.label-counter').text(
          Number($('#' + prevLabelID + '.label-counter').text()) - 1
        );
        $('#' + labelID + '.label-counter').text(
          Number($('#' + labelID + '.label-counter').text()) + 1
        );
        remote.getGlobal('projectManager').changeFileLabel(labelID, fileID, filePath);
        el.children[0].style.cssText = 'border: 8px solid' + labelColor + ';';
      }
    }
  })
  .on('stop', ({ inst }) => {
    inst.keepSelection();
  });

$('.working-area').on('click', '.thumbnail', function (event) {
  if (!event.altKey) {
    var fileID = $(event.target).attr('id');
    var filePath = $(event.target).attr('src');
    var basename = path.basename(filePath);
    $('#classification-file-name').text(basename);
    $('.classification-zoom-window').css('display', 'block');
    getImageCanvas(fileID);
  }
});

$('.label-infos').on('click', '.activate', function (event) {
  if ($(event.target).prop('checked')) {
    $('[class=activate]').prop('checked', false);
    $(event.target).prop('checked', true);
    remote.getGlobal('projectManager').activateLabel($(event.target).attr('id'));
  } else remote.getGlobal('projectManager').activateLabel(null);
});

$('.classification-close-btn').on('click', () => {
  $('.classification-zoom-window').css('display', 'none');
});

$('#data-analysis-btn').on('click', () => {
  $('.classification-analysis-window').css('display', 'block');
  showAnalytics();
});

$('.analysis-close-btn').on('click', () => {
  $('.classification-analysis-window').css('display', 'none');
});

$('#save-btn').on('click', () => {
  var labelInfos = remote.getGlobal('projectManager').getLabelInfos();
  var names = {};
  for ([key, value] of Object.entries(labelInfos)) {
    names[key] = value.name;
  }
  jsonInfo = JSON.stringify(names);
  !fs.existsSync('results') && fs.mkdirSync('results');
  fs.writeFileSync('results/classification.json', jsonInfo);
});
