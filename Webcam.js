let cam;
let exposureSlider, contrastSlider;
let fliptf

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Verdana');
  textStyle(BOLD);
  textSize(20);

  cam = createCapture(VIDEO, { flipped: true });
  cam.size(windowWidth/4, windowHeight/4)
  cam.hide();
  pixelDensity(1);

  exposureSlider = createSlider(0, 255, 128);
  exposureSlider.position(10, 450);
  exposureSlider.size(600);

  contrastSlider = createSlider(0, 255, 128);
  contrastSlider.position(10, 550);
  contrastSlider.size(600);
}

function draw() {
  background(0);
  cam.loadPixels();
  loadPixels();

  if (cam.pixels.length > 0) {
    for (let y = 0; y < cam.height; y++) {
      for (let x = 0; x < cam.width; x++) {
        let index = (x + y * cam.width) * 4;

        let r = cam.pixels[index];
        let g = cam.pixels[index + 1];
        let b = cam.pixels[index + 2];
        let brightness = (r + g + b) / 3;

        let exposure = exposureSlider.value();
        
        if (exposure < 128){
          exposure = map(exposure, 128, 0, 0, -100);
        }
        else{
          exposure = map(exposure, 128, 255, 0, 100);
        }
        brightness += exposure;

        let contrast = contrastSlider.value();
        let factor = map(contrast, 0, 255, 0, 3);
        brightness = (brightness - 128) * factor + 128;

        if(brightness < 0){ 
          brightness = 0;
        }
        else if (brightness > 255){
          brightness = 255;
        }

        pixels[index] = brightness;
        pixels[index + 1] = brightness;
        pixels[index + 2] = brightness;
        pixels[index + 3] = 255;
      }
    }
    updatePixels();
  }

  fill(255);
  text("Exposure", 20, 443);
  text("Contrast", 20, 543);
}

