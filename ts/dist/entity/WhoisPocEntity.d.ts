import { IpinfoDeveloperEntityBase } from '../IpinfoDeveloperEntityBase';
import type { IpinfoDeveloperSDK } from '../IpinfoDeveloperSDK';
import type { Control } from '../types';
import type { WhoisPoc, WhoisPocLoadMatch } from '../IpinfoDeveloperTypes';
declare class WhoisPocEntity extends IpinfoDeveloperEntityBase<WhoisPoc> {
    constructor(client: IpinfoDeveloperSDK, entopts: any);
    make(this: WhoisPocEntity): WhoisPocEntity;
    load(this: any, reqmatch?: WhoisPocLoadMatch, ctrl?: Control): Promise<WhoisPocEntity>;
}
export { WhoisPocEntity };
