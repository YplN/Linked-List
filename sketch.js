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

let Heads = [];

let newListB;


// function to disable default menu on right click
// https://discourse.processing.org/t/using-right-mouse-without-context-menu/9379/3
document.oncontextmenu = function() {
  return false;
}



function preload() {
  font = loadFont('assets/Typori-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  BACKGROUND = color(20);
  DRAWING_COLOR = color(220);

  L1 = new List(100, 100, 45, DRAWING_COLOR);
  L2 = new List(width / 2, height / 2, 123, DRAWING_COLOR);
  L1.setNext(L2);

  Cells.push(L1);
  Cells.push(L2);
  Cells.push(new List(400, 400, 22, DRAWING_COLOR));

  Heads.push(new Head(200, 200, "L", DRAWING_COLOR))

  newListB = new NewListTile(width / 2, height - 50);
}

function draw() {
  background(BACKGROUND);

  newListB.show();

  showCells();
  showHeads();
  if (isCreatePointer) {
    initialCell.drawLinkTo(mouseX, mouseY, initialCell.color);
  }

}


function mousePressed() {
  let c = isOnValueCell(mouseX, mouseY);
  if (c != null) {
    isDraggingCell = true;
    draggingCell = c;
  } else {

    c = isOnPointerCell(mouseX, mouseY);
    if (c != null) {
      isCreatePointer = true;
      initialCell = c;
    } else {
      if (!newListB.isOn(mouseX, mouseY))
        Cells.push(new List(mouseX, mouseY, floor(1 + random(20)), DRAWING_COLOR));
    }

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

function mouseWheel() {
  let c = isOnValueCell(mouseX, mouseY);
  if (c != null) {
    if (event.delta > 0) {
      c.updateValue(max(0, c.v - 1));
    } else {
      c.updateValue(min(99, c.v + 1));
    }
  }
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


function isOnHead(x, y) {
  for (let h of Heads) {
    if (h.isOn(x, y)) {
      return h;
    }
  }
}


function showCells() {
  for (let c of Cells) {
    c.show();
  }
}


function showHeads() {
  for (let h of Heads) {
    h.show();
  }
}