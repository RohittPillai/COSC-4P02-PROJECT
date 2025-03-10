import type { DefinedInitialDataInfiniteOptions, DefinedUseInfiniteQueryResult, InfiniteData, SkipToken, UndefinedInitialDataInfiniteOptions, UseInfiniteQueryOptions, UseInfiniteQueryResult, UseSuspenseInfiniteQueryOptions, UseSuspenseInfiniteQueryResult, UseSuspenseQueryResult } from '@tanstack/react-query';
import type { createTRPCClient, TRPCClientErrorLike } from '@trpc/client';
import type { AnyProcedure, AnyRootTypes, AnyRouter, inferAsyncIterableYield, inferProcedureInput, inferTransformedProcedureOutput, ProcedureType, ProtectedIntersection, RouterRecord, Simplify } from '@trpc/server/unstable-core-do-not-import';
import type { TRPCUseQueries, TRPCUseSuspenseQueries } from './internals/useQueries';
import type { CreateReactUtils, TRPCFetchInfiniteQueryOptions, TRPCFetchQueryOptions } from './shared';
import type { CreateReactQueryHooks } from './shared/hooks/createHooksInternal';
import type { DefinedUseTRPCQueryOptions, DefinedUseTRPCQueryResult, TRPCHookResult, TRPCProvider, TRPCSubscriptionResult, TRPCUseQueryBaseOptions, UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCSubscriptionOptions, UseTRPCSuspenseQueryOptions } from './shared/hooks/types';
import type { CreateTRPCReactOptions } from './shared/types';
type ResolverDef = {
    input: any;
    output: any;
    transformer: boolean;
    errorShape: any;
};
/**
 * @internal
 */
export interface ProcedureUseQuery<TDef extends ResolverDef> {
    <TQueryFnData extends TDef['output'] = TDef['output'], TData = TQueryFnData>(input: TDef['input'] | SkipToken, opts: DefinedUseTRPCQueryOptions<TQueryFnData, TData, TRPCClientErrorLike<{
        errorShape: TDef['errorShape'];
        transformer: TDef['transformer'];
    }>, TDef['output']>): DefinedUseTRPCQueryResult<TData, TRPCClientErrorLike<{
        errorShape: TDef['errorShape'];
        transformer: TDef['transformer'];
    }>>;
    <TQueryFnData extends TDef['output'] = TDef['output'], TData = TQueryFnData>(input: TDef['input'] | SkipToken, opts?: UseTRPCQueryOptions<TQueryFnData, TData, TRPCClientErrorLike<TDef>, TDef['output']>): UseTRPCQueryResult<TData, TRPCClientErrorLike<TDef>>;
}
/**
 * @internal
 */
export type ProcedureUsePrefetchQuery<TDef extends ResolverDef> = (input: TDef['input'] | SkipToken, opts?: TRPCFetchQueryOptions<TDef['output'], TRPCClientErrorLike<TDef>>) => void;
/**
 * @remark `void` is here due to https://github.com/trpc/trpc/pull/4374
 */
