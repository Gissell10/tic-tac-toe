// self invoking anonymous function to prevent global scope pollution
(function () {
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
  let player1 = document.getElementById("player1");
  let player2 = document.getElementById("player2");
  let theWinner = document.getElementById("theWinner");
  let winnerText = document.getElementById("winnerText");
  let restartElement = document.getElementById("restart");
  let resetElement = document.getElementById("reset");
  let currentPlayer = koala;

  board.addEventListener("click", afterClick);
  restartElement.addEventListener("click", restart);
  resetElement.addEventListener("click", restart);

  function afterClick(e) {
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
    boardCellValue[boardPositionClickled] = currentPlayer;
  }

  function endGame(draw) {
    if (draw) {
      winnerText.innerHTML = "Draw!";
    } else {
      winnerText.innerHTML = `${currentPlayer} Wins!`;
      // winplusOne();   // to add one to the winner
    }
    theWinner.classList.add("show");
  }

  // function winplusOne(){
  //     player1.innerText  += 1;
  //     console.log(player1)
  // }

  function isDraw() {
    if (boardCellValue.indexOf(null) === -1) {
      return true;
    }
  }
  function restart() {
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
})();
