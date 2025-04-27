let gameseq = [];
let userseq = [];

let btns = ["red", "yellow", "green", "purple"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelup();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameseq.push(randColor);

    gameFlash(randbtn);
}

function checkAns(currentIdx) {
    if (userseq[currentIdx] === gameseq[currentIdx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your Score is <b>${level}</b>. <br> Press any key to restart`;
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "white";
        }, 200);
        resetGame();
    }
}

function btnPress() {
    let btn = this;
    userflash(btn);
    let userColor = btn.getAttribute("id");
    userseq.push(userColor);
    checkAns(userseq.length - 1);
}

function resetGame() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnPress);
}
