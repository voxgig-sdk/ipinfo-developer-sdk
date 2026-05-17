package voxgigipinfodevelopersdk

import (
	"github.com/voxgig-sdk/ipinfo-developer-sdk/go/core"
	"github.com/voxgig-sdk/ipinfo-developer-sdk/go/entity"
	"github.com/voxgig-sdk/ipinfo-developer-sdk/go/feature"
	_ "github.com/voxgig-sdk/ipinfo-developer-sdk/go/utility"
)

// Type aliases preserve external API.
type IpinfoDeveloperSDK = core.IpinfoDeveloperSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type IpinfoDeveloperEntity = core.IpinfoDeveloperEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type IpinfoDeveloperError = core.IpinfoDeveloperError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAbuseEntityFunc = func(client *core.IpinfoDeveloperSDK, entopts map[string]any) core.IpinfoDeveloperEntity {
		return entity.NewAbuseEntity(client, entopts)
	}
	core.NewAsnEntityFunc = func(client *core.IpinfoDeveloperSDK, entopts map[string]any) core.IpinfoDeveloperEntity {
		return entity.NewAsnEntity(client, entopts)
	}
	core.NewCarrierEntityFunc = func(client *core.IpinfoDeveloperSDK, entopts map[string]any) core.IpinfoDeveloperEntity {
		return entity.NewCarrierEntity(client, entopts)
	}
	core.NewCompanyEntityFunc = func(client *core.IpinfoDeveloperSDK, entopts map[string]any) core.IpinfoDeveloperEntity {
		return entity.NewCompanyEntity(client, entopts)
	}
	core.NewCoreEntityFunc = func(client *core.IpinfoDeveloperSDK, entopts map[string]any) core.IpinfoDeveloperEntity {
		return entity.NewCoreEntity(client, entopts)
	}
	core.NewDomainEntityFunc = func(client *core.IpinfoDeveloperSDK, entopts map[string]any) core.IpinfoDeveloperEntity {
		return entity.NewDomainEntity(client, entopts)
	}
	core.NewGeneralEntityFunc = func(client *core.IpinfoDeveloperSDK, entopts map[string]any) core.IpinfoDeveloperEntity {
		return entity.NewGeneralEntity(client, entopts)
	}
	core.NewGetCurrentInformationEntityFunc = func(client *core.IpinfoDeveloperSDK, entopts map[string]any) core.IpinfoDeveloperEntity {
		return entity.NewGetCurrentInformationEntity(client, entopts)
	}
	core.NewGetInformationByIpEntityFunc = func(client *core.IpinfoDeveloperSDK, entopts map[string]any) core.IpinfoDeveloperEntity {
		return entity.NewGetInformationByIpEntity(client, entopts)
	}
	core.NewIpinfoCoreEntityFunc = func(client *core.IpinfoDeveloperSDK, entopts map[string]any) core.IpinfoDeveloperEntity {
		return entity.NewIpinfoCoreEntity(client, entopts)
	}
	core.NewIpinfoLiteEntityFunc = func(client *core.IpinfoDeveloperSDK, entopts map[string]any) core.IpinfoDeveloperEntity {
		return entity.NewIpinfoLiteEntity(client, entopts)
	}
	core.NewIpinfoPlusEntityFunc = func(client *core.IpinfoDeveloperSDK, entopts map[string]any) core.IpinfoDeveloperEntity {
		return entity.NewIpinfoPlusEntity(client, entopts)
	}
	core.NewLiteEntityFunc = func(client *core.IpinfoDeveloperSDK, entopts map[string]any) core.IpinfoDeveloperEntity {
		return entity.NewLiteEntity(client, entopts)
	}
	core.NewMaxEntityFunc = func(client *core.IpinfoDeveloperSDK, entopts map[string]any) core.IpinfoDeveloperEntity {
		return entity.NewMaxEntity(client, entopts)
	}
	core.NewMenEntityFunc = func(client *core.IpinfoDeveloperSDK, entopts map[string]any) core.IpinfoDeveloperEntity {
		return entity.NewMenEntity(client, entopts)
	}
	core.NewPlaceEntityFunc = func(client *core.IpinfoDeveloperSDK, entopts map[string]any) core.IpinfoDeveloperEntity {
		return entity.NewPlaceEntity(client, entopts)
	}
	core.NewPlusEntityFunc = func(client *core.IpinfoDeveloperSDK, entopts map[string]any) core.IpinfoDeveloperEntity {
		return entity.NewPlusEntity(client, entopts)
	}
	core.NewPrivacyEntityFunc = func(client *core.IpinfoDeveloperSDK, entopts map[string]any) core.IpinfoDeveloperEntity {
		return entity.NewPrivacyEntity(client, entopts)
	}
	core.NewPrivacyExtendedEntityFunc = func(client *core.IpinfoDeveloperSDK, entopts map[string]any) core.IpinfoDeveloperEntity {
		return entity.NewPrivacyExtendedEntity(client, entopts)
	}
	core.NewRangeEntityFunc = func(client *core.IpinfoDeveloperSDK, entopts map[string]any) core.IpinfoDeveloperEntity {
		return entity.NewRangeEntity(client, entopts)
	}
	core.NewResidentialProxyEntityFunc = func(client *core.IpinfoDeveloperSDK, entopts map[string]any) core.IpinfoDeveloperEntity {
		return entity.NewResidentialProxyEntity(client, entopts)
	}
	core.NewSingleEntityFunc = func(client *core.IpinfoDeveloperSDK, entopts map[string]any) core.IpinfoDeveloperEntity {
		return entity.NewSingleEntity(client, entopts)
	}
	core.NewWhoisAsnEntityFunc = func(client *core.IpinfoDeveloperSDK, entopts map[string]any) core.IpinfoDeveloperEntity {
		return entity.NewWhoisAsnEntity(client, entopts)
	}
	core.NewWhoisDomainEntityFunc = func(client *core.IpinfoDeveloperSDK, entopts map[string]any) core.IpinfoDeveloperEntity {
		return entity.NewWhoisDomainEntity(client, entopts)
	}
	core.NewWhoisIpEntityFunc = func(client *core.IpinfoDeveloperSDK, entopts map[string]any) core.IpinfoDeveloperEntity {
		return entity.NewWhoisIpEntity(client, entopts)
	}
	core.NewWhoisNetIdEntityFunc = func(client *core.IpinfoDeveloperSDK, entopts map[string]any) core.IpinfoDeveloperEntity {
		return entity.NewWhoisNetIdEntity(client, entopts)
	}
	core.NewWhoisOrgEntityFunc = func(client *core.IpinfoDeveloperSDK, entopts map[string]any) core.IpinfoDeveloperEntity {
		return entity.NewWhoisOrgEntity(client, entopts)
	}
	core.NewWhoisPocEntityFunc = func(client *core.IpinfoDeveloperSDK, entopts map[string]any) core.IpinfoDeveloperEntity {
		return entity.NewWhoisPocEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewIpinfoDeveloperSDK = core.NewIpinfoDeveloperSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
