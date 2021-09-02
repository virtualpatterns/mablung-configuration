import Clone from 'clone'
import FileSystem from 'fs'
import FileSystemPath from 'path'
import { Is } from '@virtualpatterns/mablung-is'
import Merge from 'deepmerge'
import ObjectPath from 'object-path'

const PATTERN_JSON = /^.+\.json5?$/i

class Configuration {

  constructor(root = {}) {
    this._root = root
  }

  get root() {
    return this._root
  }

  async load(value) {
    this._root = await this._load(value)
  }

  async merge(value) {
    this._root = Configuration.merge(this._root, await this._load(value))
  }

  async _load(value) {

    if (Is.string(value)) {

      let path = FileSystemPath.resolve(value)

      if (PATTERN_JSON.test(path)) {
        return FileSystem.readJsonSync(path, { 'encoding': 'utf-8' })
      }
      else {

        let module = null
        module = await import(path)

        if (Is.functionOrAsyncFunction(module)) {
          return await module(this)
        } else {
          return module
        }

      }

    } else {
      return value
    }

  }

  has(...argument) {
    return ObjectPath.has.apply(ObjectPath, [ this._root, ...argument ])
  }

  get(...argument) {
    return ObjectPath.get.apply(ObjectPath, [ this._root, ...argument ])
  }

  set(...argument) {
    return ObjectPath.set.apply(ObjectPath, [ this._root, ...argument ])
  }

  static merge(...argument) {
    // Merge a set of objects
    return argument.reduce((accumulator, argument) => Merge(accumulator, argument), {})
  }

  static getOption(...argument) {
    return this.merge(...argument)
  }

  static getArgument(...argument) {
    // Combine the below
    return this._argumentObjectToArray(this._mergeArgument(...argument))
  }

  static _mergeArgument(...argument) {
    // Merge a set of objects or arrays so that
    // { 'a': true, 'b': false, 'c': 'abc' } and [ 'b', 'd', 'e', 'f' ] and ...
    // becomes { 'a': true, 'b': true, 'c': 'abc', 'd': true, 'e': true, 'f': true }
    return argument.reduce((accumulator, argument) => Merge(accumulator, Is.array(argument) ? this._argumentArrayToObject(argument) : argument), {})
  }

  static _argumentArrayToObject(value) {
    // Convert a argument array of [ 'a', 'b', 'c' ] 
    // into an object { 'a': true, 'b': true, 'c': true }
    return value.reduce((accumulator, value) => { 
      accumulator[value] = true 
      return accumulator
    }, {})
  }

  static _argumentObjectToArray(value) {
    // Convert a argument object { 'a': true, 'b': false, 'c': 'abc', 'd': 1, 'e': 0 }
    // into an array [ 'a', 'c', 'abc', 'd', 1, 'e', 0 ]
    return Object.entries(value) // returns [ [ name, value ], [ name, value ], ... ]
      .filter(([ , value ]) => Is.boolean(value) ? value : true) // if value is a boolean, filter out false values
      .map(([ name, value ]) => Is.boolean(value) ? [ name ]: [ name, value ]) // if value is a boolean return only [ name ]
      .flat()
  }

  static redact(value, path, censor = '**********') {

    let _value = null
    _value = Clone(value)

    ObjectPath.set(_value, path, censor)

    return _value

  }

  static omit(value, path) {

    let _value = null
    _value = Clone(value)

    ObjectPath.del(_value, path)

    return _value

  }

}

export { Configuration }
