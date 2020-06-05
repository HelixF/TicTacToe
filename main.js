// Gameboard module
const gameBoard = (() => {

    // Array that represents the 3x3 grid. 
    const boardArray = ['', '', '',
                        '', '', '',
                        '', '', ''];

    return { boardArray };
})();


// Displaycontroller module
const displayController = (() => {

    // Adds event listeners to grid cells.
    const board = document.getElementsByClassName('gridCell')
    for (let i = 0; i < board.length; i++) {
        board[i].addEventListener('click', ); //TODO link to Function that puts X or O 
    }

})();


// Player factory
const createPlayer = (name, mark) =>{

    return { name, mark };
}

