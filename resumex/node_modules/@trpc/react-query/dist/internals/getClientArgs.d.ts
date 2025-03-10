import type { TRPCQueryKey } from './getQueryKey';
/**
 * @internal
 */
export declare function getClientArgs<TOptions>(queryKey: TRPCQueryKey, opts: TOptions, infiniteParams?: {
    pageParam: any;
    direction: 'forward' | 'backward';
}): readonly [string, unknown, any];
//# sourceMappingURL=getClientArgs.d.ts.map