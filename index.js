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

// let buttonRock = document.getElementById("rock-button");
// buttonRock.addEventListener("click", ButtonRock);

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
  Array.from(buttonWood.parentElement.children).forEach((button) => {
    button.style.backgroundColor = "#0a0a0af2";
    button.style.color = "white";
    button.style.borderColor = "white";
  });

  buttonWood.style.backgroundColor = "white";
  buttonWood.style.color = "#0a0a0af2";
  buttonWood.style.borderColor = "black";

  const wood_fetch = fetch(
    "https://www.albion-online-data.com/api/v2/stats/prices/T4_WOOD_LEVEL1@1,T5_WOOD_LEVEL1@1,T6_WOOD_LEVEL1@1,T7_WOOD_LEVEL1@1,T8_WOOD_LEVEL1@1,T4_WOOD_LEVEL2@2,T5_WOOD_LEVEL2@2,T6_WOOD_LEVEL2@2,T7_WOOD_LEVEL2@2,T8_WOOD_LEVEL2@2,T4_WOOD_LEVEL3@3,T5_WOOD_LEVEL3@3,T6_WOOD_LEVEL3@3,T7_WOOD_LEVEL3@3,T8_WOOD_LEVEL3@3,T4_WOOD,T5_WOOD,T6_WOOD,T7_WOOD,T8_WOOD?locations=FortSterling"
  ).then((res) => res.json());

  const planks_fetch = fetch(
    "https://www.albion-online-data.com/api/v2/stats/prices/T3_PLANKS,T4_PLANKS_LEVEL1@1,T5_PLANKS_LEVEL1@1,T6_PLANKS_LEVEL1@1,T7_PLANKS_LEVEL1@1,T8_PLANKS_LEVEL1@1,T4_PLANKS_LEVEL2@2,T5_PLANKS_LEVEL2@2,T6_PLANKS_LEVEL2@2,T7_PLANKS_LEVEL2@2,T8_PLANKS_LEVEL2@2,T4_PLANKS_LEVEL3@3,T5_PLANKS_LEVEL3@3,T6_PLANKS_LEVEL3@3,T7_PLANKS_LEVEL3@3,T8_PLANKS_LEVEL3@3,T4_PLANKS,T5_PLANKS,T6_PLANKS,T7_PLANKS,T8_PLANKS?locations=FortSterling"
  ).then((res) => res.json());

  Promise.all([wood_fetch, planks_fetch]).then((res) => {
    console.log(res);

    let output = "";
    let profit = [];
    let rr = 1 - 0.54;

    for (let i = 0; i < 4; i++) {
      let woodCost = res[0][i].sell_price_min;
      let planksCost = res[1][0].sell_price_min;
      let sellPrice = res[1][i + 1].sell_price_min;

      let cost = (woodCost * 2 + planksCost) * rr;

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
      <td>${woodCost}</td>
      <td>${planksCost}</td>
      </tr>
       `;
    }

    for (let i = 4; i < 20; i++) {
      let woodCost = res[0][i].sell_price_min;
      let planksCost = res[1][i - 3].sell_price_min;
      let sellPrice = res[1][i + 1].sell_price_min;

      let cost =
        (woodCost * Math.min(2 + parseInt(i / 4), 5) + planksCost) * rr;

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
      <td>${woodCost}</td>
      <td>${planksCost}</td>
      </tr>
       `;
    }

    document.querySelector("tbody").innerHTML = output;
    changeBackground("wood-background");
  });
}

