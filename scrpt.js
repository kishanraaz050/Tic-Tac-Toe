console.log("Welcome to Tic Tac Toe");

let music = new Audio("game win.mp3");
let gameover = new Audio("game over.mp3");
let audioTurn = new Audio("turn change.mp3");

let turn = "X";
let isGameOver = false;

// Change Turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
};

// Check Winner
const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext");

    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    wins.forEach(e => {
        if (
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[1]].innerText === boxtext[e[2]].innerText &&
            boxtext[e[0]].innerText !== ""
        ) {
            let winner = boxtext[e[0]].innerText;

            document.querySelector(".info").innerText =
                winner + " WON!";

            if (winner === "X") {
                music.play();
            } else {
                gameover.play();
            }

            isGameOver = true;

            if (winner === "X") {
                music.play();
                document.querySelector(".imgbox img").style.width = "80px";
            } else {
                gameover.play();
                document.querySelector(".imgbox img").style.width = "0px";
            }
        }
    });
};

// AI Helper Function
function findBestMove(player) {
    let boxtexts = document.getElementsByClassName("boxtext");

    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let win of wins) {
        let [a, b, c] = win;

        let values = [
            boxtexts[a].innerText,
            boxtexts[b].innerText,
            boxtexts[c].innerText
        ];

        let countPlayer = values.filter(v => v === player).length;
        let countEmpty = values.filter(v => v === "").length;

        if (countPlayer === 2 && countEmpty === 1) {
            if (boxtexts[a].innerText === "") return a;
            if (boxtexts[b].innerText === "") return b;
            if (boxtexts[c].innerText === "") return c;
        }
    }

    return -1;
}

// Computer Move
function computermove() {
    if (isGameOver) return;

    let boxtexts = document.getElementsByClassName("boxtext");

    let move = findBestMove("O");

    if (move === -1) {
        move = findBestMove("X");
    }

    if (move === -1) {
        let emptyBoxes = [];

        for (let i = 0; i < 9; i++) {
            if (boxtexts[i].innerText === "") {
                emptyBoxes.push(i);
            }
        }

        if (emptyBoxes.length === 0) return;

        move =
            emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    }

    setTimeout(() => {
        boxtexts[move].innerText = "O";

        audioTurn.play();

        checkWin();

        if (!isGameOver) {
            turn = "X";
            document.querySelector(".info").innerText =
                "Turn for X";
        }
    }, 500);
}

// Game Logic
let boxes = document.getElementsByClassName("box");

Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".boxtext");

    element.addEventListener("click", () => {
        if (
            boxtext.innerText === "" &&
            !isGameOver &&
            turn === "X"
        ) {
            boxtext.innerText = "X";

            audioTurn.play();

            checkWin();

            if (!isGameOver) {
                turn = "O";
                document.querySelector(".info").innerText =
                    "Computer Thinking...";

                computermove();
            }
        }
    });
});
let reset = document.getElementById("reset");

reset.addEventListener("click", () => {

    let boxtexts = document.querySelectorAll(".boxtext");

    boxtexts.forEach(element => {
        element.innerText = "";
    });

    turn = "X";
    isGameOver = false;

    document.querySelector(".info").innerText = "Turn for X";

    document.querySelector(".imgbox img").style.width = "0px";
});



