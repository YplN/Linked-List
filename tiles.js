class Tile {
  constructor(x, y, t) {
    this.x = x;
    this.y = y;
    this.t = t;
    this.dragging = false;
    this.c = null;

    let bbox = font.textBounds(t, 0, 0, 20);
    this.w = bbox.w + 20;
    this.h = bbox.h + 20;
  }

  show() {
    this.showAt(this.x, this.y);
  }

  isOn(x, y) {
    return (abs(x - this.x) <= this.w / 2 && abs(y - this.y) <= this.h / 2);
  }


  showAt(x, y) {
    rectMode(CORNER);
    strokeWeight(2);

    let textColor = DRAWING_COLOR;
    let buttonColor = BACKGROUND;
    let textColorHover = BACKGROUND;
    let buttonColorHover = DRAWING_COLOR;

    if (this.c != null) {

      textColor = this.c;
      buttonColor = color(BACKGROUND);
      textColorHover = color(BACKGROUND);
      buttonColorHover = this.c;
    }


    if (!this.isOn(mouseX, mouseY)) {
      stroke(textColor);
      fill(buttonColor);
    } else {
      stroke(textColorHover);
      fill(buttonColorHover);
    }
    rect(x - this.w / 2, y - this.h / 2, this.w, this.h, 10);

    textAlign(CENTER, BASELINE);
    textFont(font);
    textSize(20);
    noStroke();

    if (!this.isOn(mouseX, mouseY)) {
      fill(textColor);
    } else {
      fill(textColorHover);
    }

    text(this.t, x, y + 10);
  }

}


class PopTile extends Tile {
  constructor(x, y) {
    let t = "dépiler(P)";
    if (!isStack) {
      t = "défiler(F)";
    }
    super(x, y, t);
  }
}


class PushTile extends Tile {
  constructor(x, y, t) {
    let dataType = "empiler(P,";
    if (!isStack) {
      dataType = "enfiler(F,";
    }

    if (t != null) {
      super(x, y, dataType + t + ")");
      this.v = t;
    } else {

      super(x, y, dataType + "x)");
    }
  }
}


class ResetTile extends Tile {
  constructor(x, y, t) {

    let dataType = "P = pile(P)";
    if (!isStack) {
      dataType = "F = file(F)";
    }
    super(x, y, dataType);
  }
}

class NewListTile extends Tile {
  constructor(x, y, t) {
    super(x, y, "L = listechainee()");
  }
}

class NewNodeTile extends Tile {
  constructor(x, y, t) {
    super(x, y, "maillon()");
  }
}