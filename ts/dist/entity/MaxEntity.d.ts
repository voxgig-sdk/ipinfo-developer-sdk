import { IpinfoDeveloperEntityBase } from '../IpinfoDeveloperEntityBase';
import type { IpinfoDeveloperSDK } from '../IpinfoDeveloperSDK';
import type { Control } from '../types';
import type { Max, MaxLoadMatch } from '../IpinfoDeveloperTypes';
declare class MaxEntity extends IpinfoDeveloperEntityBase<Max> {
    constructor(client: IpinfoDeveloperSDK, entopts: any);
    make(this: MaxEntity): MaxEntity;
    load(this: any, reqmatch?: MaxLoadMatch, ctrl?: Control): Promise<MaxEntity>;
}
export { MaxEntity };
