import { Context } from './Context';
declare class IpinfoDeveloperError extends Error {
    isIpinfoDeveloperError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { IpinfoDeveloperError };
