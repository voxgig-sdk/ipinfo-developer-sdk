import { IpinfoDeveloperEntityBase } from '../IpinfoDeveloperEntityBase';
import type { IpinfoDeveloperSDK } from '../IpinfoDeveloperSDK';
import type { Control } from '../types';
import type { Lite, LiteLoadMatch } from '../IpinfoDeveloperTypes';
declare class LiteEntity extends IpinfoDeveloperEntityBase<Lite> {
    constructor(client: IpinfoDeveloperSDK, entopts: any);
    make(this: LiteEntity): LiteEntity;
    load(this: any, reqmatch?: LiteLoadMatch, ctrl?: Control): Promise<LiteEntity>;
}
export { LiteEntity };
