import * as API from "./api";

class Data {

    /**
     * Auth
     */
    login = API.AuthAPI.login;
    signUp = API.AuthAPI.signUp;

    /**
     * To-Do Lists
     */
    listTodoLists = API.TodoListsAPI.list;
    getTodoList = API.TodoListsAPI.get;
    createTodoList = API.TodoListsAPI.create;
    updateTodoList = API.TodoListsAPI.update;
    deleteTodoList = API.TodoListsAPI.delete;

    /**
     * To-Do Items
     */
    listTodoItems = API.TodoItemsAPI.list;
    getTodoItem = API.TodoItemsAPI.get;
    createTodoItem = API.TodoItemsAPI.create;
    updateTodoItem = API.TodoItemsAPI.update;
    deleteTodoItem = API.TodoItemsAPI.delete;
    markAsCompleted = API.TodoItemsAPI.markAsCompleted;
    addDependency = API.TodoItemsAPI.addDependency;
    removeDependency = API.TodoItemsAPI.removeDependency;
}

export const data = new Data();