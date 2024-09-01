"use strict";

let buttonPanel = document.querySelector("#calculator .buttons");
let display = document.querySelector("#calculator .display");
let mainDisplay = document.querySelector("#calculator .main-display");
let expressionDisplay = document.querySelector(
  "#calculator .expression-display"
);

let memory = "";
let prevButton;

let stack = [];

buttonPanel.addEventListener("click", function (e) {
  if (e.target.tagName != "BUTTON") {
    return;
  }

  e.target.blur();

  if (
    buttonPanel.hasAttribute("blocked") &&
    !(
      e.target.classList.contains("num") || e.target.classList.contains("clear")
    )
  ) {
    return;
  }

  displayOutput(e.target);
  displayCorrect(mainDisplay, 34);
  displayCorrect(expressionDisplay, 14);

  if (!isNumeric(mainDisplay.textContent)) {
    buttonPanel.setAttribute("blocked", "");
  } else {
    buttonPanel.removeAttribute("blocked");
  }
});

function isNumeric(str) {
  return !isNaN(+str);
}

/**
 * Отображение информации на дисплее
 * @param {HTMLElement} button - Нажатая кнопка
 */
function displayOutput(button) {
  let displayValue = mainDisplay.textContent;

  if (button.classList.contains("num")) {
    if (prevButton && prevButton.classList.contains("equals")) {
      displayValue = "";
    }

    if (displayValue === "0" || prevButton.classList.contains("binary-oper")) {
      displayValue = button.textContent;
    } else if (displayValue.replace(".", "").length < 16) {
      displayValue += button.textContent;
    }
  } else if (button.classList.contains("binary-oper")) {
    if (stack.length == 3) {
      stack = [];
      stack.push(displayValue);
      stack.push(button.textContent);
    } else if (stack.length == 2) {
      if (prevButton.classList.contains("binary-oper")) {
        stack.pop();
        stack.push(button.textContent);
      } else {
        calculate();

        if (isNumeric(displayValue)) {
          stack = [];
          stack.push(displayValue);
          stack.push(button.textContent);
        }
      }
    } else {
      stack.push(displayValue);
      stack.push(button.textContent);
    }
  } else if (button.classList.contains("clear")) {
    displayValue = "0";
    stack = [];
  } else if (button.classList.contains("backspace")) {
    if (+displayValue == 0) {
      displayValue = "0";
    } else {
      displayValue =
        displayValue.replace("-", "").length == 1
          ? "0"
          : displayValue.slice(0, -1);
    }
  } else if (button.classList.contains("point")) {
    if (prevButton && prevButton.classList.contains("binary-oper")) {
      displayValue = "0.";
    } else if (!displayValue.includes(".")) {
      displayValue += ".";
    }
  } else if (button.classList.contains("percent")) {
    if (stack.length == 2) {
      displayValue = (+stack[0] * +displayValue) / 100;
    } else {
      displayValue = +displayValue / 100;
    }
  } else if (button.classList.contains("sign")) {
    if (displayValue != "0") {
      if (displayValue.includes("-")) {
        displayValue = displayValue.slice(1);
      } else {
        displayValue = "-" + displayValue;
      }
    }
  } else if (button.classList.contains("equals")) {
    calculate();
  }
  prevButton = button;

  expressionDisplay.textContent = stack.join(" ");
  mainDisplay.textContent = displayValue;

  /**
   * Вычисляет значение и записывает его в displayValue
   */
  function calculate() {
    if (stack.length == 3) {
      stack.shift();
      stack.unshift(displayValue);
    } else if (stack.length == 2) {
      stack.push(displayValue);
    }

    if (stack.length > 1) {
      if (stack.at(-2) + stack.at(-1) == "/0") {
        displayValue = "Error of divivsion on zero";
        stack = [];
      } else {
        let f = new Function("", "return " + stack.join(" "));
        displayValue = f();
      }
    }
  }
}

/**
 * Динамическое изменение размера шрифта под размеры элемента
 * @param {HTMLElement} displayComponent - Элемент, под который подстраивается текст
 * @param {number} maxSize - Максимальный размер шрифта
 */
function displayCorrect(displayComponent, maxSize) {
  let displayWidth = parseInt(getComputedStyle(display).width);

  let fontSize = maxSize;
  displayComponent.style.fontSize = fontSize + "px";

  while (displayComponent.clientWidth > displayWidth) {
    fontSize = parseInt(getComputedStyle(displayComponent).fontSize);
    displayComponent.style.fontSize = fontSize - 1 + "px";
  }
}
