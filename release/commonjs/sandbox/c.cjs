"use strict";

var _configuration = require("../library/configuration");

(async () => {
  try {
    let configuration = new _configuration.Configuration();
    configuration.merge('');
    console.log(configuration.has('unquoted'));
    console.log(configuration.get('unquoted'));
  } catch (error) {
    console.error(error);
  }
})();

//# sourceMappingURL=c.cjs.map