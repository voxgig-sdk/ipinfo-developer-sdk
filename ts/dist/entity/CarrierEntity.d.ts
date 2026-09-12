import { IpinfoDeveloperEntityBase } from '../IpinfoDeveloperEntityBase';
import type { IpinfoDeveloperSDK } from '../IpinfoDeveloperSDK';
import type { Control } from '../types';
import type { Carrier, CarrierLoadMatch } from '../IpinfoDeveloperTypes';
declare class CarrierEntity extends IpinfoDeveloperEntityBase<Carrier> {
    constructor(client: IpinfoDeveloperSDK, entopts: any);
    make(this: CarrierEntity): CarrierEntity;
    load(this: any, reqmatch?: CarrierLoadMatch, ctrl?: Control): Promise<CarrierEntity>;
}
export { CarrierEntity };
