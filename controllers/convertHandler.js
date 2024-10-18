function ConvertHandler() {
  this.getNum = function (input) {
    let result = input;

    // If input is not a number, return 1
    if (!result || !/^\d+/.test(input)) return 1;

    result = input
      // remove whitespaces
      ?.replace(/\s+/g, "")
      // match numbers from the beginning of the string and optionally . or / followed by more numbers
      ?.match(/^[0-9]+(\.|\/)?([0-9]+)?/);

    // if no match or the input is double or higher fraction e.g. 3/2/3 throw an error
    if (!Array.isArray(result) || input?.split("/").length > 2)
      throw new Error("invalid number");

    // calculate the number from the string
    result = eval(result[0]);

    return result;
  };

  this.getUnit = function (input) {
    const VALID_UNITS = ["gal", "L", "mi", "km", "lbs", "kg"];
    const unitRegex = new RegExp(`^(${VALID_UNITS.join("|")})$`, "i");
    let result = input?.match(/[a-zA-Z]+$/);

    if (Array.isArray(result) && unitRegex.test(result[0])) return result[0];

    throw new Error("invalid unit");
  };

  this.getReturnUnit = function (initUnit) {
    const unitPairs = {
      gal: "L",
      L: "gal",
      l: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    };

    return unitPairs[initUnit?.toLowerCase()];
  };

  this.spellOutUnit = function (unit) {
    let result = {
      gal: "gallons",
      L: "liters",
      l: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };

    return result[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result = {
      gal: initNum * galToL,
      L: initNum / galToL,
      l: initNum / galToL,
      lbs: initNum * lbsToKg,
      kg: initNum / lbsToKg,
      mi: initNum * miToKm,
      km: initNum / miToKm,
    };

    return Math.round(result[initUnit] * 100000) / 100000;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

    return result;
  };
}

module.exports = ConvertHandler;
