/* jshint esversion: 6 */
const FPS = 30, SLOW_DOWN = 1;
const WIDTH = 600, HEIGHT = 600;
const CIRCLE_WIDTH = 500, RADIUS = CIRCLE_WIDTH / 2;
const NUM_POINTS = 100;

let multiplier = 0;

function setup() { 
  createCanvas(WIDTH, HEIGHT);
  frameRate(FPS);
}

function draw() { 
  clear();
  background('black');
  
  // Circle
  noFill();
  stroke('lightgrey');
  ellipse(width / 2, height / 2, CIRCLE_WIDTH);
  
  fill('white');
  stroke('white');
  textSize(20);
  text(Math.round(multiplier * 1000) / 1000, 10, 20);
  
  // Draw lines
  noFill();
  stroke('PaleVioletRed');
  for (let i = 0; i < NUM_POINTS; i++) {
  	const j = modProd(i, multiplier, NUM_POINTS);
    const angle1 = numToAngle(i);
    const angle2 = numToAngle(j);
    const [x1, y1] = angleToPoints(angle1);
    const [x2, y2] = angleToPoints(angle2);
    line(x1, y1, x2, y2);
  }
  
  // Draw points
  fill('PapayaWhip')
  stroke('PapayaWhip');
  for (let i = 0; i < NUM_POINTS; i++) {
  	const angle = numToAngle(i);
    const [x, y] = angleToPoints(angle);
    ellipse(x, y, 5);
  }
  
  multiplier += 1 / (SLOW_DOWN * FPS);
  multiplier = mod(multiplier, NUM_POINTS)
}

function angleToPoints(angle) {
	const x = width / 2 + RADIUS * cos(angle);
  const y = height / 2 - RADIUS * sin(angle);
  return [x, y];
}

function mod(a, b) {
	const c = a / b;
  return (c - floor(c)) * b;
}

function modProd(a, b, m) {
	return mod(a * b, m);
}

function numToAngle(num) {
	return num * TWO_PI / NUM_POINTS;
}
