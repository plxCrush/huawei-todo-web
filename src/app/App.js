import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import * as Public from "./screens/public";
import * as Protected from "./screens/protected";
import {ProtectedRoute} from "./components/routing";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.min.css";

require("./utils/httpInterceptors");

class App extends React.Component {

    render() {
        return (
            <Router>
                <div style={styles.root}>
                    <div style={styles.content}>
                        <Switch>
                            {/*Public*/}
                            <Route exact path={"/"}
                                   component={Public.Landing}/>
                            <Route exact path={"/login"}
                                   component={Public.Login}/>
                            <Route exact path={"/signUp"}
                                   component={Public.SignUp}/>

                            {/*Protected*/}
                            <ProtectedRoute exact path={"/todoLists"}
                                            component={Protected.TodoLists}/>
                            {/*Not Found*/}
                            <Public.Error message="Page Not Found."/>
                        </Switch>
                    </div>
                    <ToastContainer/>
                </div>
            </Router>
        );
    }
}

const styles = {
    root: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
    },
    content: {
        flexGrow: 1,
        alignSelf: "stretch",
        paddingBottom: 20,
        paddingTop: 40
    }
};

export default App;
