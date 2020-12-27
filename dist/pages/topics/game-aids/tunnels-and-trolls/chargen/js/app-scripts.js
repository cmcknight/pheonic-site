const ctlKindred = document.getElementById("kindred");
ctlKindred.addEventListener("change", recalcStats);
const ctlCharType = document.getElementById("char-type");
ctlCharType.addEventListener("change", recalcStats);

const btnGenerate = document.getElementById("generate");
btnGenerate.addEventListener("click", generateStats);

const tblCharStats = document.getElementById("char-stats");
const divOtherData = document.getElementById("other-stats-table");

const divStatPanel = document.getElementById("stat-panel");

const kindred = [
    "Dwarf (Gristlegrim)",
    "Dwarf (Midgardian)",
    "Elf",
    "Fairy",
    "Hobb",
    "Human",
    "Leprechaun",
];

const heightInInches = [
    0,
    0,
    0,
    52,
    55,
    58,
    61,
    63,
    65,
    67,
    68,
    69,
    70,
    72,
    74,
    76,
    79,
    82,
    85,
];
const weightInPounds = [
    [0, 0],
    [0, 0],
    [0, 0],
    [60, 75],
    [75, 95],
    [95, 115],
    [110, 135],
    [125, 150],
    [135, 165],
    [150, 175],
    [155, 185],
    [160, 190],
    [165, 195],
    [180, 210],
    [190, 230],
    [200, 240],
    [220, 265],
    [240, 280],
    [255, 300],
];

const base_stats = {};
const stats = {};

const stat_names = ["STR", "CON", "DEX", "SPD", "IQ", "WIZ", "LK", "CHR"];
const kindredMods = {};

// Dwarf (GristleGrim)
kindredMods[kindred[0]] = {
    STR: 2,
    CON: 2,
    DEX: 1,
    LK: 0.75,
    IQ: 1,
    WIZ: 1,
    CHR: 1,
    HT: 0.67,
    WT: 2,
};
// Dwarf (Midgardian)
kindredMods[kindred[1]] = {
    STR: 2,
    CON: 2,
    DEX: 1,
    LK: 1,
    IQ: 1,
    WIZ: 1,
    CHR: 0.75,
    HT: 0.67,
    WT: 0.8,
};
// Elf
kindredMods[kindred[2]] = {
    STR: 1,
    CON: 0.67,
    DEX: 1.33,
    LK: 1,
    IQ: 1.5,
    WIZ: 1.5,
    CHR: 1.5,
    HT: 1.1,
    WT: 1,
};
// Fairy
kindredMods[kindred[3]] = {
    STR: 0.25,
    CON: 0.25,
    DEX: 1.75,
    LK: 1.5,
    IQ: 1,
    WIZ: 2,
    CHR: 1.5,
    HT: 0.1,
    WT: 0.01,
};
// Hobb
kindredMods[kindred[4]] = {
    STR: 0.5,
    CON: 2,
    DEX: 1.5,
    LK: 1.5,
    IQ: 1,
    WIZ: 1,
    CHR: 1,
    HT: 0.5,
    WT: 0.75,
};
// Human
kindredMods[kindred[5]] = {
    STR: 1,
    CON: 1,
    DEX: 1,
    LK: 1,
    IQ: 1,
    WIZ: 1,
    CHR: 1,
    HT: 1,
    WT: 1,
};
// Leprechaun
kindredMods[kindred[6]] = {
    STR: 0.33,
    CON: 0.67,
    DEX: 1.5,
    LK: 1.5,
    IQ: 1.25,
    WIZ: 1,
    CHR: 1,
    HT: 0.33,
    WT: 0.1,
};

function rollDie(e, sides = 6) {
    const result = Math.floor(Math.random() * Math.floor(sides)) + 1;
    return result;
}

function roll3(e) {
    const die1 = rollDie();
    const die2 = rollDie();
    const die3 = rollDie();
    let taro = false;
    if (die1 === die2 && die1 === die3) {
        taro = true;
    }
    return { die1, die2, die3, taro };
}