function ButtonFiber() {
  Array.from(buttonFiber.parentElement.children).forEach((button) => {
    button.style.backgroundColor = "#0a0a0af2";
    button.style.color = "white";
    button.style.borderColor = "white";
  });

  buttonFiber.style.backgroundColor = "white";
  buttonFiber.style.color = "#0a0a0af2";
  buttonFiber.style.borderColor = "black";

  const fiber_fetch = fetch(
    "https://www.albion-online-data.com/api/v2/stats/prices/T4_FIBER_LEVEL1@1,T5_FIBER_LEVEL1@1,T6_FIBER_LEVEL1@1,T7_FIBER_LEVEL1@1,T8_FIBER_LEVEL1@1,T4_FIBER_LEVEL2@2,T5_FIBER_LEVEL2@2,T6_FIBER_LEVEL2@2,T7_FIBER_LEVEL2@2,T8_FIBER_LEVEL2@2,T4_FIBER_LEVEL3@3,T5_FIBER_LEVEL3@3,T6_FIBER_LEVEL3@3,T7_FIBER_LEVEL3@3,T8_FIBER_LEVEL3@3,T4_FIBER,T5_FIBER,T6_FIBER,T7_FIBER,T8_FIBER?locations=Lymhurst"
  ).then((res) => res.json());

  const cloth_fetch = fetch(
    "https://www.albion-online-data.com/api/v2/stats/prices/T3_CLOTH,T4_CLOTH_LEVEL1@1,T5_CLOTH_LEVEL1@1,T6_CLOTH_LEVEL1@1,T7_CLOTH_LEVEL1@1,T8_CLOTH_LEVEL1@1,T4_CLOTH_LEVEL2@2,T5_CLOTH_LEVEL2@2,T6_CLOTH_LEVEL2@2,T7_CLOTH_LEVEL2@2,T8_CLOTH_LEVEL2@2,T4_CLOTH_LEVEL3@3,T5_CLOTH_LEVEL3@3,T6_CLOTH_LEVEL3@3,T7_CLOTH_LEVEL3@3,T8_CLOTH_LEVEL3@3,T4_CLOTH,T5_CLOTH,T6_CLOTH,T7_CLOTH,T8_CLOTH?locations=Lymhurst"
  ).then((res) => res.json());

  Promise.all([fiber_fetch, cloth_fetch]).then((res) => {
    console.log(res);

    let output = "";
    let profit = [];
    let rr = 1 - 0.54;

    for (let i = 0; i < 4; i++) {
      let fiberCost = res[0][i].sell_price_min;
      let clothCost = res[1][0].sell_price_min;
      let sellPrice = res[1][i + 1].sell_price_min;

      let cost = (fiberCost * 2 + clothCost) * rr;

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
      <td>${fiberCost}</td>
      <td>${clothCost}</td>
      </tr>
       `;
    }

    for (let i = 4; i < 20; i++) {
      let fiberCost = res[0][i].sell_price_min;
      let clothCost = res[1][i - 3].sell_price_min;
      let sellPrice = res[1][i + 1].sell_price_min;

      let cost =
        (fiberCost * Math.min(2 + parseInt(i / 4), 5) + clothCost) * rr;

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
      <td>${fiberCost}</td>
      <td>${clothCost}</td>
      </tr>
       `;
    }

    document.querySelector("tbody").innerHTML = output;
    changeBackground("fiber-background");
  });
}

function ButtonOre() {
  Array.from(buttonOre.parentElement.children).forEach((button) => {
    button.style.backgroundColor = "#0a0a0af2";
    button.style.color = "white";
    button.style.borderColor = "white";
  });

  buttonOre.style.backgroundColor = "white";
  buttonOre.style.color = "#0a0a0af2";
  buttonOre.style.borderColor = "black";

  const ore_fetch = fetch(
    "https://www.albion-online-data.com/api/v2/stats/prices/T4_ORE_LEVEL1@1,T5_ORE_LEVEL1@1,T6_ORE_LEVEL1@1,T7_ORE_LEVEL1@1,T8_ORE_LEVEL1@1,T4_ORE_LEVEL2@2,T5_ORE_LEVEL2@2,T6_ORE_LEVEL2@2,T7_ORE_LEVEL2@2,T8_ORE_LEVEL2@2,T4_ORE_LEVEL3@3,T5_ORE_LEVEL3@3,T6_ORE_LEVEL3@3,T7_ORE_LEVEL3@3,T8_ORE_LEVEL3@3,T4_ORE,T5_ORE,T6_ORE,T7_ORE,T8_ORE?locations=Thetford"
  ).then((res) => res.json());

  const metalBar_fetch = fetch(
    "https://www.albion-online-data.com/api/v2/stats/prices/T3_METALBAR,T4_METALBAR_LEVEL1@1,T5_METALBAR_LEVEL1@1,T6_METALBAR_LEVEL1@1,T7_METALBAR_LEVEL1@1,T8_METALBAR_LEVEL1@1,T4_METALBAR_LEVEL2@2,T5_METALBAR_LEVEL2@2,T6_METALBAR_LEVEL2@2,T7_METALBAR_LEVEL2@2,T8_METALBAR_LEVEL2@2,T4_METALBAR_LEVEL3@3,T5_METALBAR_LEVEL3@3,T6_METALBAR_LEVEL3@3,T7_METALBAR_LEVEL3@3,T8_METALBAR_LEVEL3@3,T4_METALBAR,T5_METALBAR,T6_METALBAR,T7_METALBAR,T8_METALBAR?locations=Thetford"
  ).then((res) => res.json());

  Promise.all([ore_fetch, metalBar_fetch]).then((res) => {
    console.log(res);

    let output = "";
    let profit = [];
    let rr = 1 - 0.54;

    for (let i = 0; i < 4; i++) {
      let oreCost = res[0][i].sell_price_min;
      let metalBarCost = res[1][0].sell_price_min;
      let sellPrice = res[1][i + 1].sell_price_min;

      let cost = (oreCost * 2 + metalBarCost) * rr;

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
      <td>${oreCost}</td>
      <td>${metalBarCost}</td>
      </tr>
       `;
    }

    for (let i = 4; i < 20; i++) {
      let oreCost = res[0][i].sell_price_min;
      let metalBarCost = res[1][i - 3].sell_price_min;
      let sellPrice = res[1][i + 1].sell_price_min;

      let cost =
        (oreCost * Math.min(2 + parseInt(i / 4), 5) + metalBarCost) * rr;

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
      <td>${oreCost}</td>
      <td>${metalBarCost}</td>
      </tr>
       `;
    }

    document.querySelector("tbody").innerHTML = output;
    changeBackground("ore-background");
  });
}

