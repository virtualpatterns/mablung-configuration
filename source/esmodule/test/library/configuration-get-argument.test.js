import { Configuration } from '@virtualpatterns/mablung-configuration'
import Test from 'ava'

Test('getArgument()', (test) => {
  test.deepEqual(Configuration.getArgument(), [])
})

Test('getArgument({ ... })', (test) => {
  test.deepEqual(Configuration.getArgument({ 'a': 0 }), [ 'a', 0 ])
})

Test('getArgument({ \'...\': false }, { \'...\' })', (test) => {
  test.deepEqual(Configuration.getArgument({ 'a': false }, { 'b': 1 }), [ 'b', 1 ])
})

Test('getArgument({ \'...\': 0 }, { \'...\': 0 })', (test) => {
  test.deepEqual(Configuration.getArgument({ 'a': 0 }, { 'b': 0 }), [ 'a', 0, 'b', 0 ])
})

Test('getArgument([ ... ])', (test) => {

  let argument0 = [ 'd', '0' ]

  let value = Configuration.getArgument(argument0)

  // test.log(value)
  test.deepEqual(value, [ '0', 'd' ])
  
})

Test('getArgument([ ... ], { ... })', (test) => {

  let argument0 = [ 'd', 'b' ]
  let argument1 = { 'a': 0, 'd': 's' }

  let value = Configuration.getArgument(argument0, argument1)

  // test.log(value)
  test.deepEqual(value, ['d', 's', 'b', 'a', 0 ])
  
})
