export const Auth = {

    setCurrentUser(user) {
        localStorage.setItem("auth", JSON.stringify({user}));
    },

    getCurrentUser() {
        let auth = JSON.parse(localStorage.getItem("auth"));
        if (auth && auth.user) return auth.user;
    },

    logout() {
        localStorage.removeItem("auth");
    }
};