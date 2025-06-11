let paddle1Y, paddle2Y;
let paddleHeight = 80;
let paddleWidth = 15;

let posX, posY;
let velX = 0, velY = 0;
let ballColor;
let bgColor;

let score1 = 0;
let score2 = 0;

let gameRunning = false;
let flashTimer = 0;

let speedBoosted = false;

function setup() {
  createCanvas(600, 400);
  frameRate(120);
  textAlign(CENTER);
  resetBall();
  bgColor = color(200);
  ballColor = color(random(255), random(255), random(255));
  paddle1Y = height / 2 - paddleHeight / 2;
  paddle2Y = height / 2 - paddleHeight / 2;
}

function resetBall() {
  posX = width - paddleWidth - 12;
  posY = height / 2;
  velX = 0;
  velY = 0;
  ballColor = color(random(255), random(255), random(255));
}

function startBall() {
  let speedX = random(2.5, 3.5);
  let speedY = random(2, 3);
  velX = -speedX;
  velY = random([speedY, -speedY]);
}

function boostSpeed() {
  velX *= 1.5;
  velY *= 1.5;
  bgColor = color(255, 204, 0);
}

function draw() {
  if (flashTimer > 0) {
    if (frameCount % 10 < 5) {
      background(255, 100, 100);
    } else {
      background(bgColor);
    }
    flashTimer--;
  } else {
    background(bgColor);
  }

  stroke(255);
  strokeWeight(2);
  line(width / 2, 0, width / 2, height);

  if (gameRunning) {
    posX += velX;
    posY += velY;

    if (posY <= 0 || posY >= height) {
      velY *= -1;
      ballColor = color(random(255), random(255), random(255));
      bgColor = color(random(255), random(255), random(255));
    }

    if (
      posX - 12 <= paddleWidth &&
      posY >= paddle1Y &&
      posY <= paddle1Y + paddleHeight
    ) {
      velX *= -1;
      ballColor = color(random(255), random(255), random(255));
      bgColor = color(random(255), random(255), random(255));
      velX *= 1.05;
      velY *= 1.05;
    }

    if (
      posX + 12 >= width - paddleWidth &&
      posY >= paddle2Y &&
      posY <= paddle2Y + paddleHeight
    ) {
      velX *= -1;
      ballColor = color(random(255), random(255), random(255));
      bgColor = color(random(255), random(255), random(255));
      velX *= 1.05;
      velY *= 1.05;
    }

    if (posX < 0) {
      score2++;
      gameRunning = false;
      flashTimer = 30;
      resetBall();
      if (score2 >= 3 && !speedBoosted) {
        boostSpeed();
        speedBoosted = true;
      }
    }
    if (posX > width) {
      score1++;
      gameRunning = false;
      flashTimer = 30;
      resetBall();
      if (score1 >= 3 && !speedBoosted) {
        boostSpeed();
        speedBoosted = true;
      }
    }
  }

  // paddle1 segue il mouse
  paddle1Y = constrain(mouseY - paddleHeight / 2, 0, height - paddleHeight);

  // paddle2 automatico
  paddle2Y = constrain(paddle2Y + cos(frameCount * 0.1) * 2, 0, height - paddleHeight);

  // Palla
  noStroke();
  fill(ballColor);
  ellipse(posX, posY, 25);

  // Racchette
  fill(0);
  rect(0, paddle1Y, paddleWidth, paddleHeight);
  rect(width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);

  // Punteggio
  fill(0);
  textSize(18);
  text(score1, width / 4, 30);
  text(score2, (3 * width) / 4, 30);

  // Messaggio iniziale
  if (!gameRunning) {
    fill(0);
    textSize(20);
    text("Clicca per iniziare", width / 2, height / 2);
  }
}

// Inizio gioco con clic del mouse
function mousePressed() {
  if (!gameRunning) {
    gameRunning = true;
    startBall();
  }
}
