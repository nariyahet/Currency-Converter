const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".select-container select");
const btn = document.querySelector("button");
const msg = document.querySelector(".msg");
const amount = document.querySelector(".amount input");

let fromCurr = "USD";
let toCurr = "INR";

// fill dropdowns
for (let select of dropdowns) {
  for (let code in countryList) {
    let option = document.createElement("option");
    option.value = code;
    option.innerText = code;

    select.append(option);
  }

  // default set + flag
  select.addEventListener("change", (e) => {
    updateFlag(e.target);
    updateValues();
  });

  // default flag set
  updateFlag(select);
}

// update flags
function updateFlag(element) {
  let curr = element.value;
  let countryCode = countryList[curr];

  element.parentElement.querySelector("img").src =
    `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// update selected values
function updateValues() {
  let selects = document.querySelectorAll(".select-container select");

  fromCurr = selects[0].value;
  toCurr = selects[1].value;

  updateExchangeRate();
}

// API call
async function updateExchangeRate() {
  let amt = amount.value || 1;

  const URL = `${BASE_URL}/${fromCurr.toLowerCase()}.json`;

  let response = await fetch(URL);
  let data = await response.json();

  let rate = data[fromCurr.toLowerCase()][toCurr.toLowerCase()];
  let final = amt * rate;

  msg.innerText = `${amt} ${fromCurr} = ${final.toFixed(2)} ${toCurr}`;
}

// button click
btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
  let amtVal = amount.value;
  if(amtVal === "" || amtVal < 1){
    amtVal = 1;
    amount.value = "1";
  }
});

// initial run (IMPORTANT)
updateValues();