import Test from 'ava'

;[
  'Configuration'
].forEach((name) => {

  Test(name, async (test) => {
    test.truthy(await import('@virtualpatterns/mablung-configuration').then((module) => module[name]))
  })
  
})
