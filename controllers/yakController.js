const Yak = require("../models/yakModel");

// FUNCTION TO CONVERT A YAK YEAR INTO DAYS
const toDays = (years) => years * 100;

// FUNCTION TO CALCULATE YAK STOCK FOR MILK AND SKIN OVER T DAYS
const calculateStock = async (days) => {
  const herd = await Yak.find();
  let totalMilk = 0;
  let totalSkins = 0;

  herd.forEach((yak) => {
    const ageInDays = toDays(yak.age) + days;

    // MILK PRODUCDED CALCULATED HERE
    if (yak.sex === "f") {
      for (let d = 0; d < days; d++) {
        const dailyMilk = Math.max(0, 50 - (ageInDays - d) * 0.03);
        totalMilk += dailyMilk;
      }
    }

    // CHECK HOW MANY TIMES YAK IS SHAVED
    let lastShavedDay = toDays(yak.age);
    while (
      lastShavedDay + 8 + (ageInDays - lastShavedDay) * 0.01 <=
      ageInDays
    ) {
      totalSkins++;
      lastShavedDay += 8 + (ageInDays - lastShavedDay) * 0.01;
    }
  });

  return { milk: parseFloat(totalMilk.toFixed(2)), skins: totalSkins };
};

// STATE OF HERD AFTER T DAYS
const getHerdAfterDays = async (days) => {
  const herd = await Yak.find();
  const updatedHerd = herd.map((yak) => {
    // CONVERT DAYS BACK TO YEARS
    const newAge = yak.age + days / 100;
    return {
      name: yak.name,
      age: parseFloat(newAge.toFixed(2)),
      ageLastShaved: parseFloat(yak.age.toFixed(2)),
    };
  });

  return { herd: updatedHerd };
};

module.exports = { calculateStock, getHerdAfterDays };
