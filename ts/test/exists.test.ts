
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { IpinfoDeveloperSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await IpinfoDeveloperSDK.test()
    equal(null !== testsdk, true)
  })

})
