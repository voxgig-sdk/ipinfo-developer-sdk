import { IpinfoDeveloperEntityBase } from '../IpinfoDeveloperEntityBase';
import type { IpinfoDeveloperSDK } from '../IpinfoDeveloperSDK';
import type { Control } from '../types';
import type { Company, CompanyLoadMatch } from '../IpinfoDeveloperTypes';
declare class CompanyEntity extends IpinfoDeveloperEntityBase<Company> {
    constructor(client: IpinfoDeveloperSDK, entopts: any);
    make(this: CompanyEntity): CompanyEntity;
    load(this: any, reqmatch?: CompanyLoadMatch, ctrl?: Control): Promise<CompanyEntity>;
}
export { CompanyEntity };
