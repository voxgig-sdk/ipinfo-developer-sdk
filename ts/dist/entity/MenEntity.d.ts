import { IpinfoDeveloperEntityBase } from '../IpinfoDeveloperEntityBase';
import type { IpinfoDeveloperSDK } from '../IpinfoDeveloperSDK';
import type { Control } from '../types';
import type { Men, MenLoadMatch } from '../IpinfoDeveloperTypes';
declare class MenEntity extends IpinfoDeveloperEntityBase<Men> {
    constructor(client: IpinfoDeveloperSDK, entopts: any);
    make(this: MenEntity): MenEntity;
    load(this: any, reqmatch?: MenLoadMatch, ctrl?: Control): Promise<MenEntity>;
}
export { MenEntity };
