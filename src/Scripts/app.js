"use strict";
const $ = document;
// todos header
const textInput = $.querySelector("#textInput");
const btnAdd = $.querySelector("#btnAdd");

// todos items container
const todosContainer = $.querySelector(".items-container");


function addTodo() {
  const todoText = textInput.value.trim();



  todosContainer.innerHTML += `
                <!-- item start -->
                <div
                    class="todo-item w-full h-14 rounded-xl text-zinc-700 bg-zinc-300 p-2.5 flex items-center justify-between wow animate__animated animate__fadeInUp">
                    <div class="todo-item-content">
                        <span class="todo-text ">${todoText}</span>
                    </div>

                    <div class="btn-container">
                        <button onClick="doneBtnHandler(event)" class="done-btn w-20 h-7 rounded-3xl text-emerald-600 bg-emerald-300">Done</button>
                        <button onClick="deleteBtnHandler(event)" class="delete-btn w-20 h-7 rounded-3xl text-red-600 bg-red-300">Delete</button>
                    </div>
                </div>
                <!-- item end -->
        `;
    // clear the input field
  textInput.value = "";
  localStorageHandler(todoText);
}


function deleteBtnHandler(event){
    event.target.parentElement.parentElement.remove()
}
function doneBtnHandler(event){
    const todoText = event.target.parentElement.parentElement.querySelector(".todo-text");
    todoText.classList.toggle("line-through");
    event.target.innerText = event.target.innerText === "Done" ? "Undo" : "Done";
    event.target.classList.toggle("bg-emerald-300");
    event.target.parentElement.previousElementSibling.classList.toggle("line-through");


}





btnAdd.addEventListener("click", addTodo);
textInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});
