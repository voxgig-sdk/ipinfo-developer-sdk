import { IpinfoDeveloperEntityBase } from '../IpinfoDeveloperEntityBase';
import type { IpinfoDeveloperSDK } from '../IpinfoDeveloperSDK';
import type { Control } from '../types';
import type { Core, CoreLoadMatch } from '../IpinfoDeveloperTypes';
declare class CoreEntity extends IpinfoDeveloperEntityBase<Core> {
    constructor(client: IpinfoDeveloperSDK, entopts: any);
    make(this: CoreEntity): CoreEntity;
    load(this: any, reqmatch?: CoreLoadMatch, ctrl?: Control): Promise<CoreEntity>;
}
export { CoreEntity };
