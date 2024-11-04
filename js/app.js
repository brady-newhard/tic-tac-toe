/*-------------------------------- Constants --------------------------------*/

//5) Define the required constants.

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
    [0, 4, 8,], [2, 4, 6] //Diagonals
]

/*---------------------------- Variables (state) ----------------------------*/

//1) Define the required variables used to track the state of the game.

let board;
let turn;
let winner;
let tie;
let squareIndex;
let reset;

/*------------------------ Cached Element References ------------------------*/

//2) Store cached element references.

const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.getElementById("message");
const boardContainer = document.querySelector(".board");
const resetBtnEl = document.querySelector("button");

//const resetBtnEl = document.createElement("button");
// resetBtnEl.id = "reset";
// resetBtnEl.textContent = "Reset Game";

// document.body.appendChild(resetBtnEl)
// console.log(messageEl)

/*-------------------------------- Functions --------------------------------*/

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.
//4) The state of the game should be rendered to the user.
//7) Create Reset functionality.

function init() {
    board = Array(9).fill("")
    turn = "X" //current player
    winner = false;
    tie = false;
    squareEls.forEach(sqr => sqr.textContent = "");
    // console.log("Initialized!");
    render();
};
init();

function render() {
    updateBoard();
    updateMessage();
};

function updateBoard() {
    board.forEach((mark, index) => {
        const square = squareEls[index];
        square.textContent = mark;
        // console.log(square)
    })
}

function updateMessage() {
    if (winner === false && tie === false) {
        messageEl.textContent = `Current Turn: ${turn}`
    } else if (winner === false && tie === true) {
        messageEl.textContent = "Cats Game!";
    } else {
        messageEl.textContent = `Congrats! ${winner} wins`;
    }
}    

function handleClick(event) {
    squareIndex = (parseInt(event.target.id))
    // console.log(board[squareIndex])
    if (board[squareIndex] || winner) return;
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

function placePiece(index) {
    board[index] = turn;
    // console.log(board[index]);
}

function checkForWinner() {
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            winner = turn;
            // winner = true;
            // console.log(`Winner: ${winner}`)
            return;
        }
    }
}

function checkForTie() {
    if (winner === true) return;
    tie = board.every(square => square !== "");
    //console.log(`Tie: ${tie}`)
}

// function switchPlayerTurn() {
//     if (winner === true) return;
//     if (turn === "X") {
//         turn = "O";
//     } else {
//         turn = "X";
//     }
// }

function switchPlayerTurn() {
    if (winner === true) return;
    // turnery operator
    turn = turn === "X" ? "O" : "X"
    // variable = if the condition is true ? pass this value : else this one
    // console.log(`turn: ${turn}`)
}
/*----------------------------- Event Listeners -----------------------------*/

//6) Handle a player clicking a square with a `handleClick` function.

squareEls.forEach(square => {
    square.addEventListener('click', handleClick)
})

resetBtnEl.addEventListener('click', init)




// boardContainer.addEventListener("click", handleClick)

// squareEls.forEach((square => square.addEventListener('click'), handleClick));

    // if (winner === true && tie === false) {
    //     messageEl.textContent = `Congrats! ${winner} wins`;
    // } else if (winner === false && tie === true) {
    //     messageEl.textContent = "Cats Game!";
    // } else if (winner === false && tie === false) {
    //     messageEl.textContent = `Current Turn: ${turn}`
    // }











