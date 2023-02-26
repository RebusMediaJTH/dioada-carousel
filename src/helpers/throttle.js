export default ms => {
    let waiting, timeoutId;
    return {
        execute: callback => {
            if (!waiting) {
                waiting = true;
                timeoutId = window.setTimeout(function () {
                    callback();
                    waiting = false;
                }, ms || 0);
            }
        },
        reset: () => {
            window.clearTimeout(timeoutId);
            waiting = false;
        }
    };
};
