import type { AnyRouter } from '@trpc/server/unstable-core-do-not-import';
import type { CreateReactQueryHooks } from '../hooks/createHooksInternal';
/**
 * Create proxy for decorating procedures
 * @internal
 */
export declare function createReactDecoration<TRouter extends AnyRouter, TSSRContext = unknown>(hooks: CreateReactQueryHooks<TRouter, TSSRContext>): unknown;
//# sourceMappingURL=decorationProxy.d.ts.map