import { createFlatProxy } from '@trpc/server/unstable-core-do-not-import';
import * as React from 'react';
import { createReactDecoration } from './shared/proxy/decorationProxy.mjs';
import { createReactQueryUtils } from './shared/proxy/utilsProxy.mjs';
import '@trpc/client';
import '@tanstack/react-query';
import { createRootHooks } from './shared/hooks/createHooksInternal.mjs';
import './internals/context.mjs';

/**
 * @internal
 */ function createHooksInternal(trpc) {
    const proxy = createReactDecoration(trpc);
    return createFlatProxy((key)=>{
        if (key === 'useContext' || key === 'useUtils') {
            return ()=>{
                const context = trpc.useUtils();
                // create a stable reference of the utils context
                return React.useMemo(()=>{
                    return createReactQueryUtils(context);
                }, [
                    context
                ]);
            };
        }
        if (trpc.hasOwnProperty(key)) {
            return trpc[key];
        }
        return proxy[key];
    });
}
function createTRPCReact(opts) {
    const hooks = createRootHooks(opts);
    const proxy = createHooksInternal(hooks);
    return proxy;
}

export { createHooksInternal, createTRPCReact };
