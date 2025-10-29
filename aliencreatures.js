let creatures = [];
let foods = [];

function preload(){
    myFont = loadFont("Assets/font.otf")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 10; i++) {
    creatures.push(new Creature(random(width), random(height)));
  }
  for (let i = 0; i < 25; i++) {
    foods.push(new Food(random(width), random(height)));
  }
}

function draw() {
  background(30, 0, 60, 95);

  for (let i = 0; i < foods.length; i++) {
    let f = foods[i];
    fill(255, 200, 0);
    noStroke();
    ellipse(f.x, f.y, f.size);

    if (dist(mouseX, mouseY, f.x, f.y) < f.size / 2) {
      stroke(255);
      strokeWeight(2);
      noFill();
      ellipse(f.x, f.y, f.size + 5);
    }
  }

  for (let i = 0; i < creatures.length; i++) {
    let c = creatures[i];
    c.move();
    c.eat(foods);

    let col = c.color;
    if (dist(mouseX, mouseY, c.x, c.y) < c.size / 2) {
      col = color(255);
    }

    fill(col);
    noStroke();
    ellipse(c.x, c.y, c.size);
  }

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

class Creature {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.targetX = random(width);
    this.targetY = random(height);
    this.size = 20;
    this.speed = random(0.02, 0.05);
    this.energy = 100;
    this.color = color(random(100, 255), random(100, 255), random(100, 255));
  }

  move() {
    this.x = lerp(this.x, this.targetX, this.speed);
    this.y = lerp(this.y, this.targetY, this.speed);

    if (dist(this.x, this.y, this.targetX, this.targetY) < 5) {
      this.targetX = random(width);
      this.targetY = random(height);
    }

    this.energy -= 0.5;
  }

  eat(foodArray) {
    for (let i = foodArray.length - 1; i >= 0; i--) {
      let f = foodArray[i];
      let d = dist(this.x, this.y, f.x, f.y);
      if (d < this.size / 2 + f.size / 2) {
        let energyGain = map(f.size, 5, 20, 5, 30);
        this.energy += energyGain;
        foodArray.splice(i, 1);
      }
    }
  }
}


class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(5, 20);
  }
}

function mouseClicked(){
  for (let i = 0; i < 25; i++) {
    foods.push(new Food(random(width), random(height)));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}