import Loadable from "react-loadable";
import Loading from "../../components/shared/loading";

export const Landing = Loadable({
    loader: () => import("./landing" /* webpackChunkName: "public" */),
    loading: Loading
});

export const Error = Loadable({
    loader: () => import("./error" /* webpackChunkName: "public" */),
    loading: Loading
});

export const Login = Loadable({
    loader: () => import("./login" /* webpackChunkName: "public" */),
    loading: Loading
});

export const SignUp = Loadable({
    loader: () => import("./signUp" /* webpackChunkName: "public" */),
    loading: Loading
});