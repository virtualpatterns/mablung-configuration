"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _configuration = require("./library/configuration.cjs");

Object.keys(_configuration).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _configuration[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _configuration[key];
    }
  });
});
//# sourceMappingURL=index.cjs.map