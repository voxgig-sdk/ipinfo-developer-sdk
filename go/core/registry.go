package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAbuseEntityFunc func(client *IpinfoDeveloperSDK, entopts map[string]any) IpinfoDeveloperEntity

var NewAsnEntityFunc func(client *IpinfoDeveloperSDK, entopts map[string]any) IpinfoDeveloperEntity

var NewCarrierEntityFunc func(client *IpinfoDeveloperSDK, entopts map[string]any) IpinfoDeveloperEntity

var NewCompanyEntityFunc func(client *IpinfoDeveloperSDK, entopts map[string]any) IpinfoDeveloperEntity

var NewCoreEntityFunc func(client *IpinfoDeveloperSDK, entopts map[string]any) IpinfoDeveloperEntity

var NewDomainEntityFunc func(client *IpinfoDeveloperSDK, entopts map[string]any) IpinfoDeveloperEntity

var NewGeneralEntityFunc func(client *IpinfoDeveloperSDK, entopts map[string]any) IpinfoDeveloperEntity

var NewGetCurrentInformationEntityFunc func(client *IpinfoDeveloperSDK, entopts map[string]any) IpinfoDeveloperEntity

var NewGetInformationByIpEntityFunc func(client *IpinfoDeveloperSDK, entopts map[string]any) IpinfoDeveloperEntity

var NewIpinfoCoreEntityFunc func(client *IpinfoDeveloperSDK, entopts map[string]any) IpinfoDeveloperEntity

var NewIpinfoLiteEntityFunc func(client *IpinfoDeveloperSDK, entopts map[string]any) IpinfoDeveloperEntity

var NewIpinfoPlusEntityFunc func(client *IpinfoDeveloperSDK, entopts map[string]any) IpinfoDeveloperEntity

var NewLiteEntityFunc func(client *IpinfoDeveloperSDK, entopts map[string]any) IpinfoDeveloperEntity

var NewMaxEntityFunc func(client *IpinfoDeveloperSDK, entopts map[string]any) IpinfoDeveloperEntity

var NewMenEntityFunc func(client *IpinfoDeveloperSDK, entopts map[string]any) IpinfoDeveloperEntity

var NewPlaceEntityFunc func(client *IpinfoDeveloperSDK, entopts map[string]any) IpinfoDeveloperEntity

var NewPlusEntityFunc func(client *IpinfoDeveloperSDK, entopts map[string]any) IpinfoDeveloperEntity

var NewPrivacyEntityFunc func(client *IpinfoDeveloperSDK, entopts map[string]any) IpinfoDeveloperEntity

var NewPrivacyExtendedEntityFunc func(client *IpinfoDeveloperSDK, entopts map[string]any) IpinfoDeveloperEntity

var NewRangeEntityFunc func(client *IpinfoDeveloperSDK, entopts map[string]any) IpinfoDeveloperEntity

var NewResidentialProxyEntityFunc func(client *IpinfoDeveloperSDK, entopts map[string]any) IpinfoDeveloperEntity

var NewSingleEntityFunc func(client *IpinfoDeveloperSDK, entopts map[string]any) IpinfoDeveloperEntity

var NewWhoisAsnEntityFunc func(client *IpinfoDeveloperSDK, entopts map[string]any) IpinfoDeveloperEntity

var NewWhoisDomainEntityFunc func(client *IpinfoDeveloperSDK, entopts map[string]any) IpinfoDeveloperEntity

var NewWhoisIpEntityFunc func(client *IpinfoDeveloperSDK, entopts map[string]any) IpinfoDeveloperEntity

var NewWhoisNetIdEntityFunc func(client *IpinfoDeveloperSDK, entopts map[string]any) IpinfoDeveloperEntity

var NewWhoisOrgEntityFunc func(client *IpinfoDeveloperSDK, entopts map[string]any) IpinfoDeveloperEntity

var NewWhoisPocEntityFunc func(client *IpinfoDeveloperSDK, entopts map[string]any) IpinfoDeveloperEntity

