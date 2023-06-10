let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let startSpan = document.getElementById("start");
let counterCheck = document.getElementById("counterCheck");
let yourResult = document.getElementById("result");
let names = document.getElementById("name");
let eda = document.getElementById("eda");

import { bigNumRecord, yourResultFunction } from "./function.js";
// gjg++++++++++++++++++--------------------++++++++++++++++++------------------++++++++++++++------------------+++++++++++++++++-----------------++++++++++++fffffffffffff--------------rrrrrrrrrrrrrrrr++++++++++++++++++++++----------------rrrrrrrrrrrrrr++++++++++++++444444444444444444+++++++++++++ffffffffffffffffff-----------------fffffffffffffffffff++++++++++++++++ffffffffffffffffffff++++++++++++-----------------tttttttttttttttttttttt++++++++++++++++++ffffffffffffffffff
let dir;
let box = 60; // 32
let snake = [];
let counter = 0;
let record = [];

const filed = new Image();
// zmei={
//   top:0,
//   left:0,
//   speed:0,
// }
filed.src = "./png/field.png";

let food = {
  x: Math.floor(Math.random() * 10) * box,
  y: Math.floor(Math.random() * 10) * box,
};

canvas.addEventListener("click", dirSnake);

snake[0] = { x: 5 * box, y: 5 * box };

// таймауут перед играй
function dirSnake() {
  setTimeout(() => {
    let score = 2;
    startSpan.style.display = "block";
    startSpan.innerHTML = `Игра начнется через ${score}`;

    setInterval(() => {
      score--;
      console.log("rrrrrrr" + score);
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
// кушает себя
function sneckAteHimself(newHead, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (newHead.x == arr[i].x && newHead.y == arr[i].y) {
      gameOverStart(newHead);
    }
  }
}
//  когда змейка погибает
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
  newHead.x = 5 * box;
  newHead.y = 5 * box;
  counter = 0;
  startSpan.style.display = "block";
  startSpan.innerHTML = "Заново? Нажимай меня";
  counterCheck.innerHTML = `у тебя ${counter} очков`;
  canvas.addEventListener("click", dirSnake);
}

function drawField() {
  bigNumRecord();
  yourResultFunction(yourResult, names);

let sneckBody = document.createElement("div"); 
// нарисвать див для змейки +++++++++++++++++++++++++++++++++++++++++++++++++

  // ctx.drawImage(filed, 0, 0);
  eda.style.top = `${food.y}px`;
  eda.style.left = `${food.x}px`;

  let newHead = {
    x: snake[0].x,
    y: snake[0].y,
  };
  for (let i = 0; i < snake.length; i++) {
    i == 0 ? (ctx.fillStyle = "#0C455B") : (ctx.fillStyle = "#6CBDDB");
    document.createElement
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }
  if (newHead.x == food.x && newHead.y == food.y) {

    counter++;
    debugger
    console.log(snake);
    counterCheck.innerHTML = `у тебя ${counter} очков`;
    food = {
      x: Math.floor(Math.random() * 10) * box,
      y: Math.floor(Math.random() * 10) * box,
    };
  } else {
    snake.pop();
  }

  if (
    newHead.x < 0 ||
    newHead.x > 10 * box ||
    newHead.y < 0 ||
    newHead.y > 10 * box
  ) {
    gameOverStart(newHead);
  }
  // один шаг
  if (dir == "left") newHead.x -= box;
  if (dir == "right") newHead.x += box;
  if (dir == "up") newHead.y -= box;
  if (dir == "down") newHead.y += box;

  sneckAteHimself(newHead, snake);

  snake.unshift(newHead);
}

// function games() {}
setInterval(drawField, 200);
