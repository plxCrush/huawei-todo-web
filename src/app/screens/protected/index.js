import Loadable from "react-loadable";
import Loading from "../../components/shared/loading";

export const TodoLists = Loadable({
    loader: () => import("./todoLists" /* webpackChunkName: "protected" */),
    loading: Loading
});