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
    createTodoList = API.TodoListsAPI.create;
    updateTodoList = API.TodoListsAPI.update;
    deleteTodoList = API.TodoListsAPI.delete;
}


export const data = new Data();