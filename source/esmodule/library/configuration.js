import { Is } from '@virtualpatterns/mablung-is'
import { isPlainObject as IsPlainObject } from 'is-plain-object'
import { Path } from '@virtualpatterns/mablung-path'
import Clone from 'clone'
import FileSystem from 'fs-extra'
import Json from 'json5'
import Merge from 'deepmerge'
import ObjectPath from 'object-path'


class Configuration {

  constructor(root = {}) {
    this.root = root
  }

  async load(...argument) {
    this.root = await this.constructor.load(...argument)
  }

  async merge(...argument) {
    this.root = this.constructor.merge(this.root, await this.constructor.load(...argument))
  }

  has(...argument) {
    return ObjectPath.has.apply(ObjectPath, [ this.root, ...argument ])
  }

  get(...argument) {
    return ObjectPath.get.apply(ObjectPath, [ this.root, ...argument ])
  }

  set(...argument) {
    return ObjectPath.set.apply(ObjectPath, [ this.root, ...argument ])
  }

  static async load(argument) {

    switch (true) {
      case Is.string(argument): {

        switch (true) {
          case /\.c?js$/i.test(argument): {
  
            let module = await import(Path.resolve(argument))
            let configuration = module.default || module
    
            if (Is.functionOrAsyncFunction(configuration)) {
              return configuration(this)
            } else {
              return configuration
            }
    
          }
          default:
            return Json.parse(await FileSystem.readFile(argument, { 'encoding': 'utf-8' }))
        }

      }
      default:
        return argument
    }

  }

  // static async load(value, throwOnError = true) {

  //   switch (true) {
  //     case Is.array(value):
  //       return Promise.all(value.map((value) => this.load(value, throwOnError))).then((value) => value.reduce((accumulator, value) => this.merge(accumulator, value)))
  //     case Is.string(value): {

  //       try {

  //         switch (true) {
  //           case /\.c?js$/i.test(value): {
    
  //             let module = await import(value)
  //             let value = module.default || module
      
  //             if (Is.functionOrAsyncFunction(value)) {
  //               return value(this)
  //             } else {
  //               return value
  //             }
      
  //           }
  //           default:
  //             return Json.parse(await FileSystem.readFile(value, { 'encoding': 'utf-8' }))
  //         }

  //       } catch (error) {

  //         if (throwOnError) { 
  //           throw error 
  //         } else {
  //           return {}
  //         }
          
  //       }

  //     }
  //     default:
  //       return value
  //   }

  // }

  static merge(...argument) {
    // Merge a set of objects
    return argument.reduce((accumulator, argument) => Merge(accumulator, argument, {
      'isMergeableObject': (value) => {
        return Is.array(value) || IsPlainObject(value)
      }
    }), {})
  }

  static getOption(...argument) {
    return this.merge(...argument)
  }

  static getArgument(...argument) {
    // Combine the below
    return this.argumentObjectToArray(this.mergeArgument(...argument))
  }

  static mergeArgument(...argument) {
    // Merge a set of objects or arrays so that
    // { 'a': true, 'b': false, 'c': 'abc' } and [ 'b', 'd', 'e', 'f' ] and ...
    // becomes { 'a': true, 'b': true, 'c': 'abc', 'd': true, 'e': true, 'f': true }
    return argument.reduce((accumulator, argument) => Merge(accumulator, Is.array(argument) ? this.argumentArrayToObject(argument) : argument, {
      'isMergeableObject': (value) => {
        return Is.array(value) || IsPlainObject(value)
      }
    }), {})
  }

  static argumentArrayToObject(value) {
    // Convert a argument array of [ 'a', 'b', 'c' ] 
    // into an object { 'a': true, 'b': true, 'c': true }
    return value.reduce((accumulator, value) => { 
      accumulator[value] = true 
      return accumulator
    }, {})
  }

  static argumentObjectToArray(value) {
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
