/**
 * @internal
 */ function getClientArgs(queryKey, opts, infiniteParams) {
    const path = queryKey[0];
    let input = queryKey[1]?.input;
    if (infiniteParams) {
        input = {
            ...input ?? {},
            ...infiniteParams.pageParam ? {
                cursor: infiniteParams.pageParam
            } : {},
            direction: infiniteParams.direction
        };
    }
    return [
        path.join('.'),
        input,
        opts?.trpc
    ];
}

export { getClientArgs };
