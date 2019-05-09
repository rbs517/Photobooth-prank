// Making the photobooth/ webcam look cool and not creepy at all!

let photobooth;

function setup() {
  createCanvas(500, 500);
  photobooth = createCapture('VIDEO', captureCallback);
  photobooth.hide();
  photobooth.elt.muted = true;
}

function captureCallback(s) {
  initwebrtc(s);
}

function draw() {
  background(220);
  image(photobooth, 0, 0);
  loadPixels();
  for (let i = 0; i < pixels.length; i+=4) {
    let r = pixels[i];
    let g = pixels[i+1];
    let b = pixels[i+2];
    
    // There is probably a better way to do threshold?
    if (r+b+g > 200) {
      pixels[i] = 255;
      pixels[i+1] = 220;
      pixels[i+2] = 20;
    } else {
      pixels[i] = 30;
      pixels[i+1] = 100;
      pixels[i+2] = 200;
    }
  }
  updatePixels();
  push();
  noFill();
  strokeWeight(80);
  stroke(30, 100, 200);
  rect(0, 0, 500, 500);
  pop();
  fill(255);
  textSize(25);
  text('ITP Memories', 150, 28);  
}



