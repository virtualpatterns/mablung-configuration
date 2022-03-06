import { Configuration } from '@virtualpatterns/mablung-configuration'
import Test from 'ava'

Test('Configuration()', (test) => {
  test.false((new Configuration()).has('a'))
})

Test('Configuration({ ... })', (test) => {
  test.is((new Configuration({ 'a': 1 })).get('a'), 1)
})

Test('has(\'...\')', (test) => {
  test.true((new Configuration({ 'a': 1 })).has('a'))
})

Test('get(\'...\'[, ...])', (test) => {

  let configuration = new Configuration({ 'a': 1 })

  test.is(configuration.get('a'), 1)
  test.is(configuration.get('b', 2), 2)
  test.is(configuration.get('c'), undefined)

})

Test('set(\'...\', ...)', (test) => {

  let configuration = new Configuration({ 'a': 1 })
  configuration.set('b', 2)

  test.is(configuration.get('b'), 2)

})

Test('redact({ ... }, \'...\')', (test) => {

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

Test('omit({ ... }, \'...\')', (test) => {

  let object = { 'a': { 'b': 2, 'c': 3 } }

  let actualValue0 = Configuration.omit(object, 'a.b')
  let expectedValue0 = { 'a': { 'c': 3 } }

  test.deepEqual(actualValue0, expectedValue0)

})
