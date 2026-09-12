import { IpinfoDeveloperEntityBase } from '../IpinfoDeveloperEntityBase';
import type { IpinfoDeveloperSDK } from '../IpinfoDeveloperSDK';
import type { Control } from '../types';
import type { WhoisAsn, WhoisAsnListMatch } from '../IpinfoDeveloperTypes';
declare class WhoisAsnEntity extends IpinfoDeveloperEntityBase<WhoisAsn> {
    constructor(client: IpinfoDeveloperSDK, entopts: any);
    make(this: WhoisAsnEntity): WhoisAsnEntity;
    list(this: any, reqmatch?: WhoisAsnListMatch, ctrl?: Control): Promise<WhoisAsnEntity[]>;
}
export { WhoisAsnEntity };
