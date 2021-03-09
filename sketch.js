let BACKGROUND;
let DRAWING_COLOR;
let ALERT_COLOR;
let RESULT_COLOR;

let font;

let isDraggingCell = false;
let draggingCell = null;

let isCreatePointer = false;
let initialCell = null;

let Cells = [];

let Heads = [];

let SelectedCells = [];
let ResultCells = [];
let ResultCellsKeys = [];
let ResultCellsNexts = [];

let newListB;
let newNodeB;


let menuHeads;


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
  ALERT_COLOR = color(191, 110, 110);
  RESULT_COLOR = color(50, 110, 190);

  Cells.push(new List(400, 0.3 * height, 45, DRAWING_COLOR));
  Cells.push(new List(600, 0.3 * height, 25, DRAWING_COLOR));
  Cells.push(new List(800, 0.3 * height, 6, DRAWING_COLOR));
  Cells.push(new List(1000, 0.3 * height, 78, DRAWING_COLOR));
  Cells.push(new List(500, 0.6 * height, 42, DRAWING_COLOR));
  Cells.push(new List(800, 0.6 * height, 54, DRAWING_COLOR));

  Cells[0].setNext(Cells[1]);
  Cells[1].setNext(Cells[2]);
  Cells[2].setNext(Cells[3]);
  // Cells[4].setNext(Cells[2]);
  Cells[4].setNext(Cells[5]);

  Heads.push(new Head(200, 0.3 * height, "L1", DRAWING_COLOR));
  Heads.push(new Head(200, 0.6 * height, "L2", DRAWING_COLOR));

  Heads[0].setNext(Cells[0]);
  Heads[1].setNext(Cells[4]);


  menuHeads = new Menu(80, height - 20, "      tête[L]      ", Heads, "tête[X]");
  menuKey = new Menu(menuHeads.x + menuHeads.w / 2 + 78, height - 20, "      cle[x]      ", Heads, "cle[tête[X]]");
  menuNext = new Menu(menuKey.x + menuKey.w / 2 + 84, height - 20, "      succ[x]      ", Heads, "succ[tête[X]]");

  newListB = new NewListTile(menuNext.x + 200, height - 20);
  newNodeB = new NewNodeTile(width / 2 + 200, height + 50);

}



function draw() {
  background(BACKGROUND);
  updateResult(mouseX, mouseY);

  showCells();
  showHeads();

  if (isCreatePointer) {
    initialCell.drawLinkTo(mouseX, mouseY, initialCell.color, initialCell.x, initialCell.y);
  }

  showLinks();



  isOnHeadValue(mouseX, mouseY);
  menuHeads.isShowing(mouseX, mouseY);
  menuNext.isShowing(mouseX, mouseY);
  menuKey.isShowing(mouseX, mouseY);
  menuHeads.show();
  menuKey.show();
  menuNext.show();
  newListB.show();
  newNodeB.show();
}

