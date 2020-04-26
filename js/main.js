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

var gameBoard = (function() {
    var boardArray = [
        [X],
        [O],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];


})();







function Render(Player1, Player2) {



}




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