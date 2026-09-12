import { IpinfoDeveloperEntityBase } from '../IpinfoDeveloperEntityBase';
import type { IpinfoDeveloperSDK } from '../IpinfoDeveloperSDK';
import type { Control } from '../types';
import type { PrivacyExtended, PrivacyExtendedListMatch } from '../IpinfoDeveloperTypes';
declare class PrivacyExtendedEntity extends IpinfoDeveloperEntityBase<PrivacyExtended> {
    constructor(client: IpinfoDeveloperSDK, entopts: any);
    make(this: PrivacyExtendedEntity): PrivacyExtendedEntity;
    list(this: any, reqmatch?: PrivacyExtendedListMatch, ctrl?: Control): Promise<PrivacyExtendedEntity[]>;
}
export { PrivacyExtendedEntity };
