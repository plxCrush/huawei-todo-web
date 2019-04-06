import React from "react";
import {Button, Divider, Form, Input} from "semantic-ui-react";

export class SignUpForm extends React.Component {

    handleChange = (event, target) => {

        this.props.onChange(event, target);
    };

    handleSubmit = event => {

        event.preventDefault();
        this.props.onSubmit();
    };

    render() {

        const {credentials, loading} = this.props;
        return (
            <Form loading={loading}
                  onSubmit={this.handleSubmit}>
                <Form.Field>
                    <label>Name</label>
                    <Input autoFocus
                           name="name"
                           value={credentials.name}
                           onChange={this.handleChange}/>
                </Form.Field>
                <Form.Field>
                    <label>User Name</label>
                    <Input autoFocus
                           name="username"
                           value={credentials.username}
                           onChange={this.handleChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <Input type="password"
                           name="password"
                           value={credentials.password}
                           onChange={this.handleChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Password Confirm</label>
                    <Input type="password"
                           name="passwordRepeat"
                           value={credentials.passwordRepeat}
                           onChange={this.handleChange}/>
                </Form.Field>
                <Divider hidden/>
                <Button primary fluid
                        type="submit"
                        disabled={loading}
                        onClick={this.handleSubmit}>
                    Sign Up
                </Button>
            </Form>
        )
    }
}