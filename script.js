// Basic references
const addBtn = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Load todos from localStorage or start with empty array
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function createTodoItem(todo) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = todo.id;
    if (todo.completed) {
        li.classList.add('completed');
    }

    const span = document.createElement('span');
    span.textContent = todo.text;
    span.addEventListener('click', () => {
        li.classList.toggle('completed');
        const t = todos.find(t => t.id === todo.id);
        if (t) {
            t.completed = li.classList.contains('completed');
            saveTodos();
        }
    });

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete-btn';
    delBtn.addEventListener('click', () => {
        li.remove();
        todos = todos.filter(t => t.id !== todo.id);
        saveTodos();
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    return li;
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const item = createTodoItem(todo);
        todoList.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', renderTodos);

addBtn.addEventListener('click', () => {
    const text = todoInput.value.trim();
    if (text) {
        const newTodo = { id: Date.now().toString(), text, completed: false };
        todos.push(newTodo);
        saveTodos();
        const item = createTodoItem(newTodo);
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
