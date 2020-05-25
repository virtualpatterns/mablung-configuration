import Clone from 'clone'
import FileSystem from 'fs'
import FileSystemPath from 'path'
import { Is } from '@virtualpatterns/mablung-is'
import JSON5 from 'json5'
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
        return JSON5.parse(FileSystem.readFileSync(path, { 'encoding': 'utf-8' }))
      }
      else {

        let module = null
        module = await import(path)
        module = module.default ? module.default : module

        if (Is.functionOrAsyncFunction(module)) {

          let returnValue = null
          returnValue = module(this)
          returnValue = returnValue instanceof Promise ? await returnValue : returnValue

          return returnValue

        } else {
          return module
        }

      }

    } else {
      return value
    }

  }

  has(...parameter) {
    return ObjectPath.has.apply(ObjectPath, [this._root, ...parameter])
  }

  get(...parameter) {
    return ObjectPath.get.apply(ObjectPath, [this._root, ...parameter])
  }

  set(...parameter) {
    return ObjectPath.set.apply(ObjectPath, [this._root, ...parameter])
  }

  static merge(...parameter) {
    // Merge a set of objects
    return parameter.reduce((accumulator, parameter) => Merge(accumulator, parameter), {})
  }

  static getOption(...parameter) {
    return this.merge(...parameter)
  }

  static getParameter(...parameter) {
    // Combine the below
    return this._parameterObjectToArray(this._mergeParameter(...parameter))
  }

  static _mergeParameter(...parameter) {
    // Merge a set of objects or arrays so that
    // { 'a': true, 'b': false, 'c': 'abc' } and [ 'b', 'd', 'e', 'f' ] and ...
    // becomes { 'a': true, 'b': true, 'c': 'abc', 'd': true, 'e': true, 'f': true }
    return parameter.reduce((accumulator, parameter) => Merge(accumulator, Is.array(parameter) ? this._parameterArrayToObject(parameter) : parameter), {})
  }

  static _parameterArrayToObject(value) {
    // Convert a parameter array of [ 'a', 'b', 'c' ] 
    // into an object { 'a': true, 'b': true, 'c': true }
    return value.reduce((accumulator, value) => { 
      accumulator[value] = true 
      return accumulator
    }, {})
  }

  static _parameterObjectToArray(value) {
    // Convert a parameter object { 'a': true, 'b': false, 'c': 'abc' }
    // into an array [ 'a', 'c', 'abc' ]
    return Object.keys(value)
      .filter((name) => value[name]) // remove any name/value pairs where value is falsy
      .map((name) => Is.string(value[name]) ? [ name, value[name] ] : name) // separate name/value pairs into [ name, value ] or just name if it's not a string
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
