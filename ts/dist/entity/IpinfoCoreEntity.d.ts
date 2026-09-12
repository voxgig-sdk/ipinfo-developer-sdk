import { IpinfoDeveloperEntityBase } from '../IpinfoDeveloperEntityBase';
import type { IpinfoDeveloperSDK } from '../IpinfoDeveloperSDK';
import type { Control } from '../types';
import type { IpinfoCore, IpinfoCoreLoadMatch } from '../IpinfoDeveloperTypes';
declare class IpinfoCoreEntity extends IpinfoDeveloperEntityBase<IpinfoCore> {
    constructor(client: IpinfoDeveloperSDK, entopts: any);
    make(this: IpinfoCoreEntity): IpinfoCoreEntity;
    load(this: any, reqmatch?: IpinfoCoreLoadMatch, ctrl?: Control): Promise<IpinfoCoreEntity>;
}
export { IpinfoCoreEntity };
