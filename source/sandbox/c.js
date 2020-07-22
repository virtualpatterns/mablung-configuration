
import { Configuration } from '../library/configuration'

;(async () => {

  try {

    let configuration = new Configuration(`${__dirname}/configuration/c.json5`)

    configuration.merge({ 'logLevel': 'trace' })

    console.log(configuration.has('unquoted'))
    console.log(configuration.get('unquoted'))

  } catch (error) {
    console.error(error)
  }

})()
