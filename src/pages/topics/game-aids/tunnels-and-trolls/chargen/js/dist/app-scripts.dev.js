"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ctlKindred = document.getElementById("kindred");
ctlKindred.addEventListener("change", recalcStats);
var ctlCharType = document.getElementById("char-type");
ctlCharType.addEventListener("change", recalcStats);
var btnGenerate = document.getElementById("generate");
btnGenerate.addEventListener("click", generateStats);
var tblCharStats = document.getElementById("char-stats");
var divOtherData = document.getElementById("other-stats-table");
var divStatPanel = document.getElementById("stat-panel");
var kindred = ["Dwarf (Gristlegrim)", "Dwarf (Midgardian)", "Elf", "Fairy", "Hobb", "Human", "Leprechaun"];
var heightInInches = [0, 0, 0, 52, 55, 58, 61, 63, 65, 67, 68, 69, 70, 72, 74, 76, 79, 82, 85];
var weightInPounds = [[0, 0], [0, 0], [0, 0], [60, 75], [75, 95], [95, 115], [110, 135], [125, 150], [135, 165], [150, 175], [155, 185], [160, 190], [165, 195], [180, 210], [190, 230], [200, 240], [220, 265], [240, 280], [255, 300]];
var base_stats = {};
var stats = {};
var stat_names = ["STR", "CON", "DEX", "SPD", "IQ", "WIZ", "LK", "CHR"];
var kindredMods = {}; // Dwarf (GristleGrim)

kindredMods[kindred[0]] = {
  STR: 2,
  CON: 2,
  DEX: 1,
  LK: 0.75,
  IQ: 1,
  WIZ: 1,
  CHR: 1,
  HT: 0.67,
  WT: 2
}; // Dwarf (Midgardian)

kindredMods[kindred[1]] = {
  STR: 2,
  CON: 2,
  DEX: 1,
  LK: 1,
  IQ: 1,
  WIZ: 1,
  CHR: 0.75,
  HT: 0.67,
  WT: 0.8
}; // Elf

kindredMods[kindred[2]] = {
  STR: 1,
  CON: 0.67,
  DEX: 1.33,
  LK: 1,
  IQ: 1.5,
  WIZ: 1.5,
  CHR: 1.5,
  HT: 1.1,
  WT: 1
}; // Fairy

kindredMods[kindred[3]] = {
  STR: 0.25,
  CON: 0.25,
  DEX: 1.75,
  LK: 1.5,
  IQ: 1,
  WIZ: 2,
  CHR: 1.5,
  HT: 0.1,
  WT: 0.01
}; // Hobb

kindredMods[kindred[4]] = {
  STR: 0.5,
  CON: 2,
  DEX: 1.5,
  LK: 1.5,
  IQ: 1,
  WIZ: 1,
  CHR: 1,
  HT: 0.5,
  WT: 0.75
}; // Human

kindredMods[kindred[5]] = {
  STR: 1,
  CON: 1,
  DEX: 1,
  LK: 1,
  IQ: 1,
  WIZ: 1,
  CHR: 1,
  HT: 1,
  WT: 1
}; // Leprechaun

kindredMods[kindred[6]] = {
  STR: 0.33,
  CON: 0.67,
  DEX: 1.5,
  LK: 1.5,
  IQ: 1.25,
  WIZ: 1,
  CHR: 1,
  HT: 0.33,
  WT: 0.1
};

function rollDie(e) {
  var sides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  var result = Math.floor(Math.random() * Math.floor(sides)) + 1;
  return result;
}

function roll3(e) {
  var die1 = rollDie();
  var die2 = rollDie();
  var die3 = rollDie();
  var taro = false;

  if (die1 === die2 && die1 === die3) {
    taro = true;
  }

  return {
    die1: die1,
    die2: die2,
    die3: die3,
    taro: taro
  };
}

function rollStat(e) {
  var die1 = die2 = die3 = 0;
  var taro = false;

  do {
    var retval = roll3();
    die1 += retval.die1, die2 += retval.die2, die3 += retval.die3, taro = retval.taro;
  } while (taro);

  return die1 + die2 + die3;
}

function generateStats(e) {
  // gather the stats
  for (var i = 0; i < 8; i++) {
    var statValue = rollStat();
    base_stats[stat_names[i]] = statValue;
    stats[stat_names[i]] = statValue;
  }

  var _calculateHeightWeigh = calculateHeightWeight();

  var _calculateHeightWeigh2 = _slicedToArray(_calculateHeightWeigh, 2);

  base_stats["HT"] = _calculateHeightWeigh2[0];
  base_stats["WT"] = _calculateHeightWeigh2[1];
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
  var lclKindred = document.getElementById("kindred").value;
  var kmods = kindredMods[lclKindred];
  stat_names.forEach(function (name) {
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
  var value = 0;

  for (key in base_stats) {
    value = base_stats[key];
    stats[key] = value;
  }
}

function loadStatTable() {
  // insert into the table
  var str = "\n      <thead>\n        <tr>\n            <th>STR</th><th>CON</th><th>DEX</th><th>SPD</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            <td>".concat(stats[stat_names[0]], "</td>\n            <td>").concat(stats[stat_names[1]], "</td>\n            <td>").concat(stats[stat_names[2]], "</td>\n            <td>").concat(stats[stat_names[3]], "</td>\n        </tr>\n    </tbody>\n    <thead>\n        <tr>\n        <th>IQ</th><th>WIZ</th><th>LK</th><th>CHR</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            <td>").concat(stats[stat_names[4]], "</td>\n            <td>").concat(stats[stat_names[5]], "</td>\n            <td>").concat(stats[stat_names[6]], "</td>\n            <td>").concat(stats[stat_names[7]], "</td>\n        </tr></tbody>");
  tblCharStats.innerHTML = str;
}

function loadOtherStats() {
  var feet = Math.floor(stats["HT"] / 12);
  var inches = stats["HT"] % 12;
  var str = "\n    <tbody>\n        <tr>\n            <td><span>HT:</span> ".concat(feet, "'").concat(inches, "\"</td>\n            <td><span>WT:</span> ").concat(stats["WT"], "</td>\n        </tr>\n        <tr>\n            <td><span>Max Wt:</span> ").concat(stats["WT_POSS"], "</td>\n            <td><span>Carried:</span> ").concat(stats["WT_CARR"], "</td>\n        </tr>\n        <tr>\n            <td><span>GP:</span> ").concat(stats["GP"], "</td>\n        </tr>\n    </tbody>\n    ");
  divOtherData.innerHTML = str;
}

function calculateHeightWeight() {
  var lclKindred = document.getElementById("kindred").value;
  var kmods = kindredMods[lclKindred];
  var roll = roll3();
  var index = roll.die1 + roll.die2 + roll.die3;
  var height = Math.floor(heightInInches[index] * kmods.HT);

  var _weightInPounds$index = _slicedToArray(weightInPounds[index], 2),
      min = _weightInPounds$index[0],
      max = _weightInPounds$index[1];

  var weight = Math.floor(Math.random() * (max - min) + min);
  return [height, weight];
}

function calculateGold() {
  var roll = roll3();
  return roll.die1 + roll.die2 + roll.die3;
}