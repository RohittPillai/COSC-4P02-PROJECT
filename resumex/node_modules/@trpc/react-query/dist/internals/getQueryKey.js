'use strict';

var reactQuery = require('@tanstack/react-query');
var unstableCoreDoNotImport = require('@trpc/server/unstable-core-do-not-import');

/**
 * To allow easy interactions with groups of related queries, such as
 * invalidating all queries of a router, we use an array as the path when
 * storing in tanstack query.
 **/ function getQueryKeyInternal(path, input, type) {
    // Construct a query key that is easy to destructure and flexible for
    // partial selecting etc.
    // https://github.com/trpc/trpc/issues/3128
    // some parts of the path may be dot-separated, split them up
    const splitPath = path.flatMap((part)=>part.split('.'));
    if (!input && (!type || type === 'any')) {
        // this matches also all mutations (see `getMutationKeyInternal`)
        // for `utils.invalidate()` to match all queries (including vanilla react-query)
        // we don't want nested array if path is empty, i.e. `[]` instead of `[[]]`
        return splitPath.length ? [
            splitPath
        ] : [];
    }
    if (type === 'infinite' && unstableCoreDoNotImport.isObject(input) && ('direction' in input || 'cursor' in input)) {
        const { cursor: _, direction: __, ...inputWithoutCursorAndDirection } = input;
        return [
            splitPath,
            {
                input: inputWithoutCursorAndDirection,
                type: 'infinite'
            }
        ];
    }
    return [
        splitPath,
        {
            ...typeof input !== 'undefined' && input !== reactQuery.skipToken && {
                input: input
            },
            ...type && type !== 'any' && {
                type: type
            }
        }
    ];
}
function getMutationKeyInternal(path) {
    return getQueryKeyInternal(path, undefined, 'any');
}
/**
 * Method to extract the query key for a procedure
 * @param procedureOrRouter - procedure or AnyRouter
 * @param input - input to procedureOrRouter
 * @param type - defaults to `any`
 * @see https://trpc.io/docs/v11/getQueryKey
 */ function getQueryKey(procedureOrRouter, ..._params) {
    const [input, type] = _params;
    // @ts-expect-error - we don't expose _def on the type layer
    const path = procedureOrRouter._def().path;
    const queryKey = getQueryKeyInternal(path, input, type ?? 'any');
    return queryKey;
}
/**
 * Method to extract the mutation key for a procedure
 * @param procedure - procedure
 * @see https://trpc.io/docs/v11/getQueryKey#mutations
 */ function getMutationKey(procedure) {
    // @ts-expect-error - we don't expose _def on the type layer
    const path = procedure._def().path;
    return getMutationKeyInternal(path);
}

exports.getMutationKey = getMutationKey;
exports.getMutationKeyInternal = getMutationKeyInternal;
exports.getQueryKey = getQueryKey;
exports.getQueryKeyInternal = getQueryKeyInternal;
