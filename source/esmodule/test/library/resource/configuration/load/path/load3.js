export default async function() {

  let returnValue = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({ 'b': 2 })
    }, 1000)
  })

  return returnValue

}

