let validname = document.getElementById("name");

function validName() {
  let x = validname.value.split("").length;
  if (1 > x) {
    alert("Вы не ввели имя))");
    
  }
}
export { validName };
