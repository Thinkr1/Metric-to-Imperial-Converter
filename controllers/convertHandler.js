function ConvertHandler() {
  this.count = function(numStr, symbol) {
    let charCount = 0;
    for (let i = 0; i < numStr.length; i++) {
      if (numStr.charAt(i) == symbol) {
        charCount++
      }
    }
    return charCount;
  }

  this.getNum = function(input) {
    let f = input.match(/[a-z]+|[^a-z]+/gi)[0]
    let opNum = this.count(f, "/");

    if (!f.match(/[0-9]/g)) {
      f = 1;
    }

    if (opNum > 1) {
      f = "invalid number"
    }

    if (opNum == 1) {
      f = f.split("/");
      let num1 = parseFloat(f[0]);
      let num2 = parseFloat(f[1])
      f = num1 / num2
    }

    return f;
  };

  this.getUnit = function(input) {
    let f;
    let units;
    const unitsArr = ["km", "lbs", "kg", "l", "gal", "mi"]

    f = input.match(/[a-z]+|[^a-z]+/gi)

    if (f.length > 1) {
      units = f[1];
    } else {
      units = f[0]
    }

    if (!unitsArr.includes(units.toLowerCase())) {
      f = "invalid unit";
    } else {
      f = units.toLowerCase();
      if (f === "l") {
        f = f.toUpperCase()
      }
    }

    return f
  };

  this.getUnittr = function(initUnit) {
    let f;

    if (initUnit == undefined || initUnit == "invalid unit") {
      f = "invalid unit";
    } else {
      if (initUnit.toLowerCase() === "gal") {
        f = "L"
      } else if (initUnit.toLowerCase() === "l") {
        f = "gal"
      } else if (initUnit.toLowerCase() === "kg") {
        f = "lbs"
      } else if (initUnit.toLowerCase() === "lbs") {
        f = "kg"
      } else if (initUnit.toLowerCase() === "km") {
        f = "mi"
      } else if (initUnit.toLowerCase() === "mi") {
        f = "km"
      } else {
        f = "invalid unit"
      }
    }
    return f;
  };

  this.spellOutUnit = function(unit) {
    let f;

    if (unit == undefined || unit == "invalid unit") {
      f = "invalid unit";
    } else {
      const unitsDict = {
        kg: "kilograms",
        lbs: "pounds",
        mi: "miles",
        l: "liters",
        gal: "gallons",
        km: "kilometers"
      }
      f = unitsDict[unit.toLowerCase()];
    }
    return f;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let f;

    if (initNum == "invalid number") {
      f = "invalid number"
      return f;
    }

    if (initNum === 1 && initUnit == "invalid unit") {
      initNum = "invalid number"
      f = "invalid number"
    }

    if (initUnit.toLowerCase() === "gal" || initUnit.toLowerCase() === "l") {
      if (initUnit.toLowerCase() === "gal") {
        f = initNum * galToL
      } else {
        f = initNum / galToL
      }
    } else if (initUnit.toLowerCase() === "lbs" || initUnit.toLowerCase() === "kg") {
      if (initUnit.toLowerCase() === "lbs") {
        f = initNum * lbsToKg
      } else {
        f = initNum / lbsToKg
      }
    } else if (initUnit.toLowerCase() === "mi" || initUnit.toLowerCase() === "km") {
      if (initUnit.toLowerCase() === "mi") {
        f = initNum * miToKm
      } else {
        f = initNum / miToKm
      }
    }

    if (f != "invalid number") {
      f = Math.round(f * 1e5) / 1e5;
    }

    return f
  };

  this.getStr = function(initNum, initUnit, returnNum, returnUnit) {
    let f;

    if (initNum === undefined) {
      initNum = "invalid number";
    }

    if (initUnit === undefined) {
      initUnit = "invalid unit";
    }

    if (initUnit != "invalid unit" && initNum != "invalid number") {
      initUnit = this.spellOutUnit(initUnit)
      returnUnit = this.spellOutUnit(returnUnit)
      f = initNum + " " + initUnit + " converts to " + returnNum + " " + returnUnit
    }

    if (initNum === 1 && initUnit != "invalid unit") {
      initUnit = initUnit.slice(0, initUnit.length - 1);
    }

    if (returnNum === 1 && initUnit != "invalid unit") {
      returnUnit = returnUnit.slice(0, returnUnit.length - 1)
    }

    return f;
  };

}

module.exports = ConvertHandler;