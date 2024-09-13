

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
            return true;
        }
        else {
            return false;
        }
    }

    return {board, play, display, checkWin};
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
        name: "Player",
        token : "x" }, {
        name: "Computer",
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

        if (gameBoard.checkWin()){
            let winner = getActivePlayer();
            console.log((`${winner.name} won!`));
            return;
        }

        switchPlayer();
        printNewRound();
    }
    printNewRound();

    return {playRound};
};

const game = gameController();
game.playRound(1,2)
game.playRound(2,0)
game.playRound(2,2)
game.playRound(0,0)
game.playRound(0,2)
game.playRound(1,0)
