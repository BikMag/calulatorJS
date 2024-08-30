"use strict";

function simulateButtonClick(e) {
  console.log(e.code);

  let button;
  let code = e.code;

  switch (code) {
    case "Digit0":
    case "Digit1":
    case "Digit2":
    case "Digit3":
    case "Digit4":
    case "Digit5":
      if (e.shiftKey) {
        button = buttonPanel.querySelector(".percent");
        break;
      }
    case "Digit6":
    case "Digit7":
    case "Digit8":
      if (e.shiftKey) {
        button = buttonPanel.querySelector(".multiple");
        break;
      }
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
      if (e.shiftKey) {
        button = buttonPanel.querySelector(".plus");
      } else {
        button = buttonPanel.querySelector(".equals");
      }
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
      return;
  }

  button.click();
}

document.addEventListener("keydown", (event) => simulateButtonClick(event));

document.addEventListener("keydown", function (e) {
  switch (e.code) {
    case "KeyT":
      switchSelect();
      break;
  }
});

function switchSelect() {
  let select = document.getElementById("theme");

  let selectedIndex = select.selectedIndex;
  let optionsCount = select.children.length;

  selectedIndex = selectedIndex == optionsCount - 1 ? 0 : selectedIndex + 1;
  console.log(selectedIndex);

  select.options[selectedIndex].selected = true;
  select.dispatchEvent(new Event("input"));
}
