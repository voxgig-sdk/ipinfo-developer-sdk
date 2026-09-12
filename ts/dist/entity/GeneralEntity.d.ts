import { IpinfoDeveloperEntityBase } from '../IpinfoDeveloperEntityBase';
import type { IpinfoDeveloperSDK } from '../IpinfoDeveloperSDK';
import type { Control } from '../types';
import type { General, GeneralCreateData } from '../IpinfoDeveloperTypes';
declare class GeneralEntity extends IpinfoDeveloperEntityBase<General> {
    constructor(client: IpinfoDeveloperSDK, entopts: any);
    make(this: GeneralEntity): GeneralEntity;
    create(this: any, reqdata?: GeneralCreateData, ctrl?: Control): Promise<GeneralEntity>;
}
export { GeneralEntity };
