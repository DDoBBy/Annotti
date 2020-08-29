const fabric = require('fabric').fabric;

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
  var imgURL = filePath;
  var fileID = thumbnailID;
  var canvas = new fabric.Canvas('img-canvas', {});
  var image = new Image();

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

  canvas.on('selection:created', (e) => {
    if (e.e != undefined && e.e.altKey) {
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

      remote.getGlobal('projectManager').activateBox(labelID, startX, startY);

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
      square.id = new Date().getTime();

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
      if (boxID == undefined) {
        square.id = new Date().getTime();
        boxID = square.id;
      }
      remote.getGlobal('projectManager').appendBox(fileID, boxID, x2, y2);
      canvas.discardActiveObject();
      $('#' + labelID + '.label-counter').text(
        Number($('#' + labelID + '.label-counter').text()) + 1
      );
    }
  });

  $(window).resize(() => {
    canvas.setWidth($(window).width() - 250);
    canvas.setHeight($('#tab-image').height());
    canvas.backgroundImage.scaleToWidth(canvas.getWidth(), false);
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
