var mystream;
var boothVideo;

// We'll use a global variable to hold on to our id from PeerJS
var peer_id = null;

//var peer = new Peer({host: 'localhost', port: 8000, path: '/public/watcher/watcher-me.html'});
var peer = new Peer('thewatcher');


// Get an ID from the PeerJS server
peer.on('open', function(id) {
  console.log('W: My peer ID is: ' + id);
  peer_id = id;
});

peer.on('error', function(err) {
  console.log('W: '+ err);
});

// var btn = document.getElementById('call');


// btn.addEventListener('click', ()=>{
// 	console.log("I was clicked");
// });


function initwebrtc(stream) {
  mystream = stream;
  
  console.log("W: Calling the booth");

  var call = peer.call('thebooth', mystream);

  call.on('stream', function(remoteStream) {
    console.log("W: Got a response");
    //add the remote stream to your html

    // var video = document.getElementById("boothvideo");
    // video.appendChild(remoteStream);
    
    boothvideo = document.getElementById('boothvideo');
    console.log(URL.createObjectURL(stream));
    boothVideo.src = URL.createObjectURL(stream);
    boothVideo.play();

    // var video = document.getElementById('boothvideo');
    // video.src = remoteStream;
    // boothVideo = document.body.appendChild(video);
    // boothVideo.play();
    //append webrtc stream to the canvas
    // $(document.body).append(video);

    // var video = document.getElementById('boothvideo');
    // video.src = stream;
    // boothVideo = document.body.appendChild(video);
    // boothVideo.play();
    //append webrtc stream to the canvas
    // $('boothVideo').append(data);
    init();
	});

}

// peer.on('call', function(incoming_call) {
// 	console.log("W: Got a call!");
// 	incoming_call.answer(mystream); // Answer the call with our stream from getUserMedia
// 	incoming_call.on('stream', function(remoteStream) {  // we receive a getUserMedia stream from the remote caller


// 	});
// });


	
