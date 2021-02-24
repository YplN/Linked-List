let PADDING = 15;
let EMPTY_CELL_W = 40;
let TEXT_SIZE = 25;

class List {
	constructor(x, y, v, c) {
		this.x = x;
		this.y = y;
		this.color = c;
		this.v = v;
		this.next = null;

		let bbox = font.textBounds(v, 0, 0, TEXT_SIZE);
		this.vw = bbox.w;
		this.vh = bbox.h;

		this.w = 2 * PADDING + this.vw + EMPTY_CELL_W; // 2*padding + size value + size pointer cell
		this.h = 2 * PADDING + this.vh;
	}

	show(c) {
		this.showAt(this.x, this.y, c);
	}

	showAt(x, y, c) {
		let color = this.color;
		if (c != null)
			color = c;

		let anchorLeftX = x - 2 * PADDING - this.vw;
		let anchorLeftY = y - PADDING - this.vh / 2;

		// drawing left cell
		fill(color);
		rect(anchorLeftX, anchorLeftY, 2 * PADDING + this.vw, this.h, 10, 0, 0, 10); // error with color here?

		// drawing text
		fill(BACKGROUND);
		noStroke();
		textAlign(CENTER, BASELINE);
		textSize(TEXT_SIZE);
		let textX = x - PADDING - this.vw / 2;
		let textY = y + this.vh / 2;
		text(this.v, textX, textY);


		// drawing link
		if (this.next == null) {
			stroke(color);
			strokeWeight(2);

			if (this != initialCell) {
				line(x, y + this.h / 2, x + EMPTY_CELL_W, y - this.h / 2);
			} else {
				fill(DRAWING_COLOR);
				circle(x + EMPTY_CELL_W / 2, y, 10);
			}

		} else {
			fill(DRAWING_COLOR);
			circle(x + EMPTY_CELL_W / 2, y, 10);

			let otherCellX = this.next.x - 2 * PADDING - this.next.vw;
			let otherCellY = this.next.y;

			this.drawLinkTo(otherCellX, otherCellY, color, x, y);
		}


		// drawing rectangle
		noFill();
		stroke(color);
		strokeWeight(2);
		rect(anchorLeftX, anchorLeftY, this.w, this.h, 10, 0, 0, 10);
	}

	drawLinkTo(otherCellX, otherCellY, color, x, y) {

		let thisCellX = this.x + EMPTY_CELL_W / 2;
		let thisCellY = this.y;

		if (x != null && y != null) {
			let thisCellX = x + EMPTY_CELL_W / 2;
			let thisCellY = y;
		}

		//drawing link
		stroke(color);
		line(thisCellX, thisCellY, otherCellX, otherCellY);

		// drawing arrow
		angleMode(RADIANS);
		push()
		let angle = atan2(thisCellY - otherCellY, thisCellX - otherCellX); //gets the angle of the line
		translate(otherCellX, otherCellY); //translates to the destination point

		fill(color);
		rotate(angle - HALF_PI); //rotates the arrow point
		stroke(255, 0, 0);
		let offset = 10; // size of arrow
		let adjust = 5; //
		strokeWeight(0);
		triangle(-offset * 0.5, offset + adjust, offset * 0.5, offset + adjust, 0, -offset / 2 + adjust); //draws the arrow point as a triangle
		pop();
	}


	setNext(L) {
		this.next = L;
	}


	isOnPointer(x, y) {
		return (this.x <= x && x <= this.x + EMPTY_CELL_W && this.y - this.h / 2 <= y && y <= this.y + this.h / 2);
	}

	isOn(x, y) {
		return (this.x - 2 * PADDING - this.vw <= x && x <= this.x + EMPTY_CELL_W && this.y - this.h / 2 <= y && y <= this.y + this.h / 2);
	}

	isOnValue(x, y) {
		return this.isOn(x, y) && !this.isOnPointer(x, y);
	}


	setPositionAt(x, y) {
		this.x = x;
		this.y = y;
	}


}