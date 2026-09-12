import { IpinfoDeveloperEntityBase } from '../IpinfoDeveloperEntityBase';
import type { IpinfoDeveloperSDK } from '../IpinfoDeveloperSDK';
import type { Control } from '../types';
import type { IpinfoLite, IpinfoLiteLoadMatch } from '../IpinfoDeveloperTypes';
declare class IpinfoLiteEntity extends IpinfoDeveloperEntityBase<IpinfoLite> {
    constructor(client: IpinfoDeveloperSDK, entopts: any);
    make(this: IpinfoLiteEntity): IpinfoLiteEntity;
    load(this: any, reqmatch?: IpinfoLiteLoadMatch, ctrl?: Control): Promise<IpinfoLiteEntity>;
}
export { IpinfoLiteEntity };
