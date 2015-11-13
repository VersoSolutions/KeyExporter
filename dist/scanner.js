//Webcam parameters

var gCtx = null;
var gCanvas = null;
var c=0;
var stype=0;
var gUM=false;
var webkit=false;
var moz=false;
var v=null;
var localStream = null;

var wWidth = $(window).width();
var wVid = 600;
        if (wWidth < 800) {
                wVid = wWidth * 0.9;
        }
var hVid = wVid -100;

var vidhtml = '<video id="v" style="width:100%;" autoplay></video><br/><button type="button" onclick="killvid();">Stop</button>';


function success(stream) {

  console.log('ok');

    if (webkit) {
        v.src = window.webkitURL.createObjectURL(stream);
        localStream = stream;
    } else if (moz) {
        v.mozSrcObject = stream;
        v.play();
    }
    else
        v.src = stream;
    gUM=true;
    setTimeout(captureToCanvas, 200);
}

function killvid() {
  if(v.src || v.mozSrcObject ) {
    if(webkit) {
      localStream.stop();
      localStream = null;
    }
    else if(moz) {
      v.mozSrcObject.stop() ;
    }
    else {
      v.src.stop();
    }
    gUM=false;
  }
  stype=0;
}

function error(err) {
    console.log(err);
    gUM=false;
    return;
}



function read(a)
{
                $("#privateInfo").val(a);

                if(v.src || v.mozSrcObject ) {
                        if(webkit) {
                                localStream.stop();
                                localStream = null;
                        }
                        else if(moz)
                        {
                                v.mozSrcObject.stop() ;
                        }
                        else {
                                v.src.stop();
                        }
                        gUM=false;
                }
               stype=0;
}

function captureToCanvas() {
    if(stype!=1)
        return;
    if(gUM)
    {
        try{
            gCtx.drawImage(v,0,0);
            try{
                qrcode.decode();
            }
            catch(e){
                setTimeout(captureToCanvas, 200);
            }
        }
        catch(e){
                setTimeout(captureToCanvas, 200);
        }
    }
}

function setwebcam()
{

    if(stype==1)
    {
        setTimeout(captureToCanvas, 200);
        return;
    }
    var n=navigator;
    document.getElementById("outdiv").innerHTML = vidhtml;
    v=document.getElementById("v");

    if(n.getUserMedia) {
      n.getUserMedia({video: true, audio: false}, success, error);
      console.log(1);
    }
    else
    if(n.webkitGetUserMedia)
    {
        webkit=true;
        n.webkitGetUserMedia({video: true, audio: false}, success, error);
        console.log(2);
    }
    else
    if(n.mozGetUserMedia)
    {
        moz=true;
        n.mozGetUserMedia({video: true, audio: false}, success, error);
        console.log(3);
    }
    stype=1;
    setTimeout(captureToCanvas, 200);
}

function initCanvas(w,h)
{
    gCanvas = document.getElementById("qr-canvas");
    gCanvas.style.width = wVid + "px";
    gCanvas.style.height = hVid + "px";
    gCanvas.width = w;
    gCanvas.height = h;
    gCtx = gCanvas.getContext("2d");
    gCtx.clearRect(0, 0, w, h);
}

function isCanvasSupported(){
  var elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
}

function loadcam() {
    if (isCanvasSupported() && window.File && window.FileReader) {
        initCanvas(800, 600);
        qrcode.callback = read;
        setwebcam();
    } else {
        document.getElementById("scanner").innerHTML = '<p id="mp1">QR code scanner for HTML5 capable browsers</p><br>'+'<br><p id="mp2">Error</p><br><br>'+'<p id="mp1">Error 1 <a href="http://www.mozilla.com/firefox"><img src="firefox.png"/></a> Error 2<a href="http://chrome.google.com"><img src="chrome_logo.gif"/></a> Error 2 <a href="http://www.opera.com"><img src="Opera-logo.png"/></a></p>';
    }
}//end loadcam
