import React from "./react/src/index.js";

let todoId = 0;

/**
 *
 * @returns {ReactElement}
 */
function App() {
    let value = "";

    /**
     *
     * @param {InputEvent} e
     */
    const handleInput = (e) => {
        value = e.currentTarget.value;
        console.log(value);
    };

    const handleSubmit = () => {
        if (value.trim() === "") return;
        createTodoItem(value);
        value = "";
        document.querySelector(".todo-input").value = "";
    };

    const createTodoItem = (value) => {
        const $todoArea = document.querySelector(".todo-area");
        const $todoItem = document.createElement("li");
        $todoItem.classList.add("todo-item");
        $todoItem.id = `todo-${todoId++}`;
        $todoItem.innerHTML = `
        <input type="checkbox">
        <span>${value}</span>
        <button type="button" class="delete-btn">❌</button>
    `;

        const $deleteBtn = $todoItem.querySelector(".delete-btn");
        $deleteBtn.addEventListener("click", () => {
            $todoItem.remove();
        });

        $todoArea.appendChild($todoItem);
    };

    return React.createElement(
        "div",
        { class: "todo-wrapper" },
        React.createElement("h1", null, "Todo List"),
        React.createElement("input", {
            type: "text",
            placeholder: "할 일을 입력하세요.",
            class: "todo-input",
            oninput: handleInput,
        }),
        React.createElement(
            "button",
            { type: "button", class: "submit-btn", onclick: handleSubmit },
            "작성",
        ),
        React.createElement("ul", { class: "todo-area" }),
    );
}

export default App;
