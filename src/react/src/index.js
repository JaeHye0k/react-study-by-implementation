function createElement(type, props, ...children) {
    props = props || {};
    const el = document.createElement(type);

    for (const [k, v] of Object.entries(props)) {
        if (k.startsWith("on") && typeof v === "function") {
            el.addEventListener(k.slice(2), v);
        } else {
            el.setAttribute(k, v);
        }
    }

    children.forEach((child) => {
        if (typeof child === "string") {
            el.textContent = child;
        } else if (child instanceof Element) {
            console.log(child);
            el.appendChild(child);
        }
    });

    return el;
}


export { createElement };
