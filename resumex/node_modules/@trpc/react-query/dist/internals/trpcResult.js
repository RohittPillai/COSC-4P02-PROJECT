'use strict';

var React = require('react');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

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
    return React__namespace.useMemo(()=>result, [
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

exports.buildQueryFromAsyncIterable = buildQueryFromAsyncIterable;
exports.createTRPCOptionsResult = createTRPCOptionsResult;
exports.useHookResult = useHookResult;
