module.exports = function() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ 'a': 1 })
    }, 250)
  })
}
