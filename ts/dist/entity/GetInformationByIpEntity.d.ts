import { IpinfoDeveloperEntityBase } from '../IpinfoDeveloperEntityBase';
import type { IpinfoDeveloperSDK } from '../IpinfoDeveloperSDK';
import type { Control } from '../types';
import type { GetInformationByIp, GetInformationByIpLoadMatch } from '../IpinfoDeveloperTypes';
declare class GetInformationByIpEntity extends IpinfoDeveloperEntityBase<GetInformationByIp> {
    constructor(client: IpinfoDeveloperSDK, entopts: any);
    make(this: GetInformationByIpEntity): GetInformationByIpEntity;
    load(this: any, reqmatch?: GetInformationByIpLoadMatch, ctrl?: Control): Promise<GetInformationByIpEntity>;
}
export { GetInformationByIpEntity };
