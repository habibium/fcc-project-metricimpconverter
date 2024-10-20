const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("Test convertHandler.getNum()", () => {
    test("convertHandler should correctly read a whole number input.", () => {
      assert.strictEqual(convertHandler.getNum("10gal"), 10);
    });

    test("convertHandler should correctly read a decimal number input.", () => {
      assert.strictEqual(convertHandler.getNum("3.14L"), 3.14);
    });

    test("convertHandler should correctly read a fractional input.", () => {
      assert.strictEqual(convertHandler.getNum("1/4mi"), 1 / 4);
    });

    test("convertHandler should correctly read a fractional input with a decimal.", () => {
      assert.strictEqual(convertHandler.getNum("2.5/6km"), 2.5 / 6);
    });

    test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).", () => {
      assert.throws(() => convertHandler.getNum("3/2/3lbs"), "invalid number");
    });

    test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", () => {
      assert.strictEqual(convertHandler.getNum("gal"), 1);
      assert.strictEqual(convertHandler.getNum(""), 1);
      assert.strictEqual(convertHandler.getNum(), 1);
    });
  });

  suite("Test convertHandler.getUnit()", () => {
    test("convertHandler should correctly read each valid input unit.", () => {
      assert.strictEqual(convertHandler.getUnit("10gal"), "gal");
      assert.strictEqual(convertHandler.getUnit("5L"), "L");
      assert.strictEqual(convertHandler.getUnit("3mi"), "mi");
      assert.strictEqual(convertHandler.getUnit("7km"), "km");
      assert.strictEqual(convertHandler.getUnit("2lbs"), "lbs");
      assert.strictEqual(convertHandler.getUnit("4kg"), "kg");
    });

    test("convertHandler should correctly return an error for an invalid input unit.", () => {
      assert.throws(() => convertHandler.getUnit("10gall"), "invalid unit");
    });
  });

  suite("Test convertHandler.getReturnUnit()", () => {
    test("convertHandler should return the correct return unit for each valid input unit.", () => {
      assert.strictEqual(convertHandler.getReturnUnit("gal"), "L");
      assert.strictEqual(convertHandler.getReturnUnit("L"), "gal");
      assert.strictEqual(convertHandler.getReturnUnit("mi"), "km");
      assert.strictEqual(convertHandler.getReturnUnit("km"), "mi");
      assert.strictEqual(convertHandler.getReturnUnit("lbs"), "kg");
      assert.strictEqual(convertHandler.getReturnUnit("kg"), "lbs");
    });
  });

  suite("Test convertHandler.spellOutUnit()", () => {
    test("convertHandler should correctly return the spelled-out string unit for each valid input unit.", () => {
      assert.strictEqual(convertHandler.spellOutUnit("gal"), "gallons");
      assert.strictEqual(convertHandler.spellOutUnit("L"), "liters");
      assert.strictEqual(convertHandler.spellOutUnit("mi"), "miles");
      assert.strictEqual(convertHandler.spellOutUnit("km"), "kilometers");
      assert.strictEqual(convertHandler.spellOutUnit("lbs"), "pounds");
      assert.strictEqual(convertHandler.spellOutUnit("kg"), "kilograms");
    });
  });

  suite("Test convertHandler.convert()", () => {
    test("convertHandler should correctly convert gal to L.", () => {
      assert.closeTo(convertHandler.convert(1, "gal"), 3.78541, 0.0001);
      assert.closeTo(convertHandler.convert(10, "gal"), 37.8541, 0.0001);
    });

    test("convertHandler should correctly convert L to gal.", () => {
      assert.closeTo(convertHandler.convert(1, "L"), 0.2641721769, 0.0001);
      assert.closeTo(convertHandler.convert(10, "L"), 2.6417217686, 0.0001);
    });

    test("convertHandler should correctly convert mi to km.", () => {
      assert.closeTo(convertHandler.convert(1, "mi"), 1.60934, 0.0001);
      assert.closeTo(convertHandler.convert(10, "mi"), 16.0934, 0.0001);
    });

    test("convertHandler should correctly convert km to mi.", () => {
      assert.closeTo(convertHandler.convert(1, "km"), 0.6213711922, 0.0001);
      assert.closeTo(convertHandler.convert(10, "km"), 6.2137119224, 0.0001);
    });

    test("convertHandler should correctly convert lbs to kg.", () => {
      assert.closeTo(convertHandler.convert(1, "lbs"), 0.453592, 0.0001);
      assert.closeTo(convertHandler.convert(10, "lbs"), 4.53592, 0.0001);
    });

    test("convertHandler should correctly convert kg to lbs.", () => {
      assert.closeTo(convertHandler.convert(1, "kg"), 2.20462, 0.0001);
      assert.closeTo(convertHandler.convert(10, "kg"), 22.0462, 0.0001);
    });
  });
});
