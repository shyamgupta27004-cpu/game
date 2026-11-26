
let boxes = document.querySelectorAll(".box");

let turn = "X";
let gameOver = false;

let win = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

boxes.forEach(function(box) {

    box.onclick = function() {

        if (box.innerText == "" && gameOver == false) {

            box.innerText = turn;

            checkWinner();

            if (gameOver == false) {

                turn = turn == "X" ? "O" : "X";

                document.getElementById("turn").innerText =
                    turn + "'s Turn";
            }
        }
    };
});

function checkWinner() {

    for (let pattern of win) {

        let a = boxes[pattern[0]].innerText;
        let b = boxes[pattern[1]].innerText;
        let c = boxes[pattern[2]].innerText;

        if (a != "" && a == b && b == c) {

            gameOver = true;

            document.getElementById("turn").innerText =
                turn + " is Winner!";

            // Highlight winning boxes
            pattern.forEach(function(index) {
                boxes[index].classList.add("winner");
            });

            // Confetti animation
            if (typeof confetti === "function") {
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.6 }
                });
            }

            return;
        }
    }

    let draw = true;

    boxes.forEach(function(box) {

        if (box.innerText == "") {
            draw = false;
        }
    });

    if (draw) {

        document.getElementById("turn").innerText =
            "Game Draw!";

        gameOver = true;
    }
}


document.getElementById("restart").onclick = function() {

    boxes.forEach(function(box) {

        box.innerText = "";
        box.classList.remove("winner");

    });

    turn = "X";
    gameOver = false;

    document.getElementById("turn").innerText =
        "X's Turn";
};
