import Path from 'path'
import Test from 'ava'

import { Configuration } from '../../index.js'

const FilePath = __filePath
const FolderPath = Path.dirname(FilePath)
const Require = __require

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

Test('Configuration.getOption(option0, option1, option2)', (test) => {

  let option0 = { 'a': 1 }
  let option1 = { 'b': 2 }
  let option2 = { 'a': false, 'c': 3 }

  let option4 = Configuration.getOption(option0, option1, option2)

  test.false(option4.a)
  test.is(option4.b, 2)
  test.is(option4.c, 3)

})

Test('Configuration.getArgument(argument0, argument1, argument2)', (test) => {

  let argument0 = { 'a': '1' }
  let argument1 = [ 'b', 'c' ]
  let argument2 = { 'd': '4', 'c': '5' }

  let actualValue = Configuration.getArgument(argument0, argument1, argument2)
  let expectedValue = [ 'a', '1', 'b', 'c', '5', 'd', '4' ]

  test.is(actualValue.length, 7)
  test.deepEqual(actualValue, expectedValue)

})

Test('Configuration.getArgument({ \'a\': 0 })', (test) => {

  let argument0 = { 'a': 0 }

  let actualValue = Configuration.getArgument(argument0)
  let expectedValue = [ 'a', 0 ]

  test.is(actualValue.length, 2)
  test.deepEqual(actualValue, expectedValue)

})

Test('Configuration.getArgument({ \'a\': 1 })', (test) => {

  let argument0 = { 'a': 1 }

  let actualValue = Configuration.getArgument(argument0)
  let expectedValue = [ 'a', 1 ]

  test.is(actualValue.length, 2)
  test.deepEqual(actualValue, expectedValue)

})

Test('Configuration.redact(object, string[, string])', (test) => {

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

Test('Configuration.omit(object, string)', (test) => {

  let object = { 'a': { 'b': 2, 'c': 3 } }

  let actualValue0 = Configuration.omit(object, 'a.b')
  let expectedValue0 = { 'a': { 'c': 3 } }

  test.deepEqual(actualValue0, expectedValue0)

})
