"use strict";

// Биндинг клавиш к кнопкам калькулятора
let binds = new Map();
binds.set("Digit Numpad", "num");
binds.set("Backquote", "sign");
binds.set("Period NumpadDecimal", "point");

binds.set("NumpadAdd", "plus");
binds.set("NumpadSubtract Minus", "minus");
binds.set("NumpadMultiply", "multiple");
binds.set("NumpadDivide Slash", "divide");
binds.set("Enter NumpadEnter Equal", "equals");

binds.set("Backspace", "backspace");
binds.set("KeyC Escape", "clear");

// Клавиши с шифтом
let shiftBinds = new Map();
shiftBinds.set("Digit5", "percent");
shiftBinds.set("Digit8", "multiple");
shiftBinds.set("Equal", "plus");

/**
 * Сопоставляет нажатую клавишу на клавиатуре с кнопкой на калькуляторе
 * и симулирует нажатие этой кнопки
 * @param {Event} e - событие для получения кода нажатой клавиши
 */
function simulateButtonClick(e) {
  let code = e.code;
  let map = binds;

  if (e.shiftKey) {
    map = shiftBinds;
  } else if (["Digit", "Numpad"].includes(code.slice(0, code.length - 1))) {
    code = code.slice(0, code.length - 1);
  }

  let key = Array.from(
    map.keys().filter((str) => str.split(" ").includes(code))
  )[0];

  let classButton = map.get(key);

  if (classButton == "num") {
    classButton += e.code.at(-1);
  }

  console.log(e.code + " -> " + classButton);

  let button = buttonPanel.querySelector(`.${classButton}`);

  if (button) {
    button.click();
  }
}

document.addEventListener("keydown", (event) => simulateButtonClick(event));

// Биндинг клавиши для смены темы
document.addEventListener("keydown", function (e) {
  switch (e.code) {
    case "KeyT":
      switchSelect();
      break;
  }
});

/**
 * Меняет состояние "темы" приложения по нажатию клавиши
 * (светлая -> темная -> по времени -> светлая)
 */
function switchSelect() {
  let select = document.getElementById("theme");

  let li = select.querySelector(`li.${select.dataset.selected}`);
  let nextLi = li.nextElementSibling;

  if (nextLi) {
    select.dataset.selected = nextLi.className;
  } else {
    select.dataset.selected = select.querySelector("li").className;
  }
}
