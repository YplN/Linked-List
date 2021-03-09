class Head {
  constructor(x, y, v, c) {
    this.x = x;
    this.y = y;
    this.color = c;
    this.v = v;
    this.next = null;

    let bbox = font.textBounds(v + "", 0, 0, HEAD_TEXT_SIZE);
    this.vw = bbox.w;
    this.vh = bbox.h;

    this.w = EMPTY_CELL_W; // 2*padding + size value + size pointer cell
    this.h = EMPTY_CELL_W;
  }

  updateValue(v) {
    this.v = v;
    let bbox = font.textBounds(v + "", 0, 0, HEAD_TEXT_SIZE);
    this.vw = bbox.w;
    this.vh = bbox.h;

    this.w = 2 * PADDING + this.vw; // 2*padding + size value + size pointer cell
    this.h = 2 * PADDING + this.vh;
  }

  show(c) {
    this.showAt(this.x, this.y, c);
  }

  showAt(x, y, c) {
    let color = this.color;
    if (c != null)
      color = c;

    let anchorLeftX = x - this.w / 2;
    let anchorLeftY = y - this.h / 2;

    // drawing cell
    fill(BACKGROUND);
    stroke(color);
    strokeWeight(2);
    rect(anchorLeftX, anchorLeftY, this.w, this.h);

    // drawing text
    fill(color);
    noStroke();
    textAlign(RIGHT, BASELINE);
    textSize(HEAD_TEXT_SIZE);
    text(this.v, anchorLeftX - PADDING, this.y + this.vh / 2);


    if (this.next == null) {
      stroke(color);
      strokeWeight(2);

      if (this != initialCell) {
        line(anchorLeftX, anchorLeftY + this.h, anchorLeftX + this.w, anchorLeftY);
      } else {
        fill(DRAWING_COLOR);
        circle(x, y, 10);
      }

    } else {

      let otherCellX = this.next.x - 2 * PADDING - this.next.vw;
      let otherCellY = this.next.y;

      this.drawLinkTo(otherCellX, otherCellY, color, x, y);
      fill(DRAWING_COLOR);
      circle(x, y, 10);
    }

  }


  setNext(L) {
    this.next = L;
  }


  isOnPointer(x, y) {
    return (abs(this.x - x) <= this.w / 2 && abs(y - this.y) <= this.h / 2);
  }

  isOnValue(x, y) {
    return (abs(this.x - this.w / 2 - this.vw / 2 - x) <= this.vw / 2 + PADDING && abs(y - this.y) <= this.vh / 2);
  }


  setPositionAt(x, y) {
    this.x = x;
    this.y = y;
  }


  drawLinkTo(otherCellX, otherCellY, color, x, y) {

    let thisCellX = this.x;
    let thisCellY = this.y;

    if (x != null && y != null) {
      let thisCellX = x + EMPTY_CELL_W / 2;
      let thisCellY = y;
    }

    //drawing link
    stroke(color);
    strokeWeight(2);
    line(thisCellX, thisCellY, otherCellX, otherCellY);


    // drawing arrow
    angleMode(RADIANS);
    push()
    let angle = atan2(thisCellY - otherCellY, thisCellX - otherCellX); //gets the angle of the line
    translate(otherCellX, otherCellY); //translates to the destination point

    fill(color);
    rotate(angle - HALF_PI); //rotates the arrow point
    let offset = 10; // size of arrow
    let adjust = 5; //
    triangle(-offset * 0.5, offset + adjust, offset * 0.5, offset + adjust, 0, -offset / 2 + adjust); //draws the arrow point as a triangle
    pop();
  }


}