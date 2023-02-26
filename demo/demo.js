carouselDemo = options => {
    options = Object.assign(
        {},
        {
            // Remove for no indicators or set to false for non-clickable
            indicators: "buttons"
        },
        options
    );

    let btns, indicators;

    const carousel = dioada.carousel(options);

    carousel.node.addEventListener("dioada.carousel.nav", e => {
        e = e.detail;
        if (e.first) {
            btns.prev.setAttribute("disabled", "disabled");
        } else {
            btns.prev.removeAttribute("disabled");
        }
        if (e.last) {
            btns.next.setAttribute("disabled", "disabled");
        } else {
            btns.next.removeAttribute("disabled");
        }
        if (indicators) {
            indicators[e.from].setAttribute("aria-current", "false");
            indicators[e.to].setAttribute("aria-current", "true");
        }
    });

    btns = addNavigation(carousel);
    btns.prev.addEventListener("click", carousel.prev);
    btns.next.addEventListener("click", carousel.next);

    indicators = addIndicators(carousel, options);
    if (indicators && "buttons" === options.indicators) {
        carousel.node.addEventListener("click", e => {
            if (e.target.classList.contains("carousel-indicator")) {
                carousel.idx(parseInt(e.target.getAttribute("data-idx"), 10));
            }
        });
    }

    return carousel;
};

const addNavigation = carousel => {
    const idx = carousel.idx(),
        container = document.createElement("div");
    container.classList.add("carousel-navigation");
    container.innerHTML = `
        <div class="carousel-navigation">
            <button type="button" aria-label="Previous slide" ${idx === 0 ? "disabled" : ""}>
                <svg viewBox="0 0 16 16">,
                    <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />,
                </svg>
            </button>
            <button type="button" aria-label="Next slide" ${idx === carousel.itemCount - 1 ? "disabled" : ""}>
                <svg viewBox="0 0 16 16">
                    <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                </svg>
            </button>
        </div>
    `;
    carousel.node.append(container);
    const btns = container.querySelectorAll("button");
    return {prev: btns[0], next: btns[1]};
};

const addIndicators = (carousel, options) => {
    if (!options.indicators || !carousel.itemCount) {
        return;
    }
    const asButtons = options.indicators === "buttons",
        idx = carousel.idx(),
        container = document.createElement("ul");
    container.classList.add("carousel-indicators");
    container.setAttribute("aria-label", asButtons ? "Slideshow navigation" : "Active slide indicators");
    for (let i = 0; i < carousel.itemCount; i++) {
        const item = document.createElement("li");
        let primary;
        if (asButtons) {
            primary = document.createElement("button");
            item.append(primary);
        } else {
            primary = item;
        }
        primary.classList.add("carousel-indicator");
        primary.setAttribute("data-idx", i);
        primary.setAttribute("aria-current", i === idx);
        container.append(item);
    }
    carousel.node.append(container);
    return container.querySelectorAll(".carousel-indicator");
};
