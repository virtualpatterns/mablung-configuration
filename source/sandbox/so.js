import '@virtualpatterns/mablung-source-map-support/install'

const Require = __require

async function main() {

  try {

    let path = Require.resolve('./ta.js')
    let module = await import(path)

    
  } catch (error) {
    console.error(error)
  }

}

main()

