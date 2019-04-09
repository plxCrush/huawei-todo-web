import React from "react";
import {Container, Divider, Grid, Header, Segment} from "semantic-ui-react";
import {SignUpForm} from "../../components";
import {Link} from "react-router-dom";
import {data} from "../../data";
import {withRouter} from "react-router-dom";
import {toast} from "react-toastify";

class SignUp extends React.Component {

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
        data.signUp(credentials).then(
            () => {
                this.setState({loading: false});
                toast.success("Sign up successful. Please log in.");
                this.props.history.push("/login");
            },
            error => this.setState({loading: false})
        );
    }

    render() {

        const {credentials, loading} = this.state;
        return (
            <Container style={styles.root}>
                <Grid centered columns={1}>
                    <Grid.Column style={styles.form}>
                        <Header attached="top">Sign Up</Header>
                        <Segment attached>
                            <SignUpForm loading={loading}
                                        credentials={credentials}
                                        onChange={this.handleChange}
                                        onSubmit={this.handleSubmit}/>
                            <Divider hidden/>
                            <Link to={"/login"}>Login</Link>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

const styles = {
    root: {
        marginTop: 30,
    },
    form: {
        marginTop: 50,
        width: 400
    }
};

export default withRouter(SignUp);