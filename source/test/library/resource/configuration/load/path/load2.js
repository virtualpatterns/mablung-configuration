export default function() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ 'a': 1 })
    }, 1000)
  })
}
