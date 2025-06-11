let fulmini = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(60);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	// Lampo occasionale
	if (random() < 0.005) {
		createFulmine();
	}

	// Sfondo scuro o con lampo
	if (fulmini.length > 0) {
		background(50, 50, 100); // bluastro chiaro per effetto lampo
	} else {
		background(0);
	}

	// Disegna fulmini
	for (let i = fulmini.length - 1; i >= 0; i--) {
		drawFulmine(fulmini[i]);
		fulmini[i].lifetime--;
		if (fulmini[i].lifetime <= 0) {
			fulmini.splice(i, 1); // rimuovi se scaduto
		}
	}

	// Pioggia davanti
	for (let i = 0; i < 100; i++) {
		let gl = random(10, 150);
		let gx = random(0, width);
		let gy = random(-gl, height);

		strokeWeight(random(1, 3));
		stroke(255, random(100, 255));
		line(gx, gy, gx, gy + gl);
	}
}

// Funzione per generare un fulmine
function createFulmine() {
	let x = random(width);
	fulmini.push({
		x: x,
		y: 0,
		segments: generateSegments(x, 0),
		lifetime: int(random(5, 10)) // fulmine visibile per pochi frame
	});
}

// Crea segmenti a zig-zag per simulare un fulmine
function generateSegments(x, y) {
	let segments = [];
	let currentX = x;
	let currentY = y;

	for (let i = 0; i < 10; i++) {
		let nextX = currentX + random(-20, 20);
		let nextY = currentY + random(20, 40);
		segments.push({ x1: currentX, y1: currentY, x2: nextX, y2: nextY });
		currentX = nextX;
		currentY = nextY;
		if (currentY > height) break;
	}
	return segments;
}

// Disegna un singolo fulmine
function drawFulmine(fulmine) {
	strokeWeight(2);
	stroke(255, 255, 200, 200); // bianco-giallastro
	for (let seg of fulmine.segments) {
		line(seg.x1, seg.y1, seg.x2, seg.y2);
	}
}