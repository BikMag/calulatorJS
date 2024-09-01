"use strict";

function highlightOption(dropdown) {
  let options = dropdown.querySelectorAll("li");

  for (let option of options) {
    option.style.filter = "none";
  }

  dropdown.querySelector(`li.${dropdown.dataset.selected}`).style.filter =
    "brightness(0.8)";
}

document.addEventListener("click", (e) => {
  let dropdown = e.target.closest(".dropdown");

  if (!dropdown) {
    let dropdowns = document.querySelectorAll(".dropdown");

    for (let dr of dropdowns) {
      dr.removeAttribute("data-dropped");
    }

    return;
  }

  if (e.target.tagName == "LI") {
    dropdown.dataset.selected = e.target.className;
    highlightOption(dropdown);
  }

  if (dropdown.hasAttribute("data-dropped")) {
    dropdown.removeAttribute("data-dropped");
  } else {
    dropdown.dataset.dropped = "";
  }
});

for (let dropdown of document.querySelectorAll(".dropdown")) {
  console.log(dropdown);

  highlightOption(dropdown);
}
