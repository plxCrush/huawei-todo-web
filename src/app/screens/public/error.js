import React from "react";
import {Container, Header, Segment} from "semantic-ui-react";

export default class ErrorScreen extends React.Component {

    render() {

        let {message} = this.props;
        return (
            <Container style={styles.root}>
                <Header attached="top">Error</Header>
                <Segment attached>
                    {message || "An unexpected error has occurred."}
                </Segment>
            </Container>
        )
    }
}

const styles = {
    root: {
        marginTop: 30
    }
};