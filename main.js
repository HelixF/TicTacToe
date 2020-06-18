// Player factory
const createPlayer = (name, mark, markArray) =>{

    const addToArray = (cellId) => markArray.push(cellId);
    const clearArray = () => markArray.length = 0;

    return { name, mark, addToArray, markArray, clearArray };
}

//////////////////////
// Gameboard module //
//////////////////////

const gameBoard = (() => {

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

    return { checkWin };
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

    // Function for displaying active player.
    const activePlayerDisplay = document.getElementById('currentPlayer');
    const nextPlayer = function(playerName) {
        activePlayerDisplay.innerHTML = playerName;
    }

    // Function for displaying winner.
    const winningPlayerDisplay = document.getElementById('winningPlayer');
    const winningPlayer = function(playerName) {
        winningPlayerDisplay.innerHTML = 'The winner is ' + playerName;
        winningPlayerDisplay.style.backgroundColor = 'Red';
    }

    // Reset button.
    const resetGame = document.getElementById('resetGame');
    resetGame.addEventListener('click', () => {
        gameFlowController.resetGame();
        // Reset grid.
        for (let i = 0; i < board.length; i++) {
            board[i].innerHTML = '';
        }
        // Reset current player to default & winning player display
        activePlayerDisplay.innerHTML = 'Player One (X)';
        winningPlayerDisplay.innerHTML = '';
    })
    
    return { board, placeMark, nextPlayer, winningPlayer };

})();

/////////////////////
// Gameflow module //
/////////////////////

const gameFlowController = (() => {

    // Round counter
    let roundCounter = 0;

    // New players. TODO: Create dynamically via DOM inputs.
    const playerOne = createPlayer('Player One (X)', 'X', []);
    const playerTwo = createPlayer('Player Two (O)', 'O', []);

    // Evaluates each game turn. Receives click event from displaycontroller with cell ID.
    const gameTurn = function(i) {

        
        // Adds cellID to players collection. RoundCounter: even to playerOne, odd to playerTwo.
        if ((roundCounter == 0) || (roundCounter % 2 ==  0)) {
            // Checks for empty cell
            if (event.target.innerHTML === '') {
            playerOne.addToArray(i);
            displayController.placeMark(playerOne.mark);
            displayController.nextPlayer(playerTwo.name);
            roundCounter++;
            }
        } else if (roundCounter % 2 != 0) {
            // Checks for empty cell
            if (event.target.innerHTML === '') {
            playerTwo.addToArray(i);
            displayController.placeMark(playerTwo.mark);
            displayController.nextPlayer(playerOne.name);
            roundCounter++;
            }
        }
        

        // Evaluate player array for winning combo
        if (gameBoard.checkWin(playerOne.markArray) === true) {
            displayController.winningPlayer(playerOne.name);
        }
        else if (gameBoard.checkWin(playerTwo.markArray) === true) {
            displayController.winningPlayer(playerTwo.name);
        }
        else if (roundCounter === 9) {
            alert('No winners this round');
        }
        
    }

    // Function for controlling game reset.
    const resetGame = function() {
        roundCounter = 0;
        playerOne.clearArray();
        playerTwo.clearArray();
    }


    return { gameTurn, roundCounter, resetGame }
})();


            


