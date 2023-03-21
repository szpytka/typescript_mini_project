"use strict";
const localTodos = localStorage.getItem('todos') || '{}';
const todosJSON = JSON.parse(localTodos);
let todos = !localStorage.getItem('todos') ? [] : todosJSON;
const btn = document.querySelector('#btn');
const btnClear = document.querySelector('#btn-clear');
const todoInput = document.querySelector('#todoinput');
const form = document.querySelector('#todoform');
const list = document.querySelector('#todolist');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTodo = {
        text: todoInput.value,
        completed: false,
    };
    createTodo(newTodo);
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));
    todoInput.value = '';
    todoInput.focus();
});
function createTodo(todo) {
    const newLi = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        localStorage.setItem('todos', JSON.stringify(todos));
    });
    newLi.append(checkbox, todo.text);
    list.append(newLi);
}
btnClear.addEventListener('click', () => {
    list.innerHTML = '';
    todoInput.value = '';
    todos = [];
    localStorage.setItem('todos', JSON.stringify(todos));
});
todos.forEach((todo) => {
    createTodo(todo);
});
todoInput.focus();
