import { IpinfoDeveloperEntityBase } from '../IpinfoDeveloperEntityBase';
import type { IpinfoDeveloperSDK } from '../IpinfoDeveloperSDK';
import type { Control } from '../types';
import type { WhoisOrg, WhoisOrgLoadMatch } from '../IpinfoDeveloperTypes';
declare class WhoisOrgEntity extends IpinfoDeveloperEntityBase<WhoisOrg> {
    constructor(client: IpinfoDeveloperSDK, entopts: any);
    make(this: WhoisOrgEntity): WhoisOrgEntity;
    load(this: any, reqmatch?: WhoisOrgLoadMatch, ctrl?: Control): Promise<WhoisOrgEntity>;
}
export { WhoisOrgEntity };
