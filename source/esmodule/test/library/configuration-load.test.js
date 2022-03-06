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

  Test(`load('./${Path.relative(FolderPath, path)}')`, async (test) => {

    let configuration = null
    configuration = new Configuration({ 'a': 1 })
    await configuration.load(path)

    test.false(configuration.has('a'))
    test.is(configuration.get('b'), 2)
  
  })

})

Test('load({ ... })', async (test) => {

  let configuration = null
  configuration = new Configuration({ 'a': 1 })
  await configuration.load({ 'b': 2 })

  test.false(configuration.has('a'))
  test.is(configuration.get('b'), 2)

})

Test('load({ () => { ... } })', async (test) => {

  let configuration = null
  configuration = new Configuration({ 'a': () => 1 })
  await configuration.load({ 'b': () => 2 })

  test.false(configuration.has('a'))
  test.is(configuration.get('b')(), 2)

})

Test('load({ async () => { ... } })', async (test) => {

  let configuration = null
  configuration = new Configuration({ 'a': () => Promise.resolve(1) })
  await configuration.load({ 'b': () => Promise.resolve(2) })

  test.false(configuration.has('a'))
  test.is(await configuration.get('b')(), 2)

})

Test('load({ class })', async (test) => {

  let configuration = null
  configuration = new Configuration({ 'a': new AClass(1) })
  await configuration.load({ 'b': new AClass(2) })
  
  test.false(configuration.has('a'))
  test.true(configuration.get('b') instanceof AClass)
  test.is(configuration.get('b').value, 2)

})

// Test('load([ ... ])', async (test) => {

//   let configuration = null
//   configuration = new Configuration({ 'a': 1 })
//   await configuration.load([ 
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

//   test.false(configuration.has('a'))
//   test.true(configuration.get('b') instanceof AClass)
//   test.is(configuration.get('b').value, 2)

// })
