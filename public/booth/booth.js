var mystream;

// We'll use a global variable to hold on to our id from PeerJS
var peer_id = null;

// Register for an API Key:	http://peerjs.com/peerserver
//var peer = new Peer({key: 'YOUR API KEY'});
// The Peer Cloud Server doesn't seem to be operational, I setup a server on a Digital Ocean instance for our use, you can use that with the following constructor:
var peer = new Peer('thebooth');
//var peer = new Peer({host: 'localhost', port: 8000, path: '/publicbooth/booth.html'});
// var peer = new Peer();

// Get an ID from the PeerJS server
peer.on('open', function(id) {
  	console.log('B: My peer ID is: ' + id);
  	peer_id = id;
});

peer.on('error', function(err) {
  console.log(err);
});

function initwebrtc(stream) {
	mystream = stream;
  	console.log("B: Calling watcher");
  	var call = peer.call("thewatcher", mystream);
  	
  	call.on('stream', function(remoteStream) {
  	  	console.log("B: Got a response");
  	// Don't do anything
	});

}

peer.on('call', function(incoming_call) {
	console.log("B: Got a call!");
	incoming_call.answer(mystream); // Answer the call with our stream from getUserMedia
	incoming_call.on('stream', function(remoteStream) {  // we receive a getUserMedia stream from the remote caller
	// Don't do anything
	});
});


	
		