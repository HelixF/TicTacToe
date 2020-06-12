// Player factory
const createPlayer = (name, mark, markArray) =>{

    const addToArray = (cellId) => markArray.push(cellId);

    return { name, mark, addToArray, markArray };
}

//////////////////////
// Gameboard module //
//////////////////////

const gameBoard = (() => {

    // ???Array that represents the 3x3 grid.??? NEEDED?
    const boardArray = ['', '', '',
                        '', '', '',
                        '', '', ''];

    // Winning combos
    const winningCombo = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ]

    // Function that checks for winning combos and returns true when matching.
    const checkWin = function (markArray) {
        let evalResult = false;

        // Loops thorugh winning array combo to compare it to player array
        for (let i = 0; i < winningCombo.length; i++) {

            // Checks if first, second and third value of winning combo is in players array.
            const checkFirst = markArray.includes(winningCombo[i][0]);
            const checkSecond = markArray.includes(winningCombo[i][1]);
            const checkThird = markArray.includes(winningCombo[i][2]); 

            // If player array contains a winning combo set evalResult to true.
            if (checkFirst === true && checkSecond === true && checkThird === true) {
                evalResult = true;
            }
        }
        // Return true if match is found. 
        return evalResult;
        
    }

    return { boardArray, checkWin };
})();

//////////////////////////////
// Displaycontroller module //
//////////////////////////////

const displayController = (() => {

    // Adds event listeners to grid cells.
    const board = document.getElementsByClassName('gridCell')
    for (let i = 0; i < board.length; i++) {
        board[i].addEventListener('click', (e) => {
            // Sends cell ID to Gameflow modul on click
            gameFlowController.gameTurn(i)
        })};

    // Function for placing a players mark.
    const placeMark = function(playerMark) {
        if (event.target.innerHTML === '') {
            event.target.innerHTML = playerMark;
        } 
    }    
    
    return { board, placeMark };

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

    // Evaluates each game turn. Receives click event from displaycontroller with cell ID.
    const gameTurn = function(i) {

        // Adds cellID to players collection. RoundCounter: even to playerOne, odd to playerTwo.
        if ((roundCounter == 0) || (roundCounter % 2 ==  0)) {
            // Checks for empty cell
            if (event.target.innerHTML === '') {
            playerOne.addToArray(i);
            displayController.placeMark(playerOne.mark);
            roundCounter++;
            }
        } else if (roundCounter % 2 != 0) {
            // Checks for empty cell
            if (event.target.innerHTML === '') {
            playerTwo.addToArray(i);
            displayController.placeMark(playerTwo.mark)
            roundCounter++;
            }
        }

        // Evaluate player array for winning combo
        if (gameBoard.checkWin(playerOne.markArray) === true) {
            alert('wohoo Player ONE'); //PLACEHOLDER
        }
        else if (gameBoard.checkWin(playerTwo.markArray) === true) {
            alert('wohoo Player TWO'); //PLACEHOLDER
        }
        
    }

    return { gameTurn }
})();


            


