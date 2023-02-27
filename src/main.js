import "./main.scss";
import getAttributeOptions from "./helpers/getAttributeOptions";
import keyboard from "./helpers/keyboard";
import drag from "./helpers/drag";
import DEFAULTS from "./defaults";

export default options => {
    options = options || {};

    const carousel = document.querySelector(options.selector || "dioada-carousel");

    options = Object.assign({}, DEFAULTS, options, getAttributeOptions(carousel));

    let idx = options.idx,
        previousIdx = idx,
        width,
        swipeAmount = 0;

    const itemsContainer = carousel.querySelector("dioada-carousel-items"),
        items = [].slice.call(itemsContainer.children),
        count = items.length,
        itemWidth = count ? 100 / count : 0;

    if (options.keyboard) {
        carousel.setAttribute("tabindex", "0");
    }
    itemsContainer.style.width = `${count * 100}%`;

    if (options.duration !== 0.6) {
        itemsContainer.style.transitionDuration = `${options.duration}s`;
    }

    if (options.timingFunction !== "ease-out") {
        itemsContainer.style.transitionTimingFunction = options.timingFunction;
    }

    if (!options.ariaHideInactive) {
        itemsContainer.setAttribute("role", "list");
    }

    items.forEach((item, i) => {
        if (options.ariaHideInactive) {
            item.setAttribute("aria-hidden", i !== idx);
        } else {
            item.setAttribute("role", "listitem");
        }
    });

    const updateTx = () => {
        const min = -itemWidth * Math.min(count - 1, idx + 1),
            max = -itemWidth * Math.max(0, idx - 1);
        itemsContainer.style.transform = `translate3d(${Math.min(max, Math.max(min, -itemWidth * idx + swipeAmount))}%, 0, 0)`;
    };

    const idxChanged = supressEvent => {
        updateTx();
        if (options.ariaHideInactive) {
            if (!supressEvent) {
                items[previousIdx].setAttribute("aria-hidden", "true");
            }
            items[idx].setAttribute("aria-hidden", "false");
        }
        if (!supressEvent) {
            carousel.dispatchEvent(
                new CustomEvent("dioada.carousel.nav", {
                    bubbles: true,
                    detail: {
                        item: items[idx],
                        from: previousIdx,
                        to: idx,
                        first: idx === 0,
                        last: idx === count - 1
                    }
                })
            );
        }
        previousIdx = idx;
    };

    const goto = destination => {
        const newIdx =
            destination === "prev" && idx !== 0
                ? idx - 1
                : destination === "next" && idx !== count - 1
                ? idx + 1
                : destination === "end"
                ? count - 1
                : typeof destination === "number"
                ? destination
                : undefined;
        if (undefined !== newIdx && idx !== newIdx) {
            idx = newIdx;
            idxChanged();
        }
    };

    const dragstart = e => (width = e.node.getBoundingClientRect().width);

    const dragmove = e => {
        swipeAmount = (e.totalChange.x / width) * 100;
        updateTx();
    };

    const dragstop = () => {
        if (swipeAmount) {
            if (Math.abs(swipeAmount) > itemWidth / 2) {
                idx = Math.max(0, Math.min(count - 1, idx + (swipeAmount < 0 ? 1 : -1)));
                swipeAmount = 0;
                idxChanged();
            } else {
                swipeAmount = 0;
                updateTx();
            }
        }
    };

    if (options.keyboard) {
        keyboard(carousel, goto);
    }

    if (options.swipe) {
        carousel.classList.add("swipe-enabled");
        itemsContainer.addEventListener("dragstart", e => e.preventDefault());
        drag(carousel, {
            dragstart: dragstart,
            dragmove: dragmove,
            dragstop: dragstop
        });
    }

    idxChanged(true);

    // 0-timeout to prevent initial transition if idx is not set to 0
    window.setTimeout(() => {
        carousel.classList.add("dioada-carousel-ready");
    }, 0);

    return {
        node: carousel,
        itemCount: count,
        idx: function () {
            if (!arguments.length) {
                return idx;
            }
            goto(arguments[0]);
        },
        next: () => goto("next"),
        prev: () => goto("prev")
    };
};
