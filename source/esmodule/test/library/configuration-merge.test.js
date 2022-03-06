import { Configuration } from '@virtualpatterns/mablung-configuration'
import { Path } from '@virtualpatterns/mablung-path'
import Test from 'ava'

const FolderPath = __folderPath

class AClass {

  constructor(argument) {
    this.value = argument
  }

}

[
  Path.resolve(FolderPath, './resource/load-0.cjs'),
  Path.resolve(FolderPath, './resource/load-1.cjs'),
  Path.resolve(FolderPath, './resource/load-2.cjs'),
  Path.resolve(FolderPath, './resource/load-3.js'),
  Path.resolve(FolderPath, './resource/load-4.js'),
  Path.resolve(FolderPath, './resource/load-5.js'),
  Path.resolve(FolderPath, './resource/load-6.json')
].forEach((path) => {

  Test(`merge('./${Path.relative(FolderPath, path)}')`, async (test) => {

    let configuration = null
    configuration = new Configuration({ 'a': 1 })
    await configuration.merge(path)

    test.is(configuration.get('a'), 1)
    test.is(configuration.get('b'), 2)
  
  })

})

Test('merge({ ... })', async (test) => {

  let configuration = null
  configuration = new Configuration({ 'a': 1 })
  await configuration.merge({ 'b': 2 })

  test.is(configuration.get('a'), 1)
  test.is(configuration.get('b'), 2)

})

Test('merge({ () => { ... } })', async (test) => {

  let configuration = null
  configuration = new Configuration({ 'a': () => 1 })
  await configuration.merge({ 'b': () => 2 })

  test.is(configuration.get('a')(), 1)
  test.is(configuration.get('b')(), 2)

})

Test('merge({ async () => { ... } })', async (test) => {

  let configuration = null
  configuration = new Configuration({ 'a': () => Promise.resolve(1) })
  await configuration.merge({ 'b': () => Promise.resolve(2) })

  test.is(await configuration.get('a')(), 1)
  test.is(await configuration.get('b')(), 2)

})

Test('merge({ class })', async (test) => {

  let configuration = null
  configuration = new Configuration({ 'a': new AClass(1) })
  await configuration.merge({ 'b': new AClass(2) })
  
  test.true(configuration.get('a') instanceof AClass)
  test.is(configuration.get('a').value, 1)
  test.true(configuration.get('b') instanceof AClass)
  test.is(configuration.get('b').value, 2)

})

// Test('merge([ ... ])', async (test) => {

//   let configuration = null
//   configuration = new Configuration({ 'a': 1 })
//   await configuration.merge([ 
//     { 'b': 2 }, 
//     Path.resolve(FolderPath, './resource/load-0.cjs'),
//     Path.resolve(FolderPath, './resource/load-1.cjs'),
//     Path.resolve(FolderPath, './resource/load-2.cjs'),
//     Path.resolve(FolderPath, './resource/load-3.js'),
//     Path.resolve(FolderPath, './resource/load-4.js'),
//     Path.resolve(FolderPath, './resource/load-5.js'),
//     Path.resolve(FolderPath, './resource/load-6.json'),
//     { 'b': () => 2 },
//     { 'b': () => Promise.resolve(2) },
//     { 'b': new AClass(2) }
//   ])

//   test.is(configuration.get('a'), 1)
//   test.true(configuration.get('b') instanceof AClass)
//   test.is(configuration.get('b').value, 2)

// })
