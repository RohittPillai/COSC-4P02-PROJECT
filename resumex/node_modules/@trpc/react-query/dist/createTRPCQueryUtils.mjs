import '@trpc/server/unstable-core-do-not-import';
import { createQueryUtilsProxy } from './shared/proxy/utilsProxy.mjs';
import '@trpc/client';
import '@tanstack/react-query';
import 'react';
import './internals/context.mjs';
import { createUtilityFunctions } from './utils/createUtilityFunctions.mjs';

function createTRPCQueryUtils(opts) {
    const utils = createUtilityFunctions(opts);
    return createQueryUtilsProxy(utils);
}

export { createTRPCQueryUtils };
