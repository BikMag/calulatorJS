"use strict";

/**
 * Сопоставляет нажатую клавишу на клавиатуре с кнопкой на калькуляторе
 * и симулирует нажатие этой кнопки
 * @param {Event} e - событие для получения кода нажатой клавиши
 */
function simulateButtonClick(e) {
  let button;
  let code = e.code;
  let isRigthKey = true;

  if (e.shiftKey) {
    switch (code) {
      case "Digit5":
        button = buttonPanel.querySelector(".percent");
        break;
      case "Digit8":
        button = buttonPanel.querySelector(".multiple");
        break;
      case "Equal":
        button = buttonPanel.querySelector(".plus");
        break;
      default:
        isRigthKey = false;
    }
  } else {
    switch (code) {
      case "Digit0":
      case "Digit1":
      case "Digit2":
      case "Digit3":
      case "Digit4":
      case "Digit5":
      case "Digit6":
      case "Digit7":
      case "Digit8":
      case "Digit9":
        button = buttonPanel.querySelector(`.num${code.slice(-1)}`);
        break;
      case "Backspace":
        button = buttonPanel.querySelector(".backspace");
        break;
      case "Escape":
      case "KeyC":
        button = buttonPanel.querySelector(".clear");
        break;
      case "Minus":
        button = buttonPanel.querySelector(".minus");
        break;
      case "Slash":
        button = buttonPanel.querySelector(".divide");
        break;
      case "Equal":
        button = buttonPanel.querySelector(".equals");
        break;
      case "Period":
        button = buttonPanel.querySelector(".point");
        break;
      case "Backquote":
        button = buttonPanel.querySelector(".sign");
        break;
      case "Enter":
        button = buttonPanel.querySelector(".equals");
        break;
      default:
        isRigthKey = false;
    }
  }

  if (isRigthKey) {
    button.click();
  }
}

document.addEventListener("keydown", (event) => simulateButtonClick(event));

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
