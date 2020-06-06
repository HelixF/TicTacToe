// Player factory
const createPlayer = (name, mark, cellIdArray) =>{
    
    markArray = [];
    const addToArray = (cellIdArray) => markArray.push(cellIdArray);

    return { name, mark, cellIdArray, addToArray, markArray };
}

//////////////////////
// Gameboard module //
//////////////////////

const gameBoard = (() => {

    // Array that represents the 3x3 grid. 
    const boardArray = ['', '', '',
                        '', '', '',
                        '', '', ''];

    return { boardArray };
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

    // New players
    const playerOne = createPlayer('playerOne', 'X');

    // Receives click event from displaycontroller with cell ID.
    const gameTurn = function(i) {

        // Increments game round.
        roundCounter++;

        // Adds game board spot to players collection
        playerOne.addToArray(i)
        console.log(`Collection ${playerOne.markArray}`)

        // TODO evaluate player array for winning combo
    }

    return { gameTurn }
})();




 
