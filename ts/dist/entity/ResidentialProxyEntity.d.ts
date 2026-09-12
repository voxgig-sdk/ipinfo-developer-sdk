import { IpinfoDeveloperEntityBase } from '../IpinfoDeveloperEntityBase';
import type { IpinfoDeveloperSDK } from '../IpinfoDeveloperSDK';
import type { Control } from '../types';
import type { ResidentialProxy, ResidentialProxyLoadMatch } from '../IpinfoDeveloperTypes';
declare class ResidentialProxyEntity extends IpinfoDeveloperEntityBase<ResidentialProxy> {
    constructor(client: IpinfoDeveloperSDK, entopts: any);
    make(this: ResidentialProxyEntity): ResidentialProxyEntity;
    load(this: any, reqmatch?: ResidentialProxyLoadMatch, ctrl?: Control): Promise<ResidentialProxyEntity>;
}
export { ResidentialProxyEntity };
