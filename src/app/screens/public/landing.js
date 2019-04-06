import React from "react"
import {Container, Grid, Header, Image} from "semantic-ui-react"
import {Auth} from "../../utils";

export default class Landing extends React.Component {

    componentWillMount() {
        const user = Auth.getCurrentUser();
        if (user) {
            this.props.history.push("/toDoLists");
        }
    }

    render() {

        return (
            <Container style={styles.root}>
                <Grid centered style={styles.content}>
                    <Grid.Row>
                        <Image src={require("../../assets/images/logo.png")}/>
                    </Grid.Row>
                    <Grid.Row>
                        <Header as="h1">Welcome To HUAWEI To-Do App</Header>
                    </Grid.Row>
                    <Grid.Row>
                        <p>Please login to manage your To-Do Lists.</p>
                    </Grid.Row>
                    <Grid.Row>
                        <p>Sign up if you do not have an account.</p>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

const styles = {
    root: {
        marginTop: 30
    },
    content: {
        marginTop: 50
    }
};