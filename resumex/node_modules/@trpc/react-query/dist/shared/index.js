'use strict';

var decorationProxy = require('./proxy/decorationProxy.js');
var utilsProxy = require('./proxy/utilsProxy.js');
var useQueriesProxy = require('./proxy/useQueriesProxy.js');
var createHooksInternal = require('./hooks/createHooksInternal.js');
var queryClient = require('./queryClient.js');
var getClientArgs = require('../internals/getClientArgs.js');
var context = require('../internals/context.js');



exports.createReactDecoration = decorationProxy.createReactDecoration;
exports.createQueryUtilsProxy = utilsProxy.createQueryUtilsProxy;
exports.createReactQueryUtils = utilsProxy.createReactQueryUtils;
exports.getQueryType = utilsProxy.getQueryType;
exports.createUseQueries = useQueriesProxy.createUseQueries;
exports.createRootHooks = createHooksInternal.createRootHooks;
exports.getQueryClient = queryClient.getQueryClient;
exports.getClientArgs = getClientArgs.getClientArgs;
exports.TRPCContext = context.TRPCContext;
exports.contextProps = context.contextProps;
