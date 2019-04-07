import axios from "axios";
import Configuration from "../../config";

export const TodoListsAPI = {

    list: (filter) => new Promise((resolve, reject) => {
        const params = {...filter};
        axios.get(`${Configuration.API.EndpointUrl}/todo-lists`, {params})
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    }),

    get: (id) => new Promise((resolve, reject) => {
        axios.get(`${Configuration.API.EndpointUrl}/todo-lists/${id}`)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    }),

    create: (todoList) => new Promise((resolve, reject) => {
        axios.post(`${Configuration.API.EndpointUrl}/todo-lists`, todoList)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    }),

    update: (id, todoList) => new Promise((resolve, reject) => {
        axios.put(`${Configuration.API.EndpointUrl}/todo-lists/${id}`, todoList)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    }),

    delete: (id) => new Promise((resolve, reject) => {
        axios.delete(`${Configuration.API.EndpointUrl}/todo-lists/${id}`)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    })
};