const $input = document.querySelector('.todo-input');
const $todoArea = document.querySelector('.todo-area');

function createTodoItem(value) {
    const $todoItem = document.createElement('li');
    $todoItem.classList.add('todo-item');
    $todoItem.innerHTML = `
        <input type="checkbox">
        <span>${value}</span>
        <button type="button" class="delete-btn">❌</button>
    `;
    return $todoItem;
}

const $submitBtn = document.querySelector('.submit-btn');
$submitBtn.addEventListener('click', () => {
    $todoArea.appendChild(createTodoItem($input.value));
    $input.value = '';
});