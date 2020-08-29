const fabric = require('fabric').fabric;
var canvas = null;

function getThumbnailID() {
  if (location.href === undefined) return;
  var tmp = location.href.split('?');
  if (tmp.length <= 1) return;
  var data = tmp[1].split('=');
  id = data[1];
  getImageCanvas(id);
}

function getImageCanvas(thumbnailID) {
  var filePath = remote.getGlobal('projectManager').dataPaths[thumbnailID];
  remote.getGlobal('projectManager').openFileTab(thumbnailID, filePath);

  img = new Image();
  drawImageOnCanvas(thumbnailID, filePath);
}

$(document).ready(getThumbnailID);

function drawImageOnCanvas(thumbnailID, filePath) {
  canvas = new fabric.Canvas('img-canvas', {});
  var imgURL = filePath;
  var fileID = thumbnailID;
  var image = new Image();
  canvas = new fabric.Canvas('img-canvas', {});

  var mayDel = null;

  var started = false;
  var startX = 0;
  var startY = 0;

  var w = $('#tab-image').width();
  var h = $('#tab-image').height();

  $('.canvas-container').css('max-width', '100%');
  $('.canvas-container').css('max-height', '100%');

  canvas.setWidth(w);
  canvas.setHeight(h);

  image.onload = function (img) {
    var fabricImg = new fabric.Image(image);
    fabricImg.scaleToWidth(w, false);
    canvas.setBackgroundImage(fabricImg, canvas.renderAll.bind(canvas));
  };
  image.src = imgURL;

  canvas.on('object:modified', (e) => {
<<<<<<< HEAD
    var boxID = e.target.id;
=======
    console.log(e);

    var boxID = e.target.id;
    console.log(boxID);
>>>>>>> a7430dc134a703f55030961aeec232d8d0374100
    var x1 = e.target.aCoords.tl.x;
    var y1 = e.target.aCoords.tl.y;
    var x2 = e.target.aCoords.br.x;
    var y2 = e.target.aCoords.br.y;
    remote.getGlobal('projectManager').changeBoxPosition(fileID, boxID, x1, y1, x2, y2);
  });

<<<<<<< HEAD
  var canvasWrapper = document.getElementById('tab-image');
  canvasWrapper.tabIndex = 1000;
  canvasWrapper.addEventListener(
    'keydown',
    (e) => {
      if (e.key == 'Delete' && mayDel != null) {
        remote.getGlobal('projectManager').deleteBox(fileID, mayDel);
      }
    },
    false
  );

  canvas.on('object:selected', (e) => {
    if (e.e != undefined) {
      mayDel = e.target.id;
    }
  });

=======
>>>>>>> a7430dc134a703f55030961aeec232d8d0374100
  canvas.on('selection:created', (e) => {
    if (e.e != undefined && e.e.altKey) {
      canvas.discardActiveObject();
    } else if (e.selected.length > 1) {
      canvas.discardActiveObject();
    }
  });

  canvas.on('mouse:wheel', function (opt) {
    var delta = opt.e.deltaY;
    var zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.setZoom(zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
  });

  canvas.on('mouse:down', function (opt) {
    var evt = opt.e;
    if (evt.shiftKey) {
      this.isDragging = true;
      this.selection = false;
      this.lastPosX = evt.clientX;
      this.lastPosY = evt.clientY;
    } else if (evt.altKey) {
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
    if (opt.e.altKey) {
      var labelID = remote.getGlobal('projectManager').getActivatedLabel();
      var square = canvas.getActiveObject();
      var x2 = square.left + square.width;
      var y2 = square.top + square.height;
      var boxID = square.id;

      while (square.id == undefined) {
        boxID = new Date().getTime();
        square.id = boxID;
      }

      remote
        .getGlobal('projectManager')
        .appendBox(fileID, square.id, square.left, square.top, x2, y2);

      canvas.discardActiveObject();
      $('#' + labelID + '.label-counter').text(
        Number($('#' + labelID + '.label-counter').text()) + 1
      );
    }
  });

  $(window).resize(() => {
    canvas.setWidth($(window).width());
    canvas.setHeight($('#tab-image').height());
    // canvas.backgroundImage.scaleToWidth(canvas.getWidth(), false);
    canvas.renderAll();
    canvas.calcOffset();
  });

  $('#zoom-in-button').on('click', function () {
    var zoom = canvas.getZoom();
    zoom *= 0.999 ** -50;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.setZoom(zoom);
  });

  $('#zoom-out-button').on('click', function () {
    var zoom = canvas.getZoom();
    zoom *= 0.999 ** 50;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.setZoom(zoom);
  });

  $('#back-to-original-button').on('click', function () {
    canvas.backgroundImage.scaleToWidth(canvas.getWidth(), false);
    canvas.backgroundImage.scaleToWidth(canvas.getWidth(), false);
    canvas.renderAll();
    canvas.calcOffset();
  });
}

function ODChangeColor(boxIDs, newColor) {
  canvas.getObjects().forEach(function (o) {
    if (boxIDs.includes(o.id)) {
      o.stroke = newColor;
    }
  });
  canvas.renderAll();
  console.log('Change box color on UI');
}

function ODDeleteLabel(boxIDs) {
  console.log('Delete box on UI');
}
