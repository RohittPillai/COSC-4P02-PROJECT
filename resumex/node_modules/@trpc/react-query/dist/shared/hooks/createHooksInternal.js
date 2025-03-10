'use strict';

var reactQuery = require('@tanstack/react-query');
var client = require('@trpc/client');
var unstableCoreDoNotImport = require('@trpc/server/unstable-core-do-not-import');
var React = require('react');
var context = require('../../internals/context.js');
var getClientArgs = require('../../internals/getClientArgs.js');
var getQueryKey = require('../../internals/getQueryKey.js');
var trpcResult = require('../../internals/trpcResult.js');
var createUtilityFunctions = require('../../utils/createUtilityFunctions.js');
var useQueriesProxy = require('../proxy/useQueriesProxy.js');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

const trackResult = (result, onTrackResult)=>{
    const trackedResult = new Proxy(result, {
        get (target, prop) {
            onTrackResult(prop);
            return target[prop];
        }
    });
    return trackedResult;
};
/**
 * @internal
 */ function createRootHooks(config) {
    const mutationSuccessOverride = config?.overrides?.useMutation?.onSuccess ?? ((options)=>options.originalFn());
    const Context = config?.context ?? context.TRPCContext;
    const createClient = client.createTRPCClient;
    const TRPCProvider = (props)=>{
        const { abortOnUnmount = false, queryClient, ssrContext } = props;
        const [ssrState, setSSRState] = React__namespace.useState(props.ssrState ?? false);
        const client$1 = props.client instanceof client.TRPCUntypedClient ? props.client : client.getUntypedClient(props.client);
        const fns = React__namespace.useMemo(()=>createUtilityFunctions.createUtilityFunctions({
                client: client$1,
                queryClient
            }), [
            client$1,
            queryClient
        ]);
        const contextValue = React__namespace.useMemo(()=>({
                abortOnUnmount,
                queryClient,
                client: client$1,
                ssrContext: ssrContext ?? null,
                ssrState,
                ...fns
            }), [
            abortOnUnmount,
            client$1,
            fns,
            queryClient,
            ssrContext,
            ssrState
        ]);
        React__namespace.useEffect(()=>{
            // Only updating state to `mounted` if we are using SSR.
            // This makes it so we don't have an unnecessary re-render when opting out of SSR.
            setSSRState((state)=>state ? 'mounted' : false);
        }, []);
        return /*#__PURE__*/ React__namespace.createElement(Context.Provider, {
            value: contextValue
        }, props.children);
    };
    function useContext() {
        const context = React__namespace.useContext(Context);
        if (!context) {
            throw new Error('Unable to find tRPC Context. Did you forget to wrap your App inside `withTRPC` HoC?');
        }
        return context;
    }
    /**
   * Hack to make sure errors return `status`='error` when doing SSR
   * @see https://github.com/trpc/trpc/pull/1645
   */ function useSSRQueryOptionsIfNeeded(queryKey, opts) {
        const { queryClient, ssrState } = useContext();
        return ssrState && ssrState !== 'mounted' && queryClient.getQueryCache().find({
            queryKey
        })?.state.status === 'error' ? {
            retryOnMount: false,
            ...opts
        } : opts;
    }
    function useQuery(path, input, opts) {
        const context = useContext();
        const { abortOnUnmount, client, ssrState, queryClient, prefetchQuery } = context;
        const queryKey = getQueryKey.getQueryKeyInternal(path, input, 'query');
        const defaultOpts = queryClient.getQueryDefaults(queryKey);
        const isInputSkipToken = input === reactQuery.skipToken;
        if (typeof window === 'undefined' && ssrState === 'prepass' && opts?.trpc?.ssr !== false && (opts?.enabled ?? defaultOpts?.enabled) !== false && !isInputSkipToken && !queryClient.getQueryCache().find({
            queryKey
        })) {
            void prefetchQuery(queryKey, opts);
        }
        const ssrOpts = useSSRQueryOptionsIfNeeded(queryKey, {
            ...defaultOpts,
            ...opts
        });
        const shouldAbortOnUnmount = opts?.trpc?.abortOnUnmount ?? config?.abortOnUnmount ?? abortOnUnmount;
        const hook = reactQuery.useQuery({
            ...ssrOpts,
            queryKey: queryKey,
            queryFn: isInputSkipToken ? input : async (queryFunctionContext)=>{
                const actualOpts = {
                    ...ssrOpts,
                    trpc: {
                        ...ssrOpts?.trpc,
                        ...shouldAbortOnUnmount ? {
                            signal: queryFunctionContext.signal
                        } : {
                            signal: null
                        }
                    }
                };
                const result = await client.query(...getClientArgs.getClientArgs(queryKey, actualOpts));
                if (unstableCoreDoNotImport.isAsyncIterable(result)) {
                    return trpcResult.buildQueryFromAsyncIterable(result, queryClient, queryKey);
                }
                return result;
            }
        }, queryClient);
        hook.trpc = trpcResult.useHookResult({
            path
        });
        return hook;
    }
    function usePrefetchQuery(path, input, opts) {
        const context = useContext();
        const queryKey = getQueryKey.getQueryKeyInternal(path, input, 'query');
        const isInputSkipToken = input === reactQuery.skipToken;
        const shouldAbortOnUnmount = opts?.trpc?.abortOnUnmount ?? config?.abortOnUnmount ?? context.abortOnUnmount;
        reactQuery.usePrefetchQuery({
            ...opts,
            queryKey: queryKey,
            queryFn: isInputSkipToken ? input : (queryFunctionContext)=>{
                const actualOpts = {
                    trpc: {
                        ...opts?.trpc,
                        ...shouldAbortOnUnmount ? {
                            signal: queryFunctionContext.signal
                        } : {}
                    }
                };
                return context.client.query(...getClientArgs.getClientArgs(queryKey, actualOpts));
            }
        });
    }
    function useSuspenseQuery(path, input, opts) {
        const context = useContext();
        const queryKey = getQueryKey.getQueryKeyInternal(path, input, 'query');
        const shouldAbortOnUnmount = opts?.trpc?.abortOnUnmount ?? config?.abortOnUnmount ?? context.abortOnUnmount;
        const hook = reactQuery.useSuspenseQuery({
            ...opts,
            queryKey: queryKey,
            queryFn: (queryFunctionContext)=>{
                const actualOpts = {
                    ...opts,
                    trpc: {
                        ...opts?.trpc,
                        ...shouldAbortOnUnmount ? {
                            signal: queryFunctionContext.signal
                        } : {
                            signal: null
                        }
                    }
                };
                return context.client.query(...getClientArgs.getClientArgs(queryKey, actualOpts));
            }
        }, context.queryClient);
        hook.trpc = trpcResult.useHookResult({
            path
        });
        return [
            hook.data,
            hook
        ];
    }
    function useMutation(path, opts) {
        const { client, queryClient } = useContext();
        const mutationKey = getQueryKey.getMutationKeyInternal(path);
        const defaultOpts = queryClient.defaultMutationOptions(queryClient.getMutationDefaults(mutationKey));
        const hook = reactQuery.useMutation({
            ...opts,
            mutationKey: mutationKey,
            mutationFn: (input)=>{
                return client.mutation(...getClientArgs.getClientArgs([
                    path,
                    {
                        input
                    }
                ], opts));
            },
            onSuccess (...args) {
                const originalFn = ()=>opts?.onSuccess?.(...args) ?? defaultOpts?.onSuccess?.(...args);
                return mutationSuccessOverride({
                    originalFn,
                    queryClient,
                    meta: opts?.meta ?? defaultOpts?.meta ?? {}
                });
            }
        }, queryClient);
        hook.trpc = trpcResult.useHookResult({
            path
        });
        return hook;
    }
    const initialStateIdle = {
        data: undefined,
        error: null,
        status: 'idle'
    };
    const initialStateConnecting = {
        data: undefined,
        error: null,
        status: 'connecting'
    };
    /* istanbul ignore next -- @preserve */ function useSubscription(path, input, opts) {
        const enabled = opts?.enabled ?? input !== reactQuery.skipToken;
        const queryKey = reactQuery.hashKey(getQueryKey.getQueryKeyInternal(path, input, 'any'));
        const { client } = useContext();
        const optsRef = React__namespace.useRef(opts);
        React__namespace.useEffect(()=>{
            optsRef.current = opts;
        });
        const [trackedProps] = React__namespace.useState(new Set([]));
        const addTrackedProp = React__namespace.useCallback((key)=>{
            trackedProps.add(key);
        }, [
            trackedProps
        ]);
        const currentSubscriptionRef = React__namespace.useRef(null);
        const updateState = React__namespace.useCallback((callback)=>{
            const prev = resultRef.current;
            const next = resultRef.current = callback(prev);
            let shouldUpdate = false;
            for (const key of trackedProps){
                if (prev[key] !== next[key]) {
                    shouldUpdate = true;
                    break;
                }
            }
            if (shouldUpdate) {
                setState(trackResult(next, addTrackedProp));
            }
        }, [
            addTrackedProp,
            trackedProps
        ]);
        const reset = React__namespace.useCallback(()=>{
            // unsubscribe from the previous subscription
            currentSubscriptionRef.current?.unsubscribe();
            if (!enabled) {
                updateState(()=>({
                        ...initialStateIdle,
                        reset
                    }));
                return;
            }
            updateState(()=>({
                    ...initialStateConnecting,
                    reset
                }));
            const subscription = client.subscription(path.join('.'), input ?? undefined, {
                onStarted: ()=>{
                    optsRef.current.onStarted?.();
                    updateState((prev)=>({
                            ...prev,
                            status: 'pending',
                            error: null
                        }));
                },
                onData: (data)=>{
                    optsRef.current.onData?.(data);
                    updateState((prev)=>({
                            ...prev,
                            status: 'pending',
                            data,
                            error: null
                        }));
                },
                onError: (error)=>{
                    optsRef.current.onError?.(error);
                    updateState((prev)=>({
                            ...prev,
                            status: 'error',
                            error
                        }));
                },
                onConnectionStateChange: (result)=>{
                    updateState((prev)=>{
                        switch(result.state){
                            case 'idle':
                                return {
                                    ...prev,
                                    status: result.state,
                                    error: null,
                                    data: undefined
                                };
                            case 'connecting':
                                return {
                                    ...prev,
                                    error: result.error,
                                    status: result.state
                                };
                            case 'pending':
                                // handled when data is / onStarted
                                return prev;
                        }
                    });
                },
                onComplete: ()=>{
                    optsRef.current.onComplete?.();
                    // In the case of WebSockets, the connection might not be idle so `onConnectionStateChange` will not be called until the connection is closed.
                    // In this case, we need to set the state to idle manually.
                    updateState((prev)=>({
                            ...prev,
                            status: 'idle',
                            error: null,
                            data: undefined
                        }));
                // (We might want to add a `connectionState` to the state to track the connection state separately)
                }
            });
            currentSubscriptionRef.current = subscription;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [
            client,
            queryKey,
            enabled,
            updateState
        ]);
        React__namespace.useEffect(()=>{
            reset();
            return ()=>{
                currentSubscriptionRef.current?.unsubscribe();
            };
        }, [
            reset
        ]);
        const resultRef = React__namespace.useRef(enabled ? {
            ...initialStateConnecting,
            reset
        } : {
            ...initialStateIdle,
            reset
        });
        const [state, setState] = React__namespace.useState(trackResult(resultRef.current, addTrackedProp));
        return state;
    }
    function useInfiniteQuery(path, input, opts) {
        const { client, ssrState, prefetchInfiniteQuery, queryClient, abortOnUnmount } = useContext();
        const queryKey = getQueryKey.getQueryKeyInternal(path, input, 'infinite');
        const defaultOpts = queryClient.getQueryDefaults(queryKey);
        const isInputSkipToken = input === reactQuery.skipToken;
        if (typeof window === 'undefined' && ssrState === 'prepass' && opts?.trpc?.ssr !== false && (opts?.enabled ?? defaultOpts?.enabled) !== false && !isInputSkipToken && !queryClient.getQueryCache().find({
            queryKey
        })) {
            void prefetchInfiniteQuery(queryKey, {
                ...defaultOpts,
                ...opts
            });
        }
        const ssrOpts = useSSRQueryOptionsIfNeeded(queryKey, {
            ...defaultOpts,
            ...opts
        });
        // request option should take priority over global
        const shouldAbortOnUnmount = opts?.trpc?.abortOnUnmount ?? abortOnUnmount;
        const hook = reactQuery.useInfiniteQuery({
            ...ssrOpts,
            initialPageParam: opts.initialCursor ?? null,
            persister: opts.persister,
            queryKey: queryKey,
            queryFn: isInputSkipToken ? input : (queryFunctionContext)=>{
                const actualOpts = {
                    ...ssrOpts,
                    trpc: {
                        ...ssrOpts?.trpc,
                        ...shouldAbortOnUnmount ? {
                            signal: queryFunctionContext.signal
                        } : {
                            signal: null
                        }
                    }
                };
                return client.query(...getClientArgs.getClientArgs(queryKey, actualOpts, {
                    pageParam: queryFunctionContext.pageParam ?? opts.initialCursor,
                    direction: queryFunctionContext.direction
                }));
            }
        }, queryClient);
        hook.trpc = trpcResult.useHookResult({
            path
        });
        return hook;
    }
    function usePrefetchInfiniteQuery(path, input, opts) {
        const context = useContext();
        const queryKey = getQueryKey.getQueryKeyInternal(path, input, 'infinite');
        const defaultOpts = context.queryClient.getQueryDefaults(queryKey);
        const isInputSkipToken = input === reactQuery.skipToken;
        const ssrOpts = useSSRQueryOptionsIfNeeded(queryKey, {
            ...defaultOpts,
            ...opts
        });
        // request option should take priority over global
        const shouldAbortOnUnmount = opts?.trpc?.abortOnUnmount ?? context.abortOnUnmount;
        reactQuery.usePrefetchInfiniteQuery({
            ...opts,
            initialPageParam: opts.initialCursor ?? null,
            queryKey,
            queryFn: isInputSkipToken ? input : (queryFunctionContext)=>{
                const actualOpts = {
                    ...ssrOpts,
                    trpc: {
                        ...ssrOpts?.trpc,
                        ...shouldAbortOnUnmount ? {
                            signal: queryFunctionContext.signal
                        } : {}
                    }
                };
                return context.client.query(...getClientArgs.getClientArgs(queryKey, actualOpts, {
                    pageParam: queryFunctionContext.pageParam ?? opts.initialCursor,
                    direction: queryFunctionContext.direction
                }));
            }
        });
    }
    function useSuspenseInfiniteQuery(path, input, opts) {
        const context = useContext();
        const queryKey = getQueryKey.getQueryKeyInternal(path, input, 'infinite');
        const defaultOpts = context.queryClient.getQueryDefaults(queryKey);
        const ssrOpts = useSSRQueryOptionsIfNeeded(queryKey, {
            ...defaultOpts,
            ...opts
        });
        // request option should take priority over global
        const shouldAbortOnUnmount = opts?.trpc?.abortOnUnmount ?? context.abortOnUnmount;
        const hook = reactQuery.useSuspenseInfiniteQuery({
            ...opts,
            initialPageParam: opts.initialCursor ?? null,
            queryKey,
            queryFn: (queryFunctionContext)=>{
                const actualOpts = {
                    ...ssrOpts,
                    trpc: {
                        ...ssrOpts?.trpc,
                        ...shouldAbortOnUnmount ? {
                            signal: queryFunctionContext.signal
                        } : {}
                    }
                };
                return context.client.query(...getClientArgs.getClientArgs(queryKey, actualOpts, {
                    pageParam: queryFunctionContext.pageParam ?? opts.initialCursor,
                    direction: queryFunctionContext.direction
                }));
            }
        }, context.queryClient);
        hook.trpc = trpcResult.useHookResult({
            path
        });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return [
            hook.data,
            hook
        ];
    }
    const useQueries = (queriesCallback, options)=>{
        const { ssrState, queryClient, prefetchQuery, client } = useContext();
        const proxy = useQueriesProxy.createUseQueries(client);
        const queries = queriesCallback(proxy);
        if (typeof window === 'undefined' && ssrState === 'prepass') {
            for (const query of queries){
                const queryOption = query;
                if (queryOption.trpc?.ssr !== false && !queryClient.getQueryCache().find({
                    queryKey: queryOption.queryKey
                })) {
                    void prefetchQuery(queryOption.queryKey, queryOption);
                }
            }
        }
        return reactQuery.useQueries({
            queries: queries.map((query)=>({
                    ...query,
                    queryKey: query.queryKey
                })),
            combine: options?.combine
        }, queryClient);
    };
    const useSuspenseQueries = (queriesCallback)=>{
        const { queryClient, client } = useContext();
        const proxy = useQueriesProxy.createUseQueries(client);
        const queries = queriesCallback(proxy);
        const hook = reactQuery.useSuspenseQueries({
            queries: queries.map((query)=>({
                    ...query,
                    queryFn: query.queryFn,
                    queryKey: query.queryKey
                }))
        }, queryClient);
        return [
            hook.map((h)=>h.data),
            hook
        ];
    };
    return {
        Provider: TRPCProvider,
        createClient,
        useContext,
        useUtils: useContext,
        useQuery,
        usePrefetchQuery,
        useSuspenseQuery,
        useQueries,
        useSuspenseQueries,
        useMutation,
        useSubscription,
        useInfiniteQuery,
        usePrefetchInfiniteQuery,
        useSuspenseInfiniteQuery
    };
}

exports.createRootHooks = createRootHooks;
