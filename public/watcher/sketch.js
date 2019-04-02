//from html

let speaker;
let voices;
let button;
let inp;

function setup() {
  createCanvas(500, 500);

  // input for the text to speech
  inp = createInput('');
  inp.input(myInputEvent);

  // initiate p5 speech
  speaker = new p5.Speech(voiceReady); // speech synthesis object

  // create a button to send text to speech to booth
  button = createButton('Talk');
  button.position(150, 500);
  button.mousePressed(readText);
}

// speech to text
function readText(){
  voices = speaker.voices;
  speaker.setVoice('Ting-Ting');
  speaker.speak(inp.value()); // say something
  console.log(inp.value());
}

function myInputEvent() {
  console.log('input working');
}

function voiceReady(){
  console.log('voice is ready');
}

var myvideo = null;
var mystream = null;
var mypeerid = null;
var peer = null;

var init = function() {
  myvideo = document.getElementById('myvideo');

  window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

  if (navigator.getUserMedia) {
    // http://src.chromium.org/svn/trunk/src/chrome/test/data/webrtc/manual/constraints.html
    navigator.getUserMedia({video: true, audio: false}, function(stream) {
      mystream = stream;
      myvideo.srcObject = stream;

  myvideo.onloadedmetadata = function(e) {
    myvideo.play();
    // myvideo.width = e.videoWidth;
    // myvideo.height = e.videoHeight;
    console.log(e);
    // draw();
};

    },function(err) {
        console.log('Failed to get local stream' ,err);
        alert("Failed to get local stream " + err);
    }
  );
}


peer = new Peer('watcher');

peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
  mypeerid = id;
});

peer.on('call', function(call) {
  call.answer(mystream);

  call.on('stream', function(remoteStream) {

    var othervideo = document.createElement("video");
    othervideo.src = window.URL.createObjectURL(remoteStream) || remoteStream;
    document.body.appendChild(othervideo);
    othervideo.play();

    });
});
};

var placecall = function() {
  var call = peer.call(document.getElementById('other_peer_id').value, mystream);

  call.on('stream', function(remoteStream) {
  // Show stream in some video/canvas element.

    var othervideo = document.createElement("video");
    othervideo.src = window.URL.createObjectURL(remoteStream) || remoteStream;
    document.body.appendChild(othervideo);
    othervideo.play();

  });
};	