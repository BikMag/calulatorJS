"use strict";

let buttonPanel = document.querySelector("#calculator .buttons");
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

  if (
    buttonPanel.hasAttribute("blocked") &&
    !(
      e.target.classList.contains("num") || e.target.classList.contains("clear")
    )
  ) {
    return;
  }

  displayOutput(e.target);

  if (!isNumeric(mainDisplay.textContent)) {
    buttonPanel.setAttribute("blocked", "");
    mainDisplay.style.fontSize = "23px";
  } else {
    buttonPanel.removeAttribute("blocked");
    mainDisplay.style.fontSize = "34px";
  }
});

function isNumeric(str) {
  return !isNaN(+str);
}

function displayOutput(button) {
  let displayValue = mainDisplay.textContent;

  if (button.classList.contains("num")) {
    if (prevButton && prevButton.classList.contains("equals")) {
      displayValue = "";
    }

    if (displayValue === "0" || prevButton.classList.contains("binary-oper")) {
      displayValue = button.textContent;
    } else {
      displayValue += button.textContent;
    }
  } else if (button.classList.contains("binary-oper")) {
    if (stack.length == 3) {
      stack = [];
      stack.push(displayValue);
      stack.push(button.textContent);
    } else if (stack.length == 2) {
      stack.pop();
      stack.push(button.textContent);
    } else {
      stack.push(displayValue);
      stack.push(button.textContent);
    }
  } else if (button.classList.contains("clear")) {
    displayValue = "0";
    stack = [];
  } else if (button.classList.contains("backspace")) {
    displayValue =
      displayValue.replace("-", "").length == 1
        ? "0"
        : displayValue.slice(0, -1);
  } else if (button.classList.contains("point")) {
    if (prevButton.classList.contains("binary-oper")) {
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
    if (+displayValue != 0) {
      displayValue = +displayValue * -1;
    }
  } else if (button.classList.contains("equals")) {
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
        let calculate = new Function("", "return " + stack.join(" "));
        displayValue = calculate();
      }
    }
  }
  prevButton = button;

  expressionDisplay.textContent = stack.join(" ");
  mainDisplay.textContent = displayValue;
}
