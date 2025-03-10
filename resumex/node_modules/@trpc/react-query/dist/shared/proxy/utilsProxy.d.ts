import type { CancelOptions, InfiniteData, InvalidateOptions, InvalidateQueryFilters, Query, QueryFilters, QueryKey, RefetchOptions, RefetchQueryFilters, ResetOptions, SetDataOptions, SkipToken, Updater } from '@tanstack/react-query';
import type { TRPCClientError } from '@trpc/client';
import type { AnyMutationProcedure, AnyQueryProcedure, AnyRootTypes, AnyRouter, DeepPartial, inferProcedureInput, inferProcedureOutput, inferTransformedProcedureOutput, ProtectedIntersection, RouterRecord } from '@trpc/server/unstable-core-do-not-import';
import type { DecoratedTRPCContextProps, TRPCContextState, TRPCFetchInfiniteQueryOptions, TRPCFetchQueryOptions, TRPCQueryUtils } from '../../internals/context';
import type { QueryKeyKnown, QueryType } from '../../internals/getQueryKey';
import type { InferMutationOptions } from '../../utils/inferReactQueryProcedure';
import type { ExtractCursorType } from '../hooks/types';
import type { DefinedTRPCInfiniteQueryOptionsIn, DefinedTRPCInfiniteQueryOptionsOut, DefinedTRPCQueryOptionsIn, DefinedTRPCQueryOptionsOut, UndefinedTRPCInfiniteQueryOptionsIn, UndefinedTRPCInfiniteQueryOptionsOut, UndefinedTRPCQueryOptionsIn, UndefinedTRPCQueryOptionsOut, UnusedSkipTokenTRPCInfiniteQueryOptionsIn, UnusedSkipTokenTRPCInfiniteQueryOptionsOut, UnusedSkipTokenTRPCQueryOptionsIn, UnusedSkipTokenTRPCQueryOptionsOut } from '../types';
export type DecorateQueryProcedure<TRoot extends AnyRootTypes, TProcedure extends AnyQueryProcedure> = {
    /**
     * @see https://tanstack.com/query/latest/docs/framework/react/reference/queryOptions#queryoptions
     */
    queryOptions<TQueryFnData extends inferTransformedProcedureOutput<TRoot, TProcedure>, TData = TQueryFnData>(input: inferProcedureInput<TProcedure> | SkipToken, opts: DefinedTRPCQueryOptionsIn<TQueryFnData, TData, TRPCClientError<TRoot>>): DefinedTRPCQueryOptionsOut<TQueryFnData, TData, TRPCClientError<TRoot>>;
    /**
     * @see https://tanstack.com/query/latest/docs/framework/react/reference/queryOptions#queryoptions
     */
    queryOptions<TQueryFnData extends inferTransformedProcedureOutput<TRoot, TProcedure>, TData = TQueryFnData>(input: inferProcedureInput<TProcedure> | SkipToken, opts?: UnusedSkipTokenTRPCQueryOptionsIn<TQueryFnData, TData, TRPCClientError<TRoot>>): UnusedSkipTokenTRPCQueryOptionsOut<TQueryFnData, TData, TRPCClientError<TRoot>>;
    /**
     * @see https://tanstack.com/query/latest/docs/framework/react/reference/queryOptions#queryoptions
     */
    queryOptions<TQueryFnData extends inferTransformedProcedureOutput<TRoot, TProcedure>, TData = TQueryFnData>(input: inferProcedureInput<TProcedure> | SkipToken, opts?: UndefinedTRPCQueryOptionsIn<TQueryFnData, TData, TRPCClientError<TRoot>>): UndefinedTRPCQueryOptionsOut<TQueryFnData, TData, TRPCClientError<TRoot>>;
    /**
     * @see https://tanstack.com/query/latest/docs/framework/react/reference/infiniteQueryOptions#infinitequeryoptions
     */
    infiniteQueryOptions<TQueryFnData extends inferTransformedProcedureOutput<TRoot, TProcedure>, TData = TQueryFnData>(input: inferProcedureInput<TProcedure> | SkipToken, opts: DefinedTRPCInfiniteQueryOptionsIn<inferProcedureInput<TProcedure>, TQueryFnData, TData, TRPCClientError<TRoot>>): DefinedTRPCInfiniteQueryOptionsOut<inferProcedureInput<TProcedure>, TQueryFnData, TData, TRPCClientError<TRoot>>;
    /**
     * @see https://tanstack.com/query/latest/docs/framework/react/reference/infiniteQueryOptions#infinitequeryoptions
     */
    infiniteQueryOptions<TQueryFnData extends inferTransformedProcedureOutput<TRoot, TProcedure>, TData = TQueryFnData>(input: inferProcedureInput<TProcedure>, opts: UnusedSkipTokenTRPCInfiniteQueryOptionsIn<inferProcedureInput<TProcedure>, TQueryFnData, TData, TRPCClientError<TRoot>>): UnusedSkipTokenTRPCInfiniteQueryOptionsOut<inferProcedureInput<TProcedure>, TQueryFnData, TData, TRPCClientError<TRoot>>;
    /**
     * @see https://tanstack.com/query/latest/docs/framework/react/reference/infiniteQueryOptions#infinitequeryoptions
     */
    infiniteQueryOptions<TQueryFnData extends inferTransformedProcedureOutput<TRoot, TProcedure>, TData = TQueryFnData>(input: inferProcedureInput<TProcedure> | SkipToken, opts?: UndefinedTRPCInfiniteQueryOptionsIn<inferProcedureInput<TProcedure>, TQueryFnData, TData, TRPCClientError<TRoot>>): UndefinedTRPCInfiniteQueryOptionsOut<inferProcedureInput<TProcedure>, TQueryFnData, TData, TRPCClientError<TRoot>>;
    /**
     * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientfetchquery
     */
    fetch(input: inferProcedureInput<TProcedure>, opts?: TRPCFetchQueryOptions<inferTransformedProcedureOutput<TRoot, TProcedure>, TRPCClientError<TRoot>>): Promise<inferTransformedProcedureOutput<TRoot, TProcedure>>;
    /**
     * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientfetchinfinitequery
     */
    fetchInfinite(input: inferProcedureInput<TProcedure>, opts?: TRPCFetchInfiniteQueryOptions<inferProcedureInput<TProcedure>, inferTransformedProcedureOutput<TRoot, TProcedure>, TRPCClientError<TRoot>>): Promise<InfiniteData<inferTransformedProcedureOutput<TRoot, TProcedure>, NonNullable<ExtractCursorType<inferProcedureInput<TProcedure>>> | null>>;
    /**
     * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientprefetchquery
     */
    prefetch(input: inferProcedureInput<TProcedure>, opts?: TRPCFetchQueryOptions<inferTransformedProcedureOutput<TRoot, TProcedure>, TRPCClientError<TRoot>>): Promise<void>;
    /**
     * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientprefetchinfinitequery
     */
    prefetchInfinite(input: inferProcedureInput<TProcedure>, opts?: TRPCFetchInfiniteQueryOptions<inferProcedureInput<TProcedure>, inferTransformedProcedureOutput<TRoot, TProcedure>, TRPCClientError<TRoot>>): Promise<void>;
    /**
     * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientensurequerydata
     */
    ensureData(input: inferProcedureInput<TProcedure>, opts?: TRPCFetchQueryOptions<inferTransformedProcedureOutput<TRoot, TProcedure>, TRPCClientError<TRoot>>): Promise<inferTransformedProcedureOutput<TRoot, TProcedure>>;
    /**
     * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientinvalidatequeries
     */
    invalidate(input?: DeepPartial<inferProcedureInput<TProcedure>>, filters?: Omit<InvalidateQueryFilters, 'predicate'> & {
        predicate?: (query: Query<inferProcedureOutput<TProcedure>, TRPCClientError<TRoot>, inferTransformedProcedureOutput<TRoot, TProcedure>, QueryKeyKnown<inferProcedureInput<TProcedure>, inferProcedureInput<TProcedure> extends {
            cursor?: any;
        } | void ? 'infinite' : 'query'>>) => boolean;
    }, options?: InvalidateOptions): Promise<void>;
    /**
     * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientrefetchqueries
     */
    refetch(input?: inferProcedureInput<TProcedure>, filters?: RefetchQueryFilters, options?: RefetchOptions): Promise<void>;
    /**
     * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientcancelqueries
     */
    cancel(input?: inferProcedureInput<TProcedure>, options?: CancelOptions): Promise<void>;
    /**
     * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientresetqueries
     */
    reset(input?: inferProcedureInput<TProcedure>, options?: ResetOptions): Promise<void>;
    /**
     * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientsetquerydata
     */
    setData(
    /**
     * The input of the procedure
     */
    input: inferProcedureInput<TProcedure>, updater: Updater<inferTransformedProcedureOutput<TRoot, TProcedure> | undefined, inferTransformedProcedureOutput<TRoot, TProcedure> | undefined>, options?: SetDataOptions): void;
    /**
     * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientsetquerydata
     */
    setQueriesData(
    /**
     * The input of the procedure
     */
    input: inferProcedureInput<TProcedure>, filters: QueryFilters, updater: Updater<inferTransformedProcedureOutput<TRoot, TProcedure> | undefined, inferTransformedProcedureOutput<TRoot, TProcedure> | undefined>, options?: SetDataOptions): [QueryKey, inferTransformedProcedureOutput<TRoot, TProcedure>];
    /**
     * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientsetquerydata
     */
    setInfiniteData(input: inferProcedureInput<TProcedure>, updater: Updater<InfiniteData<inferTransformedProcedureOutput<TRoot, TProcedure>, NonNullable<ExtractCursorType<inferProcedureInput<TProcedure>>> | null> | undefined, InfiniteData<inferTransformedProcedureOutput<TRoot, TProcedure>, NonNullable<ExtractCursorType<inferProcedureInput<TProcedure>>> | null> | undefined>, options?: SetDataOptions): void;
    /**
     * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientgetquerydata
     */
    getData(input?: inferProcedureInput<TProcedure>): inferTransformedProcedureOutput<TRoot, TProcedure> | undefined;
    /**
     * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientgetquerydata
     */
    getInfiniteData(input?: inferProcedureInput<TProcedure>): InfiniteData<inferTransformedProcedureOutput<TRoot, TProcedure>, NonNullable<ExtractCursorType<inferProcedureInput<TProcedure>>> | null> | undefined;
};
type DecorateMutationProcedure<TRoot extends AnyRootTypes, TProcedure extends AnyMutationProcedure> = {
    setMutationDefaults<TMeta = unknown>(options: InferMutationOptions<TRoot, TProcedure, TMeta> | ((args: {
        canonicalMutationFn: NonNullable<InferMutationOptions<TRoot, TProcedure>['mutationFn']>;
    }) => InferMutationOptions<TRoot, TProcedure, TMeta>)): void;
    getMutationDefaults(): InferMutationOptions<TRoot, TProcedure> | undefined;
    isMutating(): number;
};
/**
 * this is the type that is used to add in procedures that can be used on
 * an entire router
 */
