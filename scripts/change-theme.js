"use strict";

let attr = "data-dark-theme";
let timeId;

/**
 * Изменение темы в зависимости от времени
 * @param {string} start - время смены темной темы на светлую
 * @param {string} end - время смены светлой темы на темную
 */
function changeThemeByTime(start, end) {
  /**
   * Конвертирование строки в объект Date
   * @param {string} str - строка в формате "hh:mm"
   * @returns {Date} Объект Date
   */
  function stringToDate(str) {
    let date = new Date();

    let [h, m] = str.split(":");
    date.setHours(+h);
    date.setMinutes(+m);
    date.setSeconds(0);

    return date;
  }

  /**
   * Отслеживает текущее время и меняет тему
   */
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

/**
 * Устанавливает тему по заданному режиму
 * @param {string} theme - режим темы
 */
function setTheme(theme) {
  if (theme == "light") {
    document.body.removeAttribute(attr);
  } else {
    document.body.setAttribute(attr, "");
  }
}

/**
 * Переключает тему
 */
function toggleTheme() {
  if (document.body.hasAttribute(attr)) {
    document.body.removeAttribute(attr);
  } else {
    document.body.setAttribute(attr, "");
  }
}

/**
 * Сканирует значение из <select> и задает тему на основе этого значения
 */
function checkSelectOption(dropdown) {
  switch (dropdown.dataset.selected) {
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

checkSelectOption(document.getElementById("theme"));
