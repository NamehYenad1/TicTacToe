const AiMode = document.querySelector('#SinglePlayer');
const MultiPlayer = document.querySelector('#MultiPlayer');

const Buttons = document.querySelector('#TypeButtonWrapper');
const MultiPlayerNameInput = document.querySelector('#textWrapper');

const StartButton = document.querySelector('#StartButton');
const Type = '';
const warning = document.querySelector('#warning');
const gameBoardDisplay = document.querySelector('#gameBoard');
const player1Score = document.querySelector('#Player1Score');
const player2Score = document.querySelector('#Player2Score');
const Result = document.querySelector('#ResultWrapper');
const Mode = document.querySelector('#Mode');

const WinnerScreen = document.querySelector('#WinnerTable');
const WinnerText = document.querySelector('#Winner');
const HomeButton = document.querySelector('#HomeIcon');
const RePlay = document.querySelector('#ReplayIcon');
let name1;
let name2;
//factory function to create players object
function Players(name, symbol) {

    var score = 0;

    function addScore() {
        score = score + 1;
    }

    function getScore() {
        return score;
    }

    function getName() {
        return name;
    }

    function getSymbol() {
        return symbol;
    }

    return { getName, getSymbol, addScore, getScore }
}


//module to house gameBoard object and boardarray inside it
var gameBoard = (function() {
    var boardArray = [
        [''],
        [''],
        [''],
        [''],
        [''],
        [''],
        [''],
        [''],
        ['']
    ];
    return {
        boardArray: boardArray
    };

})();

//factory function for game flow
function Game(gameType, PlayerObj1, PlayerObj2) {



    //set default turn to player O 
    var Turn = 'O';
    //create a winner var
    var winner;


    function Start() {
        //check the gameType
        if (gameType == 'Multi') {
            //add on click event for all the squares
            const boxes = document.querySelectorAll('.box');
            boxes.forEach((box) => {
                box.addEventListener('click', (e) => {
                    //for everyclick run this function below. we pass in the boxID which is a numeral that is identical to the board array 
                    AddSpot(box.id);

                })

            });





        } else {


        }
    }

    //This function does everything, from adding the spot to running the checkWinner and change turns functions
    function AddSpot(Spot) {

        //check if the spot is taken, if it is run a error
        if (gameBoard.boardArray[Spot][0] != '') {
            console.log('Warning, spot taken');
            warning.classList.remove('displayNone');



        }
        //if it isnt i continue on
        else {
            warning.classList.add('displayNone');
            //i add in the symbol(turn) of the current player into the gameboard array before i render it again
            gameBoard.boardArray[Spot][0] = Turn;
            displayController.Render(gameBoard.boardArray);
            //Check for the winner
            winner = checkWinner(Turn);

            //if the winner returns true, i log the spot and also the winner symbol, Over here we need to create a winner screen
            if (winner == true) {
                console.log(Spot);
                console.log(PlayerObj1.getSymbol());
                if (Turn == PlayerObj1.getSymbol()) {
                    CheckTurn();
                    console.log('Winner is ' + PlayerObj1.getName());
                    PlayerObj1.addScore();
                    displayController.RenderScore(PlayerObj1, PlayerObj2);
                    displayController.RenderWinnerScreen('Player1', PlayerObj1, PlayerObj2);


                } else if (Turn == PlayerObj2.getSymbol()) {
                    CheckTurn();
                    console.log('Winner is ' + PlayerObj2.getName());
                    PlayerObj2.addScore();
                    displayController.RenderScore(PlayerObj1, PlayerObj2);
                    displayController.RenderWinnerScreen('Player2', PlayerObj1, PlayerObj2);
                }

            }

            //For Draw
            else {
                console.log('winner false')
                CheckTurn();
                checkDraw(false, PlayerObj1, PlayerObj2);
            }

        }


    }

    //This function checks the turn and rotates the turn
    function CheckTurn() {
        if (Turn == 'O') {
            Turn = 'X';
        } else if (Turn == 'X') {
            Turn = 'O';
        }
    }


    //this function check for the winner and returns true/false
    function checkWinner(PlayerSpot) {
        var winningCombo = PlayerSpot + PlayerSpot + PlayerSpot;
        if (gameBoard.boardArray[0][0] + gameBoard.boardArray[1][0] + gameBoard.boardArray[2][0] == winningCombo || gameBoard.boardArray[3][0] + gameBoard.boardArray[4][0] + gameBoard.boardArray[5][0] == winningCombo || gameBoard.boardArray[6][0] + gameBoard.boardArray[7][0] + gameBoard.boardArray[8][0] == winningCombo || gameBoard.boardArray[0][0] + gameBoard.boardArray[3][0] + gameBoard.boardArray[6][0] == winningCombo || gameBoard.boardArray[1][0] + gameBoard.boardArray[4][0] + gameBoard.boardArray[7][0] == winningCombo || gameBoard.boardArray[2][0] + gameBoard.boardArray[5][0] + gameBoard.boardArray[8][0] == winningCombo || gameBoard.boardArray[0][0] + gameBoard.boardArray[4][0] + gameBoard.boardArray[8][0] == winningCombo || gameBoard.boardArray[2][0] + gameBoard.boardArray[4][0] + gameBoard.boardArray[6][0] == winningCombo) {
            return true;

        } else {
            return false;
        }



    }

    function checkDraw(Win) {
        if (Win == false) {
            let count = 0;

            for (let i = 0; i < gameBoard.boardArray.length; i++) {
                if (gameBoard.boardArray[i][0] != "") {
                    count = count + 1;
                }
            }

            if (count == 9) {
                displayController.RenderScore(PlayerObj1, PlayerObj2);
                displayController.RenderWinnerScreen('Draw', PlayerObj1, PlayerObj2);
            }


        } else {

        }

    }



    return { Start }


}

