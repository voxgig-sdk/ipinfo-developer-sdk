import { IpinfoDeveloperEntityBase } from '../IpinfoDeveloperEntityBase';
import type { IpinfoDeveloperSDK } from '../IpinfoDeveloperSDK';
import type { Control } from '../types';
import type { GetCurrentInformation, GetCurrentInformationLoadMatch } from '../IpinfoDeveloperTypes';
declare class GetCurrentInformationEntity extends IpinfoDeveloperEntityBase<GetCurrentInformation> {
    constructor(client: IpinfoDeveloperSDK, entopts: any);
    make(this: GetCurrentInformationEntity): GetCurrentInformationEntity;
    load(this: any, reqmatch?: GetCurrentInformationLoadMatch, ctrl?: Control): Promise<GetCurrentInformationEntity>;
}
export { GetCurrentInformationEntity };
