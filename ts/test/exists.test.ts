
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { IpinfoDeveloperSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = IpinfoDeveloperSDK.test()
    equal(testsdk instanceof IpinfoDeveloperSDK, true,
      'IpinfoDeveloperSDK.test() must return a client synchronously')
  })

})
