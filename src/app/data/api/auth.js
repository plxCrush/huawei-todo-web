import axios from "axios";
import Configuration from "../../config";

export const AuthAPI = {

    login: (credentials) => new Promise((resolve, reject) => {
        axios.post(`${Configuration.API.EndpointUrl}/auth/login`, credentials)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    }),

    signUp: (credentials) => new Promise((resolve, reject) => {
        axios.post(`${Configuration.API.EndpointUrl}/auth/signup`, credentials)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    })
};