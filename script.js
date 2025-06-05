// v2.0 Todo App
const addBtn = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const dueInput = document.getElementById('due-input');
const prioritySelect = document.getElementById('priority-select');
const todoList = document.getElementById('todo-list');
const statsEl = document.getElementById('stats');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentFilter = 'all';
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getPriorityColor(priority) {
    switch (priority) {
        case 'high':
            return 'red';
        case 'medium':
            return 'orange';
        default:
            return 'green';
    }
}

function updateStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;
    statsEl.textContent = `Total: ${total}  Completed: ${completed}  Remaining: ${active}`;
}

function createTodoItem(todo) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = todo.id;
    if (todo.completed) li.classList.add('completed');

    const dot = document.createElement('span');
    dot.className = 'priority-dot';
    dot.style.backgroundColor = getPriorityColor(todo.priority);

    const textSpan = document.createElement('span');
    textSpan.textContent = todo.text;
    textSpan.addEventListener('click', () => {
        li.classList.toggle('completed');
        const t = todos.find(t => t.id === todo.id);
        if (t) {
            t.completed = li.classList.contains('completed');
            saveTodos();
            updateStats();
        }
        renderTodos();
    });

    const dateSpan = document.createElement('span');
    dateSpan.className = 'due-date';
    dateSpan.textContent = todo.dueDate || '';

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete-btn';
    delBtn.addEventListener('click', () => {
        todos = todos.filter(t => t.id !== todo.id);
        saveTodos();
        renderTodos();
    });

    li.appendChild(dot);
    li.appendChild(textSpan);
    li.appendChild(dateSpan);
    li.appendChild(delBtn);
    return li;
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        if (currentFilter === 'completed' && !todo.completed) return;
        if (currentFilter === 'active' && todo.completed) return;
        todoList.appendChild(createTodoItem(todo));
    });
    updateStats();
}

document.addEventListener('DOMContentLoaded', renderTodos);

function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;
    const newTodo = {
        id: Date.now().toString(),
        text,
        completed: false,
        dueDate: dueInput.value,
        priority: prioritySelect.value
    };
    todos.push(newTodo);
    saveTodos();
    renderTodos();
    todoInput.value = '';
    dueInput.value = '';
    prioritySelect.value = 'low';
    todoInput.focus();
}

addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') addTodo();
});

dueInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') addTodo();
});

prioritySelect.addEventListener('keydown', e => {
    if (e.key === 'Enter') addTodo();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});
