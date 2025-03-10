'use strict';

require('@trpc/server/unstable-core-do-not-import');
var utilsProxy = require('./shared/proxy/utilsProxy.js');
require('@trpc/client');
require('@tanstack/react-query');
require('react');
require('./internals/context.js');
var createUtilityFunctions = require('./utils/createUtilityFunctions.js');

function createTRPCQueryUtils(opts) {
    const utils = createUtilityFunctions.createUtilityFunctions(opts);
    return utilsProxy.createQueryUtilsProxy(utils);
}

exports.createTRPCQueryUtils = createTRPCQueryUtils;
