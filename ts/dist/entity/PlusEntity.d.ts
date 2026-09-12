import { IpinfoDeveloperEntityBase } from '../IpinfoDeveloperEntityBase';
import type { IpinfoDeveloperSDK } from '../IpinfoDeveloperSDK';
import type { Control } from '../types';
import type { Plus, PlusLoadMatch } from '../IpinfoDeveloperTypes';
declare class PlusEntity extends IpinfoDeveloperEntityBase<Plus> {
    constructor(client: IpinfoDeveloperSDK, entopts: any);
    make(this: PlusEntity): PlusEntity;
    load(this: any, reqmatch?: PlusLoadMatch, ctrl?: Control): Promise<PlusEntity>;
}
export { PlusEntity };
