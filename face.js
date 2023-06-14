let box = 60;
let x = 0;
let zmei = document.getElementById("zmei");
let field = document.getElementById("field");
let eda = document.getElementById("eda");
(function lll() {
  for (let i = 0; i <= 120; i++) {
    let cell = document.createElement("div");
    cell.className = "oneCell";
    cell.id = `oneCell${++x}`;
    // cell.dataset.id = ;
    field.append(cell);
  }
})();

let food = {
  x: Math.ceil(Math.floor(Math.random() * 10) * box),
  y: Math.ceil(Math.floor(Math.random() * 10) * box),
};
eda.style.top = `${food.y}px`;
eda.style.left = `${food.x}px`;
function start() {
  document.addEventListener("keyup", run);

  function run(event) {
    let fieldX = Math.ceil(field.getBoundingClientRect().x);
    let fieldY = Math.ceil(field.getBoundingClientRect().y);

    if (event.code == "ArrowRight") {
      zmei.style.left = `${
        Math.ceil(zmei.getBoundingClientRect().x) + box - fieldX
      }px`;
      // let elemX = zmei.getBoundingClientRect().x;
      // let elemY = zmei.getBoundingClientRect().y;

      // let asd = document.elementFromPoint(elemX, elemY);
      // console.log(asd);
    }
    if (event.code == "ArrowUp") {
      zmei.style.top = `${
        Math.ceil(zmei.getBoundingClientRect().y) - box - fieldY
      }px`;
    }
    if (event.code == "ArrowDown") {
      zmei.style.top = `${
        Math.ceil(zmei.getBoundingClientRect().y) + box - fieldY
      }px`;
    }
    if (event.code == "ArrowLeft") {
      zmei.style.left = `${
        Math.ceil(zmei.getBoundingClientRect().x) - box - fieldX
      }px`;
    }

    if (
      Math.ceil(zmei.getBoundingClientRect().x) ==
        Math.ceil(eda.getBoundingClientRect().x) &&
      Math.ceil(zmei.getBoundingClientRect().y) ==
        Math.ceil(eda.getBoundingClientRect().y)
    ) {
     food = {
       x: Math.ceil(Math.floor(Math.random() * 10) * box),
       y: Math.ceil(Math.floor(Math.random() * 10) * box),
     };
     
    }
    // if(food.x==)
  }
}

// zmei.getBoundingClientRect();
// document.addEventListener("mousemove", () => );
// zmei.addEventListener("mousemove", (e) => console.log(`${e.x}  ${e.y}`));
// eda.addEventListener("mousemove", (e) => console.log(`${e.x}  ${e.y}`));
// document.addEventListener("keydown", runZmei());
setTimeout(start, 300);
// setInterval(ert, 300);

// field.addEventListener("mousemove", (e) => {
//   //  let elemX = eda.getBoundingClientRect().x;
//   //  let elemY = eda.getBoundingClientRect().y;
//   console.log(`${e.x}  ${e.y}`);
//   let asd = document.elementFromPoint(e.x, e.y);
//   console.log(asd);
// });
