// Ping Pong Game

// Declaration

const canvas = document.getElementById("gameCanvas");

const canvasContext = canvas.getContext("2d");

let playerScore = 0;

let computerScore = 0;

const rectangleWidth = 10;

const rectangleHeight = 100;

const ballSize = 10;

let isGameRunning = false;

// Player Rectangle Object

const playerRectangle = {
    x: 0,

    y: canvas.height / 2 - rectangleHeight / 2,

    width: rectangleWidth,

    height: rectangleHeight,

    dy: 0,

    color: "#e74c3c",
};

// Computer Rectangle Object

const computerRectangle = {
    x: canvas.width - rectangleWidth,

    y: canvas.height / 2 - rectangleHeight / 2,

    width: rectangleWidth,

    height: rectangleHeight,

    dy: 2,

    color: "#e74c3c",
};

// Ball Object

const ball = {
    x: canvas.width / 2,

    y: canvas.height / 2,

    size: ballSize,

    dx: 6,

    dy: -6,

    color: "black",
};

// Function to Draw Rectangle

const drawRectangle = (rectangle) => {
    canvasContext.fillStyle = rectangle.color;

    canvasContext.fillRect(
        rectangle.x,

        rectangle.y,

        rectangle.width,

        rectangle.height
    );

    canvasContext.shadowColor = "rgba(0, 0, 0, 0.5)";

    canvasContext.shadowBlur = 8;

    canvasContext.shadowOffsetX = 2;

    canvasContext.shadowOffsetY = 2;
};

// Function to Draw Ball

const drawBall = () => {
    canvasContext.fillStyle = ball.color;

    canvasContext.fillRect(ball.x, ball.y, ball.size, ball.size);

    canvasContext.shadowColor = "rgba(0, 0, 0, 0.5)";

    canvasContext.shadowBlur = 8;

    canvasContext.shadowOffsetX = 2;

    canvasContext.shadowOffsetY = 2;
};

// Function to move Rectangle

const moveRectangle = (rectangle) => {
    rectangle.y += rectangle.dy;

    if (rectangle.y < 0) {
        rectangle.y = 0;
    }

    if (rectangle.y + rectangle.height > canvas.height) {
        rectangle.y = canvas.height - rectangle.height;
    }
};

// Function to move Computer Rectangle

const moveComputerRectangle = () => {
    if (ball.y < computerRectangle.y + computerRectangle.height / 2) {
        computerRectangle.dy = -2;
    } else {
        computerRectangle.dy = 2;
    }

    moveRectangle(computerRectangle);
};

// Function to move Ball

const moveBall = () => {
    ball.x += ball.dx;

    ball.y += ball.dy;

    if (ball.y < 0 || ball.y + ball.size > canvas.height) {
        ball.dy *= -1;
    }

    if (
        ballCollidesWithRectangle(playerRectangle) ||
        ballCollidesWithRectangle(computerRectangle)
    ) {
        ball.dx *= -1;
    }

    if (ball.x < 0) {
        computerScore++;

        resetBall();
    }

    if (ball.x + ball.size > canvas.width) {
        playerScore++;

        resetBall();
    }
};

// Function for Ball Collides with Rectangle

const ballCollidesWithRectangle = (rectangle) => {
    return (
        ball.x < rectangle.x + rectangle.width &&
        ball.x + ball.size > rectangle.x &&
        ball.y < rectangle.y + rectangle.height &&
        ball.y + ball.size > rectangle.y
    );
};

// Function to Update Score Board

const updateScoreBoard = () => {
    document.getElementById("playerScore").innerText = playerScore;

    document.getElementById("computerScore").innerText = computerScore;
};

// Function for Game Loop

const gameLoop = () => {
    if (!isGameRunning) return;

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    drawRectangle(playerRectangle);

    drawRectangle(computerRectangle);

    drawBall();

    moveRectangle(playerRectangle);

    moveComputerRectangle();

    moveBall();

    updateScoreBoard();

    requestAnimationFrame(gameLoop);
};

// Function for Keyboard control by Player for Play Game

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
        playerRectangle.dy = -4;
    } else if (e.key === "ArrowDown") {
        playerRectangle.dy = 4;
    }
});

document.addEventListener("keyup", () => {
    playerRectangle.dy = 0;
});

// Function to Start Game

document.getElementById("startButton").addEventListener("click", () => {
    if (!isGameRunning) {
        isGameRunning = true;

        gameLoop();
    }
});

// Function to Stop Game

document.getElementById("stopButton").addEventListener("click", () => {
    isGameRunning = false;
});

// Function to Reset Ball

const resetBall = () => {
    ball.x = canvas.width / 2;

    ball.y = canvas.height / 2;

    ball.dx *= -1;

    isBallResetting = true;

    ball.x = canvas.width / 2;

    ball.y = canvas.height / 2;

    ball.dx *= -1;

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    drawRectangle(playerRectangle);

    drawRectangle(computerRectangle);

    drawBall();

    setTimeout(() => {
        isBallResetting = false;
    }, 100);
};

// Function to Reset Game

document.getElementById("resetButton").addEventListener("click", () => {
    playerScore = 0;

    computerScore = 0;

    playerRectangle.y = canvas.height / 2 - rectangleHeight / 2;

    computerRectangle.y = canvas.height / 2 - rectangleHeight / 2;

    resetBall();

    updateScoreBoard();
});

updateScoreBoard();

drawRectangle(playerRectangle);

drawRectangle(computerRectangle);

drawBall();
