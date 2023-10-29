"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function(app) {

  let convertHandler = new ConvertHandler();

  app.route("/api/convert")
    .get(function(req, res) {
      let input = req.query.input;
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getUnittr(initUnit);
      let toString = convertHandler.getStr(initNum, initUnit, returnNum, returnUnit);
      let resp = {};
      resp.initNum = initNum;
      resp.initUnit = initUnit;
      resp.returnNum = returnNum;
      resp.returnUnit = returnUnit;
      resp.string = toString;

      if (returnNum == "invalid number" && returnUnit == "invalid unit") {
        res.json("invalid number and unit")
      }

      else if (returnUnit == "invalid unit" && returnNum != "invalid number") {

        res.json(resp.returnUnit)
      }
      else if (returnNum == "invalid number" && returnUnit != "invalid unit") {
        res.json(resp.returnNum)
      } else {
        res.json(resp)
      }
    });
};