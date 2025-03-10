'use strict';

var reactQuery = require('@tanstack/react-query');
var unstableCoreDoNotImport = require('@trpc/server/unstable-core-do-not-import');
var React = require('react');
var getQueryKey = require('./internals/getQueryKey.js');

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

/// <reference types="react/canary" />
const HELPERS = [
    'prefetch',
    'prefetchInfinite'
];
// ts-prune-ignore-next
/**
 * @note This requires `@tanstack/react-query@^5.49.0`
 * @note Make sure to have `dehydrate.serializeData` and `hydrate.deserializeData`
 * set to your data transformer in your `QueryClient` factory.
 * @example
 * ```ts
 * export const createQueryClient = () =>
 *   new QueryClient({
 *     defaultOptions: {
 *       dehydrate: {
 *         serializeData: transformer.serialize,
 *       },
 *       hydrate: {
 *         deserializeData: transformer.deserialize,
 *       },
 *     },
 *   });
 * ```
 */ function createHydrationHelpers(caller, getQueryClient) {
    const wrappedProxy = unstableCoreDoNotImport.createRecursiveProxy(async (opts)=>{
        const path = [
            ...opts.path
        ];
        const args = [
            ...opts.args
        ];
        const proc = path.reduce((acc, key)=>// @ts-expect-error - ??
            HELPERS.includes(key) ? acc : acc[key], caller);
        const input = args[0];
        const promise = proc(input);
        const helper = path.pop();
        if (helper === 'prefetch') {
            const args1 = args[1];
            return getQueryClient().prefetchQuery({
                ...args1,
                queryKey: getQueryKey.getQueryKeyInternal(path, input, 'query'),
                queryFn: ()=>promise
            });
        }
        if (helper === 'prefetchInfinite') {
            const args1 = args[1];
            return getQueryClient().prefetchInfiniteQuery({
                ...args1,
                queryKey: getQueryKey.getQueryKeyInternal(path, input, 'infinite'),
                queryFn: ()=>promise,
                initialPageParam: args1?.initialCursor ?? null
            });
        }
        return promise;
    });
    function HydrateClient(props) {
        const dehydratedState = reactQuery.dehydrate(getQueryClient());
        return /*#__PURE__*/ React__namespace.createElement(reactQuery.HydrationBoundary, {
            state: dehydratedState
        }, props.children);
    }
    return {
        /***
     * Wrapped caller with prefetch helpers
     * Can be used as a regular [server-side caller](https://trpc.io/docs/server/server-side-calls)
     * or using prefetch helpers to put the promise into the QueryClient cache
     * @example
     * ```ts
     * const data = await trpc.post.get("postId");
     *
     * // or
     * void trpc.post.get.prefetch("postId");
     * ```
     */ trpc: wrappedProxy,
        /**
     * HoC to hydrate the query client for a client component
     * to pick up the prefetched promise and skip an initial
     * client-side fetch.
     * @example
     * ```tsx
     * // MyRSC.tsx
     * const MyRSC = ({ params }) => {
     *   void trpc.post.get.prefetch(params.postId);
     *
     *   return (
     *     <HydrateClient>
     *       <MyCC postId={params.postId} />
     *     </HydrateClient>
     *    );
     * };
     *
     * // MyCC.tsx
     * "use client"
     * const MyCC = ({ postId }) => {
     *   const { data: post } = trpc.post.get.useQuery(postId);
     *   return <div>{post.title}</div>;
     * };
     * ```
     */ HydrateClient
    };
}

exports.createHydrationHelpers = createHydrationHelpers;
