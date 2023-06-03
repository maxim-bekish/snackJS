let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let startSpan = document.getElementById("start");
let counterCheck = document.getElementById("counterCheck");
let yourResult = document.getElementById("result");

let dir;
let box = 32;
let record = [];
let snake = [];
let counter = 0;

const filed = new Image();
filed.src = "./png/field.png";
const foodIMG = new Image();
foodIMG.src = "./png/food.png";

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};
counterCheck.innerHTML = `у тебя ${counter} очков`;
document.addEventListener("keydown", dirSnake);
document.addEventListener("keydown", validityKey);
snake[0] = { x: 9 * box, y: 10 * box };

function dirSnake(event) {
  if (event.code == "Enter") {
    localStorage.setItem("key", "Enter");
    setTimeout(() => {
      let score = 2;
      startSpan.innerHTML = `Игра начнется через ${score}`;
      setInterval(() => {
        score--;
        if (score >= 0) {
          startSpan.innerHTML = `Игра начнется через ${score}`;
        }
        if (score == 0) {
          dir = "left";
          startSpan.innerHTML = "Игра началась";
        }
        if (score < 0) {
          score = -1;
        }
      }, 1000);
    }, 0);
  }
}

function validityKey(event) {
  if (localStorage.getItem("key") == "Enter") {
    if (event.code == "ArrowUp" && dir != "down") {
      dir = "up";
    } else if (event.code == "ArrowDown" && dir != "up") {
      dir = "down";
    } else if (event.code == "ArrowLeft" && dir != "right") {
      dir = "left";
    } else if (event.code == "ArrowRight" && dir != "left") {
      dir = "right";
    }
  }
}

function sneckAteHimself(newHead, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (newHead.x == arr[i].x && newHead.y == arr[i].y) {
      dir = "stop";
      sessionStorage.setItem("lastСounter", counter);

      snake = Array();
      newHead.x = 9 * box;
      newHead.y = 10 * box;
      counter = 0;
      startSpan.innerHTML = "Заново? Нажимай Enter";
      counterCheck.innerHTML = `у тебя ${counter} очков`;
      document.addEventListener("keydown", dirSnake);
    }
  }
}

function drawField() {
  yourResultFunction();
  ctx.drawImage(filed, 0, 0);
  ctx.drawImage(foodIMG, food.x, food.y);
  for (let i = 0; i < snake.length; i++) {
    i == 0 ? (ctx.fillStyle = "green") : (ctx.fillStyle = "red");
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if (snakeX == food.x && snakeY == food.y) {
    counter++;
    counterCheck.innerHTML = `у тебя ${counter} очков`;
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  } else {
    snake.pop();
  }
  if (
    snakeX < box ||
    snakeX > 17 * box ||
    snakeY < box * 3 ||
    snakeY > 17 * box
  ) {
    dir = "stop";
    sessionStorage.setItem("lastСounter", counter);
    snake = Array();
    snakeX = 9 * box;
    snakeY = 10 * box;
    localStorage.removeItem("key");
    counter = 0;
    counterCheck.innerHTML = `у тебя ${counter} очков`;
    document.addEventListener("keydown", dirSnake);
    startSpan.innerHTML = "Заново? Нажимай Enter";
  }
  if (dir == "left") snakeX -= box;
  if (dir == "right") snakeX += box;
  if (dir == "up") snakeY -= box;
  if (dir == "down") snakeY += box;
  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  sneckAteHimself(newHead, snake);

  snake.unshift(newHead);
}

function yourResultFunction() {
  yourResult.innerHTML = `твой последний результат ${sessionStorage.getItem(
    "lastСounter"
  )} очков`;
}

let game = setInterval(drawField, 200);
