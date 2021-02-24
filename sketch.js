let BACKGROUND;
let DRAWING_COLOR;

let font;

let L1;
let L2;

let isDraggingCell = false;
let draggingCell = null;

let isCreatePointer = false;
let initialCell = null;

let Cells = [];

function preload() {
	font = loadFont('assets/Typori-Regular.ttf');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	textFont(font);
	BACKGROUND = color(20);
	DRAWING_COLOR = color(220);

	L1 = new List(100, 100, "45", DRAWING_COLOR);
	L2 = new List(width / 2, height / 2, "123", DRAWING_COLOR);
	L1.setNext(L2);

	Cells.push(L1);
	Cells.push(L2);
	Cells.push(new List(400, 400, "hey", DRAWING_COLOR));
}

function draw() {
	background(BACKGROUND);

	showCells();
	if (isCreatePointer) {
		initialCell.drawLinkTo(mouseX, mouseY, initialCell.color);
	}
	// L1.show();
	// L2.show();

	// if (L2.isOnValue(mouseX, mouseY))
	// 	L2.color = color(255, 0, 0);
	// else {
	// 	L2.color = DRAWING_COLOR;
	// }
	//
	//
	// if (L1.isOn(mouseX, mouseY))
	// 	L1.color = color(0, 255, 0);
	// else {
	// 	L1.color = DRAWING_COLOR;
	// }


}


function mousePressed() {
	let c = isOnValueCell(mouseX, mouseY);
	if (c != null) {
		isDraggingCell = true;
		draggingCell = c;
	}

	c = isOnPointerCell(mouseX, mouseY);
	if (c != null) {
		isCreatePointer = true;
		initialCell = c;
	}
}

function mouseDragged() {
	if (isDraggingCell) {
		draggingCell.setPositionAt(mouseX, mouseY);
	}
}


function mouseReleased() {
	draggingCell = null;
	isDraggingCell = false;

	if (isCreatePointer) {
		let c = isOnCell(mouseX, mouseY);
		if (c != null) {
			if (c == initialCell) {
				initialCell.setNext(null);
			} else {
				initialCell.setNext(c);
			}
		}

	}

	isCreatePointer = false;
	initialCell = null;

}

function isOnValueCell(x, y) {
	for (let c of Cells) {
		if (c.isOnValue(x, y)) {
			return c;
		}
	}
	return null;
}

function isOnPointerCell(x, y) {
	for (let c of Cells) {
		if (c.isOnPointer(x, y)) {
			return c;
		}
	}
	return null;
}

function isOnCell(x, y) {
	for (let c of Cells) {
		if (c.isOn(x, y)) {
			return c;
		}
	}
	return null;
}


function showCells() {
	for (let c of Cells) {
		c.show();
	}
}