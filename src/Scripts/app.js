"use strict";
const $ = document;

// todos header
const textInput = $.querySelector("#textInput");
const btnAdd = $.querySelector("#btnAdd");
const themeBtn = $.querySelector("#theme-btn");

// todos items container
const todosContainer = $.querySelector(".items-container");

let items = [];

function addTodo() {
  const todoText = textInput.value.trim();
  if (!todoText) {
    textInput.focus();
    return;
  }

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
    "todo-item w-full max-h-[75px] rounded-xl text-zinc-700 bg-zinc-100/20 shadow-md shadow-black/30 dark:shadow-zinc-100/60 p-2.5 flex items-center justify-between wow animate__animated animate__fadeInUp";

  todoElement.innerHTML = `
    <div data-id="${
      item.id
    }" class="todo-item-content font-light text-wrap decoration-2 text-zinc-700 dark:text-zinc-200 tracking-wider decoration-red-700 wrap-anywhere line-clamp-3 todo-text ${
    item.isDone ? "line-through" : ""
  }">
      ${item.title}
    </div>
    <div class="btn-container ml-1 flex flex-col items-center justify-end flex-wrap gap-2">
      <button title="done todo" class="done-btn max-w-20 h-7 flexAllCenter cursor-pointer text-emerald-300">
        <svg class='w-5 h-5'><use href='${
          item.isDone ? "#undo" : "#check"
        }'></use></svg>
      </button>
      <button title="delete todo" class="delete-btn flexAllCenter w-20 h-7 cursor-pointer text-red-500">
        <svg class='w-5 h-5'><use href='#delete-icon'></use></svg>
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

  // change line through
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

// load saved theme from localStorage
function loadTheme() {
  const nowTheme = localStorage.getItem("theme") || "light";
  if (nowTheme === "dark") {
    $.documentElement.classList.add("dark");
    themeBtn.innerHTML = "Light";
  } else {
    $.documentElement.classList.remove("dark");
    themeBtn.innerHTML = "Dark";
  }
}

// toggle theme on button click
function themeHandler() {
  let nowTheme = localStorage.getItem("theme");

  if (nowTheme === "dark") {
    $.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    themeBtn.innerHTML = "Dark";
  } else {
    $.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    themeBtn.innerHTML = "Light";
  }
}

// events
window.addEventListener("load", () => {
  getFromLocalStorage();
  loadTheme();
  textInput.focus();
});

btnAdd.addEventListener("click", addTodo);

textInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

themeBtn.addEventListener("click", themeHandler);
