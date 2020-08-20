// let $ = require('jquery');
const { remote } = require('electron');

let id;
let img;
let ratio;
let scaleFactor = 1.05;
let lock_num = 0;

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

// load canvas with zoom in/out, and panning
function drawImageOnCanvas(filePath) {
  img.src = filePath;

  var canvas = document.getElementById('img-canvas');
  var ctx = canvas.getContext('2d');
  trackTransforms(ctx);

  var w = $('#tab-image').width();
  var h = $('#tab-image').height();

  img.addEventListener(
    'load',
    function () {
      canvas.width = w;
      canvas.height = h;
      ratio = this.height / this.width;
      if (ratio < 1.0) {
        this.width = w;
        this.height = w * ratio;
        ctx.drawImage(img, 0, (h - this.height) / 2, this.width, this.height);
      } else {
        this.height = h;
        this.width = h * (1 / ratio);
        ctx.drawImage(img, (w - this.width) / 2, 0, this.width, this.height);
      }
      w = this.width;
      h = this.height;
      //console.log("w: " + this.width + " h: " + this.height);
      //ctx.drawImage(img,0,0, this.width, this.height);
    },
    false
  );

  function redraw() {
    // Clear the entire canvas
    var p1 = ctx.transformedPoint(0, 0);
    var p2 = ctx.transformedPoint(canvas.width, canvas.height);
    ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    if (ratio < 1.0) ctx.drawImage(img, 0, (canvas.height - h) / 2, w, h);
    else ctx.drawImage(img, (canvas.width - w) / 2, 0, w, h);
  }
  redraw();

  var lastX = canvas.width / 2,
    lastY = canvas.height / 2;

  var dragStart, dragged;

  // the moment when mouse is clicked
  var mouseDown = function (evt) {
    document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect =
      'none';
    lastX = evt.offsetX || evt.pageX - canvas.offsetLeft;
    lastY = evt.offsetY || evt.pageY - canvas.offsetTop;
    dragStart = ctx.transformedPoint(lastX, lastY);
    dragged = false;
  };

  // the moment when mouse is moving after click
  var mouseMove = function (evt) {
    lastX = evt.offsetX || evt.pageX - canvas.offsetLeft;
    lastY = evt.offsetY || evt.pageY - canvas.offsetTop;
    dragged = true;
    if (dragStart) {
      var pt = ctx.transformedPoint(lastX, lastY);
      ctx.translate(pt.x - dragStart.x, pt.y - dragStart.y);
      redraw();
    }
  };

  // the moment when click event is finished
  var mouseUp = function (evt) {
    dragStart = null;
    //if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
  };

  // zoom in & out
  var zoom = function (clicks) {
    var pt = ctx.transformedPoint(lastX, lastY);
    ctx.translate(pt.x, pt.y);
    var factor = Math.pow(scaleFactor, clicks);
    ctx.scale(factor, factor);
    ctx.translate(-pt.x, -pt.y);
    redraw();
  };

  // scroll (up: zoom-in) (down: zoom-out)
  var handleScroll = function (evt) {
    var delta = evt.wheelDelta ? evt.wheelDelta / 40 : evt.detail ? -evt.detail : 0;
    //if (delta) zoom(delta);
    if (delta > 0) zoom(1);
    else zoom(-1);
    return evt.preventDefault() && false;
  };

  var getFullView = function () {
    canvas.width = $('#tab-image').width();
    canvas.height = $('#tab-image').height();
    redraw();
  };

  // add moving events
  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mousemove', mouseMove, false);
  canvas.addEventListener('mouseup', mouseUp, false);
  // add scroll events
  canvas.addEventListener('DOMMouseScroll', handleScroll, false);
  canvas.addEventListener('mousewheel', handleScroll, false);

  // button click events
  $('#zoom-in-button').on('click', function () {
    zoom(1);
  });

  $('#zoom-out-button').on('click', function () {
    zoom(-1);
  });

  $('#lock-button').on('click', function () {
    lock_num++;
    if (lock_num % 2 == 1) {
      canvas.removeEventListener('mousedown', mouseDown, false);
      canvas.removeEventListener('mousemove', mouseMove, false);
      canvas.removeEventListener('mouseup', mouseUp, false);
      canvas.removeEventListener('DOMMouseScroll', handleScroll, false);
      canvas.removeEventListener('mousewheel', handleScroll, false);
      $('#lock-button').html('<img src="../resources/imgs/annotti_unlock.png" alt="un-lock">');
    } else {
      canvas.addEventListener('mousedown', mouseDown, false);
      canvas.addEventListener('mousemove', mouseMove, false);
      canvas.addEventListener('mouseup', mouseUp, false);
      canvas.addEventListener('DOMMouseScroll', handleScroll, false);
      canvas.addEventListener('mousewheel', handleScroll, false);
      $('#lock-button').html('<img src="../resources/imgs/annotti_lock.png" alt="lock">');
    }
  });

  $('#back-to-original-button').on('click', function () {
    getFullView();
  });
  $(window).resize(() => {
    getFullView();
  });
}

function trackTransforms(ctx) {
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  var xform = svg.createSVGMatrix();
  ctx.getTransform = function () {
    return xform;
  };

  var savedTransforms = [];
  var save = ctx.save;
  ctx.save = function () {
    savedTransforms.push(xform.translate(0, 0));
    return save.call(ctx);
  };

  var restore = ctx.restore;
  ctx.restore = function () {
    xform = savedTransforms.pop();
    return restore.call(ctx);
  };

  var scale = ctx.scale;
  ctx.scale = function (sx, sy) {
    xform = xform.scaleNonUniform(sx, sy);
    return scale.call(ctx, sx, sy);
  };

  var rotate = ctx.rotate;
  ctx.rotate = function (radians) {
    xform = xform.rotate((radians * 180) / Math.PI);
    return rotate.call(ctx, radians);
  };

  var translate = ctx.translate;
  ctx.translate = function (dx, dy) {
    xform = xform.translate(dx, dy);
    return translate.call(ctx, dx, dy);
  };

  var transform = ctx.transform;
  ctx.transform = function (a, b, c, d, e, f) {
    var m2 = svg.createSVGMatrix();
    m2.a = a;
    m2.b = b;
    m2.c = c;
    m2.d = d;
    m2.e = e;
    m2.f = f;
    xform = xform.multiply(m2);
    return transform.call(ctx, a, b, c, d, e, f);
  };

  var setTransform = ctx.setTransform;
  ctx.setTransform = function (a, b, c, d, e, f) {
    xform.a = a;
    xform.b = b;
    xform.c = c;
    xform.d = d;
    xform.e = e;
    xform.f = f;
    return setTransform.call(ctx, a, b, c, d, e, f);
  };

  var pt = svg.createSVGPoint();
  ctx.transformedPoint = function (x, y) {
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(xform.inverse());
  };
}

module.exports = { getImageCanvas };
