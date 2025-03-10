import * as React from 'react';

function createTRPCOptionsResult(value) {
    const path = value.path.join('.');
    return {
        path
    };
}
/**
 * Makes a stable reference of the `trpc` prop
 */ function useHookResult(value) {
    const result = createTRPCOptionsResult(value);
    return React.useMemo(()=>result, [
        result
    ]);
}
/**
 * @internal
 */ async function buildQueryFromAsyncIterable(asyncIterable, queryClient, queryKey) {
    const queryCache = queryClient.getQueryCache();
    const query = queryCache.build(queryClient, {
        queryKey
    });
    query.setState({
        data: [],
        status: 'success'
    });
    const aggregate = [];
    for await (const value of asyncIterable){
        aggregate.push(value);
        query.setState({
            data: [
                ...aggregate
            ]
        });
    }
    return aggregate;
}

export { buildQueryFromAsyncIterable, createTRPCOptionsResult, useHookResult };
