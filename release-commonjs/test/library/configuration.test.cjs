"use strict";

var _path = _interopRequireDefault(require("path"));

var _ava = _interopRequireDefault(require("ava"));

var _index = require("../../index.cjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const FilePath = __filePath
// const FolderPath = Path.dirname(FilePath)
const Require = require; // __require is replaced by @virtualpatterns/mablung-babel-plugin-replace

(0, _ava.default)('Configuration(object)', test => {
  test.is(new _index.Configuration({
    'a': 1
  }).get('a'), 1);
});
(0, _ava.default)('Configuration.load(object)', async test => {
  let configuration = new _index.Configuration({
    'a': 1
  });
  await configuration.load({
    'b': 2
  });
  test.false(configuration.has('a'));
  test.is(configuration.get('b'), 2);
});
[[Require.resolve("./resource/configuration/load/path/load0.cjs"), Require.resolve("./resource/configuration/load/path/load1.cjs")], [Require.resolve('./resource/configuration/load/path/load0.json'), Require.resolve('./resource/configuration/load/path/load1.json')], [Require.resolve('./resource/configuration/load/path/load0.json5'), Require.resolve('./resource/configuration/load/path/load1.json5')], [Require.resolve("./resource/configuration/load/path/load2.cjs"), Require.resolve("./resource/configuration/load/path/load3.cjs")]].forEach(([loadFileName0, loadFileName1]) => {
  _ava.default.only(`Configuration.load('${_path.default.relative(_path.default.dirname(loadFileName0), loadFileName0)}'), Configuration.load('${_path.default.relative(_path.default.dirname(loadFileName1), loadFileName1)}')`, async test => {
    let configuration = new _index.Configuration();
    await configuration.load(loadFileName0);
    await configuration.load(loadFileName1);
    test.false(configuration.has('a'));
    test.is(configuration.get('b'), 2);
  });
});
(0, _ava.default)('Configuration.merge(object)', async test => {
  let configuration = new _index.Configuration({
    'a': 1
  });
  await configuration.merge({
    'b': 2
  });
  test.is(configuration.get('a'), 1);
  test.is(configuration.get('b'), 2);
});
[[Require.resolve("./resource/configuration/merge/path/load.cjs"), Require.resolve("./resource/configuration/merge/path/merge.cjs")], [Require.resolve('./resource/configuration/merge/path/load.json'), Require.resolve('./resource/configuration/merge/path/merge.json')], [Require.resolve('./resource/configuration/merge/path/load.json5'), Require.resolve('./resource/configuration/merge/path/merge.json5')]].forEach(([loadFileName, mergeFileName]) => {
  _ava.default.only(`Configuration.load('${_path.default.relative(_path.default.dirname(loadFileName), loadFileName)}'), Configuration.merge('${_path.default.relative(_path.default.dirname(mergeFileName), mergeFileName)}')`, async test => {
    let configuration = new _index.Configuration();
    await configuration.load(loadFileName);
    await configuration.merge(mergeFileName);
    test.is(configuration.get('a'), 1);
    test.is(configuration.get('b'), 2);
  });
});
(0, _ava.default)('Configuration.has(string)', test => {
  test.true(new _index.Configuration({
    'a': 1
  }).has('a'));
});
(0, _ava.default)('Configuration.get(string[, defaultValue])', test => {
  let configuration = new _index.Configuration({
    'a': 1
  });
  test.is(configuration.get('a'), 1);
  test.is(configuration.get('b', 0), 0);
  test.is(configuration.get('c'), undefined);
});
(0, _ava.default)('Configuration.set(string, value)', test => {
  let configuration = new _index.Configuration({
    'a': 1
  });
  configuration.set('b', 2);
  test.is(configuration.get('b', 0), 2);
});
(0, _ava.default)('Configuration.getOption(option0, option1, option2)', test => {
  let option0 = {
    'a': 1
  };
  let option1 = {
    'b': 2
  };
  let option2 = {
    'a': false,
    'c': 3
  };

  let option4 = _index.Configuration.getOption(option0, option1, option2);

  test.false(option4.a);
  test.is(option4.b, 2);
  test.is(option4.c, 3);
});
(0, _ava.default)('Configuration.getParameter(parameter0, parameter1, parameter2)', test => {
  let parameter0 = {
    'a': '1'
  };
  let parameter1 = ['b', 'c'];
  let parameter2 = {
    'd': '4',
    'c': '5'
  };

  let actualValue = _index.Configuration.getParameter(parameter0, parameter1, parameter2);

  let expectedValue = ['a', '1', 'b', 'c', '5', 'd', '4'];
  test.log(actualValue);
  test.is(actualValue.length, 7);
  test.deepEqual(actualValue, expectedValue);
});
(0, _ava.default)('Configuration.getParameter({ \'a\': 0 })', test => {
  let parameter0 = {
    'a': 0
  };

  let actualValue = _index.Configuration.getParameter(parameter0);

  let expectedValue = ['a', 0];
  test.is(actualValue.length, 2);
  test.deepEqual(actualValue, expectedValue);
});
(0, _ava.default)('Configuration.getParameter({ \'a\': 1 })', test => {
  let parameter0 = {
    'a': 1
  };

  let actualValue = _index.Configuration.getParameter(parameter0);

  let expectedValue = ['a', 1];
  test.is(actualValue.length, 2);
  test.deepEqual(actualValue, expectedValue);
});
(0, _ava.default)('Configuration.redact(object, string[, string])', test => {
  let object = {
    'a': {
      'b': 2,
      'c': 3
    }
  };

  let actualValue0 = _index.Configuration.redact(object, 'a.b');

  let expectedValue0 = {
    'a': {
      'b': '**********',
      'c': 3
    }
  };
  test.deepEqual(actualValue0, expectedValue0);

  let actualValue1 = _index.Configuration.redact(object, 'a.b', 0);

  let expectedValue1 = {
    'a': {
      'b': 0,
      'c': 3
    }
  };
  test.deepEqual(actualValue1, expectedValue1);
  let actualValue2 = object;
  let expectedValue2 = {
    'a': {
      'b': 2,
      'c': 3
    }
  };
  test.deepEqual(actualValue2, expectedValue2);
});
(0, _ava.default)('Configuration.omit(object, string)', test => {
  let object = {
    'a': {
      'b': 2,
      'c': 3
    }
  };

  let actualValue0 = _index.Configuration.omit(object, 'a.b');

  let expectedValue0 = {
    'a': {
      'c': 3
    }
  };
  test.deepEqual(actualValue0, expectedValue0);
});
//# sourceMappingURL=configuration.test.cjs.map