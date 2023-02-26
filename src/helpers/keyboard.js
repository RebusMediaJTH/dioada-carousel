const actions = {
    ArrowLeft: "prev",
    ArrowRight: "next",
    Home: 0,
    End: "end"
};

export default (carousel, callback) => {
    carousel.addEventListener("keydown", e => {
        if (e.target === carousel) {
            const action = actions[e.key];
            if (undefined !== action) {
                e.preventDefault();
                callback(action);
            }
        }
    });
};
