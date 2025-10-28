let font;

function preload() {
  font = loadFont("Assets/font.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  textFont(font);
}

function draw() {
  background(14, 23, 41);
  translate(width / 2, height / 2);
  rotate(-90);

  noFill();
  stroke(255);
  strokeWeight(3);
  ellipse(0, 0, 700);

  push();
  textAlign(CENTER, CENTER);
  fill(255);
  noStroke();
  textSize(40);
  for (let i = 1; i <= 12; i++) {
    let angle = i * 30;
    push();
    rotate(angle);
    translate(300, 0);
    rotate(90);
    text(i, 0, 0);
    pop();
  }
  pop();

  let hr = hour() % 12;
  let mn = minute();
  let sc = second();

  let secondAngle = map(sc, 0, 60, 0, 360);
  let minuteAngle = map(mn + sc / 60, 0, 60, 0, 360);
  let hourAngle = map(hr + mn / 60 + sc / 3600, 0, 12, 0, 360);

  push();
  rotate(hourAngle);
  stroke(255);
  strokeWeight(8);
  line(0, 0, 150, 0);
  pop();

  push();
  rotate(minuteAngle);
  stroke(200, 200, 255);
  strokeWeight(5);
  line(0, 0, 230, 0);
  pop();

  push();
  rotate(secondAngle);
  stroke(150, 50, 255);
  strokeWeight(2);
  line(0, 0, 270, 0);
  pop();

  fill(255);
  noStroke();
  ellipse(0, 0, 25);

  resetMatrix();
  fill(75, 0, 255);
  rect(20, 20, 120, 40, 10);
  fill(255);
  textFont(font);
  textSize(18);
  textAlign(CENTER, CENTER);
  text("Home", 80, 40);
}

function mousePressed() {
  if (mouseX > 20 && mouseX < 140 && mouseY > 20 && mouseY < 60) {
    window.location.href = "index.html";
  }
}
