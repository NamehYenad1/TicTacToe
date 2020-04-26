const AiMode = document.querySelector('#SinglePlayer');
const MultiPlayer = document.querySelector('#MultiPlayer');

const Buttons = document.querySelector('#TypeButtonWrapper');
const MultiPlayerNameInput = document.querySelector('#textWrapper');

const StartButton = document.querySelector('#StartButton');




function Players(name, symbol) {
    function getName() {
        return name;
    }

    function getSymbol() {
        return symbol;
    }

    return { getName, getSymbol }
}




//module to house gameBoard object and boardarray inside it
var gameBoard = (function() {
    var boardArray = [
        ['X'],
        ['O'],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];
    return {
        boardArray: boardArray
    };

})();



var displayController = (function() {
    //working
    function Render(board) {
        const boxes = document.querySelectorAll('.box');
        var count = 0;
        boxes.forEach((box) => {
            if (board[count][0] == 'X') {

                box.innerHTML = '<span> X</span>';

            } else if (board[count][0] == 'O') {

                box.innerHTML = '<span> O</span>';
            }
            count++;

        });


        count = 0;


    }

    return {
        Render: Render
    };

})();


// //working
// function Render(board) {
//     const boxes = document.querySelectorAll('.box');
//     var count = 0;
//     boxes.forEach((box) => {
//         if (board[count][0] == 'X') {

//             box.innerHTML = '<span> X</span>';

//         } else if (board[count][0] == 'O') {

//             box.innerHTML = '<span> O</span>';
//         }
//         count++;

//     });


//     count = 0;


// }

StartButton.addEventListener('click', function() {
    const FirstPlayer = document.querySelector('#PlayerO');
    const SecondPlayer = document.querySelector('#PlayerX');

    if (FirstPlayer.value == "") {
        FirstPlayer.dataset.playername = "PlayerO";
    } else {
        FirstPlayer.dataset.playername = FirstPlayer.value;
    }

    if (SecondPlayer.value == "") {
        SecondPlayer.dataset.playername = "PlayerX"
    } else {
        SecondPlayer.dataset.playername = SecondPlayer.value;
    }
    const PlayerO = Players(FirstPlayer.dataset.playername, FirstPlayer.dataset.symbol);
    const PlayerX = Players(SecondPlayer.dataset.playername, SecondPlayer.dataset.symbol);

})




MultiPlayer.addEventListener('click', function() {
    Buttons.classList.add('displayNone');
    MultiPlayerNameInput.classList.remove('displayNone');

})







displayController.Render(gameBoard.boardArray);