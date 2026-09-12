import { IpinfoDeveloperEntityBase } from '../IpinfoDeveloperEntityBase';
import type { IpinfoDeveloperSDK } from '../IpinfoDeveloperSDK';
import type { Control } from '../types';
import type { Domain, DomainLoadMatch } from '../IpinfoDeveloperTypes';
declare class DomainEntity extends IpinfoDeveloperEntityBase<Domain> {
    constructor(client: IpinfoDeveloperSDK, entopts: any);
    make(this: DomainEntity): DomainEntity;
    load(this: any, reqmatch?: DomainLoadMatch, ctrl?: Control): Promise<DomainEntity>;
}
export { DomainEntity };
