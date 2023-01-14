import { URL as url, CURRENCY as curr } from "./utils/constants.js";

const convertCurrency = document.querySelector("#convert");
const convertedCurrency = document.querySelector("#converted");
const selectedCurrency = document.querySelector("#from");
const changedCurrency = document.querySelector("#to");
const input = document.querySelector("#input");
const resultInput = document.querySelector("#result");
const date = document.querySelector(".main__current-date");

const changeBackground = (content, select) => {
  content.textContent = curr[select.value];
  content.style.backgroundImage = `url(./image/${select.value}.jpg)`;
};

selectedCurrency.addEventListener("change", () =>
  changeBackground(convertCurrency, selectedCurrency)
);

changedCurrency.addEventListener("change", () =>
  changeBackground(convertedCurrency, changedCurrency)
);

const result = await fetch(url)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    return data;
  });

date.textContent = new Date(result.Date).toLocaleDateString("ru");

function calculateCurrency() {
  if (!input.value) {
    return;
  } else if (convertCurrency.textContent === convertedCurrency.textContent) {
    resultInput.value = input.value;
  } else if (selectedCurrency.value === "RUB") {
    resultInput.value = (
      Number(input.value) / result.Valute[changedCurrency.value].Value
    ).toFixed(2);
  } else if (changedCurrency.value === "RUB") {
    resultInput.value = (
      Number(input.value) * result.Valute[selectedCurrency.value].Value
    ).toFixed(2);
  } else {
    resultInput.value = (
      (Number(input.value) * result.Valute[selectedCurrency.value].Value) /
      result.Valute[changedCurrency.value].Value
    ).toFixed(2);
  }
}

input.addEventListener("input", calculateCurrency);
changedCurrency.addEventListener("change", calculateCurrency);
selectedCurrency.addEventListener("change", calculateCurrency);
