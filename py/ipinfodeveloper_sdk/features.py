# IpinfoDeveloper SDK feature factory

from ipinfodeveloper_sdk.feature.base_feature import IpinfoDeveloperBaseFeature
from ipinfodeveloper_sdk.feature.ratelimit_feature import IpinfoDeveloperRatelimitFeature
from ipinfodeveloper_sdk.feature.retry_feature import IpinfoDeveloperRetryFeature
from ipinfodeveloper_sdk.feature.test_feature import IpinfoDeveloperTestFeature
from ipinfodeveloper_sdk.feature.timeout_feature import IpinfoDeveloperTimeoutFeature


_FEATURES = {
    "base": lambda: IpinfoDeveloperBaseFeature(),
    "ratelimit": lambda: IpinfoDeveloperRatelimitFeature(),
    "retry": lambda: IpinfoDeveloperRetryFeature(),
    "test": lambda: IpinfoDeveloperTestFeature(),
    "timeout": lambda: IpinfoDeveloperTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
