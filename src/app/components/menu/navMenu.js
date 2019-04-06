import React from "react";
import {Link, withRouter} from "react-router-dom";
import {Auth} from "../../utils";
import {Button, Container, Icon, Image, Menu} from "semantic-ui-react";
import {toast} from "react-toastify";

class _NavMenu extends React.Component {

    constructor(props) {
        super(props);
        this.goHome = this.goHome.bind(this);
        this.logout = this.logout.bind(this);
    }

    goHome() {

        const user = Auth.getCurrentUser();
        if (user) {
            this.props.history.push("/todoLists");
        } else {
            this.props.history.push("/");
        }
    }

    logout() {

        Auth.logout();
        toast.info("Signed Out.");
        this.goHome();
    }

    render() {

        const user = Auth.getCurrentUser();
        return (
            <Menu borderless style={styles.menu}>
                <Container>
                    <Menu.Item as="a" header onClick={this.goHome}>
                        <Image src={require('../../assets/images/logo.png')}
                               size='tiny'/>
                    </Menu.Item>
                    <Menu.Menu position="right">
                        {
                            user
                                ?
                                <React.Fragment>
                                    <Menu.Item>
                                        {user.name}
                                    </Menu.Item>
                                    <Menu.Item onClick={this.logout}>
                                        <Icon name="lock"/>
                                        Logout
                                    </Menu.Item>
                                </React.Fragment>
                            :
                                <React.Fragment>
                                    <Link to={"/login"} style={styles.link}>
                                        <Button size="small" primary>Login</Button>
                                    </Link>
                                    <Link to={"/signUp"} style={styles.link}>
                                        <Button size="small">Sign Up</Button>
                                    </Link>
                                </React.Fragment>
                        }
                    </Menu.Menu>
                </Container>
            </Menu>
        )
    }
}

const styles = {
    menu: {
        margin: 0
    },
    link: {
        margin: 8
    }
};

export const NavMenu = withRouter(_NavMenu);