# IpinfoDeveloper SDK utility: make_context

from projectname_sdk.core.context import IpinfoDeveloperContext


def make_context_util(ctxmap, basectx):
    return IpinfoDeveloperContext(ctxmap, basectx)
