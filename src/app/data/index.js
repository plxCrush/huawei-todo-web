import * as API from "./api";

class Data {

    /**
     * Auth
     */
    login = API.AuthAPI.login;
    signUp = API.AuthAPI.signUp;
}


export const data = new Data();