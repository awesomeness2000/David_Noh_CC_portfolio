let cam;
let exposureSlider, contrastSlider;

function preload(){
  myFont = loadFont("Assets/font.otf")
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  frameRate(30);

  cam = createCapture(VIDEO);
  cam.size(160, 120);
  cam.hide();

  exposureSlider = createSlider(0, 255, 128);
  exposureSlider.size(400);
  exposureSlider.position(100, windowHeight - 80);

  contrastSlider = createSlider(0, 255, 128);
  contrastSlider.size(400);
  contrastSlider.position(100, windowHeight - 40);
}

function draw() {
  background(0);
  cam.loadPixels();
  loadPixels();

  if (cam.pixels.length > 0) {
    for (let y = 0; y < height; y++) {
      let cy = floor(map(y, 0, height, 0, cam.height));
      for (let x = 0; x < width; x++) {
        let cx = floor(map(x, 0, width, 0, cam.width));
        let ci = (cx + cy * cam.width) * 4;

        let r = cam.pixels[ci];
        let g = cam.pixels[ci + 1];
        let b = cam.pixels[ci + 2];
        let v = (r + g + b) / 3;

        let e = exposureSlider.value();
        if (e < 128) {
          e = map(e, 128, 0, 0, -80);
        } else {
          e = map(e, 128, 255, 0, 80);
        }
        v += e;

        let c = contrastSlider.value();
        let f = map(c, 0, 255, 0, 2);
        v = (v - 128) * f + 128;
        v = constrain(v, 0, 255);

        let di = (x + y * width) * 4;
        pixels[di] = v;
        pixels[di + 1] = v;
        pixels[di + 2] = v;
        pixels[di + 3] = 255;
      }
    }
    updatePixels();
  }

  fill(255);
  textSize(20);
  text("Exposure", 570, windowHeight - 68);
  text("Contrast", 570, windowHeight - 28);

 fill(75, 0, 255);
  rect(20, 20, 120, 40, 10);
  fill(255);
  textFont(myFont);
  textSize(18);
  textAlign(CENTER, CENTER);
  text("Home", 80, 40);
}

function mousePressed() {
  if (mouseX > 20 && mouseX < 140) {
    if (mouseY > 20 && mouseY < 60) {
      window.location.href = "index.html";
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  exposureSlider.position(100, windowHeight - 80);
  contrastSlider.position(100, windowHeight - 40);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}