function ButtonRock() {
  Array.from(buttonRock.parentElement.children).forEach((button) => {
    button.style.backgroundColor = "#0a0a0af2";
    button.style.color = "white";
    button.style.borderColor = "white";
  });

  buttonRock.style.backgroundColor = "white";
  buttonRock.style.color = "#0a0a0af2";
  buttonRock.style.borderColor = "black";

  const rock_fetch = fetch(
    "https://www.albion-online-data.com/api/v2/stats/prices/T4_ROCK_LEVEL1@1,T5_ROCK_LEVEL1@1,T6_ROCK_LEVEL1@1,T7_ROCK_LEVEL1@1,T8_ROCK_LEVEL1@1,T4_ROCK_LEVEL2@2,T5_ROCK_LEVEL2@2,T6_ROCK_LEVEL2@2,T7_ROCK_LEVEL2@2,T8_ROCK_LEVEL2@2,T4_ROCK_LEVEL3@3,T5_ROCK_LEVEL3@3,T6_ROCK_LEVEL3@3,T7_ROCK_LEVEL3@3,T8_ROCK_LEVEL3@3,T4_ROCK,T5_ROCK,T6_ROCK,T7_ROCK,T8_ROCK?locations=Bridgewatch"
  ).then((res) => res.json());

  const stoneBlock_fetch = fetch(
    "https://www.albion-online-data.com/api/v2/stats/prices/T3_STONEBLOCK,T4_STONEBLOCK_LEVEL1@1,T5_STONEBLOCK_LEVEL1@1,T6_STONEBLOCK_LEVEL1@1,T7_STONEBLOCK_LEVEL1@1,T8_STONEBLOCK_LEVEL1@1,T4_STONEBLOCK_LEVEL2@2,T5_STONEBLOCK_LEVEL2@2,T6_STONEBLOCK_LEVEL2@2,T7_STONEBLOCK_LEVEL2@2,T8_STONEBLOCK_LEVEL2@2,T4_STONEBLOCK_LEVEL3@3,T5_STONEBLOCK_LEVEL3@3,T6_STONEBLOCK_LEVEL3@3,T7_STONEBLOCK_LEVEL3@3,T8_STONEBLOCK_LEVEL3@3,T4_STONEBLOCK,T5_STONEBLOCK,T6_STONEBLOCK,T7_STONEBLOCK,T8_STONEBLOCK?locations=Bridgewatch"
  ).then((res) => res.json());

  Promise.all([rock_fetch, stoneBlock_fetch]).then((res) => {
    console.log(res);

    let output = "";
    let profit = [];
    let rr = 1 - 0.54;

    for (let i = 0; i < 4; i++) {
      let rockCost = res[0][i].sell_price_min;
      let stoneBlockCost = res[1][0].sell_price_min;
      let sellPrice = res[1][i + 1].sell_price_min;

      let cost = (rockCost * 2 + stoneBlockCost) * rr;

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
      <td>${rockCost}</td>
      <td>${stoneBlockCost}</td>
      </tr>
       `;
    }

    for (let i = 4; i < 20; i++) {
      let rockCost = res[0][i].sell_price_min;
      let stoneBlockCost = res[1][i - 3].sell_price_min;
      let sellPrice = res[1][i + 1].sell_price_min;

      let cost =
        (rockCost * Math.min(2 + parseInt(i / 4), 5) + stoneBlockCost) * rr;

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
      <td>${rockCost}</td>
      <td>${stoneBlockCost}</td>
      </tr>
       `;
    }

    document.querySelector("tbody").innerHTML = output;
    changeBackground("rock-background");
  });
}
