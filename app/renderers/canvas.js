const fabric = require('fabric').fabric;

function getThumbnailId() {
  if (location.href === undefined) return;
  var tmp = location.href.split('?');
  if (tmp.length <= 1) return;
  var data = tmp[1].split('=');
  id = data[1];
  getImageCanvas(id);
}

function getImageCanvas(thumbnailId) {
  var filePath = remote.getGlobal('projectManager').dataPaths[thumbnailId];
  img = new Image();
  drawImageOnCanvas(filePath);
}

$(document).ready(getThumbnailId);

function drawImageOnCanvas(filePath) {
  var imgURL = filePath;
  var canvas = new fabric.Canvas('img-canvas', {});
  var image = new Image();

  var started = false;
  var startX = 0;
  var startY = 0;

  var w = $('#tab-image').width();
  var h = $('#tab-image').height();
  canvas.setWidth(w);
  canvas.setHeight(h);

  image.onload = function (img) {
    var fabricImg = new fabric.Image(image);
    fabricImg.scaleToWidth(w, false);
    canvas.setBackgroundImage(fabricImg, canvas.renderAll.bind(canvas));
  };
  image.src = imgURL;

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
      var labelID = remote.getGlobal('projectManager').activated;
      var labelColor = remote.getGlobal('projectManager').getColorbyLabelID(labelID);

      started = true;
      (startY = evt.offsetY), (startX = evt.offsetX);
      var square = new fabric.Rect({
        width: 0,
        height: 0,
        left: startX,
        top: startY,
        fill: 'transparent',
        stroke: labelColor,
        strokeWidth: 5,
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
  });

  $(window).resize(() => {
    w = $('#tab-image').width();
    h = $('#tab-image').height();
    canvas.setWidth(w);
    canvas.setHeight(h);
    $('.canvas-container').width = w;
    $('.canvas-container').height = h;
    canvas.renderAll();
    canvas.calcOffset();
  });
}
