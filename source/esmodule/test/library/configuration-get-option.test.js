import { Configuration } from '@virtualpatterns/mablung-configuration'
import Test from 'ava'

class MyClass {

  constructor(...argument) {
    this.value = argument
  }

}

Test('getOption()', (test) => {
  test.deepEqual(Configuration.getOption(), {})
})

Test('getOption({ ... })', (test) => {
  test.deepEqual(Configuration.getOption({ 'a': 0 }), { 'a': 0 })
})

Test('getOption({ ... }, { ... })', (test) => {

  let option0 = { 'a': 0 }
  let option1 = { 'a': 1 }

  let value = Configuration.getOption(option0, option1)

  // test.log(value)
  test.deepEqual(value, { 'a': 1 })

})

Test('getOption({ ... }, { ... }, { ... })', (test) => {

  let option0 = { 'a': 0 }
  let option1 = { 'a': 1 }
  let option2 = { 'a': 2 }

  let value = Configuration.getOption(option0, option1, option2)

  // test.log(value)
  test.deepEqual(value, { 'a': 2 })

})

Test('getOption({ \'...\' }, { \'...\' }, { \'...\' })', (test) => {

  let option0 = { 'a': 0 }
  let option1 = { 'b': 1 }
  let option2 = { 'c': 2 }

  let value = Configuration.getOption(option0, option1, option2)

  // test.log(value)
  test.deepEqual(value, {
    'a': 0,
    'b': 1,
    'c': 2
  })

})

Test('getOption({ \'...\' }, { \'...\', \'...\' }, { \'...\', \'...\', \'...\' })', (test) => {

  let option0 = { 'a': 0 }
  let option1 = { 'a': 1, 'b': 0 }
  let option2 = { 'a': 2, 'b': 1, 'c': 0 }

  let value = Configuration.getOption(option0, option1, option2)

  // test.log(value)
  test.deepEqual(value, {
    'a': 2,
    'b': 1,
    'c': 0
  })

})

Test('getOption({ \'...\': [ ... ] }, { \'...\': [ ... ] }, { \'...\': [ ... ] })', (test) => {

  let option0 = { 'a': [ 0 ] }
  let option1 = { 'a': [ 1 ] }
  let option2 = { 'a': [ 2 ] }

  let value = Configuration.getOption(option0, option1, option2)

  // test.log(value)
  test.deepEqual(value, { 'a': [ 0, 1, 2 ] })

})

Test('getOption({ \'...\': [ async () => ... ] }, { \'...\': [ async () => ... ] }, { \'...\': [ async () => ... ] })', async (test) => {

  let option0 = { 'a': [ async () => 0 ] }
  let option1 = { 'a': [ async () => 0 ] }
  let option2 = { 'a': [ async () => 0 ] }

  let value = Configuration.getOption(option0, option1, option2)

  // test.log(value)
  test.is(value.a.length, 3)
  test.is(await value.a[0](), 0)
  test.is(await value.a[1](), 0)
  test.is(await value.a[2](), 0)

})

Test('getOption({ \'...\': [ class ] }, { \'...\': [ class ] }, { \'...\': [ class ] })', (test) => {

  let option0 = { 'a': [ new MyClass(0) ] }
  let option1 = { 'a': [ new MyClass(0) ] }
  let option2 = { 'a': [ new MyClass(0) ] }

  let value = Configuration.getOption(option0, option1, option2)

  // test.log(value)
  test.is(value.a.length, 3)
  test.true(value.a[0] instanceof MyClass)
  test.deepEqual(value.a[0].value, [ 0 ])
  test.true(value.a[1] instanceof MyClass)
  test.deepEqual(value.a[1].value, [ 0 ])
  test.true(value.a[2] instanceof MyClass)
  test.deepEqual(value.a[2].value, [ 0 ])

})

Test('getOption({ \'...\' }, { \'...\' }, { \'...\', \'...\' })', (test) => {

  let option0 = { 'a': 1 }
  let option1 = { 'b': 2 }
  let option2 = { 'a': false, 'c': 3 }

  let value = Configuration.getOption(option0, option1, option2)

  test.false(value.a)
  test.is(value.b, 2)
  test.is(value.c, 3)

})

Test('getOption({ class }, { class }, { class })', (test) => {

  let option0 = { 'a': new MyClass(1) }
  let option1 = { 'b': new MyClass(2) }
  let option2 = { 'a': new MyClass(false), 'c': new MyClass(3) }

  let value = Configuration.getOption(option0, option1, option2)

  test.true(value.a instanceof MyClass)
  test.deepEqual(value.a.value, [ false ])
  
  test.true(value.b instanceof MyClass)
  test.deepEqual(value.b.value, [ 2 ])
  
  test.true(value.c instanceof MyClass)
  test.deepEqual(value.c.value, [ 3 ])

})
