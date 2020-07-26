let $ = require('jquery')
const fs = require('fs')
const path = require('path')
const { remote } = require('electron')

let id;
let img;
let ratio; 

function getThumbnailId(){
    console.log("HELLOO");
    var tmp = location.href.split("?");
    var data = tmp[1].split("=");
    id = data[1];
    console.log(id);
    getImageCanvas(id);
}

function getImageCanvas(thumbnailId){
    var filePath = remote.getGlobal('projectManager').dataPaths[thumbnailId];
    img = new Image();
    drawImageOnCanvas(filePath);
}

$(document).ready(getThumbnailId)

// 줌, 패닝 기능 되는 캔버스 로드
function drawImageOnCanvas(filePath){
    img.src = filePath; 
  
    var canvas = document.getElementById('img-canvas');
    var ctx = canvas.getContext('2d');
    trackTransforms(ctx);
  
    var w = $('#tab-image').width();
    var h = $('#tab-image').height();
    
    img.addEventListener('load', function(){
        canvas.width = w;
        canvas.height = h;
        ratio = this.height / this.width;
        if(ratio < 1.0) {
            this.width = w;
            this.height = w * ratio;
            ctx.drawImage(img,0,(h-this.height)/2, this.width, this.height);
        }else {
            this.height = h;
            this.width = h * (1 / ratio);
            ctx.drawImage(img,(w-this.width)/2,0, this.width, this.height);
        }
        w = this.width;
        h = this.height;
        //console.log("w: " + this.width + " h: " + this.height);
        //ctx.drawImage(img,0,0, this.width, this.height);
    }, false);
    
    function redraw(){
      
        // Clear the entire canvas
        var p1 = ctx.transformedPoint(0,0);
        var p2 = ctx.transformedPoint(canvas.width,canvas.height);
        ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);
    
        ctx.save();
        ctx.setTransform(1,0,0,1,0,0);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.restore();
    
        if(ratio < 1.0) ctx.drawImage(img,0,(canvas.height-h)/2, w, h);
        else ctx.drawImage(img,(canvas.width-w)/2,0, w, h);
    }
    redraw();
  
    var lastX=canvas.width/2, lastY=canvas.height/2;
  
    var dragStart,dragged;
  
    // 마우스 클릭한 순간
    canvas.addEventListener('mousedown',function(evt){
        document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
        lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
        lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
        dragStart = ctx.transformedPoint(lastX,lastY);
        dragged = false;
    },false);
  
    // 클릭해서 움직이는 순간
    canvas.addEventListener('mousemove',function(evt){
        lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
        lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
        dragged = true;
        if (dragStart){
            var pt = ctx.transformedPoint(lastX,lastY);
            ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
            redraw();
        }
    },false);
  
    // 마우스에서 손 떼는 순간
    canvas.addEventListener('mouseup',function(evt){
        dragStart = null;
        //if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
    },false);
  
    var scaleFactor = 1.1;
  
    var zoom = function(clicks){
        var pt = ctx.transformedPoint(lastX,lastY);
        ctx.translate(pt.x,pt.y);
        var factor = Math.pow(scaleFactor,clicks);
        ctx.scale(factor,factor);
        ctx.translate(-pt.x,-pt.y);
        redraw();
    }
  
    // 확대 
    $('#zoom-in-button').on('click', function(){
        zoom(1);
    });
  
    // 축소
    $('#zoom-out-button').on('click', function(){
        zoom(-1);
    });
  
    // 스크롤 올리면 확대 내리면 축소
    var handleScroll = function(evt){
        var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
        if (delta) zoom(delta);
        return evt.preventDefault() && false;
    };
  
    canvas.addEventListener('DOMMouseScroll',handleScroll,false);
    canvas.addEventListener('mousewheel',handleScroll,false);
}
  
function trackTransforms(ctx){
    var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
    var xform = svg.createSVGMatrix();
    ctx.getTransform = function(){ return xform; };

    var savedTransforms = [];
    var save = ctx.save;
    ctx.save = function(){
        savedTransforms.push(xform.translate(0,0));
        return save.call(ctx);
    };

    var restore = ctx.restore;
    ctx.restore = function(){
        xform = savedTransforms.pop();
        return restore.call(ctx);
    };

    var scale = ctx.scale;
    ctx.scale = function(sx,sy){
        xform = xform.scaleNonUniform(sx,sy);
        return scale.call(ctx,sx,sy);
    };

    var rotate = ctx.rotate;
    ctx.rotate = function(radians){
        xform = xform.rotate(radians*180/Math.PI);
        return rotate.call(ctx,radians);
    };

    var translate = ctx.translate;
    ctx.translate = function(dx,dy){
        xform = xform.translate(dx,dy);
        return translate.call(ctx,dx,dy);
    };

    var transform = ctx.transform;
    ctx.transform = function(a,b,c,d,e,f){
        var m2 = svg.createSVGMatrix();
        m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
        xform = xform.multiply(m2);
        return transform.call(ctx,a,b,c,d,e,f);
    };

    var setTransform = ctx.setTransform;
    ctx.setTransform = function(a,b,c,d,e,f){
        xform.a = a;
        xform.b = b;
        xform.c = c;
        xform.d = d;
        xform.e = e;
        xform.f = f;
        return setTransform.call(ctx,a,b,c,d,e,f);
    };

    var pt  = svg.createSVGPoint();
    ctx.transformedPoint = function(x,y){
        pt.x=x; pt.y=y;
        return pt.matrixTransform(xform.inverse());
    }
}