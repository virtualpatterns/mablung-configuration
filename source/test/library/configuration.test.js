import Test from 'ava'

import { Configuration } from '../../index.js'

const Require = __require // __require is replaced by @virtualpatterns/mablung-babel-plugin-replace

Test('Configuration(object)', (test) => {

  let configuration = new Configuration({ 'a': 1 })
  let value = configuration.get('a')

  test.is(value, 1, 'value of \'a\' is not 1')

})

Test('Configuration.load(object)', async (test) => {

  let configuration = new Configuration({ 'a': 1 })
  await configuration.load({ 'b' : 2 })

  let hasValue = configuration.has('a')
  let value = configuration.get('b')

  test.false(hasValue, '\'a\' exists')
  test.is(value, 2, 'value of \'b\' is not 2')

})

;[
  [ 'load0.js', 'load1.js' ],
  [ 'load0.json', 'load1.json' ],
  [ 'load0.json5', 'load1.json5' ]
].forEach(([ loadFileName0, loadFileName1 ]) => {

  Test(`Configuration.load('${loadFileName0}'), Configuration.load('${loadFileName1}')`, async (test) => {

    let configuration = new Configuration()
    await configuration.load(Require.resolve(`./resource/configuration/load/path/${loadFileName0}`))
    await configuration.load(Require.resolve(`./resource/configuration/load/path/${loadFileName1}`))

    let hasValue = configuration.has('a')
    let value = configuration.get('b')
  
    test.false(hasValue, '\'a\' exists')
    test.is(value, 2, 'value of \'b\' is not 2')
  
  })

})

Test('Configuration.merge(object)', async (test) => {

  let configuration = new Configuration({ 'a': 1 })
  await configuration.merge({ 'b' : 2 })

  let value0 = configuration.get('a')
  let value1 = configuration.get('b')

  test.is(value0, 1, 'value of \'a\' is not 1')
  test.is(value1, 2, 'value of \'b\' is not 2')

})

;[
  [ 'load.js', 'merge.js' ],
  [ 'load.json', 'merge.json' ],
  [ 'load.json5', 'merge.json5' ]
].forEach(([ loadFileName, mergeFileName ]) => {

  Test(`Configuration.load('${loadFileName}'), Configuration.merge('${mergeFileName}')`, async (test) => {

    let configuration = new Configuration()
    await configuration.load(Require.resolve(`./resource/configuration/merge/path/${loadFileName}`))
    await configuration.merge(Require.resolve(`./resource/configuration/merge/path/${mergeFileName}`))

    let value0 = configuration.get('a')
    let value1 = configuration.get('b')
  
    test.is(value0, 1, 'value of \'a\' is not 1')
    test.is(value1, 2, 'value of \'b\' is not 2')
  
  })


})

Test('Configuration.has(string)', (test) => {

  let configuration = new Configuration({ 'a': 1 })
  let hasValue = configuration.has('a')

  test.true(hasValue, '\'a\' does not exist')

})

Test('Configuration.get(string[, defaultValue])', (test) => {

  let configuration = new Configuration({ 'a': 1 })

  let value0 = configuration.get('a')
  let value1 = configuration.get('b', 0)
  let value2 = configuration.get('c')

  test.is(value0, 1, 'value of \'a\' is not 1')
  test.is(value1, 0, 'value of \'b\' is not 0')
  test.is(value2, undefined, 'value of \'c\' is not undefined')

})

Test('Configuration.set(string, value)', (test) => {

  let configuration = new Configuration({ 'a': 1 })
  configuration.set('b', 2)

  let value0 = configuration.get('b', 0)

  test.is(value0, 2, 'value of \'b\' is not 2')

})

Test('Configuration.getOption(option0, option1, option2)', (test) => {

  let option0 = { 'a': 1 }
  let option1 = { 'b': 2 }
  let option2 = { 'a': false, 'c': 3 }

  let option4 = Configuration.getOption(option0, option1, option2)

  test.false(option4.a, 'value of \'a\' is not false')
  test.is(option4.b, 2, 'value of \'b\' is not 2')
  test.is(option4.c, 3, 'value of \'c\' is not 3')

})

Test('Configuration.getParameter(parameter0, parameter1, parameter2)', (test) => {

  let parameter0 = { 'a': '1' }
  let parameter1 = [ 'b', 'c' ]
  let parameter2 = { 'd': '4', 'c': '5' }

  let actualValue = Configuration.getParameter(parameter0, parameter1, parameter2)
  let expectedValue = [ 'a', '1', 'b', 'c', '5', 'd', '4' ]

  test.is(actualValue.length, 7, 'parameter length is not 7')
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
