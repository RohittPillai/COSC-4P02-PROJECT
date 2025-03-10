'use strict';

var client = require('@trpc/client');
var unstableCoreDoNotImport = require('@trpc/server/unstable-core-do-not-import');
var getQueryKey = require('../../internals/getQueryKey.js');

/**
 * Create proxy for `useQueries` options
 * @internal
 */ function createUseQueries(client$1) {
    const untypedClient = client$1 instanceof client.TRPCUntypedClient ? client$1 : client.getUntypedClient(client$1);
    return unstableCoreDoNotImport.createRecursiveProxy((opts)=>{
        const arrayPath = opts.path;
        const dotPath = arrayPath.join('.');
        const [input, _opts] = opts.args;
        const options = {
            queryKey: getQueryKey.getQueryKeyInternal(arrayPath, input, 'query'),
            queryFn: ()=>{
                return untypedClient.query(dotPath, input, _opts?.trpc);
            },
            ..._opts
        };
        return options;
    });
}

exports.createUseQueries = createUseQueries;
