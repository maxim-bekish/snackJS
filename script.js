let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let startSpan = document.getElementById("start");
let counterCheck = document.getElementById("counterCheck");
let yourResult = document.getElementById("result");
let names = document.getElementById("name");
// import {validName} from './valid.js';
import {bigNumRecord,  yourResultFunction,} from "./function.js";

// document.getElementById("button").addEventListener("click", validName);

let dir;
let box = 32;
let snake = [];
let counter = 0;
let record = [];
const filed = new Image();
filed.src = "./png/field.png";
const foodIMG = new Image();
foodIMG.src = "./png/food.png";

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

startSpan.addEventListener("click", dirSnake);

snake[0] = { x: 9 * box, y: 10 * box };

function dirSnake() {

  setTimeout(() => {
    let score = 2;
    startSpan.style.display = "block";
    startSpan.innerHTML = `Игра начнется через ${score}`;

    setInterval(() => {
      score--;
      console.log(score);
      if (score >= 0) {
        startSpan.style.display = "block";
        startSpan.innerHTML = `Игра начнется через ${score}`;
      }
      if (score == 0) {
        sessionStorage.setItem("arrowStop", "yes");
        document.addEventListener("keydown", validityKey);
        dir = "left";
        startSpan.style.display = "none";
      }
      if (score < 0) {
        score = -1;
      }
    }, 1000);
  }, 0);
}

function validityKey(event) {
  if (sessionStorage.getItem("arrowStop") == "yes") {
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
      gameOverStart(newHead);
    }
  }
}

function gameOverStart(newHead) {
  dir = "stop";
  sessionStorage.setItem("lastСounter", counter);
  sessionStorage.setItem("arrowStop", "no");
  if (localStorage.getItem("reci")) {
    record = JSON.parse(localStorage.getItem("reci"));
    sessionStorage.setItem("arrowStop", "no");
    record.push({
      name: names.value,
      rec: counter,
    });
    let x = JSON.stringify(record);
    localStorage.setItem("reci", x);
  } else {
    record.push({
      name: names.value,
      rec: counter,
    });
    let x = JSON.stringify(record);
    localStorage.setItem("reci", x);
  }
  localStorage.removeItem("key");
  snake = Array();
  newHead.x = 9 * box;
  newHead.y = 10 * box;
  counter = 0;
  startSpan.style.display = "block";
  startSpan.innerHTML = "Заново? Нажимай меня";
  counterCheck.innerHTML = `у тебя ${counter} очков`;
  startSpan.addEventListener("click", dirSnake);
  // ++++++++++++++++++++++++++++
}

function drawField() {
  bigNumRecord();
  yourResultFunction(yourResult, names);
  ctx.drawImage(filed, 0, 0);
  ctx.drawImage(foodIMG, food.x, food.y);

  let newHead = {
    x: snake[0].x,
    y: snake[0].y,
  };
  for (let i = 0; i < snake.length; i++) {
    i == 0 ? (ctx.fillStyle = "green") : (ctx.fillStyle = "red");
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    
  }

  if (newHead.x == food.x && newHead.y == food.y) {
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
    newHead.x < box ||
    newHead.x > 17 * box ||
    newHead.y < box * 3 ||
    newHead.y > 17 * box
  ) {
    gameOverStart(newHead);
  }

  if (dir == "left") newHead.x -= box;
  if (dir == "right") newHead.x += box;
  if (dir == "up") newHead.y -= box;
  if (dir == "down") newHead.y += box;

  sneckAteHimself(newHead, snake);

  

  snake.unshift(newHead);
}

setInterval(drawField, 100);
