let cities = [
  { name: "Paris", offset: 2 },
  { name: "New York", offset: -4 },
  { name: "London", offset: 1 },
  { name: "Tokyo", offset: 9 },
  { name: "Sydney", offset: 10 },
  { name: "Los Angeles", offset: -7 }
];

let currentCityIndex = 0;
let rotation = 0;
let targetRotation = 0;
let isAnimating = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("monospace");
  angleMode(DEGREES);
}

function draw() {
  background(0);

  // Orologio per la città attuale
  let city = cities[currentCityIndex];
  let now = new Date();
  let utc = now.getTime() + now.getTimezoneOffset() * 60000;
  let localTime = new Date(utc + 3600000 * city.offset);

  let h = nf(localTime.getHours(), 2);
  let m = nf(localTime.getMinutes(), 2);
  let s = nf(localTime.getSeconds(), 2);
  let timeStr = `${h}:${m}:${s}`;

  // Animazione rotazione
  if (isAnimating) {
    rotation = lerp(rotation, targetRotation, 0.1);
    if (abs(rotation - targetRotation) < 0.5) {
      rotation = targetRotation;
      isAnimating = false;
    }
  }

  push();
  translate(width / 2, height / 2);
  rotate(rotation);

  // Rettangolo neon
  stroke(255);
  strokeWeight(3);
  noFill();
  rectMode(CENTER);
  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = '#ffffff';
  rect(0, 0, 400, 120, 20);

  // Ora effetto LED
  fill(255);
  textSize(48);
  drawingContext.shadowBlur = 30;
  drawingContext.shadowColor = '#ffffff';
  textAlign(CENTER, CENTER);
  text(timeStr, 0, 0);
  pop();

  // Nome città sopra
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = '#ffffff';
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(cities[currentCityIndex].name.toUpperCase(), width / 2, height / 2 - 150);

  // Istruzione in basso
  drawingContext.shadowBlur = 5;
  drawingContext.shadowColor = '#ffffff';
  textSize(16);
  text("Clicca per cambiare fuso orario", width / 2, height - 40);

  // Reset
  drawingContext.shadowBlur = 0;
}

function mousePressed() {
  if (!isAnimating) {
    currentCityIndex = (currentCityIndex + 1) % cities.length;
    targetRotation += 360;
    isAnimating = true;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}