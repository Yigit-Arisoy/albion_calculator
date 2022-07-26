let updateTime = (updatedTime) => {
  let current = new Date();

  let differenceSeconds = (current - updatedTime) / 1000;

  if (differenceSeconds < 1) {
    return `${parseInt(differenceSeconds)} seconds ago`;
  } else if (differenceSeconds >= 1 && differenceSeconds < 60) {
    return `${parseInt(differenceSeconds / 60)} minutes ago`;
  } else {
    return `${parseInt(differenceSeconds / 60 / 60)} hours ago`;
  }
};

let changeBackground = (currentBackground) => {
  document.getElementById("leather-background").style.opacity = 0;
  document.getElementById("rock-background").style.opacity = 0;
  document.getElementById("wood-background").style.opacity = 0;
  document.getElementById("fiber-background").style.opacity = 0;
  document.getElementById("ore-background").style.opacity = 0;

  document.getElementById(currentBackground).style.opacity = 1;
};

let hide, leather;

let buttonHide = document.getElementById("hide-button");
buttonHide.addEventListener("click", ButtonHide);

let buttonWood = document.getElementById("wood-button");
buttonWood.addEventListener("click", ButtonWood);

let buttonFiber = document.getElementById("fiber-button");
buttonFiber.addEventListener("click", ButtonFiber);

let buttonOre = document.getElementById("ore-button");
buttonOre.addEventListener("click", ButtonOre);

let buttonRock = document.getElementById("rock-button");
buttonRock.addEventListener("click", ButtonRock);

function ButtonHide() {
  Array.from(buttonHide.parentElement.children).forEach((button) => {
    button.style.backgroundColor = "#0a0a0af2";
    button.style.color = "white";
    button.style.borderColor = "white";
  });

  buttonHide.style.backgroundColor = "white";
  buttonHide.style.color = "#0a0a0af2";
  buttonHide.style.borderColor = "black";

  const hide_fetch = fetch(
    "https://www.albion-online-data.com/api/v2/stats/prices/T4_HIDE_LEVEL1@1,T5_HIDE_LEVEL1@1,T6_HIDE_LEVEL1@1,T7_HIDE_LEVEL1@1,T8_HIDE_LEVEL1@1,T4_HIDE_LEVEL2@2,T5_HIDE_LEVEL2@2,T6_HIDE_LEVEL2@2,T7_HIDE_LEVEL2@2,T8_HIDE_LEVEL2@2,T4_HIDE_LEVEL3@3,T5_HIDE_LEVEL3@3,T6_HIDE_LEVEL3@3,T7_HIDE_LEVEL3@3,T8_HIDE_LEVEL3@3,T4_HIDE,T5_HIDE,T6_HIDE,T7_HIDE,T8_HIDE?locations=Martlock"
  ).then((res) => res.json());

  const leather_fetch = fetch(
    "https://www.albion-online-data.com/api/v2/stats/prices/T3_LEATHER,T4_LEATHER_LEVEL1@1,T5_LEATHER_LEVEL1@1,T6_LEATHER_LEVEL1@1,T7_LEATHER_LEVEL1@1,T8_LEATHER_LEVEL1@1,T4_LEATHER_LEVEL2@2,T5_LEATHER_LEVEL2@2,T6_LEATHER_LEVEL2@2,T7_LEATHER_LEVEL2@2,T8_LEATHER_LEVEL2@2,T4_LEATHER_LEVEL3@3,T5_LEATHER_LEVEL3@3,T6_LEATHER_LEVEL3@3,T7_LEATHER_LEVEL3@3,T8_LEATHER_LEVEL3@3,T4_LEATHER,T5_LEATHER,T6_LEATHER,T7_LEATHER,T8_LEATHER?locations=Martlock"
  ).then((res) => res.json());

  Promise.all([hide_fetch, leather_fetch]).then((res) => {
    console.log(res);

    let output = "";
    let profit = [];
    let rr = 1 - 0.54;

    for (let i = 0; i < 4; i++) {
      let hideCost = res[0][i].sell_price_min;
      let leatherCost = res[1][0].sell_price_min;
      let sellPrice = res[1][i + 1].sell_price_min;

      let cost = (hideCost * 2 + leatherCost) * rr;

      profit[i] = sellPrice - cost;

      let isLoss = "";

      if (profit[i] < 0) {
        isLoss = "class = loss";
      } else {
        isLoss = "class = profit";
      }

      let oldestDate = Math.max(
        new Date(res[1][i + 1].sell_price_min_date),
        new Date(res[0][i].sell_price_min_date),
        new Date(res[1][0].sell_price_min_date)
      );

      output += `
      <tr>
      <td>T4_${i}</td>
      <td ${isLoss}>${parseInt(profit[i])}</td>
      <td>${updateTime(oldestDate)}</td>
      <td>${hideCost}</td>
      <td>${leatherCost}</td>
      </tr>
       `;
    }

    for (let i = 4; i < 20; i++) {
      let hideCost = res[0][i].sell_price_min;
      let leatherCost = res[1][i - 3].sell_price_min;
      let sellPrice = res[1][i + 1].sell_price_min;

      let cost =
        (hideCost * Math.min(2 + parseInt(i / 4), 5) + leatherCost) * rr;

      profit[i] = sellPrice - cost;

      let isLoss = "";

      if (profit[i] < 0) {
        isLoss = "class = loss";
      } else {
        isLoss = "class = profit";
      }

      let oldestDate = Math.max(
        new Date(res[1][i - 3].sell_price_min_date),
        new Date(res[0][i].sell_price_min_date),
        new Date(res[1][i + 1].sell_price_min_date)
      );

      output += `
      <tr>
      <td>T${4 + parseInt(i / 4)}_${i % 4}</td>
      <td ${isLoss}>${parseInt(profit[i])}</td>
      <td>${updateTime(oldestDate)}</td>
      <td>${hideCost}</td>
      <td>${leatherCost}</td>
      </tr>
       `;
    }

    document.querySelector("tbody").innerHTML = output;
    changeBackground("leather-background");
  });
}

