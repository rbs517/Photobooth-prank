var mystream;

// We'll use a global variable to hold on to our id from PeerJS
var peer_id = null;

// Register for an API Key:	http://peerjs.com/peerserver
//var peer = new Peer({key: 'YOUR API KEY'});
// The Peer Cloud Server doesn't seem to be operational, I setup a server on a Digital Ocean instance for our use, you can use that with the following constructor:
var peer = new Peer('watcher');
// var peer = new Peer({host: 'localhost', port: 9000, path: '/watcher.html'});
// var peer = new Peer() //create a peer client

// Get an ID from the PeerJS server
peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
  peer_id = id;
});

peer.on('error', function(err) {
  console.log(err);
});

var btn = document.getElementById('call')


btn.addEventListener('click', ()=>{
	console.log("I was clicked")
})


function initwebrtc(stream) {
  mystream = stream;
  
  print("Calling booth");

  var call = peer.call("booth", mystream);

  call.on('stream', function(remoteStream) {
    print("Got a response");
    //add the remote stream to your html
    //document.getELementbyid
    //append webrtc stream to the canvas
    init();
	});

}

peer.on('call', function(incoming_call) {
	console.log("Got a call!");
	incoming_call.answer(mystream); // Answer the call with our stream from getUserMedia
	incoming_call.on('stream', function(remoteStream) {  // we receive a getUserMedia stream from the remote caller

	});
});


	
