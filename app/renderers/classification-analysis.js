function hex2rgba(hex, transparency) {
  var hex = hex.replace('#', '');
  var value = hex.match(/[a-f\d]/gi);
  if (value.length == 3) hex = value[0] + value[0] + value[1] + value[1] + value[2] + value[2];
  value = hex.match(/[a-f\d]{2}/gi);
  var r = parseInt(value[0], 16);
  var g = parseInt(value[1], 16);
  var b = parseInt(value[2], 16);
  var rgba = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + transparency + ')';
  return rgba;
}

function showAnalytics() {
  var graphLables = [];
  var datas = [];
  var backgroundColors = [];
  var borderColors = [];

  var labelInfos = Object.values(remote.getGlobal('projectManager').getLabelInfos());
  labelInfos.forEach((element) => {
    graphLables.push(element.name);
    datas.push(Object.keys(element.files).length);
    backgroundColors.push(hex2rgba(element.color, 1));
    borderColors.push(hex2rgba(element.color, 1));
  });

  var graph = document.getElementById('classification-chart').getContext('2d');
  new Chart(graph, {
    type: 'doughnut',
    data: {
      labels: graphLables,
      datasets: [
        {
          label: '',
          data: datas,
          backgroundColor: backgroundColors,
          borderWidth: 2,
        },
      ],
    },
  });
}

module.exports = { showAnalytics };
