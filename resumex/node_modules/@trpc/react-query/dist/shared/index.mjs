export { createReactDecoration } from './proxy/decorationProxy.mjs';
export { createQueryUtilsProxy, createReactQueryUtils, getQueryType } from './proxy/utilsProxy.mjs';
export { createUseQueries } from './proxy/useQueriesProxy.mjs';
export { createRootHooks } from './hooks/createHooksInternal.mjs';
export { getQueryClient } from './queryClient.mjs';
export { getClientArgs } from '../internals/getClientArgs.mjs';
export { TRPCContext, contextProps } from '../internals/context.mjs';
