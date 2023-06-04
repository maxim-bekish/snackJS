let canvas = document.getElementById("canvas");
let canvasText = document.getElementById("canvasText");
let ctx = canvas.getContext("2d");
let startSpan = document.getElementById("start");
let counterCheck = document.getElementById("counterCheck");
let yourResult = document.getElementById("result");
let maxNumber = document.getElementById("maxNumber");
let names = document.getElementById("name");

let maxNumberRecord = [];
let playerName;
let maxRecord;
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
counterCheck.innerHTML = `у тебя ${counter} очков`;
startSpan.addEventListener("click", dirSnake);

snake[0] = { x: 9 * box, y: 10 * box };

function dirSnake() {
  // setTimeout(() => , 2000);

  // localStorage.setItem("key", "Enter");
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
        document.addEventListener("keydown",  validityKey);
        console.log(score);
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
// // // // // // // // // // // // // // // // // // // // // // // // // // разобраться, почему валдация срабатываает всегда!


function sneckAteHimself(newHead, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (newHead.x == arr[i].x && newHead.y == arr[i].y) {
      dir = "stop";
      sessionStorage.setItem("lastСounter", counter); ////////////////////////////////////////////////////////////////////////////////////////////////////////////
      if (localStorage.getItem("reci")) {
        record = JSON.parse(localStorage.getItem("reci"));
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
      startSpan.innerHTML = "Заново? Нажимай Enter";
      counterCheck.innerHTML = `у тебя ${counter} очков`;
      startSpan.addEventListener("click", dirSnake);
    }
  }
}

function drawField() {
  bigNum();
  yourResultFunction();
  // let x=localStorage.getItem('record');
  // let y=[]
  // y.push(x)
  // console.log(y)
  //  Math.max(...record);
  // maxNumber.innerHTML=

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
    sessionStorage.setItem("lastСounter", counter); ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (localStorage.getItem("reci")) {
      record = JSON.parse(localStorage.getItem("reci"));
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
    snakeX = 9 * box;
    snakeY = 10 * box;
    counter = 0;
    startSpan.style.display = "block";
    startSpan.innerHTML = "Заново? Нажимай Enter";
    counterCheck.innerHTML = `у тебя ${counter} очков`;
    startSpan.addEventListener("click", dirSnake);
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
document.addEventListener("DOMContentLoaded", () =>
  sessionStorage.removeItem("lastСounter")
);

function bigNum() {
  if (localStorage.getItem("reci")) {
    let maxrecord = JSON.parse(localStorage.getItem("reci"));

    for (let i = 0; i < maxrecord.length; i++) {
      maxNumberRecord.push(maxrecord[i].rec);
    }
    let bigNumber = Math.max.apply(null, maxNumberRecord);

    maxNumber.innerHTML = `Рекорд  ${bigNumber} очков  `;
  } else {
    maxNumber.innerHTML = `Рекорда нет`;
  }
}
function yourResultFunction() {
  if (sessionStorage.getItem("lastСounter")) {
    yourResult.innerHTML = `${
      names.value
    }, твой последний результат ${sessionStorage.getItem("lastСounter")} очков`;
  } else {
    yourResult.innerHTML = `${names.value} это твой первая игра `;
  }
}
// yourResult.style.display = "none";
// startSpan.style.display = "none";
// counterCheck.style.display = "none";
document.getElementById("button").addEventListener("click", () => {
  yourResult.style.display = "block";
  startSpan.style.display = "block";
  counterCheck.style.display = "block";
  canvas.style.display = "block";

  // document.querySelector(".form").style.display = "none";

  // setInterval(drawField, 100);
});
document.querySelector(".form").style.display = "none";
setInterval(drawField, 100);
