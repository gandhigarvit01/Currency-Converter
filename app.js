const BASE_URL = "https://v6.exchangerate-api.com/v6/03072f387fe88277958d070a/latest/";

const dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("button");


for(let select of dropdowns){
    for(let currcode in countryList){
        let newopt = document.createElement("option");
        newopt.innerText = currcode;
        select.append(newopt);
    }

    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    })
}

function updateflag(element){
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}

btn.addEventListener("click", (e) => {
    e.preventDefault();
    findrate();
})

async function findrate(){
    let amount = document.querySelector("form input");
    let amtval = amount.value;
    if(amtval === "" || amtval < 1){
        amtval = 1;
        amount.value = 1;
    }
    let fromcurr = document.querySelector(".from select");
    let tocurr = document.querySelector(".to select");
    const URL = `${BASE_URL}${fromcurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rates[tocurr.value];
    let newamt = amtval*rate;
    let msg = document.querySelector(".msg");
    msg.innerText = `${amtval} ${currencyNames[fromcurr.value]} = ${newamt} ${currencyNames[tocurr.value]}`;
}


