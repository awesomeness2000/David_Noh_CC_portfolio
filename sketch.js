let stars = [];
let numArms = 2; 
let rotation = 0; 
let baseRadius = 200;
let growth = 0;
let fade = 255;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  generateGalaxy(numArms, baseRadius);
}

function draw() {
  background(0, 40);
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
  growth += 1.5;
  fade -= .8;

  if (fade <= 0) noLoop();
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
