import { createElement, useState } from "./react/src/index.js";

let todoId = 0;

/**
 *
 * @returns {ReactElement}
 */
function App() {
    let [value, setValue] = useState("");
    let [todoItems, setTodoItems] = useState([]);

    /**
     *
     * @param {InputEvent} e
     */
    const handleInput = (e) => {
        setValue(e.currentTarget.value);
        console.log(value);
    };

    const createTodoItem = () => {
        console.log("Creating todo item with value:", value);
        if (value.trim() === "") return;
        setTodoItems([...todoItems, { id: todoId++, value }]);
        setValue("");
    };

    return createElement(
        "div",
        { class: "todo-wrapper" },
        createElement("h1", null, "Todo List"),
        createElement("input", {
            type: "text",
            placeholder: "할 일을 입력하세요.",
            class: "todo-input",
            value: value,
            oninput: handleInput,
        }),
        createElement(
            "button",
            { type: "button", class: "submit-btn", onclick: createTodoItem },
            "작성",
        ),
        createElement(
            "ul",
            { class: "todo-area" },
            ...todoItems.map((item) => {
                return createElement(
                    "li",
                    { class: "todo-item", id: `todo-${item.id}` },
                    createElement("input", { type: "checkbox" }),
                    createElement("span", null, item.value),
                    createElement(
                        "button",
                        {
                            type: "button",
                            class: "delete-btn",
                            onclick: (e) => {
                                setTodoItems(todoItems.filter((newItem) => newItem.id !== item.id));
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
