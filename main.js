const kangaroo = "kangaroo";
const koala = "koala";
let boardCellValue = [null, null, null, null, null, null, null, null, null];
const winPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let boxElements = document.querySelectorAll(".box");
let board = document.getElementById("game");
let theWinner = document.getElementById("theWinner");
let winnerText = document.getElementById("winnerText");
let restartElement = document.getElementById("restart");
let resetElement = document.getElementById("reset");
let currentPlayer = koala;

board.addEventListener("click", afterClick);
restartElement.addEventListener("click", restart);
resetElement.addEventListener("click", restart);

function afterClick(e) {
  // main function that execute the game
  if (!e.target.classList.contains("box")) {
    return; //is valid it the element that target is the box
  }
  let boardPositionClickled = [...board.children].indexOf(e.target); // return a position on the array
  placeplayerBoard(currentPlayer, boardPositionClickled);
  drawing();
  if (didSomeoneWin()) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function placeplayerBoard(currentPlayer, boardPositionClickled) {
  // reasained the current player in the board array
  boardCellValue[boardPositionClickled] = currentPlayer;
}

function endGame(draw) {
  if (draw) {
    winnerText.innerHTML = "Draw!";
  } else {
    winnerText.innerHTML = `${currentPlayer} Wins!`;
  }
  theWinner.classList.add("show");
}

function isDraw() {
  // is draw it there is not null position on the board
  if (boardCellValue.indexOf(null) === -1) {
    return true;
  }
}
function restart() {
  // cleand all the class in the DOM, and apply a new one call 'show'
  //that it is fixed over the screem
  restartData();
  for (let i = 0; i < boardCellValue.length; i++) {
    let element = boxElements.item(i);
    element.classList.remove(kangaroo);
    element.classList.remove(koala);
  }
  theWinner.classList.remove("show");
}
function restartData() {
  boardCellValue = [null, null, null, null, null, null, null, null, null];
  currentPlayer = koala;
}

function swapTurns() {
  currentPlayer = currentPlayer === koala ? kangaroo : koala;
}

function drawing() {
  //putting the values of the board in the DOM
  for (let i = 0; i < boardCellValue.length; i++) {
    let element = boxElements.item(i);
    if (boardCellValue[i] === kangaroo) {
      element.classList.add(kangaroo);
    } else if (boardCellValue[i] === koala) {
      element.classList.add(koala);
    } else {
      ("this should not happend");
    }
  }
}

function didSomeoneWin() {
  //compare each one of the index in the array with the winnerposition on the board
  let someoneWon = false;
  winPosition.forEach((positions) => {
    let [index1, index2, index3] = positions;

    if (
      boardCellValue[index1] === boardCellValue[index2] &&
      boardCellValue[index2] === boardCellValue[index3] &&
      boardCellValue[index3] !== null
    ) {
      someoneWon = true;
    }
  });

  return someoneWon;
}
function easteregg() {
  //sorprice function
  board.classList.add("gosh");
}
