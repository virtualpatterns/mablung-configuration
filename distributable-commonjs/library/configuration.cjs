"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Configuration = void 0;

var _clone = _interopRequireDefault(require("clone"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _mablungIs = require("@virtualpatterns/mablung-is");

var _json = _interopRequireDefault(require("json5"));

var _deepmerge = _interopRequireDefault(require("deepmerge"));

var _objectPath = _interopRequireDefault(require("object-path"));

var _url = _interopRequireDefault(require("url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const PATTERN_JSON = /^.+\.json5?$/i;

class Configuration {
  constructor(root = {}) {
    this._root = root;
  }

  get root() {
    return this._root;
  }

  async load(value) {
    this._root = await this._load(value);
  }

  async merge(value) {
    this._root = Configuration.merge(this._root, await this._load(value));
  }

  async _load(value) {
    if (_mablungIs.Is.string(value)) {
      let path = _path.default.resolve(value);

      if (PATTERN_JSON.test(path)) {
        return _json.default.parse(_fs.default.readFileSync(path, {
          'encoding': 'utf-8'
        }));
      } else {
        let module = null;
        module = await Promise.resolve(`${path}`).then(s => _interopRequireWildcard(require(s))); // URL.pathToFileURL(path))

        module = module.default || module;

        if (_mablungIs.Is.functionOrAsyncFunction(module)) {
          // let returnValue = null
          // returnValue = module(this)
          // returnValue = returnValue instanceof Promise ? await returnValue : returnValue
          return await module(this); // returnValue
        } else {
          return module;
        }
      }
    } else {
      return value;
    }
  }

  has(...parameter) {
    return _objectPath.default.has.apply(_objectPath.default, [this._root, ...parameter]);
  }

  get(...parameter) {
    return _objectPath.default.get.apply(_objectPath.default, [this._root, ...parameter]);
  }

  set(...parameter) {
    return _objectPath.default.set.apply(_objectPath.default, [this._root, ...parameter]);
  }

  static merge(...parameter) {
    // Merge a set of objects
    return parameter.reduce((accumulator, parameter) => (0, _deepmerge.default)(accumulator, parameter), {});
  }

  static getOption(...parameter) {
    return this.merge(...parameter);
  }

  static getParameter(...parameter) {
    // Combine the below
    return this._parameterObjectToArray(this._mergeParameter(...parameter));
  }

  static _mergeParameter(...parameter) {
    // Merge a set of objects or arrays so that
    // { 'a': true, 'b': false, 'c': 'abc' } and [ 'b', 'd', 'e', 'f' ] and ...
    // becomes { 'a': true, 'b': true, 'c': 'abc', 'd': true, 'e': true, 'f': true }
    return parameter.reduce((accumulator, parameter) => (0, _deepmerge.default)(accumulator, _mablungIs.Is.array(parameter) ? this._parameterArrayToObject(parameter) : parameter), {});
  }

  static _parameterArrayToObject(value) {
    // Convert a parameter array of [ 'a', 'b', 'c' ] 
    // into an object { 'a': true, 'b': true, 'c': true }
    return value.reduce((accumulator, value) => {
      accumulator[value] = true;
      return accumulator;
    }, {});
  }

  static _parameterObjectToArray(value) {
    // Convert a parameter object { 'a': true, 'b': false, 'c': 'abc', 'd': 1, 'e': 0 }
    // into an array [ 'a', 'c', 'abc', 'd', 1, 'e', 0 ]
    return Object.entries(value) // returns [ [ name, value ], [ name, value ], ... ]
    .filter(([, value]) => _mablungIs.Is.boolean(value) ? value : true) // if value is a boolean, filter out false values
    .map(([name, value]) => _mablungIs.Is.boolean(value) ? [name] : [name, value]) // if value is a boolean return only [ name ]
    .flat();
  }

  static redact(value, path, censor = '**********') {
    let _value = null;
    _value = (0, _clone.default)(value);

    _objectPath.default.set(_value, path, censor);

    return _value;
  }

  static omit(value, path) {
    let _value = null;
    _value = (0, _clone.default)(value);

    _objectPath.default.del(_value, path);

    return _value;
  }

}

exports.Configuration = Configuration;
//# sourceMappingURL=configuration.cjs.map