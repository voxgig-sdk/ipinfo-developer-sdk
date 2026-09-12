import { IpinfoDeveloperEntityBase } from '../IpinfoDeveloperEntityBase';
import type { IpinfoDeveloperSDK } from '../IpinfoDeveloperSDK';
import type { Control } from '../types';
import type { WhoisDomain, WhoisDomainLoadMatch } from '../IpinfoDeveloperTypes';
declare class WhoisDomainEntity extends IpinfoDeveloperEntityBase<WhoisDomain> {
    constructor(client: IpinfoDeveloperSDK, entopts: any);
    make(this: WhoisDomainEntity): WhoisDomainEntity;
    load(this: any, reqmatch?: WhoisDomainLoadMatch, ctrl?: Control): Promise<WhoisDomainEntity>;
}
export { WhoisDomainEntity };
