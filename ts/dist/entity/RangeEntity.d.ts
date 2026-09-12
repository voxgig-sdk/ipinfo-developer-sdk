import { IpinfoDeveloperEntityBase } from '../IpinfoDeveloperEntityBase';
import type { IpinfoDeveloperSDK } from '../IpinfoDeveloperSDK';
import type { Control } from '../types';
import type { Range, RangeLoadMatch } from '../IpinfoDeveloperTypes';
declare class RangeEntity extends IpinfoDeveloperEntityBase<Range> {
    constructor(client: IpinfoDeveloperSDK, entopts: any);
    make(this: RangeEntity): RangeEntity;
    load(this: any, reqmatch?: RangeLoadMatch, ctrl?: Control): Promise<RangeEntity>;
}
export { RangeEntity };
