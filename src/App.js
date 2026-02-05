import React from "./react/src/index.js";

let todoId = 0;

/**
 *
 * @returns {ReactElement}
 */
function App() {
    let value = "";
    let todoItems = [{ id: todoId++, value: "할일 1" }];

    /**
     *
     * @param {InputEvent} e
     */
    const handleInput = (e) => {
        value = e.currentTarget.value;
        console.log(value);
    };

    const createTodoItem = () => {
        if (value.trim() === "") return;
        todoItems.push({ id: todoId++, value });
    };

    return React.createElement(
        "div",
        { class: "todo-wrapper" },
        React.createElement("h1", null, "Todo List"),
        React.createElement("input", {
            type: "text",
            placeholder: "할 일을 입력하세요.",
            class: "todo-input",
            value: value,
            oninput: handleInput,
        }),
        React.createElement(
            "button",
            { type: "button", class: "submit-btn", onclick: createTodoItem },
            "작성",
        ),
        React.createElement(
            "ul",
            { class: "todo-area" },
            ...todoItems.map((item) => {
                return React.createElement(
                    "li",
                    { class: "todo-item", id: `todo-${item.id}` },
                    React.createElement("input", { type: "checkbox" }),
                    React.createElement("span", null, item.value),
                    React.createElement(
                        "button",
                        {
                            type: "button",
                            class: "delete-btn",
                            onclick: (e) => {
                                todoItems = todoItems.filter((newItem) => newItem.id !== item.id);
                            },
                        },
                        "❌",
                    ),
                );
            }),
        ),
    );
}

export default App;
