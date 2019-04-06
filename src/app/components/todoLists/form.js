import React from "react";
import {Form, Input} from "semantic-ui-react";

export class TodoListForm extends React.Component {

    render() {

        const {todoList, loading} = this.props;
        return (
            <Form loading={loading}>
                <Form.Field required>
                    <label>Name</label>
                    <Input autoFocus
                           name="name"
                           value={todoList.name || ""}
                           onChange={this.props.onChange}/>
                </Form.Field>
            </Form>
        );
    }
}