//This controller is to render the gameBoard
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
            } else if (board[count][0] == "") {
                box.innerHTML = '';
            }
            count++;

        });


        count = 0;


    }

    function RenderScore(PlayerObj1, PlayerObj2) {
        player1Score.innerHTML = ' <div class="TotalScoreDiv"> <span id="Player1ScoreSpan" class="PlayerScoreSpan"> ' + PlayerObj1.getName() + '</span><span class ="NumericScore">' + PlayerObj1.getScore() + '</span></div>'
        player2Score.innerHTML = ' <div class="TotalScoreDiv"> <span id="Player1ScoreSpan" class="PlayerScoreSpan"> ' + PlayerObj2.getName() + '</span><span class ="NumericScore">' + PlayerObj2.getScore() + '</span></div>'
    }

    function RenderWinnerScreen(Winner, PlayerObj1, PlayerObj2) {

        name1 = PlayerObj1.getName();
        name2 = PlayerObj2.getName();

        if (Winner == 'Draw') {

            WinnerText.textContent = 'Draw!';
        } else if (Winner == 'Player1') {

            WinnerText.innerHTML = '<div> ' + name1 + ' is the winner!';

        } else if (Winner == 'Player2') {
            WinnerText.innerHTML = '<div> ' + name2 + ' is the winner!';
        }

        gameBoardDisplay.classList.add('displayNone');
        WinnerScreen.classList.remove('displayNone');
    }

    function ReRunGameBoard() {


        for (let i = 0; i < gameBoard.boardArray.length; i++) {
            gameBoard.boardArray[i][0] = ""
        }
        Render(gameBoard.boardArray);

        WinnerScreen.classList.add('displayNone');
        gameBoardDisplay.classList.remove('displayNone');
    }

    return {
        Render,
        RenderWinnerScreen,
        RenderScore,
        ReRunGameBoard
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



//This is the start button after the user inputs their name
StartButton.addEventListener('click', function() {
    //we select the textbox and assign the datasets, names and values first
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
    //From here i create two player objects
    const PlayerObj1 = Players(FirstPlayer.dataset.playername, FirstPlayer.dataset.symbol);
    const PlayerObj2 = Players(SecondPlayer.dataset.playername, SecondPlayer.dataset.symbol);
    //i display the gameboard and hide the previous screen
    gameBoardDisplay.classList.remove('displayNone');
    MultiPlayerNameInput.classList.add('displayNone');
    //i create a game object with the game mode type and both the player objects
    Mode.classList.add('displayNone');
    Result.classList.remove('displayNone');

    displayController.RenderScore(PlayerObj1, PlayerObj2);



    game1 = Game('Multi', PlayerObj1, PlayerObj2);

    //i run the start function
    game1.Start();

})





MultiPlayer.addEventListener('click', function() {
    Buttons.classList.add('displayNone');
    MultiPlayerNameInput.classList.remove('displayNone');

})


RePlay.addEventListener('click', function() {
    displayController.ReRunGameBoard();
})



displayController.Render(gameBoard.boardArray);

//do up home button and minimax algo 

HomeButton.addEventListener('click', function() {

    document.location.reload();





})