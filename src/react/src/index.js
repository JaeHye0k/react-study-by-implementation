const stateList = [];
const setStateList = [];
let cursor = 0;
let _root = null;

function useState(initialState) {
    const frozenCursor = cursor;
    
    if (stateList.length === cursor) stateList.push(initialState);
    if (setStateList.length === cursor)
        setStateList.push((newState) => {
            stateList[frozenCursor] = newState;
            _root.render();
        });

    const state = stateList[frozenCursor];
    const setState = setStateList[frozenCursor];
    cursor++;

    return [state, setState];
}

class ReactElement {
    /**
     *
     * @param {'div'} type
     * @param {{ [key: string]: any }} props
     * @param  {...any} children
     */
    constructor(type, props, ...children) {
        props = props || {};
        this.realDOM = document.createElement(type);

        for (const [k, v] of Object.entries(props)) {
            if (k.startsWith("on") && typeof v === "function") {
                this.realDOM.addEventListener(k.slice(2), v);
            } else {
                this.realDOM.setAttribute(k, v);
            }
        }

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
        this.component = null;
        this.child = null;
    }

    /**
     *
     * @param {() => ReactElement} el
     */
    render(component) {
        if(component) this.component = component;
        cursor = 0; // 렌더링이 시작될 때 cursor 초기화
        this.root.innerHTML = "";
        this.child = this.component();
        this.root.appendChild(this.child.realDOM);
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
function createRoot(root) {
    _root = new ReactRootElement(root);
    return _root;
}

export { createElement, createRoot, useState };
