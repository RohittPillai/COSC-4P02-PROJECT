import type { QueryClient } from '@tanstack/react-query';
import type { TRPCQueryOptionsResult } from '../shared';
import type { TRPCHookResult } from '../shared/hooks/types';
import type { TRPCQueryKey } from './getQueryKey';
export declare function createTRPCOptionsResult(value: {
    path: readonly string[];
}): TRPCQueryOptionsResult['trpc'];
/**
 * Makes a stable reference of the `trpc` prop
 */
export declare function useHookResult(value: {
    path: readonly string[];
}): TRPCHookResult['trpc'];
/**
 * @internal
 */
export declare function buildQueryFromAsyncIterable(asyncIterable: AsyncIterable<unknown>, queryClient: QueryClient, queryKey: TRPCQueryKey): Promise<unknown[]>;
//# sourceMappingURL=trpcResult.d.ts.map