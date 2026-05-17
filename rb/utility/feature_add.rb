# IpinfoDeveloper SDK utility: feature_add
module IpinfoDeveloperUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
