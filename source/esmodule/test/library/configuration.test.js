import { Configuration } from '@virtualpatterns/mablung-configuration'
import Path from 'path'
import Test from 'ava'

const FilePath = __filePath
const FolderPath = Path.dirname(FilePath)
const Require = __require

class MyClass {

  constructor(...argument) {
    this.value = argument
  }

}

Test('Configuration()', (test) => {
  test.false((new Configuration()).has('a'))
})

Test('Configuration({ ... })', (test) => {
  test.is((new Configuration({ 'a': 1 })).get('a'), 1)
})

Test('root', async (test) => {

  let configuration = null
  configuration = new Configuration({ 'b': 2 })

  test.deepEqual(configuration.root, { 'b': 2 })

})

Test('load({ ... })', async (test) => {

  let configuration = null
  configuration = new Configuration({ 'b': 2 })
  await configuration.load({ 'a': 1 })

  test.false(configuration.has('b'))
  test.is(configuration.get('a'), 1)

})

;[
  Require.resolve('./resource/load.json'),
  Require.resolve('./resource/load-0.js'),
  Require.resolve('./resource/load-1.js'),
  Require.resolve('./resource/load-2.js'),
  Require.resolve('./resource/load-3.js'),
  Require.resolve('./resource/load-4.cjs'),
  Require.resolve('./resource/load-5.cjs'),
  Require.resolve('./resource/load-6.cjs'),
  Require.resolve('./resource/load-7.cjs')
].forEach((path) => {

  Test(`load('${Path.relative(FolderPath, path)}')`, async (test) => {

    let configuration = null
    configuration = new Configuration({ 'b': 2 })
    await configuration.load(path)

    test.false(configuration.has('b'))
    test.is(configuration.get('a'), 1)

  })

})

Test('merge({ ... })', async (test) => {

  let configuration = null
  configuration = new Configuration({ 'b': 2 })
  await configuration.merge({ 'a': 1 })

  test.is(configuration.get('b'), 2)
  test.is(configuration.get('a'), 1)

})

Test('merge({ () => { ... } })', async (test) => {

  let configuration = null
  configuration = new Configuration({ 'b': () => 2 })
  await configuration.merge({ 'a': () => 1 })

  test.is(configuration.get('b')(), 2)
  test.is(configuration.get('a')(), 1)

})

Test('merge({ async () => { ... } })', async (test) => {

  let configuration = null
  configuration = new Configuration({ 'b': async () => 2 })
  await configuration.merge({ 'a': async () => 1 })

  test.is(await configuration.get('b')(), 2)
  test.is(await configuration.get('a')(), 1)

})

Test('merge({ class })', async (test) => {

  let configuration = null
  configuration = new Configuration({ 'b': new MyClass(2) })
  await configuration.merge({ 'a': new MyClass(1) })

  test.true(configuration.get('b') instanceof MyClass)
  test.deepEqual(configuration.get('b').value, [2])
  
  test.true(configuration.get('a') instanceof MyClass)
  test.deepEqual(configuration.get('a').value, [ 1 ])

})

;[
  Require.resolve('./resource/load.json'),
  Require.resolve('./resource/load-0.js'),
  Require.resolve('./resource/load-1.js'),
  Require.resolve('./resource/load-2.js'),
  Require.resolve('./resource/load-3.js'),
  Require.resolve('./resource/load-4.cjs'),
  Require.resolve('./resource/load-5.cjs'),
  Require.resolve('./resource/load-6.cjs'),
  Require.resolve('./resource/load-7.cjs')
].forEach((path) => {

  Test(`merge('${Path.relative(FolderPath, path)}')`, async (test) => {

    let configuration = null
    configuration = new Configuration({ 'b': 2 })
    await configuration.merge(path)

    test.is(configuration.get('b'), 2)
    test.is(configuration.get('a'), 1)

  })

})

Test('has(\'...\')', (test) => {
  test.true((new Configuration({ 'a': 1 })).has('a'))
})

Test('get(\'...\'[, defaultValue])', (test) => {

  let configuration = new Configuration({ 'a': 1 })

  test.is(configuration.get('a'), 1)
  test.is(configuration.get('b', 0), 0)
  test.is(configuration.get('c'), undefined)

})

Test('set(\'...\', value)', (test) => {

  let configuration = new Configuration({ 'a': 1 })
  configuration.set('b', 2)

  test.is(configuration.get('b', 0), 2)

})

Test('redact(object, string[, string])', (test) => {

  let object = { 'a': { 'b': 2, 'c': 3 } }

  let actualValue0 = Configuration.redact(object, 'a.b')
  let expectedValue0 = { 'a': { 'b': '**********', 'c': 3 } }

  test.deepEqual(actualValue0, expectedValue0)

  let actualValue1 = Configuration.redact(object, 'a.b', 0)
  let expectedValue1 = { 'a': { 'b': 0, 'c': 3 } }

  test.deepEqual(actualValue1, expectedValue1)

  let actualValue2 = object
  let expectedValue2 = { 'a': { 'b': 2, 'c': 3 } }

  test.deepEqual(actualValue2, expectedValue2)

})

Test('omit(object, string)', (test) => {

  let object = { 'a': { 'b': 2, 'c': 3 } }

  let actualValue0 = Configuration.omit(object, 'a.b')
  let expectedValue0 = { 'a': { 'c': 3 } }

  test.deepEqual(actualValue0, expectedValue0)

})