type DecorateRouter = {
    /**
     * Invalidate the full router
     * @see https://trpc.io/docs/v10/useContext#query-invalidation
     * @see https://tanstack.com/query/v5/docs/framework/react/guides/query-invalidation
     */
    invalidate(input?: undefined, filters?: InvalidateQueryFilters, options?: InvalidateOptions): Promise<void>;
};
/**
 * @internal
 */
export type DecoratedProcedureUtilsRecord<TRoot extends AnyRootTypes, TRecord extends RouterRecord> = DecorateRouter & {
    [TKey in keyof TRecord]: TRecord[TKey] extends infer $Value ? $Value extends AnyQueryProcedure ? DecorateQueryProcedure<TRoot, $Value> : $Value extends AnyMutationProcedure ? DecorateMutationProcedure<TRoot, $Value> : $Value extends RouterRecord ? DecoratedProcedureUtilsRecord<TRoot, $Value> & DecorateRouter : never : never;
};
type AnyDecoratedProcedure = DecorateQueryProcedure<any, any> & DecorateMutationProcedure<any, any>;
export type CreateReactUtils<TRouter extends AnyRouter, TSSRContext> = ProtectedIntersection<DecoratedTRPCContextProps<TRouter, TSSRContext>, DecoratedProcedureUtilsRecord<TRouter['_def']['_config']['$types'], TRouter['_def']['record']>>;
export type CreateQueryUtils<TRouter extends AnyRouter> = DecoratedProcedureUtilsRecord<TRouter['_def']['_config']['$types'], TRouter['_def']['record']>;
export declare const getQueryType: (utilName: keyof AnyDecoratedProcedure) => QueryType;
/**
 * @internal
 */
export declare function createReactQueryUtils<TRouter extends AnyRouter, TSSRContext>(context: TRPCContextState<AnyRouter, TSSRContext>): ProtectedIntersection<DecoratedTRPCContextProps<TRouter, TSSRContext>, DecoratedProcedureUtilsRecord<TRouter["_def"]["_config"]["$types"], TRouter["_def"]["record"]>>;
/**
 * @internal
 */
export declare function createQueryUtilsProxy<TRouter extends AnyRouter>(context: TRPCQueryUtils<TRouter>): CreateQueryUtils<TRouter>;
export {};
//# sourceMappingURL=utilsProxy.d.ts.map