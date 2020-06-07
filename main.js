// Player factory
const createPlayer = (name, mark, markArray) =>{

    const addToArray = (cellId) => markArray.push(cellId);

    return { name, mark, addToArray, markArray };
}

//////////////////////
// Gameboard module //
//////////////////////

const gameBoard = (() => {

    // Array that represents the 3x3 grid. 
    const boardArray = ['', '', '',
                        '', '', '',
                        '', '', ''];


    return { boardArray, checkWin };
})();

//////////////////////////////
// Displaycontroller module //
//////////////////////////////

const displayController = (() => {

    // Adds event listeners to grid cells.e
    const board = document.getElementsByClassName('gridCell')
    for (let i = 0; i < board.length; i++) {
        board[i].addEventListener('click', (e) => {
            // Sends cell ID to Gameflow modul
            gameFlowController.gameTurn(i)
        })};
    


    return { board };
})();

/////////////////////
// Gameflow module //
/////////////////////

const gameFlowController = (() => {

    // Round counter
    let roundCounter = 0;

    // New players. TODO: Create dynamically via DOM inputs.
    const playerOne = createPlayer('playerOne', 'X', []);
    const playerTwo = createPlayer('playerTwo', 'O', []);

    // Receives click event from displaycontroller with cell ID.
    const gameTurn = function(i) {

        // Adds cellID to players collection. RoundCounter: even to playerOne, odd to playerTwo.
        if ((roundCounter == 0) || (roundCounter % 2 ==  0)) {
            playerOne.addToArray(i);
            console.log(`Collection Player1 ${playerOne.markArray}`)
        } else {
            playerTwo.addToArray(i);
            console.log(`Collection Player2 ${playerTwo.markArray}`) 
        }

        // TODO evaluate player array for winning combo


        // Increments game round.
        roundCounter++;
    }


    // Function for determining which player is active for placing mark.
    const placeMark = function(i) {

        //if turn player1 set target inner html to playerone.mark

        //else set target inner html to playertwo.mark
    }

    return { gameTurn }
})();

