"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get("/api/convert", (req, res) => {
    const input = req.query.input;

    try {
      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input)?.toLowerCase();
      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const string = convertHandler.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit
      );

      console.log({
        input,
        initNum,
        actualInitUnit: initUnit,
        initUnit:
          initUnit === "l" || initUnit === "L" ? "L" : initUnit?.toLowerCase(),
        returnNum,
        actualReturnUnit: returnUnit,
        returnUnit:
          returnUnit === "l" || returnUnit === "L"
            ? "L"
            : returnUnit?.toLowerCase(),
        string,
      });

      res.json({
        initNum,
        actualInitUnit: initUnit,
        initUnit:
          initUnit === "l" || initUnit === "L" ? "L" : initUnit?.toLowerCase(),
        returnNum,
        actualReturnUnit: returnUnit,
        returnUnit:
          returnUnit === "l" || returnUnit === "L"
            ? "L"
            : returnUnit?.toLowerCase(),
        string,
      });
    } catch (error) {
      console.error(error);
      if (error.message === "invalid unit") return res.json(error.message);
      try {
        convertHandler.getUnit(input);
      } catch (error) {
        return res.json("invalid number and unit");
      }
    }
  });
};
