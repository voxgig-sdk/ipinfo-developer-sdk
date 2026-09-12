import { IpinfoDeveloperEntityBase } from '../IpinfoDeveloperEntityBase';
import type { IpinfoDeveloperSDK } from '../IpinfoDeveloperSDK';
import type { Control } from '../types';
import type { Place, PlaceLoadMatch } from '../IpinfoDeveloperTypes';
declare class PlaceEntity extends IpinfoDeveloperEntityBase<Place> {
    constructor(client: IpinfoDeveloperSDK, entopts: any);
    make(this: PlaceEntity): PlaceEntity;
    load(this: any, reqmatch?: PlaceLoadMatch, ctrl?: Control): Promise<PlaceEntity>;
}
export { PlaceEntity };
