import { TRPCUntypedClient, getUntypedClient } from '@trpc/client';
import { createRecursiveProxy } from '@trpc/server/unstable-core-do-not-import';
import { getQueryKeyInternal } from '../../internals/getQueryKey.mjs';

/**
 * Create proxy for `useQueries` options
 * @internal
 */ function createUseQueries(client) {
    const untypedClient = client instanceof TRPCUntypedClient ? client : getUntypedClient(client);
    return createRecursiveProxy((opts)=>{
        const arrayPath = opts.path;
        const dotPath = arrayPath.join('.');
        const [input, _opts] = opts.args;
        const options = {
            queryKey: getQueryKeyInternal(arrayPath, input, 'query'),
            queryFn: ()=>{
                return untypedClient.query(dotPath, input, _opts?.trpc);
            },
            ..._opts
        };
        return options;
    });
}

export { createUseQueries };
