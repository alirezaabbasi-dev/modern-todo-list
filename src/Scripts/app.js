"use strict";
const $ = document;
// todos header
const textInput = $.querySelector("#textInput");
const btnAdd = $.querySelector("#btnAdd");

// todos items container
const todosContainer = $.querySelector(".items-container");

let items = [];

function addTodo() {
  const todoText = textInput.value.trim();
  if (!todoText) return;

  const todoObj = {
    id: items.length + 1,
    title: todoText,
    isDone: false,
  };

  items.push(todoObj);
  localStorage.setItem("todos", JSON.stringify(items));
  renderTodoItem(todoObj);
  textInput.value = "";
  textInput.focus();
}

function renderTodoItem(item) {
  todosContainer.innerHTML += `
    <div
      class="todo-item w-full max-h-[75px] rounded-xl text-zinc-700 bg-zinc-100/20 shadow-md shadow-black/30 p-2.5 flex items-center justify-between wow animate__animated animate__fadeInUp">
      <div data-id="${
        item.id
      }" class="todo-item-content text-wrap wrap-anywhere line-clamp-3 todo-text ${
    item.isDone ? "line-through" : ""
  }">
           ${item.title}
      </div>
      <div class="btn-container ml-1 flex items-center justify-end flex-wrap gap-2 ">
          <button onClick="doneBtnHandler(event)" class="done-btn w-20 h-7 rounded-3xl text-emerald-600 ${
            item.isDone ? "" : "bg-emerald-300"
          }">${item.isDone ? "Undo" : "Done"}</button>
          <button onClick="deleteBtnHandler(event)" class="delete-btn w-20 h-7 rounded-3xl text-red-600 bg-red-300">Delete</button>
      </div>
    </div>
  `;
}

function deleteBtnHandler(event) {
  const id = +event.target.parentElement.previousElementSibling.dataset.id;
  items = items.filter((item) => item.id !== id);
  localStorage.setItem("todos", JSON.stringify(items));
  event.target.parentElement.parentElement.remove();
}

function doneBtnHandler(event) {
  const todoElem = event.target.parentElement.previousElementSibling;
  const id = +todoElem.dataset.id;
  const item = items.find((item) => item.id === id);
  item.isDone = !item.isDone;

  localStorage.setItem("todos", JSON.stringify(items));

  todoElem.classList.toggle("line-through");
  event.target.innerText = item.isDone ? "Undo" : "Done";
  event.target.classList.toggle("bg-emerald-300");
}

function getFromLocalStorage() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  items = savedTodos;

  items.forEach((item) => {
    renderTodoItem(item);
  });
}

window.addEventListener("load", getFromLocalStorage);
btnAdd.addEventListener("click", addTodo);
textInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});
