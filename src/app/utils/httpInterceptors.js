import {BrowserRouter as Router} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import Config from "../config";
import {Auth} from "../utils";

export const defaultRequestInterceptor = axios.interceptors.request.use(
    request => {
        if (Config.debug) {
            console.log("Axios request", request.url, request);
        }

        const user = Auth.getCurrentUser();
        if (user) {
            request.headers.Authorization = "Bearer " + user.token;
        }

        return request;
    },
    error => {
        if (Config.debug)  console.log("Axios error", error);
        toast.error("Connection error.");
        return Promise.reject(error);
    });

export const defaultResponseInterceptor = axios.interceptors.response.use(
    response => {
        if (Config.debug) {
            console.log("Axios response", response.request.responseURL, response);
        }

        const {message, successMessage, infoMessage, warningMessage, errorMessage} = response.data;

        if (message) {
            toast.success(message);
        }
        if (successMessage) {
            toast.info(successMessage);
        }
        if (infoMessage) {
            toast.info(infoMessage);
        }
        if (warningMessage) {
            toast.warn(warningMessage);
        }
        if (errorMessage) {
            toast.error(errorMessage);
        }

        return response;
    },
    error => {
        if (Config.debug) {
            console.log("Axios response error", error);
        }

        if (error.response.status === 403 ||
            error.response.status === 401) {
            toast.error(error.response.data.errorMessage || "Please sign in.");
            Auth.logout();
            Router.history.push("/login?returnUrl=" + window.location.pathname)
        }

        const {errorMessage} = error.response.data;

        if (errorMessage) {
            toast.error(errorMessage);
        } else {
            toast.error("An unexpected error occurred.");
        }

        return Promise.reject(error);
    });