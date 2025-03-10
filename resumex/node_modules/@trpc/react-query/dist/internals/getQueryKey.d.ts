import { type DeepPartial } from '@trpc/server/unstable-core-do-not-import';
import type { DecoratedMutation, DecoratedQuery } from '../createTRPCReact';
import type { DecorateRouterRecord } from '../shared';
export type QueryType = 'any' | 'infinite' | 'query';
export type TRPCQueryKey = [
    readonly string[],
    {
        input?: unknown;
        type?: Exclude<QueryType, 'any'>;
    }?
];
export type TRPCMutationKey = [readonly string[]];
type ProcedureOrRouter = DecoratedMutation<any> | DecoratedQuery<any> | DecorateRouterRecord<any, any>;
/**
 * To allow easy interactions with groups of related queries, such as
 * invalidating all queries of a router, we use an array as the path when
 * storing in tanstack query.
 **/
export declare function getQueryKeyInternal(path: readonly string[], input: unknown, type: QueryType): TRPCQueryKey;
export declare function getMutationKeyInternal(path: readonly string[]): TRPCMutationKey;
type GetInfiniteQueryInput<TProcedureInput, TInputWithoutCursorAndDirection = Omit<TProcedureInput, 'cursor' | 'direction'>> = keyof TInputWithoutCursorAndDirection extends never ? undefined : DeepPartial<TInputWithoutCursorAndDirection> | undefined;
/** @internal */
export type GetQueryProcedureInput<TProcedureInput> = TProcedureInput extends {
    cursor?: any;
} ? GetInfiniteQueryInput<TProcedureInput> : DeepPartial<TProcedureInput> | undefined;
type GetParams<TProcedureOrRouter extends ProcedureOrRouter> = TProcedureOrRouter extends DecoratedQuery<infer $Def> ? [input?: GetQueryProcedureInput<$Def['input']>, type?: QueryType] : [];
/**
 * Method to extract the query key for a procedure
 * @param procedureOrRouter - procedure or AnyRouter
 * @param input - input to procedureOrRouter
 * @param type - defaults to `any`
 * @see https://trpc.io/docs/v11/getQueryKey
 */
export declare function getQueryKey<TProcedureOrRouter extends ProcedureOrRouter>(procedureOrRouter: TProcedureOrRouter, ..._params: GetParams<TProcedureOrRouter>): TRPCQueryKey;
export type QueryKeyKnown<TInput, TType extends Exclude<QueryType, 'any'>> = [
    string[],
    {
        input?: GetQueryProcedureInput<TInput>;
        type: TType;
    }?
];
/**
 * Method to extract the mutation key for a procedure
 * @param procedure - procedure
 * @see https://trpc.io/docs/v11/getQueryKey#mutations
 */
export declare function getMutationKey<TProcedure extends DecoratedMutation<any>>(procedure: TProcedure): TRPCMutationKey;
export {};
//# sourceMappingURL=getQueryKey.d.ts.map