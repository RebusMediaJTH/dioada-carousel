import throttle from "./throttle";

// touchend has touches but not entries, but it does have an entry in changedTouches - at least in chrome
const extractEventArgs = e => (e.touches && e.touches[0] ? e.touches[0] : e.changedTouches && e.changedTouches[0] ? e.changedTouches[0] || {} : e);

export default (node, options) => {
    const settings = Object.assign({}, options);

    let initialPointerPos, previousPointerPos, dragging;

    const dispatch = (type, e, detail) => {
        const evt = `drag${type}`,
            args = Object.assign({node: node, pageX: e.pageX, pageY: e.pageY, clientX: e.clientX, clientY: e.clientY}, detail);
        node.dispatchEvent(new CustomEvent(evt, {detail: args}));
        if (options[evt]) {
            options[evt](args);
        }
    };

    const removeEvents = all => {
        monitorPointerThrottle.reset();
        window.removeEventListener("mousemove", pointerMove);
        window.removeEventListener("touchmove", pointerMove);
        window.removeEventListener("mouseup", pointerUp);
        window.removeEventListener("touchend", pointerUp);
        if (all) {
            node.removeEventListener("mousedown", pointerDown);
            node.removeEventListener("touchstart", pointerDown);
        }
    };

    const monitorPointerThrottle = throttle(16);

    const pointerDown = e => {
        if (e.button) {
            return;
        }
        e = extractEventArgs(e);
        previousPointerPos = initialPointerPos = [e.clientX, e.clientY];
        window.addEventListener("mousemove", pointerMove);
        window.addEventListener("touchmove", pointerMove);
        window.addEventListener("mouseup", pointerUp);
        window.addEventListener("touchend", pointerUp);
    };

    const pointerMove = e => {
        e = extractEventArgs(e);
        if (!dragging) {
            dispatch("start", e);
            dragging = true;
        }
        monitorPointerThrottle.execute(() => {
            const pos = [e.clientX, e.clientY];
            dispatch("move", e, {
                totalChange: {x: pos[0] - initialPointerPos[0], y: pos[1] - initialPointerPos[1]},
                change: {x: pos[0] - previousPointerPos[0], y: pos[1] - previousPointerPos[1]}
            });
            previousPointerPos = pos;
        });
    };

    const pointerUp = e => {
        if (dragging) {
            e = extractEventArgs(e);
            dispatch("stop", e);
            dragging = false;
        } else {
            node.dispatchEvent(new CustomEvent("clicked"));
        }
        removeEvents();
    };

    const addPointerDownEvents = () => {
        if (!settings.disabled) {
            node.addEventListener("mousedown", pointerDown);
            node.addEventListener("touchstart", pointerDown);
        }
    };

    addPointerDownEvents();
};
