class Menu {
  constructor(x, y, t, l) {
    this.x = x;
    this.y = y;
    this.t = t;
    this.l = l;

    let bbox = font.textBounds(t, 0, 0, 20);
    this.w = bbox.w + 20;
    this.h = bbox.h + 20;

    this.showing = false;
    this.persistantShowing = false;
    this.d = "UP";
  }

  show() {
    this.showAt(this.x, this.y);
  }

  showAt(x, y) {
    rectMode(CORNER);
    strokeWeight(2);

    let textColor = BACKGROUND;
    let buttonColor = DRAWING_COLOR;
    let textColorHover = DRAWING_COLOR;
    let buttonColorHover = BACKGROUND;

    if (this.c != null) {
      textColor = this.c;
      buttonColor = color(BACKGROUND);
      textColorHover = color(BACKGROUND);
      buttonColorHover = this.c;
    }


    if (!this.isOn(mouseX, mouseY)) {
      stroke(buttonColor);
      fill(buttonColor);
    } else {
      stroke(textColorHover);
      fill(buttonColorHover);
    }

    rect(x - this.w / 2, y - this.h / 2, this.w, this.h);


    if (this.showing) {
      let d = 1;
      if (this.d == "UP") {
        d = -1;
      }
      for (var i = 0; i < this.l.length; i++) {
        this.showItemAt(x, y, i);
      }
    }



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



  isOn(x, y) {
    return (abs(x - this.x) <= this.w / 2 && abs(y - this.y) <= this.h / 2);
  }

  isOnItem(x, y) {
    let d = 1;
    if (this.d == "UP") {
      d = -1;
    }
    for (var i = 0; i < this.l.length; i++) {
      if (abs(x - this.x) <= this.w / 2 && abs(y - (i + 1) * d * this.h - this.y) <= this.h / 2) {
        return i;
      }
    }
    return;
  }



  showItemAt(x, y, i) {

    let d = 1;
    if (this.d == "UP") {
      d = -1;
    }


    rectMode(CORNER);
    strokeWeight(2);

    let textColor = BACKGROUND;
    let buttonColor = DRAWING_COLOR;
    let textColorHover = DRAWING_COLOR;
    let buttonColorHover = BACKGROUND;

    if (this.c != null) {
      textColor = this.c;
      buttonColor = color(BACKGROUND);
      textColorHover = color(BACKGROUND);
      buttonColorHover = this.c;
    }

    let index = this.isOnItem(mouseX, mouseY);

    if (index != i) {
      stroke(buttonColor);
      fill(buttonColor);
    } else {
      stroke(textColorHover);
      fill(buttonColorHover);
    }


    rect(x - this.w / 2, y - this.h / 2 + (i + 1) * d * this.h, this.w, this.h);

    textAlign(CENTER, BASELINE);
    textFont(font);
    textSize(20);
    fill(textColor);
    noStroke();
    text(this.l[i].v, x, y + 10 + (i + 1) * d * this.h);




    textAlign(CENTER, BASELINE);
    textFont(font);
    textSize(20);
    noStroke();

    if (index != i) {
      fill(textColor);
    } else {
      fill(textColorHover);
    }

    text(this.l[i].v, x, y + 10 + (i + 1) * d * this.h);

  }


  isShowing(x, y) {
    this.persistantShowing = this.persistantShowing || this.isOn(mouseX, mouseY);
    this.showing = (this.isOn(mouseX, mouseY) || (this.persistantShowing && this.isOnItem(mouseX, mouseY) != null));
    this.persistantShowing = this.showing;
  }

}