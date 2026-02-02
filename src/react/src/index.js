class ReactElement {
    /**
     *
     * @param {'div'} type
     * @param {{ [key: string]: any }} props
     * @param  {...any} children
     */
    constructor(type, props = {}, ...children) {
        this.type = type;
        this.props = props;
        this.children = children;
    }
}

class ReactRootElement {
    /**
     *
     * @param {HTMLElement} root
     */
    constructor(root) {
        this.root = root;
    }
    /**
     *
     * @param {ReactElement} el
     */
    render(el) {
        // type
        const realEl = document.createElement(el.type);

        // props
        Object.entries(el.props).forEach(([key, value]) => {
            realEl.setAttribute(key, value);
        });

        // children
        el.children.forEach((child) => {
            if (typeof child === "string") {
                realEl.textContent = child;
            }
        });

        // 실제 DOM에 렌더링
        this.root.appendChild(realEl);
    }
}

/**
 *
 * @param {'div'} type
 * @param {{ className: string }} config
 * @param  {...any} children
 * @returns {ReactElement}
 */
function createElement(type, props, ...children) {
    return new ReactElement(type, props, ...children);
}

/**
 *
 * @param {HTMLElement} el
 * @returns {ReactRootElement}
 */
function createRoot(el) {
    return new ReactRootElement(el);
}

export default {
    createElement,
    createRoot,
};
