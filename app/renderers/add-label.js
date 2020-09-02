const { appendLabelTemplate } = require('../templates/labels');
var randomColor = require('randomcolor');
function rgb2hex(rgb) {
  if (rgb.search('rgb') == -1) {
    return rgb;
  } else {
    rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
    function hex(x) {
      return ('0' + parseInt(x).toString(16)).slice(-2);
    }
    return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
  }
}

function generateRandomColor() {
  var color = randomColor();
  return color;
}

function findTopPosition(id) {
  const target = document.getElementById(id);
  const clientRect = target.getBoundingClientRect();
  const relativeTop = clientRect.top;
  const scrolledTopLength = pageYOffset; // 스크롤된 길이
  const absoluteTop = scrolledTopLength + relativeTop;
  return absoluteTop;
}
// Click add label button
$('#root').on('click', '#add-label', () => {
  var randomColor = generateRandomColor();

  var labelColors = Object.values(remote.getGlobal('projectManager').labelColors);
  while (labelColors.includes(randomColor)) {
    randomColor = generateRandomColor();
  }

  var labelID = remote.getGlobal('projectManager').labelCounter;
  var newLabel = remote.getGlobal('projectManager').appendLabel(null, randomColor);
  var appendLabel = appendLabelTemplate(labelID, newLabel.color, newLabel.name);
  $('.label-infos').append(appendLabel);
});

// Click color selector
$('#root').on('click', '.label-color', function (event) {
  topPosition =
    findTopPosition($(event.target).parent().parent()[0].id) -
    $(event.target).parent()[0].offsetHeight / 2;
  rightPosition = $(event.target).parent()[0].offsetWidth;
  leftPosition = $(event.target).parent()[0].offsetLeft;
  $(event.target).parent().next().toggle();
  $(event.target).parent().next().css('top', topPosition);
  $(event.target)
    .parent()
    .next()
    .css('left', leftPosition - rightPosition + 45);
});

// Click remove button
$('#root').on('click', '.del', function (event) {
  var labelID = event.target.id;
  document.getElementById('label' + labelID).remove();
  const taskId = remote.getGlobal('projectManager').taskId;
  if (taskId == 'IC') {
    var fileIDs = remote.getGlobal('projectManager').deleteLabel(labelID);
    fileIDs.forEach((element) => {
      $('#' + element + '.thumbnail').css({ border: 'none' });
    });
  } else if (taskId == 'OD') {
    var boxIDs = remote.getGlobal('projectManager').deleteLabel(labelID);
    ODDeleteLabel(boxIDs);
  }
});

// Change label color by select candidates
$('#root').on('click', '.label-color-cand', function (event) {
  var prevColor = rgb2hex(
    $(event.target).parent().parent().prev().children('.label-color').css('background-color')
  );
  var newColor = rgb2hex($(event.target).css('background-color'));
  var labelID = $(event.target).parent()[0].id;
  if (prevColor != newColor) {
    if (!remote.getGlobal('projectManager').colorAlreadyOccupied(newColor)) {
      const taskId = remote.getGlobal('projectManager').taskId;
      if (taskId == 'IC') {
        var fileIDs = remote.getGlobal('projectManager').changeLabelColor(labelID, newColor);
        fileIDs.forEach((element) => {
          $('#' + element + '.thumbnail').css({ border: '8px solid' + newColor });
        });
      } else if (taskId == 'OD') {
        var boxIDs = remote.getGlobal('projectManager').changeLabelColor(labelID, newColor);
        ODChangeColor(boxIDs, newColor);
      }
      $(event.target).parent().children('#color-input').val(newColor);
      document.getElementById('span' + labelID).style.backgroundColor = newColor;
    } else {
      alertError('Duplicate Color', 'Color already used. Please select another color.');
      return;
    }
  }
  $('#popover' + labelID).toggle();
});

// Change label color by hex text
$('#root').on('click', '.label-color-cand-rgb', function (event) {
  var labelID = event.target.id;
  var prevColor = rgb2hex(document.getElementById('span' + labelID).style.backgroundColor);
  var newColor = document.getElementById('color-input' + labelID).value;
  if (prevColor != newColor) {
    if (!remote.getGlobal('projectManager').colorAlreadyOccupied(newColor)) {
      const taskId = remote.getGlobal('projectManager').taskId;
      if (taskId == 'IC') {
        var fileIDs = remote.getGlobal('projectManager').changeLabelColor(labelID, newColor);
        fileIDs.forEach((element) => {
          $('#' + element + '.thumbnail').css({ border: '8px solid' + newColor });
        });
      } else if (taskId == 'OD') {
        var boxIDs = remote.getGlobal('projectManager').changeLabelColor(labelID, newColor);
        ODChangeColor(boxIDs, newColor);
      }
      $(event.target).parent().children('#color-input').val(newColor);
      document.getElementById('span' + labelID).style.backgroundColor = newColor;
    } else {
      alertError('Duplicate Color', 'Color already used. Please select another color.');
      return;
    }
  }
  $('#popover' + labelID).toggle();
});

// Change label name
$('#root').on('change', '.label-name', function (event) {
  var labelID = $(event.target).attr('id');
  var newName = $(event.target).val();
  if (!remote.getGlobal('projectManager').nameAlreadyOccupied(newName)) {
    remote.getGlobal('projectManager').changeLabelName(labelID, newName);
  } else {
    alertError('Duplicate Name', 'Name already used. Please select another name.');
    return;
  }
});

$('#root').on('click', '.popover-close', function (event) {
  $('#popover' + event.target.id).toggle();
});

$(window).resize(() => {
  var els = document.getElementsByClassName('popover');
  Array.from(els).forEach((el) => {
    if (!(el.style.display == 'none')) {
      document.getElementById(el.id).style.display = 'none';
    }
  });
});
