

function Board() {
    board = []
    for (let i = 0; i < 3; i++){
        let row = []
        for (let j = 0; j < 3; j++){
            newCell = Cell();
            row.push(newCell);
        }
        board.push(row);
    }

    function play(row,col,player){
        board[row][col].addPlayer(player);
    }

    function display() {
        displayBoard = "";
        for (let i = 0; i < 3; i++){
            displayBoard += "|"
            for (let j = 0; j < 3; j++){
                displayBoard+= board[i][j].getPlayer();
                displayBoard+="|";
            }
            displayBoard += "\n"
        }
        console.log(displayBoard);
    }

    const checkWin = () => {
        if ((board[0][0].getPlayer() === board[0][1].getPlayer() && board[0][2].getPlayer() === board[0][1].getPlayer() && board[0][0].getPlayer() !== " ")||
        (board[1][0].getPlayer() === board[1][1].getPlayer() && board[1][2].getPlayer() === board[1][1].getPlayer() && board[1][1].getPlayer() !== " ") || 
        (board[2][0].getPlayer() === board[2][1].getPlayer() && board[2][2].getPlayer() === board[2][1].getPlayer() && board[2][0].getPlayer() !== " ") ||
        (board[0][0].getPlayer() === board[1][1].getPlayer() && board[2][2].getPlayer() === board[1][1].getPlayer() && board[1][1].getPlayer() !== " ") ||
        (board[2][0].getPlayer() === board[1][1].getPlayer() && board[0][2].getPlayer() === board[1][1].getPlayer() && board[1][1].getPlayer() !== " ") ||
        (board[0][0].getPlayer() === board[1][0].getPlayer() && board[1][0].getPlayer() === board[2][0].getPlayer() && board[0][0].getPlayer() !== " ") ||
        (board[0][1].getPlayer() === board[1][1].getPlayer() && board[1][1].getPlayer() === board[2][1].getPlayer() && board[1][1].getPlayer() !== " ") ||
        (board[0][2].getPlayer() === board[1][2].getPlayer() && board[1][2].getPlayer() === board[2][2].getPlayer() && board[0][2].getPlayer() !== " ")) {
            return "win";
        }

        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++){
                if (board[i][j].getPlayer() == " ") {
                    return "not yet"
                }
            }
        }
        return "tie";
    }

    const getBoard = () => board;

    return {play, display, checkWin, getBoard};
};

function Cell() {
    var currentPlayer = " ";

    const getPlayer = () => currentPlayer; // return current player occupied the cell
    const addPlayer = function(a) {
        currentPlayer = a;
    }
    return {currentPlayer, getPlayer, addPlayer};
};

function gameController() {
    const players = [{
        name: "Player 1",
        token : "x" }, {
        name: "Player 2",
        token : "o"}]

    const gameBoard = Board();
    
    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;

    const switchPlayer = () => {
        activePlayer = activePlayer === players[1] ? players[0] : players[1];
    }

    const printNewRound = () => {
        console.log(`${getActivePlayer().name}'s turn`);
    }

    const playRound = (row, col) => {
        gameBoard.play(row, col, getActivePlayer().token);
        gameBoard.display();

        if (gameBoard.checkWin() == "win"){
            let winner = getActivePlayer();
            alert((`${winner.name} won!`));
            return;
        }
        else if (gameBoard.checkWin() == "tie"){
            alert(("It's a tie!"));
            return;
        }

        switchPlayer();
        printNewRound();
    }
    printNewRound();

    return {playRound, getActivePlayer, getBoard: gameBoard.getBoard};
};

function ScreenController() {
    const game = gameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
  
    const updateScreen = () => {
      // clear the board
      boardDiv.textContent = "";
  
      // get the newest version of the board and player turn
      const board = game.getBoard();
      const activePlayer = game.getActivePlayer();
  
      // Display player's turn
      playerTurnDiv.textContent = `${activePlayer.name}'s turn...`
  
      board.forEach((row, rowNum) => {
        row.forEach((cell, colNum) => {
          const cellButton = document.createElement("button");
          cellButton.classList.add("cell");
          cellButton.dataset.column = colNum;
          cellButton.dataset.row = rowNum;
          cellButton.textContent = cell.getPlayer();
          boardDiv.appendChild(cellButton);
        })
      })
    }
  
    // Add event listener for the board
    function clickHandlerBoard(e) {
      const selectedColumn = e.target.dataset.column;
      const selectedRow = e.target.dataset.row;
      if (!selectedColumn) return;
      
      game.playRound(selectedRow, selectedColumn);
        
      updateScreen();
      
    }
    boardDiv.addEventListener("click", clickHandlerBoard);
  
    updateScreen();
  
  }

const game = ScreenController();