"use strict";

var _path = _interopRequireDefault(require("path"));

var _r = _interopRequireDefault(require("./configuration/r"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(async () => {
  try {
    console.log(`process.cwd()='${process.cwd()}'`);
    console.log(`process.argv[2]='${process.argv[2]}'`);
    console.log(`Path.resolve(process.argv[2])='${_path.default.resolve(process.argv[2])}'`);

    let configuration = require(_path.default.resolve(process.argv[2]));

    console.dir(configuration);
    console.dir(_r.default);
  } catch (error) {
    console.error(error);
  }
})();

//# sourceMappingURL=r.cjs.map