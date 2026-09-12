import { IpinfoDeveloperEntityBase } from '../IpinfoDeveloperEntityBase';
import type { IpinfoDeveloperSDK } from '../IpinfoDeveloperSDK';
import type { Control } from '../types';
import type { Single, SingleLoadMatch } from '../IpinfoDeveloperTypes';
declare class SingleEntity extends IpinfoDeveloperEntityBase<Single> {
    constructor(client: IpinfoDeveloperSDK, entopts: any);
    make(this: SingleEntity): SingleEntity;
    load(this: any, reqmatch?: SingleLoadMatch, ctrl?: Control): Promise<SingleEntity>;
}
export { SingleEntity };
