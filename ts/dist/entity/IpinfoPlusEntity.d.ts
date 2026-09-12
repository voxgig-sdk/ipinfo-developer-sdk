import { IpinfoDeveloperEntityBase } from '../IpinfoDeveloperEntityBase';
import type { IpinfoDeveloperSDK } from '../IpinfoDeveloperSDK';
import type { Control } from '../types';
import type { IpinfoPlus, IpinfoPlusLoadMatch } from '../IpinfoDeveloperTypes';
declare class IpinfoPlusEntity extends IpinfoDeveloperEntityBase<IpinfoPlus> {
    constructor(client: IpinfoDeveloperSDK, entopts: any);
    make(this: IpinfoPlusEntity): IpinfoPlusEntity;
    load(this: any, reqmatch?: IpinfoPlusLoadMatch, ctrl?: Control): Promise<IpinfoPlusEntity>;
}
export { IpinfoPlusEntity };
