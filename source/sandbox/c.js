
import { Configuration } from '../library/configuration'

;(async () => {

  try {

    let configuration = new Configuration()

    configuration.merge('')

    console.log(configuration.has('unquoted'))
    console.log(configuration.get('unquoted'))

  } catch (error) {
    console.error(error)
  }

})()