function rollStat(e) {
    let die1 = (die2 = die3 = 0);
    let taro = false;

    do {
        let retval = roll3();
        (die1 += retval.die1),
        (die2 += retval.die2),
        (die3 += retval.die3),
        (taro = retval.taro);
    } while (taro);
    return die1 + die2 + die3;
}

function generateStats(e) {
    // gather the stats
    for (let i = 0; i < 8; i++) {
        let statValue = rollStat();
        base_stats[stat_names[i]] = statValue;
        stats[stat_names[i]] = statValue;
    }
    [base_stats["HT"], base_stats["WT"]] = calculateHeightWeight();
    stats["HT"] = base_stats["HT"];
    stats["WT"] = base_stats["WT"];
    applyKindredMods();
    stats["WT_POSS"] = stats["STR"] * 10;
    stats["GP"] = calculateGold();
    stats["WT_CARR"] = stats["GP"];

    loadStatTable();
    loadOtherStats();

    divStatPanel.style.display = "flex";
}

function applyKindredMods() {
    // apply kindred-based mods
    const lclKindred = document.getElementById("kindred").value;
    const kmods = kindredMods[lclKindred];
    stat_names.forEach((name) => {
        if (kmods[name]) {
            stats[name] = Math.floor(stats[name] * kmods[name]);
        }
    });
    stats["HT"] = Math.floor(stats["HT"] * kmods["HT"]);
    stats["WT"] = Math.floor(stats["WT"] * kmods["WT"]);
}

function recalcStats(e) {
    resetToBaseStats();
    applyKindredMods();
    stats["WT_POSS"] = stats["STR"] * 10;
    stats["WT_CARR"] = stats["GP"];
    loadStatTable();
    loadOtherStats();
}

function resetToBaseStats() {
    let value = 0;
    for (key in base_stats) {
        value = base_stats[key];
        stats[key] = value;
    }
}

function loadStatTable() {
    // insert into the table
    let str = `
      <thead>
        <tr>
            <th>STR</th><th>CON</th><th>DEX</th><th>SPD</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>${stats[stat_names[0]]}</td>
            <td>${stats[stat_names[1]]}</td>
            <td>${stats[stat_names[2]]}</td>
            <td>${stats[stat_names[3]]}</td>
        </tr>
    </tbody>
    <thead>
        <tr>
        <th>IQ</th><th>WIZ</th><th>LK</th><th>CHR</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>${stats[stat_names[4]]}</td>
            <td>${stats[stat_names[5]]}</td>
            <td>${stats[stat_names[6]]}</td>
            <td>${stats[stat_names[7]]}</td>
        </tr></tbody>`;
    tblCharStats.innerHTML = str;
}

function loadOtherStats() {
    let feet = Math.floor(stats["HT"] / 12);
    let inches = stats["HT"] % 12;
    let str = `
    <tbody>
        <tr>
            <td><span>HT:</span> ${feet}'${inches}"</td>
            <td><span>WT:</span> ${stats["WT"]}</td>
        </tr>
        <tr>
            <td><span>Max Wt:</span> ${stats["WT_POSS"]}</td>
            <td><span>Carried:</span> ${stats["WT_CARR"]}</td>
        </tr>
        <tr>
            <td><span>GP:</span> ${stats["GP"]}</td>
        </tr>
    </tbody>
    `;
    divOtherData.innerHTML = str;
}

function calculateHeightWeight() {
    const lclKindred = document.getElementById("kindred").value;
    const kmods = kindredMods[lclKindred];
    const roll = roll3();
    const index = roll.die1 + roll.die2 + roll.die3;
    let height = Math.floor(heightInInches[index] * kmods.HT);
    let [min, max] = weightInPounds[index];
    let weight = Math.floor(Math.random() * (max - min) + min);
    return [height, weight];
}

function calculateGold() {
    const roll = roll3();
    return roll.die1 + roll.die2 + roll.die3;
}