function ButtonWood() {
  Array.from(buttonHide.parentElement.children).forEach((button) => {
    button.style.backgroundColor = "#0a0a0af2";
    button.style.color = "white";
    button.style.borderColor = "white";
  });

  buttonWood.style.backgroundColor = "white";
  buttonWood.style.color = "#0a0a0af2";
  buttonWood.style.borderColor = "black";

  changeBackground("wood-background");
}

function ButtonFiber() {
  Array.from(buttonHide.parentElement.children).forEach((button) => {
    button.style.backgroundColor = "#0a0a0af2";
    button.style.color = "white";
    button.style.borderColor = "white";
  });

  buttonFiber.style.backgroundColor = "white";
  buttonFiber.style.color = "#0a0a0af2";
  buttonFiber.style.borderColor = "black";

  changeBackground("fiber-background");
}

function ButtonOre() {
  Array.from(buttonHide.parentElement.children).forEach((button) => {
    button.style.backgroundColor = "#0a0a0af2";
    button.style.color = "white";
    button.style.borderColor = "white";
  });

  buttonOre.style.backgroundColor = "white";
  buttonOre.style.color = "#0a0a0af2";
  buttonOre.style.borderColor = "black";

  changeBackground("ore-background");
}

function ButtonRock() {
  Array.from(buttonHide.parentElement.children).forEach((button) => {
    button.style.backgroundColor = "#0a0a0af2";
    button.style.color = "white";
    button.style.borderColor = "white";
  });

  buttonRock.style.backgroundColor = "white";
  buttonRock.style.color = "#0a0a0af2";
  buttonRock.style.borderColor = "black";

  changeBackground("rock-background");
}
