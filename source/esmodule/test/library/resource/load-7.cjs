module.exports = async function() {

  let returnValue = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({ 'a': 1 })
    }, 250)
  })

  return returnValue

}
