# IpinfoDeveloper SDK utility: make_context
require_relative '../core/context'
module IpinfoDeveloperUtilities
  MakeContext = ->(ctxmap, basectx) {
    IpinfoDeveloperContext.new(ctxmap, basectx)
  }
end
