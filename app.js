const startButton = document.querySelector("#startButton");
const screens = document.querySelectorAll(".screen");
const timesButtonsList = document.querySelector("#timesButtonsList");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const colors = ["red", "green", "yellow", "blue", "white", "orange"]
let time = 0;
let score = 0;
startButton.addEventListener("click", startNewGame);
timesButtonsList.addEventListener('click', selectTime);
board.addEventListener("click", e => {
    if (e.target.classList.contains("circle")) {
        score++;
        e.target.remove();
        createRandomCircle();

    }
})

function startNewGame(e) {
    e.preventDefault();
    screens[0].classList.add("up");
}

function selectTime(e) {
    if (e.target.classList.contains("time-btn")) {
        time = parseInt(e.target.getAttribute("data-time"));
        startGame()
    }
}

function startGame() {
    screens[1].classList.add("up");
    setInterval(decreaseTime, 1000);
    setTime(time);
    createRandomCircle();

}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let currentTime = --time;
        if (currentTime < 10) {
            currentTime = `0${currentTime}`;
        }
        setTime(currentTime);
    }
}

function finishGame() {
    timeEl.parentNode.classList.add("hide");
    board.innerHTML = `<h1>Ваш счет: <span class="primary">${score}</span></h1>`;
}

function setTime(time) {
    timeEl.innerHTML = `00:${time}`;
}

function createRandomCircle() {

    let circle = document.createElement("div");
    circle.classList.add("circle");
    const {
        width,
        height
    } = board.getBoundingClientRect();
    const size = getRandomNumber(10, 60);
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = getRandomColor();
    board.append(circle);

}

function getRandomNumber(min, max) {
    return (Math.round(Math.random() * (max - min) + min));
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}