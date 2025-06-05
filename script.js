// Add new todo item
const addBtn = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

function createTodoItem(text) {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const span = document.createElement('span');
    span.textContent = text;
    span.addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete-btn';
    delBtn.addEventListener('click', () => {
        li.remove();
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    return li;
}

addBtn.addEventListener('click', () => {
    const text = todoInput.value.trim();
    if (text) {
        const item = createTodoItem(text);
        todoList.appendChild(item);
        todoInput.value = '';
        todoInput.focus();
    }
});

// Add item with Enter key
todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addBtn.click();
    }
});
