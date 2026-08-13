# IpinfoDeveloper SDK feature factory

from ipinfodeveloper_sdk.feature.base_feature import IpinfoDeveloperBaseFeature
from ipinfodeveloper_sdk.feature.test_feature import IpinfoDeveloperTestFeature


def _make_feature(name):
    features = {
        "base": lambda: IpinfoDeveloperBaseFeature(),
        "test": lambda: IpinfoDeveloperTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
