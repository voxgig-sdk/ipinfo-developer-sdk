import { IpinfoDeveloperEntityBase } from '../IpinfoDeveloperEntityBase';
import type { IpinfoDeveloperSDK } from '../IpinfoDeveloperSDK';
import type { Control } from '../types';
import type { Abuse, AbuseLoadMatch } from '../IpinfoDeveloperTypes';
declare class AbuseEntity extends IpinfoDeveloperEntityBase<Abuse> {
    constructor(client: IpinfoDeveloperSDK, entopts: any);
    make(this: AbuseEntity): AbuseEntity;
    load(this: any, reqmatch?: AbuseLoadMatch, ctrl?: Control): Promise<AbuseEntity>;
}
export { AbuseEntity };
