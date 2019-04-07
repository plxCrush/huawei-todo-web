import axios from "axios";
import Configuration from "../../config";

export const TodoItemsAPI = {

    list: (filter) => new Promise((resolve, reject) => {
        const params = {...filter};
        axios.get(`${Configuration.API.EndpointUrl}/todo-items`, {params})
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    }),

    get: (id) => new Promise((resolve, reject) => {
        axios.get(`${Configuration.API.EndpointUrl}/todo-items/${id}`)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    }),

    create: (todoItem) => new Promise((resolve, reject) => {
        axios.post(`${Configuration.API.EndpointUrl}/todo-items`, todoItem)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    }),

    update: (id, todoItem) => new Promise((resolve, reject) => {
        axios.put(`${Configuration.API.EndpointUrl}/todo-items/${id}`, todoItem)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    }),

    delete: (id) => new Promise((resolve, reject) => {
        axios.delete(`${Configuration.API.EndpointUrl}/todo-items/${id}`)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    }),

    addDependency: (id, dependencyId) => new Promise((resolve, reject) => {
        axios.put(`${Configuration.API.EndpointUrl}/todo-items/${id}/addDependency/${dependencyId}`)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    }),

    removeDependency: (id, dependencyId) => new Promise((resolve, reject) => {
        axios.delete(`${Configuration.API.EndpointUrl}/todo-items/${id}/removeDependency/${dependencyId}`,)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    }),

    markAsCompleted: (id) => new Promise((resolve, reject) => {
        axios.put(`${Configuration.API.EndpointUrl}/todo-items/${id}/markAsCompleted`)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    })
};