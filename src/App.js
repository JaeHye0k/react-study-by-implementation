import React from "./react/src/index.js";

/**
 *
 * @returns {ReactElement}
 */
function App() {
    return React.createElement(
        "div",
        { class: "todo-wrapper" },
        React.createElement("h1", { class: "title" }, "Todo List"),
    );
}

export default App;
