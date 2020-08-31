const fabric = require('fabric').fabric;
let canvasList = {};
let boxId = 0;

function openTab(event) {
  var fileID = event.data.imgInfoId;
  var filePath = remote.getGlobal('projectManager').dataPaths[fileID];

  $('.working-area').css('display', 'none');
  $('.detection-area').css('display', 'block');

  var canvasEl = $(`#canvas-${fileID}`);
  if (canvasEl.length == 0) {
    createCanvas(fileID, filePath);
  } else {
    canvasEl.parent('.canvas-container').css('display', 'block');
    canvasEl.css('display', 'block');
    canvasEl.siblings().css('display', 'block');
  }
}

function createCanvas(fileID, filePath) {
  $('.detection-image').append(
    `<canvas id="canvas-${fileID}" class="img-canvas" style="max-width: 100%; max-height: 100%"></canvas>`
  );
  var canvas = new fabric.Canvas(`canvas-${fileID}`, {});

  var basename = path.basename(filePath);
  $('.image-name').text(basename);
  var imgURL = filePath;
  var image = new Image();

  var mayDel = null;

  var started = false;
  var startX = 0;
  var startY = 0;

  var mayDel = null;

  var started = false;
  var startX = 0;
  var startY = 0;

  var canvasWrapper = document.getElementById('detection-image');
  var w = $('#detection-image').width();
  var h = $('#detection-image').height();

  $('.canvas-container').css('max-width', '100%');
  $('.canvas-container').css('max-height', '100%');

  canvas.setWidth(w);
  canvas.setHeight(h);

  image.onload = function (img) {
    var fabricImg = new fabric.Image(image);
    fabricImg.scaleToWidth(w, false);
    fabricImg.scaleToHeight(h, false);
    remote.getGlobal('projectManager').setFileSize(fileID, fabricImg.width, fabricImg.height, w);
    canvas.setBackgroundImage(fabricImg, canvas.renderAll.bind(canvas));
  };
  image.src = imgURL;

  canvas.on('object:modified', (e) => {
    var boxID = e.target.id;
    var x1 = e.target.aCoords.tl.x;
    var y1 = e.target.aCoords.tl.y;
    var x2 = e.target.aCoords.br.x;
    var y2 = e.target.aCoords.br.y;
    remote.getGlobal('projectManager').changeBoxPosition(fileID, boxID, x1, y1, x2, y2);
  });

  canvasWrapper.tabIndex = 1000;
  canvasWrapper.addEventListener(
    'keydown',
    (e) => {
      if (e.keyCode == 68 && mayDel != null) {
        canvas.getObjects().forEach(function (o) {
          if (o.id != undefined && mayDel == o.id) {
            remote.getGlobal('projectManager').deleteBox(fileID, mayDel);
            canvas.remove(o);
            canvas.renderAll();
            var labelID = remote.getGlobal('projectManager').getLabelIDbyColor(o.stroke);
            $('#' + labelID + '.label-counter').text(
              Number($('#' + labelID + '.label-counter').text()) - 1
            );
          }
        });
      }
    },
    false
  );

  canvas.on('object:selected', (e) => {
    if (e.e != undefined) {
      mayDel = e.target.id;
    }
  });

  canvas.on('selection:created', (e) => {
    if (e.e != undefined && e.e.altKey) {
      canvas.discardActiveObject();
    } else if (e.selected.length > 1) {
      canvas.discardActiveObject();
    }
  });

  canvas.on('mouse:down', function (opt) {
    var evt = opt.e;
    if (evt.altKey) {
      var labelID = remote.getGlobal('projectManager').getActivatedLabel();
      if (labelID == null) {
        return;
      }
      var labelColor = remote.getGlobal('projectManager').getColorbyLabelID(labelID);

      started = true;
      (startY = evt.offsetY), (startX = evt.offsetX);
      var square = new fabric.Rect({
        width: 0,
        height: 0,
        left: startX,
        top: startY,
        fill: 'transparent',
        borderOpacityWhenMoving: 100,
        hasRotatingPoint: false,
        stroke: labelColor,
        strokeWidth: 3,
        strokeUniform: true,
      });

      canvas.add(square);
      canvas.renderAll();
      canvas.setActiveObject(square);
    }
  });
  canvas.on('mouse:move', function (opt) {
    var e = opt.e;
    if (this.isDragging) {
      var vpt = this.viewportTransform;
      vpt[4] += e.clientX - this.lastPosX;
      vpt[5] += e.clientY - this.lastPosY;
      this.requestRenderAll();
      this.lastPosX = e.clientX;
      this.lastPosY = e.clientY;
    } else if (started) {
      var mouse = canvas.getPointer(e);

      var x_ = Math.min(mouse.x, startX),
        y_ = Math.min(mouse.y, startY),
        w_ = Math.abs(mouse.x - startX),
        h_ = Math.abs(mouse.y - startY);

      if (!w_ || !h_) {
        return false;
      }

      var square = canvas.getActiveObject();
      square.set('top', y_).set('left', x_).set('width', w_).set('height', h_);

      canvas.renderAll();
    }
  });
  canvas.on('mouse:up', function (opt) {
    this.setViewportTransform(this.viewportTransform);
    this.isDragging = false;
    this.selection = true;
    started = false;
    if (opt.e.altKey || canvas.getActiveObject() != null) {
      var labelID = remote.getGlobal('projectManager').getActivatedLabel();
      var square = canvas.getActiveObject();
      var x2 = square.left + square.width;
      var y2 = square.top + square.height;
      var boxID = square.id;
      if (square.id != undefined) return;
      else {
        while (square.id == undefined) {
          // boxID = new Date().getTime();
          boxID = boxId++;
          square.set('id', boxID);
        }

        remote
          .getGlobal('projectManager')
          .appendBox(fileID, square.id, square.left, square.top, x2, y2);

        canvas.discardActiveObject();
        $('#' + labelID + '.label-counter').text(
          Number($('#' + labelID + '.label-counter').text()) + 1
        );
      }
    }
  });

  $(window).resize(() => {
    canvas.setWidth($(window).width());
    canvas.setHeight($('#detection-image').height());
    // canvas.backgroundImage.scaleToWidth(canvas.getWidth(), false);
    canvas.renderAll();
    canvas.calcOffset();
  });

  $('.detection-close').on('click', function () {
    $(`#canvas-${fileID}`).parent('.canvas-container').css('display', 'none');
    $(`#canvas-${fileID}`).siblings().css('display', 'none');
    $(`#canvas-${fileID}`).css('display', 'none');
    $('.detection-area').css('display', 'none');
    $('.working-area').css('display', 'grid');
  });

  // show grid view of images
  $('#view-files-btn').on('click', function () {
    $(`#canvas-${fileID}`).parent('.canvas-container').css('display', 'none');
    $(`#canvas-${fileID}`).siblings().css('display', 'none');
    $(`#canvas-${fileID}`).css('display', 'none');
    $('.working-area').css('display', 'grid');
    $('.detection-area').css('display', 'none');
  });

  canvasList[fileID] = canvas;
}

function ODChangeColor(boxIDs, newColor) {
  for (const [_, canvas] of Object.entries(canvasList)) {
    canvas.getObjects().forEach(function (o) {
      //   console.log(o);
      if (o.id != undefined && boxIDs.includes(o.id.toString())) {
        o.set('stroke', newColor);
        canvas.renderAll();
      }
    });
  }
}

function ODDeleteLabel(boxIDs) {
  for (const [_, canvas] of Object.entries(canvasList)) {
    canvas.getObjects().forEach(function (o) {
      //   console.log(o);
      if (o.id != undefined && boxIDs.includes(o.id.toString())) {
        canvas.remove(o);
        canvas.renderAll();
      }
    });
  }
}
