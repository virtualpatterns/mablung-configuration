"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

async function _default() {
  let returnValue = await new Promise(resolve => {
    setTimeout(() => {
      resolve({
        'b': 2
      });
    }, 1000);
  });
  return returnValue;
}
//# sourceMappingURL=load3.cjs.map