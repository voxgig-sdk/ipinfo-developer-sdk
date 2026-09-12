import { IpinfoDeveloperEntityBase } from '../IpinfoDeveloperEntityBase';
import type { IpinfoDeveloperSDK } from '../IpinfoDeveloperSDK';
import type { Control } from '../types';
import type { WhoisIp, WhoisIpLoadMatch } from '../IpinfoDeveloperTypes';
declare class WhoisIpEntity extends IpinfoDeveloperEntityBase<WhoisIp> {
    constructor(client: IpinfoDeveloperSDK, entopts: any);
    make(this: WhoisIpEntity): WhoisIpEntity;
    load(this: any, reqmatch?: WhoisIpLoadMatch, ctrl?: Control): Promise<WhoisIpEntity>;
}
export { WhoisIpEntity };
