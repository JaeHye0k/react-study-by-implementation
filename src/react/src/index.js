class ReactElement {
    /**
     *
     * @param {'div'} type
     * @param {{ [key: string]: any }} props
     * @param  {...any} children
     */
    constructor(type, props = {}, ...children) {
        this.realDOM = document.createElement(type);

        Object.entries(props).forEach(([key, value]) => {
            this.realDOM.setAttribute(key, value);
        });

        children.forEach((child) => {
            console.log(child);
            if (typeof child === "string") {
                this.realDOM.textContent = child;
            } else if (child instanceof ReactElement) {
                this.realDOM.appendChild(child.realDOM);
            }
        });

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
        // 실제 DOM에 렌더링
        this.root.appendChild(el.realDOM);
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
