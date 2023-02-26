const convertToCamelCase = val => val.replace(/-([a-z])/g, m => m[1].toUpperCase());

const parse = (val, type) => (type === "int" ? parseInt(val, 10) : type === "float" ? parseFloat(val) : type === "bool" ? val === "true" : val);

const options = [
    {name: "idx", type: "int"},
    {name: "duration", type: "float"},
    {name: "timing-function", type: "string"},
    {name: "keyboard", type: "bool"},
    {name: "swipe", type: "bool"},
    {name: "aria-hide-inactive", type: "bool"}
];

export default node => {
    const res = {};
    options.forEach(o => {
        const val = node.getAttribute(o.name);
        if (val) {
            res[convertToCamelCase(o.name)] = parse(val, o.type);
        }
    });
    return res;
};
