
let fiocchi = [];
let numFiocchi = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);

  for (let i = 0; i < numFiocchi; i++) {
    fiocchi.push({
      px: random(0, width),
      py: random(-height, 0),
      dim: random(8, 32),
      velY: random(0.5, 2),
      velX: random(-0.5, 0.5),
      char: random(["✽", "✺", "✱", "✳", "✲", "❋", "☸", "⧆", "⊛", "⁕", "⁎", "﹡", "∗"])
    });
  }
}

function draw() {
  background(0);
  fill(255);

  for (let f of fiocchi) {
    // Movimento
    f.px += f.velX + random(-0.3, 0.3);
    f.py += f.velY + random(0, 0.5);

    // Se esce dal fondo, ricomincia dall'alto
    if (f.py > height) {
      f.py = random(-50, -10);
      f.px = random(0, width);
    }

    // Disegno
    textSize(f.dim);
    text(f.char, f.px, f.py);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}