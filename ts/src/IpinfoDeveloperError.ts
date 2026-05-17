
import { Context } from './Context'


class IpinfoDeveloperError extends Error {

  isIpinfoDeveloperError = true

  sdk = 'IpinfoDeveloper'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  IpinfoDeveloperError
}

