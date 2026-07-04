# WhoisAsn direct test

import json
import pytest

from utility.voxgig_struct import voxgig_struct as vs
from ipinfodeveloper_sdk import IpinfoDeveloperSDK
from core import helpers
from test import runner


class TestWhoisAsnDirect:

    def test_should_direct_list_whois_asn(self):
        setup = _whois_asn_direct_setup([
            {"id": "direct01"},
            {"id": "direct02"},
        ])
        _skip, _reason = runner.is_control_skipped("direct", "direct-list-whois_asn", "live" if setup["live"] else "unit")
        if _skip:
            # pytest already imported at module scope
            pytest.skip(_reason or "skipped via sdk-test-control.json")
            return
        if setup["live"]:
            for _live_key in ["asn01"]:
                if setup["idmap"].get(_live_key) is None:
                    # pytest already imported at module scope
                    pytest.skip(f"live test needs {_live_key} via *_ENTID env var (synthetic IDs only)")
                    return

        client = setup["client"]

        params = {}
        if setup["live"]:
            params["asn"] = setup["idmap"]["asn01"]
        else:
            params["asn"] = "direct01"

        result = client.direct({
            "path": "whois/net/AS{asn}",
            "method": "GET",
            "params": params,
        })
        if setup["live"]:
            # Live mode is lenient: synthetic IDs frequently 4xx and the
            # list-response shape varies wildly across public APIs. Skip
            # rather than fail when the call doesn't return a usable list.
            if result.get("err") is not None:
                pytest.skip(f"list call failed (likely synthetic IDs against live API): {result.get('err')}")
                return
            if not result.get("ok"):
                pytest.skip("list call not ok (likely synthetic IDs against live API)")
                return
            status = helpers.to_int(result["status"])
            if status < 200 or status >= 300:
                pytest.skip(f"expected 2xx status, got {status}")
                return
        else:
            assert result["ok"] is True
            assert helpers.to_int(result["status"]) == 200
            assert isinstance(result["data"], list)
            assert len(result["data"]) == 2
            assert len(setup["calls"]) == 1



def _whois_asn_direct_setup(mockres):
    runner.load_env_local()

    calls = []

    env = runner.env_override({
        "IPINFODEVELOPER_TEST_WHOIS_ASN_ENTID": {},
        "IPINFODEVELOPER_TEST_LIVE": "FALSE",
        "IPINFODEVELOPER_APIKEY": "NONE",
    })

    live = env.get("IPINFODEVELOPER_TEST_LIVE") == "TRUE"

    if live:
        merged_opts = {
            "apikey": env.get("IPINFODEVELOPER_APIKEY"),
        }
        client = IpinfoDeveloperSDK(merged_opts)
        return {
            "client": client,
            "calls": calls,
            "live": True,
            "idmap": {},
        }

    def mock_fetch(url, init):
        calls.append({"url": url, "init": init})
        return {
            "status": 200,
            "statusText": "OK",
            "headers": {},
            "json": lambda: mockres if mockres is not None else {"id": "direct01"},
            "body": "mock",
        }, None

    client = IpinfoDeveloperSDK({
        "base": "http://localhost:8080",
        "system": {
            "fetch": mock_fetch,
        },
    })

    return {
        "client": client,
        "calls": calls,
        "live": False,
        "idmap": {},
    }
