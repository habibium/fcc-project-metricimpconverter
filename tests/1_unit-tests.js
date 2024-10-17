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
      assert.strictEqual(convertHandler.getNum("6/10km"), 6 / 10);
    });

    test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).", () => {
      assert.throw(() => convertHandler.getNum("3/2/3lbs"), "invalid number");
    });

    test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", () => {
      assert.strictEqual(convertHandler.getNum("gal"), 1);
      assert.strictEqual(convertHandler.getNum(""), 1);
      assert.strictEqual(convertHandler.getNum(), 1);
    });
  });
});
