let scoreBlock;
let score = 0;
let input = document.getElementById("setting_run");
let canvas = document.querySelector("#game-canvas");
let context = canvas.getContext("2d");
scoreBlock = document.querySelector(".game-score .score-count");
let start_game = document.querySelector(".start_game");
let name_input = document.getElementById("name_input");
let dir;
let x = 3;
let config = {
  step: 0,
  maxStep: input.value,
  sizeCell: 60,
  sizeBarry: 60,
};
let snake = {
  x: 240,
  y: 300,
  dx: config.sizeCell,
  dy: 0,
  tails: [],
  maxTails: 1,
};
let berry = {
  x: 0,
  y: 0,
};

drawScore();
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById(
    "last_name"
  ).innerHTML = `Name: ${localStorage.getItem("name")}`;
  document.getElementById(
    "last_counter"
  ).innerHTML = `Last record: ${localStorage.getItem("score")}`;
});
function gameLoop() {
  xxx = requestAnimationFrame(gameLoop);

  if (++config.step < config.maxStep) {
    return;
  }
  config.step = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBerry();
  drawSnake();
  document.getElementById(
    "last_name"
  ).innerHTML = `Name: ${localStorage.getItem("name")}`;
  document.getElementById(
    "last_counter"
  ).innerHTML = `Last record: ${localStorage.getItem("score")}`;
}

start_game.addEventListener("click", run);
name_input.addEventListener("keyup", () =>
  name_input.value.split("").length > 1
    ? (document.querySelector(".start_game").disabled = false)
    : (document.querySelector(".start_game").disabled = true)
);

function noDigits(event) {
  if ("1234567890".indexOf(event.key) != -1) event.preventDefault();
}

function run() {
  document.getElementById("setting_run").disabled = true;
  document.querySelector(".start_game").disabled = true;
  document.getElementById("name_input_wrapper").style.display = "none";
  let xxx = setInterval(() => {
    document.getElementById("revers_time").style.display = "block";
    document.getElementById(
      "revers_time"
    ).innerHTML = `Игра начнется <br> через  ${x--}`;
    if (x < 0) {
      document.getElementById("revers_time").style.display = "none";
      clearInterval(xxx);
    }
  }, 1000);

  setTimeout(gameLoop, 4000);
}
function drawSnake() {
  config.maxStep = input.value;
  snake.x += snake.dx;
  snake.y += snake.dy;
  deathSnake();
  console.log(snake.tails);

  snake.tails.unshift({ x: snake.x, y: snake.y });

  if (snake.tails.length > snake.maxTails) {
    snake.tails.pop();
  }
  snake.tails.forEach(function (el, index) {
    if (index == 0) {
      context.fillStyle = "#e26fca";
    } else {
      context.fillStyle = "white";
    }
    context.fillRect(el.x, el.y, config.sizeCell, config.sizeCell);
    if (el.x === berry.x && el.y === berry.y) {
      snake.maxTails++;
      incScore();
      randomPositionBerry();
    }
  });
}

function deathSnake() {
  for (let i = 0; i < snake.tails.length; i++) {
    if (
      (snake.x == snake.tails[i].x && snake.y == snake.tails[i].y) ||
      snake.x < 0 ||
      snake.x >= canvas.width ||
      snake.y < 0 ||
      snake.y >= canvas.height
    ) {
      snake.x = 300;
      snake.y = 300;
      snake.tails = [];
      cancelAnimationFrame(xxx);
      refreshGame();
      document.getElementById("setting_run").disabled = false;
      document.querySelector(".start_game").disabled = false;
    }
  }
}

function refreshGame() {
  x = 3;
  start_game.addEventListener("click", run);

  localStorage.setItem("name", name_input.value);
  localStorage.setItem("score", score);
  dir = "";
  score = 0;
  drawScore();

  snake.maxTails = 1;
  snake.dx = config.sizeCell;
  snake.dy = 0;
}

function drawBerry() {
  context.beginPath();
  context.fillStyle = "#9b3489";

  context.arc(
    berry.x + config.sizeCell / 2,
    berry.y + config.sizeCell / 2,
    config.sizeBarry / 2,
    0,
    2 * Math.PI
  );
  context.fill();
}
function randomPositionBerry() {
  berry.x = getRandomInt(canvas.width / config.sizeCell) * config.sizeCell;
  berry.y = getRandomInt(canvas.height / config.sizeCell) * config.sizeCell;
}
function incScore() {
  score++;
  drawScore();
}
function drawScore() {
  scoreBlock.innerHTML = score;
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

document.addEventListener("keydown", function (e) {
  if (e.code == "ArrowUp" && dir !== "down") {
    snake.dy = -config.sizeCell;
    snake.dx = 0;
    dir = "up";
  }
  if (e.code == "ArrowDown" && dir !== "up") {
    snake.dy = config.sizeCell;
    snake.dx = 0;
    dir = "down";
  }
  if (e.code == "ArrowLeft" && dir !== "right") {
    snake.dx = -config.sizeCell;
    snake.dy = 0;
    dir = "left";
  }
  if (e.code == "ArrowRight" && dir !== "left") {
    snake.dx = config.sizeCell;
    snake.dy = 0;
    dir = "right";
  }
});
