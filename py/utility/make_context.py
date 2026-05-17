# IpinfoDeveloper SDK utility: make_context

from core.context import IpinfoDeveloperContext


def make_context_util(ctxmap, basectx):
    return IpinfoDeveloperContext(ctxmap, basectx)
