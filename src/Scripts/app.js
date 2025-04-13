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
    id: items.length ? items[items.length - 1].id + 1 : 1,
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
  const todoElement = document.createElement("div");
  todoElement.className =
    "todo-item w-full max-h-[75px] rounded-xl text-zinc-700 bg-zinc-100/20 shadow-md shadow-black/30 p-2.5 flex items-center justify-between wow animate__animated animate__fadeInUp";

  todoElement.innerHTML = `
    <div data-id="${
      item.id
    }" class="todo-item-content text-wrap wrap-anywhere line-clamp-3 todo-text ${
    item.isDone ? "line-through" : ""
  }">
      ${item.title}
    </div>
    <div class="btn-container ml-1 flex items-center justify-end flex-wrap gap-2">
      <button title="done todo" class="done-btn max-w-20 h-7 flexAllCenter text-emerald-300">
        <svg class='w-5 h-5 '><use href='${
          item.isDone ? "#undo" : "#check"
        }'></use></svg>
      </button>
      <button title="delete todo" class="delete-btn flexAllCenter w-20 h-7 text-red-500">
        <svg class='w-5 h-5 '><use href='#delete-icon'></use></svg>
      </button>
    </div>
  `;

  // event handler
  const doneBtn = todoElement.querySelector(".done-btn");
  const deleteBtn = todoElement.querySelector(".delete-btn");

  doneBtn.addEventListener("click", doneBtnHandler);
  deleteBtn.addEventListener("click", deleteBtnHandler);

  todosContainer.appendChild(todoElement);
}

function deleteBtnHandler(event) {
  const todoElement = event.target.closest(".todo-item");
  const id = +todoElement.querySelector("[data-id]").dataset.id;

  items = items.filter((item) => item.id !== id);
  localStorage.setItem("todos", JSON.stringify(items));
  todoElement.remove();
}

function doneBtnHandler(event) {
  const todoElement = event.target.closest(".todo-item");
  const todoText = todoElement.querySelector("[data-id]");
  const id = +todoText.dataset.id;

  const item = items.find((item) => item.id === id);
  item.isDone = !item.isDone;
  localStorage.setItem("todos", JSON.stringify(items));

  // تغییر کلاس خط‌خورده
  todoText.classList.toggle("line-through");

  // change icons
  const icon = event.target.closest("button").querySelector("use");
  icon.setAttribute("href", item.isDone ? "#undo" : "#check");
}

function getFromLocalStorage() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  items = savedTodos;
  items.forEach(renderTodoItem);
}

window.addEventListener("load", getFromLocalStorage);
btnAdd.addEventListener("click", addTodo);
textInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});
