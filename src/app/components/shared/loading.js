import React from "react";

export default class Loading extends React.Component {

    render() {
        return (
            <div style={styles.root}>
                <img alt="Loading..." src={require("../../assets/images/loading.gif")}/>
            </div>
        )
    }
}

const styles = {
    root: {
        padding: 100,
        textAlign: "center"
    }
};