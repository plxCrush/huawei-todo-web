import React from "react";
import {Container, Divider, Grid, Header, Segment} from "semantic-ui-react";
import {LoginForm} from "../../components";
import {Link, withRouter} from "react-router-dom";
import {data} from "../../data";
import {Auth} from "../../utils";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            credentials: {}
        }
    }

    handleChange(event, target) {

        let {credentials} = this.state;
        credentials[target.name] = target.value;
        this.setState({credentials});
    }

    handleSubmit() {

        const {credentials} = this.state;
        this.setState({loading: true});
        data.login(credentials).then(
            user => {
                this.setState({loading: false});
                Auth.setCurrentUser(user);
                this.props.history.push("/todoLists");
            },
            error => {
                console.log("error", error);
                this.setState({loading: false});
            }
        );
        console.log("credentials", credentials);
    }

    render() {

        const {credentials, loading} = this.state;
        return (
            <Container style={styles.root}>
                <Grid centered columns={1}>
                    <Grid.Column style={styles.form}>
                        <Header attached="top">Login</Header>
                        <Segment attached>
                            <LoginForm loading={loading}
                                       credentials={credentials}
                                       onChange={this.handleChange}
                                       onSubmit={this.handleSubmit}/>
                            <Divider hidden/>
                            <Link to={"/signUp"}>Sign Up</Link>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

const styles = {
    root: {
        marginTop: 30
    },
    form: {
        marginTop: 50,
        width: 400
    }
};

export default withRouter(Login);