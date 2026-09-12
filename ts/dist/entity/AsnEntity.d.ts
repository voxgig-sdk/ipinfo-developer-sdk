import { IpinfoDeveloperEntityBase } from '../IpinfoDeveloperEntityBase';
import type { IpinfoDeveloperSDK } from '../IpinfoDeveloperSDK';
import type { Control } from '../types';
import type { Asn, AsnListMatch } from '../IpinfoDeveloperTypes';
declare class AsnEntity extends IpinfoDeveloperEntityBase<Asn> {
    constructor(client: IpinfoDeveloperSDK, entopts: any);
    make(this: AsnEntity): AsnEntity;
    list(this: any, reqmatch?: AsnListMatch, ctrl?: Control): Promise<AsnEntity[]>;
}
export { AsnEntity };
