"use strict";

let attr = "data-dark-theme";
let timeId;

function changeThemeByTime(start, end) {
  function stringToDate(str) {
    let date = new Date();

    let [h, m] = str.split(":");
    date.setHours(+h);
    date.setMinutes(+m);
    date.setSeconds(0);

    return date;
  }

  function checkTime() {
    let date = Date.now();

    if (date >= startDate && date < endDate) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  let startDate = stringToDate(start);
  let endDate = stringToDate(end);

  checkTime();
  timeId = setInterval(checkTime, 1000);
}

function setTheme(theme) {
  if (theme == "light") {
    document.body.removeAttribute(attr);
  } else {
    document.body.setAttribute(attr, "");
  }
}

function toggleTheme() {
  if (document.body.hasAttribute(attr)) {
    document.body.removeAttribute(attr);
  } else {
    document.body.setAttribute(attr, "");
  }
}

function checkSelectOption() {
  switch (select.value) {
    case "light":
      setTheme("light");
      clearInterval(timeId);
      break;
    case "dark":
      setTheme("dark");
      clearInterval(timeId);
      break;
    case "time":
      changeThemeByTime("8:00", "19:00");
      break;
  }
}

let select = document.getElementById("theme");

checkSelectOption();
select.addEventListener("input", checkSelectOption);
