import { IpinfoDeveloperEntityBase } from '../IpinfoDeveloperEntityBase';
import type { IpinfoDeveloperSDK } from '../IpinfoDeveloperSDK';
import type { Control } from '../types';
import type { WhoisNetId, WhoisNetIdLoadMatch } from '../IpinfoDeveloperTypes';
declare class WhoisNetIdEntity extends IpinfoDeveloperEntityBase<WhoisNetId> {
    constructor(client: IpinfoDeveloperSDK, entopts: any);
    make(this: WhoisNetIdEntity): WhoisNetIdEntity;
    load(this: any, reqmatch?: WhoisNetIdLoadMatch, ctrl?: Control): Promise<WhoisNetIdEntity>;
}
export { WhoisNetIdEntity };
