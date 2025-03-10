'use strict';

var reactQuery = require('@tanstack/react-query');
var client = require('@trpc/client');
var unstableCoreDoNotImport = require('@trpc/server/unstable-core-do-not-import');
var getClientArgs = require('../internals/getClientArgs.js');
var trpcResult = require('../internals/trpcResult.js');

/**
 * Creates a set of utility functions that can be used to interact with `react-query`
 * @param opts the `TRPCClient` and `QueryClient` to use
 * @returns a set of utility functions that can be used to interact with `react-query`
 * @internal
 */ function createUtilityFunctions(opts) {
    const { client: client$1, queryClient } = opts;
    const untypedClient = client$1 instanceof client.TRPCUntypedClient ? client$1 : client.getUntypedClient(client$1);
    return {
        infiniteQueryOptions: (path, queryKey, opts)=>{
            const inputIsSkipToken = queryKey[1]?.input === reactQuery.skipToken;
            const queryFn = async (queryFnContext)=>{
                const actualOpts = {
                    ...opts,
                    trpc: {
                        ...opts?.trpc,
                        ...opts?.trpc?.abortOnUnmount ? {
                            signal: queryFnContext.signal
                        } : {
                            signal: null
                        }
                    }
                };
                const result = await untypedClient.query(...getClientArgs.getClientArgs(queryKey, actualOpts, {
                    direction: queryFnContext.direction,
                    pageParam: queryFnContext.pageParam
                }));
                return result;
            };
            return Object.assign(reactQuery.infiniteQueryOptions({
                ...opts,
                initialData: opts?.initialData,
                queryKey,
                queryFn: inputIsSkipToken ? reactQuery.skipToken : queryFn,
                initialPageParam: opts?.initialCursor ?? null
            }), {
                trpc: trpcResult.createTRPCOptionsResult({
                    path
                })
            });
        },
        queryOptions: (path, queryKey, opts)=>{
            const inputIsSkipToken = queryKey[1]?.input === reactQuery.skipToken;
            const queryFn = async (queryFnContext)=>{
                const actualOpts = {
                    ...opts,
                    trpc: {
                        ...opts?.trpc,
                        ...opts?.trpc?.abortOnUnmount ? {
                            signal: queryFnContext.signal
                        } : {
                            signal: null
                        }
                    }
                };
                const result = await untypedClient.query(...getClientArgs.getClientArgs(queryKey, actualOpts));
                if (unstableCoreDoNotImport.isAsyncIterable(result)) {
                    return trpcResult.buildQueryFromAsyncIterable(result, queryClient, queryKey);
                }
                return result;
            };
            return Object.assign(reactQuery.queryOptions({
                ...opts,
                initialData: opts?.initialData,
                queryKey,
                queryFn: inputIsSkipToken ? reactQuery.skipToken : queryFn
            }), {
                trpc: trpcResult.createTRPCOptionsResult({
                    path
                })
            });
        },
        fetchQuery: (queryKey, opts)=>{
            return queryClient.fetchQuery({
                ...opts,
                queryKey,
                queryFn: ()=>untypedClient.query(...getClientArgs.getClientArgs(queryKey, opts))
            });
        },
        fetchInfiniteQuery: (queryKey, opts)=>{
            return queryClient.fetchInfiniteQuery({
                ...opts,
                queryKey,
                queryFn: ({ pageParam, direction })=>{
                    return untypedClient.query(...getClientArgs.getClientArgs(queryKey, opts, {
                        pageParam,
                        direction
                    }));
                },
                initialPageParam: opts?.initialCursor ?? null
            });
        },
        prefetchQuery: (queryKey, opts)=>{
            return queryClient.prefetchQuery({
                ...opts,
                queryKey,
                queryFn: ()=>untypedClient.query(...getClientArgs.getClientArgs(queryKey, opts))
            });
        },
        prefetchInfiniteQuery: (queryKey, opts)=>{
            return queryClient.prefetchInfiniteQuery({
                ...opts,
                queryKey,
                queryFn: ({ pageParam, direction })=>{
                    return untypedClient.query(...getClientArgs.getClientArgs(queryKey, opts, {
                        pageParam,
                        direction
                    }));
                },
                initialPageParam: opts?.initialCursor ?? null
            });
        },
        ensureQueryData: (queryKey, opts)=>{
            return queryClient.ensureQueryData({
                ...opts,
                queryKey,
                queryFn: ()=>untypedClient.query(...getClientArgs.getClientArgs(queryKey, opts))
            });
        },
        invalidateQueries: (queryKey, filters, options)=>{
            return queryClient.invalidateQueries({
                ...filters,
                queryKey
            }, options);
        },
        resetQueries: (queryKey, filters, options)=>{
            return queryClient.resetQueries({
                ...filters,
                queryKey
            }, options);
        },
        refetchQueries: (queryKey, filters, options)=>{
            return queryClient.refetchQueries({
                ...filters,
                queryKey
            }, options);
        },
        cancelQuery: (queryKey, options)=>{
            return queryClient.cancelQueries({
                queryKey
            }, options);
        },
        setQueryData: (queryKey, updater, options)=>{
            return queryClient.setQueryData(queryKey, updater, options);
        },
        // eslint-disable-next-line max-params
        setQueriesData: (queryKey, filters, updater, options)=>{
            return queryClient.setQueriesData({
                ...filters,
                queryKey
            }, updater, options);
        },
        getQueryData: (queryKey)=>{
            return queryClient.getQueryData(queryKey);
        },
        setInfiniteQueryData: (queryKey, updater, options)=>{
            return queryClient.setQueryData(queryKey, updater, options);
        },
        getInfiniteQueryData: (queryKey)=>{
            return queryClient.getQueryData(queryKey);
        },
        setMutationDefaults: (mutationKey, options)=>{
            const path = mutationKey[0];
            const canonicalMutationFn = (input)=>{
                return untypedClient.mutation(...getClientArgs.getClientArgs([
                    path,
                    {
                        input
                    }
                ], opts));
            };
            return queryClient.setMutationDefaults(mutationKey, typeof options === 'function' ? options({
                canonicalMutationFn
            }) : options);
        },
        getMutationDefaults: (mutationKey)=>{
            return queryClient.getMutationDefaults(mutationKey);
        },
        isMutating: (filters)=>{
            return queryClient.isMutating({
                ...filters,
                exact: true
            });
        }
    };
}

exports.createUtilityFunctions = createUtilityFunctions;
