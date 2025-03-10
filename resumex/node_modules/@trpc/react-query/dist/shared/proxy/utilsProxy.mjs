import { createTRPCClientProxy } from '@trpc/client';
import { createFlatProxy, createRecursiveProxy } from '@trpc/server/unstable-core-do-not-import';
import { contextProps } from '../../internals/context.mjs';
import { getQueryKeyInternal, getMutationKeyInternal } from '../../internals/getQueryKey.mjs';

const getQueryType = (utilName)=>{
    switch(utilName){
        case 'queryOptions':
        case 'fetch':
        case 'ensureData':
        case 'prefetch':
        case 'getData':
        case 'setData':
        case 'setQueriesData':
            return 'query';
        case 'infiniteQueryOptions':
        case 'fetchInfinite':
        case 'prefetchInfinite':
        case 'getInfiniteData':
        case 'setInfiniteData':
            return 'infinite';
        case 'setMutationDefaults':
        case 'getMutationDefaults':
        case 'isMutating':
        case 'cancel':
        case 'invalidate':
        case 'refetch':
        case 'reset':
            return 'any';
    }
};
/**
 * @internal
 */ function createRecursiveUtilsProxy(context) {
    return createRecursiveProxy((opts)=>{
        const path = [
            ...opts.path
        ];
        const utilName = path.pop();
        const args = [
            ...opts.args
        ];
        const input = args.shift(); // args can now be spread when input removed
        const queryType = getQueryType(utilName);
        const queryKey = getQueryKeyInternal(path, input, queryType);
        const contextMap = {
            infiniteQueryOptions: ()=>context.infiniteQueryOptions(path, queryKey, args[0]),
            queryOptions: ()=>context.queryOptions(path, queryKey, ...args),
            /**
       * DecorateQueryProcedure
       */ fetch: ()=>context.fetchQuery(queryKey, ...args),
            fetchInfinite: ()=>context.fetchInfiniteQuery(queryKey, args[0]),
            prefetch: ()=>context.prefetchQuery(queryKey, ...args),
            prefetchInfinite: ()=>context.prefetchInfiniteQuery(queryKey, args[0]),
            ensureData: ()=>context.ensureQueryData(queryKey, ...args),
            invalidate: ()=>context.invalidateQueries(queryKey, ...args),
            reset: ()=>context.resetQueries(queryKey, ...args),
            refetch: ()=>context.refetchQueries(queryKey, ...args),
            cancel: ()=>context.cancelQuery(queryKey, ...args),
            setData: ()=>{
                context.setQueryData(queryKey, args[0], args[1]);
            },
            setQueriesData: ()=>context.setQueriesData(queryKey, args[0], args[1], args[2]),
            setInfiniteData: ()=>{
                context.setInfiniteQueryData(queryKey, args[0], args[1]);
            },
            getData: ()=>context.getQueryData(queryKey),
            getInfiniteData: ()=>context.getInfiniteQueryData(queryKey),
            /**
       * DecorateMutationProcedure
       */ setMutationDefaults: ()=>context.setMutationDefaults(getMutationKeyInternal(path), input),
            getMutationDefaults: ()=>context.getMutationDefaults(getMutationKeyInternal(path)),
            isMutating: ()=>context.isMutating({
                    mutationKey: getMutationKeyInternal(path)
                })
        };
        return contextMap[utilName]();
    });
}
/**
 * @internal
 */ function createReactQueryUtils(context) {
    const clientProxy = createTRPCClientProxy(context.client);
    const proxy = createRecursiveUtilsProxy(context);
    return createFlatProxy((key)=>{
        const contextName = key;
        if (contextName === 'client') {
            return clientProxy;
        }
        if (contextProps.includes(contextName)) {
            return context[contextName];
        }
        return proxy[key];
    });
}
/**
 * @internal
 */ function createQueryUtilsProxy(context) {
    return createRecursiveUtilsProxy(context);
}

export { createQueryUtilsProxy, createReactQueryUtils, getQueryType };
