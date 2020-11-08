import { createRequire as _createRequire } from "module";import _URL from "url";import Path from 'path';
import Test from 'ava';

import { Configuration } from '../../index.js';

const FilePath = _URL.fileURLToPath(import.meta.url);
const FolderPath = Path.dirname(FilePath);
const Require = _createRequire(import.meta.url); // __require is replaced by @virtualpatterns/mablung-babel-plugin-replace

Test('Configuration(object)', test => {
  test.is(new Configuration({ 'a': 1 }).get('a'), 1);
});

Test('Configuration.load(object)', async test => {

  let configuration = new Configuration({ 'a': 1 });
  await configuration.load({ 'b': 2 });

  test.false(configuration.has('a'));
  test.is(configuration.get('b'), 2);

});

[
[Require.resolve('./resource/configuration/load/path/load0.js'), Require.resolve('./resource/configuration/load/path/load1.js')],
[Require.resolve('./resource/configuration/load/path/load0.json'), Require.resolve('./resource/configuration/load/path/load1.json')],
[Require.resolve('./resource/configuration/load/path/load0.json5'), Require.resolve('./resource/configuration/load/path/load1.json5')],
[Require.resolve('./resource/configuration/load/path/load2.js'), Require.resolve('./resource/configuration/load/path/load3.js')]].
forEach(([loadFileName0, loadFileName1]) => {

  Test.only(`Configuration.load('${Path.relative(Path.dirname(loadFileName0), loadFileName0)}'), Configuration.load('${Path.relative(Path.dirname(loadFileName1), loadFileName1)}')`, async test => {

    let configuration = new Configuration();
    await configuration.load(loadFileName0);
    await configuration.load(loadFileName1);

    test.false(configuration.has('a'));
    test.is(configuration.get('b'), 2);

  });

});

Test('Configuration.merge(object)', async test => {

  let configuration = new Configuration({ 'a': 1 });
  await configuration.merge({ 'b': 2 });

  test.is(configuration.get('a'), 1);
  test.is(configuration.get('b'), 2);

});

[
[Require.resolve('./resource/configuration/merge/path/load.js'), Require.resolve('./resource/configuration/merge/path/merge.js')],
[Require.resolve('./resource/configuration/merge/path/load.json'), Require.resolve('./resource/configuration/merge/path/merge.json')],
[Require.resolve('./resource/configuration/merge/path/load.json5'), Require.resolve('./resource/configuration/merge/path/merge.json5')]].
forEach(([loadFileName, mergeFileName]) => {

  Test.only(`Configuration.load('${Path.relative(Path.dirname(loadFileName), loadFileName)}'), Configuration.merge('${Path.relative(Path.dirname(mergeFileName), mergeFileName)}')`, async test => {

    let configuration = new Configuration();
    await configuration.load(loadFileName);
    await configuration.merge(mergeFileName);

    test.is(configuration.get('a'), 1);
    test.is(configuration.get('b'), 2);

  });


});

Test('Configuration.has(string)', test => {
  test.true(new Configuration({ 'a': 1 }).has('a'));
});

Test('Configuration.get(string[, defaultValue])', test => {

  let configuration = new Configuration({ 'a': 1 });

  test.is(configuration.get('a'), 1);
  test.is(configuration.get('b', 0), 0);
  test.is(configuration.get('c'), undefined);

});

Test('Configuration.set(string, value)', test => {

  let configuration = new Configuration({ 'a': 1 });
  configuration.set('b', 2);

  test.is(configuration.get('b', 0), 2);

});

Test('Configuration.getOption(option0, option1, option2)', test => {

  let option0 = { 'a': 1 };
  let option1 = { 'b': 2 };
  let option2 = { 'a': false, 'c': 3 };

  let option4 = Configuration.getOption(option0, option1, option2);

  test.false(option4.a);
  test.is(option4.b, 2);
  test.is(option4.c, 3);

});

Test('Configuration.getParameter(parameter0, parameter1, parameter2)', test => {

  let parameter0 = { 'a': '1' };
  let parameter1 = ['b', 'c'];
  let parameter2 = { 'd': '4', 'c': '5' };

  let actualValue = Configuration.getParameter(parameter0, parameter1, parameter2);
  let expectedValue = ['a', '1', 'b', 'c', '5', 'd', '4'];

  test.log(actualValue);

  test.is(actualValue.length, 7);
  test.deepEqual(actualValue, expectedValue);

});

Test('Configuration.getParameter({ \'a\': 0 })', test => {

  let parameter0 = { 'a': 0 };

  let actualValue = Configuration.getParameter(parameter0);
  let expectedValue = ['a', 0];

  test.is(actualValue.length, 2);
  test.deepEqual(actualValue, expectedValue);

});

Test('Configuration.getParameter({ \'a\': 1 })', test => {

  let parameter0 = { 'a': 1 };

  let actualValue = Configuration.getParameter(parameter0);
  let expectedValue = ['a', 1];

  test.is(actualValue.length, 2);
  test.deepEqual(actualValue, expectedValue);

});

Test('Configuration.redact(object, string[, string])', test => {

  let object = { 'a': { 'b': 2, 'c': 3 } };

  let actualValue0 = Configuration.redact(object, 'a.b');
  let expectedValue0 = { 'a': { 'b': '**********', 'c': 3 } };

  test.deepEqual(actualValue0, expectedValue0);

  let actualValue1 = Configuration.redact(object, 'a.b', 0);
  let expectedValue1 = { 'a': { 'b': 0, 'c': 3 } };

  test.deepEqual(actualValue1, expectedValue1);

  let actualValue2 = object;
  let expectedValue2 = { 'a': { 'b': 2, 'c': 3 } };

  test.deepEqual(actualValue2, expectedValue2);

});

Test('Configuration.omit(object, string)', test => {

  let object = { 'a': { 'b': 2, 'c': 3 } };

  let actualValue0 = Configuration.omit(object, 'a.b');
  let expectedValue0 = { 'a': { 'c': 3 } };

  test.deepEqual(actualValue0, expectedValue0);

});
//# sourceMappingURL=configuration.test.js.map