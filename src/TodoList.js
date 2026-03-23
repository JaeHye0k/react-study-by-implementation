import { createElement } from "./react/src/index.js";

let todoId = 0;

/**
 *
 * @returns {ReactElement}
 */
function TodoList() {
    
    const createTodoItem = () => {
        const $input = document.querySelector(".todo-input");
        if ($input.value.trim() === "") return;
        const $todoList = document.querySelector(".todo-area");
        const $todoItem = createElement(
            "li",
            { class: "todo-item", id: `todo-${todoId++}` },
            createElement("input", { type: "checkbox" }),
            createElement("span", null, $input.value),
            createElement(
                "button",
                {
                    type: "button",
                    class: "delete-btn",
                    onclick: (e) => {
                        document.getElementById(`todo-${item.id}`).remove();
                    }
                },
                "❌",
            ),
        );
        $todoList.appendChild($todoItem);

        $input.value = "";
    };

    return createElement(
        "div",
        { class: "todo-wrapper" },
        createElement("h1", null, "Todo List"),
        createElement("input", {
            type: "text",
            placeholder: "할 일을 입력하세요.",
            class: "todo-input",
        }),
        createElement(
            "button",
            { type: "button", class: "submit-btn", onclick: createTodoItem },
            "작성",
        ),
        createElement(
            "ul",
            { class: "todo-area" }
        ),
    );
}

export default TodoList;