type CursorInput = {
    cursor?: any;
} | void;
type ReservedInfiniteQueryKeys = 'cursor' | 'direction';
type InfiniteInput<TInput> = Omit<TInput, ReservedInfiniteQueryKeys> | SkipToken;
type inferCursorType<TInput> = TInput extends {
    cursor?: any;
} ? TInput['cursor'] : unknown;
type makeInfiniteQueryOptions<TCursor, TOptions> = Omit<TOptions, 'queryKey' | 'initialPageParam' | 'queryFn' | 'queryHash' | 'queryHashFn'> & TRPCUseQueryBaseOptions & {
    initialCursor?: TCursor;
};
type trpcInfiniteData<TDef extends ResolverDef> = Simplify<InfiniteData<TDef['output'], inferCursorType<TDef['input']>>>;
export interface useTRPCInfiniteQuery<TDef extends ResolverDef> {
    <TData = trpcInfiniteData<TDef>>(input: InfiniteInput<TDef['input']>, opts: makeInfiniteQueryOptions<inferCursorType<TDef['input']>, DefinedInitialDataInfiniteOptions<TDef['output'], TRPCClientErrorLike<TDef>, TData, any, inferCursorType<TDef['input']>>>): TRPCHookResult & DefinedUseInfiniteQueryResult<TData, TRPCClientErrorLike<TDef>>;
    <TData = trpcInfiniteData<TDef>>(input: InfiniteInput<TDef['input']>, opts?: makeInfiniteQueryOptions<inferCursorType<TDef['input']>, UndefinedInitialDataInfiniteOptions<TDef['output'], TRPCClientErrorLike<TDef>, TData, any, inferCursorType<TDef['input']>>>): TRPCHookResult & UseInfiniteQueryResult<TData, TRPCClientErrorLike<TDef>>;
    <TData = trpcInfiniteData<TDef>>(input: InfiniteInput<TDef['input']>, opts?: makeInfiniteQueryOptions<inferCursorType<TDef['input']>, UseInfiniteQueryOptions<TDef['output'], TRPCClientErrorLike<TDef>, TData, TDef['output'], any, inferCursorType<TDef['input']>>>): TRPCHookResult & UseInfiniteQueryResult<TData, TRPCClientErrorLike<TDef>>;
}
export type useTRPCSuspenseInfiniteQuery<TDef extends ResolverDef> = (input: InfiniteInput<TDef['input']>, opts: makeInfiniteQueryOptions<inferCursorType<TDef['input']>, UseSuspenseInfiniteQueryOptions<TDef['output'], TRPCClientErrorLike<TDef>, trpcInfiniteData<TDef>, TDef['output'], any, inferCursorType<TDef['input']>>>) => [
    trpcInfiniteData<TDef>,
    TRPCHookResult & UseSuspenseInfiniteQueryResult<trpcInfiniteData<TDef>, TRPCClientErrorLike<TDef>>
];
/**
 * @internal
 */
export type MaybeDecoratedInfiniteQuery<TDef extends ResolverDef> = TDef['input'] extends CursorInput ? {
    /**
     * @see https://trpc.io/docs/v11/client/react/useInfiniteQuery
     */
    useInfiniteQuery: useTRPCInfiniteQuery<TDef>;
    /**
     * @see https://trpc.io/docs/client/react/suspense#usesuspenseinfinitequery
     */
    useSuspenseInfiniteQuery: useTRPCSuspenseInfiniteQuery<TDef>;
    usePrefetchInfiniteQuery: (input: Omit<TDef['input'], ReservedInfiniteQueryKeys> | SkipToken, opts: TRPCFetchInfiniteQueryOptions<TDef['input'], TDef['output'], TRPCClientErrorLike<TDef>>) => void;
} : object;
/**
 * @internal
 */
export type DecoratedQueryMethods<TDef extends ResolverDef> = {
    /**
     * @see https://trpc.io/docs/v11/client/react/useQuery
     */
    useQuery: ProcedureUseQuery<TDef>;
    usePrefetchQuery: ProcedureUsePrefetchQuery<TDef>;
    /**
     * @see https://trpc.io/docs/v11/client/react/suspense#usesuspensequery
     */
    useSuspenseQuery: <TQueryFnData extends TDef['output'] = TDef['output'], TData = TQueryFnData>(input: TDef['input'], opts?: UseTRPCSuspenseQueryOptions<TQueryFnData, TData, TRPCClientErrorLike<TDef>>) => [
        TData,
        UseSuspenseQueryResult<TData, TRPCClientErrorLike<TDef>> & TRPCHookResult
    ];
};
/**
 * @internal
 */
