'use strict';

var unstableCoreDoNotImport = require('@trpc/server/unstable-core-do-not-import');

/**
 * Create proxy for decorating procedures
 * @internal
 */ function createReactDecoration(hooks) {
    return unstableCoreDoNotImport.createRecursiveProxy(({ path, args })=>{
        const pathCopy = [
            ...path
        ];
        // The last arg is for instance `.useMutation` or `.useQuery()`
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const lastArg = pathCopy.pop();
        if (lastArg === 'useMutation') {
            return hooks[lastArg](pathCopy, ...args);
        }
        if (lastArg === '_def') {
            return {
                path: pathCopy
            };
        }
        const [input, ...rest] = args;
        const opts = rest[0] || {};
        return hooks[lastArg](pathCopy, input, opts);
    });
}

exports.createReactDecoration = createReactDecoration;
