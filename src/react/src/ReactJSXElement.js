class ReactElement {
    /**
     *
     * @param {'div'} type
     * @param {{ className: string }} config
     * @param  {...any} children
     */
    constructor(type, config, ...children) {
        this.type = type;
        this.config = config;
        this.children = children;
    }
}

/**
 *
 * @param {'div'} type
 * @param {{ className: string }} config
 * @param  {...any} children
 * @returns {ReactElement}
 */
function createElement(type, config, ...children) {
    return new ReactElement(type, config, ...children);
}

export default {
    createElement,
};
