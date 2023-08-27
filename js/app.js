
    "use strict";
    const input = document.querySelector(".todo__input");
    const addButton = document.querySelector(".todo__button-add");
    const list = document.querySelector(".todo__list");
    let completedTodos = [];
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    function saveTodos() {
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    function loadCompletedTodos() {
        const storedCompletedTodos = JSON.parse(localStorage.getItem("completedTodos")) || [];
        completedTodos = storedCompletedTodos;
    }
    loadCompletedTodos();
    function completeTodo(id) {
        const todoIndex = todos.findIndex((todo => todo.id === id));
        const completedTodo = todos.splice(todoIndex, 1)[0];
        completedTodo.completed = true;
        completedTodos.push(completedTodo);
        saveTodos();
        renderTodos();
        saveCompletedTodos();
    }
    function returnCompleted(id) {
        const todoIndex = completedTodos.findIndex((todo => todo.id === id));
        const completedTodo = completedTodos.splice(todoIndex, 1)[0];
        completedTodo.completed = false;
        todos.push(completedTodo);
        saveTodos();
        renderTodos();
        saveCompletedTodos();
    }
    function saveCompletedTodos() {
        localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
    }
    function deleteTodo(index, li) {
        if (li.classList.contains("completed")) {
            completedTodos.splice(index, 1);
            saveCompletedTodos();
        } else {
            todos.splice(index, 1);
            saveTodos();
        }
        renderTodos();
    }
    function renderTodos() {
        list.innerHTML = "";
        const incompleteTodos = todos.filter((todo => !todo.completed));
        const completedTodosCopy = completedTodos.slice();
        incompleteTodos.forEach(((todo, index) => {
            const li = document.createElement("li");
            li.innerHTML = `\n        <span>${todo.text}</span>\n        <button class="complete-button">Завершить</button>\n        <button class="delete-button">Удалить</button>\n      `;
            li.querySelector(".delete-button").addEventListener("click", (() => {
                deleteTodo(index, li);
            }));
            li.querySelector(".complete-button").addEventListener("click", (() => {
                completeTodo(todo.id);
            }));
            list.appendChild(li);
        }));
        completedTodosCopy.forEach(((todo, index) => {
            const li = document.createElement("li");
            li.classList.add("completed");
            li.innerHTML = `\n        <span style="text-decoration: line-through;">${todo.text}</span>\n        <button class="return-button">Вернуть</button>\n        <button class="delete-button">Удалить</button>\n      `;
            li.querySelector(".delete-button").addEventListener("click", (() => {
                deleteTodo(index, li);
            }));
            li.querySelector(".return-button").addEventListener("click", (() => {
                returnCompleted(todo.id);
            }));
            list.appendChild(li);
        }));
    }
    addButton.addEventListener("click", (() => {
        const todoText = input.value.trim();
        if (todoText) {
            const todo = {
                id: Date.now(),
                text: todoText,
                completed: false
            };
            todos.push(todo);
            saveTodos();
            renderTodos();
            input.value = "";
        }
    }));
    const highlightEvenButton = document.querySelector(".todo__button-higlight-even");
    highlightEvenButton.addEventListener("click", (() => {
        const listItems = list.querySelectorAll("li");
        listItems.forEach(((item, index) => {
            if ((index + 1) % 2 === 0) item.classList.add("highlighted"); else item.classList.remove("highlighted");
        }));
    }));
    highlightEvenButton.addEventListener("click", (() => {
        const listItems = list.querySelectorAll("li");
        listItems.forEach(((item, index) => {
            if ((index + 1) % 2 === 0) item.classList.add("highlighted"); else item.classList.remove("highlighted");
        }));
    }));
    const highlightOddButton = document.querySelector(".todo__button-higlight-odd");
    highlightOddButton.addEventListener("click", (() => {
        const listItems = list.querySelectorAll("li");
        listItems.forEach(((item, index) => {
            if ((index + 1) % 2 !== 0) item.classList.add("highlighted"); else item.classList.remove("highlighted");
        }));
    }));
    const deleteLastButton = document.querySelector(".todo__button-delete-last");
    deleteLastButton.addEventListener("click", (() => {
        if (todos.length > 0) {
            todos.pop();
            saveTodos();
            renderTodos();
        }
    }));
    const deleteFirstButton = document.querySelector(".todo__button-delete-first");
    deleteFirstButton.addEventListener("click", (() => {
        if (todos.length > 0) {
            todos.shift();
            saveTodos();
            renderTodos();
        }
    }));
    renderTodos();