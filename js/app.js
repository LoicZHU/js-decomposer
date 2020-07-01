var app = {
  cursorPosition: {
    'row': 1,
    'col': 1
  },

  beginCellPosition: {
    'row': 1,
    'col': 1
  },

  endCellPosition: {
    'row': 4,
    'col': 6
  },

  rowMin: 1,
  rowMax: 4,
  colMin: 1,
  colMax: 6,

  cursor: 'cellCurrent-right',

  cmd: '\napp.moveForward(), \napp.turnRight(), \napp.turnLeft(), , \n' + null,

  init: function() {
    console.log('init');

    // TODO
    // afficher le plateau
      // définir la case de départ aléatoire
      app.beginCellPosition.row = Math.floor(Math.random() * (app.rowMax - app.rowMin + 1)) + app.rowMin;
      app.beginCellPosition.col = Math.floor(Math.random() * (app.colMax - app.colMin + 1)) + app.colMin;
      // définir le curseur sur la case de départ
      app.cursorPosition.row = app.beginCellPosition.row;
      app.cursorPosition.col = app.beginCellPosition.col;
      // définir la case de fin aléatoire
      do {
        app.endCellPosition.row = Math.floor(Math.random() * (app.rowMax - app.rowMin + 1)) + app.rowMin;
        app.endCellPosition.col = Math.floor(Math.random() * (app.colMax - app.colMin + 1)) + app.colMin;
      } while (app.endCellPosition.row==app.beginCellPosition.row && app.endCellPosition.col==app.beginCellPosition.col);
      
    app.drawBoard();

    // Event listeners - TODO
    // cibler et écouter le body
    let bodyElement = document.querySelector('body');
    bodyElement.addEventListener('keydown', app.handleButtonKey);

    // cibler et écouter le bouton "Lancer le script"
    let launchButton = document.getElementById('launchScript');
    launchButton.addEventListener('click', app.handleLaunchScriptButton);
  },
  handleButtonKey: function(evt) {
    // console.log(evt);
    if (evt.keyCode == 38) {
      app.moveForward();
    } else if (evt.keyCode == 39) {
      app.turnRight();
    } else if (evt.keyCode == 37) {
      app.turnLeft();
    }
  },
  moveForward: function() {
    if (app.cursor=='cellCurrent-top') {
      //if (app.cursorPosition.row != app.rowMin) {
        app.cursorPosition.row--;
      //}
    } else if (app.cursor=='cellCurrent-right') {
      //if (app.cursorPosition.col != app.colMax) {
        app.cursorPosition.col++;
      //}
    } else if (app.cursor=='cellCurrent-bottom') {
      //if (app.cursorPosition.row != app.rowMax) {
        app.cursorPosition.row++;
      //}
    } else if (app.cursor=='cellCurrent-left') {
      //if (app.cursorPosition.col != app.colMin) {
        app.cursorPosition.col--;
      //}
    }

    app.drawBoard();

    window.setTimeout(function() {
      app.checkManualSuccess();
    }, 10);
  },
  turnRight: function() {
    if (app.cursor=='cellCurrent-top') {
      app.cursor = 'cellCurrent-right';
    } else if (app.cursor=='cellCurrent-right') {
      app.cursor = 'cellCurrent-bottom';
    } else if (app.cursor=='cellCurrent-bottom') {
      app.cursor = 'cellCurrent-left';
    } else if (app.cursor=='cellCurrent-left') {
      app.cursor = 'cellCurrent-top';
    }

    app.drawBoard(app.cursor);
  },
  turnLeft: function() {
    if (app.cursor=='cellCurrent-top') {
      app.cursor = 'cellCurrent-left';
    } else if (app.cursor=='cellCurrent-right') {
      app.cursor = 'cellCurrent-top';
    } else if (app.cursor=='cellCurrent-bottom') {
      app.cursor = 'cellCurrent-right';
    } else if (app.cursor=='cellCurrent-left') {
      app.cursor = 'cellCurrent-bottom';
    };

    app.drawBoard(app.cursor);
  },
  drawBoard: function(cursor) {
    // vider le plateau
    let boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    // afficher le plateau
    for (row=app.rowMin ; row<=app.rowMax ; row++) {
      let boardElement = document.getElementById('board');
      let rowElement = document.createElement('div');
      rowElement.classList.add('cellRow');
      rowElement.setAttribute('id', 'row'+row);
      boardElement.appendChild(rowElement);
      // console.log(boardElement);

      for (col=app.colMin ; col<=app.colMax ; col++) {
        let cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        rowElement.appendChild(cellElement);

        // Définition des cell de départ et de fin
        if (row==app.beginCellPosition.row & col==app.beginCellPosition.col) {
          cellElement.classList.add('cellStart');
        }
        if (row==app.endCellPosition.row & col==app.endCellPosition.col) {
          cellElement.classList.add('cellEnd')
        }

        // placer le curseur
        if (row==app.cursorPosition.row && col==app.cursorPosition.col) {
          cellElement.classList.add('cellCurrent', app.cursor);
        }
      }
    }
  },
  handleLaunchScriptButton: function() {
    // TODO
    let textAreaElement = document.getElementById('userCode');
    let textAreaContent = textAreaElement.value;
    let codeArray = textAreaContent.split(',');
    console.log(codeArray);

    // TODO : get all lines as an array
    let codeLines = [];
    let suppr = null;
    for (i=0 ; i<codeArray.length ; i++) {
      if (codeArray[i] == '\n' || codeArray[i] == '\r') {
        codeArray[i].trim();
      }
    }
    for (i=0 ; i<codeArray.length ; i++) {
      codeLines.push(codeArray[i]);
    }
    console.log(codeLines);

    // Appel, après 2sec, la méthode codeLineLoop() avec la variable et l'index de départ (0)
    window.setTimeout(function() {
      app.codeLineLoop(codeLines, 0);
    }, 2000);
  },
  // codeLineLoop: function(codeLines, index) {
  //   // Getting currentLine
  //   var currentLine = codeLines[index];
  //   console.log(currentLine);
  //   // currentLine.replace(/^\s*[\r\n]/gm, '');
  //   // currentLine.trim();
  //   console.log(currentLine);

  //   // exécuter la cmd du script si elle est bonne
  //   if (app.cmd.includes(currentLine)) {
  //     app.executeScript(currentLine);
  //   } else {
  //     return alert('Vous n\'avez pas entré une bonne commande.');
  //   }

  //   // si on sort du plateau : arrêter le script
  //   if (app.cursorPosition.row<app.rowMin || app.cursorPosition.row>app.rowMax ||
  //     app.cursorPosition.col<app.colMin || app.cursorPosition.col>app.colMax) {
  //     return alert('Vous êtes sorti du plateau.');
  //   }

  //   // Increment
  //   index++;

  //   // if still a line to interpret
  //   if (index < codeLines.length) {
  //     // Recall same method (=> make a loop)
  //     window.setTimeout(function() {
  //       app.codeLineLoop(codeLines, index);
  //     }, 1000);
  //   } else {
  //     window.setTimeout(function() {
  //       app.checkScriptSuccess();
  //     }, 1000);
  //   }
  // },
  checkManualSuccess: function() {
    // TODO display if the game is won or not
    let cellEnd = document.querySelector('.cell.cellEnd');
    console.log(cellEnd);

    if (cellEnd.classList.contains('cellCurrent')) {
      alert('Gagné !');
    }

    if (
      app.cursorPosition.row < app.rowMin ||
      app.cursorPosition.row > app.rowMax ||
      app.cursorPosition.col < app.colMin ||
      app.cursorPosition.col > app.colMax
      ) {
        alert('Perdu !');
      }
  },
  checkScriptSuccess: function() {
    // TODO display if the game is won or not
    let cellEnd = document.querySelector('.cell.cellEnd');
    console.log(cellEnd);

    if (cellEnd.classList.contains('cellCurrent')) {
      alert('Gagné !');
    } 
  },
  executeScript: function(currentLine) {
    return Function('"use strict";return (' + currentLine + ')')();
  },
};

document.addEventListener('DOMContentLoaded', app.init);

/** script 1:
app.moveForward(),
app.moveForward(),
app.moveForward(),
app.moveForward(),
app.moveForward(),
app.turnRight(),
app.moveForward(),
app.moveForward(),
app.moveForward()

script 2 :
app.turnLeft(),
app.moveForward(),
app.turnRight(),
app.turnRight(),
app.moveForward(),
app.turnLeft(),
app.moveForward(),
app.moveForward(),
app.moveForward(),
app.moveForward(),
app.moveForward(),
app.turnRight(),
app.moveForward(),
app.moveForward(),
app.moveForward()
 */