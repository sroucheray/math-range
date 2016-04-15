System.register("src/scale.js", [], function($__export) {
  "use strict";
  var isNumeric,
      scale,
      curriedScale,
      curriedNormalize,
      normalize;
  return {
    setters: [],
    execute: function() {
      isNumeric = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      };
      scale = function(value, inputMin, inputMax, outputMin, outputMax) {
        if (!isNumeric(value)) {
          throw new TypeError('`value` must be a Number');
        }
        if (!isNumeric(inputMin)) {
          throw new TypeError('`inputMin` must be a Number');
        }
        if (!isNumeric(inputMax)) {
          throw new TypeError('`inputMax` must be a Number');
        }
        if (!isNumeric(outputMin)) {
          throw new TypeError('`outputMin` must be a Number');
        }
        if (!isNumeric(outputMax)) {
          throw new TypeError('`outputMax` must be a Number');
        }
        if (inputMin === inputMax) {
          throw new RangeError('inputMax must be different from inputMin');
        }
        var outputRange = outputMax - outputMin;
        var inputRange = inputMax - inputMin;
        return outputRange * (value - inputMin) / inputRange + outputMin;
      };
      $__export("scale", scale);
      curriedScale = function(inputMin, inputMax, outputMin, outputMax) {
        if (isNumeric(inputMin) && isNumeric(inputMin) && inputMax === inputMin) {
          throw new RangeError('inputMax must be different from inputMin');
        }
        return function(value, inputMinB, inputMaxB) {
          if (!isNumeric(inputMinB)) {
            inputMinB = inputMin;
          }
          if (!isNumeric(inputMaxB)) {
            inputMaxB = inputMax;
          }
          return scale(value, inputMinB, inputMaxB, outputMin, outputMax);
        };
      };
      $__export("curriedScale", curriedScale);
      curriedNormalize = function(inputMin, inputMax) {
        return curriedScale(inputMin, inputMax, 0, 1);
      };
      $__export("curriedNormalize", curriedNormalize);
      normalize = function(value, inputMin, inputMax) {
        return curriedNormalize(inputMin, inputMax)(value);
      };
      $__export("normalize", normalize);
    }
  };
});

System.register("src/random.js", [], function($__export) {
  "use strict";
  var random,
      randomInt,
      randomIntInclusive;
  return {
    setters: [],
    execute: function() {
      random = function() {
        var min = arguments[0] !== (void 0) ? arguments[0] : 0;
        var max = arguments[1] !== (void 0) ? arguments[1] : 1;
        return Math.random() * (max - min) + min;
      };
      $__export("random", random);
      randomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      };
      $__export("randomInt", randomInt);
      randomIntInclusive = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      $__export("randomIntInclusive", randomIntInclusive);
    }
  };
});

System.register("index.js", ["src/scale.js", "src/random.js"], function($__export) {
  "use strict";
  var $__exportNames = {};
  var $__exportNames = {};
  return {
    setters: [function($__m) {
      var exportObj = Object.create(null);
      Object.keys($__m).forEach(function(p) {
        if (p !== 'default' && !$__exportNames[p])
          exportObj[p] = $__m[p];
      });
      $__export(exportObj);
    }, function($__m) {
      var exportObj = Object.create(null);
      Object.keys($__m).forEach(function(p) {
        if (p !== 'default' && !$__exportNames[p])
          exportObj[p] = $__m[p];
      });
      $__export(exportObj);
    }],
    execute: function() {}
  };
});

//# sourceMappingURL=range.js.map