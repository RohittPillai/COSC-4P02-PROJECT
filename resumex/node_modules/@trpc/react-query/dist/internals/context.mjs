import * as React from 'react';

const contextProps = [
    'client',
    'ssrContext',
    'ssrState',
    'abortOnUnmount'
];
const TRPCContext = React.createContext?.(null);

export { TRPCContext, contextProps };
