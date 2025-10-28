let stars = [];
let numArms = 2;
let rotation = 0;
let baseRadius = 200;
let growth = 0;
let fade = 255;
let bg;
let bgAlpha = 0;
let showBG = false;
let textAlpha = 0;
let font;

function preload() {
  font = loadFont("Assets/font.otf")
  bg = loadImage("Assets/Background.jpg");
  music = loadSound("Assets/music.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  generateGalaxy(numArms, baseRadius);
  textAlign(CENTER, CENTER);
  textSize(40);
  textFont(font)
  userStartAudio();
  music.loop();

 
}

function draw() {
  background(14, 23, 41, 40);

  if (showBG === false) {
    drawGalaxy();
  }

  if (showBG === true) {
    fadeInBackgroundAndText();
  }
}

function drawGalaxy() {
  push();
  translate(width / 2, height / 2);
  rotate(rotation);

  for (let s of stars) {
    fill(red(s.c), green(s.c), blue(s.c), fade);
    let scale = 1 + growth / baseRadius;
    ellipse(s.x * scale, s.y * scale, s.size);
  }
  pop();

  rotation += 0.02;
  growth += 5;
  fade -= 1;

  if (fade <= 0) {
    showBG = true;
  }
}

function fadeInBackgroundAndText() {
  tint(150, bgAlpha);
  image(bg, 0, 0, width, height);
  noTint();

  if (bgAlpha < 150) {
    bgAlpha += 3;
  } else {
    if (textAlpha < 255) {
      textAlpha += 4;
    } else {
      textAlpha = 255;
      noLoop();

      setTimeout(() => {
        document.getElementById("menu").style.opacity = 1;
      }, 150);
    }

    fill(255, textAlpha);
    textSize(40)
    text("Welcome to David's Creative Galaxy", width / 2, height / 5);

    textSize(20, textAlpha)
    fill(70,50,150)
    text("Click background to start music", width / 2, height / 5 + 50);
    
  }
}

function generateGalaxy(arms, size) {
  stars = [];
  let numStars = 800;
  for (let i = 0; i < numStars; i++) {
    let angle = i * 0.1;
    let radius = map(i, 0, numStars, 0, size);
    let arm = i % arms;
    let armAngle = (TWO_PI / arms) * arm;
    let x = cos(angle + armAngle) * radius + random(-10, 10);
    let y = sin(angle + armAngle) * radius + random(-10, 10);
    let c = color(random(150, 255), random(150, 255), random(200, 255));
    let s = random(1, 3);
    stars.push({ x, y, size: s, c });
  }
}
