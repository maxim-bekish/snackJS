
function bigNumRecord() {
  let maxNumber = document.getElementById("maxNumber");
  let maxNumberRecord = [];
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


function yourResultFunction(yourResult, names) {
  yourResult = document.getElementById("result");
  if (sessionStorage.getItem("lastСounter")) {
    yourResult.innerHTML = `${
      names.value
    }, твой последний результат ${sessionStorage.getItem("lastСounter")} очков`;
  } else {
    yourResult.innerHTML = `${names.value} это твой первая игра `;
  }
}

export { bigNumRecord, yourResultFunction };