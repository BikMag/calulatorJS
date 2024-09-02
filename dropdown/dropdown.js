"use strict";

/**
 * Подсветка выбранного варианта из выпадающего списка
 * @param {HTMLElement} dropdown - элемент дропдауна
 */
function highlightOption(dropdown) {
  let options = dropdown.querySelectorAll("li");

  for (let option of options) {
    option.style.filter = "none";
  }

  dropdown.querySelector(`li.${dropdown.dataset.selected}`).style.filter =
    "brightness(0.8)";
}

/**
 * Выводит список вариантов для дропдауна
 * @param {Event} event - Событие для обработчика нажатий
 */
function dropList(event) {
  let dropdown = event.target.closest(".dropdown");

  let dropdowns = document.querySelectorAll(".dropdown");

  for (let dr of dropdowns) {
    if (dr != dropdown) {
      dr.removeAttribute("data-dropped");
    }
  }

  if (!dropdown) {
    return;
  }

  if (event.target.tagName == "LI") {
    dropdown.dataset.selected = event.target.className;
    highlightOption(dropdown);
  }

  if (dropdown.hasAttribute("data-dropped")) {
    dropdown.removeAttribute("data-dropped");
  } else {
    dropdown.dataset.dropped = "";
  }
}

document.addEventListener("click", (e) => dropList(e));

for (let dropdown of document.querySelectorAll(".dropdown")) {
  highlightOption(dropdown);
}