export type DecoratedQuery<TDef extends ResolverDef> = MaybeDecoratedInfiniteQuery<TDef> & DecoratedQueryMethods<TDef>;
export type DecoratedMutation<TDef extends ResolverDef> = {
    /**
     * @see https://trpc.io/docs/v11/client/react/useMutation
     */
    useMutation: <TContext = unknown>(opts?: UseTRPCMutationOptions<TDef['input'], TRPCClientErrorLike<TDef>, TDef['output'], TContext>) => UseTRPCMutationResult<TDef['output'], TRPCClientErrorLike<TDef>, TDef['input'], TContext>;
};
interface ProcedureUseSubscription<TDef extends ResolverDef> {
    (input: TDef['input'], opts?: UseTRPCSubscriptionOptions<inferAsyncIterableYield<TDef['output']>, TRPCClientErrorLike<TDef>>): TRPCSubscriptionResult<inferAsyncIterableYield<TDef['output']>, TRPCClientErrorLike<TDef>>;
    (input: TDef['input'] | SkipToken, opts?: Omit<UseTRPCSubscriptionOptions<inferAsyncIterableYield<TDef['output']>, TRPCClientErrorLike<TDef>>, 'enabled'>): TRPCSubscriptionResult<inferAsyncIterableYield<TDef['output']>, TRPCClientErrorLike<TDef>>;
}
/**
 * @internal
 */
export type DecorateProcedure<TType extends ProcedureType, TDef extends ResolverDef> = TType extends 'query' ? DecoratedQuery<TDef> : TType extends 'mutation' ? DecoratedMutation<TDef> : TType extends 'subscription' ? {
    /**
     * @see https://trpc.io/docs/v11/subscriptions
     */
    useSubscription: ProcedureUseSubscription<TDef>;
} : never;
/**
 * @internal
 */
export type DecorateRouterRecord<TRoot extends AnyRootTypes, TRecord extends RouterRecord> = {
    [TKey in keyof TRecord]: TRecord[TKey] extends infer $Value ? $Value extends AnyProcedure ? DecorateProcedure<$Value['_def']['type'], {
        input: inferProcedureInput<$Value>;
        output: inferTransformedProcedureOutput<TRoot, $Value>;
        transformer: TRoot['transformer'];
        errorShape: TRoot['errorShape'];
    }> : $Value extends RouterRecord ? DecorateRouterRecord<TRoot, $Value> : never : never;
};
/**
 * @internal
 */
export type CreateTRPCReactBase<TRouter extends AnyRouter, TSSRContext> = {
    /**
     * @deprecated renamed to `useUtils` and will be removed in a future tRPC version
     *
     * @see https://trpc.io/docs/v11/client/react/useUtils
     */
    useContext(): CreateReactUtils<TRouter, TSSRContext>;
    /**
     * @see https://trpc.io/docs/v11/client/react/useUtils
     */
    useUtils(): CreateReactUtils<TRouter, TSSRContext>;
    Provider: TRPCProvider<TRouter, TSSRContext>;
    createClient: typeof createTRPCClient<TRouter>;
    useQueries: TRPCUseQueries<TRouter>;
    useSuspenseQueries: TRPCUseSuspenseQueries<TRouter>;
};
export type CreateTRPCReact<TRouter extends AnyRouter, TSSRContext> = ProtectedIntersection<CreateTRPCReactBase<TRouter, TSSRContext>, DecorateRouterRecord<TRouter['_def']['_config']['$types'], TRouter['_def']['record']>>;
/**
 * @internal
 */
export declare function createHooksInternal<TRouter extends AnyRouter, TSSRContext = unknown>(trpc: CreateReactQueryHooks<TRouter, TSSRContext>): ProtectedIntersection<CreateTRPCReactBase<TRouter, TSSRContext>, DecorateRouterRecord<TRouter["_def"]["_config"]["$types"], TRouter["_def"]["record"]>>;
export declare function createTRPCReact<TRouter extends AnyRouter, TSSRContext = unknown>(opts?: CreateTRPCReactOptions<TRouter>): CreateTRPCReact<TRouter, TSSRContext>;
export {};
//# sourceMappingURL=createTRPCReact.d.ts.map