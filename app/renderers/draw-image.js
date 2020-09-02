let img;
let ratio;
let scaleFactor = 1.05;

function getImageCanvas(fileID) {
  var filePath = remote.getGlobal('projectManager').dataPaths[fileID];
  img = new Image();
  drawImageOnCanvas(filePath);
}

function drawImageOnCanvas(filePath) {
  img.src = filePath;

  var canvas = document.getElementById('img-canvas');
  var ctx = canvas.getContext('2d');

  trackTransforms(ctx);

  var pw = $('#tab-image').width();
  var ph = $('#tab-image').height();
  var w = pw;
  var h = ph;

  img.addEventListener(
    'load',
    function () {
      canvas.width = pw;
      canvas.height = ph;
      ratio = this.height / this.width;
      if (ratio < 1.0) {
        this.width = w;
        this.height = w * ratio;
      } else {
        this.height = h;
        this.width = h * (1 / ratio);
      }
      w = this.width;
      h = this.height;
      ctx.drawImage(img, (pw - w) / 2, (ph - h) / 2, w, h);
    },
    false
  );

  function redraw() {
    var p1 = ctx.transformedPoint(0, 0);
    var p2 = ctx.transformedPoint(canvas.width, canvas.height);
    ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    ctx.drawImage(img, (pw - w) / 2, (ph - h) / 2, w, h);
  }
  redraw();

  var lastX = canvas.width / 2,
    lastY = canvas.height / 2;

  var dragStart, dragged;

  var mouseDown = function (evt) {
    document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect =
      'none';
    lastX = evt.offsetX || evt.pageX - canvas.offsetLeft;
    lastY = evt.offsetY || evt.pageY - canvas.offsetTop;
    dragStart = ctx.transformedPoint(lastX, lastY);
    dragged = false;
  };

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

  var mouseUp = function (evt) {
    dragStart = null;
  };

  var zoom = function (clicks) {
    var pt = ctx.transformedPoint(lastX, lastY);
    ctx.translate(pt.x, pt.y);
    var factor = Math.pow(scaleFactor, clicks);
    ctx.scale(factor, factor);
    ctx.translate(-pt.x, -pt.y);
    redraw();
  };

  var handleScroll = function (evt) {
    var delta = evt.wheelDelta ? evt.wheelDelta / 40 : evt.detail ? -evt.detail : 0;
    if (delta > 0) zoom(1);
    else zoom(-1);
    return evt.preventDefault() && false;
  };

  var getFullView = function () {
    pw = $('#tab-image').width();
    ph = $('#tab-image').height();
    canvas.width = pw;
    canvas.height = ph;
    redraw();
  };

  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mousemove', mouseMove, false);
  canvas.addEventListener('mouseup', mouseUp, false);
  canvas.addEventListener('DOMMouseScroll', handleScroll, false);
  canvas.addEventListener('mousewheel', handleScroll, false);

  $('#zoom-in-button').on('click', function () {
    zoom(1);
  });

  $('#zoom-out-button').on('click', function () {
    zoom(-1);
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
