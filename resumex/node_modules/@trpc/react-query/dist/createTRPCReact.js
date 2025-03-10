'use strict';

var unstableCoreDoNotImport = require('@trpc/server/unstable-core-do-not-import');
var React = require('react');
var decorationProxy = require('./shared/proxy/decorationProxy.js');
var utilsProxy = require('./shared/proxy/utilsProxy.js');
require('@trpc/client');
require('@tanstack/react-query');
var createHooksInternal$1 = require('./shared/hooks/createHooksInternal.js');
require('./internals/context.js');

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

/**
 * @internal
 */ function createHooksInternal(trpc) {
    const proxy = decorationProxy.createReactDecoration(trpc);
    return unstableCoreDoNotImport.createFlatProxy((key)=>{
        if (key === 'useContext' || key === 'useUtils') {
            return ()=>{
                const context = trpc.useUtils();
                // create a stable reference of the utils context
                return React__namespace.useMemo(()=>{
                    return utilsProxy.createReactQueryUtils(context);
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
    const hooks = createHooksInternal$1.createRootHooks(opts);
    const proxy = createHooksInternal(hooks);
    return proxy;
}

exports.createHooksInternal = createHooksInternal;
exports.createTRPCReact = createTRPCReact;
