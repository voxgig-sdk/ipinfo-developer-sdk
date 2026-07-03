package = "voxgig-sdk-ipinfo-developer"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/ipinfo-developer-sdk.git",
  tag = "lua/v0.0.1",
  dir = "ipinfo-developer-sdk/lua"
}
description = {
  summary = "Unofficial generated Lua SDK for the IPinfo.io OpenAPI Specification public API. Not affiliated with or endorsed by the upstream API provider.",
  homepage = "https://github.com/voxgig-sdk/ipinfo-developer-sdk",
  issues_url = "https://github.com/voxgig-sdk/ipinfo-developer-sdk/issues",
  license = "MIT",
  labels = { "voxgig", "sdk", "generated-sdk", "openapi", "api-client", "ipinfo-developer" }
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["ipinfo-developer_sdk"] = "ipinfo-developer_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
