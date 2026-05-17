# ProjectName SDK exists test

import pytest
from ipinfodeveloper_sdk import IpinfoDeveloperSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = IpinfoDeveloperSDK.test(None, None)
        assert testsdk is not None
