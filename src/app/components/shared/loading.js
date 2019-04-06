import React from "react";

export default class Loading extends React.Component {

    render() {
        return (
            <div style={styles.root}>
                Loading...
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