import React from "react";
import {Form, Input, TextArea} from "semantic-ui-react";

export class TodoItemForm extends React.Component {

    render() {

        const {todoItem, loading} = this.props;
        return (
            <Form loading={loading}>
                <Form.Field required>
                    <label>Name</label>
                    <Input autoFocus
                           name="name"
                           value={todoItem.name || ""}
                           onChange={this.props.onChange}/>
                </Form.Field>
                <Form.Field required>
                    <label>Description</label>
                    <TextArea autoHeight
                              name="description"
                              value={todoItem.description || ""}
                              onChange={this.props.onChange}/>
                </Form.Field>
            </Form>
        );
    }
}