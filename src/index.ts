interface Todo {
  text: string;
  completed: boolean;
}
const localTodos = localStorage.getItem('todos') || '{}';
const todosJSON = JSON.parse(localTodos);
let todos: Todo[] = !localStorage.getItem('todos') ? [] : todosJSON;

const btn = document.querySelector('#btn')! as HTMLButtonElement;
const btnClear = document.querySelector('#btn-clear')! as HTMLButtonElement;
const todoInput = document.querySelector('#todoinput')! as HTMLInputElement;
const form = document.querySelector('#todoform')! as HTMLFormElement;
const list = document.querySelector('#todolist')! as HTMLUListElement;

form.addEventListener('submit', (e: SubmitEvent) => {
  e.preventDefault();
  const newTodo: Todo = {
    text: todoInput.value,
    completed: false,
  };
  createTodo(newTodo);
  todos.push(newTodo);
  localStorage.setItem('todos', JSON.stringify(todos));
  todoInput.value = '';
  todoInput.focus();
});

function createTodo(todo: Todo) {
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
