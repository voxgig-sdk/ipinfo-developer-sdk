import { IpinfoDeveloperEntityBase } from '../IpinfoDeveloperEntityBase';
import type { IpinfoDeveloperSDK } from '../IpinfoDeveloperSDK';
import type { Control } from '../types';
import type { Privacy, PrivacyLoadMatch } from '../IpinfoDeveloperTypes';
declare class PrivacyEntity extends IpinfoDeveloperEntityBase<Privacy> {
    constructor(client: IpinfoDeveloperSDK, entopts: any);
    make(this: PrivacyEntity): PrivacyEntity;
    load(this: any, reqmatch?: PrivacyLoadMatch, ctrl?: Control): Promise<PrivacyEntity>;
}
export { PrivacyEntity };