function updateResult(x, y) {
  let i = menuHeads.isOnItem(mouseX, mouseY);
  if (menuHeads.showing && i != null && menuHeads.isShowing) {
    ResultCells = [menuHeads.l[i].next];
  } else {
    ResultCells = [];
  }


  i = menuKey.isOnItem(mouseX, mouseY);
  if (menuKey.showing && i != null && menuKey.isShowing) {
    ResultCellsKeys = [menuKey.l[i].next];
  } else {
    ResultCellsKeys = [];
  }

  i = menuNext.isOnItem(mouseX, mouseY);
  if (menuNext.showing && i != null && menuNext.isShowing) {
    ResultCellsNexts = [menuNext.l[i].next];
  } else {
    ResultCellsNexts = [];
  }

  if (menuKey.isOn(mouseX, mouseY)) {
    if (SelectedCells.length == 1 && SelectedCells[0] instanceof List) {
      ResultCellsKeys = [SelectedCells[0]];
    }
  }

  if (menuNext.isOn(mouseX, mouseY)) {
    if (SelectedCells.length == 1 && SelectedCells[0] instanceof List) {
      ResultCellsNexts = [SelectedCells[0].next];
    }
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {

  if (mouseButton == LEFT) {
    let i = menuHeads.isOnItem(mouseX, mouseY);
    if (menuHeads.showing && i != null && menuHeads.isShowing) {
      SelectedCells = [menuHeads.l[i].next];
    } else {
      i = menuKey.isOnItem(mouseX, mouseY);
      if (menuKey.showing && i != null && menuKey.isShowing) {
        SelectedCells = [];
      } else {
        i = menuNext.isOnItem(mouseX, mouseY);
        if (menuNext.showing && i != null && menuNext.isShowing) {
          SelectedCells = [];
        } else {
          if (menuKey.isOn(mouseX, mouseY)) {
            if (SelectedCells.length == 1 && SelectedCells[0] instanceof List) {
              ResultCellsKeys = [];
            }
          } else
          if (menuNext.isOn(mouseX, mouseY)) {
            if (SelectedCells.length == 1 && SelectedCells[0] instanceof List) {
              ResultCellsNexts = [];
              SelectedCells = [SelectedCells[0].next];
            }
          } else {
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
                c = isOnHeadPointer(mouseX, mouseY);
                if (c != null) {
                  isCreatePointer = true;
                  initialCell = c;
                } else {
                  c = isOnHeadValue(mouseX, mouseY);
                  if (c != null) {
                    isDraggingCell = true;
                    draggingCell = c;
                  } else {
                    if (newListB.isOn(mouseX, mouseY)) {} else {
                      Cells.push(new List(mouseX, mouseY, "NIL", DRAWING_COLOR));
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  if (mouseButton == RIGHT) {
    c = isOnCell(mouseX, mouseY);
    if (c != null) {
      SelectedCells = [c];
    } else {
      SelectedCells = [];
    }
    c = isOnHeadPointer(mouseX, mouseY);
    if (c != null) {
      c.select();
    }
    c = isOnHeadValue(mouseX, mouseY);
    if (c != null) {
      c.select();
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

  } else {
    if (newListB.isOn(mouseX, mouseY)) {
      Heads.push(new Head(floor(random(50, width - 50)), floor(random(50, height - 50)), "L" + (Heads.length + 1), DRAWING_COLOR))
      newListB.t = " L" + (Heads.length + 1) + " = listechainee() "
    }
  }

  isCreatePointer = false;
  initialCell = null;

}

function mouseWheel() {
  let c = isOnValueCell(mouseX, mouseY);
  if (c != null) {
    if (c.v == "NIL") {
      c.v = 0;
    }
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


function showLinks() {
  for (let c of Cells) {
    if (c.next != null) {
      let color = DRAWING_COLOR;
      if (ResultCells.includes(c) || ResultCellsNexts.includes(c)) {
        color = RESULT_COLOR;
      } else if (SelectedCells.includes(c)) {
        color = ALERT_COLOR;
      }
      c.drawLinkTo(c.next.anchorLeftX, c.next.anchorLeftY + c.next.h / 2, color, c.x, c.y);
    }
  }

}


function isOnHeadPointer(x, y) {
  for (let h of Heads) {
    if (h.isOnPointer(x, y)) {
      return h;
    }
  }
}

function isOnHeadValue(x, y) {
  for (let h of Heads) {
    if (h.isOnValue(x, y)) {
      return h;
    }
  }
}


function showCells() {
  for (let c of Cells) {
    if (ResultCells.includes(c)) {
      c.show(RESULT_COLOR);
    } else {
      if (SelectedCells.includes(c)) {
        c.show(ALERT_COLOR);
      } else {
        c.show();
      }
      if (ResultCellsKeys.includes(c)) {
        c.showKeyAt(c.x, c.y, RESULT_COLOR);
      } else {
        if (ResultCellsNexts.includes(c)) {
          //c.showNextAt(c.x, c.y, RESULT_COLOR);
          c.show(RESULT_COLOR);
        }
      }
    }
  }
}


function keyPressed() {
  if (keyCode == BACKSPACE || keyCode == DELETE) {
    updateCleared();
  }
}


function showHeads() {
  for (let h of Heads) {
    if (SelectedCells.includes(h)) {
      h.show(ALERT_COLOR);
    } else {
      h.show();
    }
  }
}



function updateCleared() {
  for (let c of Cells) {
    if (SelectedCells.includes(c.next)) {
      c.next = null;
    }
  }

  for (let h of Heads) {
    if (SelectedCells.includes(h.next)) {
      h.next = null;
    }
  }


  for (let c of SelectedCells) {
    if (c instanceof List) {
      Cells.splice(Cells.indexOf(c), 1);
    }
    if (c instanceof Head) {
      Heads.splice(Heads.indexOf(c), 1);
    }
  }




}