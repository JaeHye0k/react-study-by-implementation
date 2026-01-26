const $input = document.querySelector('.todo-input');
const $todoArea = document.querySelector('.todo-area');
const $submitBtn = document.querySelector('.submit-btn');
$submitBtn.addEventListener('click', handleSubmit);

let todoId = 0;



function handleSubmit() {
    $todoArea.appendChild(createTodoItem($input.value));
    $input.value = '';
}

function handleDelete() {

}

function createTodoItem(value) {
    const $todoItem = document.createElement('li');
    $todoItem.classList.add('todo-item');
    $todoItem.id = `todo-${todoId++}`;
    $todoItem.innerHTML = `
        <input type="checkbox">
        <span>${value}</span>
        <button type="button" class="delete-btn">❌</button>
    `;

    const $deleteBtn = $todoItem.querySelector('.delete-btn');
    $deleteBtn.addEventListener('click', () => {
        $todoItem.remove();
    });

    return $todoItem;
}

function deleteTodoItem(e) {
    console.log(e);
}   